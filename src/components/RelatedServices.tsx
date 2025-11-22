import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './ui/Card';
import Button from './ui/Button';

interface RelatedService {
  title: string;
  description: string;
  path: string;
  icon: string;
}

interface RelatedServicesProps {
  currentPath: string;
  services?: RelatedService[];
}

const defaultServices: RelatedService[] = [
  {
    title: 'Срочный выкуп авто за 2 часа',
    description: 'Выкуп автомобилей за 2 часа с момента обращения. Моментальная оценка и оплата.',
    path: '/services/urgent-buyback',
    icon: '⚡',
  },
  {
    title: 'Выкуп битых авто',
    description: 'Выкупаем битые и поврежденные автомобили. Справедливая оценка остаточной стоимости.',
    path: '/services/damaged-cars',
    icon: '🔧',
  },
  {
    title: 'Выкуп после ДТП',
    description: 'Выкуп автомобилей после ДТП. Быстрая оценка и выкуп поврежденных в аварии авто.',
    path: '/services/after-accident',
    icon: '🚗',
  },
  {
    title: 'Выкуп кредитных авто',
    description: 'Выкуп автомобилей в кредите или залоге. Помогаем решить вопрос с банком.',
    path: '/services/credit-cars',
    icon: '💳',
  },
  {
    title: 'Выкуп премиум авто',
    description: 'Специализируемся на выкупе элитных и премиум автомобилей. Максимальная цена.',
    path: '/services/premium-cars',
    icon: '⭐',
  },
  {
    title: 'Выкуп автомобилей',
    description: 'Выкупаем легковые автомобили всех марок и моделей в любом состоянии.',
    path: '/services/buyback-cars',
    icon: '🚙',
  },
];

const RelatedServices: React.FC<RelatedServicesProps> = ({ currentPath, services = defaultServices }) => {
  const navigate = useNavigate();
  
  // Фильтруем текущую услугу и берем 3 связанные
  const relatedServices = services
    .filter(service => service.path !== currentPath)
    .slice(0, 3);

  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-neutral-900 mb-6 text-center">Другие наши услуги</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedServices.map((service) => (
          <Card key={service.path} className="p-6 hover:shadow-lg transition-shadow flex flex-col">
            <div className="text-4xl mb-4 text-center">{service.icon}</div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3 text-center leading-tight">
              {service.title}
            </h3>
            <p className="text-sm text-neutral-600 mb-4 flex-1 text-center line-clamp-3">
              {service.description}
            </p>
            <Button
              onClick={() => navigate(service.path)}
              variant="secondary"
              className="w-full"
            >
              Узнать больше
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RelatedServices;

