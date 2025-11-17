import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FiClock, FiZap, FiDollarSign, FiCheckCircle, FiShield, FiMapPin } from 'react-icons/fi';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

const CarEvaluationForm = dynamic(() => import('@/components/CarEvaluationForm'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
});

export const metadata: Metadata = genMeta({
  title: 'Срочный выкуп авто за 2 часа | Москва и МО',
  description:
    'Срочный выкуп автомобилей за 2 часа в Москве и МО. Быстрый выкуп с моментальной оплатой. Работаем с 9:00 до 22:00 ежедневно. Оценка за 5 минут. Звоните: 89857520001',
  keywords:
    'срочный выкуп авто, быстрый выкуп, выкуп за 2 часа, срочная продажа авто, быстрый выкуп авто москва, срочный выкуп автомобилей, выкуп авто срочно, моментальный выкуп авто, срочный выкуп машин',
  path: '/services/urgent-buyback',
});

const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;

const advantages = [
  {
    icon: FiClock,
    title: 'Выкуп за 2 часа',
    description: 'От звонка до получения денег проходит всего 2 часа',
  },
  {
    icon: FiZap,
    title: 'Оценка за 5 минут',
    description: 'Предварительная оценка по телефону за 5 минут',
  },
  {
    icon: FiDollarSign,
    title: 'Моментальная оплата',
    description: 'Оплата сразу после подписания документов наличными или на карту',
  },
  {
    icon: FiMapPin,
    title: 'Выезд на место',
    description: 'Наш специалист приедет к вам в любое удобное место в Москве и МО',
  },
  {
    icon: FiShield,
    title: 'Безопасная сделка',
    description: 'Официальное оформление всех документов, полная юридическая защита',
  },
  {
    icon: FiCheckCircle,
    title: 'Работаем 9:00-22:00',
    description: 'Работаем ежедневно, включая выходные и праздники',
  },
];

const processSteps = [
  {
    step: 1,
    title: 'Звонок (5 минут)',
    description: 'Звоните нам или оставляйте заявку. Наш специалист ответит в течение 5 минут и задаст несколько вопросов о вашем автомобиле.',
  },
  {
    step: 2,
    title: 'Выезд специалиста (30-60 минут)',
    description: 'Наш специалист приедет к вам в удобное место. Выезд по всей Москве и МО. Осмотр автомобиля занимает 30-60 минут.',
  },
  {
    step: 3,
    title: 'Оценка и согласование (15 минут)',
    description: 'После осмотра мы предложим честную рыночную цену. Если цена вас устраивает, переходим к оформлению.',
  },
  {
    step: 4,
    title: 'Оформление и оплата (30 минут)',
    description: 'Оформляем все документы (30 минут) и сразу производим оплату. Вы получаете деньги наличными или на карту.',
  },
];

