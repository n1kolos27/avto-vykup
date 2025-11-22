import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '../lib/theme/index.js';
import Header from './Header.js';
import Footer from './Footer.js';
import ToastProvider from './ToastProvider.js';
import ChatWidget from './ChatWidget.js';
import FloatingCTA from './FloatingCTA.js';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Плавный переход при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Обновление заголовка страницы на основе текущего маршрута
    const updatePageTitle = () => {
      const titles: Record<string, string> = {
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
    const handleKeyPress = (e: KeyboardEvent) => {
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
            (firstButton as HTMLElement).focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen w-full bg-white dark:bg-neutral-900 transition-colors">
        {/* Skip links for accessibility */}
        <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-[9999] focus-within:flex focus-within:flex-col focus-within:gap-2">
          <a
            href="#main-content"
            className="px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-semibold shadow-lg focus-ring"
          >
            Перейти к основному содержимому
          </a>
          <a
            href="#navigation"
            className="px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-semibold shadow-lg focus-ring"
          >
            Перейти к навигации
          </a>
        </div>
        
        {/* ARIA live region for screen reader announcements */}
        <div
          ref={announcementRef}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        />
        
        <Header />
        <main 
          ref={mainRef}
          id="main-content" 
          className="flex-1 w-full page-transition focus-visible-ring" 
          tabIndex={-1}
          key={location.pathname}
          role="main"
          aria-label="Основное содержимое страницы"
        >
          {children}
        </main>
        <Footer />
        <ToastProvider />
        <ChatWidget />
        <FloatingCTA />
      </div>
    </ThemeProvider>
  );
};

export default Layout;

