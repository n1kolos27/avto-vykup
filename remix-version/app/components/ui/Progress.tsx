import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'error' | 'warning';
  className?: string;
  animated?: boolean;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  variant = 'primary',
  className = '',
  animated = true,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'h-1';
      case 'md':
        return 'h-2';
      case 'lg':
        return 'h-3';
      default:
        return 'h-2';
    }
  };

  const getVariantClasses = (): string => {
    switch (variant) {
      case 'success':
        return 'bg-success-600 dark:bg-success-500';
      case 'error':
        return 'bg-error-600 dark:bg-error-500';
      case 'warning':
        return 'bg-warning-600 dark:bg-warning-500';
      default:
        return 'bg-primary-600 dark:bg-primary-500';
    }
  };

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={`Прогресс: ${Math.round(percentage)}%`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Прогресс
          </span>
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={`w-full ${getSizeClasses()} bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden`}>
        <div
          className={`h-full ${getVariantClasses()} transition-all duration-500 ease-out rounded-full ${
            animated ? 'progress-bar-animated' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;

