import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Card from './ui/Card';
const factors = [
    {
        name: 'Техническое состояние',
        impact: 'positive',
        description: 'Автомобиль в отличном техническом состоянии без необходимости ремонта стоит на 20-30% дороже.',
        tip: 'Проведите предпродажную подготовку: замените масло, проверьте все системы.',
    },
    {
        name: 'Пробег',
        impact: 'negative',
        description: 'Высокий пробег снижает стоимость. Нормальный пробег: 15,000-20,000 км в год.',
        tip: 'Если пробег высокий, но машина в хорошем состоянии, это не критично.',
    },
    {
        name: 'Внешний вид',
        impact: 'positive',
        description: 'Чистый, ухоженный автомобиль без царапин и вмятин оценивается выше на 5-10%.',
        tip: 'Помойте машину, уберите личные вещи, приведите салон в порядок.',
    },
    {
        name: 'Комплектация',
        impact: 'positive',
        description: 'Дополнительные опции (навигация, кожаный салон, камера заднего вида) увеличивают стоимость.',
        tip: 'Укажите все дополнительные опции при оценке - они учитываются в цене.',
    },
    {
        name: 'История обслуживания',
        impact: 'positive',
        description: 'Наличие полной истории ТО и обслуживания у официального дилера повышает стоимость на 5-15%.',
        tip: 'Сохраняйте все документы о ремонтах и обслуживании - они подтверждают уход за авто.',
    },
    {
        name: 'Возраст автомобиля',
        impact: 'negative',
        description: 'С каждым годом автомобиль теряет в стоимости из-за естественной амортизации.',
        tip: 'Чем новее автомобиль, тем выше его остаточная стоимость.',
    },
    {
        name: 'Популярность марки',
        impact: 'positive',
        description: 'Популярные марки (Toyota, BMW, Mercedes) имеют лучшую ликвидность и сохраняют стоимость.',
        tip: 'Популярные модели легче продать и они стоят дороже.',
    },
    {
        name: 'Сезонность',
        impact: 'neutral',
        description: 'Весной и летом спрос на автомобили выше, что может немного повлиять на цену.',
        tip: 'Учитывайте сезон при планировании продажи.',
    },
];
const PriceFactors = () => {
    const getImpactIcon = (impact) => {
        switch (impact) {
            case 'positive':
                return '📈';
            case 'negative':
                return '📉';
            default:
                return 'ℹ️';
        }
    };
    const getImpactColor = (impact) => {
        switch (impact) {
            case 'positive':
                return 'text-success-500';
            case 'negative':
                return 'text-error-500';
            default:
                return 'text-info-500';
        }
    };
    return (_jsxs(Card, { className: "p-6 m-4", children: [_jsxs("div", { className: "flex flex-row items-center mb-6", children: [_jsx("span", { className: "text-2xl mr-3", children: "\u2139\uFE0F" }), _jsx("h3", { className: "text-2xl font-bold text-neutral-900 flex-1", children: "\u0424\u0430\u043A\u0442\u043E\u0440\u044B, \u0432\u043B\u0438\u044F\u044E\u0449\u0438\u0435 \u043D\u0430 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" })] }), _jsx("div", { className: "flex flex-col gap-4", children: factors.map((factor, index) => (_jsxs("div", { className: "border border-neutral-200 rounded-lg p-4 bg-white", children: [_jsxs("div", { className: "flex flex-row justify-between items-start mb-2", children: [_jsx("h4", { className: "text-base font-semibold text-neutral-900 flex-1 mr-2", children: factor.name }), _jsx("span", { className: `text-xl ${getImpactColor(factor.impact)}`, children: getImpactIcon(factor.impact) })] }), _jsx("p", { className: "text-sm text-neutral-600 leading-5 mb-2", children: factor.description }), factor.tip && (_jsx("div", { className: "bg-primary-50 border-l-4 border-primary-600 p-3 mt-2", children: _jsxs("p", { className: "text-xs font-semibold text-info-800 leading-5", children: ["\uD83D\uDCA1 \u0421\u043E\u0432\u0435\u0442: ", factor.tip] }) }))] }, index))) })] }));
};
export default PriceFactors;
