import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "flex-1", children: [_jsx(SchemaMarkup, { schema: serviceSchema, id: "service-schema" }), _jsx(SchemaMarkup, { schema: breadcrumbSchema, id: "breadcrumb-schema" }), _jsx(SchemaMarkup, { schema: advantagesListSchema, id: "advantages-schema" }), _jsx(SchemaMarkup, { schema: aggregateRatingSchema, id: "rating-schema" }), _jsx(SchemaMarkup, { schema: priceRangeSchema, id: "price-schema" }), _jsx(SchemaMarkup, { schema: faqPageSchema, id: "faq-schema" }), _jsx(HeroSection, {}), _jsx(StatsSection, {}), _jsxs("section", { className: "py-16 px-4 bg-white dark:bg-neutral-900 md:py-20 md:px-6 relative transition-colors", id: "evaluation", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" }), _jsx(ErrorBoundary, { children: _jsx(CarEvaluationForm, {}) })] }), _jsx(MoscowBuybackSection, {}), _jsx(HowToSellSection, {}), _jsx(WhatCarsWeBuySection, {}), _jsx(AnyConditionSection, {}), _jsx(AdvantagesSection, {}), _jsx(CTASection, { variant: "primary", title: "\u041E\u0441\u0442\u0430\u043B\u0438\u0441\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u0438\u043B\u0438 \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0437\u043D\u0430\u0442\u044C \u0446\u0435\u043D\u0443?", subtitle: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u0443 \u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0443\u044E \u043E\u0446\u0435\u043D\u043A\u0443 \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F \u0437\u0430 5 \u043C\u0438\u043D\u0443\u0442", buttonText: "\u0423\u0417\u041D\u0410\u0422\u042C \u0426\u0415\u041D\u0423 \u2192" }), _jsx(UrgencySection, {}), _jsx(ProcessSection, {}), _jsx(CasesSection, {}), _jsx(ComparisonSection, {}), _jsx(TrustSection, {}), _jsx(GuaranteesSection, {}), _jsx(CTASection, { variant: "secondary", title: "\u0423 \u0432\u0430\u0441 \u043E\u0441\u0442\u0430\u043B\u0438\u0441\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B?", subtitle: "\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u043D\u0430\u043C \u0432\u043E\u043F\u0440\u043E\u0441 \u0438\u043B\u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0443\u044E \u043E\u0446\u0435\u043D\u043A\u0443 \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F", buttonText: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043E\u0446\u0435\u043D\u043A\u0443 \u2192", showPhone: true, phoneVariant: "primary" }), _jsx(FAQSection, {}), _jsx(ReviewsPreview, {}), _jsx(FloatingCTA, {}), _jsxs("div", { className: "sr-only", "aria-hidden": "true", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u0432 \u041C\u043E\u0441\u043A\u0432\u0435 \u0438 \u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438" }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: [_jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u0432 \u041C\u043E\u0441\u043A\u0432\u0435 \u0438 \u041C\u041E" }), " \u2014 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0443\u0441\u043B\u0443\u0433\u0430 \u043F\u043E \u0441\u0440\u043E\u0447\u043D\u043E\u043C\u0443 \u0432\u044B\u043A\u0443\u043F\u0443 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439. \u041C\u044B \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C ", _jsx("strong", { children: "\u0431\u044B\u0441\u0442\u0440\u044B\u0439 \u0432\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), " \u0432\u0441\u0435\u0445 \u043C\u0430\u0440\u043E\u043A \u0438 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0432 \u043B\u044E\u0431\u043E\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438: \u0431\u0438\u0442\u044B\u0445, \u043F\u043E\u0441\u043B\u0435 \u0414\u0422\u041F, \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u044B\u0445, \u043F\u0440\u0435\u043C\u0438\u0443\u043C \u043A\u043B\u0430\u0441\u0441\u0430. \u041D\u0430\u0448\u0430 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u043D\u0430 ", _jsx("strong", { children: "\u0441\u0440\u043E\u0447\u043D\u043E\u043C \u0432\u044B\u043A\u0443\u043F\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u0437\u0430 2 \u0447\u0430\u0441\u0430" }), " \u0441 \u043C\u043E\u043C\u0435\u043D\u0442\u0430 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F. ", _jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u041C\u043E\u0441\u043A\u0432\u0430" }), " \u2014 \u044D\u0442\u043E \u0431\u044B\u0441\u0442\u0440\u0430\u044F \u043E\u0446\u0435\u043D\u043A\u0430 \u0437\u0430 5 \u043C\u0438\u043D\u0443\u0442, \u0447\u0435\u0441\u0442\u043D\u0430\u044F \u0440\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u0446\u0435\u043D\u0430 \u0438 \u043C\u043E\u043C\u0435\u043D\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u043E\u043F\u043B\u0430\u0442\u0430."] }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: [_jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u0432 \u041C\u043E\u0441\u043A\u0432\u0435" }), " \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u043E \u0432\u0441\u0435\u0439 \u0442\u0435\u0440\u0440\u0438\u0442\u043E\u0440\u0438\u0438 \u0433\u043E\u0440\u043E\u0434\u0430 \u0438 \u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438. \u041C\u044B \u0432\u044B\u043A\u0443\u043F\u0430\u0435\u043C \u043B\u0435\u0433\u043A\u043E\u0432\u044B\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438, \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0439 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442, \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438 \u043F\u043E\u0441\u043B\u0435 \u0430\u0432\u0430\u0440\u0438\u0439, \u0432 \u043A\u0440\u0435\u0434\u0438\u0442\u0435 \u0438 \u0437\u0430\u043B\u043E\u0433\u0435. ", _jsx("strong", { children: "\u0411\u044B\u0441\u0442\u0440\u0430\u044F \u043E\u0446\u0435\u043D\u043A\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" }), " \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 \u0432\u0441\u0435\u0433\u043E 5 \u043C\u0438\u043D\u0443\u0442, \u043F\u043E\u0441\u043B\u0435 \u0447\u0435\u0433\u043E \u0432\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0435 \u0447\u0435\u0441\u0442\u043D\u0443\u044E \u0440\u044B\u043D\u043E\u0447\u043D\u0443\u044E \u0446\u0435\u043D\u0443 \u0438 \u043C\u043E\u043C\u0435\u043D\u0442\u0430\u043B\u044C\u043D\u0443\u044E \u043E\u043F\u043B\u0430\u0442\u0443 \u043D\u0430\u043B\u0438\u0447\u043D\u044B\u043C\u0438 \u0438\u043B\u0438 \u043D\u0430 \u043A\u0430\u0440\u0442\u0443.", _jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u041C\u041E" }), " \u2014 \u044D\u0442\u043E \u0432\u044B\u0435\u0437\u0434 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u0430 \u043D\u0430 \u043C\u0435\u0441\u0442\u043E, \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0435 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0438 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u0430\u044F \u0441\u0434\u0435\u043B\u043A\u0430."] }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: [_jsx("strong", { children: "\u041F\u0440\u043E\u0434\u0430\u0442\u044C \u0430\u0432\u0442\u043E \u0432 \u041C\u043E\u0441\u043A\u0432\u0435" }), " \u0431\u044B\u0441\u0442\u0440\u043E \u0438 \u0432\u044B\u0433\u043E\u0434\u043D\u043E \u2014 \u043D\u0430\u0448\u0430 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F. \u041C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0441 \u043B\u044E\u0431\u044B\u043C\u0438 \u043C\u0430\u0440\u043A\u0430\u043C\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439: \u043E\u0442 \u0431\u044E\u0434\u0436\u0435\u0442\u043D\u044B\u0445 \u0434\u043E \u043F\u0440\u0435\u043C\u0438\u0443\u043C \u043A\u043B\u0430\u0441\u0441\u0430. ", _jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u043C\u0430\u0448\u0438\u043D" }), " \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0430\u043B\u0438\u0447\u043D\u044B\u043C\u0438 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u043C \u043D\u0430 \u043A\u0430\u0440\u0442\u0443 \u2014 \u043A\u0430\u043A \u0432\u0430\u043C \u0443\u0434\u043E\u0431\u043D\u043E. \u041E\u043F\u044B\u0442 \u0440\u0430\u0431\u043E\u0442\u044B \u0431\u043E\u043B\u0435\u0435 10 \u043B\u0435\u0442, \u0431\u043E\u043B\u0435\u0435 5000 \u0434\u043E\u0432\u043E\u043B\u044C\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432, \u0440\u0435\u0439\u0442\u0438\u043D\u0433 5.0 \u0438\u0437 5. ", _jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u0432 \u043C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438" }), " \u2014 \u044D\u0442\u043E \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u043E\u0434\u0445\u043E\u0434, \u0447\u0435\u0441\u0442\u043D\u044B\u0435 \u0446\u0435\u043D\u044B \u0438 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0441\u0434\u0435\u043B\u043A\u0438."] }), _jsx("h3", { className: "text-xl font-bold mt-4 mb-3", children: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0432\u044B\u043A\u0443\u043F\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: [_jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u043B\u0435\u0433\u043A\u043E\u0432\u044B\u0445 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), " \u0432\u0441\u0435\u0445 \u043C\u0430\u0440\u043E\u043A \u0438 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u2014", ' ', _jsx("button", { onClick: () => handleLinkPress('/services'), className: "text-primary-600 underline", children: "\u043E\u0437\u043D\u0430\u043A\u043E\u043C\u044C\u0442\u0435\u0441\u044C \u0441 \u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438 \u043F\u043E \u0432\u044B\u043A\u0443\u043F\u0443 \u0430\u0432\u0442\u043E" })] }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: [_jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u0431\u0438\u0442\u044B\u0445 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), " \u0438 \u043F\u043E\u0441\u043B\u0435 \u0414\u0422\u041F \u2014", ' ', _jsx("button", { onClick: () => handleLinkPress('/services'), className: "text-primary-600 underline", children: "\u0432\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u043F\u043E\u0441\u043B\u0435 \u0430\u0432\u0430\u0440\u0438\u0438" })] }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: [_jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u044B\u0445 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), " \u0438 \u0432 \u0437\u0430\u043B\u043E\u0433\u0435 \u2014", ' ', _jsx("button", { onClick: () => handleLinkPress('/services'), className: "text-primary-600 underline", children: "\u0432\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u0432 \u043A\u0440\u0435\u0434\u0438\u0442\u0435" })] }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: [_jsx("strong", { children: "\u0421\u0440\u043E\u0447\u043D\u044B\u0439 \u0432\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), " \u0437\u0430 2 \u0447\u0430\u0441\u0430 \u2014", ' ', _jsx("button", { onClick: () => handleLinkPress('/how-we-work'), className: "text-primary-600 underline", children: "\u043A\u0430\u043A \u043C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C" })] }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: [_jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u043F\u0440\u0435\u043C\u0438\u0443\u043C \u0438 \u044D\u043B\u0438\u0442\u043D\u044B\u0445 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), " \u2014", ' ', _jsx("button", { onClick: () => handleLinkPress('/services'), className: "text-primary-600 underline", children: "\u0432\u044B\u043A\u0443\u043F \u043F\u0440\u0435\u043C\u0438\u0443\u043C \u0430\u0432\u0442\u043E" })] }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: [_jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0430" }), " \u2014", ' ', _jsx("button", { onClick: () => handleLinkPress('/services'), className: "text-primary-600 underline", children: "\u0432\u044B\u043A\u0443\u043F \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0445 \u0430\u0432\u0442\u043E" })] }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: [_jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u0441 \u043F\u0440\u043E\u0431\u0435\u0433\u043E\u043C" }), " \u0438 \u0441\u0442\u0430\u0440\u044B\u0445 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439"] }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: [_jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u0434\u043E\u0440\u043E\u0433\u0438\u0445 \u0438 \u0434\u0435\u0448\u0435\u0432\u044B\u0445 \u0430\u0432\u0442\u043E" }), " \u2014", ' ', _jsx("button", { onClick: () => handleLinkPress('/prices'), className: "text-primary-600 underline", children: "\u0446\u0435\u043D\u044B \u043D\u0430 \u0432\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E" })] }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: [_jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u041C\u041E" }), " \u2014 \u044D\u0442\u043E \u0431\u044B\u0441\u0442\u0440\u0430\u044F \u0438 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u0430\u044F \u0441\u0434\u0435\u043B\u043A\u0430. \u041C\u044B \u043E\u0444\u043E\u0440\u043C\u043B\u044F\u0435\u043C \u0432\u0441\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E, \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044C \u043D\u0430 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F, \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u043C \u0441 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u043C\u0438.", _jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u0432 \u043C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438" }), " \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0441 \u0432\u044B\u0435\u0437\u0434\u043E\u043C \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u0430 \u043D\u0430 \u043C\u0435\u0441\u0442\u043E.", _jsx("strong", { children: "\u041C\u043E\u043C\u0435\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E" }), " \u2014 \u044D\u0442\u043E \u043D\u0430\u0448\u0430 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F. ", _jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u043D\u0430\u043B\u0438\u0447\u043D\u044B\u043C\u0438" }), " \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u043C \u043D\u0430 \u043A\u0430\u0440\u0442\u0443 \u2014 \u0432\u044B\u0431\u043E\u0440 \u0437\u0430 \u0432\u0430\u043C\u0438.", ' ', _jsx("button", { onClick: () => handleLinkPress('/guarantees'), className: "text-primary-600 underline", children: "\u041E\u0437\u043D\u0430\u043A\u043E\u043C\u044C\u0442\u0435\u0441\u044C \u0441 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F\u043C\u0438 \u043F\u0440\u0438 \u0432\u044B\u043A\u0443\u043F\u0435 \u0430\u0432\u0442\u043E" }), ' ', "\u0438", ' ', _jsx("button", { onClick: () => handleLinkPress('/why-us'), className: "text-primary-600 underline", children: "\u0443\u0437\u043D\u0430\u0439\u0442\u0435 \u043A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442\u043D\u044B\u0435 \u043F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438" }), "."] }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: ["\u0425\u043E\u0442\u0438\u0442\u0435 \u0443\u0437\u043D\u0430\u0442\u044C", ' ', _jsx("button", { onClick: () => handleLinkPress('/faq'), className: "text-primary-600 underline", children: "\u043E\u0442\u0432\u0435\u0442\u044B \u043D\u0430 \u0447\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B" }), ' ', "\u043E \u0432\u044B\u043A\u0443\u043F\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439? \u0418\u043B\u0438 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C", ' ', _jsx("button", { onClick: () => handleLinkPress('/reviews'), className: "text-primary-600 underline", children: "\u043E\u0442\u0437\u044B\u0432\u044B \u043D\u0430\u0448\u0438\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" }), "? \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043D\u0430\u0448", ' ', _jsx("button", { onClick: () => handleLinkPress('/calculator'), className: "text-primary-600 underline", children: "\u043A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438" }), ' ', "\u0434\u043B\u044F \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u043E\u0446\u0435\u043D\u043A\u0438.", ' ', _jsx("button", { onClick: () => handleLinkPress('/blog'), className: "text-primary-600 underline", children: "\u0418\u0437\u0443\u0447\u0438\u0442\u0435 \u043F\u043E\u043B\u0435\u0437\u043D\u044B\u0435 \u0441\u0442\u0430\u0442\u044C\u0438 \u043E \u0432\u044B\u043A\u0443\u043F\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u0432 \u043D\u0430\u0448\u0435\u043C \u0431\u043B\u043E\u0433\u0435" }), "."] }), _jsxs("p", { className: "text-sm leading-5 mb-4", children: ["\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u0434\u043B\u044F \u043E\u0446\u0435\u043D\u043A\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F: ", _jsx("strong", { children: phone1 }), ", ", _jsx("strong", { children: phone2 }), ".", _jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E" }), " \u2014 \u0432\u0430\u0448 \u043D\u0430\u0434\u0435\u0436\u043D\u044B\u0439 \u043F\u0430\u0440\u0442\u043D\u0435\u0440 \u0432 \u043F\u0440\u043E\u0434\u0430\u0436\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F.", _jsx("strong", { children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u0441\u0440\u043E\u0447\u043D\u043E" }), " \u2014 \u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u043F\u0440\u044F\u043C\u043E \u0441\u0435\u0439\u0447\u0430\u0441! \u041F\u043E\u0441\u0435\u0442\u0438\u0442\u0435 \u043D\u0430\u0448\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443", ' ', _jsx("button", { onClick: () => handleLinkPress('/contacts'), className: "text-primary-600 underline", children: "\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432" }), ' ', "\u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438."] })] })] }));
};
export default Home;
