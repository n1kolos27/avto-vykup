/**
 * SEO System - Schema.org Generation
 *
 * Генерация структурированных данных Schema.org
 */

import { APP_CONFIG } from '@/lib/config';

const domain = APP_CONFIG.DOMAIN;
const phone1 = APP_CONFIG.PHONE_1;
// phone2 не используется

/**
 * Генерация Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Выкуп авто | Московский Авто Альянс',
    alternateName: 'Выкуп авто',
    url: `https://${domain}`,
    logo: `https://${domain}/logo.png`,
    foundingDate: '2014',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Москва',
        addressRegion: 'Московская область',
        addressCountry: 'RU',
      },
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: `+7${phone1.replace(/\D/g, '')}`,
        contactType: 'customer service',
        areaServed: ['RU', 'Moscow', 'Moscow Oblast'],
        availableLanguage: ['Russian'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '09:00',
          closes: '21:00',
        },
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Москва',
      addressRegion: 'Московская область',
      addressCountry: 'RU',
    },
  };
}

/**
 * Генерация LocalBusiness Schema
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Выкуп авто | Московский Авто Альянс',
    image: `https://${domain}/logo.png`,
    url: `https://${domain}`,
    telephone: `+7${phone1.replace(/\D/g, '')}`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Москва',
      addressRegion: 'Московская область',
      addressCountry: 'RU',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '21:00',
    },
  };
}

/**
 * Генерация WebSite Schema
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Выкуп авто | Московский Авто Альянс',
    url: `https://${domain}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://${domain}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
