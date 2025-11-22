import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import Card from '../ui/Card';
import Button from '../ui/Button';
const cases = [
    {
        title: 'BMW X5 2019 года',
        description: 'Клиент обратился после ДТП. Автомобиль требовал серьезного ремонта. Мы предложили справедливую цену с учетом остаточной стоимости и возможности восстановления.',
        result: '2 100 000 ₽',
        time: '1.5 часа',
        client: 'Александр М.',
        features: ['После ДТП', 'Справедливая оценка', 'Быстрая сделка'],
    },
    {
        title: 'Mercedes-Benz C-Class 2020',
        description: 'Владелец планировал продать авто самостоятельно, но после консультации с нами решил воспользоваться нашими услугами. Получил деньги в тот же день.',
        result: '2 800 000 ₽',
        time: '2 часа',
        client: 'Мария К.',
        features: ['Отличное состояние', 'Моментальная оплата', 'Без хлопот'],
    },
    {
        title: 'Toyota Camry 2018',
        description: 'Автомобиль с большим пробегом, но в хорошем техническом состоянии. Мы оценили его честно, учитывая все факторы, и предложили рыночную цену.',
        result: '1 450 000 ₽',
        time: '1 час',
        client: 'Дмитрий С.',
        features: ['Большой пробег', 'Честная оценка', 'Официальное оформление'],
    },
];
const CasesSection = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextCase = () => {
        setCurrentIndex((prev) => (prev + 1) % cases.length);
    };
    const prevCase = () => {
        setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
    };
    const currentCase = cases[currentIndex];
    return (<section className="bg-neutral-50 dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent"/>
      
      <div className="max-w-[1200px] w-full mx-auto">
        <AnimatedSection animationType="fade-slide" delay={0}>
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent">
              Успешные сделки наших клиентов
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]">
              Реальные истории продажи автомобилей с конкретными результатами и сроками
            </p>
          </div>
        </AnimatedSection>

        <Card className="p-8 mb-8">
          <div className="flex flex-row justify-between items-center mb-4 flex-wrap gap-4">
            <h3 className="flex-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {currentCase.title}
            </h3>
            <div className="flex flex-row items-center gap-4">
              <button onClick={prevCase} className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors min-w-[44px] min-h-[44px]" aria-label="Предыдущий кейс">
                <span className="text-2xl text-neutral-900 dark:text-neutral-100 font-bold">‹</span>
              </button>
              <span className="text-sm text-neutral-600 dark:text-neutral-300 font-medium">
                {currentIndex + 1} / {cases.length}
              </span>
              <button onClick={nextCase} className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors min-w-[44px] min-h-[44px]" aria-label="Следующий кейс">
                <span className="text-2xl text-neutral-900 dark:text-neutral-100 font-bold">›</span>
              </button>
            </div>
          </div>

          <p className="text-base text-neutral-700 dark:text-neutral-200 leading-6 mb-6">
            {currentCase.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-700">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-1">Результат</p>
              <p className="text-xl font-bold text-primary-600 dark:text-primary-400">{currentCase.result}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-1">Время сделки</p>
              <p className="text-xl font-bold text-primary-600 dark:text-primary-400">{currentCase.time}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-1">Клиент</p>
              <p className="text-xl font-bold text-primary-600 dark:text-primary-400">{currentCase.client}</p>
            </div>
          </div>

          <div className="flex flex-row flex-wrap gap-2">
            {currentCase.features.map((feature, index) => (<div key={index} className="px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                <span className="text-sm text-primary-700 dark:text-primary-300 font-medium">{feature}</span>
              </div>))}
          </div>
        </Card>

        <div className="flex justify-center">
          <Button onClick={() => navigate('/calculator')} size="lg" className="min-w-[250px]">
            Получить такую же оценку
          </Button>
        </div>
      </div>
    </section>);
};
export default React.memo(CasesSection);
