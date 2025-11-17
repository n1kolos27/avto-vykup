'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PhoneButton from '../PhoneButton';
import HeroCalculator from '../HeroCalculator';
import CarBrandsLogos from '../CarBrandsLogos';
import { FiArrowDown, FiCheck, FiAward, FiShield, FiTrendingUp } from 'react-icons/fi';
import { APP_CONFIG } from '@/lib/config';
import { useABTest, trackABTestConversion } from '@/lib/ab-testing';

/**
 * HeroSection - главная секция с предложением услуги
 * Содержит основное предложение, CTA и информацию о компании
 */
function HeroSection() {
  const phone1 = APP_CONFIG.PHONE_1;

  // A/B тест для CTA кнопки - используем useState для предотвращения hydration error
  const [ctaVariant, setCtaVariant] = useState<'A' | 'B'>('A');
  const abTestVariant = useABTest('hero_cta', ['A', 'B']);

  // Применяем A/B тест только на клиенте после hydration
  useEffect(() => {
    setCtaVariant(abTestVariant);
  }, [abTestVariant]);

  const features = useMemo(() => [
    'Оценка за 5 минут',
    'Честная цена',
    'Оплата сразу',
  ], []);

  const trustBadges = useMemo(() => [
    { icon: FiAward, text: '5000+ клиентов' },
    { icon: FiShield, text: '10+ лет опыта' },
    { icon: FiTrendingUp, text: '98% довольных' },
  ], []);

  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700/50 via-primary-600/30 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse [animation-delay:1s]"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-300/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse [animation-delay:0.5s]"></div>

      {/* Optional background image placeholder - can be replaced with actual image */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgMTBsMjAgNDBMMTAwIDUwTDUwIDkwTDAgNTBsMzAtNDB6IiBmaWxsPSIjMDI4NGM3IiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-4"
          >
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm md:text-base font-semibold border border-white/30">
              Выкуп авто в Москве и МО
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 md:mb-6 leading-tight tracking-tight"
          >
            Выкуп Авто Москва — ТОП-1 ⚡ Срочный Выкуп за 2 часа
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-lg md:text-xl lg:text-2xl mb-3 md:mb-4 text-gray-100 leading-relaxed max-w-2xl"
          >
            Быстрая оценка, честная цена, моментальная оплата. Продайте свой
            автомобиль за один день!
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            className="text-base md:text-lg mb-6 md:mb-8 text-primary-100 font-medium"
          >
            ⚡ Оценка за 5 минут - бесплатно | 💰 Честная рыночная цена | ✅ Оплата сразу
          </motion.p>

          {/* Hero Calculator */}
          <HeroCalculator />

          {/* Car Brands Logos */}
          <CarBrandsLogos />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8"
          >
            <motion.a
              href="#evaluation"
              onClick={() => trackABTestConversion('hero_cta', ctaVariant, 'click', 1)}
              className={`flex items-center justify-center space-x-2 px-8 py-4 md:px-10 md:py-5 rounded-xl font-bold text-lg md:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 min-h-[56px] md:min-h-[64px] group relative overflow-hidden ${
                ctaVariant === 'B'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
                  : 'bg-white text-primary-600'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Оценить автомобиль онлайн - перейти к форме"
            >
              <span className="relative z-10">
                {ctaVariant === 'B' ? 'Получить оценку за 5 минут' : 'Оценить авто онлайн — бесплатно'}
              </span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="group-hover:translate-y-1 transition-transform relative z-10"
              >
                <FiArrowDown />
              </motion.div>
              {ctaVariant === 'A' && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-50 to-primary-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              )}
            </motion.a>
            <PhoneButton phone={phone1} variant="secondary" />
          </motion.div>

          {/* Social Proof - Recent Activity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex items-center space-x-4 text-sm md:text-base text-primary-100">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs font-semibold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="font-medium">47+ оценок сегодня</span>
              </div>
              <span className="text-primary-200">•</span>
              <span className="font-medium">Среднее время ответа: 2 минуты</span>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8"
          >
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.45 + index * 0.1 }}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2.5 rounded-lg border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <Icon className="text-primary-200" size={18} />
                  <span className="text-xs md:text-sm font-medium">{badge.text}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-4 md:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.55 + index * 0.1 }}
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="bg-primary-500 rounded-full p-1">
                  <FiCheck className="text-white" size={16} />
                </div>
                <span className="text-sm md:text-base font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(HeroSection);
