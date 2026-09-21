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
  const url = (media as any).url as string;
  if (url.startsWith('http')) return url;
  const baseUrl = import.meta.env.PUBLIC_STRAPI_URL || import.meta.env.STRAPI_URL || 'http://localhost:1337';
  return `${baseUrl}${url}`;
}

export async function getArticles(): Promise<Article[]> {
  try {
    const data = await strapiFetch(
      '/api/articles?populate[cover]=true&populate[author][populate]=avatar&populate[category]=true&populate[blocks][populate]=*&sort=publishedAt:desc&pagination[pageSize]=500'
    );
    return data.data ?? [];
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

