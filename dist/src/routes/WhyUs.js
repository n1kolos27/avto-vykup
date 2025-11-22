import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Breadcrumbs from '../components/Breadcrumbs.js';
import Card from '../components/ui/Card.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';
const advantages = [
    {
        icon: '⏱️',
        title: 'Скорость',
        description: 'Мы работаем быстрее конкурентов. От звонка до получения денег в среднем проходит всего 2 часа. Без долгих ожиданий и проволочек.',
        details: [
            'Ответ на заявку в течение 5 минут',
            'Выезд специалиста в течение 1-2 часов',
            'Оформление сделки за 2 часа',
            'Моментальная оплата',
        ],
    },
    {
        icon: '💰',
        title: 'Честная цена',
        description: 'Мы предлагаем справедливую рыночную стоимость без занижения и скрытых комиссий. Цена, которую мы называем, - это цена, которую вы получите.',
        details: [
            'Справедливая рыночная цена',
            'Отсутствие скрытых комиссий',
            'Прозрачное ценообразование',
            'Готовность к обсуждению цены',
        ],
    },
    {
        icon: '🛡️',
        title: 'Безопасность',
        description: 'Все сделки оформляются официально с соблюдением всех требований законодательства. Вы получаете полную юридическую защиту.',
        details: [
            'Официальное оформление документов',
            'Юридическая защита',
            'Проверка автомобиля на ограничения',
            'Защита от мошенников',
        ],
    },
    {
        icon: '👥',
        title: 'Опыт и репутация',
        description: 'Более 10 лет на рынке, более 5000 довольных клиентов, 98% положительных отзывов. Мы дорожим своей репутацией.',
        details: [
            '10+ лет опыта на рынке',
            '5000+ довольных клиентов',
            '98% положительных отзывов',
            'Проверенная репутация',
        ],
    },
    {
        icon: '📈',
        title: 'Любое состояние',
        description: 'Мы выкупаем автомобили в любом состоянии: от идеального до требующего серьезного ремонта. Не отказываем никому.',
        details: [
            'Автомобили в любом состоянии',
            'После ДТП',
            'С большим пробегом',
            'Требующие ремонта',
        ],
    },
    {
        icon: '🏆',
        title: 'Профессионализм',
        description: 'Наша команда состоит из опытных специалистов, которые знают рынок и умеют правильно оценить автомобиль.',
        details: [
            'Опытные специалисты',
            'Знание рынка',
            'Правильная оценка',
            'Профессиональный подход',
        ],
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const whyUsPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Почему выбирают нас',
    description: 'Конкурентные преимущества компании по выкупу автомобилей',
    url: `${baseUrl}/why-us`,
    mainEntity: {
        '@type': 'Organization',
        name: 'Выкуп авто | Московский Авто Альянс',
        url: baseUrl,
    },
};
const WhyUs = () => {
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: whyUsPageSchema }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center py-12 mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0432\u044B\u0431\u0438\u0440\u0430\u044E\u0442 \u043D\u0430\u0441" }), _jsx("p", { className: "text-lg text-neutral-600 text-center max-w-[600px]", children: "\u041A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442\u043D\u044B\u0435 \u043F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0434\u0435\u043B\u0430\u044E\u0442 \u043D\u0430\u0441 \u043B\u0438\u0434\u0435\u0440\u043E\u043C \u0440\u044B\u043D\u043A\u0430 \u0432\u044B\u043A\u0443\u043F\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" })] }), _jsx("div", { className: "flex flex-row flex-wrap gap-6 mb-8", children: advantages.map((advantage, index) => (_jsxs(Card, { className: "flex-1 min-w-[300px] p-6", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4", children: _jsx("span", { className: "text-3xl", children: advantage.icon }) }), _jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-3", children: advantage.title }), _jsx("p", { className: "text-base text-neutral-600 leading-6 mb-4", children: advantage.description }), _jsx("div", { className: "flex flex-col gap-2", children: advantage.details.map((detail, idx) => (_jsxs("div", { className: "flex flex-row items-start gap-2", children: [_jsx("span", { className: "text-primary-600 text-sm mt-0.5", children: "\u2713" }), _jsx("span", { className: "text-sm text-neutral-600 flex-1", children: detail })] }, idx))) })] }, index))) }), _jsxs("div", { className: "bg-primary-600 rounded-xl p-8 mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "\u0421\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435 \u0441 \u043A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442\u0430\u043C\u0438" }), _jsxs("div", { className: "flex flex-row gap-6", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-semibold text-white mb-4", children: "\u041C\u044B" }), _jsx("div", { className: "flex flex-col gap-3", children: ['Сделка за 2 часа', 'Честная рыночная цена', 'Оплата сразу', 'Любое состояние', 'Оформляем документы'].map((item) => (_jsxs("div", { className: "flex flex-row items-start gap-3", children: [_jsx("span", { className: "text-lg text-white font-bold mt-0.5", children: "\u2713" }), _jsx("span", { className: "text-lg text-white flex-1 leading-7", children: item })] }, item))) })] }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-semibold text-white mb-4", children: "\u041A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442\u044B" }), _jsx("div", { className: "flex flex-col gap-3", children: ['1-2 недели', 'Заниженная на 15-30%', 'Через несколько дней', 'Только в хорошем', 'Нужно делать самому'].map((item) => (_jsxs("div", { className: "flex flex-row items-start gap-3", children: [_jsx("span", { className: "text-lg text-white font-bold mt-0.5", children: "\u2717" }), _jsx("span", { className: "text-lg text-white flex-1 leading-7", children: item })] }, item))) })] })] })] })] })] }));
};
export default WhyUs;
