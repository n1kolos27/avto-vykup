/**
 * Analytics System - Yandex Metrika
 * 
 * Интеграция с Yandex Metrika
 */

import type { AnalyticsEvent } from './types';
import { ENV } from '@/lib/config';

/**
 * Yandex Metrika ID
 */
export const YANDEX_METRIKA_ID = ENV.YANDEX_METRIKA_ID;

/**
 * Инициализация Yandex Metrika
 */
export function initYandexMetrika(): void {
  if (typeof window === 'undefined' || !YANDEX_METRIKA_ID) {
    return;
  }

  // Проверяем, не инициализирован ли уже
  if (window.ym) {
    return;
  }

  // Yandex Metrika инициализируется через скрипт в layout.tsx
}

/**
 * Отслеживание просмотра страницы
 */
export function trackPageViewYandex(url: string, title?: string): void {
  if (typeof window === 'undefined' || !window.ym || !YANDEX_METRIKA_ID) {
    return;
  }

  const id = parseInt(YANDEX_METRIKA_ID, 10);
  if (isNaN(id)) {
    return;
  }

  window.ym(id, 'hit', url, {
    title,
    referer: document.referrer,
  });
}

/**
 * Отслеживание события
 */
export function trackEventYandex(event: AnalyticsEvent): void {
  if (typeof window === 'undefined' || !window.ym || !YANDEX_METRIKA_ID) {
    return;
  }

  const id = parseInt(YANDEX_METRIKA_ID, 10);
  if (isNaN(id)) {
    return;
  }

  window.ym(id, 'reachGoal', event.action, {
    category: event.category,
    label: event.label,
    value: event.value,
  });
}

