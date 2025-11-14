'use client';

import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';

const comparison = [
  {
    feature: 'Скорость сделки',
    us: '2 часа',
    competitors: '1-2 недели',
  },
  {
    feature: 'Оценка стоимости',
    us: 'Честная рыночная цена',
    competitors: 'Заниженная на 15-30%',
  },
  {
    feature: 'Оплата',
    us: 'Сразу после осмотра',
    competitors: 'Через несколько дней',
  },
  {
    feature: 'Документы',
    us: 'Оформляем сами',
    competitors: 'Нужно делать самому',
  },
  {
    feature: 'Состояние авто',
    us: 'Принимаем любое',
    competitors: 'Только в хорошем',
  },
  {
    feature: 'Дополнительные услуги',
    us: 'Эвакуатор, помощь с документами',
    competitors: 'За дополнительную плату',
  },
];

export default function ComparisonSection() {
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
            Мы vs Конкуренты
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Сравните наши преимущества с другими компаниями по выкупу авто
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-3 gap-4 bg-primary-600 text-white p-4 font-semibold">
              <div>Критерий</div>
              <div className="text-center">Выкуп авто</div>
              <div className="text-center">Конкуренты</div>
            </div>
            {comparison.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`grid grid-cols-3 gap-4 p-4 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div className="font-medium text-gray-800">{item.feature}</div>
                <div className="text-center text-primary-600 font-semibold flex items-center justify-center space-x-1">
                  <FiCheck className="text-green-600" />
                  <span>{item.us}</span>
                </div>
                <div className="text-center text-gray-600 flex items-center justify-center space-x-1">
                  <FiX className="text-red-500" />
                  <span>{item.competitors}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

