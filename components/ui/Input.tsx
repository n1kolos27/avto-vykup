'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

/**
 * Input компонент с поддержкой ошибок и успеха
 * Соответствует стандартам WCAG 2.1 AA
 * Включает aria-invalid, aria-describedby для доступности
 * @param label - Метка для поля ввода
 * @param error - Текст ошибки валидации
 * @param success - Показывает успешное состояние
 * @param helperText - Вспомогательный текст под полем
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, helperText, leftIcon, rightIcon, className = '', ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-3 rounded-lg border transition-all duration-300 ease-in-out-cubic focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';

    let borderStyles = 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';
    if (error) {
      borderStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';
    } else if (success) {
      borderStyles = 'border-green-500 focus:border-green-500 focus:ring-green-500';
    }

    const paddingLeft = leftIcon ? 'pl-10' : '';
    const paddingRight = rightIcon || error || success ? 'pr-10' : '';

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1" aria-label="обязательное поле">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`${baseStyles} ${borderStyles} ${paddingLeft} ${paddingRight} ${className}`}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
            {...props}
          />
          {rightIcon && !error && !success && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
          {error && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
              <FiAlertCircle size={20} />
            </div>
          )}
          {success && !error && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
              <FiCheckCircle size={20} />
            </div>
          )}
        </div>
        {error && (
          <p id={props.id ? `${props.id}-error` : undefined} className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
            <FiAlertCircle size={14} aria-hidden="true" />
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={props.id ? `${props.id}-helper` : undefined} className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
