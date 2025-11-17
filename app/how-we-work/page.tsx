import { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FiPhone, FiSearch, FiFileText, FiDollarSign, FiClock, FiCheckCircle } from 'react-icons/fi';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

export const metadata: Metadata = genMeta({
  title: 'Как мы работаем | Выкуп авто за 4 шага | Москва',
  description:
    'Процесс выкупа автомобиля в Москве и МО. От звонка до получения денег - всего 4 простых шага за 2 часа. Звонок, осмотр, оформление документов, оплата. Бесплатная оценка, моментальная оплата.',
  keywords:
    'как мы работаем, процесс выкупа, этапы выкупа, как продать авто, процедура выкупа, шаги выкупа, процесс выкупа авто, как происходит выкуп, этапы выкупа автомобиля, процедура выкупа авто москва',
  path: '/how-we-work',
});

const steps = [
  {
    icon: FiPhone,
    title: 'Шаг 1: Звонок или заявка',
    time: '5 минут',
    description:
      'Свяжитесь с нами по телефону или оставьте заявку на сайте. Наш специалист ответит в течение 5 минут и задаст несколько вопросов о вашем автомобиле.',
    details: [
      'Звонок по телефону или заявка на сайте',
      'Ответ специалиста в течение 5 минут',
      'Предварительная оценка по телефону',
      'Согласование времени и места встречи',
    ],
  },
  {
    icon: FiSearch,
    title: 'Шаг 2: Осмотр и оценка',
    time: '30-60 минут',
    description:
      'Наш специалист приезжает к вам в удобное место и проводит детальный осмотр автомобиля. Проверяет техническое состояние, внешний вид, документы.',
    details: [
      'Выезд специалиста на место',
      'Детальный осмотр автомобиля',
      'Проверка технического состояния',
      'Проверка документов и истории',
    ],
  },
  {
    icon: FiFileText,
    title: 'Шаг 3: Оформление документов',
    time: '30-60 минут',
    description:
      'Если цена вас устраивает, мы оформляем все необходимые документы. Договор купли-продажи, акт приема-передачи, все официально и прозрачно.',
    details: [
      'Оформление договора купли-продажи',
      'Подписание акта приема-передачи',
      'Проверка всех документов',
      'Официальное оформление сделки',
    ],
  },
  {
    icon: FiDollarSign,
    title: 'Шаг 4: Получение денег',
    time: 'Моментально',
    description:
      'Сразу после подписания документов вы получаете оплату. Наличными, на карту или банковским переводом - как вам удобно. Сделка завершена!',
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
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Звонок или заявка',
      text: 'Свяжитесь с нами по телефону или оставьте заявку на сайте. Наш специалист ответит в течение 5 минут и задаст несколько вопросов о вашем автомобиле.',
      itemListElement: [
        {
          '@type': 'HowToDirection',
          text: 'Звонок по телефону или заявка на сайте',
        },
        {
          '@type': 'HowToDirection',
          text: 'Ответ специалиста в течение 5 минут',
        },
        {
          '@type': 'HowToDirection',
          text: 'Предварительная оценка по телефону',
        },
        {
          '@type': 'HowToDirection',
          text: 'Согласование времени и места встречи',
        },
      ],
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Осмотр и оценка',
      text: 'Наш специалист приезжает к вам в удобное место и проводит детальный осмотр автомобиля. Проверяет техническое состояние, внешний вид, документы.',
      itemListElement: [
        {
          '@type': 'HowToDirection',
          text: 'Выезд специалиста на место',
        },
        {
          '@type': 'HowToDirection',
          text: 'Детальный осмотр автомобиля',
        },
        {
          '@type': 'HowToDirection',
          text: 'Проверка технического состояния',
        },
        {
          '@type': 'HowToDirection',
          text: 'Проверка документов и истории',
        },
      ],
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Оформление документов',
      text: 'Если цена вас устраивает, мы оформляем все необходимые документы. Договор купли-продажи, акт приема-передачи, все официально и прозрачно.',
      itemListElement: [
        {
          '@type': 'HowToDirection',
          text: 'Оформление договора купли-продажи',
        },
        {
          '@type': 'HowToDirection',
          text: 'Подписание акта приема-передачи',
        },
        {
          '@type': 'HowToDirection',
          text: 'Проверка всех документов',
        },
        {
          '@type': 'HowToDirection',
          text: 'Официальное оформление сделки',
        },
      ],
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Получение денег',
      text: 'Сразу после подписания документов вы получаете оплату. Наличными, на карту или банковским переводом - как вам удобно. Сделка завершена!',
      itemListElement: [
        {
          '@type': 'HowToDirection',
          text: 'Оплата сразу после подписания документов',
        },
        {
          '@type': 'HowToDirection',
          text: 'Выбор способа оплаты (наличные, карта, перевод)',
        },
        {
          '@type': 'HowToDirection',
          text: 'Никаких задержек или ожиданий',
        },
        {
          '@type': 'HowToDirection',
          text: 'Сделка завершена',
        },
      ],
    },
  ],
};

