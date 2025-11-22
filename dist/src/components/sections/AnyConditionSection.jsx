import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Button from '../ui/Button';
import Card from '../ui/Card';
const conditions = [
    'Целые',
    'Битые (аварийные)',
    'Кредитные',
    'Неисправные',
    'После ДТП',
];
const carBrands = [
    'Audi', 'BMW', 'Mercedes-Benz', 'Toyota', 'Volkswagen', 'Ford', 'Nissan',
    'Hyundai', 'Kia', 'Mazda', 'Honda', 'Lexus', 'Volvo', 'Skoda', 'Renault',
    'Peugeot', 'Citroen', 'Opel', 'Chevrolet', 'Mitsubishi', 'Subaru', 'Infiniti',
    'Porsche', 'Land Rover', 'Jaguar', 'Jeep', 'Dodge', 'Chrysler', 'Cadillac',
];
const AnyConditionSection = () => {
    const navigate = useNavigate();
    return (<section className="bg-neutral-50 dark:bg-neutral-900 py-16 px-4 transition-colors relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent"/>
      
      <div className="max-w-[1200px] w-full mx-auto">
        <AnimatedSection animationType="fade-slide" delay={0}>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 text-center heading-accent">
            Предлагаем выкуп авто в любом состоянии дорого и быстро
          </h2>
        </AnimatedSection>

        <AnimatedCard delay={100}>
          <Card hover3D className="mb-6 p-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            Выкупаем автомобили в следующих состояниях:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {conditions.map((condition, index) => (<div key={index} className="flex flex-row items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">✓</span>
                </div>
                <span className="text-base text-neutral-700 dark:text-neutral-200 font-medium">{condition}</span>
              </div>))}
          </div>
          </Card>
        </AnimatedCard>

        <AnimatedCard delay={200}>
          <Card hover3D className="mb-6 p-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            Работаем со всеми марками автомобилей:
          </h3>
          <p className="text-base text-neutral-700 dark:text-neutral-200 leading-6 mb-3">
            {carBrands.join(', ')} и многие другие.
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 italic">
            Наше предложение по оценке транспортного средства действительно 30 дней
          </p>
          </Card>
        </AnimatedCard>

        <div className="flex justify-center mt-8">
          <Button onClick={() => navigate('/calculator')} size="lg" className="min-w-[250px]">
            Получить оценку онлайн
          </Button>
        </div>
      </div>
    </section>);
};
export default React.memo(AnyConditionSection);
