/**
 * Типы для API запросов и ответов
 * Используются zod схемы для генерации типов (если доступны)
 */

// Base API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  code?: string;
  data?: T;
  errors?: Record<string, string>;
}

// Evaluation API - типы из validation (совместимы с zod схемами)
export interface EvaluationRequest {
  name: string;
  phone: string;
  brand: string;
  model?: string;
  year?: number;
  mileage?: number;
  condition?: string;
}

export interface EvaluationResponse extends ApiResponse {
  success: true;
  message: string;
}

// Contact API - типы из validation
export interface ContactRequest {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export interface ContactResponse extends ApiResponse {
  success: true;
  message: string;
}

// Review API - типы из validation
export interface ReviewRequest {
  name: string;
  rating: number;
  text: string;
  carModel?: string;
  phone?: string;
}

export interface ReviewResponse extends ApiResponse {
  success: true;
  message: string;
}

// Error Response
export interface ErrorResponse extends ApiResponse {
  success: false;
  error: string;
  code?: string;
  errors?: Record<string, string>;
}

