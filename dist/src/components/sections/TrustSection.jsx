import React from 'react';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Card from '../ui/Card';
const trustItems = [
    {
        icon: '🏆',
        title: '10+ лет опыта',
        description: 'Более 10 лет успешной работы на рынке выкупа автомобилей',
        color: '#fbbf24',
        bgColor: '#fef3c7',
    },
    {
        icon: '🛡️',
        title: 'Лицензированная деятельность',
        description: 'Все документы и лицензии в порядке. Работаем официально',
        color: '#3b82f6',
        bgColor: '#dbeafe',
    },
    {
        icon: '📄',
        title: 'Юридическая защита',
        description: 'Полное юридическое сопровождение всех сделок',
        color: '#10b981',
        bgColor: '#d1fae5',
    },
    {
        icon: '✅',
        title: 'Гарантии качества',
        description: 'Гарантируем честную оценку и прозрачность сделки',
        color: '#0284c7',
        bgColor: '#e0f2fe',
    },
];
const partners = [
    { name: 'Банк-партнер 1', logo: '🏦' },
    { name: 'Страховая компания', logo: '🛡️' },
    { name: 'Автосалон', logo: '🚗' },
    { name: 'Оценщики', logo: '📊' },
];
const TrustSection = () => {
    return (<section className="bg-white dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent"/>
      
      <div className="max-w-[1200px] w-full mx-auto">
        <AnimatedSection animationType="fade-slide" delay={0}>
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent">
              Нам доверяют
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]">
              Мы работаем честно, профессионально и с полной юридической защитой
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustItems.map((item, index) => (<AnimatedCard key={index} delay={index * 100}>
              <Card hover3D className="flex flex-col items-center p-6 h-full">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 dark:opacity-80" style={{ backgroundColor: item.bgColor }}>
                <span className="text-4xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 text-center">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 text-center leading-5">
                {item.description}
              </p>
              </Card>
            </AnimatedCard>))}
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            Наши партнеры
          </h3>
          <div className="flex flex-row flex-wrap gap-8 justify-center">
            {partners.map((partner, index) => (<div key={index} className="flex flex-col items-center gap-2">
                <span className="text-5xl">{partner.logo}</span>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 text-center">
                  {partner.name}
                </p>
              </div>))}
          </div>
        </div>
      </div>
    </section>);
};
export default React.memo(TrustSection);
