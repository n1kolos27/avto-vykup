import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import Card from '../ui/Card';
import Button from '../ui/Button';
const cases = [
    {
        title: 'BMW X5 2019 года',
        description: 'Клиент обратился после ДТП. Автомобиль требовал серьезного ремонта. Мы предложили справедливую цену с учетом остаточной стоимости и возможности восстановления.',
        result: '2 100 000 ₽',
        time: '1.5 часа',
        client: 'Александр М.',
        features: ['После ДТП', 'Справедливая оценка', 'Быстрая сделка'],
    },
    {
        title: 'Mercedes-Benz C-Class 2020',
        description: 'Владелец планировал продать авто самостоятельно, но после консультации с нами решил воспользоваться нашими услугами. Получил деньги в тот же день.',
        result: '2 800 000 ₽',
        time: '2 часа',
        client: 'Мария К.',
        features: ['Отличное состояние', 'Моментальная оплата', 'Без хлопот'],
    },
    {
        title: 'Toyota Camry 2018',
        description: 'Автомобиль с большим пробегом, но в хорошем техническом состоянии. Мы оценили его честно, учитывая все факторы, и предложили рыночную цену.',
        result: '1 450 000 ₽',
        time: '1 час',
        client: 'Дмитрий С.',
        features: ['Большой пробег', 'Честная оценка', 'Официальное оформление'],
    },
];
const CasesSection = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextCase = () => {
        setCurrentIndex((prev) => (prev + 1) % cases.length);
    };
    const prevCase = () => {
        setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
    };
    const currentCase = cases[currentIndex];
    return (_jsxs("section", { className: "bg-neutral-50 dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto", children: [_jsx(AnimatedSection, { animationType: "fade-slide", delay: 0, children: _jsxs("div", { className: "flex flex-col items-center mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent", children: "\u0423\u0441\u043F\u0435\u0448\u043D\u044B\u0435 \u0441\u0434\u0435\u043B\u043A\u0438 \u043D\u0430\u0448\u0438\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" }), _jsx("p", { className: "text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]", children: "\u0420\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u0441 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u043C\u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430\u043C\u0438 \u0438 \u0441\u0440\u043E\u043A\u0430\u043C\u0438" })] }) }), _jsxs(Card, { className: "p-8 mb-8", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-4 flex-wrap gap-4", children: [_jsx("h3", { className: "flex-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100", children: currentCase.title }), _jsxs("div", { className: "flex flex-row items-center gap-4", children: [_jsx("button", { onClick: prevCase, className: "w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors min-w-[44px] min-h-[44px]", "aria-label": "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u043A\u0435\u0439\u0441", children: _jsx("span", { className: "text-2xl text-neutral-900 dark:text-neutral-100 font-bold", children: "\u2039" }) }), _jsxs("span", { className: "text-sm text-neutral-600 dark:text-neutral-300 font-medium", children: [currentIndex + 1, " / ", cases.length] }), _jsx("button", { onClick: nextCase, className: "w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors min-w-[44px] min-h-[44px]", "aria-label": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043A\u0435\u0439\u0441", children: _jsx("span", { className: "text-2xl text-neutral-900 dark:text-neutral-100 font-bold", children: "\u203A" }) })] })] }), _jsx("p", { className: "text-base text-neutral-700 dark:text-neutral-200 leading-6 mb-6", children: currentCase.description }), _jsxs("div", { className: "flex flex-row flex-wrap gap-6 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-700", children: [_jsxs("div", { className: "flex-1 min-w-[150px]", children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-300 mb-1", children: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442" }), _jsx("p", { className: "text-xl font-bold text-primary-600 dark:text-primary-400", children: currentCase.result })] }), _jsxs("div", { className: "flex-1 min-w-[150px]", children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-300 mb-1", children: "\u0412\u0440\u0435\u043C\u044F \u0441\u0434\u0435\u043B\u043A\u0438" }), _jsx("p", { className: "text-xl font-bold text-primary-600 dark:text-primary-400", children: currentCase.time })] }), _jsxs("div", { className: "flex-1 min-w-[150px]", children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-300 mb-1", children: "\u041A\u043B\u0438\u0435\u043D\u0442" }), _jsx("p", { className: "text-xl font-bold text-primary-600 dark:text-primary-400", children: currentCase.client })] })] }), _jsx("div", { className: "flex flex-row flex-wrap gap-2", children: currentCase.features.map((feature, index) => (_jsx("div", { className: "px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 rounded-full", children: _jsx("span", { className: "text-sm text-primary-700 dark:text-primary-300 font-medium", children: feature }) }, index))) })] }), _jsx("div", { className: "flex justify-center", children: _jsx(Button, { onClick: () => navigate('/calculator'), size: "lg", className: "min-w-[250px]", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0442\u0430\u043A\u0443\u044E \u0436\u0435 \u043E\u0446\u0435\u043D\u043A\u0443" }) })] })] }));
};
export default React.memo(CasesSection);
