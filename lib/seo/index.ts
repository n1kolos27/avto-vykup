/**
 * SEO System
 * 
 * Единая система SEO для всего приложения.
 * Генерация мета-тегов, Schema.org, sitemap, robots.txt.
 * 
 * @module lib/seo
 */

// Import everything first (explicit imports work better with Next.js)
import { generateMetadata } from './metadata';
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
} from './schema';
import { generateSitemap, getDefaultSitemapEntries } from './sitemap';
import { generateRobotsTxt } from './robots';

// Export everything explicitly
export {
  generateMetadata,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateSitemap,
  getDefaultSitemapEntries,
  generateRobotsTxt,
};

// Export types
export type { SEOConfig } from '@/lib/types';
export type { SitemapEntry } from './sitemap';

