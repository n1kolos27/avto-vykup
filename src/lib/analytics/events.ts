import { logger } from '../logger.js';

// Аналитика события
export function trackPhoneClick(phone: string): void {
  // В реальном приложении здесь должна быть отправка в аналитику
  logger.debug('Phone clicked', { phone }, 'analytics');
}

export function trackChatOpen(): void {
  logger.debug('Chat opened', undefined, 'analytics');
}

export function trackChatMessage(): void {
  logger.debug('Chat message sent', undefined, 'analytics');
}

export function trackFormSubmit(formName: string): void {
  logger.debug('Form submitted', { formName }, 'analytics');
}

