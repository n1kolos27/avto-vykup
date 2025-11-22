import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Button from '../ui/Button';
import Card from '../ui/Card';
const conditions = [
    'Целые',
    'Битые (аварийные)',
    'Кредитные',
    'Неисправные',
    'После ДТП',
];
const carBrands = [
    'Audi', 'BMW', 'Mercedes-Benz', 'Toyota', 'Volkswagen', 'Ford', 'Nissan',
    'Hyundai', 'Kia', 'Mazda', 'Honda', 'Lexus', 'Volvo', 'Skoda', 'Renault',
    'Peugeot', 'Citroen', 'Opel', 'Chevrolet', 'Mitsubishi', 'Subaru', 'Infiniti',
    'Porsche', 'Land Rover', 'Jaguar', 'Jeep', 'Dodge', 'Chrysler', 'Cadillac',
];
const AnyConditionSection = () => {
    const navigate = useNavigate();
    return (_jsxs("section", { className: "bg-neutral-50 dark:bg-neutral-900 py-16 px-4 transition-colors relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto", children: [_jsx(AnimatedSection, { animationType: "fade-slide", delay: 0, children: _jsx("h2", { className: "text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 text-center heading-accent", children: "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C \u0432\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u0432 \u043B\u044E\u0431\u043E\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438 \u0434\u043E\u0440\u043E\u0433\u043E \u0438 \u0431\u044B\u0441\u0442\u0440\u043E" }) }), _jsx(AnimatedCard, { delay: 100, children: _jsxs(Card, { hover3D: true, className: "mb-6 p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6", children: "\u0412\u044B\u043A\u0443\u043F\u0430\u0435\u043C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F\u0445:" }), _jsx("div", { className: "flex flex-row flex-wrap gap-4", children: conditions.map((condition, index) => (_jsxs("div", { className: "flex flex-row items-center flex-1 min-w-[45%] gap-3", children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-sm font-bold text-white", children: "\u2713" }) }), _jsx("span", { className: "text-base text-neutral-700 dark:text-neutral-200 font-medium", children: condition })] }, index))) })] }) }), _jsx(AnimatedCard, { delay: 200, children: _jsxs(Card, { hover3D: true, className: "mb-6 p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6", children: "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0441\u043E \u0432\u0441\u0435\u043C\u0438 \u043C\u0430\u0440\u043A\u0430\u043C\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439:" }), _jsxs("p", { className: "text-base text-neutral-700 dark:text-neutral-200 leading-6 mb-3", children: [carBrands.join(', '), " \u0438 \u043C\u043D\u043E\u0433\u0438\u0435 \u0434\u0440\u0443\u0433\u0438\u0435."] }), _jsx("p", { className: "text-sm text-neutral-500 dark:text-neutral-400 italic", children: "\u041D\u0430\u0448\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043F\u043E \u043E\u0446\u0435\u043D\u043A\u0435 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u043E\u0433\u043E \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E 30 \u0434\u043D\u0435\u0439" })] }) }), _jsx("div", { className: "flex justify-center mt-8", children: _jsx(Button, { onClick: () => navigate('/calculator'), size: "lg", className: "min-w-[250px]", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043E\u0446\u0435\u043D\u043A\u0443 \u043E\u043D\u043B\u0430\u0439\u043D" }) })] })] }));
};
export default React.memo(AnyConditionSection);
