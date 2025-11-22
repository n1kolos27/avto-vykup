import { logger } from '../logger.js';
// Аналитика события
export function trackPhoneClick(phone) {
    // В реальном приложении здесь должна быть отправка в аналитику
    logger.debug('Phone clicked', { phone }, 'analytics');
}
export function trackChatOpen() {
    logger.debug('Chat opened', undefined, 'analytics');
}
export function trackChatMessage() {
    logger.debug('Chat message sent', undefined, 'analytics');
}
export function trackFormSubmit(formName) {
    logger.debug('Form submitted', { formName }, 'analytics');
}
