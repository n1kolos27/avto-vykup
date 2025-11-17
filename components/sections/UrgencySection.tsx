'use client';

import { APP_CONFIG } from '@/lib/config';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiAlertCircle, FiClock, FiUsers } from 'react-icons/fi';
import PhoneButton from '../PhoneButton';

export default function UrgencySection() {
  const phone1 = APP_CONFIG.PHONE_1;

  // Mock data - in real app, this would come from API
  const [slotsLeft] = useState(3);
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-white/20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-red-500/20 px-4 py-2 rounded-full mb-4">
                <FiAlertCircle className="text-red-300" size={20} />
                <span className="text-sm font-semibold">Ограниченное предложение</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Специальное предложение сегодня!
              </h2>
              <p className="text-lg text-primary-100 max-w-2xl mx-auto">
                Получите бесплатную оценку и дополнительную скидку при сделке сегодня
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Slots Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20"
              >
                <FiUsers className="text-3xl mx-auto mb-3 text-primary-200" />
                <div className="text-4xl font-bold mb-2">{slotsLeft}</div>
                <p className="text-sm text-primary-100">Свободных слотов на сегодня</p>
              </motion.div>

              {/* Timer */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20"
              >
                <FiClock className="text-3xl mx-auto mb-3 text-primary-200" />
                <div className="text-2xl font-bold mb-2">
                  {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <p className="text-sm text-primary-100">До конца акции</p>
              </motion.div>

              {/* Today's Deals */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20"
              >
                <FiAlertCircle className="text-3xl mx-auto mb-3 text-primary-200" />
                <div className="text-4xl font-bold mb-2">47</div>
                <p className="text-sm text-primary-100">Оценок сегодня</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="#evaluation"
                className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[52px]"
              >
                Получить оценку сейчас
              </Link>
              <PhoneButton phone={phone1} variant="secondary" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center text-sm text-primary-100 mt-6"
            >
              * Предложение действует только сегодня. Количество мест ограничено.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
