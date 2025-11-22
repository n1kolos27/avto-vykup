import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Card from '../ui/Card';
const trustItems = [
    {
        icon: '🏆',
        title: '10+ лет опыта',
        description: 'Более 10 лет успешной работы на рынке выкупа автомобилей',
        color: '#fbbf24',
        bgColor: '#fef3c7',
    },
    {
        icon: '🛡️',
        title: 'Лицензированная деятельность',
        description: 'Все документы и лицензии в порядке. Работаем официально',
        color: '#3b82f6',
        bgColor: '#dbeafe',
    },
    {
        icon: '📄',
        title: 'Юридическая защита',
        description: 'Полное юридическое сопровождение всех сделок',
        color: '#10b981',
        bgColor: '#d1fae5',
    },
    {
        icon: '✅',
        title: 'Гарантии качества',
        description: 'Гарантируем честную оценку и прозрачность сделки',
        color: '#0284c7',
        bgColor: '#e0f2fe',
    },
];
const partners = [
    { name: 'Банк-партнер 1', logo: '🏦' },
    { name: 'Страховая компания', logo: '🛡️' },
    { name: 'Автосалон', logo: '🚗' },
    { name: 'Оценщики', logo: '📊' },
];
const TrustSection = () => {
    return (_jsxs("section", { className: "bg-white dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto", children: [_jsx(AnimatedSection, { animationType: "fade-slide", delay: 0, children: _jsxs("div", { className: "flex flex-col items-center mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent", children: "\u041D\u0430\u043C \u0434\u043E\u0432\u0435\u0440\u044F\u044E\u0442" }), _jsx("p", { className: "text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]", children: "\u041C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0447\u0435\u0441\u0442\u043D\u043E, \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E \u0438 \u0441 \u043F\u043E\u043B\u043D\u043E\u0439 \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0437\u0430\u0449\u0438\u0442\u043E\u0439" })] }) }), _jsx("div", { className: "flex flex-row flex-wrap gap-6 mb-12", children: trustItems.map((item, index) => (_jsx(AnimatedCard, { delay: index * 100, children: _jsxs(Card, { hover3D: true, className: "flex-1 min-w-[200px] flex flex-col items-center p-6", children: [_jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center mb-4 dark:opacity-80", style: { backgroundColor: item.bgColor }, children: _jsx("span", { className: "text-4xl", children: item.icon }) }), _jsx("h3", { className: "text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 text-center", children: item.title }), _jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-300 text-center leading-5", children: item.description })] }) }, index))) }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("h3", { className: "text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6", children: "\u041D\u0430\u0448\u0438 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u044B" }), _jsx("div", { className: "flex flex-row flex-wrap gap-8 justify-center", children: partners.map((partner, index) => (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("span", { className: "text-5xl", children: partner.logo }), _jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-300 text-center", children: partner.name })] }, index))) })] })] })] }));
};
export default React.memo(TrustSection);
