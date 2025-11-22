import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import SectionCTA from './SectionCTA';
const steps = [
    {
        icon: '📞',
        title: '1. Звонок или заявка',
        description: 'Свяжитесь с нами по телефону или оставьте заявку на сайте. Мы ответим в течение 5 минут.',
    },
    {
        icon: '🔍',
        title: '2. Оценка автомобиля',
        description: 'Наш специалист осмотрит ваш автомобиль и проведет профессиональную оценку.',
    },
    {
        icon: '📄',
        title: '3. Оформление документов',
        description: 'Быстро и официально оформляем все необходимые документы для сделки.',
    },
    {
        icon: '💰',
        title: '4. Получение денег',
        description: 'Получите оплату сразу после подписания документов. Наличными или на карту.',
    },
];
const ProcessSection = () => {
    return (_jsxs("section", { className: "bg-white dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto", children: [_jsx(AnimatedSection, { animationType: "fade-slide", delay: 0, children: _jsxs("div", { className: "flex flex-col items-center mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent", children: "\u041A\u0430\u043A \u043C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C" }), _jsx("p", { className: "text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]", children: "\u041F\u0440\u043E\u0441\u0442\u043E\u0439 \u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u0439 \u043F\u0440\u043E\u0446\u0435\u0441\u0441. \u041E\u0442 \u0437\u0432\u043E\u043D\u043A\u0430 \u0434\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u0435\u043D\u0435\u0433 - \u0432\u0441\u0435\u0433\u043E 4 \u0448\u0430\u0433\u0430." })] }) }), _jsx("div", { className: "flex flex-row flex-wrap gap-6 mb-12 md:flex-nowrap md:justify-between", children: steps.map((step, index) => (_jsx(AnimatedCard, { delay: index * 100, children: _jsxs("div", { className: "flex-1 min-w-[200px] flex flex-col items-center relative", children: [index < steps.length - 1 && (_jsx("div", { className: "hidden md:block absolute z-0 bg-primary-200 dark:bg-primary-800", style: {
                                            top: 32,
                                            left: '100%',
                                            width: '50%',
                                            height: 2,
                                        } })), _jsx("div", { className: "w-16 h-16 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center mb-4 z-10", children: _jsx("span", { className: "text-3xl", children: step.icon }) }), _jsx("h3", { className: "text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 text-center", children: step.title }), _jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-300 text-center leading-5", children: step.description })] }) }, index))) }), _jsx("div", { className: "mt-12", children: _jsx(SectionCTA, { title: "\u0413\u043E\u0442\u043E\u0432\u044B \u043D\u0430\u0447\u0430\u0442\u044C?", description: "\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443 \u0437\u0430 5 \u043C\u0438\u043D\u0443\u0442", variant: "secondary" }) })] })] }));
};
export default React.memo(ProcessSection);
