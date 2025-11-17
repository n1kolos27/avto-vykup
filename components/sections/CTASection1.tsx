'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function CTASection1() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Остались вопросы или хотите узнать цену?
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-8">
            Заполните форму и получите оценку вашего автомобиля за 5 минут
          </p>
          <motion.a
            href="#evaluation"
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[56px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>УЗНАТЬ ЦЕНУ</span>
            <FiArrowRight />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
