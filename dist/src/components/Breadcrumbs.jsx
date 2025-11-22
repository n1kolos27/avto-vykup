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
    return (<nav className={`flex flex-row items-center flex-wrap py-3 px-4 gap-2 ${className}`} aria-label="Хлебные крошки">
      {breadcrumbItems.map((item, index) => (<React.Fragment key={item.href}>
          {index > 0 && <span className="text-sm text-neutral-400 mx-1">›</span>}
          {index === breadcrumbItems.length - 1 ? (<span className="text-sm text-neutral-600 font-medium" aria-current="page">{item.label}</span>) : (<button onClick={() => navigate(item.href)} className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
              {item.label}
            </button>)}
        </React.Fragment>))}
    </nav>);
};
export default React.memo(Breadcrumbs);
