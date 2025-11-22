import { logger } from '../logger.js';

// Аналитика цели
export enum Goals {
  EVALUATION_SUBMIT = 'evaluation_submit',
  CONTACT_SUBMIT = 'contact_submit',
  REVIEW_SUBMIT = 'review_submit',
  PHONE_CLICK = 'phone_click',
}

export function trackGoal(goal: Goals, value?: number): void {
  logger.debug('Goal tracked', { goal, value }, 'analytics');
}

