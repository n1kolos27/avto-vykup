import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Card from '../components/ui/Card.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';
const services = [
    {
        icon: '💰',
        title: 'Выкуп автомобилей',
        description: 'Выкупаем легковые автомобили всех марок и моделей в любом состоянии. От бюджетных до премиум класса.',
        features: [
            'Все марки и модели',
            'Любое состояние',
            'Честная оценка',
            'Моментальная оплата',
        ],
        path: '/services/buyback-cars',
    },
    {
        icon: '⏰',
        title: 'Срочный выкуп',
        description: 'Срочный выкуп автомобилей за 2 часа. Идеально для тех, кому нужны деньги быстро.',
        features: [
            'Выкуп за 2 часа',
            'Моментальная оплата',
            'Выезд на место',
            'Работаем 9:00-22:00',
        ],
        path: '/services/urgent-buyback',
    },
    {
        icon: '🛡️',
        title: 'Выкуп битых автомобилей',
        description: 'Выкупаем битые и аварийные автомобили с любыми повреждениями. Оценка остаточной стоимости.',
        features: [
            'Любая степень повреждения',
            'Оценка остаточной стоимости',
            'Эвакуатор за наш счет',
            'Справедливая цена',
        ],
        path: '/services/damaged-cars',
    },
    {
        icon: '🛡️',
        title: 'Выкуп после ДТП',
        description: 'Выкупаем автомобили, побывавшие в авариях. Оцениваем остаточную стоимость и возможность восстановления.',
        features: [
            'Любая степень повреждения',
            'Оценка остаточной стоимости',
            'Возможность восстановления',
            'Справедливая цена',
        ],
        path: '/services/after-accident',
    },
    {
        icon: '📄',
        title: 'Выкуп кредитных автомобилей',
        description: 'Помогаем с выкупом автомобилей, находящихся в залоге. Оформляем перевод долга и все необходимые документы.',
        features: [
            'Помощь с банком',
            'Оформление перевода долга',
            'Погашение кредита',
            'Быстрое решение',
        ],
        path: '/services/credit-cars',
    },
    {
        icon: '🏆',
        title: 'Выкуп премиум автомобилей',
        description: 'Специализируемся на выкупе элитных и премиум автомобилей. Знаем специфику оценки таких автомобилей.',
        features: [
            'Премиум марки',
            'Элитные автомобили',
            'Профессиональная оценка',
            'Максимальная цена',
        ],
        path: '/services/premium-cars',
    },
    {
        icon: '🚛',
        title: 'Выкуп коммерческого транспорта',
        description: 'Специализируемся на выкупе грузовиков, микроавтобусов, спецтехники и другого коммерческого транспорта.',
        features: [
            'Грузовики',
            'Микроавтобусы',
            'Спецтехника',
            'Профессиональная оценка',
        ],
        path: '/services/buyback-cars',
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
            '@type': 'Service',
            name: service.title,
            description: service.description,
            provider: {
                '@type': 'Organization',
                name: 'Выкуп авто | Московский Авто Альянс',
                url: baseUrl,
            },
            areaServed: {
                '@type': 'City',
                name: 'Москва',
            },
            serviceType: 'Выкуп автомобилей',
        },
    })),
};
const Services = () => {
    const navigate = useNavigate();
    const handleLinkPress = (path) => {
        navigate(path);
    };
    return (<div className="flex-1 bg-neutral-50">
      {/* Schema.org разметка */}
      <SchemaMarkup schema={servicesSchema} id="services-schema"/>

      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />

        <div className="flex flex-col items-center mb-12 mt-4">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">
            Наши услуги по выкупу автомобилей
          </h1>
          <p className="text-lg text-neutral-600 text-center max-w-[800px] leading-6">
            Полный спектр услуг по выкупу автомобилей в Москве и Московской области.
            Выберите нужную услугу и узнайте подробности. Каждая услуга имеет отдельную страницу
            с детальной информацией, процессом работы и FAQ.
          </p>
        </div>

        <div className="flex flex-row flex-wrap gap-6 mb-12">
          {services.map((service, index) => (<Card key={index} className="flex-1 min-w-[300px] p-6 mb-0">
              <button onClick={() => navigate(service.path)} className="w-full text-left hover:opacity-90 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{service.title}</h3>
                <p className="text-base text-neutral-600 leading-6 mb-4">{service.description}</p>
                <div className="flex flex-col gap-2 mb-4">
                  {service.features.map((feature, idx) => (<div key={idx} className="flex flex-row items-center gap-2">
                      <span className="text-primary-600 text-sm font-bold">✓</span>
                      <span className="text-sm text-neutral-600 flex-1">{feature}</span>
                    </div>))}
                </div>
                <div className="border-t border-neutral-200 pt-4 mt-4">
                  <span className="text-sm font-semibold text-primary-600">Узнать больше →</span>
                </div>
              </button>
            </Card>))}
        </div>

        <Card className="p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Дополнительные услуги</h2>
          <div className="flex flex-col gap-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Помощь с документами</h3>
              <p className="text-base text-neutral-600 leading-6">
                Помогаем оформить все необходимые документы для выкупа. Проверяем
                автомобиль на наличие ограничений, помогаем с восстановлением документов. Узнайте,{' '}
                <button onClick={() => handleLinkPress('/documents')} className="text-primary-600 underline">
                  какие документы нужны
                </button>
                .
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Эвакуатор</h3>
              <p className="text-base text-neutral-600 leading-6">
                Организуем эвакуатор для транспортировки автомобиля, если он не на ходу
                или находится далеко. Услуга предоставляется за дополнительную плату.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Консультации</h3>
              <p className="text-base text-neutral-600 leading-6">
                Предоставляем бесплатные консультации по вопросам выкупа автомобиля,
                оформления документов, оценки стоимости.{' '}
                <button onClick={() => handleLinkPress('/faq')} className="text-primary-600 underline">
                  Найдите ответы на вопросы о выкупе авто в разделе FAQ
                </button>
                .
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Выезд на место</h3>
              <p className="text-base text-neutral-600 leading-6">
                Наш специалист может приехать к вам в любое удобное место в Москве и МО
                для осмотра автомобиля и оформления сделки.{' '}
                <button onClick={() => handleLinkPress('/contacts')} className="text-primary-600 underline">
                  Свяжитесь с нами
                </button>{' '}
                для согласования времени.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>);
};
export default Services;
