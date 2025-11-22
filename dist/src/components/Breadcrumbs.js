import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const defaultLabels = {
    '/': 'Главная',
    '/calculator': 'Калькулятор',
    '/services': 'Услуги',
    '/services/buyback-cars': 'Выкуп автомобилей',
    '/services/urgent-buyback': 'Срочный выкуп',
    '/services/damaged-cars': 'Выкуп битых авто',
    '/services/after-accident': 'Выкуп после ДТП',
    '/services/credit-cars': 'Выкуп кредитных авто',
    '/services/premium-cars': 'Выкуп премиум авто',
    '/reviews': 'Отзывы',
    '/blog': 'Блог',
    '/faq': 'FAQ',
    '/contacts': 'Контакты',
    '/about': 'О нас',
    '/documents': 'Документы',
    '/prices': 'Цены',
    '/guarantees': 'Гарантии',
    '/how-we-work': 'Как мы работаем',
    '/why-us': 'Почему мы',
    '/car-brands': 'Марки автомобилей',
};
const Breadcrumbs = ({ items, className = '' }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const breadcrumbItems = items || (() => {
        const paths = location.pathname.split('/').filter(Boolean);
        const result = [{ label: 'Главная', href: '/' }];
        let currentPath = '';
        paths.forEach((path) => {
            currentPath += `/${path}`;
            const label = defaultLabels[currentPath] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
            result.push({ label, href: currentPath });
        });
        return result;
    })();
    return (_jsx("nav", { className: `flex flex-row items-center flex-wrap py-3 px-4 gap-2 ${className}`, "aria-label": "\u0425\u043B\u0435\u0431\u043D\u044B\u0435 \u043A\u0440\u043E\u0448\u043A\u0438", children: breadcrumbItems.map((item, index) => (_jsxs(React.Fragment, { children: [index > 0 && _jsx("span", { className: "text-sm text-neutral-400 mx-1", children: "\u203A" }), index === breadcrumbItems.length - 1 ? (_jsx("span", { className: "text-sm text-neutral-600 font-medium", "aria-current": "page", children: item.label })) : (_jsx("button", { onClick: () => navigate(item.href), className: "text-sm text-primary-600 hover:text-primary-700 transition-colors", children: item.label }))] }, item.href))) }));
};
export default React.memo(Breadcrumbs);
