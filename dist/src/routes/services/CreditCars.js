import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Breadcrumbs from '../../components/Breadcrumbs.js';
import Card from '../../components/ui/Card.js';
import CarEvaluationForm from '../../components/CarEvaluationForm.js';
import SchemaMarkup from '../../components/SchemaMarkup.js';
import RelatedServices from '../../components/RelatedServices.js';
import { APP_CONFIG } from '../../lib/config/index.js';
const advantages = [
    {
        icon: '🏦',
        title: 'Помощь с банком',
        description: 'Помогаем разобраться с банком и оформить все необходимые документы',
    },
    {
        icon: '📄',
        title: 'Оформление перевода долга',
        description: 'Помогаем оформить перевод долга и все необходимые документы',
    },
    {
        icon: '💰',
        title: 'Погашение кредита',
        description: 'Помогаем с погашением кредита или оформлением перевода долга',
    },
    {
        icon: '⚡',
        title: 'Быстрое решение',
        description: 'Быстро находим оптимальное решение для вашей ситуации',
    },
    {
        icon: '🛡️',
        title: 'Безопасная сделка',
        description: 'Официальное оформление всех документов, полная юридическая защита',
    },
    {
        icon: '✅',
        title: 'Опыт работы',
        description: 'Более 10 лет опыта работы с кредитными автомобилями',
    },
];
const faqs = [
    {
        question: 'Можно ли продать автомобиль в кредите?',
        answer: 'Да, мы работаем с кредитными автомобилями. В этом случае нужно погасить кредит или мы можем помочь с оформлением перевода долга. Все зависит от конкретной ситуации и условий кредитного договора.',
    },
    {
        question: 'Что делать, если автомобиль в залоге?',
        answer: 'Если автомобиль находится в залоге у банка, нужно сначала погасить кредит или оформить перевод залога. Мы поможем разобраться с документами и найти оптимальное решение.',
    },
    {
        question: 'Как происходит выкуп кредитного автомобиля?',
        answer: 'Мы помогаем разобраться с банком, оформить все необходимые документы для погашения кредита или перевода долга. После этого оформляем сделку по выкупу автомобиля.',
    },
    {
        question: 'Сколько времени занимает выкуп кредитного автомобиля?',
        answer: 'Время зависит от конкретной ситуации и банка. Обычно процесс занимает от 1 до 3 дней. Мы поможем ускорить процесс и оформить все документы максимально быстро.',
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Выкуп кредитных автомобилей',
    description: 'Помогаем с выкупом автомобилей, находящихся в залоге. Оформляем перевод долга и все необходимые документы.',
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
const CreditCars = () => {
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: serviceSchema }), _jsx(SchemaMarkup, { schema: faqSchema }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center py-12 mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u0412\u044B\u043A\u0443\u043F \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u044B\u0445 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), _jsx("p", { className: "text-lg text-neutral-600 text-center max-w-[800px] leading-7", children: "\u041F\u043E\u043C\u043E\u0433\u0430\u0435\u043C \u0441 \u0432\u044B\u043A\u0443\u043F\u043E\u043C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439, \u043D\u0430\u0445\u043E\u0434\u044F\u0449\u0438\u0445\u0441\u044F \u0432 \u0437\u0430\u043B\u043E\u0433\u0435. \u041E\u0444\u043E\u0440\u043C\u043B\u044F\u0435\u043C \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \u0434\u043E\u043B\u0433\u0430 \u0438 \u0432\u0441\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B. \u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0441 \u043B\u044E\u0431\u044B\u043C\u0438 \u0431\u0430\u043D\u043A\u0430\u043C\u0438 \u0438 \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u044B\u043C\u0438 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F\u043C\u0438." })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430" }), _jsx("div", { className: "flex flex-row flex-wrap gap-6", children: advantages.map((advantage, index) => (_jsxs(Card, { className: "flex-1 min-w-[250px] p-6 flex flex-col items-center", children: [_jsx("span", { className: "text-5xl mb-4", children: advantage.icon }), _jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-2 text-center", children: advantage.title }), _jsx("p", { className: "text-base text-neutral-600 text-center leading-6", children: advantage.description })] }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u0427\u0430\u0441\u0442\u043E \u0437\u0430\u0434\u0430\u0432\u0430\u0435\u043C\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B" }), _jsx("div", { className: "flex flex-col gap-4", children: faqs.map((faq, index) => (_jsxs(Card, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-neutral-900 mb-3", children: faq.question }), _jsx("p", { className: "text-base text-neutral-600 leading-6", children: faq.answer })] }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-4 text-center", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E \u043F\u043E \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u043E\u043C\u0443 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044E" }), _jsx("p", { className: "text-base text-neutral-600 mb-6 text-center", children: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443, \u0438 \u043D\u0430\u0448 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438" }), _jsx(CarEvaluationForm, {})] }), _jsx(RelatedServices, { currentPath: "/services/credit-cars" })] })] }));
};
export default CreditCars;
