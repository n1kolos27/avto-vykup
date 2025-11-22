import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Card from '../components/ui/Card.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';
const requiredDocs = [
    {
        title: 'Паспорт транспортного средства (ПТС)',
        description: 'Главный документ, подтверждающий право собственности на автомобиль. Должен быть подлинным, без исправлений.',
        required: true,
    },
    {
        title: 'Свидетельство о регистрации (СТС)',
        description: 'Подтверждает регистрацию автомобиля в ГИБДД. Все данные должны совпадать с ПТС.',
        required: true,
    },
    {
        title: 'Паспорт владельца',
        description: 'Необходим для подтверждения личности продавца и оформления документов на нового владельца.',
        required: true,
    },
];
const optionalDocs = [
    {
        title: 'Сервисная книжка',
        description: 'Подтверждает регулярное обслуживание автомобиля. Наличие полной истории обслуживания повышает стоимость.',
    },
    {
        title: 'Диагностическая карта',
        description: 'Подтверждает прохождение технического осмотра. Может потребоваться для проверки состояния автомобиля.',
    },
    {
        title: 'Полис ОСАГО',
        description: 'Если полис действителен, его можно передать новому владельцу. Не является обязательным документом.',
    },
    {
        title: 'Документы на дополнительное оборудование',
        description: 'Если на автомобиле установлено дополнительное оборудование (сигнализация, навигация и т.д.), желательно иметь документы на него.',
    },
    {
        title: 'Чеки на ремонты',
        description: 'Чеки и документы на проведенные ремонты подтверждают уход за автомобилем и могут повысить стоимость.',
    },
];
const specialCases = [
    {
        title: 'Автомобиль в кредите',
        description: 'Нужны документы от банка о погашении кредита или разрешение на продажу. Мы поможем оформить перевод долга.',
        link: '/services/credit-cars',
        linkText: 'Узнать больше о выкупе кредитных авто',
    },
    {
        title: 'Автомобиль в залоге',
        description: 'Нужны документы о снятии залога или разрешение залогодержателя на продажу.',
        link: '/services/credit-cars',
        linkText: 'Узнать больше о выкупе залоговых авто',
    },
    {
        title: 'Автомобиль с ограничениями',
        description: 'Если есть ограничения (арест, запрет на регистрационные действия), их нужно снять перед продажей.',
    },
    {
        title: 'Утерянные документы',
        description: 'Если документы утеряны, их нужно восстановить в ГИБДД. Мы можем помочь с консультацией по восстановлению.',
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
const Documents = () => {
    const navigate = useNavigate();
    return (<div className="flex-1 bg-neutral-50">
      <SchemaMarkup schema={documentsPageSchema}/>
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />
        <div className="flex flex-col items-center py-12 mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">Документы для выкупа</h1>
          <p className="text-lg text-neutral-600 text-center">
            Полный список документов, необходимых для быстрой и законной продажи автомобиля
          </p>
        </div>

        <Card className="p-8 mb-8">
          <div className="flex flex-row items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-3xl font-bold text-neutral-900">Обязательные документы</h2>
          </div>
          <div className="flex flex-col gap-6">
            {requiredDocs.map((doc, index) => (<div key={index} className="border-l-4 border-primary-600 pl-4">
                <div className="flex flex-row items-center gap-3 mb-2">
                  <span className="text-xl text-success-600">✓</span>
                  <h3 className="text-xl font-semibold text-neutral-900">{doc.title}</h3>
                </div>
                <p className="text-base text-neutral-600 leading-6">{doc.description}</p>
              </div>))}
          </div>
        </Card>

        <Card className="p-8 mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Дополнительные документы (необязательные, но желательные)
          </h2>
          <div className="flex flex-col gap-4">
            {optionalDocs.map((doc, index) => (<Card key={index} className="p-4 border border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{doc.title}</h3>
                <p className="text-base text-neutral-600 leading-6">{doc.description}</p>
              </Card>))}
          </div>
        </Card>

        <Card className="bg-warning-50 p-8 mb-8 border-2 border-warning-200">
          <div className="flex flex-row items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-3xl font-bold text-neutral-900">Особые случаи</h2>
          </div>
          <div className="flex flex-col gap-4">
            {specialCases.map((caseItem, index) => (<div key={index} className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{caseItem.title}</h3>
                <p className="text-base text-neutral-600 leading-6 mb-2">{caseItem.description}</p>
                {caseItem.link && (<button onClick={() => navigate(caseItem.link)} className="text-sm font-semibold text-primary-600 underline">
                    {caseItem.linkText} →
                  </button>)}
              </div>))}
          </div>
        </Card>

        <div className="bg-primary-600 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Важно знать</h2>
          <div className="flex flex-col gap-3">
            {[
            'Все документы должны быть подлинными и не иметь исправлений',
            'Перед продажей проверьте автомобиль на наличие ограничений в ГИБДД',
            'Убедитесь, что нет неоплаченных штрафов (они не препятствуют продаже, но их нужно оплатить)',
            'Если документы утеряны, их нужно восстановить перед продажей',
            'Мы поможем проверить все документы и оформить сделку правильно',
        ].map((item) => (<div key={item} className="flex flex-row items-start gap-3">
                <span className="text-xl text-white font-bold mt-0.5">✓</span>
                <span className="text-lg text-white flex-1 leading-7">{item}</span>
              </div>))}
          </div>
        </div>

        <div className="bg-primary-600 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Наши услуги по выкупу автомобилей</h2>
          <p className="text-lg text-primary-100 mb-8 text-center max-w-[800px] mx-auto">
            Помогаем с оформлением всех необходимых документов для выкупа. Каждая услуга имеет отдельную страницу с детальной информацией.
          </p>
          <div className="flex flex-row flex-wrap gap-4">
            {[
            { title: 'Выкуп кредитных авто', subtitle: 'Помощь с банком и документами', path: '/services/credit-cars' },
            { title: 'Срочный выкуп', subtitle: 'Выкуп за 2 часа', path: '/services/urgent-buyback' },
            { title: 'Выкуп битых авто', subtitle: 'Любая степень повреждения', path: '/services/damaged-cars' },
            { title: 'Выкуп после ДТП', subtitle: 'Оценка остаточной стоимости', path: '/services/after-accident' },
            { title: 'Выкуп премиум авто', subtitle: 'Элитные автомобили', path: '/services/premium-cars' },
            { title: 'Выкуп автомобилей', subtitle: 'Все марки и модели', path: '/services/buyback-cars' },
        ].map((service) => (<button key={service.path} onClick={() => navigate(service.path)} className="flex-1 min-w-[150px] bg-white/10 rounded-lg p-4 flex flex-col items-center hover:bg-white/20 transition-colors">
                <h3 className="text-base font-semibold text-white mb-1">{service.title}</h3>
                <p className="text-sm text-primary-100 text-center">{service.subtitle}</p>
              </button>))}
          </div>
        </div>
      </div>
    </div>);
};
export default Documents;
