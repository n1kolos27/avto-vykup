import { Router } from 'express';
import { APP_CONFIG } from '../../src/lib/config/index.js';
const router = Router();
// Список всех статических страниц
const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/calculator', priority: '0.9', changefreq: 'weekly' },
    { path: '/reviews', priority: '0.8', changefreq: 'daily' },
    { path: '/blog', priority: '0.9', changefreq: 'daily' },
    { path: '/contacts', priority: '0.7', changefreq: 'monthly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/faq', priority: '0.8', changefreq: 'weekly' },
    { path: '/services', priority: '0.9', changefreq: 'weekly' },
    { path: '/services/buyback-cars', priority: '0.8', changefreq: 'weekly' },
    { path: '/services/urgent-buyback', priority: '0.9', changefreq: 'weekly' },
    { path: '/services/damaged-cars', priority: '0.8', changefreq: 'weekly' },
    { path: '/services/after-accident', priority: '0.8', changefreq: 'weekly' },
    { path: '/services/credit-cars', priority: '0.8', changefreq: 'weekly' },
    { path: '/services/premium-cars', priority: '0.8', changefreq: 'weekly' },
    { path: '/prices', priority: '0.8', changefreq: 'weekly' },
    { path: '/guarantees', priority: '0.7', changefreq: 'monthly' },
    { path: '/how-we-work', priority: '0.8', changefreq: 'monthly' },
    { path: '/why-us', priority: '0.7', changefreq: 'monthly' },
    { path: '/documents', priority: '0.7', changefreq: 'monthly' },
    { path: '/car-brands', priority: '0.8', changefreq: 'weekly' },
];
// Список блог-постов (из src/routes/Blog.tsx)
const blogPosts = [
    'kak-pravilno-otsenit-avtomobil',
    'dokumenty-dlya-vykupa-avto',
    'vykup-avto-posle-dtp',
    'rynok-podderzhannyh-avto-2024',
    'kak-izbezhat-obmana-pri-prodazhe-avto',
    'preimushchestva-vykupa-avto',
    'kak-podgotovit-avto-k-prodazhe',
    'vykup-kreditnyh-avtomobilej',
    'vykup-bityh-avto',
    'kak-uvelichit-stoimost-avto',
    'sravnenie-vykup-vs-prodazha',
    'yuridicheskie-aspekty-vykupa',
    'vykup-elitnyh-avtomobilej',
    'vykup-kommercheskogo-transporta',
    'sezonnost-rynka-avto',
    'kak-otsenit-realnuyu-stoimost',
    'psihologiya-prodazhi-avto',
];
/**
 * Генерация XML sitemap
 */
router.get('/sitemap.xml', (req, res) => {
    const baseUrl = APP_CONFIG.BASE_URL || 'https://mos-avto-alyans.ru';
    const currentDate = new Date().toISOString().split('T')[0];
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
    // Добавляем статические страницы
    for (const page of staticPages) {
        sitemap += `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }
    // Добавляем блог-посты
    for (const slug of blogPosts) {
        sitemap += `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
    sitemap += `
</urlset>`;
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Кэш на 1 час
    res.send(sitemap);
});
export default router;
