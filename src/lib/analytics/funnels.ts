import { logger } from '../logger.js';

// Аналитика воронки
export function trackEvaluationFunnel(step: string, data?: Record<string, unknown>): void {
  logger.debug('Evaluation funnel', { step, ...data }, 'analytics');
}

export function trackFormProgress(formName: string, progress: number): void {
  logger.debug('Form progress', { formName, progress }, 'analytics');
}

