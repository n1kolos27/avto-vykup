import React from 'react';

interface FiCalculatorProps {
  className?: string;
  size?: number | string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

/**
 * Кастомная иконка калькулятора в стиле Feather Icons
 * Совместима с react-icons/fi по API
 */
function FiCalculator({
  className = '',
  size = 24,
  'aria-hidden': ariaHidden,
}: FiCalculatorProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="12" y2="14" />
      <circle cx="16" cy="14" r="1" />
      <circle cx="16" cy="18" r="1" />
      <circle cx="12" cy="18" r="1" />
    </svg>
  );
}

export default FiCalculator;
