import React from 'react';
import { useNavigate } from 'react-router';
import AnimatedSection from '~/components/AnimatedSection';
import AnimatedCard from '~/components/AnimatedCard';
import Card from '~/components/ui/Card';
import Button from '~/components/ui/Button';

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

const WhatCarsWeBuySection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-neutral-900 py-16 px-4 transition-colors relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" />
      
      <div className="max-w-[1200px] w-full mx-auto">
        <AnimatedSection animationType="fade-slide" delay={0}>
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 text-center heading-accent">
              Какие автомобили мы выкупаем?
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {categories.map((category, index) => (
            <AnimatedCard key={index} delay={index * 100}>
              <Card hover3D className="bg-primary-50 dark:bg-primary-900/30 p-6 h-full">
              <div className="flex flex-row gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-white">✓</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">{category.title}</h3>
                  <p className="text-base text-neutral-700 dark:text-neutral-200 leading-6">{category.description}</p>
                </div>
              </div>
              </Card>
            </AnimatedCard>
          ))}
        </div>

        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <Button
            onClick={() => navigate('/services')}
            variant="primary"
            className="min-w-[200px]"
          >
            Посмотреть все услуги
          </Button>
          <Button
            onClick={() => navigate('/car-brands')}
            variant="outline"
            className="min-w-[200px]"
          >
            Все марки автомобилей
          </Button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhatCarsWeBuySection);
