import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Breadcrumbs from '../../components/Breadcrumbs.js';
import Card from '../../components/ui/Card.js';
import CarEvaluationForm from '../../components/CarEvaluationForm.js';
import SchemaMarkup from '../../components/SchemaMarkup.js';
import RelatedServices from '../../components/RelatedServices.js';
import { APP_CONFIG } from '../../lib/config/index.js';
const advantages = [
    {
        icon: '🔧',
        title: 'Любая степень повреждения',
        description: 'Выкупаем автомобили с любыми повреждениями: от царапин до тотальных',
    },
    {
        icon: '💰',
        title: 'Честная оценка',
        description: 'Оцениваем остаточную стоимость и возможность восстановления или разбора',
    },
    {
        icon: '🚚',
        title: 'Эвакуатор за наш счет',
        description: 'Организуем эвакуатор для транспортировки неисправного автомобиля',
    },
    {
        icon: '🛡️',
        title: 'Безопасная сделка',
        description: 'Официальное оформление всех документов, полная юридическая защита',
    },
    {
        icon: '✅',
        title: 'Моментальная оплата',
        description: 'Оплата сразу после подписания документов наличными или на карту',
    },
    {
        icon: '⚠️',
        title: 'Опыт работы',
        description: 'Более 10 лет опыта работы с битыми и аварийными автомобилями',
    },
];
const damageTypes = [
    {
        title: 'Незначительные повреждения',
        description: 'Царапины, вмятины, повреждения бамперов. Оценка с учетом стоимости ремонта.',
    },
    {
        title: 'Средние повреждения',
        description: 'Повреждения кузова, разбитые стекла, повреждения оптики. Оценка остаточной стоимости.',
    },
    {
        title: 'Серьезные повреждения',
        description: 'Повреждения несущих элементов, деформация кузова. Оценка возможности восстановления.',
    },
    {
        title: 'Тотальные повреждения',
        description: 'Автомобиль не подлежит восстановлению. Оценка стоимости разбора на запчасти.',
    },
];
const faqs = [
    {
        question: 'Выкупаете ли вы битые автомобили?',
        answer: 'Да, мы выкупаем битые и аварийные автомобили с любыми повреждениями. Оцениваем остаточную стоимость, возможность восстановления или разбора на запчасти.',
    },
    {
        question: 'Как вы оцениваете битые автомобили?',
        answer: 'Мы учитываем степень повреждений, стоимость ремонта, остаточную стоимость автомобиля, возможность восстановления или разбора на запчасти. Оценка производится профессиональными специалистами.',
    },
    {
        question: 'Что делать, если автомобиль не на ходу?',
        answer: 'Мы организуем эвакуатор для транспортировки неисправного автомобиля. Эвакуатор может быть за наш счет или за дополнительную плату, в зависимости от ситуации.',
    },
    {
        question: 'Выкупаете ли вы тотальные автомобили?',
        answer: 'Да, мы выкупаем тотальные автомобили, которые не подлежат восстановлению. Оцениваем стоимость разбора на запчасти и предлагаем справедливую цену.',
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Выкуп битых и аварийных автомобилей',
    description: 'Выкуп битых и аварийных автомобилей с любыми повреждениями в Москве и МО.',
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
const DamagedCars = () => {
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: serviceSchema }), _jsx(SchemaMarkup, { schema: faqSchema }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center py-12 mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u0412\u044B\u043A\u0443\u043F \u0431\u0438\u0442\u044B\u0445 \u0438 \u0430\u0432\u0430\u0440\u0438\u0439\u043D\u044B\u0445 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), _jsx("p", { className: "text-lg text-neutral-600 text-center max-w-[800px] leading-7", children: "\u0412\u044B\u043A\u0443\u043F\u0430\u0435\u043C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438 \u0441 \u043B\u044E\u0431\u044B\u043C\u0438 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u044F\u043C\u0438: \u043E\u0442 \u0446\u0430\u0440\u0430\u043F\u0438\u043D \u0434\u043E \u0442\u043E\u0442\u0430\u043B\u044C\u043D\u044B\u0445. \u0427\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0446\u0435\u043D\u043A\u0430 \u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E\u0439 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438, \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0440\u0430\u0437\u0431\u043E\u0440\u0430 \u043D\u0430 \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438." })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430" }), _jsx("div", { className: "flex flex-row flex-wrap gap-6", children: advantages.map((advantage, index) => (_jsxs(Card, { className: "flex-1 min-w-[250px] p-6 flex flex-col items-center", children: [_jsx("span", { className: "text-5xl mb-4", children: advantage.icon }), _jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-2 text-center", children: advantage.title }), _jsx("p", { className: "text-base text-neutral-600 text-center leading-6", children: advantage.description })] }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u0422\u0438\u043F\u044B \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0439, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u044B \u0432\u044B\u043A\u0443\u043F\u0430\u0435\u043C" }), _jsx("div", { className: "flex flex-col gap-4", children: damageTypes.map((type, index) => (_jsxs(Card, { className: "p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-2", children: type.title }), _jsx("p", { className: "text-base text-neutral-600 leading-6", children: type.description })] }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u0427\u0430\u0441\u0442\u043E \u0437\u0430\u0434\u0430\u0432\u0430\u0435\u043C\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B" }), _jsx("div", { className: "flex flex-col gap-4", children: faqs.map((faq, index) => (_jsxs(Card, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-neutral-900 mb-3", children: faq.question }), _jsx("p", { className: "text-base text-neutral-600 leading-6", children: faq.answer })] }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-4 text-center", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443 \u0431\u0438\u0442\u043E\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" }), _jsx("p", { className: "text-base text-neutral-600 mb-6 text-center", children: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443, \u0438 \u043D\u0430\u0448 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u043E\u0446\u0435\u043D\u043A\u0438 \u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E\u0439 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438" }), _jsx(CarEvaluationForm, {})] }), _jsx(RelatedServices, { currentPath: "/services/damaged-cars" })] })] }));
};
export default DamagedCars;
