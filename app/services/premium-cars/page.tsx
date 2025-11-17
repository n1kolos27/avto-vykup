import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FiAward, FiDollarSign, FiCheckCircle, FiShield, FiUsers, FiTrendingUp } from 'react-icons/fi';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

const CarEvaluationForm = dynamic(() => import('@/components/CarEvaluationForm'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
});

export const metadata: Metadata = genMeta({
  title: 'Выкуп премиум автомобилей | Выкуп элитных авто Москва',
  description:
    'Выкуп премиум и элитных автомобилей в Москве и МО. Специализируемся на выкупе автомобилей премиум класса. Профессиональная оценка, максимальная цена. Звоните: 89857520001',
  keywords:
    'выкуп премиум авто, выкуп элитных авто, продать премиум авто, выкуп дорогих авто, выкуп люксовых авто, продать элитную машину, выкуп премиум машин, выкуп автомобилей премиум класса',
  path: '/services/premium-cars',
});

const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;

const premiumBrands = [
  'Mercedes-Benz', 'BMW', 'Audi', 'Lexus', 'Porsche', 'Jaguar', 'Land Rover',
  'Range Rover', 'Maserati', 'Bentley', 'Rolls-Royce', 'Ferrari', 'Lamborghini',
  'Aston Martin', 'McLaren', 'Tesla', 'Infiniti', 'Acura', 'Genesis', 'Volvo'
];

const advantages = [
  {
    icon: FiAward,
    title: 'Специализация на премиум',
    description: 'Знаем специфику оценки премиум и элитных автомобилей',
  },
  {
    icon: FiDollarSign,
    title: 'Максимальная цена',
    description: 'Предлагаем максимально выгодную цену за премиум автомобили',
  },
  {
    icon: FiTrendingUp,
    title: 'Понимание рынка',
    description: 'Отслеживаем актуальные цены на премиум сегмент',
  },
  {
    icon: FiShield,
    title: 'Безопасная сделка',
    description: 'Официальное оформление всех документов, полная юридическая защита',
  },
  {
    icon: FiCheckCircle,
    title: 'Профессиональная оценка',
    description: 'Оценка производится специалистами с опытом работы с премиум авто',
  },
  {
    icon: FiUsers,
    title: 'Конфиденциальность',
    description: 'Гарантируем полную конфиденциальность и безопасность сделки',
  },
];

const processSteps = [
  {
    step: 1,
    title: 'Консультация',
    description: 'Свяжитесь с нами для консультации. Мы расскажем о процессе выкупа премиум автомобиля.',
  },
  {
    step: 2,
    title: 'Профессиональная оценка',
    description: 'Наш специалист проводит детальную оценку автомобиля с учетом всех особенностей премиум сегмента.',
  },
  {
    step: 3,
    title: 'Согласование цены',
    description: 'Предлагаем максимально выгодную цену. Если цена вас устраивает, переходим к оформлению.',
  },
  {
    step: 4,
    title: 'Оформление и оплата',
    description: 'Оформляем все документы с соблюдением всех требований и сразу производим оплату.',
  },
];

const faqs = [
  {
    question: 'Выкупаете ли вы премиум автомобили?',
    answer:
      'Да, мы специализируемся на выкупе премиум и элитных автомобилей. Знаем специфику оценки таких автомобилей и предлагаем максимально выгодные условия.',
  },
  {
    question: 'Какие премиум марки вы выкупаете?',
    answer:
      'Мы выкупаем все премиум марки: Mercedes-Benz, BMW, Audi, Lexus, Porsche, Jaguar, Land Rover, Range Rover, Maserati, Bentley, Rolls-Royce, Ferrari, Lamborghini, Aston Martin, McLaren, Tesla и другие.',
  },
  {
    question: 'Как вы оцениваете премиум автомобили?',
    answer:
      'Оценка премиум автомобилей производится с учетом всех особенностей: марки, модели, года выпуска, пробега, технического состояния, комплектации, истории обслуживания, наличия дополнительного оборудования.',
  },
  {
    question: 'Какую цену вы предлагаете за премиум авто?',
    answer:
      'Мы предлагаем до 97% от рыночной стоимости премиум автомобиля. Цена зависит от множества факторов, но мы всегда стремимся предложить максимально выгодные условия.',
  },
  {
    question: 'Нужны ли особые документы для выкупа премиум авто?',
    answer:
      'Для выкупа премиум автомобиля вам понадобятся стандартные документы: паспорт транспортного средства (ПТС), свидетельство о регистрации (СТС), паспорт владельца. Если есть сервисная книжка или документы о дополнительном оборудовании, они также могут быть полезны.',
  },
  {
    question: 'Гарантируете ли вы конфиденциальность?',
    answer:
      'Да, мы гарантируем полную конфиденциальность и безопасность сделки. Все документы оформляются официально, информация не разглашается третьим лицам.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Выкуп премиум автомобилей в Москве и МО',
  description:
    'Выкуп премиум и элитных автомобилей. Специализация на премиум сегменте, профессиональная оценка, максимальная цена.',
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
  serviceType: 'Выкуп премиум автомобилей',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '5000',
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'Offer',
    description: 'Выкуп премиум автомобилей по максимальной цене',
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

export default function PremiumCarsPage() {
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
                <FiAward className="mx-auto text-6xl mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Выкуп премиум автомобилей в Москве и МО
                </h1>
                <p className="text-lg text-primary-100 max-w-3xl mx-auto mb-8">
                  Специализируемся на выкупе премиум и элитных автомобилей.
                  Профессиональная оценка, максимальная цена, конфиденциальность.
                  Более 10 лет опыта работы с премиум сегментом.
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

            {/* Premium Brands */}
            <section className="mb-16 bg-white rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Премиум марки, которые мы выкупаем
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {premiumBrands.map((brand, index) => (
                  <AnimatedCard
                    key={index}
                    delay={index * 0.03}
                    className="bg-primary-100 text-primary-700 px-6 py-3 rounded-full font-semibold shadow-sm hover:shadow-md transition-shadow"
                  >
                    {brand}
                  </AnimatedCard>
                ))}
              </div>
            </section>

            {/* Advantages */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Преимущества выкупа премиум авто
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
                Процесс выкупа премиум автомобиля
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
                  Получите оценку вашего премиум автомобиля
                </h2>
                <CarEvaluationForm />
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-16 bg-white rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Часто задаваемые вопросы о выкупе премиум авто
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
                  href="/services/credit-cars"
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
                >
                  <h3 className="font-semibold mb-2">Выкуп кредитных авто</h3>
                  <p className="text-sm text-primary-100">Помощь с банком</p>
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
