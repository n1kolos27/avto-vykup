import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import Button from '../ui/Button';
const advantages = [
    'Конкурентная оценка автомобиля с учетом всех факторов',
    'Возможность обмена (trade-in) на другой автомобиль',
    'Отсутствие скрытых комиссий и дополнительных платежей',
    'Работаем с физическими и юридическими лицами',
    'Широкий охват территории: Москва и вся Московская область',
    'Выезд специалиста на место для осмотра автомобиля',
    'Официальное оформление всех документов',
    'Быстрое решение вопроса с выкупом автомобиля',
];
const MoscowBuybackSection = () => {
    const navigate = useNavigate();
    return (_jsxs("section", { className: "bg-white dark:bg-neutral-900 py-16 px-4 transition-colors relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto", children: [_jsx(AnimatedSection, { animationType: "fade-slide", delay: 0, children: _jsx("h2", { className: "text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 text-center heading-accent", children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u0432 \u041C\u043E\u0441\u043A\u0432\u0435" }) }), _jsx(AnimatedSection, { animationType: "stagger", delay: 100, children: _jsx("div", { className: "flex flex-col gap-4 mb-8", children: advantages.map((advantage, index) => (_jsxs("div", { className: "flex flex-row items-start gap-3 stagger-item", style: { animationDelay: `${index * 50}ms` }, children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center mt-0.5 flex-shrink-0", children: _jsx("span", { className: "text-white text-sm font-bold", children: "\u2713" }) }), _jsx("p", { className: "flex-1 text-base text-neutral-700 dark:text-neutral-200 leading-6", children: advantage })] }, index))) }) }), _jsx("div", { className: "flex justify-center", children: _jsx(Button, { onClick: () => navigate('/calculator'), size: "lg", className: "min-w-[250px]", children: "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u0446\u0435\u043D\u043A\u0443 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" }) })] })] }));
};
export default React.memo(MoscowBuybackSection);
