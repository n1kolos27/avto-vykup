import type { LoaderFunctionArgs } from "react-router";
import { APP_CONFIG } from "~/lib/config/index";

export async function loader({ request }: LoaderFunctionArgs) {
  const baseUrl = APP_CONFIG.BASE_URL;
  
  const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

