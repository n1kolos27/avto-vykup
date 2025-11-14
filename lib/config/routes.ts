/**
 * Конфигурация маршрутов приложения
 * Централизованное определение всех маршрутов и навигации
 */

export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

/**
 * Основные навигационные элементы (для Header)
 */
export const MAIN_NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'Компания' },
  { href: '/services', label: 'Услуги' },
  { href: '/blog', label: 'Блог' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contacts', label: 'Контакты' },
] as const;

/**
 * Навигационные элементы для Footer
 */
export const FOOTER_NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Главная' },
  { href: '/calculator', label: 'Калькулятор' },
  { href: '/services', label: 'Услуги' },
  { href: '/reviews', label: 'Отзывы' },
  { href: '/blog', label: 'Блог' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'О нас' },
  { href: '/contacts', label: 'Контакты' },
] as const;

/**
 * Все публичные маршруты приложения
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CALCULATOR: '/calculator',
  REVIEWS: '/reviews',
  BLOG: '/blog',
  FAQ: '/faq',
  CONTACTS: '/contacts',
  DOCUMENTS: '/documents',
  PRICES: '/prices',
  GUARANTEES: '/guarantees',
  HOW_WE_WORK: '/how-we-work',
  WHY_US: '/why-us',
} as const;

/**
 * API маршруты
 */
export const API_ROUTES = {
  EVALUATION: '/api/evaluation',
  CONTACT: '/api/contact',
  REVIEW: '/api/review',
} as const;

