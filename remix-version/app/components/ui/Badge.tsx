import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = true,
  className = '',
}) => {
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'success':
        return 'bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-200 border-success-300 dark:border-success-700';
      case 'error':
        return 'bg-error-100 dark:bg-error-900/30 text-error-800 dark:text-error-200 border-error-300 dark:border-error-700';
      case 'warning':
        return 'bg-warning-100 dark:bg-warning-900/30 text-warning-800 dark:text-warning-200 border-warning-300 dark:border-warning-700';
      case 'info':
        return 'bg-info-100 dark:bg-info-900/30 text-info-800 dark:text-info-200 border-info-300 dark:border-info-700';
      case 'neutral':
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700';
      default:
        return 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 border-primary-300 dark:border-primary-700';
    }
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'md':
        return 'px-2.5 py-1 text-sm';
      case 'lg':
        return 'px-3 py-1.5 text-base';
      default:
        return 'px-2.5 py-1 text-sm';
    }
  };

  const roundedClass = rounded ? 'radius-badge' : 'rounded';

  return (
    <span
      className={`inline-flex items-center font-medium border ${getVariantClasses()} ${getSizeClasses()} ${roundedClass} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