export default function HowWeWorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs className="mb-6" />
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Как мы работаем
            </h1>
            <p className="text-lg text-gray-600">
              Простой и понятный процесс. От звонка до получения денег - всего 4 шага
            </p>
          </AnimatedSection>

          <div className="space-y-8 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <AnimatedCard
                  key={index}
                  delay={index * 0.1}
                  className="bg-white rounded-lg shadow-lg p-8 relative"
                >
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 top-full w-0.5 h-8 bg-primary-200 transform -translate-x-1/2">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary-600 rounded-full"></div>
                    </div>
                  )}
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-bold text-gray-800">
                          {step.title}
                        </h2>
                        <div className="flex items-center space-x-2 text-primary-600">
                          <FiClock />
                          <span className="font-semibold">{step.time}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-gray-700">
                            <FiCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>

          <section className="bg-primary-600 text-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">Общее время: 2 часа</h2>
            <p className="text-lg mb-6">
              В среднем от звонка до получения денег проходит всего 2 часа. Без долгих
              ожиданий, проволочек и лишних формальностей. <Link href="/guarantees" className="text-white underline hover:text-primary-100">Ознакомьтесь с нашими гарантиями при выкупе автомобиля</Link>.
            </p>
            <div className="mt-8 pt-8 border-t border-primary-500">
              <h3 className="text-2xl font-bold mb-4">Наши услуги</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/services/urgent-buyback" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center">
                  <h4 className="font-semibold mb-2">Срочный выкуп</h4>
                  <p className="text-sm text-primary-100">Выкуп за 2 часа</p>
                </Link>
                <Link href="/services/damaged-cars" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center">
                  <h4 className="font-semibold mb-2">Выкуп битых авто</h4>
                  <p className="text-sm text-primary-100">Любая степень повреждения</p>
                </Link>
                <Link href="/services/after-accident" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center">
                  <h4 className="font-semibold mb-2">Выкуп после ДТП</h4>
                  <p className="text-sm text-primary-100">Оценка остаточной стоимости</p>
                </Link>
                <Link href="/services/credit-cars" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center">
                  <h4 className="font-semibold mb-2">Выкуп кредитных авто</h4>
                  <p className="text-sm text-primary-100">Помощь с банком</p>
                </Link>
                <Link href="/services/premium-cars" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center">
                  <h4 className="font-semibold mb-2">Выкуп премиум авто</h4>
                  <p className="text-sm text-primary-100">Элитные автомобили</p>
                </Link>
                <Link href="/services/buyback-cars" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center">
                  <h4 className="font-semibold mb-2">Выкуп автомобилей</h4>
                  <p className="text-sm text-primary-100">Все марки и модели</p>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">5 мин</div>
                <div className="text-primary-100">Ответ на заявку</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">1-2 часа</div>
                <div className="text-primary-100">Выезд и осмотр</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">Моментально</div>
                <div className="text-primary-100">Оплата</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}
