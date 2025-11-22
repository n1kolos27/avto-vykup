import React from 'react';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Card from '../ui/Card';

const guarantees = [
  {
    icon: '🛡️',
    title: 'Юридическая безопасность',
    description:
      'Все сделки оформляются официально с соблюдением всех требований законодательства. Вы получаете полную юридическую защиту.',
  },
  {
    icon: '📄',
    title: 'Прозрачные документы',
    description:
      'Все документы оформляются в вашем присутствии. Вы видите каждый шаг процесса и можете задать любые вопросы.',
  },
  {
    icon: '🔒',
    title: 'Защита от мошенников',
    description:
      'Мы работаем официально, имеем все необходимые лицензии. Ваши данные и деньги в полной безопасности.',
  },
  {
    icon: '🏆',
    title: 'Гарантия честной цены',
    description:
      'Мы предлагаем рыночную стоимость автомобиля. Если вы найдете более выгодное предложение, мы готовы обсудить цену.',
  },
];

const GuaranteesSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" />
      
      <div className="max-w-[1200px] w-full mx-auto">
        <AnimatedSection animationType="fade-slide" delay={0}>
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent">
              Наши гарантии
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]">
              Мы гарантируем безопасность, честность и прозрачность каждой сделки
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((guarantee, index) => (
            <AnimatedCard key={index} delay={index * 100}>
              <Card hover3D className="flex flex-col items-center p-6 h-full">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <span className="text-4xl">{guarantee.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-center">
                {guarantee.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 text-center leading-5">
                {guarantee.description}
              </p>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(GuaranteesSection);
