import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Card from '../ui/Card';
import Button from '../ui/Button';
const categories = [
    {
        title: 'Легковые и коммерческие',
        description: 'Выкупаем легковые автомобили всех классов и коммерческий транспорт',
    },
    {
        title: 'Не зависимо от марки, модели, пробега и срока эксплуатации',
        description: 'Работаем с любыми автомобилями: от бюджетных до премиум класса, с любым пробегом и возрастом',
    },
];
const WhatCarsWeBuySection = () => {
    const navigate = useNavigate();
    return (_jsxs("section", { className: "bg-white dark:bg-neutral-900 py-16 px-4 transition-colors relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto", children: [_jsx(AnimatedSection, { animationType: "fade-slide", delay: 0, children: _jsx("div", { className: "flex flex-col items-center mb-12", children: _jsx("h2", { className: "text-3xl font-bold text-neutral-900 dark:text-neutral-100 text-center heading-accent", children: "\u041A\u0430\u043A\u0438\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438 \u043C\u044B \u0432\u044B\u043A\u0443\u043F\u0430\u0435\u043C?" }) }) }), _jsx("div", { className: "flex flex-row flex-wrap gap-6 mb-12", children: categories.map((category, index) => (_jsx(AnimatedCard, { delay: index * 100, children: _jsx(Card, { hover3D: true, className: "flex-1 min-w-[300px] bg-primary-50 dark:bg-primary-900/30 p-6", children: _jsxs("div", { className: "flex flex-row gap-4", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-lg font-bold text-white", children: "\u2713" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2", children: category.title }), _jsx("p", { className: "text-base text-neutral-700 dark:text-neutral-200 leading-6", children: category.description })] })] }) }) }, index))) }), _jsxs("div", { className: "flex flex-row flex-wrap gap-4 justify-center", children: [_jsx(Button, { onClick: () => navigate('/services'), variant: "primary", className: "min-w-[200px]", children: "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438" }), _jsx(Button, { onClick: () => navigate('/car-brands'), variant: "outline", className: "min-w-[200px]", children: "\u0412\u0441\u0435 \u043C\u0430\u0440\u043A\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" })] })] })] }));
};
export default React.memo(WhatCarsWeBuySection);
