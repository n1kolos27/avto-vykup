import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { APP_CONFIG } from '@/lib/config';

// Некритичные компоненты - отложенная загрузка без SSR
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
});

const Analytics = dynamic(() => import('@/components/Analytics'), {
  ssr: false,
});

const ScrollAnalytics = dynamic(() => import('@/components/ScrollAnalytics'), {
  ssr: false,
});

const ToastProvider = dynamic(() => import('@/components/ToastProvider'), {
  ssr: false,
});

const BrowserWarning = dynamic(() => import('@/components/BrowserWarning'), {
  ssr: false,
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
});

const domain = APP_CONFIG.DOMAIN;

export const metadata: Metadata = {
  title: 'Выкуп авто в Москве и МО | Быстро и Выгодно | До 97%',
  description:
    'Профессиональный выкуп автомобилей в Москве и МО. Оценка за 5 минут, до 97% рыночной стоимости, моментальная оплата. Срочный выкуп за 2 часа. Звоните: 89857520001',
  keywords: 'выкуп авто, выкуп автомобилей, продать авто, Москва, МО, быстрый выкуп',
  authors: [{ name: 'Выкуп авто' }],
  creator: 'Выкуп авто',
  publisher: 'Выкуп авто',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://${domain}`),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Выкуп авто в Москве и МО | Быстро и Выгодно | До 97%',
    description: 'Профессиональный выкуп автомобилей в Москве и МО. Оценка за 5 минут, до 97% рыночной стоимости, моментальная оплата. Срочный выкуп за 2 часа.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Выкуп авто',
    url: `https://${domain}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Выкуп авто в Москве и МО | Быстро и Выгодно | До 97%',
    description: 'Профессиональный выкуп автомобилей в Москве и МО. Оценка за 5 минут, до 97% рыночной стоимости, моментальная оплата. Срочный выкуп за 2 часа.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const phone1 = APP_CONFIG.PHONE_1;
const phone2 = APP_CONFIG.PHONE_2;

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Выкуп авто | Московский Авто Альянс',
  alternateName: 'Выкуп авто',
  url: `https://${domain}`,
  logo: `https://${domain}/logo.svg`,
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
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: '15-50',
  },
  legalName: 'Выкуп авто | Московский Авто Альянс',
  description: 'Профессиональный выкуп автомобилей в Москве и Московской области. Более 10 лет опыта, 5000+ довольных клиентов.',
  knowsAbout: ['Выкуп автомобилей', 'Продажа автомобилей', 'Оценка автомобилей', 'Автомобильный бизнес'],
  areaServed: [
    {
      '@type': 'City',
      name: 'Москва',
    },
    {
      '@type': 'State',
      name: 'Московская область',
    },
  ],
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
    {
      '@type': 'ContactPoint',
      telephone: `+7${phone2.replace(/\D/g, '')}`,
      contactType: 'sales',
      areaServed: ['RU', 'Moscow', 'Moscow Oblast'],
      availableLanguage: ['Russian'],
    },
  ],
  sameAs: [],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Москва',
    addressRegion: 'Московская область',
    addressCountry: 'RU',
    streetAddress: 'Москва и Московская область',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '12',
    bestRating: '5',
    worstRating: '1',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Выкуп авто | Московский Авто Альянс',
  image: `https://${domain}/logo.svg`,
  '@id': `https://${domain}`,
  url: `https://${domain}`,
  telephone: `+7${phone1.replace(/\D/g, '')}`,
  priceRange: '$$',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  currenciesAccepted: 'RUB',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Москва',
    addressRegion: 'Московская область',
    addressCountry: 'RU',
    streetAddress: 'Москва и Московская область',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Москва',
    },
    {
      '@type': 'State',
      name: 'Московская область',
    },
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 55.7558,
    longitude: 37.6173,
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '12',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Александр',
      },
      datePublished: '2024-03-15',
      reviewBody: 'Продал свой автомобиль за один день. Оценка была честной, деньги получил сразу. Очень доволен!',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        {/* Полифиллы для старых браузеров - загружаются условно */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Проверка и загрузка полифиллов только для старых браузеров
              (function() {
                // Проверка поддержки IntersectionObserver
                if (!window.IntersectionObserver) {
                  var script = document.createElement('script');
                  script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
                  script.async = true;
                  document.head.appendChild(script);
                }

                // Проверка поддержки ResizeObserver
                if (!window.ResizeObserver) {
                  var script2 = document.createElement('script');
                  script2.src = 'https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver';
                  script2.async = true;
                  document.head.appendChild(script2);
                }

                // Проверка поддержки Intl (для старых браузеров)
                if (!window.Intl || !window.Intl.NumberFormat || !window.Intl.DateTimeFormat) {
                  var script3 = document.createElement('script');
                  script3.src = 'https://polyfill.io/v3/polyfill.min.js?features=Intl,Intl.~locale.ru';
                  script3.async = true;
                  document.head.appendChild(script3);
                }
              })();
            `,
          }}
        />
        {/* Критичная схема Organization - оставляем в head для SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Перейти к основному содержимому
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">{children}</main>
        <Footer />
        <ErrorBoundary>
          <ToastProvider />
        </ErrorBoundary>
        <ErrorBoundary>
          <ChatWidget />
        </ErrorBoundary>
        <ErrorBoundary>
          <Analytics />
        </ErrorBoundary>
        <ErrorBoundary>
          <ScrollAnalytics />
        </ErrorBoundary>
        <ErrorBoundary>
          <BrowserWarning />
        </ErrorBoundary>
        {/* Некритичные JSON-LD схемы - загружаются в конце body */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
      </body>
    </html>
  );
}
