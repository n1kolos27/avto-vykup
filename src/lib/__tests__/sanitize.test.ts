import { describe, it, expect } from 'vitest';
import { sanitizeInput } from '../sanitize';

describe('Sanitize', () => {
  describe('sanitizeInput', () => {
    it('should sanitize string with XSS attempts', () => {
      const malicious = '<script>alert("xss")</script>';
      const sanitized = sanitizeInput(malicious);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('</script>');
    });

    it('should remove javascript: protocol', () => {
      const malicious = 'javascript:alert("xss")';
      const sanitized = sanitizeInput(malicious);
      expect(sanitized).not.toContain('javascript:');
    });

    it('should remove event handlers', () => {
      const malicious = 'onclick=alert("xss")';
      const sanitized = sanitizeInput(malicious);
      expect(sanitized).not.toContain('onclick=');
    });

    it('should trim whitespace', () => {
      const input = '  test  ';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe('test');
    });

    it('should sanitize array of strings', () => {
      const input = ['<script>alert("xss")</script>', 'normal text'];
      const sanitized = sanitizeInput(input);
      expect(sanitized[0]).not.toContain('<script>');
      expect(sanitized[1]).toBe('normal text');
    });

    it('should sanitize nested object', () => {
      const input = {
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
        nested: {
          value: 'javascript:alert("xss")',
        },
      };
      const sanitized = sanitizeInput(input);
      expect(sanitized.name).not.toContain('<script>');
      expect(sanitized.email).toBe('test@example.com');
      expect(sanitized.nested.value).not.toContain('javascript:');
    });

    it('should preserve numbers', () => {
      const input = 123;
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe(123);
    });

    it('should preserve booleans', () => {
      const input = true;
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe(true);
    });

    it('should preserve null and undefined', () => {
      expect(sanitizeInput(null)).toBe(null);
      expect(sanitizeInput(undefined)).toBe(undefined);
    });
  });
});

