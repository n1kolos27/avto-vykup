import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Breadcrumbs from '../../components/Breadcrumbs.js';
import Card from '../../components/ui/Card.js';
import CarEvaluationForm from '../../components/CarEvaluationForm.js';
import SchemaMarkup from '../../components/SchemaMarkup.js';
import RelatedServices from '../../components/RelatedServices.js';
import { APP_CONFIG } from '../../lib/config/index.js';
const advantages = [
    {
        icon: '💰',
        title: 'До 97% рыночной стоимости',
        description: 'Предлагаем максимально честную и выгодную цену за ваш автомобиль',
    },
    {
        icon: '⏰',
        title: 'Выкуп за 2 часа',
        description: 'От звонка до получения денег проходит всего 2 часа',
    },
    {
        icon: '🛡️',
        title: 'Безопасная сделка',
        description: 'Официальное оформление всех документов, полная юридическая защита',
    },
    {
        icon: '👥',
        title: '5000+ довольных клиентов',
        description: 'Более 5000 клиентов уже продали свои автомобили через нас',
    },
    {
        icon: '🏆',
        title: '10+ лет опыта',
        description: 'Более 10 лет успешной работы на рынке выкупа автомобилей',
    },
    {
        icon: '✅',
        title: 'Любое состояние',
        description: 'Выкупаем автомобили в любом состоянии: от идеального до требующего ремонта',
    },
];
const processSteps = [
    {
        step: 1,
        title: 'Звонок или заявка',
        description: 'Свяжитесь с нами по телефону или оставьте заявку на сайте. Наш специалист ответит в течение 5 минут.',
    },
    {
        step: 2,
        title: 'Бесплатная оценка',
        description: 'Наш специалист приедет к вам в удобное место и проведет бесплатную оценку автомобиля.',
    },
    {
        step: 3,
        title: 'Согласование цены',
        description: 'После осмотра мы предложим честную рыночную цену. Если цена вас устраивает, переходим к оформлению.',
    },
    {
        step: 4,
        title: 'Оформление и оплата',
        description: 'Оформляем все документы и сразу производим оплату наличными или на карту.',
    },
];
const faqs = [
    {
        question: 'Какие автомобили вы выкупаете?',
        answer: 'Мы выкупаем все марки и модели легковых автомобилей в любом состоянии: от идеального до требующего серьезного ремонта, битые, после ДТП, кредитные, премиум класса.',
    },
    {
        question: 'Как быстро происходит выкуп?',
        answer: 'В среднем от звонка до получения денег проходит всего 2 часа. Мы приезжаем на место, осматриваем автомобиль, оформляем документы и сразу производим оплату.',
    },
    {
        question: 'Какую цену вы предлагаете?',
        answer: 'Мы предлагаем до 97% от рыночной стоимости автомобиля. Цена зависит от марки, модели, года выпуска, пробега, технического состояния и других факторов.',
    },
    {
        question: 'Какие документы нужны?',
        answer: 'Для выкупа автомобиля вам понадобятся: ПТС, СТС, паспорт владельца. Мы поможем оформить все необходимые документы.',
    },
    {
        question: 'Можно ли продать автомобиль в кредите?',
        answer: 'Да, мы работаем с кредитными автомобилями. В этом случае нужно погасить кредит или мы можем помочь с оформлением перевода долга.',
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Выкуп автомобилей в Москве и МО',
    description: 'Профессиональный выкуп автомобилей всех марок и моделей в любом состоянии.',
    provider: {
        '@type': 'Organization',
        name: 'Выкуп авто | Московский Авто Альянс',
        url: baseUrl,
        telephone: phone1,
    },
    areaServed: [
        { '@type': 'City', name: 'Москва' },
        { '@type': 'State', name: 'Московская область' },
    ],
};
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
};
const BuybackCars = () => {
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: serviceSchema }), _jsx(SchemaMarkup, { schema: faqSchema }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center py-12 mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u0432 \u041C\u043E\u0441\u043A\u0432\u0435 \u0438 \u041C\u041E" }), _jsx("p", { className: "text-lg text-neutral-600 text-center max-w-[800px] leading-7", children: "\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u0432\u0441\u0435\u0445 \u043C\u0430\u0440\u043E\u043A \u0438 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0432 \u043B\u044E\u0431\u043E\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438. \u0427\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0446\u0435\u043D\u043A\u0430 \u0437\u0430 5 \u043C\u0438\u043D\u0443\u0442, \u0434\u043E 97% \u0440\u044B\u043D\u043E\u0447\u043D\u043E\u0439 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438, \u043C\u043E\u043C\u0435\u043D\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u043E\u043F\u043B\u0430\u0442\u0430. \u0411\u043E\u043B\u0435\u0435 10 \u043B\u0435\u0442 \u043E\u043F\u044B\u0442\u0430, 5000+ \u0434\u043E\u0432\u043E\u043B\u044C\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432." })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430" }), _jsx("div", { className: "flex flex-row flex-wrap gap-6", children: advantages.map((advantage, index) => (_jsxs(Card, { className: "flex-1 min-w-[250px] p-6 flex flex-col items-center", children: [_jsx("span", { className: "text-5xl mb-4", children: advantage.icon }), _jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-2 text-center", children: advantage.title }), _jsx("p", { className: "text-base text-neutral-600 text-center leading-6", children: advantage.description })] }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u041A\u0430\u043A \u043C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C" }), _jsx("div", { className: "flex flex-col gap-6", children: processSteps.map((step, index) => (_jsxs(Card, { className: "p-6 flex flex-row gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-xl font-bold text-white", children: step.step }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-2", children: step.title }), _jsx("p", { className: "text-base text-neutral-600 leading-6", children: step.description })] })] }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u0427\u0430\u0441\u0442\u043E \u0437\u0430\u0434\u0430\u0432\u0430\u0435\u043C\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B" }), _jsx("div", { className: "flex flex-col gap-4", children: faqs.map((faq, index) => (_jsxs(Card, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-neutral-900 mb-3", children: faq.question }), _jsx("p", { className: "text-base text-neutral-600 leading-6", children: faq.answer })] }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-4 text-center", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443 \u0437\u0430 5 \u043C\u0438\u043D\u0443\u0442" }), _jsx("p", { className: "text-base text-neutral-600 mb-6 text-center", children: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443, \u0438 \u043D\u0430\u0448 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u043E\u0446\u0435\u043D\u043A\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" }), _jsx(CarEvaluationForm, {})] }), _jsx(RelatedServices, { currentPath: "/services/buyback-cars" })] })] }));
};
export default BuybackCars;
