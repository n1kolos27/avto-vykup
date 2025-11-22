import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '../lib/theme/index.js';
import Header from './Header.js';
import Footer from './Footer.js';
import ToastProvider from './ToastProvider.js';
import ChatWidget from './ChatWidget.js';
import FloatingCTA from './FloatingCTA.js';
const Layout = ({ children }) => {
    const location = useLocation();
    const mainRef = useRef(null);
    const announcementRef = useRef(null);
    useEffect(() => {
        // Плавный переход при смене страницы
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Обновление заголовка страницы на основе текущего маршрута
        const updatePageTitle = () => {
            const titles = {
                '/': 'Выкуп авто в Москве и МО | Быстро и Выгодно | До 97%',
                '/calculator': 'Калькулятор стоимости автомобиля | Выкуп авто в Москве',
                '/reviews': 'Отзывы клиентов о выкупе авто | Реальные отзывы',
                '/blog': 'Блог о выкупе автомобилей | Полезные статьи',
                '/contacts': 'Контакты | Выкуп авто в Москве и МО',
                '/about': 'О нас | Выкуп авто в Москве и МО',
                '/faq': 'Часто задаваемые вопросы | Выкуп авто',
                '/services': 'Услуги по выкупу автомобилей | Все виды выкупа',
                '/services/urgent-buyback': 'Срочный выкуп авто за 2 часа | Москва и МО',
                '/services/damaged-cars': 'Выкуп битых авто | Поврежденные автомобили',
                '/services/after-accident': 'Выкуп авто после ДТП | Москва и МО',
                '/services/credit-cars': 'Выкуп кредитных автомобилей | Решение с банком',
                '/services/premium-cars': 'Выкуп премиум и элитных автомобилей',
                '/services/buyback-cars': 'Выкуп автомобилей | Москва и МО',
                '/prices': 'Цены на выкуп автомобилей | Москва и МО',
                '/guarantees': 'Гарантии | Выкуп авто в Москве',
                '/how-we-work': 'Как мы работаем | Процесс выкупа авто',
                '/why-us': 'Почему выбирают нас | Выкуп авто',
                '/documents': 'Документы для выкупа авто | Список документов',
                '/car-brands': 'Выкуп автомобилей всех марок | Москва и МО',
            };
            const title = titles[location.pathname] || 'Выкуп авто в Москве и МО';
            document.title = title;
        };
        updatePageTitle();
        // Focus management for accessibility
        if (mainRef.current) {
            mainRef.current.focus();
        }
        // Announce page change to screen readers
        if (announcementRef.current) {
            announcementRef.current.textContent = `Загружена страница: ${location.pathname === '/' ? 'Главная' : location.pathname}`;
            setTimeout(() => {
                if (announcementRef.current) {
                    announcementRef.current.textContent = '';
                }
            }, 1000);
        }
    }, [location.pathname]);
    useEffect(() => {
        // Keyboard shortcuts
        const handleKeyPress = (e) => {
            // Alt + M: Focus main content
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                if (mainRef.current) {
                    mainRef.current.focus();
                }
            }
            // Alt + H: Focus header
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                const header = document.querySelector('header');
                if (header) {
                    const firstButton = header.querySelector('button');
                    if (firstButton) {
                        firstButton.focus();
                    }
                }
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);
    return (_jsx(ThemeProvider, { children: _jsxs("div", { className: "flex flex-col min-h-screen w-full bg-white dark:bg-neutral-900 transition-colors", children: [_jsxs("div", { className: "sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-[9999] focus-within:flex focus-within:flex-col focus-within:gap-2", children: [_jsx("a", { href: "#main-content", className: "px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-semibold shadow-lg focus-ring", children: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u043C\u0443 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u043C\u0443" }), _jsx("a", { href: "#navigation", className: "px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-semibold shadow-lg focus-ring", children: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438" })] }), _jsx("div", { ref: announcementRef, role: "status", "aria-live": "polite", "aria-atomic": "true", className: "sr-only" }), _jsx(Header, {}), _jsx("main", { ref: mainRef, id: "main-content", className: "flex-1 w-full page-transition focus-visible-ring", tabIndex: -1, role: "main", "aria-label": "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B", children: children }, location.pathname), _jsx(Footer, {}), _jsx(ToastProvider, {}), _jsx(ChatWidget, {}), _jsx(FloatingCTA, {})] }) }));
};
export default Layout;
