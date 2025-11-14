'use client';

import { getReducedMotionConfig } from '@/lib/utils/accessibility';
import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { FiLoader } from 'react-icons/fi';

/**
 * Button компонент с поддержкой анимации и загрузки
 * Соответствует стандартам WCAG 2.1 AA
 * @param variant - Стиль кнопки ('primary' | 'secondary' | 'outline' | 'ghost')
 * @param size - Размер кнопки ('sm' | 'md' | 'lg')
 * @param isLoading - Показывает индикатор загрузки и блокирует кнопку
 * @param children - Содержимое кнопки
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
}

const variantStyles = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg active:shadow-md',
  secondary: 'bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600 shadow-sm hover:shadow-md active:shadow-sm',
  outline: 'bg-transparent hover:bg-primary-50 text-primary-600 border-2 border-primary-600',
  ghost: 'bg-transparent hover:bg-primary-50 text-primary-600',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm min-h-[36px]',
  md: 'px-6 py-3 text-base min-h-[44px]',
  lg: 'px-8 py-4 text-lg min-h-[52px]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ease-in-out-cubic focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none';

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <motion.button
      className={combinedClassName}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      whileHover={!disabled && !isLoading ? getReducedMotionConfig({ scale: 1.02, y: -1 }, {}) : {}}
      whileTap={!disabled && !isLoading ? getReducedMotionConfig({ scale: 0.98 }, {}) : {}}
      transition={getReducedMotionConfig({ duration: 0.2, ease: 'easeOut' }, {})}
      onClick={onClick}
      type={type}
    >
      {isLoading ? (
        <>
          <FiLoader className="animate-spin mr-2" size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} aria-hidden="true" />
          <span>Загрузка...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
