/**
 * Email System
 * 
 * Единая система отправки email для всего приложения.
 * 
 * @module lib/email
 */

// Email sender
export * from './sender';

// Email templates
export * from './templates';

// Re-export commonly used functions
export { sendEmail } from './sender';
export {
  formatEvaluationEmail,
  formatContactEmail,
  formatReviewEmail,
} from './templates';

