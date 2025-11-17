import { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FiShield, FiFileText, FiLock, FiAward, FiCheckCircle } from 'react-icons/fi';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

export const metadata: Metadata = genMeta({
  title: 'Гарантии при выкупе авто | Безопасность сделки | Москва',
  description:
    'Что мы гарантируем при выкупе автомобиля в Москве и МО. Юридическая безопасность, прозрачность документов, защита от мошенников, честная цена, гарантия скорости. Официальное оформление.',
  keywords:
    'гарантии выкуп авто, безопасность сделки, юридическая защита, защита от мошенников, гарантия цены, официальное оформление, гарантии при выкупе, безопасный выкуп авто, юридическая безопасность сделки',
  path: '/guarantees',
});

const guarantees = [
  {
    icon: FiShield,
    title: 'Юридическая безопасность',
    description:
      'Все сделки оформляются официально с соблюдением всех требований законодательства. Вы получаете полную юридическую защиту и гарантию законности сделки.',
    details: [
      'Официальное оформление всех документов',
      'Соблюдение всех требований законодательства',
      'Полная юридическая защита',
      'Проверка автомобиля на ограничения',
    ],
  },
  {
    icon: FiFileText,
    title: 'Прозрачность документов',
    description:
      'Все документы оформляются в вашем присутствии. Вы видите каждый шаг процесса и можете задать любые вопросы. Никаких скрытых условий или дополнительных платежей.',
    details: [
      'Оформление документов в вашем присутствии',
      'Прозрачные условия сделки',
      'Возможность задать любые вопросы',
      'Отсутствие скрытых платежей',
    ],
  },
  {
    icon: FiLock,
    title: 'Защита от мошенников',
    description:
      'Мы работаем официально, имеем все необходимые документы и лицензии. Ваши данные и деньги в полной безопасности. Мы не передаем информацию третьим лицам.',
    details: [
      'Официальная деятельность',
      'Все необходимые лицензии',
      'Защита персональных данных',
      'Безопасность финансовых операций',
    ],
  },
  {
    icon: FiAward,
    title: 'Гарантия честной цены',
    description:
      'Мы предлагаем справедливую рыночную стоимость автомобиля. Если вы найдете более выгодное предложение, мы готовы обсудить цену. Никаких скрытых комиссий или занижения цен.',
    details: [
      'Справедливая рыночная цена',
      'Отсутствие скрытых комиссий',
      'Готовность к обсуждению цены',
      'Прозрачное ценообразование',
    ],
  },
  {
    icon: FiCheckCircle,
    title: 'Гарантия скорости',
    description:
      'Мы гарантируем быструю обработку заявки и оформление сделки. В среднем от звонка до получения денег проходит всего 2 часа. Без долгих ожиданий и проволочек.',
    details: [
      'Быстрая обработка заявки',
      'Выезд специалиста в течение 1-2 часов',
      'Оформление сделки за 2 часа',
      'Моментальная оплата',
    ],
  },
];

const baseUrl = APP_CONFIG.BASE_URL;

const guaranteesPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Гарантии при выкупе автомобиля',
  description: 'Что мы гарантируем при выкупе автомобиля: юридическая безопасность, прозрачность, защита',
  url: `${baseUrl}/guarantees`,
  mainEntity: {
    '@type': 'Service',
    name: 'Выкуп автомобилей с гарантиями',
    provider: {
      '@type': 'Organization',
      name: 'Выкуп авто | Московский Авто Альянс',
      url: baseUrl,
    },
  },
};

export default function GuaranteesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guaranteesPageSchema) }}
      />
      <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs className="mb-6" />
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Наши гарантии
            </h1>
            <p className="text-lg text-gray-600">
              Что мы гарантируем при выкупе вашего автомобиля
            </p>
          </AnimatedSection>

          <div className="space-y-8 mb-12">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon;
              return (
                <AnimatedCard
                  key={index}
                  delay={index * 0.1}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="text-primary-600 text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        {guarantee.title}
                      </h2>
                      <p className="text-gray-600 mb-4">{guarantee.description}</p>
                      <ul className="space-y-2">
                        {guarantee.details.map((detail, idx) => (
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

          <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">Наше обещание</h2>
            <p className="text-lg mb-6">
              Мы гарантируем, что каждая сделка будет проведена честно, быстро и
              безопасно. Ваше доверие - это наша репутация, и мы дорожим ею. <Link href="/reviews" className="text-white underline hover:text-primary-100">Прочитайте отзывы клиентов о выкупе автомобилей</Link> и <Link href="/why-us" className="text-white underline hover:text-primary-100">узнайте конкурентные преимущества нашей компании</Link>.
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Мы всегда выполняем свои обещания и соблюдаем все договоренности
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Вы можете в любой момент отказаться от сделки без каких-либо обязательств
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Мы всегда готовы ответить на ваши вопросы и объяснить все детали
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Наша цель - сделать процесс продажи автомобиля максимально простым и выгодным для вас
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}
