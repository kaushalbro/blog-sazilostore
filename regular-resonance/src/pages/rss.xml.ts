import type { APIRoute } from 'astro';
import { getArticles, type Article } from '../lib/strapi';

export const GET: APIRoute = async () => {
  let articles: Article[] = [];
  try {
    articles = await getArticles();
  } catch {
    articles = [];
  }

  const siteUrl = 'https://blog.vritico.com';

  const itemsXml = articles
    .map((article) => {
      const title = article.title || 'Untitled';
      const link = `${siteUrl}/blog/${article.slug}`;
      const description = article.description || title;
      const pubDate = article.publishedAt
        ? new Date(article.publishedAt).toUTCString()
        : new Date().toUTCString();
      const author = article.author?.name || 'Sazilo Store Team';
      const category = article.category?.name || 'E-Commerce';

      return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${description}]]></description>
      <category><![CDATA[${category}]]></category>
      <author><![CDATA[${author}]]></author>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sazilo Store Blog — Stories, Technology &amp; Authentic Commerce</title>
    <description>Explore e-commerce guides, retail strategies, and tech tutorials from verified Nepali merchants on Sazilo Store Blog.</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