const faqs = [
  {
    question: 'Как быстро происходит срочный выкуп?',
    answer:
      'В среднем от звонка до получения денег проходит всего 2 часа. Мы приезжаем на место, осматриваем автомобиль, оформляем документы и сразу производим оплату.',
  },
  {
    question: 'Работаете ли вы в выходные и праздники?',
    answer:
      'Да, мы работаем ежедневно с 9:00 до 22:00, включая выходные и праздники. Вы можете связаться с нами в любое удобное время.',
  },
  {
    question: 'Можно ли получить деньги в день обращения?',
    answer:
      'Да, именно для этого и существует срочный выкуп. Вы получаете деньги в тот же день, в день обращения. Оплата производится сразу после подписания документов.',
  },
  {
    question: 'Какие документы нужны для срочного выкупа?',
    answer:
      'Для срочного выкупа вам понадобятся: паспорт транспортного средства (ПТС), свидетельство о регистрации (СТС), паспорт владельца. Мы поможем оформить все необходимые документы быстро.',
  },
  {
    question: 'Выкупаете ли вы автомобили в любом состоянии?',
    answer:
      'Да, мы выкупаем автомобили в любом состоянии: от идеального до требующего серьезного ремонта, битые, после ДТП. Оценка производится с учетом всех факторов.',
  },
  {
    question: 'Как происходит оплата при срочном выкупе?',
    answer:
      'Оплата производится сразу после подписания документов. Вы можете получить деньги наличными, переводом на банковскую карту или банковским переводом. Никаких задержек.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Срочный выкуп автомобилей за 2 часа',
  description:
    'Срочный выкуп автомобилей за 2 часа в Москве и МО. Быстрая оценка за 5 минут, моментальная оплата. Работаем с 9:00 до 22:00 ежедневно.',
  provider: {
    '@type': 'Organization',
    name: 'Выкуп авто | Московский Авто Альянс',
    url: baseUrl,
    telephone: `+7${phone1.replace(/\D/g, '')}`,
  },
  areaServed: [
    { '@type': 'City', name: 'Москва' },
    { '@type': 'State', name: 'Московская область' },
  ],
  serviceType: 'Срочный выкуп автомобилей',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '5000',
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'Offer',
    description: 'Срочный выкуп автомобилей за 2 часа',
    priceCurrency: 'RUB',
    availability: 'https://schema.org/InStock',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function UrgentBuybackPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumbs className="mb-6" />

            {/* Hero Section */}
            <AnimatedSection className="text-center mb-12">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg shadow-xl p-8 md:p-12 mb-8">
                <FiZap className="mx-auto text-6xl mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Срочный выкуп автомобилей за 2 часа
                </h1>
                <p className="text-lg text-primary-100 max-w-3xl mx-auto mb-8">
                  Нужны деньги срочно? Мы выкупим ваш автомобиль за 2 часа с момента обращения.
                  Оценка за 5 минут, моментальная оплата. Работаем с 9:00 до 22:00 ежедневно.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={`tel:${phone1}`}
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Позвонить: {phone1}
                  </Link>
                  <Link
                    href="#evaluation"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                  >
                    Получить оценку
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Advantages */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Преимущества срочного выкупа
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advantages.map((advantage, index) => {
                  const Icon = advantage.icon;
                  return (
                    <AnimatedCard
                      key={index}
                      delay={index * 0.1}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <Icon className="text-primary-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {advantage.title}
                      </h3>
                      <p className="text-gray-600">{advantage.description}</p>
                    </AnimatedCard>
                  );
                })}
              </div>
            </section>

            {/* Process */}
            <section className="mb-16 bg-white rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Процесс срочного выкупа за 2 часа
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {processSteps.map((step, index) => (
                  <AnimatedCard
                    key={index}
                    delay={index * 0.1}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-2xl font-bold text-primary-600">
                  Общее время: 2 часа от звонка до получения денег
                </p>
              </div>
            </section>

            {/* Evaluation Form */}
            <section id="evaluation" className="mb-16">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Получите срочную оценку вашего автомобиля
                </h2>
                <CarEvaluationForm />
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-16 bg-white rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Часто задаваемые вопросы о срочном выкупе
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <AnimatedCard
                    key={index}
                    delay={index * 0.05}
                    className="border-b border-gray-200 pb-6 last:border-b-0"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </AnimatedCard>
                ))}
              </div>
            </section>

            {/* Related Services */}
            <section className="bg-primary-600 text-white rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Другие наши услуги
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/services/buyback-cars"
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
                >
                  <h3 className="font-semibold mb-2">Выкуп автомобилей</h3>
                  <p className="text-sm text-primary-100">Все марки и модели</p>
                </Link>
                <Link
                  href="/services/damaged-cars"
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
                >
                  <h3 className="font-semibold mb-2">Выкуп битых авто</h3>
                  <p className="text-sm text-primary-100">Любая степень повреждения</p>
                </Link>
                <Link
                  href="/services/after-accident"
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
                >
                  <h3 className="font-semibold mb-2">Выкуп после ДТП</h3>
                  <p className="text-sm text-primary-100">Оценка остаточной стоимости</p>
                </Link>
                <Link
                  href="/services/credit-cars"
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
                >
                  <h3 className="font-semibold mb-2">Выкуп кредитных авто</h3>
                  <p className="text-sm text-primary-100">Помощь с банком</p>
                </Link>
                <Link
                  href="/services/premium-cars"
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
                >
                  <h3 className="font-semibold mb-2">Выкуп премиум авто</h3>
                  <p className="text-sm text-primary-100">Элитные автомобили</p>
                </Link>
                <Link
                  href="/services"
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
                >
                  <h3 className="font-semibold mb-2">Все услуги</h3>
                  <p className="text-sm text-primary-100">Полный спектр</p>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
