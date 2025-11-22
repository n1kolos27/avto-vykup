import type { LoaderFunctionArgs } from "react-router";
import { APP_CONFIG } from "~/lib/config/index";

export async function loader({ request }: LoaderFunctionArgs) {
  const baseUrl = APP_CONFIG.BASE_URL;
  
  const routes = [
    '',
    '/calculator',
    '/reviews',
    '/blog',
    '/contacts',
    '/about',
    '/faq',
    '/services',
    '/prices',
    '/guarantees',
    '/how-we-work',
    '/why-us',
    '/documents',
    '/car-brands',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

