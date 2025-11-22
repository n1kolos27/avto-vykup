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
export var BusinessEvent;
(function (BusinessEvent) {
    // Формы
    BusinessEvent["FORM_SUBMITTED"] = "form.submitted";
    BusinessEvent["FORM_ABANDONED"] = "form.abandoned";
    BusinessEvent["FORM_ERROR"] = "form.error";
    // Оценка автомобиля
    BusinessEvent["EVALUATION_REQUESTED"] = "evaluation.requested";
    BusinessEvent["EVALUATION_COMPLETED"] = "evaluation.completed";
    // Контакты
    BusinessEvent["CONTACT_SUBMITTED"] = "contact.submitted";
    // Отзывы
    BusinessEvent["REVIEW_SUBMITTED"] = "review.submitted";
    // Навигация
    BusinessEvent["PAGE_VIEW"] = "page.view";
    BusinessEvent["PAGE_EXIT"] = "page.exit";
    // Телефон
    BusinessEvent["PHONE_CLICKED"] = "phone.clicked";
    // Чат
    BusinessEvent["CHAT_OPENED"] = "chat.opened";
    BusinessEvent["CHAT_MESSAGE_SENT"] = "chat.message_sent";
})(BusinessEvent || (BusinessEvent = {}));
/**
 * Записывает бизнес-событие
 */
export function trackBusinessEvent(event, value, metadata) {
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
    trackFormSubmit(formName, success, metadata) {
        trackBusinessEvent(success ? BusinessEvent.FORM_SUBMITTED : BusinessEvent.FORM_ERROR, 1, {
            formName,
            ...metadata,
        });
    },
    /**
     * Отслеживает запрос оценки
     */
    trackEvaluationRequest(metadata) {
        trackBusinessEvent(BusinessEvent.EVALUATION_REQUESTED, 1, metadata);
    },
    /**
     * Отслеживает завершение оценки
     */
    trackEvaluationCompleted(metadata) {
        trackBusinessEvent(BusinessEvent.EVALUATION_COMPLETED, 1, metadata);
    },
    /**
     * Отслеживает просмотр страницы
     */
    trackPageView(path, metadata) {
        trackBusinessEvent(BusinessEvent.PAGE_VIEW, 1, {
            path,
            ...metadata,
        });
    },
    /**
     * Отслеживает клик по телефону
     */
    trackPhoneClick(phone) {
        trackBusinessEvent(BusinessEvent.PHONE_CLICKED, 1, { phone });
    },
    /**
     * Отслеживает открытие чата
     */
    trackChatOpen() {
        trackBusinessEvent(BusinessEvent.CHAT_OPENED, 1);
    },
    /**
     * Отслеживает отправку сообщения в чате
     */
    trackChatMessage() {
        trackBusinessEvent(BusinessEvent.CHAT_MESSAGE_SENT, 1);
    },
};
