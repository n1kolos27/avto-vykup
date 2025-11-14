/**
 * SEO System - Robots.txt Generation
 * 
 * Генерация robots.txt
 */

import { APP_CONFIG } from '@/lib/config';

export interface RobotsRule {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
  crawlDelay?: number;
}

/**
 * Генерация robots.txt
 */
export function generateRobotsTxt(rules: RobotsRule[] = []): string {
  const baseUrl = APP_CONFIG.BASE_URL;
  
  const defaultRules: RobotsRule[] = [
    {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/api/', '/admin/', '/_next/'],
    },
  ];

  const allRules = rules.length > 0 ? rules : defaultRules;

  const lines: string[] = [];
  lines.push(`User-agent: *`);
  lines.push(`Sitemap: ${baseUrl}/sitemap.xml`);
  lines.push('');

  allRules.forEach((rule) => {
    lines.push(`User-agent: ${rule.userAgent}`);
    if (rule.allow) {
      rule.allow.forEach((path) => lines.push(`Allow: ${path}`));
    }
    if (rule.disallow) {
      rule.disallow.forEach((path) => lines.push(`Disallow: ${path}`));
    }
    if (rule.crawlDelay) {
      lines.push(`Crawl-delay: ${rule.crawlDelay}`);
    }
    lines.push('');
  });

  return lines.join('\n');
}

