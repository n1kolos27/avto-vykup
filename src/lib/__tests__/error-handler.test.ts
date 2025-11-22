import { describe, it, expect } from 'vitest';
import { createError, handleApiError, type AppError } from '../error-handler';

describe('Error Handler', () => {
  describe('createError', () => {
    it('should create error with message', () => {
      const error = createError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.isOperational).toBe(true);
    });

    it('should create error with code and statusCode', () => {
      const error = createError('Test error', 'TEST_CODE', 400);
      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_CODE');
      expect(error.statusCode).toBe(400);
    });

    it('should use default statusCode 500', () => {
      const error = createError('Test error', 'TEST_CODE');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('handleApiError', () => {
    it('should handle AppError', () => {
      const error = createError('Test error', 'TEST_CODE', 400);
      const result = handleApiError(error);
      expect(result.message).toBe('Test error');
      expect(result.statusCode).toBe(400);
    });

    it('should handle standard Error', () => {
      const error = new Error('Standard error');
      const result = handleApiError(error);
      expect(result.message).toBe('Standard error');
      expect(result.statusCode).toBe(500);
    });

    it('should handle unknown error type', () => {
      const result = handleApiError('string error');
      expect(result.message).toBe('Internal server error');
      expect(result.statusCode).toBe(500);
    });

    it('should handle error with statusCode', () => {
      const error = new Error('Test error') as AppError;
      error.statusCode = 404;
      const result = handleApiError(error);
      expect(result.statusCode).toBe(404);
    });
  });
});

