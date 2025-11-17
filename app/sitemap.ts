import { MetadataRoute } from 'next';
import { APP_CONFIG } from '@/lib/config';

const baseUrl = APP_CONFIG.BASE_URL;

// Blog posts slugs
const blogPosts = [
  'kak-pravilno-otsenit-avtomobil',
  'dokumenty-dlya-vykupa-avto',
  'vykup-avto-posle-dtp',
  'rynok-podderzhannyh-avto-2024',
  'kak-izbezhat-obmana-pri-prodazhe-avto',
  'podgotovka-avto-k-prodazhe',
  'vykup-avto-v-kredite',
  'srochnyy-vykup-avtomobilya',
  'vykup-premium-avto',
  'otsenka-avto-spetsialistom',
  'dokumenty-dlya-prodazhi-avto',
  'vykup-avto-s-bolshim-probegom',
  'kak-vybrat-kompaniyu-dlya-vykupa',
  'tsenoobrazovanie-pri-vykupе-avto',
  'vykup-kommercheskogo-transporta',
  'pravovye-aspekty-vykupa-avto',
  'psikhologiya-prodazhi-avto',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // ogImage и logoImage не используются в sitemap

  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          ru: baseUrl,
        },
      }
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/services`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/services/buyback-cars`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/services/urgent-buyback`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/services/damaged-cars`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/services/after-accident`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/services/credit-cars`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/services/premium-cars`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/car-brands`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/documents`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/prices`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/guarantees`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/how-we-work`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/why-us`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.7
    },
  ];

  // Add blog posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: lastMonth,
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  return [...mainPages, ...blogPages];
}
