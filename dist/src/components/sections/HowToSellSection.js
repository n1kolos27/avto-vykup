import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Card from '../ui/Card';
const steps = [
    {
        number: 1,
        title: 'Онлайн-оценка автомобиля',
        description: 'Заполните форму на сайте или позвоните нам. Наш специалист проведет предварительную оценку вашего автомобиля.',
        benefits: [
            'Бесплатная оценка за 5 минут',
            'Учитываем все факторы: марку, модель, год, пробег, состояние',
            'Честная рыночная цена без занижения',
        ],
    },
    {
        number: 2,
        title: 'Бесплатный выезд специалиста',
        description: 'Наш эксперт приедет к вам в удобное время для детального осмотра автомобиля.',
        benefits: [
            'Выезд в день обращения',
            'Профессиональная диагностика',
            'Уточнение окончательной стоимости',
        ],
    },
    {
        number: 3,
        title: 'Подготовка документов',
        description: 'Мы помогаем собрать все необходимые документы и проверяем автомобиль на ограничения.',
        benefits: [
            'Помощь в подготовке документов',
            'Проверка на ограничения и залог',
            'Официальное оформление сделки',
        ],
    },
    {
        number: 4,
        title: '100% оплата в день сделки',
        description: 'Сразу после подписания документов вы получаете полную сумму наличными или на карту.',
        benefits: [
            'Моментальная оплата',
            'Наличные или перевод на карту',
            'Без задержек и ожиданий',
        ],
    },
    {
        number: 5,
        title: 'Переоформление за наш счет',
        description: 'Мы берем на себя все расходы по переоформлению документов в ГИБДД.',
        benefits: [
            'Переоформление за наш счет',
            'Эвакуатор при необходимости',
            'Полное сопровождение сделки',
        ],
    },
];
const HowToSellSection = () => {
    return (_jsxs("section", { className: "bg-neutral-50 dark:bg-neutral-900 py-16 px-4 transition-colors relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto", children: [_jsx(AnimatedSection, { animationType: "fade-slide", delay: 0, children: _jsxs("div", { className: "flex flex-col items-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent", children: "\u041A\u0430\u043A \u043F\u0440\u043E\u0434\u0430\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044C \u0437\u0430 97% \u0440\u044B\u043D\u043E\u0447\u043D\u043E\u0439 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438?" }), _jsx("p", { className: "text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[800px] leading-7", children: "\u041F\u0440\u043E\u0441\u0442\u0430\u044F \u043F\u043E\u0448\u0430\u0433\u043E\u0432\u0430\u044F \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043F\u043E\u043C\u043E\u0436\u0435\u0442 \u0432\u0430\u043C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0443\u044E \u0432\u044B\u0433\u043E\u0434\u0443 \u043E\u0442 \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" })] }) }), _jsx("div", { className: "flex flex-col gap-6", children: steps.map((step, index) => (_jsx(AnimatedCard, { delay: index * 100, children: _jsxs(Card, { hover3D: true, className: "p-6", children: [_jsxs("div", { className: "flex flex-row items-center gap-4 mb-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-xl font-bold text-white", children: step.number }) }), _jsx("h3", { className: "flex-1 text-xl font-semibold text-neutral-900 dark:text-neutral-100", children: step.title })] }), _jsx("p", { className: "text-base text-neutral-600 dark:text-neutral-300 leading-6 mb-4 ml-14", children: step.description }), _jsx("div", { className: "ml-14 flex flex-col gap-2", children: step.benefits.map((benefit, idx) => (_jsxs("div", { className: "flex flex-row items-center gap-2", children: [_jsx("span", { className: "text-base text-success-500 dark:text-success-400 font-bold", children: "\u2713" }), _jsx("span", { className: "text-sm text-neutral-700 dark:text-neutral-200 leading-5", children: benefit })] }, idx))) })] }) }, index))) })] })] }));
};
export default React.memo(HowToSellSection);
