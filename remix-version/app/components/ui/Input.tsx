import React, { forwardRef, useState, useEffect } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  floatingLabel?: boolean;
  onChangeText?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, success, helperText, leftIcon, rightIcon, className = '', required, multiline, rows = 4, floatingLabel = false, onChangeText, onChange, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
      setHasValue(!!value || (typeof value === 'string' && value.length > 0));
    }, [value]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setHasValue(!!newValue || newValue.length > 0);
      if (onChangeText) {
        onChangeText(newValue);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true);
      if (props.onFocus) {
        props.onFocus(e as any);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);
      if (props.onBlur) {
        props.onBlur(e as any);
      }
    };

    const isFloatingActive = floatingLabel && (isFocused || hasValue);
    const getBorderColorClasses = (): string => {
      if (error) return 'border-error-500 dark:border-error-400 focus:border-error-600 dark:focus:border-error-500 focus:ring-error-200 dark:focus:ring-error-900/30';
      if (success) return 'border-success-500 dark:border-success-400 focus:border-success-600 dark:focus:border-success-500 focus:ring-success-200 dark:focus:ring-success-900/30';
      return 'border-neutral-300 dark:border-neutral-700 focus:border-primary-600 dark:focus:border-primary-400 focus:ring-primary-200 dark:focus:ring-primary-900/30';
    };

    const baseInputClasses = `w-full ${floatingLabel ? 'pt-6 pb-2' : 'py-3'} px-4 radius-input border bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-base transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) focus:outline-none focus:ring-2 focus:ring-offset-0 ${floatingLabel ? '' : 'focus:scale-[1.01]'} contain-layout`;
    const inputClasses = `${baseInputClasses} ${getBorderColorClasses()} ${leftIcon ? 'pl-10' : ''} ${(rightIcon || error || success) ? 'pr-10' : ''} ${className}`;
    const textareaClasses = `${baseInputClasses} ${getBorderColorClasses()} ${className} ${multiline ? 'resize-y' : ''}`;

    return (
      <div className="w-full mb-4">
        <div className="relative w-full">
          {floatingLabel && label && (
            <label
              className={`absolute left-4 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) pointer-events-none ${
                isFloatingActive
                  ? 'top-2 text-xs text-primary-600 dark:text-primary-400 font-medium scale-100'
                  : 'top-1/2 -translate-y-1/2 text-base text-neutral-500 dark:text-neutral-400 scale-100'
              } ${leftIcon ? 'left-10' : ''} ${error ? 'text-error-500 dark:text-error-400' : ''} ${success ? 'text-success-500 dark:text-success-400' : ''}`}
            >
              {label}
              {required && <span className="text-error-500 dark:text-error-400"> *</span>}
            </label>
          )}
          {!floatingLabel && label && (
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {label}
              {required && <span className="text-error-500 dark:text-error-400"> *</span>}
            </label>
          )}
          {leftIcon && !multiline && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              {leftIcon}
            </div>
          )}
          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={textareaClasses}
              aria-label={label}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error || helperText ? `${props.id || 'input'}-helper` : undefined}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              rows={rows}
              value={value}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <>
              <input
                ref={ref as React.Ref<HTMLInputElement>}
                className={`${inputClasses} min-h-[48px]`}
                aria-label={label}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error || helperText ? `${props.id || 'input'}-helper` : undefined}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
              />
              {rightIcon && !error && !success && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  {rightIcon}
                </div>
              )}
            </>
          )}
          {error && !multiline && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <span className="text-xl text-error-500" aria-label="Ошибка">⚠️</span>
            </div>
          )}
          {success && !error && !multiline && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <span className="text-xl text-success-500 success-check" aria-label="Успешно">✓</span>
            </div>
          )}
        </div>
        {error && (
          <p
            id={`${props.id || 'input'}-helper`}
            className="text-xs text-error-500 dark:text-error-400 mt-1 animate-slide-up"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${props.id || 'input'}-helper`} className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
