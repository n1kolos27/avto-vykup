import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import Card from './ui/Card';
import Button from './ui/Button';
const defaultServices = [
    {
        title: 'Срочный выкуп авто за 2 часа',
        description: 'Выкуп автомобилей за 2 часа с момента обращения. Моментальная оценка и оплата.',
        path: '/services/urgent-buyback',
        icon: '⚡',
    },
    {
        title: 'Выкуп битых авто',
        description: 'Выкупаем битые и поврежденные автомобили. Справедливая оценка остаточной стоимости.',
        path: '/services/damaged-cars',
        icon: '🔧',
    },
    {
        title: 'Выкуп после ДТП',
        description: 'Выкуп автомобилей после ДТП. Быстрая оценка и выкуп поврежденных в аварии авто.',
        path: '/services/after-accident',
        icon: '🚗',
    },
    {
        title: 'Выкуп кредитных авто',
        description: 'Выкуп автомобилей в кредите или залоге. Помогаем решить вопрос с банком.',
        path: '/services/credit-cars',
        icon: '💳',
    },
    {
        title: 'Выкуп премиум авто',
        description: 'Специализируемся на выкупе элитных и премиум автомобилей. Максимальная цена.',
        path: '/services/premium-cars',
        icon: '⭐',
    },
    {
        title: 'Выкуп автомобилей',
        description: 'Выкупаем легковые автомобили всех марок и моделей в любом состоянии.',
        path: '/services/buyback-cars',
        icon: '🚙',
    },
];
const RelatedServices = ({ currentPath, services = defaultServices }) => {
    const navigate = useNavigate();
    // Фильтруем текущую услугу и берем 3 связанные
    const relatedServices = services
        .filter(service => service.path !== currentPath)
        .slice(0, 3);
    if (relatedServices.length === 0) {
        return null;
    }
    return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-6 text-center", children: "\u0414\u0440\u0443\u0433\u0438\u0435 \u043D\u0430\u0448\u0438 \u0443\u0441\u043B\u0443\u0433\u0438" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: relatedServices.map((service) => (_jsxs(Card, { className: "p-6 hover:shadow-lg transition-shadow flex flex-col", children: [_jsx("div", { className: "text-4xl mb-4 text-center", children: service.icon }), _jsx("h3", { className: "text-xl font-bold text-neutral-900 mb-3 text-center leading-tight", children: service.title }), _jsx("p", { className: "text-sm text-neutral-600 mb-4 flex-1 text-center line-clamp-3", children: service.description }), _jsx(Button, { onClick: () => navigate(service.path), variant: "secondary", className: "w-full", children: "\u0423\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435" })] }, service.path))) })] }));
};
export default RelatedServices;
