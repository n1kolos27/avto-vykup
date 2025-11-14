/**
 * Analytics System - Types
 * 
 * Типы для системы аналитики
 */

/**
 * Событие аналитики
 */
export interface AnalyticsEvent {
  /** Действие (action) */
  action: string;
  /** Категория события */
  category: string;
  /** Метка события */
  label?: string;
  /** Значение события */
  value?: number;
  /** Дополнительные параметры */
  [key: string]: unknown;
}

/**
 * Тип конверсии
 */
export type ConversionType = 'call' | 'form' | 'chat' | 'download' | 'signup' | 'purchase';

/**
 * Событие конверсии
 */
export interface ConversionEvent {
  type: ConversionType;
  value?: number;
  currency?: string;
  items?: ConversionItem[];
}

/**
 * Элемент конверсии
 */
export interface ConversionItem {
  id: string;
  name: string;
  category?: string;
  quantity?: number;
  price?: number;
}

/**
 * Конфигурация аналитики
 */
export interface AnalyticsConfig {
  /** Google Analytics ID */
  googleAnalyticsId?: string;
  /** Yandex Metrika ID */
  yandexMetrikaId?: string;
  /** Включена ли аналитика */
  enabled: boolean;
  /** Режим отладки */
  debug?: boolean;
}

/**
 * Параметры страницы для отслеживания
 */
export interface PageViewParams {
  /** URL страницы */
  url: string;
  /** Заголовок страницы */
  title?: string;
  /** Дополнительные параметры */
  [key: string]: unknown;
}

