'use client';

import { motion } from 'framer-motion';
import { FiPhone, FiSearch, FiFileText, FiDollarSign } from 'react-icons/fi';
import SectionCTA from './SectionCTA';

const steps = [
  {
    icon: FiPhone,
    title: '1. Звонок или заявка',
    description: 'Свяжитесь с нами по телефону или оставьте заявку на сайте. Мы ответим в течение 5 минут.',
  },
  {
    icon: FiSearch,
    title: '2. Оценка автомобиля',
    description: 'Наш специалист осмотрит ваш автомобиль и проведет профессиональную оценку.',
  },
  {
    icon: FiFileText,
    title: '3. Оформление документов',
    description: 'Быстро и официально оформляем все необходимые документы для сделки.',
  },
  {
    icon: FiDollarSign,
    title: '4. Получение денег',
    description: 'Получите оплату сразу после подписания документов. Наличными или на карту.',
  },
];

export default function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Как мы работаем
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Простой и понятный процесс. От звонка до получения денег - всего 4 шага.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-primary-200 -z-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary-600 rounded-full"></div>
                  </div>
                )}
                <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <Icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12">
          <SectionCTA
            title="Готовы начать?"
            description="Свяжитесь с нами и получите оценку за 5 минут"
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
}

