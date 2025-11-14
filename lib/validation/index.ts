/**
 * Validation System
 * 
 * Единая система валидации для всего приложения.
 * 
 * @module lib/validation
 */

// Types
export * from './types';

// Validators
export * from './validators';

// Form validators
export * from './forms';

// Async validators
export * from './async';

// Re-export commonly used functions
export {
  validatePhone,
  validateEmail,
  validateYear,
  validateMileage,
  validateRating,
  validateText,
  validateName,
  validateBrand,
  validateModel,
  validateUrl,
  validateSlug,
  validateCondition,
} from './validators';

export {
  validateEvaluationForm,
  validateContactForm,
  validateReviewForm,
} from './forms';

export {
  validateAsync,
  validateUniqueEmail,
  validateExists,
  validateFormAsync,
} from './async';

