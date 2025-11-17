import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FiCreditCard, FiFileText, FiDollarSign, FiCheckCircle, FiShield, FiUsers } from 'react-icons/fi';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

const CarEvaluationForm = dynamic(() => import('@/components/CarEvaluationForm'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
});

export const metadata: Metadata = genMeta({
  title: 'Выкуп кредитных авто | Авто в залоге | Москва',
  description:
    'Выкуп кредитных автомобилей в Москве и МО. Помогаем с выкупом авто в залоге у банков. Оформление перевода долга, помощь с документами. Звоните: 89857520001',
  keywords:
    'выкуп кредитных авто, выкуп авто в залоге, продать кредитный авто, выкуп залоговых авто, выкуп авто с кредитом, продать машину в кредите, выкуп авто с долгом, выкуп заложенных авто',
  path: '/services/credit-cars',
});

const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;

const advantages = [
  {
    icon: FiCreditCard,
    title: 'Помощь с банком',
    description: 'Помогаем оформить перевод долга и все необходимые документы с банком',
  },
  {
    icon: FiFileText,
    title: 'Оформление документов',
    description: 'Берем на себя все юридические формальности и оформление документов',
  },
  {
    icon: FiDollarSign,
    title: 'Честная оценка',
    description: 'Оцениваем автомобиль с учетом остатка долга и предлагаем справедливую цену',
  },
  {
    icon: FiShield,
    title: 'Безопасная сделка',
    description: 'Официальное оформление всех документов, полная юридическая защита',
  },
  {
    icon: FiCheckCircle,
    title: 'Быстрое решение',
    description: 'Помогаем быстро решить вопрос с банком и оформить сделку',
  },
  {
    icon: FiUsers,
    title: 'Опыт работы',
    description: 'Более 10 лет опыта работы с кредитными автомобилями',
  },
];

const processSteps = [
  {
    step: 1,
    title: 'Консультация',
    description: 'Свяжитесь с нами для консультации. Мы оценим ситуацию и расскажем о возможных вариантах.',
  },
  {
    step: 2,
    title: 'Оценка автомобиля',
    description: 'Наш специалист оценивает автомобиль и рассчитывает остаток долга перед банком.',
  },
  {
    step: 3,
    title: 'Работа с банком',
    description: 'Помогаем оформить перевод долга и все необходимые документы с банком.',
  },
  {
    step: 4,
    title: 'Оформление и оплата',
    description: 'Оформляем документы и производим оплату, включая погашение долга перед банком.',
  },
];

const faqs = [
  {
    question: 'Выкупаете ли вы кредитные автомобили?',
    answer:
      'Да, мы выкупаем кредитные автомобили, находящиеся в залоге у банков. Помогаем с оформлением перевода долга и всех необходимых документов.',
  },
  {
    question: 'Как происходит выкуп кредитного автомобиля?',
    answer:
      'Мы оцениваем автомобиль, рассчитываем остаток долга перед банком, помогаем оформить перевод долга и все необходимые документы. После этого оформляем сделку и производим оплату, включая погашение долга.',
  },
  {
    question: 'Нужно ли самому погашать кредит?',
    answer:
      'Нет, мы берем на себя погашение кредита. Вы получаете разницу между стоимостью автомобиля и остатком долга. Все оформляется официально.',
  },
  {
    question: 'Какие документы нужны для выкупа кредитного авто?',
    answer:
      'Для выкупа кредитного автомобиля вам понадобятся: паспорт транспортного средства (ПТС), свидетельство о регистрации (СТС), паспорт владельца, кредитный договор, справка об остатке долга из банка.',
  },
  {
    question: 'Сколько времени занимает выкуп кредитного авто?',
    answer:
      'Выкуп кредитного автомобиля может занять немного больше времени из-за работы с банком, но обычно это 1-2 дня. Мы берем на себя все формальности.',
  },
  {
    question: 'Что делать, если остаток долга больше стоимости авто?',
    answer:
      'В этом случае мы можем помочь с реструктуризацией долга или предложить другие варианты решения. Свяжитесь с нами для консультации.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Выкуп кредитных автомобилей в Москве и МО',
  description:
    'Выкуп кредитных автомобилей, находящихся в залоге у банков. Помощь с оформлением перевода долга, все необходимые документы.',
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
  serviceType: 'Выкуп кредитных автомобилей',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '5000',
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'Offer',
    description: 'Выкуп кредитных автомобилей с погашением долга',
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

export default function CreditCarsPage() {
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
                Выкуп кредитных автомобилей в Москве и МО
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                Помогаем с выкупом кредитных автомобилей, находящихся в залоге у банков.
                Оформление перевода долга, помощь с документами, погашение кредита.
                Честная оценка, безопасная сделка.
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
                Преимущества выкупа кредитных авто
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
                Процесс выкупа кредитного автомобиля
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
                  Получите оценку вашего кредитного автомобиля
                </h2>
                <CarEvaluationForm />
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-16 bg-white rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Часто задаваемые вопросы о выкупе кредитных авто
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
