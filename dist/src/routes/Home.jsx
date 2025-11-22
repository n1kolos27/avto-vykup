import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection.js';
import StatsSection from '../components/sections/StatsSection.js';
import AdvantagesSection from '../components/sections/AdvantagesSection.js';
import ProcessSection from '../components/sections/ProcessSection.js';
import GuaranteesSection from '../components/sections/GuaranteesSection.js';
import FAQSection from '../components/sections/FAQSection.js';
import MoscowBuybackSection from '../components/sections/MoscowBuybackSection.js';
import HowToSellSection from '../components/sections/HowToSellSection.js';
import WhatCarsWeBuySection from '../components/sections/WhatCarsWeBuySection.js';
import AnyConditionSection from '../components/sections/AnyConditionSection.js';
import UrgencySection from '../components/sections/UrgencySection.js';
import CTASection from '../components/sections/CTASection.js';
import CasesSection from '../components/sections/CasesSection.js';
import ComparisonSection from '../components/sections/ComparisonSection.js';
import TrustSection from '../components/sections/TrustSection.js';
import ReviewsPreview from '../components/sections/ReviewsPreview.js';
import CarEvaluationForm from '../components/CarEvaluationForm.js';
import FloatingCTA from '../components/FloatingCTA.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';
/**
 * Безопасное получение базового URL с fallback
 */
