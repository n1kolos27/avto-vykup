/**
 * Error Handling System - API Error
 * 
 * Кастомный класс ошибки для API запросов
 */

/**
 * API Error класс для структурированных ошибок API
 */
export class ApiError extends Error {
  /**
   * HTTP статус код
   */
  public readonly statusCode: number;

  /**
   * Код ошибки для идентификации типа
   */
  public readonly code: string;

  /**
   * Конструктор ApiError
   * 
   * @param message - Сообщение об ошибке
   * @param statusCode - HTTP статус код
   * @param code - Код ошибки
   */
  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;

    // Поддержка правильного stack trace в V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  /**
   * Преобразование ошибки в JSON
   */
  toJSON(): {
    name: string;
    message: string;
    statusCode: number;
    code: string;
  } {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
    };
  }
}
