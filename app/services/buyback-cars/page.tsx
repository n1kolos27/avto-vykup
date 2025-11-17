import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FiDollarSign, FiCheckCircle, FiClock, FiShield, FiUsers, FiAward } from 'react-icons/fi';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

const CarEvaluationForm = dynamic(() => import('@/components/CarEvaluationForm'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
});

export const metadata: Metadata = genMeta({
  title: 'Выкуп автомобилей в Москве и МО | Все марки и модели',
  description:
    'Профессиональный выкуп автомобилей в Москве и МО. Выкупаем все марки и модели в любом состоянии. Честная оценка, моментальная оплата. До 97% рыночной стоимости.',
  keywords:
    'выкуп автомобилей, выкуп авто, продать авто, выкуп авто москва, выкуп авто МО, продать машину, выкуп машин, продать автомобиль, выкуп автомобилей москва, выкуп авто в московской области',
  path: '/services/buyback-cars',
});

const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;

const advantages = [
  {
    icon: FiDollarSign,
    title: 'До 97% рыночной стоимости',
    description: 'Предлагаем максимально честную и выгодную цену за ваш автомобиль',
  },
  {
    icon: FiClock,
    title: 'Выкуп за 2 часа',
    description: 'От звонка до получения денег проходит всего 2 часа',
  },
  {
    icon: FiShield,
    title: 'Безопасная сделка',
    description: 'Официальное оформление всех документов, полная юридическая защита',
  },
  {
    icon: FiUsers,
    title: '5000+ довольных клиентов',
    description: 'Более 5000 клиентов уже продали свои автомобили через нас',
  },
  {
    icon: FiAward,
    title: '10+ лет опыта',
    description: 'Более 10 лет успешной работы на рынке выкупа автомобилей',
  },
  {
    icon: FiCheckCircle,
    title: 'Любое состояние',
    description: 'Выкупаем автомобили в любом состоянии: от идеального до требующего ремонта',
  },
];

const processSteps = [
  {
    step: 1,
    title: 'Звонок или заявка',
    description: 'Свяжитесь с нами по телефону или оставьте заявку на сайте. Наш специалист ответит в течение 5 минут.',
  },
  {
    step: 2,
    title: 'Бесплатная оценка',
    description: 'Наш специалист приедет к вам в удобное место и проведет бесплатную оценку автомобиля.',
  },
  {
    step: 3,
    title: 'Согласование цены',
    description: 'После осмотра мы предложим честную рыночную цену. Если цена вас устраивает, переходим к оформлению.',
  },
  {
    step: 4,
    title: 'Оформление и оплата',
    description: 'Оформляем все документы и сразу производим оплату наличными или на карту.',
  },
];

const faqs = [
  {
    question: 'Какие автомобили вы выкупаете?',
    answer:
      'Мы выкупаем все марки и модели легковых автомобилей в любом состоянии: от идеального до требующего серьезного ремонта, битые, после ДТП, кредитные, премиум класса.',
  },
  {
    question: 'Как быстро происходит выкуп?',
    answer:
      'В среднем от звонка до получения денег проходит всего 2 часа. Мы приезжаем на место, осматриваем автомобиль, оформляем документы и сразу производим оплату.',
  },
  {
    question: 'Какую цену вы предлагаете?',
    answer:
      'Мы предлагаем до 97% от рыночной стоимости автомобиля. Цена зависит от марки, модели, года выпуска, пробега, технического состояния и других факторов.',
  },
  {
    question: 'Какие документы нужны?',
    answer:
      'Для выкупа автомобиля вам понадобятся: паспорт транспортного средства (ПТС), свидетельство о регистрации (СТС), паспорт владельца. Мы поможем оформить все необходимые документы.',
  },
  {
    question: 'Как происходит оплата?',
    answer:
      'Оплата производится сразу после подписания документов. Вы можете получить деньги наличными, переводом на банковскую карту или банковским переводом.',
  },
  {
    question: 'Выкупаете ли вы автомобили в залоге?',
    answer:
      'Да, мы работаем с кредитными автомобилями. Помогаем с оформлением перевода долга и всех необходимых документов. Свяжитесь с нами для консультации.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Выкуп автомобилей в Москве и МО',
  description:
    'Профессиональный выкуп автомобилей всех марок и моделей в любом состоянии. Честная оценка, моментальная оплата, до 97% рыночной стоимости.',
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
  serviceType: 'Выкуп автомобилей',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '5000',
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'Offer',
    description: 'Выкуп автомобилей по рыночной стоимости',
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

export default function BuybackCarsPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Выкуп автомобилей в Москве и МО
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                Профессиональный выкуп автомобилей всех марок и моделей в любом состоянии.
                Честная оценка за 5 минут, до 97% рыночной стоимости, моментальная оплата.
                Более 10 лет опыта, 5000+ довольных клиентов.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#evaluation"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Получить оценку
                </Link>
                <Link
                  href={`tel:${phone1}`}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  Позвонить: {phone1}
                </Link>
              </div>
            </AnimatedSection>

            {/* Advantages */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Почему выбирают нас
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
                Как мы работаем
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
            </section>

            {/* Evaluation Form */}
            <section id="evaluation" className="mb-16">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Получите бесплатную оценку вашего автомобиля
                </h2>
                <CarEvaluationForm />
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-16 bg-white rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Часто задаваемые вопросы
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
                  href="/services/urgent-buyback"
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
                >
                  <h3 className="font-semibold mb-2">Срочный выкуп</h3>
                  <p className="text-sm text-primary-100">Выкуп за 2 часа</p>
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
