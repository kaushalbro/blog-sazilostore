'use strict';

/**
 * Lifecycle callbacks for the article content type.
 * Automatically ensures SEO-friendly slugs and description fallbacks for all future articles.
 */

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractDescription(data) {
  if (data.description && data.description.trim().length > 0) {
    return data.description.trim();
  }
  if (Array.isArray(data.blocks)) {
    const richBlock = data.blocks.find((b) => b && b.__component === 'shared.rich-text' && b.body);
    if (richBlock && richBlock.body) {
      const cleanText = richBlock.body
        .replace(/[#*`_~\[\]\(\)\|\-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return cleanText.slice(0, 155);
    }
  }
  return '';
}

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (data && data.title && (!data.slug || data.slug.trim() === '')) {
      data.slug = slugify(data.title);
    }
    if (data && (!data.description || data.description.trim() === '')) {
      const autoDesc = extractDescription(data);
      if (autoDesc) {
        data.description = autoDesc;
      }
    }
  },

  beforeUpdate(event) {
    const { data } = event.params;
    if (data && data.title && (!data.slug || data.slug.trim() === '')) {
      data.slug = slugify(data.title);
    }
    if (data && (!data.description || data.description.trim() === '')) {
      const autoDesc = extractDescription(data);
      if (autoDesc) {
        data.description = autoDesc;
      }
    }
  },
};
