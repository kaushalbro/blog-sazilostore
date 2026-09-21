const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN || '';

function headers(): HeadersInit {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (STRAPI_TOKEN) h['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  return h;
}

export async function strapiFetch(path: string, init?: RequestInit) {
  const url = `${STRAPI_URL}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: { ...headers(), ...(init?.headers || {}) },
  });
  if (!res.ok) {
    throw new Error(`Strapi fetch failed ${res.status} ${url}`);
  }
  return res.json();
}

export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
} | null;

export type Article = {
  id: number;
  documentId: string;
  title: string;
  description?: string | null;
  slug: string;
  cover?: StrapiMedia;
  author?: { id: number; name: string; email?: string; avatar?: StrapiMedia } | null;
  category?: { id: number; name: string; slug: string } | null;
  blocks?: any[];
  publishedAt?: string;
};

export function mediaUrl(media: StrapiMedia | { url?: string } | null | undefined): string | null {
  if (!media || !('url' in media) || !media.url) return null;
  let url = (media as any).url as string;
  if (url.startsWith('http://localhost:1337') || url.startsWith('http://127.0.0.1:1337')) {
    return url.replace(/^http:\/\/(localhost|127\.0\.0\.1):1337/, 'https://cmsblog.vritico.com');
  }
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const baseUrl = import.meta.env.PUBLIC_STRAPI_URL || 'https://cmsblog.vritico.com';
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}

export interface ResponsiveMedia {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
}

export function getResponsiveMedia(
  media: StrapiMedia | null | undefined,
  defaultWidth = 600,
  defaultHeight = 400
): ResponsiveMedia | null {
  if (!media || !('url' in media) || !media.url) return null;

  const mainUrl = mediaUrl(media) || '';
  const width = media.width || defaultWidth;
  const height = media.height || defaultHeight;

  if (!media.formats || typeof media.formats !== 'object') {
    return { src: mainUrl, width, height };
  }

  const sources: string[] = [];
  if (media.formats.thumbnail?.url && media.formats.thumbnail?.width) {
    const tUrl = mediaUrl(media.formats.thumbnail);
    if (tUrl) sources.push(`${tUrl} ${media.formats.thumbnail.width}w`);
  }
  if (media.formats.small?.url && media.formats.small?.width) {
    const sUrl = mediaUrl(media.formats.small);
    if (sUrl) sources.push(`${sUrl} ${media.formats.small.width}w`);
  }
  if (media.formats.medium?.url && media.formats.medium?.width) {
    const mUrl = mediaUrl(media.formats.medium);
    if (mUrl) sources.push(`${mUrl} ${media.formats.medium.width}w`);
  }
  if (media.formats.large?.url && media.formats.large?.width) {
    const lUrl = mediaUrl(media.formats.large);
    if (lUrl) sources.push(`${lUrl} ${media.formats.large.width}w`);
  }
  if (media.width && mainUrl) {
    sources.push(`${mainUrl} ${media.width}w`);
  }

  // Choose optimal default src for immediate paint (e.g. medium if available to save bandwidth)
  const preferredSrc = media.formats.medium?.url
    ? mediaUrl(media.formats.medium) || mainUrl
    : media.formats.small?.url
      ? mediaUrl(media.formats.small) || mainUrl
      : mainUrl;

  return {
    src: preferredSrc,
    srcSet: sources.length > 0 ? sources.join(', ') : undefined,
    width,
    height,
  };
}

export async function getArticles(): Promise<Article[]> {
  try {
    let allArticles: Article[] = [];
    let page = 1;
    let pageCount = 1;
    const pageSize = 100;

    do {
      const data = await strapiFetch(
        `/api/articles?populate[cover]=true&populate[author][populate]=avatar&populate[category]=true&populate[blocks][populate]=*&sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
      );
      const items = data.data ?? [];
      allArticles = allArticles.concat(items);
      pageCount = data.meta?.pagination?.pageCount || 1;
      page++;
    } while (page <= pageCount);

    return allArticles;
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const data = await strapiFetch(
      `/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[cover]=true&populate[author][populate]=avatar&populate[category]=true&populate[blocks][populate]=*&pagination[limit]=1`
    );
    return data.data?.[0] ?? null;
  } catch {
    return null;
  }
}

export type Category = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string | null;
};

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await strapiFetch('/api/categories?populate=*&sort=name:asc');
    return data.data ?? [];
  } catch {
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const data = await strapiFetch(
      `/api/categories?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&pagination[limit]=1`
    );
    return data.data?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  try {
    const data = await strapiFetch(
      `/api/articles?filters[category][slug][$eq]=${encodeURIComponent(categorySlug)}&populate[cover]=true&populate[author][populate]=avatar&populate[category]=true&populate[blocks][populate]=*&sort=publishedAt:desc&pagination[pageSize]=500`
    );
    return data.data ?? [];
  } catch {
    return [];
  }
}

export async function getGlobalSite() {
  try {
    const data = await strapiFetch('/api/global?populate[defaultSeo][populate]=shareImage&populate[favicon]=true');
    return data.data ?? null;
  } catch {
    return null;
  }
}

export async function getAbout() {
  try {
    const data = await strapiFetch('/api/about?populate[blocks][populate]=*');
    return data.data ?? null;
  } catch {
    return null;
  }
}

export type Author = {
  id: number;
  documentId: string;
  name: string;
  email?: string;
  avatar?: StrapiMedia;
  articles?: Article[];
};

export async function getAuthors(): Promise<Author[]> {
  try {
    const data = await strapiFetch('/api/authors?populate[avatar]=true&populate[articles]=true');
    return data.data ?? [];
  } catch {
    return [];
  }
}

export function calculateReadingTime(blocksOrText?: any[] | string | null): string {
  if (!blocksOrText) return '2 min read';
  let totalWords = 0;
  if (typeof blocksOrText === 'string') {
    totalWords = blocksOrText.trim().split(/\s+/).filter(Boolean).length;
  } else if (Array.isArray(blocksOrText)) {
    for (const b of blocksOrText) {
      if (b.body && typeof b.body === 'string') {
        totalWords += b.body.trim().split(/\s+/).filter(Boolean).length;
      }
      if (b.children && Array.isArray(b.children)) {
        for (const c of b.children) {
          if (c.text && typeof c.text === 'string') {
            totalWords += c.text.trim().split(/\s+/).filter(Boolean).length;
          }
        }
      }
    }
  }
  const minutes = Math.max(1, Math.ceil(totalWords / 200));
  return `${minutes} min read`;
}

