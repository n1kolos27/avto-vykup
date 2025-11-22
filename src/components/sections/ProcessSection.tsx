import React from 'react';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import SectionCTA from './SectionCTA';

const steps = [
  {
    icon: '📞',
    title: '1. Звонок или заявка',
    description: 'Свяжитесь с нами по телефону или оставьте заявку на сайте. Мы ответим в течение 5 минут.',
  },
  {
    icon: '🔍',
    title: '2. Оценка автомобиля',
    description: 'Наш специалист осмотрит ваш автомобиль и проведет профессиональную оценку.',
  },
  {
    icon: '📄',
    title: '3. Оформление документов',
    description: 'Быстро и официально оформляем все необходимые документы для сделки.',
  },
  {
    icon: '💰',
    title: '4. Получение денег',
    description: 'Получите оплату сразу после подписания документов. Наличными или на карту.',
  },
];

const ProcessSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" />
      
      <div className="max-w-[1200px] w-full mx-auto">
        <AnimatedSection animationType="fade-slide" delay={0}>
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent">
              Как мы работаем
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]">
              Простой и понятный процесс. От звонка до получения денег - всего 4 шага.
            </p>
          </div>
        </AnimatedSection>

        <div className="flex flex-row flex-wrap gap-6 mb-12 md:flex-nowrap md:justify-between">
          {steps.map((step, index) => (
            <AnimatedCard key={index} delay={index * 100}>
              <div className="flex-1 min-w-[200px] flex flex-col items-center relative">
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute z-0 bg-primary-200 dark:bg-primary-800"
                  style={{
                    top: 32,
                    left: '100%',
                    width: '50%',
                    height: 2,
                  }}
                />
              )}
              <div className="w-16 h-16 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center mb-4 z-10">
                <span className="text-3xl">{step.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 text-center leading-5">
                {step.description}
              </p>
              </div>
            </AnimatedCard>
          ))}
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
};

export default React.memo(ProcessSection);