function getSafeBaseUrl() {
    try {
        const url = APP_CONFIG.BASE_URL || 'http://localhost:3000';
        // Проверяем валидность URL
        new URL(url);
        return url;
    }
    catch {
        return 'http://localhost:3000';
    }
}
const safeBaseUrl = getSafeBaseUrl();
const baseUrl = safeBaseUrl;
const phone1 = APP_CONFIG.PHONE_1;
const phone2 = APP_CONFIG.PHONE_2;
// Service Schema для главной страницы
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Выкуп автомобилей в Москве и МО',
    description: 'Профессиональный выкуп автомобилей в Москве и Московской области. Срочный выкуп за 2 часа, быстрая оценка за 5 минут, честная рыночная цена, моментальная оплата. Выкуп любых авто в любом состоянии: битых, после ДТП, кредитных, премиум.',
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
const Home = () => {
    const navigate = useNavigate();
    const handleLinkPress = (path) => {
        navigate(path);
    };
    return (<div className="flex-1">
      {/* Schema.org разметка */}
      <SchemaMarkup schema={serviceSchema} id="service-schema"/>
      <SchemaMarkup schema={breadcrumbSchema} id="breadcrumb-schema"/>
      <SchemaMarkup schema={advantagesListSchema} id="advantages-schema"/>
      <SchemaMarkup schema={aggregateRatingSchema} id="rating-schema"/>
      <SchemaMarkup schema={priceRangeSchema} id="price-schema"/>
      <SchemaMarkup schema={faqPageSchema} id="faq-schema"/>

      <HeroSection />
      <StatsSection />

      {/* Секция с формой оценки */}
      <section className="py-16 px-4 bg-white dark:bg-neutral-900 md:py-20 md:px-6 relative transition-colors" id="evaluation">
        {/* Section divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent"/>
        <ErrorBoundary>
          <CarEvaluationForm />
        </ErrorBoundary>
      </section>

      <MoscowBuybackSection />
      <HowToSellSection />
      <WhatCarsWeBuySection />
      <AnyConditionSection />
      <AdvantagesSection />
      
      {/* CTA после блока преимуществ */}
      <CTASection variant="primary" title="Остались вопросы или хотите узнать цену?" subtitle="Заполните форму и получите бесплатную оценку вашего автомобиля за 5 минут" buttonText="УЗНАТЬ ЦЕНУ →"/>

      <UrgencySection />
      <ProcessSection />
      <CasesSection />
      <ComparisonSection />
      <TrustSection />
      <GuaranteesSection />
      
      {/* CTA перед FAQ */}
      <CTASection variant="secondary" title="У вас остались вопросы?" subtitle="Задайте нам вопрос или получите бесплатную оценку вашего автомобиля" buttonText="Получить оценку →" showPhone={true} phoneVariant="primary"/>
      
      <FAQSection />
      <ReviewsPreview />
      <FloatingCTA />

      {/* SEO-текст для поисковых систем */}
      <div className="sr-only" aria-hidden="true">
        <h2 className="text-2xl font-bold mb-4">Выкуп автомобилей в Москве и Московской области</h2>
        <p className="text-sm leading-5 mb-4">
          <strong>Выкуп авто в Москве и МО</strong> — профессиональная услуга по срочному выкупу автомобилей.
          Мы предлагаем <strong>быстрый выкуп автомобилей</strong> всех марок и моделей в любом состоянии: битых,
          после ДТП, кредитных, премиум класса. Наша компания специализируется на <strong>срочном выкупе
          автомобилей за 2 часа</strong> с момента обращения. <strong>Выкуп авто Москва</strong> — это быстрая
          оценка за 5 минут, честная рыночная цена и моментальная оплата.
        </p>
        <p className="text-sm leading-5 mb-4">
          <strong>Выкуп авто в Москве</strong> осуществляется по всей территории города и Московской области.
          Мы выкупаем легковые автомобили, коммерческий транспорт, автомобили после аварий,
          в кредите и залоге. <strong>Быстрая оценка автомобиля</strong> занимает всего 5 минут, после чего
          вы получаете честную рыночную цену и моментальную оплату наличными или на карту.
          <strong>Выкуп автомобилей МО</strong> — это выезд специалиста на место, официальное оформление
          документов и безопасная сделка.
        </p>
        <p className="text-sm leading-5 mb-4">
          <strong>Продать авто в Москве</strong> быстро и выгодно — наша специализация. Мы работаем с любыми
          марками автомобилей: от бюджетных до премиум класса. <strong>Выкуп машин</strong> осуществляется
          наличными или переводом на карту — как вам удобно. Опыт работы более 10 лет,
          более 5000 довольных клиентов, рейтинг 5.0 из 5. <strong>Выкуп авто в московской области</strong> —
          это профессиональный подход, честные цены и гарантия безопасности сделки.
        </p>
        <h3 className="text-xl font-bold mt-4 mb-3">Услуги выкупа автомобилей</h3>
        <p className="text-sm leading-5 mb-4">
          <strong>Выкуп легковых автомобилей</strong> всех марок и моделей —{' '}
          <button onClick={() => handleLinkPress('/services')} className="text-primary-600 underline">
            ознакомьтесь с услугами по выкупу авто
          </button>
        </p>
        <p className="text-sm leading-5 mb-4">
          <strong>Выкуп битых автомобилей</strong> и после ДТП —{' '}
          <button onClick={() => handleLinkPress('/services')} className="text-primary-600 underline">
            выкуп авто после аварии
          </button>
        </p>
        <p className="text-sm leading-5 mb-4">
          <strong>Выкуп кредитных автомобилей</strong> и в залоге —{' '}
          <button onClick={() => handleLinkPress('/services')} className="text-primary-600 underline">
            выкуп авто в кредите
          </button>
        </p>
        <p className="text-sm leading-5 mb-4">
          <strong>Срочный выкуп автомобилей</strong> за 2 часа —{' '}
          <button onClick={() => handleLinkPress('/how-we-work')} className="text-primary-600 underline">
            как мы работаем
          </button>
        </p>
        <p className="text-sm leading-5 mb-4">
          <strong>Выкуп премиум и элитных автомобилей</strong> —{' '}
          <button onClick={() => handleLinkPress('/services')} className="text-primary-600 underline">
            выкуп премиум авто
          </button>
        </p>
        <p className="text-sm leading-5 mb-4">
          <strong>Выкуп коммерческого транспорта</strong> —{' '}
          <button onClick={() => handleLinkPress('/services')} className="text-primary-600 underline">
            выкуп коммерческих авто
          </button>
        </p>
        <p className="text-sm leading-5 mb-4">
          <strong>Выкуп авто с пробегом</strong> и старых автомобилей
        </p>
        <p className="text-sm leading-5 mb-4">
          <strong>Выкуп дорогих и дешевых авто</strong> —{' '}
          <button onClick={() => handleLinkPress('/prices')} className="text-primary-600 underline">
            цены на выкуп авто
          </button>
        </p>
        <p className="text-sm leading-5 mb-4">
          <strong>Выкуп автомобилей МО</strong> — это быстрая и безопасная сделка. Мы оформляем все документы
          официально, проверяем автомобиль на ограничения, помогаем с документами.
          <strong>Выкуп авто в московской области</strong> осуществляется с выездом специалиста на место.
          <strong>Моментальный выкуп авто</strong> — это наша гарантия. <strong>Выкуп авто наличными</strong> или
          переводом на карту — выбор за вами.{' '}
          <button onClick={() => handleLinkPress('/guarantees')} className="text-primary-600 underline">
            Ознакомьтесь с гарантиями при выкупе авто
          </button>{' '}
          и{' '}
          <button onClick={() => handleLinkPress('/why-us')} className="text-primary-600 underline">
            узнайте конкурентные преимущества компании
          </button>.
        </p>
        <p className="text-sm leading-5 mb-4">
          Хотите узнать{' '}
          <button onClick={() => handleLinkPress('/faq')} className="text-primary-600 underline">
            ответы на частые вопросы
          </button>{' '}
          о выкупе автомобилей? Или посмотреть{' '}
          <button onClick={() => handleLinkPress('/reviews')} className="text-primary-600 underline">
            отзывы наших клиентов
          </button>
          ? Используйте наш{' '}
          <button onClick={() => handleLinkPress('/calculator')} className="text-primary-600 underline">
            калькулятор стоимости
          </button>{' '}
          для предварительной оценки.{' '}
          <button onClick={() => handleLinkPress('/blog')} className="text-primary-600 underline">
            Изучите полезные статьи о выкупе автомобилей в нашем блоге
          </button>.
        </p>
        <p className="text-sm leading-5 mb-4">
          Свяжитесь с нами для оценки вашего автомобиля: <strong>{phone1}</strong>, <strong>{phone2}</strong>.
          <strong>Выкуп авто</strong> — ваш надежный партнер в продаже автомобиля.
          <strong>Выкуп авто срочно</strong> — звоните прямо сейчас! Посетите нашу страницу{' '}
          <button onClick={() => handleLinkPress('/contacts')} className="text-primary-600 underline">
            контактов
          </button>{' '}
          для получения дополнительной информации.
        </p>
      </div>
    </div>);
};
export default Home;
