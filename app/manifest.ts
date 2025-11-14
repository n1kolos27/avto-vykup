import { MetadataRoute } from 'next';
import { APP_CONFIG } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Выкуп авто - Выкуп автомобилей в Москве и МО',
    short_name: 'Выкуп авто',
    description: 'Профессиональный выкуп автомобилей в Москве и Московской области. Быстро, честно, выгодно.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0284c7',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['business', 'automotive'],
    lang: 'ru',
    orientation: 'portrait',
    scope: '/',
  };
}

