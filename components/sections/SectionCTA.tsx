'use client';

import { motion } from 'framer-motion';
import PhoneButton from '../PhoneButton';
import Link from 'next/link';
import { FiArrowDown } from 'react-icons/fi';
import { trackCTAClick } from '@/lib/analytics/events';
import { APP_CONFIG } from '@/lib/config';

interface SectionCTAProps {
  title?: string;
  description?: string;
  primaryText?: string;
  secondaryText?: string;
  primaryAction?: 'form' | 'phone' | 'custom';
  customHref?: string;
  variant?: 'primary' | 'secondary';
}

export default function SectionCTA({
  title = 'Готовы продать свой автомобиль?',
  description = 'Получите бесплатную оценку прямо сейчас',
  primaryText = 'Оценить авто онлайн',
  secondaryText = 'Позвонить нам',
  primaryAction = 'form',
  customHref,
  variant = 'primary',
}: SectionCTAProps) {
  const phone1 = APP_CONFIG.PHONE_1;

  const bgClass = variant === 'primary'
    ? 'bg-primary-600 text-white'
    : 'bg-gray-50 text-gray-800';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${bgClass} rounded-xl p-8 md:p-12 text-center`}
    >
      <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${variant === 'primary' ? 'text-white' : 'text-gray-800'}`}>
        {title}
      </h3>
      <p className={`text-lg mb-8 ${variant === 'primary' ? 'text-primary-100' : 'text-gray-600'}`}>
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {primaryAction === 'form' ? (
          <Link
            href="#evaluation"
            onClick={() => trackCTAClick('form_link', 'section_cta')}
            className={`inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[52px] ${
              variant === 'primary'
                ? 'bg-white text-primary-600 hover:bg-gray-100'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <span>{primaryText}</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FiArrowDown />
            </motion.div>
          </Link>
        ) : primaryAction === 'phone' ? (
          <PhoneButton phone={phone1} variant={variant === 'primary' ? 'secondary' : 'primary'} />
        ) : (
          <Link
            href={customHref || '#'}
            className={`inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[52px] ${
              variant === 'primary'
                ? 'bg-white text-primary-600 hover:bg-gray-100'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <span>{primaryText}</span>
          </Link>
        )}
        <PhoneButton
          phone={phone1}
          variant={variant === 'primary' ? 'secondary' : 'primary'}
          className="min-h-[52px]"
        />
      </div>
    </motion.div>
  );
}
