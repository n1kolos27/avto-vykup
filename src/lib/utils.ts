/**
 * Production-ready утилиты
 */

import { logger } from './logger.js';

/**
 * Объединение классов для Tailwind CSS
 * Простая реализация без внешних зависимостей
 */
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Форматирование телефона для отображения
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';

  const digits = phone.replace(/\D/g, '');

  if (digits.length === 11 && digits.startsWith('8')) {
    // Формат: 8 (999) 123-45-67
    return `8 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
  }

  if (digits.length === 11 && digits.startsWith('7')) {
    // Формат: +7 (999) 123-45-67
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
  }

  if (digits.length === 10) {
    // Формат: (999) 123-45-67
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`;
  }

  return phone;
}

/**
 * Форматирование числа с разделителями
 * С fallback для браузеров без поддержки Intl
 */
export function formatNumber(num: number, locale = 'ru-RU'): string {
  if (!isBrowser()) {
    // SSR fallback
    return num.toLocaleString('ru-RU');
  }

  // Проверка поддержки Intl
  if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
    try {
      return new Intl.NumberFormat(locale).format(num);
    } catch (error) {
      logger.warn('Intl.NumberFormat failed, using fallback', {
        error: error instanceof Error ? error.message : String(error),
      }, 'utils');
    }
  }

  // Fallback для старых браузеров
  return num.toLocaleString('ru-RU');
}

/**
 * Форматирование валюты
 * С fallback для браузеров без поддержки Intl
 */
export function formatCurrency(amount: number, currency = 'RUB', locale = 'ru-RU'): string {
  if (!isBrowser()) {
    // SSR fallback
    return `${amount.toLocaleString('ru-RU')} ₽`;
  }

  // Проверка поддержки Intl
  if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch (error) {
      logger.warn('Intl.NumberFormat failed, using fallback', {
        error: error instanceof Error ? error.message : String(error),
      }, 'utils');
    }
  }

  // Fallback для старых браузеров
  const formattedAmount = amount.toLocaleString('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Простое форматирование валюты
  const currencySymbols: Record<string, string> = {
    RUB: '₽',
    USD: '$',
    EUR: '€',
  };

  const symbol = currencySymbols[currency] || currency;
  return `${formattedAmount} ${symbol}`;
}

/**
 * Форматирование даты
 * С fallback для браузеров без поддержки Intl
 */
export function formatDate(date: Date | string, locale = 'ru-RU'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!isBrowser()) {
    // SSR fallback
    return dateObj.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Проверка поддержки Intl
  if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
    try {
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj);
    } catch (error) {
      logger.warn('Intl.DateTimeFormat failed, using fallback', {
        error: error instanceof Error ? error.message : String(error),
      }, 'utils');
    }
  }

  // Fallback для старых браузеров
  return dateObj.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Форматирование даты и времени
 * С fallback для браузеров без поддержки Intl
 */
export function formatDateTime(date: Date | string, locale = 'ru-RU'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!isBrowser()) {
    // SSR fallback
    return dateObj.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Проверка поддержки Intl
  if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
    try {
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(dateObj);
    } catch (error) {
      logger.warn('Intl.DateTimeFormat failed, using fallback', {
        error: error instanceof Error ? error.message : String(error),
      }, 'utils');
    }
  }

  // Fallback для старых браузеров
  return dateObj.toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Обрезка текста с многоточием
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Задержка (для тестирования)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Дебаунс функция
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Троттлинг функция
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Проверка, является ли значение пустым
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Безопасное получение значения из объекта
 */
export function getNestedValue<T>(obj: Record<string, unknown>, path: string): T | undefined {
  return path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' ? (current as Record<string, unknown>)[key] : undefined;
  }, obj as unknown) as T | undefined;
}

/**
 * Генерация уникального ID
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Копирование в буфер обмена
 * С fallback для старых браузеров
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isBrowser()) {
    return false;
  }

  // Современный Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Fallback к старому методу
      logger.warn('Clipboard API failed, using fallback', {
        error: error instanceof Error ? error.message : String(error),
      }, 'utils');
    }
  }

  // Fallback для старых браузеров
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (successful) {
      return true;
    }
  } catch (error) {
    logger.error('Failed to copy to clipboard', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }, 'utils');
  }

  return false;
}

/**
 * Проверка поддержки функций браузера
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Проверка мобильного устройства
 */
export function isMobile(): boolean {
  if (!isBrowser()) return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Проверка поддержки WebP
 */
export function supportsWebP(): boolean {
  if (!isBrowser()) return false;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } catch {
    return false;
  }
}

/**
 * Проверка поддержки AVIF
 */
export function supportsAVIF(): boolean {
  if (!isBrowser()) return false;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  } catch {
    return false;
  }
}

/**
 * Проверка поддержки IntersectionObserver
 */
export function supportsIntersectionObserver(): boolean {
  return isBrowser() && 'IntersectionObserver' in window;
}

/**
 * Проверка поддержки ResizeObserver
 */
export function supportsResizeObserver(): boolean {
  return isBrowser() && 'ResizeObserver' in window;
}

/**
 * Проверка поддержки Clipboard API
 */
export function supportsClipboard(): boolean {
  return (
    isBrowser() &&
    'navigator' in window &&
    'clipboard' in navigator &&
    'writeText' in navigator.clipboard
  );
}

/**
 * Проверка поддержки smooth scroll
 */
export function supportsSmoothScroll(): boolean {
  if (!isBrowser() || typeof document === 'undefined') return false;
  return 'scrollBehavior' in document.documentElement.style;
}

/**
 * Плавная прокрутка к элементу
 * С fallback для браузеров без поддержки smooth scroll
 */
export function scrollToElement(elementId: string, offset = 0): void {
  if (!isBrowser()) return;

  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  // Проверка поддержки smooth scroll
  const supportsSmoothScroll =
    'scrollBehavior' in document.documentElement.style;

  if (supportsSmoothScroll) {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  } else {
    // Fallback: плавная прокрутка через requestAnimationFrame
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 500; // мс
    let start: number | null = null;

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);

      // Easing function (ease-in-out)
      const ease =
        percentage < 0.5
          ? 2 * percentage * percentage
          : -1 + (4 - 2 * percentage) * percentage;

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }
}

/**
 * Получение параметров из URL
 */
export function getUrlParams(): URLSearchParams {
  if (!isBrowser()) return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

/**
 * Установка параметров URL
 */
export function setUrlParam(key: string, value: string): void {
  if (!isBrowser()) return;

  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url.toString());
}

/**
 * Удаление параметра из URL
 */
export function removeUrlParam(key: string): void {
  if (!isBrowser()) return;

  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.pushState({}, '', url.toString());
}
