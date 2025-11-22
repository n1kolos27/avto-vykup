/**
 * Analytics System - Event Tracking
 * 
 * Утилиты для отслеживания различных событий
 */

import type { AnalyticsEvent, ConversionType } from './types';
import { trackEvent } from './google-analytics';
import { trackEventYandex } from './yandex-metrika';

/**
 * Универсальное отслеживание события (для всех систем аналитики)
 */
export function trackUniversalEvent(event: AnalyticsEvent): void {
  trackEvent(event);
  trackEventYandex(event);
}

/**
 * Внутренняя функция для отслеживания конверсии (используется внутри модуля)
 */
function trackConversionInternal(
  type: ConversionType,
  value?: number
): void {
  trackUniversalEvent({
    action: 'conversion',
    category: 'conversion',
    label: type,
    value,
  });
}

/**
 * Отслеживание конверсии
 */
export function trackConversion(
  type: ConversionType,
  value?: number
): void {
  trackConversionInternal(type, value);
}

/**
 * Отслеживание клика по телефону
 */
export function trackPhoneClick(phone: string, location?: string): void {
  trackUniversalEvent({
    action: 'click',
    category: 'phone',
    label: phone,
    location,
  });
  trackConversionInternal('call');
}

/**
 * Отслеживание отправки формы
 */
export function trackFormSubmit(
  formType: 'evaluation' | 'contact' | 'review',
  details?: Record<string, unknown>
): void {
  trackUniversalEvent({
    action: 'submit',
    category: 'form',
    label: formType,
    ...details,
  });
  trackConversionInternal('form');
}

/**
 * Отслеживание открытия чата
 */
export function trackChatOpen(): void {
  trackUniversalEvent({
    action: 'open',
    category: 'chat',
  });
}

/**
 * Отслеживание отправки сообщения в чат
 */
export function trackChatMessage(): void {
  trackUniversalEvent({
    action: 'message',
    category: 'chat',
  });
  trackConversionInternal('chat');
}

/**
 * Отслеживание клика по CTA
 */
export function trackCTAClick(ctaType: string, location: string): void {
  trackUniversalEvent({
    action: 'click',
    category: 'cta',
    label: `${ctaType}_${location}`,
  });
}

/**
 * Отслеживание глубины прокрутки
 */
export function trackScrollDepth(depth: number): void {
  trackUniversalEvent({
    action: 'scroll',
    category: 'engagement',
    label: `scroll_${depth}%`,
    value: depth,
  });
}

/**
 * Отслеживание времени на странице
 */
export function trackTimeOnPage(seconds: number, path?: string): void {
  trackUniversalEvent({
    action: 'time_on_page',
    category: 'engagement',
    label: 'time_on_page',
    value: seconds,
    page_path: path,
  });
}

/**
 * Отслеживание взаимодействия с формой
 */
export function trackFormInteraction(
  fieldName: string,
  action: 'focus' | 'blur' | 'change',
  formName?: string
): void {
  trackUniversalEvent({
    action: action,
    category: 'form_interaction',
    label: formName ? `${formName}_${fieldName}` : fieldName,
  });
}

