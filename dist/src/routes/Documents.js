import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: documentsPageSchema }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center py-12 mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0434\u043B\u044F \u0432\u044B\u043A\u0443\u043F\u0430" }), _jsx("p", { className: "text-lg text-neutral-600 text-center", children: "\u041F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0445 \u0434\u043B\u044F \u0431\u044B\u0441\u0442\u0440\u043E\u0439 \u0438 \u0437\u0430\u043A\u043E\u043D\u043D\u043E\u0439 \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" })] }), _jsxs(Card, { className: "p-8 mb-8", children: [_jsxs("div", { className: "flex flex-row items-center gap-3 mb-6", children: [_jsx("span", { className: "text-3xl", children: "\uD83D\uDCC4" }), _jsx("h2", { className: "text-3xl font-bold text-neutral-900", children: "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B" })] }), _jsx("div", { className: "flex flex-col gap-6", children: requiredDocs.map((doc, index) => (_jsxs("div", { className: "border-l-4 border-primary-600 pl-4", children: [_jsxs("div", { className: "flex flex-row items-center gap-3 mb-2", children: [_jsx("span", { className: "text-xl text-success-600", children: "\u2713" }), _jsx("h3", { className: "text-xl font-semibold text-neutral-900", children: doc.title })] }), _jsx("p", { className: "text-base text-neutral-600 leading-6", children: doc.description })] }, index))) })] }), _jsxs(Card, { className: "p-8 mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-6", children: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435, \u043D\u043E \u0436\u0435\u043B\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435)" }), _jsx("div", { className: "flex flex-col gap-4", children: optionalDocs.map((doc, index) => (_jsxs(Card, { className: "p-4 border border-neutral-200", children: [_jsx("h3", { className: "text-lg font-semibold text-neutral-900 mb-2", children: doc.title }), _jsx("p", { className: "text-base text-neutral-600 leading-6", children: doc.description })] }, index))) })] }), _jsxs(Card, { className: "bg-warning-50 p-8 mb-8 border-2 border-warning-200", children: [_jsxs("div", { className: "flex flex-row items-center gap-3 mb-6", children: [_jsx("span", { className: "text-3xl", children: "\u26A0\uFE0F" }), _jsx("h2", { className: "text-3xl font-bold text-neutral-900", children: "\u041E\u0441\u043E\u0431\u044B\u0435 \u0441\u043B\u0443\u0447\u0430\u0438" })] }), _jsx("div", { className: "flex flex-col gap-4", children: specialCases.map((caseItem, index) => (_jsxs("div", { className: "bg-white rounded-lg p-4", children: [_jsx("h3", { className: "text-lg font-semibold text-neutral-900 mb-2", children: caseItem.title }), _jsx("p", { className: "text-base text-neutral-600 leading-6 mb-2", children: caseItem.description }), caseItem.link && (_jsxs("button", { onClick: () => navigate(caseItem.link), className: "text-sm font-semibold text-primary-600 underline", children: [caseItem.linkText, " \u2192"] }))] }, index))) })] }), _jsxs("div", { className: "bg-primary-600 rounded-xl p-8 mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "\u0412\u0430\u0436\u043D\u043E \u0437\u043D\u0430\u0442\u044C" }), _jsx("div", { className: "flex flex-col gap-3", children: [
                                    'Все документы должны быть подлинными и не иметь исправлений',
                                    'Перед продажей проверьте автомобиль на наличие ограничений в ГИБДД',
                                    'Убедитесь, что нет неоплаченных штрафов (они не препятствуют продаже, но их нужно оплатить)',
                                    'Если документы утеряны, их нужно восстановить перед продажей',
                                    'Мы поможем проверить все документы и оформить сделку правильно',
                                ].map((item) => (_jsxs("div", { className: "flex flex-row items-start gap-3", children: [_jsx("span", { className: "text-xl text-white font-bold mt-0.5", children: "\u2713" }), _jsx("span", { className: "text-lg text-white flex-1 leading-7", children: item })] }, item))) })] }), _jsxs("div", { className: "bg-primary-600 rounded-xl p-8 mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-4 text-center", children: "\u041D\u0430\u0448\u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u043F\u043E \u0432\u044B\u043A\u0443\u043F\u0443 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), _jsx("p", { className: "text-lg text-primary-100 mb-8 text-center max-w-[800px] mx-auto", children: "\u041F\u043E\u043C\u043E\u0433\u0430\u0435\u043C \u0441 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435\u043C \u0432\u0441\u0435\u0445 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0434\u043B\u044F \u0432\u044B\u043A\u0443\u043F\u0430. \u041A\u0430\u0436\u0434\u0430\u044F \u0443\u0441\u043B\u0443\u0433\u0430 \u0438\u043C\u0435\u0435\u0442 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0441 \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435\u0439." }), _jsx("div", { className: "flex flex-row flex-wrap gap-4", children: [
                                    { title: 'Выкуп кредитных авто', subtitle: 'Помощь с банком и документами', path: '/services/credit-cars' },
                                    { title: 'Срочный выкуп', subtitle: 'Выкуп за 2 часа', path: '/services/urgent-buyback' },
                                    { title: 'Выкуп битых авто', subtitle: 'Любая степень повреждения', path: '/services/damaged-cars' },
                                    { title: 'Выкуп после ДТП', subtitle: 'Оценка остаточной стоимости', path: '/services/after-accident' },
                                    { title: 'Выкуп премиум авто', subtitle: 'Элитные автомобили', path: '/services/premium-cars' },
                                    { title: 'Выкуп автомобилей', subtitle: 'Все марки и модели', path: '/services/buyback-cars' },
                                ].map((service) => (_jsxs("button", { onClick: () => navigate(service.path), className: "flex-1 min-w-[150px] bg-white/10 rounded-lg p-4 flex flex-col items-center hover:bg-white/20 transition-colors", children: [_jsx("h3", { className: "text-base font-semibold text-white mb-1", children: service.title }), _jsx("p", { className: "text-sm text-primary-100 text-center", children: service.subtitle })] }, service.path))) })] })] })] }));
};
export default Documents;
