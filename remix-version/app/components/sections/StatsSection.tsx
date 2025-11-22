import React, { useState, useEffect, useRef } from 'react';
import AnimatedCard from '../AnimatedCard';

const stats = [
  {
    icon: '👥',
    value: 5000,
    suffix: '+',
    label: 'Довольных клиентов',
    description: 'Более 5000 автовладельцев уже продали свои автомобили через нас',
  },
  {
    icon: '💰',
    value: 2.5,
    suffix: ' млрд ₽',
    label: 'Выкуплено на сумму',
    description: 'Общая сумма выкупленных автомобилей за все время работы',
  },
  {
    icon: '⏱️',
    value: 2,
    suffix: ' часа',
    label: 'Среднее время сделки',
    description: 'От звонка до получения денег в среднем занимает 2 часа',
  },
  {
    icon: '✅',
    value: 98,
    suffix: '%',
    label: 'Удовлетворенность клиентов',
    description: '98% клиентов рекомендуют нас своим знакомым',
  },
];

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

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
  }, [isVisible, value, duration]);

  return (
    <div ref={ref}>
      <span className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 block">
        {count.toLocaleString('ru-RU')}{suffix}
      </span>
    </div>
  );
};

const StatsSection: React.FC = () => {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" />
      
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <AnimatedCard key={index} delay={index * 100}>
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl flex flex-col items-center shadow-md dark:shadow-dark-md md:p-8 transition-colors">
            <span className="text-5xl mb-4">{stat.icon}</span>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2 text-center">
              {stat.label}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 text-center leading-5">
              {stat.description}
            </p>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
};

export default React.memo(StatsSection);
