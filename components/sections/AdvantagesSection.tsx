'use client';

import { motion } from 'framer-motion';
import { FiClock, FiDollarSign, FiShield, FiZap, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import SectionCTA from './SectionCTA';

const advantages = [
  {
    icon: FiClock,
    title: 'Быстрая оценка',
    description: 'Оценка вашего автомобиля за 5 минут. Без долгих ожиданий и очередей.',
  },
  {
    icon: FiDollarSign,
    title: 'Честная цена',
    description: 'Мы предлагаем рыночную стоимость с учетом всех факторов. Без скрытых комиссий.',
  },
  {
    icon: FiZap,
    title: 'Моментальная оплата',
    description: 'Получите деньги сразу после осмотра. Наличными или на карту - как вам удобно.',
  },
  {
    icon: FiShield,
    title: 'Безопасная сделка',
    description: 'Все документы оформляются официально. Полная юридическая защита.',
  },
  {
    icon: FiCheckCircle,
    title: 'Любое состояние',
    description: 'Выкупаем автомобили в любом состоянии: от идеального до требующего ремонта.',
  },
  {
    icon: FiTrendingUp,
    title: 'Выгодные условия',
    description: 'Лучшие цены на рынке. Сравните наши предложения с конкурентами.',
  },
];

export default function AdvantagesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы работаем быстро, честно и профессионально. Ваше время и деньги
            важны для нас.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                >
                  <Icon className="text-primary-600 text-2xl" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12">
          <SectionCTA
            title="Убедились в наших преимуществах?"
            description="Получите оценку вашего автомобиля прямо сейчас"
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
}

