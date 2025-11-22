import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Breadcrumbs from '../../components/Breadcrumbs.js';
import Card from '../../components/ui/Card.js';
import CarEvaluationForm from '../../components/CarEvaluationForm.js';
import SchemaMarkup from '../../components/SchemaMarkup.js';
import RelatedServices from '../../components/RelatedServices.js';
import { APP_CONFIG } from '../../lib/config/index.js';
const advantages = [
    {
        icon: '💎',
        title: 'Премиум марки',
        description: 'Специализируемся на выкупе элитных и премиум автомобилей',
    },
    {
        icon: '🏆',
        title: 'Элитные автомобили',
        description: 'Выкупаем автомобили премиум класса: Mercedes-Benz, BMW, Audi, Porsche, Lexus и другие',
    },
    {
        icon: '💰',
        title: 'Профессиональная оценка',
        description: 'Знаем специфику оценки премиум автомобилей и предлагаем максимальную цену',
    },
    {
        icon: '📈',
        title: 'Максимальная цена',
        description: 'Предлагаем до 97% от рыночной стоимости премиум автомобилей',
    },
    {
        icon: '🛡️',
        title: 'Безопасная сделка',
        description: 'Официальное оформление всех документов, полная юридическая защита',
    },
    {
        icon: '✅',
        title: 'Опыт работы',
        description: 'Более 10 лет опыта работы с премиум и элитными автомобилями',
    },
];
const premiumBrands = [
    'Mercedes-Benz',
    'BMW',
    'Audi',
    'Porsche',
    'Lexus',
    'Volvo',
    'Infiniti',
    'Jaguar',
    'Land Rover',
    'Range Rover',
    'Tesla',
];
const faqs = [
    {
        question: 'Выкупаете ли вы элитные и премиум автомобили?',
        answer: 'Да, мы специализируемся на выкупе автомобилей всех классов, включая премиум и элитные. У нас есть опыт работы с такими марками как Mercedes-Benz, BMW, Audi, Porsche, Lexus и другими.',
    },
    {
        question: 'Как вы оцениваете премиум автомобили?',
        answer: 'Мы знаем специфику оценки премиум автомобилей. Учитываем марку, модель, год выпуска, комплектацию, состояние, историю обслуживания, рыночную стоимость. Предлагаем до 97% от рыночной стоимости.',
    },
    {
        question: 'Какую цену вы предлагаете за премиум автомобили?',
        answer: 'Мы предлагаем до 97% от рыночной стоимости премиум автомобилей. Цена зависит от марки, модели, года выпуска, комплектации, состояния и других факторов.',
    },
    {
        question: 'Сколько времени занимает выкуп премиум автомобиля?',
        answer: 'В среднем от звонка до получения денег проходит всего 2 часа. Мы приезжаем на место, осматриваем автомобиль, оформляем документы и сразу производим оплату.',
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Выкуп премиум и элитных автомобилей',
    description: 'Специализируемся на выкупе элитных и премиум автомобилей. Знаем специфику оценки таких автомобилей.',
    provider: {
        '@type': 'Organization',
        name: 'Выкуп авто | Московский Авто Альянс',
        url: baseUrl,
        telephone: phone1,
    },
    areaServed: [
        { '@type': 'City', name: 'Москва' },
        { '@type': 'State', name: 'Московская область' },
    ],
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
const PremiumCars = () => {
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: serviceSchema }), _jsx(SchemaMarkup, { schema: faqSchema }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center py-12 mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u0412\u044B\u043A\u0443\u043F \u043F\u0440\u0435\u043C\u0438\u0443\u043C \u0438 \u044D\u043B\u0438\u0442\u043D\u044B\u0445 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), _jsx("p", { className: "text-lg text-neutral-600 text-center max-w-[800px] leading-7", children: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0435\u043C\u0441\u044F \u043D\u0430 \u0432\u044B\u043A\u0443\u043F\u0435 \u044D\u043B\u0438\u0442\u043D\u044B\u0445 \u0438 \u043F\u0440\u0435\u043C\u0438\u0443\u043C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439. \u0417\u043D\u0430\u0435\u043C \u0441\u043F\u0435\u0446\u0438\u0444\u0438\u043A\u0443 \u043E\u0446\u0435\u043D\u043A\u0438 \u0442\u0430\u043A\u0438\u0445 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u0438 \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0443\u044E \u0446\u0435\u043D\u0443. \u0411\u043E\u043B\u0435\u0435 10 \u043B\u0435\u0442 \u043E\u043F\u044B\u0442\u0430 \u0440\u0430\u0431\u043E\u0442\u044B \u0441 \u043F\u0440\u0435\u043C\u0438\u0443\u043C \u043C\u0430\u0440\u043A\u0430\u043C\u0438." })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430" }), _jsx("div", { className: "flex flex-row flex-wrap gap-6", children: advantages.map((advantage, index) => (_jsxs(Card, { className: "flex-1 min-w-[250px] p-6 flex flex-col items-center", children: [_jsx("span", { className: "text-5xl mb-4", children: advantage.icon }), _jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-2 text-center", children: advantage.title }), _jsx("p", { className: "text-base text-neutral-600 text-center leading-6", children: advantage.description })] }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u041F\u0440\u0435\u043C\u0438\u0443\u043C \u043C\u0430\u0440\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u044B \u0432\u044B\u043A\u0443\u043F\u0430\u0435\u043C" }), _jsx("div", { className: "flex flex-row flex-wrap gap-4", children: premiumBrands.map((brand, index) => (_jsx(Card, { className: "p-4 min-w-[150px]", children: _jsx("p", { className: "text-base font-semibold text-neutral-900 text-center", children: brand }) }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-8 text-center", children: "\u0427\u0430\u0441\u0442\u043E \u0437\u0430\u0434\u0430\u0432\u0430\u0435\u043C\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B" }), _jsx("div", { className: "flex flex-col gap-4", children: faqs.map((faq, index) => (_jsxs(Card, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-neutral-900 mb-3", children: faq.question }), _jsx("p", { className: "text-base text-neutral-600 leading-6", children: faq.answer })] }, index))) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-4 text-center", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443 \u043F\u0440\u0435\u043C\u0438\u0443\u043C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" }), _jsx("p", { className: "text-base text-neutral-600 mb-6 text-center", children: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443, \u0438 \u043D\u0430\u0448 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u043E\u0446\u0435\u043D\u043A\u0438" }), _jsx(CarEvaluationForm, {})] }), _jsx(RelatedServices, { currentPath: "/services/premium-cars" })] })] }));
};
export default PremiumCars;
