/**
 * Главный файл типов
 * Реэкспорт всех типов приложения
 */

// Формы
export type {
  EvaluationFormData,
  ContactFormData,
  ReviewFormData,
  FormValidationError,
} from './forms';

// API
export type {
  ApiResponse,
  ApiError,
  RateLimitResult,
} from './api';

// Доменные типы
export type {
  BlogPost,
  Review,
  Service,
  Stat,
  Case,
  FAQ,
  Advantage,
  ProcessStep,
  Guarantee,
} from './domain';

// Общие типы
export type {
  ValidationError,
  ValidationResult,
  AnalyticsEvent,
  SEOConfig,
  AppConfig,
  EmailData,
  EmailResult,
  SanitizeOptions,
  PageMetadata,
  NavItem,
  BreadcrumbItem,
  SchemaOrg,
  LoadingState,
  PaginationParams,
  PaginatedResponse,
  FilterOptions,
  SortOrder,
  SortOptions,
} from './common';

