import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FiTool, FiAlertTriangle, FiDollarSign, FiCheckCircle, FiShield, FiTruck } from 'react-icons/fi';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

const CarEvaluationForm = dynamic(() => import('@/components/CarEvaluationForm'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
});

export const metadata: Metadata = genMeta({
  title: 'Выкуп битых автомобилей | Выкуп аварийных авто Москва',
  description:
    'Выкуп битых и аварийных автомобилей в Москве и МО. Выкупаем авто с любыми повреждениями. Оценка остаточной стоимости, честная цена. Звоните: 89857520001',
  keywords:
    'выкуп битых авто, выкуп аварийных авто, выкуп поврежденных авто, выкуп авто после аварии, продать битое авто, выкуп разбитых авто, выкуп авто с повреждениями, выкуп битых машин',
  path: '/services/damaged-cars',
});

const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;

const advantages = [
  {
    icon: FiTool,
    title: 'Любая степень повреждения',
    description: 'Выкупаем автомобили с любыми повреждениями: от царапин до тотальных',
  },
  {
    icon: FiDollarSign,
    title: 'Честная оценка',
    description: 'Оцениваем остаточную стоимость и возможность восстановления или разбора',
  },
  {
    icon: FiTruck,
    title: 'Эвакуатор за наш счет',
    description: 'Организуем эвакуатор для транспортировки неисправного автомобиля',
  },
  {
    icon: FiShield,
    title: 'Безопасная сделка',
    description: 'Официальное оформление всех документов, полная юридическая защита',
  },
  {
    icon: FiCheckCircle,
    title: 'Моментальная оплата',
    description: 'Оплата сразу после подписания документов наличными или на карту',
  },
  {
    icon: FiAlertTriangle,
    title: 'Опыт работы',
    description: 'Более 10 лет опыта работы с битыми и аварийными автомобилями',
  },
];

const damageTypes = [
  {
    title: 'Незначительные повреждения',
    description: 'Царапины, вмятины, повреждения бамперов. Оценка с учетом стоимости ремонта.',
  },
  {
    title: 'Средние повреждения',
    description: 'Повреждения кузова, разбитые стекла, повреждения оптики. Оценка остаточной стоимости.',
  },
  {
    title: 'Серьезные повреждения',
    description: 'Повреждения несущих элементов, деформация кузова. Оценка возможности восстановления.',
  },
  {
    title: 'Тотальные повреждения',
    description: 'Автомобиль не подлежит восстановлению. Оценка стоимости разбора на запчасти.',
  },
];

const faqs = [
  {
    question: 'Выкупаете ли вы битые автомобили?',
    answer:
      'Да, мы выкупаем битые и аварийные автомобили с любыми повреждениями. Оцениваем остаточную стоимость, возможность восстановления или разбора на запчасти.',
  },
  {
    question: 'Как вы оцениваете битые автомобили?',
    answer:
      'Мы учитываем степень повреждений, стоимость ремонта, остаточную стоимость автомобиля, возможность восстановления или разбора на запчасти. Оценка производится профессиональными специалистами.',
  },
  {
    question: 'Что делать, если автомобиль не на ходу?',
    answer:
      'Мы организуем эвакуатор для транспортировки неисправного автомобиля. Эвакуатор может быть за наш счет или за дополнительную плату, в зависимости от ситуации.',
  },
  {
    question: 'Выкупаете ли вы тотальные автомобили?',
    answer:
      'Да, мы выкупаем тотальные автомобили, которые не подлежат восстановлению. Оцениваем стоимость разбора на запчасти и предлагаем справедливую цену.',
  },
  {
    question: 'Какие документы нужны для выкупа битого авто?',
    answer:
      'Для выкупа битого автомобиля вам понадобятся: паспорт транспортного средства (ПТС), свидетельство о регистрации (СТС), паспорт владельца. Если есть справка о ДТП, она также может быть полезна.',
  },
  {
    question: 'Как быстро происходит выкуп битого авто?',
    answer:
      'Выкуп битого автомобиля происходит так же быстро, как и обычного - в среднем 2 часа от звонка до получения денег. Мы приезжаем, осматриваем, оцениваем и сразу производим оплату.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Выкуп битых автомобилей в Москве и МО',
  description:
    'Выкуп битых и аварийных автомобилей с любыми повреждениями. Оценка остаточной стоимости, честная цена, моментальная оплата.',
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
  serviceType: 'Выкуп битых автомобилей',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '5000',
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'Offer',
    description: 'Выкуп битых автомобилей по остаточной стоимости',
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

export default function DamagedCarsPage() {
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
                Выкуп битых автомобилей в Москве и МО
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                Выкупаем битые и аварийные автомобили с любыми повреждениями.
                Оценка остаточной стоимости, честная цена, моментальная оплата.
                Организуем эвакуатор для неисправных авто.
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
                Преимущества выкупа битых авто
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

            {/* Damage Types */}
            <section className="mb-16 bg-white rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Типы повреждений, которые мы выкупаем
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {damageTypes.map((type, index) => (
                  <AnimatedCard
                    key={index}
                    delay={index * 0.1}
                    className="border-l-4 border-primary-600 pl-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {type.title}
                    </h3>
                    <p className="text-gray-600">{type.description}</p>
                  </AnimatedCard>
                ))}
              </div>
            </section>

            {/* Evaluation Form */}
            <section id="evaluation" className="mb-16">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Получите оценку вашего битого автомобиля
                </h2>
                <CarEvaluationForm />
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-16 bg-white rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Часто задаваемые вопросы о выкупе битых авто
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
                  href="/services/urgent-buyback"
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
                >
                  <h3 className="font-semibold mb-2">Срочный выкуп</h3>
                  <p className="text-sm text-primary-100">Выкуп за 2 часа</p>
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
