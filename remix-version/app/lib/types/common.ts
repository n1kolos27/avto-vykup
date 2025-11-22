/**
 * Общие типы приложения
 */

// Типы для валидации
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Типы для аналитики
export interface AnalyticsEvent {
  event: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

// Типы для SEO
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

// Типы для конфигурации
export interface AppConfig {
  domain: string;
  phone1: string;
  phone2: string;
  email: string;
  siteName: string;
}

// Типы для email
export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface EmailResult {
  success: boolean;
  error?: string;
}

// Типы для санитизации
export interface SanitizeOptions {
  maxLength?: number;
  min?: number;
  max?: number;
  allowHtml?: boolean;
}

// Типы для метаданных страницы
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

// Типы для навигации
export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

// Типы для breadcrumbs
export interface BreadcrumbItem {
  label: string;
  href: string;
}

// Типы для Schema.org
export interface SchemaOrg {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

// Типы для состояния загрузки
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  data: unknown;
}

// Типы для пагинации
export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

// Типы для фильтров
export interface FilterOptions {
  category?: string;
  search?: string;
  sort?: string;
  [key: string]: unknown;
}

// Типы для сортировки
export type SortOrder = 'asc' | 'desc';

export interface SortOptions {
  field: string;
  order: SortOrder;
}

