'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiUsers, FiDollarSign, FiClock, FiCheckCircle } from 'react-icons/fi';

const stats = [
  {
    icon: FiUsers,
    value: 5000,
    suffix: '+',
    label: 'Довольных клиентов',
    description: 'Более 5000 автовладельцев уже продали свои автомобили через нас',
  },
  {
    icon: FiDollarSign,
    value: 2.5,
    suffix: ' млрд ₽',
    label: 'Выкуплено на сумму',
    description: 'Общая сумма выкупленных автомобилей за все время работы',
  },
  {
    icon: FiClock,
    value: 2,
    suffix: ' часа',
    label: 'Среднее время сделки',
    description: 'От звонка до получения денег в среднем занимает 2 часа',
  },
  {
    icon: FiCheckCircle,
    value: 98,
    suffix: '%',
    label: 'Удовлетворенность клиентов',
    description: '98% клиентов рекомендуют нас своим знакомым',
  },
];

function AnimatedCounter({ 
  value, 
  suffix, 
  duration = 2 
}: { 
  value: number; 
  suffix: string; 
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(value * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold mb-2">
      {count.toLocaleString('ru-RU')}{suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-primary-600 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Мы в цифрах
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Результаты нашей работы говорят сами за себя
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring' }}
                  className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Icon className="text-3xl" />
                </motion.div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <p className="text-primary-100 text-sm">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

