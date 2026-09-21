// Blog CMS backend provides: articles, categories, authors, about, global
// (not the starter's homepage/pages types), so we bypass the Strapi Loader
// here and fetch directly via src/lib/strapi.ts. Keeping collections empty
// lets `astro build` succeed offline and online.
export const collections = {};
