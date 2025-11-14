import { Metadata } from 'next';
import { FiFileText, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

export const metadata: Metadata = genMeta({
  title: 'Документы для выкупа автомобиля | Полный список',
  description:
    'Полный список документов, необходимых для выкупа автомобиля. ПТС, СТС, паспорт владельца. Что нужно подготовить перед продажей. Особые случаи: кредит, залог, ограничения.',
  keywords:
    'документы для выкупа, ПТС, СТС, документы на авто, что нужно для продажи авто, список документов, подготовка документов',
  path: '/documents',
});

const requiredDocs = [
  {
    title: 'Паспорт транспортного средства (ПТС)',
    description:
      'Главный документ, подтверждающий право собственности на автомобиль. Должен быть подлинным, без исправлений.',
    required: true,
  },
  {
    title: 'Свидетельство о регистрации (СТС)',
    description:
      'Подтверждает регистрацию автомобиля в ГИБДД. Все данные должны совпадать с ПТС.',
    required: true,
  },
  {
    title: 'Паспорт владельца',
    description:
      'Необходим для подтверждения личности продавца и оформления документов на нового владельца.',
    required: true,
  },
];

const optionalDocs = [
  {
    title: 'Сервисная книжка',
    description:
      'Подтверждает регулярное обслуживание автомобиля. Наличие полной истории обслуживания повышает стоимость.',
  },
  {
    title: 'Диагностическая карта',
    description:
      'Подтверждает прохождение технического осмотра. Может потребоваться для проверки состояния автомобиля.',
  },
  {
    title: 'Полис ОСАГО',
    description:
      'Если полис действителен, его можно передать новому владельцу. Не является обязательным документом.',
  },
  {
    title: 'Документы на дополнительное оборудование',
    description:
      'Если на автомобиле установлено дополнительное оборудование (сигнализация, навигация и т.д.), желательно иметь документы на него.',
  },
  {
    title: 'Чеки на ремонты',
    description:
      'Чеки и документы на проведенные ремонты подтверждают уход за автомобилем и могут повысить стоимость.',
  },
];

const specialCases = [
  {
    title: 'Автомобиль в кредите',
    description:
      'Нужны документы от банка о погашении кредита или разрешение на продажу. Мы поможем оформить перевод долга.',
  },
  {
    title: 'Автомобиль в залоге',
    description:
      'Нужны документы о снятии залога или разрешение залогодержателя на продажу.',
  },
  {
    title: 'Автомобиль с ограничениями',
    description:
      'Если есть ограничения (арест, запрет на регистрационные действия), их нужно снять перед продажей.',
  },
  {
    title: 'Утерянные документы',
    description:
      'Если документы утеряны, их нужно восстановить в ГИБДД. Мы можем помочь с консультацией по восстановлению.',
  },
];

const baseUrl = APP_CONFIG.BASE_URL;

const documentsPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Документы для выкупа автомобиля',
  description: 'Полный список документов, необходимых для выкупа автомобиля',
  url: `${baseUrl}/documents`,
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      ...requiredDocs.map((doc, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: doc.title,
        description: doc.description,
      })),
      ...optionalDocs.map((doc, index) => ({
        '@type': 'ListItem',
        position: requiredDocs.length + index + 1,
        name: doc.title,
        description: doc.description,
      })),
    ],
  },
};

export default function DocumentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(documentsPageSchema) }}
      />
      <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs className="mb-6" />
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Документы для выкупа
            </h1>
            <p className="text-lg text-gray-600">
              Полный список документов, необходимых для быстрой и законной продажи автомобиля
            </p>
          </AnimatedSection>

          <section className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
              <FiFileText className="text-primary-600" />
              <span>Обязательные документы</span>
            </h2>
            <div className="space-y-6">
              {requiredDocs.map((doc, index) => (
                <AnimatedCard
                  key={index}
                  delay={index * 0.1}
                  className="border-l-4 border-primary-600 pl-4"
                >
                  <div className="flex items-start space-x-3">
                    <FiCheckCircle className="text-green-600 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {doc.title}
                      </h3>
                      <p className="text-gray-600">{doc.description}</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Дополнительные документы (необязательные, но желательные)
            </h2>
            <div className="space-y-4">
              {optionalDocs.map((doc, index) => (
                <AnimatedCard
                  key={index}
                  delay={index * 0.1}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-gray-600">{doc.description}</p>
                </AnimatedCard>
              ))}
            </div>
          </section>

          <section className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
              <FiAlertCircle className="text-yellow-600" />
              <span>Особые случаи</span>
            </h2>
            <div className="space-y-4">
              {specialCases.map((caseItem, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {caseItem.title}
                  </h3>
                  <p className="text-gray-600">{caseItem.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-primary-600 text-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">Важно знать</h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Все документы должны быть подлинными и не иметь исправлений
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Перед продажей проверьте автомобиль на наличие ограничений в ГИБДД
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Убедитесь, что нет неоплаченных штрафов (они не препятствуют продаже, но их нужно оплатить)
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Если документы утеряны, их нужно восстановить перед продажей
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Мы поможем проверить все документы и оформить сделку правильно
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
