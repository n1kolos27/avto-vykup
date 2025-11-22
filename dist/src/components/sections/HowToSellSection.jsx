import React from 'react';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Card from '../ui/Card';
const steps = [
    {
        number: 1,
        title: 'Онлайн-оценка автомобиля',
        description: 'Заполните форму на сайте или позвоните нам. Наш специалист проведет предварительную оценку вашего автомобиля.',
        benefits: [
            'Бесплатная оценка за 5 минут',
            'Учитываем все факторы: марку, модель, год, пробег, состояние',
            'Честная рыночная цена без занижения',
        ],
    },
    {
        number: 2,
        title: 'Бесплатный выезд специалиста',
        description: 'Наш эксперт приедет к вам в удобное время для детального осмотра автомобиля.',
        benefits: [
            'Выезд в день обращения',
            'Профессиональная диагностика',
            'Уточнение окончательной стоимости',
        ],
    },
    {
        number: 3,
        title: 'Подготовка документов',
        description: 'Мы помогаем собрать все необходимые документы и проверяем автомобиль на ограничения.',
        benefits: [
            'Помощь в подготовке документов',
            'Проверка на ограничения и залог',
            'Официальное оформление сделки',
        ],
    },
    {
        number: 4,
        title: '100% оплата в день сделки',
        description: 'Сразу после подписания документов вы получаете полную сумму наличными или на карту.',
        benefits: [
            'Моментальная оплата',
            'Наличные или перевод на карту',
            'Без задержек и ожиданий',
        ],
    },
    {
        number: 5,
        title: 'Переоформление за наш счет',
        description: 'Мы берем на себя все расходы по переоформлению документов в ГИБДД.',
        benefits: [
            'Переоформление за наш счет',
            'Эвакуатор при необходимости',
            'Полное сопровождение сделки',
        ],
    },
];
const HowToSellSection = () => {
    return (<section className="bg-neutral-50 dark:bg-neutral-900 py-16 px-4 transition-colors relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent"/>
      
      <div className="max-w-[1200px] w-full mx-auto">
        <AnimatedSection animationType="fade-slide" delay={0}>
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent">
              Как продать автомобиль за 97% рыночной стоимости?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[800px] leading-7">
              Простая пошаговая инструкция, которая поможет вам получить максимальную выгоду от продажи автомобиля
            </p>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-6">
          {steps.map((step, index) => (<AnimatedCard key={index} delay={index * 100}>
              <Card hover3D className="p-6">
              <div className="flex flex-row items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="flex-1 text-xl font-semibold text-neutral-900 dark:text-neutral-100">{step.title}</h3>
              </div>
              <p className="text-base text-neutral-600 dark:text-neutral-300 leading-6 mb-4 ml-14">
                {step.description}
              </p>
              <div className="ml-14 flex flex-col gap-2">
                {step.benefits.map((benefit, idx) => (<div key={idx} className="flex flex-row items-center gap-2">
                    <span className="text-base text-success-500 dark:text-success-400 font-bold">✓</span>
                    <span className="text-sm text-neutral-700 dark:text-neutral-200 leading-5">{benefit}</span>
                  </div>))}
              </div>
              </Card>
            </AnimatedCard>))}
        </div>
      </div>
    </section>);
};
export default React.memo(HowToSellSection);
