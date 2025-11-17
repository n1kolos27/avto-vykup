'use client';

import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import Link from 'next/link';

const advantages = [
  'Конкурентная оценка автомобиля с учетом всех факторов',
  'Возможность обмена (trade-in) на другой автомобиль',
  'Отсутствие скрытых комиссий и дополнительных платежей',
  'Работаем с физическими и юридическими лицами',
  'Широкий охват территории: Москва и вся Московская область',
  'Выезд специалиста на место для осмотра автомобиля',
  'Официальное оформление всех документов',
  'Быстрое решение вопроса с выкупом автомобиля',
];

export default function MoscowBuybackSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">
            Выкуп авто в Москве
          </h2>

          <div className="space-y-4 mb-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-primary-600 rounded-full p-1">
                    <FiCheck className="text-white" size={16} />
                  </div>
                </div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {advantage}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="#evaluation"
              className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 min-h-[44px] flex items-center justify-center"
            >
              Заказать оценку автомобиля
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
