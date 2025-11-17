'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import { APP_CONFIG } from '@/lib/config';

export default function CTASection3() {
  const phone1 = APP_CONFIG.PHONE_1;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
            У вас остались вопросы?
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Задайте нам вопрос или посмотрите{' '}
            <Link href="/faq" className="text-primary-600 hover:text-primary-700 underline">
              Ответы на частые вопросы
            </Link>
          </p>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Свяжитесь с нами</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${phone1}`}
                    className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-colors min-h-[44px]"
                  >
                    <FiMessageCircle className="text-primary-600" size={20} />
                    <span>{phone1}</span>
                  </a>
                </div>
              </div>
              <div>
                <motion.a
                  href="#evaluation"
                  className="inline-flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[56px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>ОТПРАВИТЬ ВОПРОС</span>
                  <FiArrowRight />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
