import React from 'react';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Card from '../ui/Card';
import SectionCTA from './SectionCTA';
const advantages = [
    {
        icon: '⏱️',
        title: 'Быстрая оценка',
        description: 'Оценка вашего автомобиля за 5 минут. Без долгих ожиданий и очередей.',
    },
    {
        icon: '💰',
        title: 'Честная цена',
        description: 'Мы предлагаем рыночную стоимость с учетом всех факторов. Без скрытых комиссий.',
    },
    {
        icon: '⚡',
        title: 'Моментальная оплата',
        description: 'Получите деньги сразу после осмотра. Наличными или на карту - как вам удобно.',
    },
    {
        icon: '🛡️',
        title: 'Безопасная сделка',
        description: 'Все документы оформляются официально. Полная юридическая защита.',
    },
    {
        icon: '✅',
        title: 'Любое состояние',
        description: 'Выкупаем автомобили в любом состоянии: от идеального до требующего ремонта.',
    },
    {
        icon: '📈',
        title: 'Выгодные условия',
        description: 'Лучшие цены на рынке. Сравните наши предложения с конкурентами.',
    },
];
const AdvantagesSection = () => {
    return (<section className="bg-neutral-50 dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent"/>
      
      <div className="max-w-[1200px] w-full mx-auto">
        <AnimatedSection animationType="fade-slide" delay={0}>
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent">
              Почему выбирают нас
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]">
              Мы работаем быстро, честно и профессионально. Ваше время и деньги важны для нас.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {advantages.map((advantage, index) => (<AnimatedCard key={index} delay={index * 100}>
              <Card hover3D className="p-6 h-full">
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <span className="text-2xl">{advantage.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {advantage.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-5">
                {advantage.description}
              </p>
              </Card>
            </AnimatedCard>))}
        </div>

        <div className="mt-12">
          <SectionCTA title="Готовы продать свой автомобиль?" description="Получите оценку за 5 минут и продайте авто сегодня"/>
        </div>
      </div>
    </section>);
};
export default React.memo(AdvantagesSection);
