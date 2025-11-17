'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';

const categories = [
  {
    title: 'Легковые и коммерческие',
    description: 'Выкупаем легковые автомобили всех классов и коммерческий транспорт',
  },
  {
    title: 'Не зависимо от марки, модели, пробега и срока эксплуатации',
    description: 'Работаем с любыми автомобилями: от бюджетных до премиум класса, с любым пробегом и возрастом',
  },
];

export default function WhatCarsWeBuySection() {
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
            Какие автомобили мы выкупаем?
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-primary-600 rounded-full p-1.5">
                    <FiCheck className="text-white" size={18} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 shadow-lg transition-all duration-300 hover:scale-105"
            >
              Посмотреть все услуги
            </Link>
            <Link
              href="/car-brands"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 text-primary-600 bg-white hover:bg-primary-50 text-base font-medium rounded-md shadow-lg transition-all duration-300 hover:scale-105"
            >
              Марки автомобилей
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
