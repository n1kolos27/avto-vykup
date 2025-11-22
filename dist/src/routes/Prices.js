import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Card from '../components/ui/Card.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';
const factors = [
    {
        title: 'Марка и модель',
        impact: 'Высокий',
        description: 'Популярные марки и модели имеют лучшую ликвидность и сохраняют стоимость. Премиум-бренды также ценятся выше.',
    },
    {
        title: 'Год выпуска',
        impact: 'Высокий',
        description: 'Чем новее автомобиль, тем выше его стоимость. С каждым годом автомобиль теряет в цене из-за амортизации.',
    },
    {
        title: 'Пробег',
        impact: 'Средний',
        description: 'Высокий пробег снижает стоимость. Нормальный пробег: 15,000-20,000 км в год. Превышение нормы снижает цену.',
    },
    {
        title: 'Техническое состояние',
        impact: 'Очень высокий',
        description: 'Автомобиль в отличном состоянии стоит на 20-30% дороже. Неисправности и необходимость ремонта снижают стоимость.',
    },
    {
        title: 'Внешний вид',
        impact: 'Средний',
        description: 'Чистый, ухоженный автомобиль без царапин и вмятин оценивается выше на 5-10%.',
    },
    {
        title: 'Комплектация',
        impact: 'Средний',
        description: 'Дополнительные опции (навигация, кожаный салон, камера) увеличивают стоимость на 3-8%.',
    },
    {
        title: 'История обслуживания',
        impact: 'Средний',
        description: 'Наличие полной истории ТО повышает стоимость на 5-15%. Документы о ремонтах подтверждают уход.',
    },
    {
        title: 'Рыночная стоимость',
        impact: 'Очень высокий',
        description: 'Мы ориентируемся на актуальные рыночные цены на аналогичные автомобили. Цена зависит от спроса и предложения.',
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const pricesPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Цены на выкуп автомобилей',
    description: 'Прозрачная информация о ценообразовании при выкупе автомобилей. Факторы оценки стоимости.',
    url: `${baseUrl}/prices`,
    mainEntity: {
        '@type': 'Service',
        name: 'Выкуп автомобилей',
        provider: {
            '@type': 'Organization',
            name: 'Выкуп авто | Московский Авто Альянс',
            url: baseUrl,
        },
        areaServed: [
            {
                '@type': 'City',
                name: 'Москва',
            },
            {
                '@type': 'State',
                name: 'Московская область',
            },
        ],
    },
};
const Prices = () => {
    const navigate = useNavigate();
    const getImpactColor = (impact) => {
        if (impact === 'Очень высокий')
            return 'text-error-500 bg-error-100';
        if (impact === 'Высокий')
            return 'text-warning-600 bg-warning-100';
        return 'text-info-600 bg-info-100';
    };
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: pricesPageSchema }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center py-12 mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u0426\u0435\u043D\u044B \u043D\u0430 \u0432\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), _jsx("p", { className: "text-lg text-neutral-600 text-center mb-4", children: "\u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0442\u043E\u043C, \u043A\u0430\u043A \u043C\u044B \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u043C \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" }), _jsxs("p", { className: "text-sm text-neutral-600 text-center max-w-[600px]", children: ["\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E \u043D\u0430\u0448\u0438\u0445 \u0443\u0441\u043B\u0443\u0433\u0430\u0445:", ' ', _jsx("button", { onClick: () => navigate('/services/urgent-buyback'), className: "text-primary-600 underline", children: "\u0441\u0440\u043E\u0447\u043D\u044B\u0439 \u0432\u044B\u043A\u0443\u043F" }), ",", ' ', _jsx("button", { onClick: () => navigate('/services/damaged-cars'), className: "text-primary-600 underline", children: "\u0432\u044B\u043A\u0443\u043F \u0431\u0438\u0442\u044B\u0445 \u0430\u0432\u0442\u043E" }), ",", ' ', _jsx("button", { onClick: () => navigate('/services/after-accident'), className: "text-primary-600 underline", children: "\u0432\u044B\u043A\u0443\u043F \u043F\u043E\u0441\u043B\u0435 \u0414\u0422\u041F" }), ",", ' ', _jsx("button", { onClick: () => navigate('/services/credit-cars'), className: "text-primary-600 underline", children: "\u0432\u044B\u043A\u0443\u043F \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u044B\u0445 \u0430\u0432\u0442\u043E" }), ",", ' ', _jsx("button", { onClick: () => navigate('/services/premium-cars'), className: "text-primary-600 underline", children: "\u0432\u044B\u043A\u0443\u043F \u043F\u0440\u0435\u043C\u0438\u0443\u043C \u0430\u0432\u0442\u043E" }), "."] })] }), _jsxs(Card, { className: "p-8 mb-8", children: [_jsxs("div", { className: "flex flex-row items-center gap-3 mb-6", children: [_jsx("span", { className: "text-3xl", children: "\uD83D\uDCB0" }), _jsx("h2", { className: "text-3xl font-bold text-neutral-900", children: "\u041A\u0430\u043A \u043C\u044B \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u043C \u0446\u0435\u043D\u0443" })] }), _jsxs("p", { className: "text-base text-neutral-700 leading-7 mb-4", children: ["\u041C\u044B \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C \u0441\u043F\u0440\u0430\u0432\u0435\u0434\u043B\u0438\u0432\u0443\u044E \u0440\u044B\u043D\u043E\u0447\u043D\u0443\u044E \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F. \u041D\u0430\u0448\u0430 \u043E\u0446\u0435\u043D\u043A\u0430 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0430 \u043D\u0430 \u043C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u0435 \u0444\u0430\u043A\u0442\u043E\u0440\u043E\u0432 \u0438 \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u043F\u0440\u043E\u0434\u0430\u0436\u0430\u0445 \u0430\u043D\u0430\u043B\u043E\u0433\u0438\u0447\u043D\u044B\u0445 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u043D\u0430 \u0440\u044B\u043D\u043A\u0435. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043D\u0430\u0448", ' ', _jsx("button", { onClick: () => navigate('/calculator'), className: "text-primary-600 underline", children: "\u043E\u043D\u043B\u0430\u0439\u043D-\u043A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440" }), ' ', "\u0434\u043B\u044F \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u043E\u0446\u0435\u043D\u043A\u0438."] }), _jsxs("p", { className: "text-base text-neutral-700 leading-7 mb-4", children: ["\u041C\u044B \u043D\u0435 \u0437\u0430\u043D\u0438\u0436\u0430\u0435\u043C \u0446\u0435\u043D\u044B \u0438 \u043D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0441\u043A\u0440\u044B\u0442\u044B\u0435 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438. \u0426\u0435\u043D\u0430, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u043C\u044B \u043D\u0430\u0437\u044B\u0432\u0430\u0435\u043C, - \u044D\u0442\u043E \u0446\u0435\u043D\u0430, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u0432\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0440\u0430\u0441\u0445\u043E\u0434\u043E\u0432 \u0438\u043B\u0438 \u0432\u044B\u0447\u0435\u0442\u043E\u0432 \u043D\u0435\u0442.", ' ', _jsx("button", { onClick: () => navigate('/guarantees'), className: "text-primary-600 underline", children: "\u041E\u0437\u043D\u0430\u043A\u043E\u043C\u044C\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u0448\u0438\u043C\u0438 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F\u043C\u0438 \u043F\u0440\u0438 \u0432\u044B\u043A\u0443\u043F\u0435 \u0430\u0432\u0442\u043E" }), "."] }), _jsxs("p", { className: "text-base text-neutral-700 leading-7", children: ["\u041D\u0430\u0448\u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B \u0438\u043C\u0435\u044E\u0442 \u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u043E\u043F\u044B\u0442 \u0438 \u0437\u043D\u0430\u044E\u0442 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0446\u0435\u043D\u044B \u043D\u0430 \u0440\u044B\u043D\u043A\u0435. \u041C\u044B \u0443\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u043C \u0432\u0441\u0435 \u0444\u0430\u043A\u0442\u043E\u0440\u044B \u0438 \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C \u043E\u0431\u044A\u0435\u043A\u0442\u0438\u0432\u043D\u0443\u044E \u043E\u0446\u0435\u043D\u043A\u0443, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043E\u0442\u0440\u0430\u0436\u0430\u0435\u0442 \u0440\u0435\u0430\u043B\u044C\u043D\u0443\u044E \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F.", ' ', _jsx("button", { onClick: () => navigate('/services'), className: "text-primary-600 underline", children: "\u041E\u0437\u043D\u0430\u043A\u043E\u043C\u044C\u0442\u0435\u0441\u044C \u0441 \u043F\u043E\u043B\u043D\u044B\u043C \u0441\u043F\u0435\u043A\u0442\u0440\u043E\u043C \u0443\u0441\u043B\u0443\u0433 \u043F\u043E \u0432\u044B\u043A\u0443\u043F\u0443 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), "."] })] }), _jsxs(Card, { className: "p-8 mb-8", children: [_jsxs("div", { className: "flex flex-row items-center gap-3 mb-6", children: [_jsx("span", { className: "text-3xl", children: "\uD83D\uDCC8" }), _jsx("h2", { className: "text-3xl font-bold text-neutral-900", children: "\u0424\u0430\u043A\u0442\u043E\u0440\u044B, \u0432\u043B\u0438\u044F\u044E\u0449\u0438\u0435 \u043D\u0430 \u0446\u0435\u043D\u0443" })] }), _jsx("div", { className: "flex flex-col gap-4", children: factors.map((factor, index) => (_jsxs(Card, { className: "p-4 border border-neutral-200", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-2", children: [_jsx("h3", { className: "text-lg font-semibold text-neutral-900 flex-1", children: factor.title }), _jsx("div", { className: `px-3 py-1 rounded-xl ${getImpactColor(factor.impact)}`, children: _jsx("span", { className: "text-sm font-medium", children: factor.impact }) })] }), _jsx("p", { className: "text-base text-neutral-600 leading-6", children: factor.description })] }, index))) })] }), _jsxs(Card, { className: "bg-warning-50 p-8 mb-8 border-2 border-warning-200", children: [_jsxs("div", { className: "flex flex-row items-center gap-3 mb-6", children: [_jsx("span", { className: "text-3xl", children: "\u2139\uFE0F" }), _jsx("h2", { className: "text-3xl font-bold text-neutral-900", children: "\u0412\u0430\u0436\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F" })] }), _jsx("div", { className: "flex flex-col gap-3", children: [
                                    'Мы не берем комиссию - цена, которую мы называем, это цена, которую вы получите',
                                    'Предварительная оценка по телефону или через калькулятор может отличаться от финальной цены',
                                    'Точную цену можно узнать только после осмотра автомобиля нашим специалистом',
                                    'Мы всегда готовы обсудить цену и объяснить, почему она именно такая',
                                    'Если вы найдете более выгодное предложение, мы готовы обсудить цену',
                                ].map((item) => (_jsxs("div", { className: "flex flex-row items-start gap-3", children: [_jsx("span", { className: "text-xl text-primary-600 mt-0.5", children: "\u2713" }), _jsx("span", { className: "text-base text-neutral-700 flex-1 leading-6", children: item })] }, item))) })] }), _jsxs("div", { className: "bg-primary-600 rounded-xl p-8 mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "\u041F\u043E\u0447\u0435\u043C\u0443 \u043D\u0430\u0448\u0430 \u0446\u0435\u043D\u0430 \u0441\u043F\u0440\u0430\u0432\u0435\u0434\u043B\u0438\u0432\u0430" }), _jsx("div", { className: "flex flex-col gap-3", children: [
                                    'Мы ориентируемся на актуальные рыночные цены на аналогичные автомобили',
                                    'Учитываем все факторы: состояние, пробег, комплектацию, историю обслуживания',
                                    'Наши специалисты имеют большой опыт и знают реальные цены на рынке',
                                    'Мы не занижаем цены и не используем скрытые комиссии',
                                    'Цена, которую мы называем, - это цена, которую вы получите',
                                ].map((item) => (_jsxs("div", { className: "flex flex-row items-start gap-3", children: [_jsx("span", { className: "text-xl text-white font-bold mt-0.5", children: "\u2713" }), _jsx("span", { className: "text-lg text-white flex-1 leading-7", children: item })] }, item))) })] })] })] }));
};
export default Prices;
