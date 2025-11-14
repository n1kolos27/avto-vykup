'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiStar, FiChevronRight } from 'react-icons/fi';
import SectionCTA from './SectionCTA';

const reviews = [
  {
    id: 1,
    name: 'Александр',
    rating: 5,
    text: 'Продал свой автомобиль за один день. Оценка была честной, деньги получил сразу. Очень доволен!',
    date: '15.03.2024',
  },
  {
    id: 2,
    name: 'Мария',
    rating: 5,
    text: 'Быстро, профессионально, без лишних вопросов. Рекомендую всем, кто хочет быстро продать авто.',
    date: '10.03.2024',
  },
  {
    id: 3,
    name: 'Дмитрий',
    rating: 5,
    text: 'Отличный сервис! Цена была выше, чем предлагали в других местах. Спасибо за честность.',
    date: '05.03.2024',
  },
];

export default function ReviewsPreview() {
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
            Отзывы наших клиентов
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Более 1000 довольных клиентов уже продали свои автомобили через нас
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">{review.text}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">{review.name}</span>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/reviews"
            className="inline-flex items-center space-x-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            <span>Посмотреть все отзывы</span>
            <FiChevronRight />
          </Link>
        </motion.div>

        <div className="mt-12">
          <SectionCTA
            title="Присоединяйтесь к довольным клиентам"
            description="Получите честную оценку и продайте свой автомобиль быстро"
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
}

