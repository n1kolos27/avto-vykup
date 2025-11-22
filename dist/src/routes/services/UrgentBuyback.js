import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs.js';
import Card from '../../components/ui/Card.js';
import CarEvaluationForm from '../../components/CarEvaluationForm.js';
import SchemaMarkup from '../../components/SchemaMarkup.js';
import PhoneButton from '../../components/PhoneButton.js';
import Button from '../../components/ui/Button.js';
import RelatedServices from '../../components/RelatedServices.js';
import { APP_CONFIG } from '../../lib/config/index.js';
const advantages = [
    {
        icon: '⏰',
        title: 'Выкуп за 2 часа',
        description: 'От звонка до получения денег проходит всего 2 часа',
    },
    {
        icon: '⚡',
        title: 'Оценка за 5 минут',
        description: 'Предварительная оценка по телефону за 5 минут',
    },
    {
        icon: '💰',
        title: 'Моментальная оплата',
        description: 'Оплата сразу после подписания документов наличными или на карту',
    },
    {
        icon: '📍',
        title: 'Выезд на место',
        description: 'Наш специалист приедет к вам в любое удобное место в Москве и МО',
    },
    {
        icon: '🛡️',
        title: 'Безопасная сделка',
        description: 'Официальное оформление всех документов, полная юридическая защита',
    },
    {
        icon: '✅',
        title: 'Работаем 9:00-22:00',
        description: 'Работаем ежедневно, включая выходные и праздники',
    },
];
const processSteps = [
    {
        step: 1,
        title: 'Звонок (5 минут)',
        description: 'Звоните нам или оставляйте заявку. Наш специалист ответит в течение 5 минут и задаст несколько вопросов о вашем автомобиле.',
    },
    {
        step: 2,
        title: 'Выезд специалиста (30-60 минут)',
        description: 'Наш специалист приедет к вам в удобное место. Выезд по всей Москве и МО. Осмотр автомобиля занимает 30-60 минут.',
    },
    {
        step: 3,
        title: 'Оценка и согласование (15 минут)',
        description: 'После осмотра мы предложим честную рыночную цену. Если цена вас устраивает, переходим к оформлению.',
    },
    {
        step: 4,
        title: 'Оформление и оплата (30 минут)',
        description: 'Оформляем все документы (30 минут) и сразу производим оплату. Вы получаете деньги наличными или на карту.',
    },
];
const faqs = [
    {
        question: 'Как быстро происходит срочный выкуп?',
        answer: 'В среднем от звонка до получения денег проходит всего 2 часа. Мы приезжаем на место, осматриваем автомобиль, оформляем документы и сразу производим оплату.',
    },
    {
        question: 'Работаете ли вы в выходные и праздники?',
        answer: 'Да, мы работаем ежедневно с 9:00 до 22:00, включая выходные и праздники. Вы можете связаться с нами в любое удобное время.',
    },
    {
        question: 'Можно ли получить деньги в день обращения?',
        answer: 'Да, именно для этого и существует срочный выкуп. Вы получаете деньги в тот же день, в день обращения. Оплата производится сразу после подписания документов.',
    },
    {
        question: 'Какие документы нужны для срочного выкупа?',
        answer: 'Для срочного выкупа нужны те же документы, что и для обычного: ПТС, СТС, паспорт владельца. Мы поможем оформить все необходимые документы.',
    },
    {
        question: 'Можно ли получить деньги наличными?',
        answer: 'Да, мы предлагаем несколько способов оплаты: наличными, переводом на банковскую карту, банковским переводом. Вы можете выбрать наиболее удобный для вас вариант.',
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Срочный выкуп автомобилей за 2 часа',
    description: 'Срочный выкуп автомобилей за 2 часа в Москве и МО. Быстрый выкуп с моментальной оплатой.',
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
    offers: {
        '@type': 'Offer',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
    },
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
const UrgentBuyback = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: serviceSchema }), _jsx(SchemaMarkup, { schema: faqSchema }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "bg-primary-600 rounded-xl p-8 mb-12 flex flex-col items-center", children: [_jsx("span", { className: "text-6xl mb-4", children: "\u26A1" }), _jsx("h1", { className: "text-4xl font-bold text-white mb-4 text-center", children: "\u0421\u0440\u043E\u0447\u043D\u044B\u0439 \u0432\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u0437\u0430 2 \u0447\u0430\u0441\u0430" }), _jsx("p", { className: "text-lg text-primary-100 mb-8 text-center max-w-[800px]", children: "\u041D\u0443\u0436\u043D\u044B \u0434\u0435\u043D\u044C\u0433\u0438 \u0441\u0440\u043E\u0447\u043D\u043E? \u041C\u044B \u0432\u044B\u043A\u0443\u043F\u0438\u043C \u0432\u0430\u0448 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044C \u0437\u0430 2 \u0447\u0430\u0441\u0430 \u0441 \u043C\u043E\u043C\u0435\u043D\u0442\u0430 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F. \u041E\u0446\u0435\u043D\u043A\u0430 \u0437\u0430 5 \u043C\u0438\u043D\u0443\u0442, \u043C\u043E\u043C\u0435\u043D\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u043E\u043F\u043B\u0430\u0442\u0430. \u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0441 9:00 \u0434\u043E 22:00 \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E." }), _jsxs("div", { className: "flex flex-row flex-wrap gap-4 justify-center", children: [_jsx(PhoneButton, { phone: phone1, size: "lg" }), _jsx(Button, { onClick: () => navigate('/calculator'), variant: "secondary", size: "lg", children: "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443" })] })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430 \u0441\u0440\u043E\u0447\u043D\u043E\u0433\u043E \u0432\u044B\u043A\u0443\u043F\u0430" }), _jsx("div", { className: "flex flex-row flex-wrap gap-6", children: advantages.map((advantage, index) => (_jsxs(Card, { className: "flex-1 min-w-[250px] p-6 flex flex-col items-center", children: [_jsx("span", { className: "text-5xl mb-4", children: advantage.icon }), _jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-2 text-center", children: advantage.title }), _jsx("p", { className: "text-base text-neutral-600 text-center leading-6", children: advantage.description })] }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u041A\u0430\u043A \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u0441\u0440\u043E\u0447\u043D\u044B\u0439 \u0432\u044B\u043A\u0443\u043F" }), _jsx("div", { className: "flex flex-col gap-6", children: processSteps.map((step, index) => (_jsxs(Card, { className: "p-6 flex flex-row gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-xl font-bold text-white", children: step.step }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-2", children: step.title }), _jsx("p", { className: "text-base text-neutral-600 leading-6", children: step.description })] })] }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u0427\u0430\u0441\u0442\u043E \u0437\u0430\u0434\u0430\u0432\u0430\u0435\u043C\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B" }), _jsx("div", { className: "flex flex-col gap-4", children: faqs.map((faq, index) => (_jsxs(Card, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-neutral-900 mb-3", children: faq.question }), _jsx("p", { className: "text-base text-neutral-600 leading-6", children: faq.answer })] }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-4 text-center", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443 \u0437\u0430 5 \u043C\u0438\u043D\u0443\u0442" }), _jsx("p", { className: "text-base text-neutral-600 mb-6 text-center", children: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443, \u0438 \u043D\u0430\u0448 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u0441\u0440\u043E\u0447\u043D\u043E\u0439 \u043E\u0446\u0435\u043D\u043A\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" }), _jsx(CarEvaluationForm, {})] }), _jsx(RelatedServices, { currentPath: "/services/urgent-buyback" })] })] }));
};
export default UrgentBuyback;
