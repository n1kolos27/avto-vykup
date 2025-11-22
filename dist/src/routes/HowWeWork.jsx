import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Card from '../components/ui/Card.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';
const steps = [
    {
        icon: '📞',
        title: 'Шаг 1: Звонок или заявка',
        time: '5 минут',
        description: 'Свяжитесь с нами по телефону или оставьте заявку на сайте. Наш специалист ответит в течение 5 минут и задаст несколько вопросов о вашем автомобиле.',
        details: [
            'Звонок по телефону или заявка на сайте',
            'Ответ специалиста в течение 5 минут',
            'Предварительная оценка по телефону',
            'Согласование времени и места встречи',
        ],
    },
    {
        icon: '🔍',
        title: 'Шаг 2: Осмотр и оценка',
        time: '30-60 минут',
        description: 'Наш специалист приезжает к вам в удобное место и проводит детальный осмотр автомобиля. Проверяет техническое состояние, внешний вид, документы.',
        details: [
            'Выезд специалиста на место',
            'Детальный осмотр автомобиля',
            'Проверка технического состояния',
            'Проверка документов и истории',
        ],
    },
    {
        icon: '📄',
        title: 'Шаг 3: Оформление документов',
        time: '30-60 минут',
        description: 'Если цена вас устраивает, мы оформляем все необходимые документы. Договор купли-продажи, акт приема-передачи, все официально и прозрачно.',
        details: [
            'Оформление договора купли-продажи',
            'Подписание акта приема-передачи',
            'Проверка всех документов',
            'Официальное оформление сделки',
        ],
    },
    {
        icon: '💰',
        title: 'Шаг 4: Получение денег',
        time: 'Моментально',
        description: 'Сразу после подписания документов вы получаете оплату. Наличными, на карту или банковским переводом - как вам удобно. Сделка завершена!',
        details: [
            'Оплата сразу после подписания документов',
            'Выбор способа оплаты (наличные, карта, перевод)',
            'Никаких задержек или ожиданий',
            'Сделка завершена',
        ],
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Как продать автомобиль через выкуп',
    description: 'Пошаговая инструкция по продаже автомобиля через компанию Выкуп авто',
    url: `${baseUrl}/how-we-work`,
    totalTime: 'PT2H',
    estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'RUB',
        value: '0',
    },
    step: steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.title,
        text: step.description,
        itemListElement: step.details.map((detail) => ({
            '@type': 'HowToDirection',
            text: detail,
        })),
    })),
};
const HowWeWork = () => {
    const navigate = useNavigate();
    return (<div className="flex-1 bg-neutral-50">
      <SchemaMarkup schema={howToSchema}/>
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />
        <div className="flex flex-col items-center py-12 mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">Как мы работаем</h1>
          <p className="text-lg text-neutral-600 text-center">
            Простой и понятный процесс. От звонка до получения денег - всего 4 шага
          </p>
        </div>

        <div className="flex flex-col gap-8 mb-8">
          {steps.map((step, index) => (<Card key={index} className="p-8">
              <div className="flex flex-row gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-row justify-between items-center mb-3">
                    <h3 className="text-2xl font-bold text-neutral-900 flex-1">{step.title}</h3>
                    <div className="flex flex-row items-center gap-1">
                      <span className="text-base text-primary-600">⏱️</span>
                      <span className="text-base font-semibold text-primary-600">{step.time}</span>
                    </div>
                  </div>
                  <p className="text-base text-neutral-600 leading-6 mb-4">{step.description}</p>
                  <div className="flex flex-col gap-2">
                    {step.details.map((detail, idx) => (<div key={idx} className="flex flex-row items-start gap-2">
                        <span className="text-primary-600 text-base mt-0.5">✓</span>
                        <span className="text-base text-neutral-700 flex-1">{detail}</span>
                      </div>))}
                  </div>
                </div>
              </div>
            </Card>))}
        </div>

        <div className="bg-primary-600 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Общее время: 2 часа</h2>
          <p className="text-lg text-white mb-8 leading-7">
            В среднем от звонка до получения денег проходит всего 2 часа. Без долгих
            ожиданий, проволочек и лишних формальностей.{' '}
            <button onClick={() => navigate('/guarantees')} className="underline">
              Ознакомьтесь с нашими гарантиями при выкупе автомобиля
            </button>
            .
          </p>
          <div className="flex flex-row justify-around mb-8 pt-8 border-t border-white/20">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-2">5 мин</span>
              <span className="text-base text-primary-100">Ответ на заявку</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-2">1-2 часа</span>
              <span className="text-base text-primary-100">Выезд и осмотр</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-2">Моментально</span>
              <span className="text-base text-primary-100">Оплата</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Наши услуги</h3>
            <div className="flex flex-row flex-wrap gap-4">
              {[
            { title: 'Срочный выкуп', subtitle: 'Выкуп за 2 часа', path: '/services/urgent-buyback' },
            { title: 'Выкуп битых авто', subtitle: 'Любая степень повреждения', path: '/services/damaged-cars' },
            { title: 'Выкуп после ДТП', subtitle: 'Оценка остаточной стоимости', path: '/services/after-accident' },
            { title: 'Выкуп кредитных авто', subtitle: 'Помощь с банком', path: '/services/credit-cars' },
            { title: 'Выкуп премиум авто', subtitle: 'Элитные автомобили', path: '/services/premium-cars' },
            { title: 'Выкуп автомобилей', subtitle: 'Все марки и модели', path: '/services/buyback-cars' },
        ].map((service) => (<button key={service.path} onClick={() => navigate(service.path)} className="flex-1 min-w-[150px] bg-white/10 rounded-lg p-4 flex flex-col items-center hover:bg-white/20 transition-colors">
                  <span className="text-base font-semibold text-white mb-1">{service.title}</span>
                  <span className="text-sm text-primary-100 text-center">{service.subtitle}</span>
                </button>))}
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default HowWeWork;
