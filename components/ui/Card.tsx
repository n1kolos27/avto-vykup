'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Card компонент с поддержкой анимации при скролле
 * Использует Framer Motion для плавных анимаций
 * @param variant - Стиль карточки ('elevated' | 'outlined' | 'filled')
 * @param hover - Добавляет эффект поднятия при наведении
 * @param children - Содержимое карточки
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'filled';
  hover?: boolean;
  children: ReactNode;
  className?: string;
}

const variantStyles = {
  elevated: 'bg-white shadow-md hover:shadow-xl',
  outlined: 'bg-white border-2 border-gray-200 hover:border-primary-300',
  filled: 'bg-gray-50 border border-gray-200 hover:bg-gray-100',
};

export default function Card({
  variant = 'elevated',
  hover = true,
  children,
  className = '',
  onClick,
  role,
}: CardProps) {
  const baseStyles = 'rounded-xl p-6 transition-all duration-300 ease-in-out-cubic';
  const hoverStyles = hover ? 'hover-lift cursor-pointer' : '';
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`;

  return (
    <motion.div
      className={combinedClassName}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={onClick}
      role={role}
    >
      {children}
    </motion.div>
  );
}
