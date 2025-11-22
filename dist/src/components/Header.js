import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { APP_CONFIG } from '../lib/config/index.js';
import ThemeToggle from './ui/ThemeToggle.js';
const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const navItems = [
        { path: '/', label: 'Главная' },
        { path: '/calculator', label: 'Калькулятор' },
        { path: '/reviews', label: 'Отзывы' },
        { path: '/blog', label: 'Блог' },
        { path: '/contacts', label: 'Контакты' },
    ];
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);
    // Swipe gesture handling for mobile menu
    useEffect(() => {
        const menu = menuRef.current;
        if (!menu)
            return;
        const handleTouchStart = (e) => {
            touchStartX.current = e.touches[0].clientX;
        };
        const handleTouchMove = (e) => {
            touchEndX.current = e.touches[0].clientX;
        };
        const handleTouchEnd = () => {
            if (!isMenuOpen)
                return;
            const swipeDistance = touchStartX.current - touchEndX.current;
            const minSwipeDistance = 50;
            if (swipeDistance > minSwipeDistance) {
                setIsMenuOpen(false);
            }
        };
        menu.addEventListener('touchstart', handleTouchStart);
        menu.addEventListener('touchmove', handleTouchMove);
        menu.addEventListener('touchend', handleTouchEnd);
        return () => {
            menu.removeEventListener('touchstart', handleTouchStart);
            menu.removeEventListener('touchmove', handleTouchMove);
            menu.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMenuOpen]);
    const handleNavItemPress = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };
    const handlePhonePress = () => {
        const phoneNumber = APP_CONFIG.PHONE_1.replace(/\D/g, '');
        window.location.href = `tel:+${phoneNumber}`;
    };
    return (_jsxs("header", { id: "navigation", className: "bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm sticky top-0 z-50 transition-colors", role: "banner", children: [_jsxs("div", { className: "flex flex-row items-center justify-between px-5 py-4 max-w-[1200px] w-full mx-auto md:px-6", children: [_jsx("button", { onClick: () => navigate('/'), className: "mr-8 text-left", "aria-label": "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443", children: _jsx("span", { className: "text-xl font-bold text-primary-600 dark:text-primary-400", children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E" }) }), _jsx("nav", { className: "hidden md:flex md:flex-row md:gap-6 md:flex-1", children: navItems.map((item) => (_jsx("button", { onClick: () => handleNavItemPress(item.path), className: `py-2 transition-colors ${location.pathname === item.path
                                ? 'border-b-2 border-primary-600'
                                : ''}`, "aria-label": `Перейти на страницу ${item.label}`, "aria-current": location.pathname === item.path ? 'page' : undefined, children: _jsx("span", { className: `text-base ${location.pathname === item.path
                                    ? 'text-primary-600 dark:text-primary-400 font-semibold'
                                    : 'text-neutral-700 dark:text-neutral-300'}`, children: item.label }) }, item.path))) }), _jsxs("div", { className: "hidden md:flex md:flex-row md:items-center md:gap-3", children: [_jsx(ThemeToggle, {}), _jsx("button", { onClick: handlePhonePress, className: "bg-primary-600 dark:bg-primary-500 px-5 py-2.5 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors focus-ring", "aria-label": `Позвонить по телефону ${APP_CONFIG.PHONE_1}`, children: _jsx("span", { className: "text-white text-base font-semibold", children: APP_CONFIG.PHONE_1 }) })] }), _jsx("button", { onClick: () => setIsMenuOpen(!isMenuOpen), className: "md:hidden p-3 -mr-2 min-w-[48px] min-h-[48px] flex items-center justify-center touch-feedback", "aria-label": isMenuOpen ? 'Закрыть меню' : 'Открыть меню', "aria-expanded": isMenuOpen, "aria-controls": "mobile-menu", children: _jsxs("div", { className: "w-6 h-5 flex flex-col justify-between", children: [_jsx("span", { className: `h-0.5 bg-neutral-700 dark:bg-neutral-300 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}` }), _jsx("span", { className: `h-0.5 bg-neutral-700 dark:bg-neutral-300 transition-all ${isMenuOpen ? 'opacity-0' : ''}` }), _jsx("span", { className: `h-0.5 bg-neutral-700 dark:bg-neutral-300 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}` })] }) })] }), _jsx("div", { className: `md:hidden fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 z-[1040] ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`, onClick: () => setIsMenuOpen(false), "aria-hidden": !isMenuOpen }), _jsx("div", { ref: menuRef, id: "mobile-menu", className: `md:hidden fixed top-0 left-0 w-4/5 max-w-[320px] h-full bg-white dark:bg-neutral-900 z-[1050] shadow-xl dark:shadow-2xl transition-transform duration-300 ease-out safe-y ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`, "aria-hidden": !isMenuOpen, role: "dialog", "aria-modal": "true", "aria-label": "\u041C\u0435\u043D\u044E \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438", children: _jsxs("div", { className: "p-6 pt-16", children: [_jsx("button", { onClick: () => setIsMenuOpen(false), className: "absolute top-4 right-4 p-2", "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E", children: _jsx("span", { className: "text-2xl text-neutral-700 dark:text-neutral-300", children: "\u00D7" }) }), _jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2", children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E" }), _jsx("p", { className: "text-sm text-neutral-500 dark:text-neutral-400", children: "\u041C\u0435\u043D\u044E \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438" })] }), _jsx("nav", { className: "flex flex-col gap-2", children: navItems.map((item) => (_jsx("button", { onClick: () => handleNavItemPress(item.path), className: `p-4 rounded-lg text-left transition-colors min-h-[48px] touch-feedback ${location.pathname === item.path
                                    ? 'bg-primary-50 dark:bg-primary-900/30 border-l-4 border-primary-600 dark:border-primary-400'
                                    : 'bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800 active:bg-neutral-100 dark:active:bg-neutral-700'}`, "aria-label": `Перейти на страницу ${item.label}`, "aria-current": location.pathname === item.path ? 'page' : undefined, children: _jsx("span", { className: `text-base font-medium ${location.pathname === item.path
                                        ? 'text-primary-600 dark:text-primary-400'
                                        : 'text-neutral-700 dark:text-neutral-300'}`, children: item.label }) }, item.path))) }), _jsxs("div", { className: "mt-8 flex flex-col gap-3", children: [_jsx(ThemeToggle, { className: "w-full justify-center" }), _jsx("button", { onClick: handlePhonePress, className: "w-full bg-primary-600 dark:bg-primary-500 px-6 py-4 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors min-h-[48px] touch-feedback", "aria-label": `Позвонить по телефону ${APP_CONFIG.PHONE_1}`, children: _jsx("span", { className: "text-white text-base font-semibold", children: APP_CONFIG.PHONE_1 }) })] })] }) })] }));
};
export default Header;
