/**
 * Business Metrics System
 * 
 * Система отслеживания бизнес-метрик
 */

import { metrics } from '../metrics/index.js';
import { logger } from '../logger.js';

/**
 * Бизнес-события
 */
export enum BusinessEvent {
  // Формы
  FORM_SUBMITTED = 'form.submitted',
  FORM_ABANDONED = 'form.abandoned',
  FORM_ERROR = 'form.error',
  
  // Оценка автомобиля
  EVALUATION_REQUESTED = 'evaluation.requested',
  EVALUATION_COMPLETED = 'evaluation.completed',
  
  // Контакты
  CONTACT_SUBMITTED = 'contact.submitted',
  
  // Отзывы
  REVIEW_SUBMITTED = 'review.submitted',
  
  // Навигация
  PAGE_VIEW = 'page.view',
  PAGE_EXIT = 'page.exit',
  
  // Телефон
  PHONE_CLICKED = 'phone.clicked',
  
  // Чат
  CHAT_OPENED = 'chat.opened',
  CHAT_MESSAGE_SENT = 'chat.message_sent',
}

/**
 * Записывает бизнес-событие
 */
export function trackBusinessEvent(
  event: BusinessEvent,
  value?: number,
  metadata?: Record<string, unknown>
): void {
  metrics.recordBusiness({
    event,
    value,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString(),
    },
  });

  // Логируем важные события
  if ([
    BusinessEvent.EVALUATION_COMPLETED,
    BusinessEvent.CONTACT_SUBMITTED,
    BusinessEvent.REVIEW_SUBMITTED,
  ].includes(event)) {
    logger.info('Business event', {
      event,
      value,
      ...metadata,
    }, 'BusinessMetrics');
  }
}

/**
 * Утилиты для конкретных бизнес-событий
 */
export const businessMetrics = {
  /**
   * Отслеживает отправку формы
   */
  trackFormSubmit(formName: string, success: boolean, metadata?: Record<string, unknown>): void {
    trackBusinessEvent(
      success ? BusinessEvent.FORM_SUBMITTED : BusinessEvent.FORM_ERROR,
      1,
      {
        formName,
        ...metadata,
      }
    );
  },

  /**
   * Отслеживает запрос оценки
   */
  trackEvaluationRequest(metadata?: Record<string, unknown>): void {
    trackBusinessEvent(BusinessEvent.EVALUATION_REQUESTED, 1, metadata);
  },

  /**
   * Отслеживает завершение оценки
   */
  trackEvaluationCompleted(metadata?: Record<string, unknown>): void {
    trackBusinessEvent(BusinessEvent.EVALUATION_COMPLETED, 1, metadata);
  },

  /**
   * Отслеживает просмотр страницы
   */
  trackPageView(path: string, metadata?: Record<string, unknown>): void {
    trackBusinessEvent(BusinessEvent.PAGE_VIEW, 1, {
      path,
      ...metadata,
    });
  },

  /**
   * Отслеживает клик по телефону
   */
  trackPhoneClick(phone: string): void {
    trackBusinessEvent(BusinessEvent.PHONE_CLICKED, 1, { phone });
  },

  /**
   * Отслеживает открытие чата
   */
  trackChatOpen(): void {
    trackBusinessEvent(BusinessEvent.CHAT_OPENED, 1);
  },

  /**
   * Отслеживает отправку сообщения в чате
   */
  trackChatMessage(): void {
    trackBusinessEvent(BusinessEvent.CHAT_MESSAGE_SENT, 1);
  },
};

