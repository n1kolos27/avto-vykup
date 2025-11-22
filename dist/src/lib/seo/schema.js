import { APP_CONFIG } from '../config/index.js';
/**
 * Получение Schema.org разметки для конкретного роута
 * Используется для SSR рендеринга
 */
export function getSchemaForRoute(pathname) {
    const baseUrl = APP_CONFIG.BASE_URL || 'https://mos-avto-alyans.ru';
    const phone1 = APP_CONFIG.PHONE_1 || '+7 (985) 752-00-01';
    const phone1Clean = phone1.replace(/\D/g, '');
    const schemas = [];
    // Базовая Organization Schema для всех страниц
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Выкуп авто | Московский Авто Альянс',
        url: baseUrl,
        telephone: `+7${phone1Clean}`,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Москва',
            addressRegion: 'Московская область',
            addressCountry: 'RU',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            reviewCount: '5000',
            bestRating: '5',
            worstRating: '1',
        },
    };
    schemas.push(organizationSchema);
    // Специфичные Schema для разных страниц
    switch (pathname) {
        case '/': {
            // Service Schema для главной страницы
            const serviceSchema = {
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: 'Выкуп автомобилей в Москве и МО',
                description: 'Профессиональный выкуп автомобилей в Москве и Московской области. Срочный выкуп за 2 часа, быстрая оценка за 5 минут, честная рыночная цена, моментальная оплата.',
                provider: {
                    '@type': 'Organization',
                    name: 'Выкуп авто | Московский Авто Альянс',
                    url: baseUrl,
                    telephone: `+7${phone1Clean}`,
                },
                areaServed: [
                    { '@type': 'City', name: 'Москва' },
                    { '@type': 'State', name: 'Московская область' },
                ],
                serviceType: 'Выкуп автомобилей',
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '5',
                    reviewCount: '5000',
                    bestRating: '5',
                    worstRating: '1',
                },
            };
            schemas.push(serviceSchema);
            // BreadcrumbList Schema
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
            schemas.push(breadcrumbSchema);
            break;
        }
        case '/calculator': {
            const webApplicationSchema = {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'Калькулятор стоимости автомобиля',
                description: 'Онлайн калькулятор для расчета предварительной стоимости автомобиля. Учитывает марку, модель, год выпуска, пробег и состояние.',
                url: `${baseUrl}/calculator`,
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web',
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'RUB',
                },
                provider: {
                    '@type': 'Organization',
                    name: 'Выкуп авто | Московский Авто Альянс',
                    url: baseUrl,
                },
            };
            schemas.push(webApplicationSchema);
            break;
        }
        case '/services/urgent-buyback': {
            const serviceSchema = {
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: 'Срочный выкуп авто за 2 часа',
                description: 'Срочный выкуп автомобилей за 2 часа в Москве и МО. Моментальная оценка и оплата.',
                provider: {
                    '@type': 'Organization',
                    name: 'Выкуп авто | Московский Авто Альянс',
                    url: baseUrl,
                    telephone: `+7${phone1Clean}`,
                },
                areaServed: [
                    { '@type': 'City', name: 'Москва' },
                    { '@type': 'State', name: 'Московская область' },
                ],
            };
            schemas.push(serviceSchema);
            break;
        }
        case '/services/damaged-cars': {
            const serviceSchema = {
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: 'Выкуп битых автомобилей',
                description: 'Выкупаем битые и поврежденные автомобили в Москве и МО. Справедливая оценка остаточной стоимости.',
                provider: {
                    '@type': 'Organization',
                    name: 'Выкуп авто | Московский Авто Альянс',
                    url: baseUrl,
                    telephone: `+7${phone1Clean}`,
                },
                areaServed: [
                    { '@type': 'City', name: 'Москва' },
                    { '@type': 'State', name: 'Московская область' },
                ],
            };
            schemas.push(serviceSchema);
            break;
        }
        case '/services/after-accident': {
            const serviceSchema = {
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: 'Выкуп авто после ДТП',
                description: 'Выкуп автомобилей после ДТП в Москве и МО. Быстрая оценка и выкуп поврежденных в аварии авто.',
                provider: {
                    '@type': 'Organization',
                    name: 'Выкуп авто | Московский Авто Альянс',
                    url: baseUrl,
                    telephone: `+7${phone1Clean}`,
                },
                areaServed: [
                    { '@type': 'City', name: 'Москва' },
                    { '@type': 'State', name: 'Московская область' },
                ],
            };
            schemas.push(serviceSchema);
            break;
        }
        case '/services/credit-cars': {
            const serviceSchema = {
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: 'Выкуп кредитных автомобилей',
                description: 'Выкуп автомобилей в кредите или залоге. Помогаем решить вопрос с банком. Быстрое оформление.',
                provider: {
                    '@type': 'Organization',
                    name: 'Выкуп авто | Московский Авто Альянс',
                    url: baseUrl,
                    telephone: `+7${phone1Clean}`,
                },
                areaServed: [
                    { '@type': 'City', name: 'Москва' },
                    { '@type': 'State', name: 'Московская область' },
                ],
            };
            schemas.push(serviceSchema);
            break;
        }
        case '/services/premium-cars': {
            const serviceSchema = {
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: 'Выкуп премиум и элитных автомобилей',
                description: 'Специализируемся на выкупе элитных и премиум автомобилей. Знаем специфику оценки таких автомобилей.',
                provider: {
                    '@type': 'Organization',
                    name: 'Выкуп авто | Московский Авто Альянс',
                    url: baseUrl,
                    telephone: `+7${phone1Clean}`,
                },
                areaServed: [
                    { '@type': 'City', name: 'Москва' },
                    { '@type': 'State', name: 'Московская область' },
                ],
            };
            schemas.push(serviceSchema);
            break;
        }
        case '/services/buyback-cars': {
            const serviceSchema = {
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: 'Выкуп автомобилей',
                description: 'Выкупаем легковые автомобили всех марок и моделей в любом состоянии. От бюджетных до премиум класса.',
                provider: {
                    '@type': 'Organization',
                    name: 'Выкуп авто | Московский Авто Альянс',
                    url: baseUrl,
                    telephone: `+7${phone1Clean}`,
                },
                areaServed: [
                    { '@type': 'City', name: 'Москва' },
                    { '@type': 'State', name: 'Московская область' },
                ],
            };
            schemas.push(serviceSchema);
            break;
        }
        case '/contacts': {
            // LocalBusiness Schema для страницы контактов
            const localBusinessSchema = {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Выкуп авто | Московский Авто Альянс',
                description: 'Профессиональный выкуп автомобилей в Москве и Московской области',
                url: baseUrl,
                telephone: `+7${phone1Clean}`,
                email: APP_CONFIG.EMAIL || 'info@mos-avto-alyans.ru',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Москва',
                    addressRegion: 'Московская область',
                    addressCountry: 'RU',
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: '55.7558',
                    longitude: '37.6173',
                },
                openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    opens: '09:00',
                    closes: '21:00',
                },
                priceRange: '$$',
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '5',
                    reviewCount: '5000',
                    bestRating: '5',
                    worstRating: '1',
                },
            };
            schemas.push(localBusinessSchema);
            // BreadcrumbList Schema
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
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Контакты',
                        item: `${baseUrl}/contacts`,
                    },
                ],
            };
            schemas.push(breadcrumbSchema);
            break;
        }
        case '/reviews': {
            // Review Schema для страницы отзывов
            const reviewSchema = {
                '@context': 'https://schema.org',
                '@type': 'Review',
                itemReviewed: {
                    '@type': 'Service',
                    name: 'Выкуп автомобилей',
                    provider: {
                        '@type': 'Organization',
                        name: 'Выкуп авто | Московский Авто Альянс',
                        url: baseUrl,
                    },
                },
                author: {
                    '@type': 'Organization',
                    name: 'Клиенты компании',
                },
                reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                    worstRating: '1',
                },
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '5',
                    reviewCount: '5000',
                    bestRating: '5',
                    worstRating: '1',
                },
            };
            schemas.push(reviewSchema);
            // BreadcrumbList Schema
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
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Отзывы',
                        item: `${baseUrl}/reviews`,
                    },
                ],
            };
            schemas.push(breadcrumbSchema);
            break;
        }
        case '/faq': {
            const faqSchema = {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Как происходит оценка автомобиля?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Оценка происходит в несколько этапов: сначала вы заполняете форму на сайте или звоните нам, затем наш специалист выезжает к вам для осмотра автомобиля, после чего мы предлагаем окончательную цену.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Какие документы нужны для выкупа?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Для выкупа автомобиля вам понадобятся: паспорт владельца, ПТС (паспорт транспортного средства), свидетельство о регистрации ТС, а также документы, подтверждающие право собственности.',
                        },
                    },
                ],
            };
            schemas.push(faqSchema);
            // BreadcrumbList Schema
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
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'FAQ',
                        item: `${baseUrl}/faq`,
                    },
                ],
            };
            schemas.push(breadcrumbSchema);
            break;
        }
        default:
            // Для остальных страниц добавляем только базовую Organization Schema
            // Но добавляем BreadcrumbList если это не главная
            if (pathname !== '/') {
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
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: pathname.split('/').pop() || 'Страница',
                            item: `${baseUrl}${pathname}`,
                        },
                    ],
                };
                schemas.push(breadcrumbSchema);
            }
            break;
    }
    return schemas;
}
/**
 * Генерация HTML для Schema разметки
 */
export function generateSchemaHTML(schemas) {
    return schemas
        .map((schema) => {
        return `<script type="application/ld+json">${JSON.stringify(schema, null, 0)}</script>`;
    })
        .join('\n');
}
