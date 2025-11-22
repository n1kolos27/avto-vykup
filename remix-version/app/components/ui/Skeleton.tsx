import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'image' | 'card' | 'button' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
  className?: string;
  lines?: number;
  rounded?: boolean;
  animated?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  className = '',
  lines = 1,
  rounded = true,
  animated = true,
}) => {
  const baseClasses = `skeleton ${animated ? 'skeleton-animated' : ''} skeleton-fade-in ${
    rounded ? 'rounded-lg' : ''
  }`;

  const getVariantClasses = (): string => {
    switch (variant) {
      case 'text':
        return 'h-4';
      case 'image':
        return 'aspect-video';
      case 'card':
        return 'h-48';
      case 'button':
        return 'h-11';
      case 'circle':
        return 'rounded-full aspect-square';
      case 'rect':
        return '';
      default:
        return '';
    }
  };

  const style: React.CSSProperties = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`flex flex-col gap-2 ${className}`} aria-label="Загрузка контента">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()} ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
            style={index === lines - 1 ? style : undefined}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={style}
      aria-label="Загрузка контента"
      role="status"
      aria-live="polite"
    />
  );
};

export default Skeleton;

