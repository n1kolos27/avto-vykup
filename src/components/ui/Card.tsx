import React, { ReactNode } from 'react';

interface CardProps {
  variant?: 'elevated' | 'outlined' | 'filled' | 'gradient-border';
  hover?: boolean;
  hover3D?: boolean;
  children: ReactNode;
  onClick?: () => void;
  testID?: string;
  className?: string;
  staggerDelay?: number;
}

const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  hover = true,
  hover3D = false,
  children,
  onClick,
  testID,
  className = '',
  staggerDelay = 0,
}) => {
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'elevated':
        return 'bg-white dark:bg-neutral-800 shadow-md dark:shadow-dark-md';
      case 'outlined':
        return 'bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700';
      case 'filled':
        return 'bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700';
      case 'gradient-border':
        return 'gradient-border bg-white dark:bg-neutral-800';
      default:
        return 'bg-white dark:bg-neutral-800';
    }
  };

  const baseClasses = `radius-card p-6 transition-all duration-300 ease-out contain-layout ${
    hover3D ? 'hover-3d-card' : hover ? 'hover-lift' : ''
  }`;
  const hoverClasses = hover && onClick ? 'cursor-pointer animate-optimized' : '';
  const staggerClasses = staggerDelay > 0 ? 'stagger-item' : '';
  const classes = `${baseClasses} ${getVariantClasses()} ${hoverClasses} ${staggerClasses} ${className}`;
  
  const staggerStyle: React.CSSProperties = staggerDelay > 0 ? {
    animationDelay: `${staggerDelay * 100}ms`,
  } : {};

  const Component = onClick ? 'button' : 'div';

  return React.createElement(
    Component,
    {
      className: classes,
      style: staggerStyle,
      onClick: onClick,
      'data-testid': testID,
      role: onClick ? 'button' : undefined,
      tabIndex: onClick ? 0 : undefined,
    },
    children
  );
};

export default Card;
