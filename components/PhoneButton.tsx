'use client';

import { FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { trackPhoneClick } from '@/lib/analytics/events';
import { getReducedMotionConfig } from '@/lib/utils/accessibility';

interface PhoneButtonProps {
  phone: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function PhoneButton({
  phone,
  variant = 'primary',
  className = '',
}: PhoneButtonProps) {
  const baseClasses =
    variant === 'primary'
      ? 'bg-primary-600 hover:bg-primary-700 text-white'
      : 'bg-white hover:bg-gray-100 text-primary-600 border-2 border-primary-600';

  const handleClick = () => {
    trackPhoneClick(phone);
  };

  return (
    <motion.a
      href={`tel:${phone}`}
      onClick={handleClick}
      className={`flex items-center justify-center space-x-2 px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl font-semibold transition-colors min-h-[44px] md:min-h-[56px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${baseClasses} ${className}`}
      whileHover={getReducedMotionConfig({ scale: 1.05 }, {})}
      whileTap={getReducedMotionConfig({ scale: 0.95 }, {})}
      aria-label={`Позвонить по телефону ${phone}`}
    >
      <FiPhone aria-hidden="true" />
      <span>{phone}</span>
    </motion.a>
  );
}
