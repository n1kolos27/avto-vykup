import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Card from '../components/ui/Card.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';
const services = [
    {
        icon: '💰',
        title: 'Выкуп автомобилей',
        description: 'Выкупаем легковые автомобили всех марок и моделей в любом состоянии. От бюджетных до премиум класса.',
        features: [
            'Все марки и модели',
            'Любое состояние',
            'Честная оценка',
            'Моментальная оплата',
        ],
        path: '/services/buyback-cars',
    },
    {
        icon: '⏰',
        title: 'Срочный выкуп',
        description: 'Срочный выкуп автомобилей за 2 часа. Идеально для тех, кому нужны деньги быстро.',
        features: [
            'Выкуп за 2 часа',
            'Моментальная оплата',
            'Выезд на место',
            'Работаем 9:00-22:00',
        ],
        path: '/services/urgent-buyback',
    },
    {
        icon: '🛡️',
        title: 'Выкуп битых автомобилей',
        description: 'Выкупаем битые и аварийные автомобили с любыми повреждениями. Оценка остаточной стоимости.',
        features: [
            'Любая степень повреждения',
            'Оценка остаточной стоимости',
            'Эвакуатор за наш счет',
            'Справедливая цена',
        ],
        path: '/services/damaged-cars',
    },
    {
        icon: '🛡️',
        title: 'Выкуп после ДТП',
        description: 'Выкупаем автомобили, побывавшие в авариях. Оцениваем остаточную стоимость и возможность восстановления.',
        features: [
            'Любая степень повреждения',
            'Оценка остаточной стоимости',
            'Возможность восстановления',
            'Справедливая цена',
        ],
        path: '/services/after-accident',
    },
    {
        icon: '📄',
        title: 'Выкуп кредитных автомобилей',
        description: 'Помогаем с выкупом автомобилей, находящихся в залоге. Оформляем перевод долга и все необходимые документы.',
        features: [
            'Помощь с банком',
            'Оформление перевода долга',
            'Погашение кредита',
            'Быстрое решение',
        ],
        path: '/services/credit-cars',
    },
    {
        icon: '🏆',
        title: 'Выкуп премиум автомобилей',
        description: 'Специализируемся на выкупе элитных и премиум автомобилей. Знаем специфику оценки таких автомобилей.',
        features: [
            'Премиум марки',
            'Элитные автомобили',
            'Профессиональная оценка',
            'Максимальная цена',
        ],
        path: '/services/premium-cars',
    },
    {
        icon: '🚛',
        title: 'Выкуп коммерческого транспорта',
        description: 'Специализируемся на выкупе грузовиков, микроавтобусов, спецтехники и другого коммерческого транспорта.',
        features: [
            'Грузовики',
            'Микроавтобусы',
            'Спецтехника',
            'Профессиональная оценка',
        ],
        path: '/services/buyback-cars',
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
            '@type': 'Service',
            name: service.title,
            description: service.description,
            provider: {
                '@type': 'Organization',
                name: 'Выкуп авто | Московский Авто Альянс',
                url: baseUrl,
            },
            areaServed: {
                '@type': 'City',
                name: 'Москва',
            },
            serviceType: 'Выкуп автомобилей',
        },
    })),
};
const Services = () => {
    const navigate = useNavigate();
    const handleLinkPress = (path) => {
        navigate(path);
    };
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: servicesSchema, id: "services-schema" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center mb-12 mt-4", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u041D\u0430\u0448\u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u043F\u043E \u0432\u044B\u043A\u0443\u043F\u0443 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), _jsx("p", { className: "text-lg text-neutral-600 text-center max-w-[800px] leading-6", children: "\u041F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0435\u043A\u0442\u0440 \u0443\u0441\u043B\u0443\u0433 \u043F\u043E \u0432\u044B\u043A\u0443\u043F\u0443 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u0432 \u041C\u043E\u0441\u043A\u0432\u0435 \u0438 \u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0443\u0436\u043D\u0443\u044E \u0443\u0441\u043B\u0443\u0433\u0443 \u0438 \u0443\u0437\u043D\u0430\u0439\u0442\u0435 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0438. \u041A\u0430\u0436\u0434\u0430\u044F \u0443\u0441\u043B\u0443\u0433\u0430 \u0438\u043C\u0435\u0435\u0442 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0441 \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435\u0439, \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u043C \u0440\u0430\u0431\u043E\u0442\u044B \u0438 FAQ." })] }), _jsx("div", { className: "flex flex-row flex-wrap gap-6 mb-12", children: services.map((service, index) => (_jsx(Card, { className: "flex-1 min-w-[300px] p-6 mb-0", children: _jsxs("button", { onClick: () => navigate(service.path), className: "w-full text-left hover:opacity-90 transition-opacity", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4", children: _jsx("span", { className: "text-3xl", children: service.icon }) }), _jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-3", children: service.title }), _jsx("p", { className: "text-base text-neutral-600 leading-6 mb-4", children: service.description }), _jsx("div", { className: "flex flex-col gap-2 mb-4", children: service.features.map((feature, idx) => (_jsxs("div", { className: "flex flex-row items-center gap-2", children: [_jsx("span", { className: "text-primary-600 text-sm font-bold", children: "\u2713" }), _jsx("span", { className: "text-sm text-neutral-600 flex-1", children: feature })] }, idx))) }), _jsx("div", { className: "border-t border-neutral-200 pt-4 mt-4", children: _jsx("span", { className: "text-sm font-semibold text-primary-600", children: "\u0423\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u2192" }) })] }) }, index))) }), _jsxs(Card, { className: "p-8 mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-6", children: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438" }), _jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-3", children: "\u041F\u043E\u043C\u043E\u0449\u044C \u0441 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u043C\u0438" }), _jsxs("p", { className: "text-base text-neutral-600 leading-6", children: ["\u041F\u043E\u043C\u043E\u0433\u0430\u0435\u043C \u043E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0432\u0441\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0434\u043B\u044F \u0432\u044B\u043A\u0443\u043F\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044C \u043D\u0430 \u043D\u0430\u043B\u0438\u0447\u0438\u0435 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439, \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u043C \u0441 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435\u043C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432. \u0423\u0437\u043D\u0430\u0439\u0442\u0435,", ' ', _jsx("button", { onClick: () => handleLinkPress('/documents'), className: "text-primary-600 underline", children: "\u043A\u0430\u043A\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u043D\u0443\u0436\u043D\u044B" }), "."] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-3", children: "\u042D\u0432\u0430\u043A\u0443\u0430\u0442\u043E\u0440" }), _jsx("p", { className: "text-base text-neutral-600 leading-6", children: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0443\u0435\u043C \u044D\u0432\u0430\u043A\u0443\u0430\u0442\u043E\u0440 \u0434\u043B\u044F \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F, \u0435\u0441\u043B\u0438 \u043E\u043D \u043D\u0435 \u043D\u0430 \u0445\u043E\u0434\u0443 \u0438\u043B\u0438 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0434\u0430\u043B\u0435\u043A\u043E. \u0423\u0441\u043B\u0443\u0433\u0430 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0437\u0430 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0443\u044E \u043F\u043B\u0430\u0442\u0443." })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-3", children: "\u041A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438" }), _jsxs("p", { className: "text-base text-neutral-600 leading-6", children: ["\u041F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u043C \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0435 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438 \u043F\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u0430\u043C \u0432\u044B\u043A\u0443\u043F\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F, \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432, \u043E\u0446\u0435\u043D\u043A\u0438 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438.", ' ', _jsx("button", { onClick: () => handleLinkPress('/faq'), className: "text-primary-600 underline", children: "\u041D\u0430\u0439\u0434\u0438\u0442\u0435 \u043E\u0442\u0432\u0435\u0442\u044B \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043E \u0432\u044B\u043A\u0443\u043F\u0435 \u0430\u0432\u0442\u043E \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 FAQ" }), "."] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "text-xl font-semibold text-neutral-900 mb-3", children: "\u0412\u044B\u0435\u0437\u0434 \u043D\u0430 \u043C\u0435\u0441\u0442\u043E" }), _jsxs("p", { className: "text-base text-neutral-600 leading-6", children: ["\u041D\u0430\u0448 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u0438\u0435\u0445\u0430\u0442\u044C \u043A \u0432\u0430\u043C \u0432 \u043B\u044E\u0431\u043E\u0435 \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E \u0432 \u041C\u043E\u0441\u043A\u0432\u0435 \u0438 \u041C\u041E \u0434\u043B\u044F \u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F \u0438 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0441\u0434\u0435\u043B\u043A\u0438.", ' ', _jsx("button", { onClick: () => handleLinkPress('/contacts'), className: "text-primary-600 underline", children: "\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438" }), ' ', "\u0434\u043B\u044F \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u044F \u0432\u0440\u0435\u043C\u0435\u043D\u0438."] })] })] })] })] })] }));
};
export default Services;
