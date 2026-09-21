'use strict';

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');
const { categories, authors, articles, global, about } = require('../data/sazilo-data.json');

function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  return stats['size'];
}

function getFileData(fileName) {
  const filePath = path.join('data', 'uploads', fileName);
  const size = getFileSizeInBytes(filePath);
  const ext = fileName.split('.').pop();
  const mimeType = mime.lookup(ext || '') || '';

  return {
    filepath: filePath,
    originalFileName: fileName,
    size,
    mimetype: mimeType,
  };
}

async function uploadFile(file, name) {
  return strapi
    .plugin('upload')
    .service('upload')
    .upload({
      files: file,
      data: {
        fileInfo: {
          alternativeText: `An image uploaded to Strapi called ${name}`,
          caption: name,
          name,
        },
      },
    });
}

async function checkFileExistsBeforeUpload(files) {
  const existingFiles = [];
  const uploadedFiles = [];
  const filesCopy = [...files];

  for (const fileName of filesCopy) {
    if (!fileName) continue;
    const cleanName = fileName.replace(/\..*$/, '');
    const fileWhereName = await strapi.query('plugin::upload.file').findOne({
      where: {
        name: cleanName,
      },
    });

    if (fileWhereName) {
      existingFiles.push(fileWhereName);
    } else {
      const filePath = path.join('data', 'uploads', fileName);
      if (fs.existsSync(filePath)) {
        const fileData = getFileData(fileName);
        const [file] = await uploadFile(fileData, cleanName);
        uploadedFiles.push(file);
      }
    }
  }
  const allFiles = [...existingFiles, ...uploadedFiles];
  return allFiles.length === 1 ? allFiles[0] : allFiles;
}

async function setPublicPermissions(newPermissions) {
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  if (!publicRole) return;

  for (const controller of Object.keys(newPermissions)) {
    const actions = newPermissions[controller];
    for (const action of actions) {
      const existing = await strapi.query('plugin::users-permissions.permission').findOne({
        where: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
      if (!existing) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: {
            action: `api::${controller}.${controller}.${action}`,
            role: publicRole.id,
          },
        });
      }
    }
  }
}

async function clearExistingData() {
  console.log('Clearing existing Strapi articles, categories, and authors...');
  
  const models = ['article', 'category', 'author'];
  for (const model of models) {
    try {
      const entries = await strapi.documents(`api::${model}.${model}`).findMany({
        status: 'published',
      });
      for (const entry of entries) {
        await strapi.documents(`api::${model}.${model}`).delete({
          documentId: entry.documentId,
        });
      }
      const draftEntries = await strapi.documents(`api::${model}.${model}`).findMany({
        status: 'draft',
      });
      for (const entry of draftEntries) {
        await strapi.documents(`api::${model}.${model}`).delete({
          documentId: entry.documentId,
        });
      }
      console.log(`Cleared all ${model} entries.`);
    } catch (err) {
      console.log(`Error clearing ${model}:`, err.message);
    }
  }
}

async function seedSaziloData() {
  await setPublicPermissions({
    article: ['find', 'findOne'],
    category: ['find', 'findOne'],
    author: ['find', 'findOne'],
    global: ['find', 'findOne'],
    about: ['find', 'findOne'],
  });

  await clearExistingData();

  console.log('Seeding categories...');
  const categoryMap = {};
  for (const cat of categories) {
    const created = await strapi.documents('api::category.category').create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      },
      status: 'published',
    });
    categoryMap[cat.slug] = created.documentId;
  }

  console.log('Seeding authors (Only Sazilo Store)...');
  const authorMap = {};
  for (const aut of authors) {
    const avatar = await checkFileExistsBeforeUpload([aut.avatar]);
    const created = await strapi.documents('api::author.author').create({
      data: {
        name: aut.name,
        email: aut.email,
        avatar: avatar?.id ? avatar : undefined,
      },
      status: 'published',
    });
    authorMap[aut.name] = created.documentId;
  }

  console.log('Seeding 12 SEO-friendly ecommerce in Nepal articles...');
  for (const art of articles) {
    const cover = await checkFileExistsBeforeUpload([art.cover]);
    const catDocId = categoryMap[art.category];
    const autDocId = authorMap[art.author] || Object.values(authorMap)[0];

    await strapi.documents('api::article.article').create({
      data: {
        title: art.title,
        slug: art.slug,
        description: art.description,
        cover: cover?.id ? cover : undefined,
        category: catDocId,
        author: autDocId,
        blocks: art.blocks,
      },
      status: 'published',
    });
    console.log(`- Seeded article: "${art.title}"`);
  }

  console.log('Updating Global & About single types...');
  try {
    const favicon = await checkFileExistsBeforeUpload(['favicon.png']);
    await strapi.documents('api::global.global').create({
      data: {
        siteName: global.siteName,
        siteDescription: global.siteDescription,
        defaultSeo: global.defaultSeo,
        favicon: favicon?.id ? favicon : undefined,
      },
      status: 'published',
    });
    console.log('Updated Global site settings.');

    await strapi.documents('api::about.about').create({
      data: {
        title: about.title,
        blocks: about.blocks,
      },
      status: 'published',
    });
    console.log('Updated About page content.');
  } catch (err) {
    console.log('Error updating Global/About:', err.message);
  }

  console.log('Sazilo Store seed complete with SEO-friendly blogs!');
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  try {
    await seedSaziloData();
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await app.destroy();
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
