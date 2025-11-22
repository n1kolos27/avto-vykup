import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Card from '../components/ui/Card.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';
const steps = [
    {
        icon: '📞',
        title: 'Шаг 1: Звонок или заявка',
        time: '5 минут',
        description: 'Свяжитесь с нами по телефону или оставьте заявку на сайте. Наш специалист ответит в течение 5 минут и задаст несколько вопросов о вашем автомобиле.',
        details: [
            'Звонок по телефону или заявка на сайте',
            'Ответ специалиста в течение 5 минут',
            'Предварительная оценка по телефону',
            'Согласование времени и места встречи',
        ],
    },
    {
        icon: '🔍',
        title: 'Шаг 2: Осмотр и оценка',
        time: '30-60 минут',
        description: 'Наш специалист приезжает к вам в удобное место и проводит детальный осмотр автомобиля. Проверяет техническое состояние, внешний вид, документы.',
        details: [
            'Выезд специалиста на место',
            'Детальный осмотр автомобиля',
            'Проверка технического состояния',
            'Проверка документов и истории',
        ],
    },
    {
        icon: '📄',
        title: 'Шаг 3: Оформление документов',
        time: '30-60 минут',
        description: 'Если цена вас устраивает, мы оформляем все необходимые документы. Договор купли-продажи, акт приема-передачи, все официально и прозрачно.',
        details: [
            'Оформление договора купли-продажи',
            'Подписание акта приема-передачи',
            'Проверка всех документов',
            'Официальное оформление сделки',
        ],
    },
    {
        icon: '💰',
        title: 'Шаг 4: Получение денег',
        time: 'Моментально',
        description: 'Сразу после подписания документов вы получаете оплату. Наличными, на карту или банковским переводом - как вам удобно. Сделка завершена!',
        details: [
            'Оплата сразу после подписания документов',
            'Выбор способа оплаты (наличные, карта, перевод)',
            'Никаких задержек или ожиданий',
            'Сделка завершена',
        ],
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Как продать автомобиль через выкуп',
    description: 'Пошаговая инструкция по продаже автомобиля через компанию Выкуп авто',
    url: `${baseUrl}/how-we-work`,
    totalTime: 'PT2H',
    estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'RUB',
        value: '0',
    },
    step: steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.title,
        text: step.description,
        itemListElement: step.details.map((detail) => ({
            '@type': 'HowToDirection',
            text: detail,
        })),
    })),
};
const HowWeWork = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: howToSchema }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center py-12 mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u041A\u0430\u043A \u043C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C" }), _jsx("p", { className: "text-lg text-neutral-600 text-center", children: "\u041F\u0440\u043E\u0441\u0442\u043E\u0439 \u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u0439 \u043F\u0440\u043E\u0446\u0435\u0441\u0441. \u041E\u0442 \u0437\u0432\u043E\u043D\u043A\u0430 \u0434\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u0435\u043D\u0435\u0433 - \u0432\u0441\u0435\u0433\u043E 4 \u0448\u0430\u0433\u0430" })] }), _jsx("div", { className: "flex flex-col gap-8 mb-8", children: steps.map((step, index) => (_jsx(Card, { className: "p-8", children: _jsxs("div", { className: "flex flex-row gap-4", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-3xl", children: step.icon }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-3", children: [_jsx("h3", { className: "text-2xl font-bold text-neutral-900 flex-1", children: step.title }), _jsxs("div", { className: "flex flex-row items-center gap-1", children: [_jsx("span", { className: "text-base text-primary-600", children: "\u23F1\uFE0F" }), _jsx("span", { className: "text-base font-semibold text-primary-600", children: step.time })] })] }), _jsx("p", { className: "text-base text-neutral-600 leading-6 mb-4", children: step.description }), _jsx("div", { className: "flex flex-col gap-2", children: step.details.map((detail, idx) => (_jsxs("div", { className: "flex flex-row items-start gap-2", children: [_jsx("span", { className: "text-primary-600 text-base mt-0.5", children: "\u2713" }), _jsx("span", { className: "text-base text-neutral-700 flex-1", children: detail })] }, idx))) })] })] }) }, index))) }), _jsxs("div", { className: "bg-primary-600 rounded-xl p-8 mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "\u041E\u0431\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F: 2 \u0447\u0430\u0441\u0430" }), _jsxs("p", { className: "text-lg text-white mb-8 leading-7", children: ["\u0412 \u0441\u0440\u0435\u0434\u043D\u0435\u043C \u043E\u0442 \u0437\u0432\u043E\u043D\u043A\u0430 \u0434\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u0435\u043D\u0435\u0433 \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 \u0432\u0441\u0435\u0433\u043E 2 \u0447\u0430\u0441\u0430. \u0411\u0435\u0437 \u0434\u043E\u043B\u0433\u0438\u0445 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0439, \u043F\u0440\u043E\u0432\u043E\u043B\u043E\u0447\u0435\u043A \u0438 \u043B\u0438\u0448\u043D\u0438\u0445 \u0444\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0435\u0439.", ' ', _jsx("button", { onClick: () => navigate('/guarantees'), className: "underline", children: "\u041E\u0437\u043D\u0430\u043A\u043E\u043C\u044C\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u0448\u0438\u043C\u0438 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F\u043C\u0438 \u043F\u0440\u0438 \u0432\u044B\u043A\u0443\u043F\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" }), "."] }), _jsxs("div", { className: "flex flex-row justify-around mb-8 pt-8 border-t border-white/20", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("span", { className: "text-3xl font-bold text-white mb-2", children: "5 \u043C\u0438\u043D" }), _jsx("span", { className: "text-base text-primary-100", children: "\u041E\u0442\u0432\u0435\u0442 \u043D\u0430 \u0437\u0430\u044F\u0432\u043A\u0443" })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("span", { className: "text-3xl font-bold text-white mb-2", children: "1-2 \u0447\u0430\u0441\u0430" }), _jsx("span", { className: "text-base text-primary-100", children: "\u0412\u044B\u0435\u0437\u0434 \u0438 \u043E\u0441\u043C\u043E\u0442\u0440" })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("span", { className: "text-3xl font-bold text-white mb-2", children: "\u041C\u043E\u043C\u0435\u043D\u0442\u0430\u043B\u044C\u043D\u043E" }), _jsx("span", { className: "text-base text-primary-100", children: "\u041E\u043F\u043B\u0430\u0442\u0430" })] })] }), _jsxs("div", { className: "mt-8 pt-8 border-t border-white/20", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-6", children: "\u041D\u0430\u0448\u0438 \u0443\u0441\u043B\u0443\u0433\u0438" }), _jsx("div", { className: "flex flex-row flex-wrap gap-4", children: [
                                            { title: 'Срочный выкуп', subtitle: 'Выкуп за 2 часа', path: '/services/urgent-buyback' },
                                            { title: 'Выкуп битых авто', subtitle: 'Любая степень повреждения', path: '/services/damaged-cars' },
                                            { title: 'Выкуп после ДТП', subtitle: 'Оценка остаточной стоимости', path: '/services/after-accident' },
                                            { title: 'Выкуп кредитных авто', subtitle: 'Помощь с банком', path: '/services/credit-cars' },
                                            { title: 'Выкуп премиум авто', subtitle: 'Элитные автомобили', path: '/services/premium-cars' },
                                            { title: 'Выкуп автомобилей', subtitle: 'Все марки и модели', path: '/services/buyback-cars' },
                                        ].map((service) => (_jsxs("button", { onClick: () => navigate(service.path), className: "flex-1 min-w-[150px] bg-white/10 rounded-lg p-4 flex flex-col items-center hover:bg-white/20 transition-colors", children: [_jsx("span", { className: "text-base font-semibold text-white mb-1", children: service.title }), _jsx("span", { className: "text-sm text-primary-100 text-center", children: service.subtitle })] }, service.path))) })] })] })] })] }));
};
export default HowWeWork;
