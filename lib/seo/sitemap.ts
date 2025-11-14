/**
 * SEO System - Sitemap Generation
 * 
 * Генерация sitemap.xml
 */

import { APP_CONFIG } from '@/lib/config';

export interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Генерация sitemap.xml
 */
export function generateSitemap(entries: SitemapEntry[]): string {
  const baseUrl = APP_CONFIG.BASE_URL;
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${baseUrl}${entry.url}</loc>
    ${entry.lastModified ? `    <lastmod>${entry.lastModified}</lastmod>` : ''}
    ${entry.changeFrequency ? `    <changefreq>${entry.changeFrequency}</changefreq>` : ''}
    ${entry.priority !== undefined ? `    <priority>${entry.priority}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
}

/**
 * Стандартные страницы для sitemap
 */
export function getDefaultSitemapEntries(): SitemapEntry[] {
  return [
    {
      url: '/',
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: '/about',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: '/services',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: '/blog',
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: '/contacts',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}

