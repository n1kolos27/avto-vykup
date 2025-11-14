/**
 * Analytics System - Google Analytics
 * 
 * Интеграция с Google Analytics 4
 */

import type { AnalyticsEvent, PageViewParams } from './types';
import { ENV } from '@/lib/config';

/**
 * Google Analytics Tracking ID
 */
export const GA_TRACKING_ID = ENV.GOOGLE_ANALYTICS_ID;

/**
 * Инициализация Google Analytics
 */
export function initGoogleAnalytics(): void {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) {
    return;
  }

  // Проверяем, не инициализирован ли уже
  if (window.gtag) {
    return;
  }

  // Создаем dataLayer
  window.dataLayer = window.dataLayer || [];

  // Функция gtag
  function gtag(
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date,
    config?: Record<string, unknown>
  ): void {
    window.dataLayer!.push(arguments);
  }

  window.gtag = gtag;

  // Инициализация
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
  });
}

/**
 * Отслеживание просмотра страницы
 */
export function trackPageView(params: PageViewParams): void {
  if (typeof window === 'undefined' || !window.gtag || !GA_TRACKING_ID) {
    return;
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_path: params.url,
    page_title: params.title,
    ...params,
  });
}

/**
 * Отслеживание события
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined' || !window.gtag || !GA_TRACKING_ID) {
    return;
  }

  window.gtag('event', event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
    ...event,
  });
}

/**
 * Отслеживание конверсии
 */
export function trackConversion(
  type: string,
  value?: number,
  currency = 'RUB'
): void {
  trackEvent({
    action: 'conversion',
    category: 'conversion',
    label: type,
    value,
    currency,
  });
}

