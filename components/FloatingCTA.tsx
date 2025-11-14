'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiX, FiArrowUp } from 'react-icons/fi';
import PhoneButton from './PhoneButton';
import { APP_CONFIG } from '@/lib/config';
import { getReducedMotionConfig } from '@/lib/utils/accessibility';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const phone1 = APP_CONFIG.PHONE_1;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show CTA after scrolling 300px
      setIsVisible(scrollY > 300);
      // Show scroll to top after scrolling 500px
      setShowScrollTop(scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToForm = () => {
    const form = document.getElementById('evaluation');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Floating CTA Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={getReducedMotionConfig({ opacity: 0, y: 100 }, { opacity: 0 })}
            animate={getReducedMotionConfig({ opacity: 1, y: 0 }, { opacity: 1 })}
            exit={getReducedMotionConfig({ opacity: 0, y: 100 }, { opacity: 0 })}
            transition={getReducedMotionConfig({ duration: 0.3 }, { duration: 0 })}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden"
          >
            <div className="bg-white rounded-full shadow-2xl px-4 py-3 flex items-center space-x-3 border-2 border-primary-600">
              <a
                href={`tel:${phone1}`}
                className="flex items-center space-x-2 text-primary-600 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg px-2 py-1 min-h-[44px]"
                aria-label={`Позвонить по телефону ${phone1}`}
              >
                <FiPhone size={20} aria-hidden="true" />
                <span>{phone1}</span>
              </a>
              <button
                onClick={scrollToForm}
                className="bg-primary-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-primary-700 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Перейти к форме оценки автомобиля"
              >
                Оценить
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Floating CTA */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={getReducedMotionConfig({ opacity: 0, x: 100 }, { opacity: 0 })}
            animate={getReducedMotionConfig({ opacity: 1, x: 0 }, { opacity: 1 })}
            exit={getReducedMotionConfig({ opacity: 0, x: 100 }, { opacity: 0 })}
            transition={getReducedMotionConfig({ duration: 0.3 }, { duration: 0 })}
            className="hidden md:block fixed right-6 bottom-6 z-50"
            role="dialog"
            aria-modal="false"
            aria-labelledby="cta-title"
            aria-describedby="cta-description"
          >
            <div className="bg-white rounded-xl shadow-2xl p-6 border-2 border-primary-600 max-w-xs">
              <div className="flex items-start justify-between mb-4">
                <h3 id="cta-title" className="font-bold text-gray-800 text-lg">Нужна помощь?</h3>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg p-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Закрыть"
                >
                  <FiX size={20} aria-hidden="true" />
                </button>
              </div>
              <p id="cta-description" className="text-gray-600 text-sm mb-4">
                Получите бесплатную оценку вашего автомобиля прямо сейчас
              </p>
              <div className="space-y-3">
                <button
                  onClick={scrollToForm}
                  className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 min-h-[44px]"
                  aria-label="Перейти к форме оценки автомобиля"
                >
                  Оценить авто онлайн
                </button>
                <PhoneButton phone={phone1} className="w-full justify-center" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={getReducedMotionConfig({ opacity: 0, scale: 0 }, { opacity: 0 })}
            animate={getReducedMotionConfig({ opacity: 1, scale: 1 }, { opacity: 1 })}
            exit={getReducedMotionConfig({ opacity: 0, scale: 0 }, { opacity: 0 })}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-24 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-40 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Прокрутить страницу наверх"
          >
            <FiArrowUp size={20} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
