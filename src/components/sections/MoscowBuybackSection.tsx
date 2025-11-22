import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import Button from '../ui/Button';

const advantages = [
  'Конкурентная оценка автомобиля с учетом всех факторов',
  'Возможность обмена (trade-in) на другой автомобиль',
  'Отсутствие скрытых комиссий и дополнительных платежей',
  'Работаем с физическими и юридическими лицами',
  'Широкий охват территории: Москва и вся Московская область',
  'Выезд специалиста на место для осмотра автомобиля',
  'Официальное оформление всех документов',
  'Быстрое решение вопроса с выкупом автомобиля',
];

const MoscowBuybackSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-neutral-900 py-16 px-4 transition-colors relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" />
      
      <div className="max-w-[1200px] w-full mx-auto">
        <AnimatedSection animationType="fade-slide" delay={0}>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 text-center heading-accent">
            Выкуп авто в Москве
          </h2>
        </AnimatedSection>

        <AnimatedSection animationType="stagger" delay={100}>
          <div className="flex flex-col gap-4 mb-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex flex-row items-start gap-3 stagger-item" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="w-6 h-6 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <p className="flex-1 text-base text-neutral-700 dark:text-neutral-200 leading-6">{advantage}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="flex justify-center">
          <Button
            onClick={() => navigate('/calculator')}
            size="lg"
            className="min-w-[250px]"
          >
            Заказать оценку автомобиля
          </Button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(MoscowBuybackSection);
