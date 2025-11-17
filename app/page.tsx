import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generateMetadata } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';
import ErrorBoundary from '@/components/ErrorBoundary';

// HeroSection - критичный контент, загружаем сразу
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  ssr: true,
});

// Lazy load all sections below Hero for better performance
const StatsSection = dynamic(() => import('@/components/sections/StatsSection'), {
  loading: () => <div className="h-64 bg-primary-600 animate-pulse" />,
});

const MoscowBuybackSection = dynamic(() => import('@/components/sections/MoscowBuybackSection'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

const HowToSellSection = dynamic(() => import('@/components/sections/HowToSellSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});

const WhatCarsWeBuySection = dynamic(() => import('@/components/sections/WhatCarsWeBuySection'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

const AnyConditionSection = dynamic(() => import('@/components/sections/AnyConditionSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});

const UrgentBuybackHoursSection = dynamic(() => import('@/components/sections/UrgentBuybackHoursSection'), {
  loading: () => <div className="h-64 bg-primary-600 animate-pulse" />,
});

const CTASection1 = dynamic(() => import('@/components/sections/CTASection1'), {
  loading: () => <div className="h-48 bg-primary-600 animate-pulse" />,
});

const CTASection2 = dynamic(() => import('@/components/sections/CTASection2'), {
  loading: () => <div className="h-48 bg-gray-50 animate-pulse" />,
});

const CTASection3 = dynamic(() => import('@/components/sections/CTASection3'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

const CarEvaluationForm = dynamic(() => import('@/components/CarEvaluationForm'), {
  loading: () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-6 animate-pulse" />
      <div className="space-y-4">
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  ),
});

const AdvantagesSection = dynamic(() => import('@/components/sections/AdvantagesSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});

const ProcessSection = dynamic(() => import('@/components/sections/ProcessSection'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

const CasesSection = dynamic(() => import('@/components/sections/CasesSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});

const ComparisonSection = dynamic(() => import('@/components/sections/ComparisonSection'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

const GuaranteesSection = dynamic(() => import('@/components/sections/GuaranteesSection'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});

const ReviewsPreview = dynamic(() => import('@/components/sections/ReviewsPreview'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});

const TrustSection = dynamic(() => import('@/components/sections/TrustSection'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

const UrgencySection = dynamic(() => import('@/components/sections/UrgencySection'), {
  loading: () => <div className="h-64 bg-primary-600 animate-pulse" />,
});

const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'), {
  ssr: false,
});

/**
 * Безопасное получение базового URL с fallback
 */
function getSafeBaseUrl(): string {
  try {
    const url = APP_CONFIG.BASE_URL || 'http://localhost:3000';
    // Проверяем валидность URL
    new URL(url);
    return url;
  } catch {
    return 'http://localhost:3000';
  }
}

const safeBaseUrl = getSafeBaseUrl();

const baseMetadata = generateMetadata({
  title: 'Выкуп Авто Москва | Срочный Выкуп за 2 часа | До 97%',
  description:
    'Выкуп авто в Москве и МО. Срочный выкуп за 2 часа: битых, после ДТП, кредитных. Оценка за 5 минут. До 97% рыночной стоимости. Моментальная оплата. 5.0 рейтинг, 5000+ клиентов.',
  keywords:
    'выкуп авто москва, выкуп автомобилей москва, срочный выкуп авто, быстрый выкуп авто, выкуп авто МО, выкуп битых авто, выкуп после ДТП, выкуп кредитных авто, продать авто быстро, продать машину москва, выкуп авто срочно, выкуп автомобилей МО, выкуп авто в московской области, продать авто в москве, выкуп машин, срочная продажа авто, выкуп авто любой марки, выкуп авто в любом состоянии, выкуп авто наличными, моментальный выкуп авто, выкуп авто премиум, выкуп элитных авто, выкуп коммерческого транспорта, выкуп авто в залоге, выкуп авто с пробегом, выкуп старых авто, выкуп дорогих авто, выкуп дешевых авто, выкуп авто без документов, выкуп авто с документами, онлайн калькулятор оценки авто, выкуп авто 97 процентов, выкуп авто по рыночной цене, выкуп авто с выездом, выкуп авто москва и московская область',
  path: '/',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...(baseMetadata.openGraph || {}),
    title: 'Выкуп Авто Москва | Срочный Выкуп за 2 часа | До 97%',
    description:
      'Выкуп авто в Москве и МО. Срочный выкуп за 2 часа: битых, после ДТП, кредитных. Оценка за 5 минут. До 97% рыночной стоимости. Моментальная оплата. 5.0 рейтинг, 5000+ клиентов',
    siteName: 'Выкуп авто',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: `${safeBaseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Выкуп авто в Москве и МО — Срочный выкуп автомобилей',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    ...(baseMetadata.twitter || {}),
    card: 'summary_large_image',
    title: 'Выкуп Авто Москва | Срочный Выкуп за 2 часа | До 97%',
    description:
      'Выкуп авто в Москве и МО. Срочный выкуп за 2 часа: битых, после ДТП, кредитных. Оценка за 5 минут. До 97% рыночной стоимости. Моментальная оплата. 5.0 рейтинг, 5000+ клиентов',
    images: [`${safeBaseUrl}/og-image.png`],
    creator: '@avtovykup',
    site: '@avtovykup',
  },
};

const baseUrl = safeBaseUrl;
const phone1 = APP_CONFIG.PHONE_1;
const phone2 = APP_CONFIG.PHONE_2;

// Service Schema для главной страницы
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Выкуп автомобилей в Москве и МО',
  description:
    'Профессиональный выкуп автомобилей в Москве и Московской области. Срочный выкуп за 2 часа, быстрая оценка за 5 минут, честная рыночная цена, моментальная оплата. Выкуп любых авто в любом состоянии: битых, после ДТП, кредитных, премиум.',
  provider: {
    '@type': 'Organization',
    name: 'Выкуп авто | Московский Авто Альянс',
    url: baseUrl,
    telephone: `+7${phone1.replace(/\D/g, '')}`,
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
  serviceType: 'Выкуп автомобилей',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '5000',
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'Offer',
    description: 'Выкуп автомобилей по рыночной стоимости',
    priceCurrency: 'RUB',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'RUB',
      valueAddedTaxIncluded: true,
    },
    eligibleRegion: [
      {
        '@type': 'City',
        name: 'Москва',
      },
      {
        '@type': 'State',
        name: 'Московская область',
      },
    ],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Услуги по выкупу автомобилей',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Выкуп легковых автомобилей',
          description: 'Выкуп легковых автомобилей всех марок и моделей',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Выкуп битых автомобилей',
          description: 'Выкуп автомобилей после ДТП и в любом состоянии',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Выкуп кредитных автомобилей',
          description: 'Выкуп автомобилей в залоге и кредите',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Срочный выкуп автомобилей',
          description: 'Срочный выкуп автомобилей за 2 часа',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Выкуп премиум автомобилей',
          description: 'Выкуп элитных и премиум автомобилей',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Выкуп коммерческого транспорта',
          description: 'Выкуп коммерческих автомобилей и транспорта',
        },
      },
    ],
  },
};

// BreadcrumbList Schema для главной страницы
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Главная',
      item: baseUrl,
    },
  ],
};

// ItemList Schema для преимуществ
const advantagesListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Преимущества выкупа авто',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Thing',
        name: 'Быстрая оценка',
        description: 'Оценка вашего автомобиля за 5 минут',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Thing',
        name: 'Честная цена',
        description: 'Рыночная стоимость с учетом всех факторов',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Thing',
        name: 'Моментальная оплата',
        description: 'Получите деньги сразу после осмотра',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Thing',
        name: 'Безопасная сделка',
        description: 'Официальное оформление документов',
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'Thing',
        name: 'Любое состояние',
        description: 'Выкупаем автомобили в любом состоянии',
      },
    },
    {
      '@type': 'ListItem',
      position: 6,
      item: {
        '@type': 'Thing',
        name: 'Выгодные условия',
        description: 'Лучшие цены на рынке',
      },
    },
  ],
};

// AggregateRating Schema для главной страницы
const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Выкуп авто | Московский Авто Альянс',
  url: baseUrl,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '5000',
    bestRating: '5',
    worstRating: '1',
  },
};

// PriceRange Schema для указания диапазона цен
const priceRangeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Выкуп автомобилей',
  provider: {
    '@type': 'Organization',
    name: 'Выкуп авто | Московский Авто Альянс',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'RUB',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'RUB',
      valueAddedTaxIncluded: true,
    },
  },
};

// FAQPage Schema для главной страницы
const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Как быстро можно продать автомобиль?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'В среднем сделка занимает 2 часа от момента звонка до получения денег. Мы приезжаем на место, осматриваем автомобиль, оформляем документы и сразу производим оплату. В некоторых случаях это может занять еще меньше времени.',
      },
    },
    {
      '@type': 'Question',
      name: 'Какие документы нужны для выкупа?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Для выкупа автомобиля вам понадобятся: паспорт транспортного средства (ПТС), свидетельство о регистрации (СТС), паспорт владельца. Если автомобиль в залоге или есть ограничения, нужно предоставить соответствующие документы. Мы поможем оформить все необходимые бумаги.',
      },
    },
    {
      '@type': 'Question',
      name: 'Выкупаете ли вы автомобили после ДТП?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Да, мы выкупаем автомобили в любом состоянии, включая те, что побывали в ДТП. Мы оцениваем остаточную стоимость, возможность восстановления или разбора на запчасти. Даже сильно поврежденные автомобили могут иметь хорошую стоимость.',
      },
    },
    {
      '@type': 'Question',
      name: 'Как вы определяете цену автомобиля?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Мы учитываем множество факторов: марку и модель, год выпуска, пробег, техническое состояние, наличие повреждений, комплектацию, рыночную стоимость на момент оценки. Наши специалисты имеют большой опыт и знают реальные цены на рынке.',
      },
    },
    {
      '@type': 'Question',
      name: 'Можно ли продать автомобиль в кредите?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Да, мы работаем с кредитными автомобилями. В этом случае нужно погасить кредит или мы можем помочь с оформлением перевода долга. Все зависит от конкретной ситуации и условий кредитного договора.',
      },
    },
    {
      '@type': 'Question',
      name: 'Какие способы оплаты вы предлагаете?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Мы предлагаем несколько способов оплаты: наличными, переводом на банковскую карту, банковским переводом. Вы можете выбрать наиболее удобный для вас вариант. Оплата производится сразу после подписания документов.',
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(advantagesListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(priceRangeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <HeroSection />
      <StatsSection />
      <section id="evaluation" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <ErrorBoundary>
            <CarEvaluationForm />
          </ErrorBoundary>
        </div>
      </section>
      <MoscowBuybackSection />
      <CTASection1 />
      <HowToSellSection />
      <WhatCarsWeBuySection />
      <AnyConditionSection />
      <AdvantagesSection />
      <UrgencySection />
      <UrgentBuybackHoursSection />
      <ProcessSection />
      <CTASection2 />
      <CasesSection />
      <ComparisonSection />
      <TrustSection />
      <GuaranteesSection />
      <FAQSection />
      <CTASection3 />
      <ReviewsPreview />
      <FloatingCTA />

      {/* SEO-текст для поисковых систем */}
      <section className="sr-only" aria-hidden="true">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Выкуп автомобилей в Москве и Московской области</h2>
          <p className="mb-4">
            <strong>Выкуп авто в Москве и МО</strong> — профессиональная услуга по срочному выкупу автомобилей.
            Мы предлагаем <strong>быстрый выкуп автомобилей</strong> всех марок и моделей в любом состоянии: битых,
            после ДТП, кредитных, премиум класса. Наша компания специализируется на <strong>срочном выкупе
            автомобилей за 2 часа</strong> с момента обращения. <strong>Выкуп авто Москва</strong> — это быстрая
            оценка за 5 минут, честная рыночная цена и моментальная оплата.
          </p>
          <p className="mb-4">
            <strong>Выкуп авто в Москве</strong> осуществляется по всей территории города и Московской области.
            Мы выкупаем легковые автомобили, коммерческий транспорт, автомобили после аварий,
            в кредите и залоге. <strong>Быстрая оценка автомобиля</strong> занимает всего 5 минут, после чего
            вы получаете честную рыночную цену и моментальную оплату наличными или на карту.
            <strong>Выкуп автомобилей МО</strong> — это выезд специалиста на место, официальное оформление
            документов и безопасная сделка.
          </p>
          <p className="mb-4">
            <strong>Продать авто в Москве</strong> быстро и выгодно — наша специализация. Мы работаем с любыми
            марками автомобилей: от бюджетных до премиум класса. <strong>Выкуп машин</strong> осуществляется
            наличными или переводом на карту — как вам удобно. Опыт работы более 10 лет,
            более 5000 довольных клиентов, рейтинг 5.0 из 5. <strong>Выкуп авто в московской области</strong> —
            это профессиональный подход, честные цены и гарантия безопасности сделки.
          </p>
          <h3 className="text-xl font-bold mb-3">Услуги выкупа автомобилей</h3>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>Выкуп легковых автомобилей</strong> всех марок и моделей — <a href="/services" className="underline">ознакомьтесь с услугами по выкупу авто</a></li>
            <li><strong>Выкуп битых автомобилей</strong> и после ДТП — <a href="/services" className="underline">выкуп авто после аварии</a></li>
            <li><strong>Выкуп кредитных автомобилей</strong> и в залоге — <a href="/services" className="underline">выкуп авто в кредите</a></li>
            <li><strong>Срочный выкуп автомобилей</strong> за 2 часа — <a href="/how-we-work" className="underline">как мы работаем</a></li>
            <li><strong>Выкуп премиум и элитных автомобилей</strong> — <a href="/services" className="underline">выкуп премиум авто</a></li>
            <li><strong>Выкуп коммерческого транспорта</strong> — <a href="/services" className="underline">выкуп коммерческих авто</a></li>
            <li><strong>Выкуп авто с пробегом</strong> и старых автомобилей</li>
            <li><strong>Выкуп дорогих и дешевых авто</strong> — <a href="/prices" className="underline">цены на выкуп авто</a></li>
          </ul>
          <p className="mb-4">
            <strong>Выкуп автомобилей МО</strong> — это быстрая и безопасная сделка. Мы оформляем все документы
            официально, проверяем автомобиль на ограничения, помогаем с документами.
            <strong>Выкуп авто в московской области</strong> осуществляется с выездом специалиста на место.
            <strong>Моментальный выкуп авто</strong> — это наша гарантия. <strong>Выкуп авто наличными</strong> или
            переводом на карту — выбор за вами. <a href="/guarantees" className="underline">Ознакомьтесь с гарантиями при выкупе авто</a> и
            <a href="/why-us" className="underline">узнайте конкурентные преимущества компании</a>.
          </p>
          <p className="mb-4">
            Хотите узнать <a href="/faq" className="underline">ответы на частые вопросы</a> о выкупе автомобилей?
            Или посмотреть <a href="/reviews" className="underline">отзывы наших клиентов</a>?
            Используйте наш <a href="/calculator" className="underline">калькулятор стоимости</a> для предварительной оценки.
            <a href="/blog" className="underline">Изучите полезные статьи о выкупе автомобилей в нашем блоге</a>.
          </p>
          <p>
            Свяжитесь с нами для оценки вашего автомобиля: <strong>{phone1}</strong>, <strong>{phone2}</strong>.
            <strong>Выкуп авто</strong> — ваш надежный партнер в продаже автомобиля.
            <strong>Выкуп авто срочно</strong> — звоните прямо сейчас! Посетите нашу страницу
            <a href="/contacts" className="underline">контактов</a> для получения дополнительной информации.
          </p>
        </div>
      </section>
    </>
  );
}
