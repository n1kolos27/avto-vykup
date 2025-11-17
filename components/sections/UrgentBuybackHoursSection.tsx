'use client';

import { motion } from 'framer-motion';
import { FiClock, FiCreditCard, FiDollarSign } from 'react-icons/fi';

const features = [
  {
    icon: FiCreditCard,
    title: 'Погашение автокредита',
    description: 'Помогаем решить вопрос с банком и погасить кредит',
  },
  {
    icon: FiDollarSign,
    title: 'Справедливая оценка',
    description: 'Честная рыночная цена без занижения стоимости',
  },
  {
    icon: FiClock,
    title: 'За наш счет',
    description: 'Эвакуатор, переоформление и все расходы берем на себя',
  },
];

export default function UrgentBuybackHoursSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Срочный выкуп авто в компании «Московский Авто Альянс» с 9:00 до 22:00 ежедневно
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300"
              >
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-primary-100 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
