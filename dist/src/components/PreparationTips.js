import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Card from './ui/Card';
const tips = [
    {
        title: 'Мойка и детализация',
        description: 'Тщательно вымойте автомобиль снаружи и внутри. Чистый автомобиль производит лучшее впечатление и может увеличить стоимость на 3-5%.',
        impact: '+3-5%',
    },
    {
        title: 'Устранение мелких дефектов',
        description: 'Исправьте мелкие царапины и сколы. Это недорого, но может значительно улучшить внешний вид и оценку.',
        impact: '+5-10%',
    },
    {
        title: 'Техническое обслуживание',
        description: 'Проведите ТО, замените масло, проверьте все жидкости. Документы о недавнем обслуживании повышают доверие.',
        impact: '+5-8%',
    },
    {
        title: 'Сбор документов',
        description: 'Подготовьте все документы: ПТС, СТС, сервисную книжку, чеки на ремонты. Полный пакет документов увеличивает стоимость.',
        impact: '+5-15%',
    },
    {
        title: 'Удаление личных вещей',
        description: 'Уберите все личные вещи из салона и багажника. Чистый, пустой автомобиль выглядит более привлекательно.',
        impact: '+2-3%',
    },
    {
        title: 'Проверка всех систем',
        description: 'Убедитесь, что все системы работают: кондиционер, аудиосистема, электроника. Неисправности снижают стоимость.',
        impact: '+3-7%',
    },
];
const PreparationTips = () => {
    return (_jsxs(Card, { className: "p-6 m-4 bg-primary-50", children: [_jsx("h3", { className: "text-2xl font-bold text-neutral-900 mb-6", children: "\u041A\u0430\u043A \u0443\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F \u043F\u0435\u0440\u0435\u0434 \u043F\u0440\u043E\u0434\u0430\u0436\u0435\u0439" }), _jsx("div", { className: "flex flex-col gap-4 mb-6", children: tips.map((tip, index) => (_jsx("div", { className: "bg-white rounded-lg p-4", children: _jsxs("div", { className: "flex flex-row justify-between items-start", children: [_jsxs("div", { className: "flex flex-row flex-1 mr-4", children: [_jsx("span", { className: "text-xl text-primary-600 mr-3 mt-0.5", children: "\u2713" }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "text-base font-semibold text-neutral-900 mb-1", children: tip.title }), _jsx("p", { className: "text-sm text-neutral-600 leading-5", children: tip.description })] })] }), _jsx("div", { className: "bg-success-100 px-3 py-1.5 rounded-2xl", children: _jsx("span", { className: "text-sm font-semibold text-success-800", children: tip.impact }) })] }) }, index))) }), _jsx("div", { className: "bg-white rounded-lg p-4 border-2 border-primary-200", children: _jsxs("p", { className: "text-sm text-neutral-700 leading-5", children: [_jsx("strong", { children: "\u0412\u0430\u0436\u043D\u043E:" }), " \u0421\u043B\u0435\u0434\u0443\u044F \u0432\u0441\u0435\u043C \u044D\u0442\u0438\u043C \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F\u043C, \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0443\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F \u043D\u0430 20-40%. \u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438 \u0432 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0443 \u043E\u0431\u044B\u0447\u043D\u043E \u043E\u043A\u0443\u043F\u0430\u044E\u0442\u0441\u044F \u043C\u043D\u043E\u0433\u043E\u043A\u0440\u0430\u0442\u043D\u043E."] }) })] }));
};
export default PreparationTips;
