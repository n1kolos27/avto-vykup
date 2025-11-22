import { describe, it, expect } from 'vitest';
import {
  validateEvaluationForm,
  validateContactForm,
  validateReviewForm,
  type EvaluationFormData,
  type ContactFormData,
  type ReviewFormData,
} from '../validation';

describe('Validation', () => {
  describe('validateEvaluationForm', () => {
    it('should validate correct form data', () => {
      const data: EvaluationFormData = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        brand: 'Toyota',
      };

      const result = validateEvaluationForm(data);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should reject form with short name', () => {
      const data: EvaluationFormData = {
        name: 'И',
        phone: '+79991234567',
        brand: 'Toyota',
      };

      const result = validateEvaluationForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeDefined();
    });

    it('should reject form with invalid phone', () => {
      const data: EvaluationFormData = {
        name: 'Иван Иванов',
        phone: 'abc', // Невалидный телефон (не только цифры)
        brand: 'Toyota',
      };

      const result = validateEvaluationForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.phone).toBeDefined();
    });

    it('should reject form without brand', () => {
      const data: EvaluationFormData = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        brand: '',
      };

      const result = validateEvaluationForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.brand).toBeDefined();
    });
  });

  describe('validateContactForm', () => {
    it('should validate correct form data', () => {
      const data: ContactFormData = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        email: 'test@example.com',
        message: 'Это тестовое сообщение для проверки валидации',
      };

      const result = validateContactForm(data);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should validate form without email (optional)', () => {
      const data: ContactFormData = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        message: 'Это тестовое сообщение для проверки валидации',
      };

      const result = validateContactForm(data);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should reject form with invalid phone', () => {
      const data: ContactFormData = {
        name: 'Иван Иванов',
        phone: 'abc', // Невалидный телефон
        message: 'Это тестовое сообщение',
      };

      const result = validateContactForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.phone).toBeDefined();
    });

    it('should reject form with invalid email', () => {
      const data: ContactFormData = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        email: 'invalid-email',
        message: 'Это тестовое сообщение',
      };

      const result = validateContactForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeDefined();
    });

    it('should reject form with short message', () => {
      const data: ContactFormData = {
        name: 'Иван Иванов',
        phone: '+79991234567',
        email: 'test@example.com',
        message: 'Коротко',
      };

      const result = validateContactForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.message).toBeDefined();
    });
  });

  describe('validateReviewForm', () => {
    it('should validate correct form data', () => {
      const data: ReviewFormData = {
        name: 'Иван Иванов',
        rating: 5,
        text: 'Отличный сервис, все быстро и качественно!',
      };

      const result = validateReviewForm(data);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should reject form with invalid rating', () => {
      const data: ReviewFormData = {
        name: 'Иван Иванов',
        rating: 6,
        text: 'Отличный сервис',
      };

      const result = validateReviewForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.rating).toBeDefined();
    });

    it('should reject form with short text', () => {
      const data: ReviewFormData = {
        name: 'Иван Иванов',
        rating: 5,
        text: 'Коротко',
      };

      const result = validateReviewForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.text).toBeDefined();
    });
  });
});

