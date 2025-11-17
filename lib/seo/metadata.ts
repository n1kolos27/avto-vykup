/**
 * SEO System - Metadata Generation
 *
 * Генерация мета-тегов для Next.js
 */

import { Metadata } from 'next';
import { APP_CONFIG } from '@/lib/config';
import type { SEOConfig } from '@/lib/types';

/**
 * Валидация и безопасное получение базового URL
 */
function getValidBaseUrl(): string {
  const baseUrl = APP_CONFIG.BASE_URL || 'http://localhost:3000';

  // Проверяем, что URL валиден
  try {
    new URL(baseUrl);
    return baseUrl;
  } catch {
    // Если URL невалиден, возвращаем fallback
    return 'http://localhost:3000';
  }
}

/**
 * Безопасное создание URL объекта
 */
function createSafeURL(url: string, fallback = 'http://localhost:3000'): URL {
  try {
    return new URL(url);
  } catch {
    return new URL(fallback);
  }
}

const baseUrl = getValidBaseUrl();
const siteName = APP_CONFIG.SITE_NAME;
const defaultImage = `${baseUrl}/og-image.png`;

/**
 * Генерация метаданных для страницы
 */
export function generateMetadata(config: SEOConfig): Metadata {
  try {
    const {
      title,
      description,
      keywords,
      path,
      image = defaultImage,
      type = 'website',
      publishedTime,
      modifiedTime,
      author = 'Выкуп авто',
      noindex = false,
    } = config;

    const fullTitle = `${title} | ${siteName}`;
    const url = `${baseUrl}${path || ''}`;

    return {
      title: fullTitle,
      description,
      keywords: keywords ? keywords.split(',').map((k) => k.trim()) : undefined,
      authors: [{ name: author }],
      creator: author,
      publisher: siteName,
      metadataBase: createSafeURL(baseUrl),
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: fullTitle,
        description,
        url,
        siteName,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
            type: 'image/png',
          },
        ],
        locale: 'ru_RU',
        type,
        ...(publishedTime && { publishedTime }),
        ...(modifiedTime && { modifiedTime }),
      },
      twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description,
        images: [image],
        creator: '@avtovykup',
        site: '@avtovykup',
      },
      robots: {
        index: !noindex,
        follow: !noindex,
        googleBot: {
          index: !noindex,
          follow: !noindex,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
    };
  } catch (error) {
    // В случае ошибки возвращаем минимальные метаданные
    console.error('Error generating metadata:', error);
    return {
      title: config.title || 'Выкуп авто',
      description: config.description || 'Выкуп автомобилей в Москве и МО',
      metadataBase: createSafeURL(baseUrl),
    };
  }
}
