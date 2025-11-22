import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Card from '../ui/Card';
import SectionCTA from './SectionCTA';
const advantages = [
    {
        icon: '⏱️',
        title: 'Быстрая оценка',
        description: 'Оценка вашего автомобиля за 5 минут. Без долгих ожиданий и очередей.',
    },
    {
        icon: '💰',
        title: 'Честная цена',
        description: 'Мы предлагаем рыночную стоимость с учетом всех факторов. Без скрытых комиссий.',
    },
    {
        icon: '⚡',
        title: 'Моментальная оплата',
        description: 'Получите деньги сразу после осмотра. Наличными или на карту - как вам удобно.',
    },
    {
        icon: '🛡️',
        title: 'Безопасная сделка',
        description: 'Все документы оформляются официально. Полная юридическая защита.',
    },
    {
        icon: '✅',
        title: 'Любое состояние',
        description: 'Выкупаем автомобили в любом состоянии: от идеального до требующего ремонта.',
    },
    {
        icon: '📈',
        title: 'Выгодные условия',
        description: 'Лучшие цены на рынке. Сравните наши предложения с конкурентами.',
    },
];
const AdvantagesSection = () => {
    return (_jsxs("section", { className: "bg-neutral-50 dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto", children: [_jsx(AnimatedSection, { animationType: "fade-slide", delay: 0, children: _jsxs("div", { className: "flex flex-col items-center mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent", children: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0432\u044B\u0431\u0438\u0440\u0430\u044E\u0442 \u043D\u0430\u0441" }), _jsx("p", { className: "text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]", children: "\u041C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0431\u044B\u0441\u0442\u0440\u043E, \u0447\u0435\u0441\u0442\u043D\u043E \u0438 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E. \u0412\u0430\u0448\u0435 \u0432\u0440\u0435\u043C\u044F \u0438 \u0434\u0435\u043D\u044C\u0433\u0438 \u0432\u0430\u0436\u043D\u044B \u0434\u043B\u044F \u043D\u0430\u0441." })] }) }), _jsx("div", { className: "flex flex-row flex-wrap gap-6 mb-12", children: advantages.map((advantage, index) => (_jsx(AnimatedCard, { delay: index * 100, children: _jsxs(Card, { hover3D: true, className: "flex-1 min-w-[250px] p-6", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4", children: _jsx("span", { className: "text-2xl", children: advantage.icon }) }), _jsx("h3", { className: "text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2", children: advantage.title }), _jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-300 leading-5", children: advantage.description })] }) }, index))) }), _jsx("div", { className: "mt-12", children: _jsx(SectionCTA, { title: "\u0413\u043E\u0442\u043E\u0432\u044B \u043F\u0440\u043E\u0434\u0430\u0442\u044C \u0441\u0432\u043E\u0439 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044C?", description: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443 \u0437\u0430 5 \u043C\u0438\u043D\u0443\u0442 \u0438 \u043F\u0440\u043E\u0434\u0430\u0439\u0442\u0435 \u0430\u0432\u0442\u043E \u0441\u0435\u0433\u043E\u0434\u043D\u044F" }) })] })] }));
};
export default React.memo(AdvantagesSection);
