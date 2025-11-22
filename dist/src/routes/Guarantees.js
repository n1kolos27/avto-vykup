import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Card from '../components/ui/Card.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';
const guarantees = [
    {
        icon: '🛡️',
        title: 'Юридическая безопасность',
        description: 'Все сделки оформляются официально с соблюдением всех требований законодательства. Вы получаете полную юридическую защиту и гарантию законности сделки.',
        details: [
            'Официальное оформление всех документов',
            'Соблюдение всех требований законодательства',
            'Полная юридическая защита',
            'Проверка автомобиля на ограничения',
        ],
    },
    {
        icon: '📄',
        title: 'Прозрачность документов',
        description: 'Все документы оформляются в вашем присутствии. Вы видите каждый шаг процесса и можете задать любые вопросы. Никаких скрытых условий или дополнительных платежей.',
        details: [
            'Оформление документов в вашем присутствии',
            'Прозрачные условия сделки',
            'Возможность задать любые вопросы',
            'Отсутствие скрытых платежей',
        ],
    },
    {
        icon: '🔒',
        title: 'Защита от мошенников',
        description: 'Мы работаем официально, имеем все необходимые документы и лицензии. Ваши данные и деньги в полной безопасности. Мы не передаем информацию третьим лицам.',
        details: [
            'Официальная деятельность',
            'Все необходимые лицензии',
            'Защита персональных данных',
            'Безопасность финансовых операций',
        ],
    },
    {
        icon: '🏆',
        title: 'Гарантия честной цены',
        description: 'Мы предлагаем справедливую рыночную стоимость автомобиля. Если вы найдете более выгодное предложение, мы готовы обсудить цену. Никаких скрытых комиссий или занижения цен.',
        details: [
            'Справедливая рыночная цена',
            'Отсутствие скрытых комиссий',
            'Готовность к обсуждению цены',
            'Прозрачное ценообразование',
        ],
    },
    {
        icon: '✅',
        title: 'Гарантия скорости',
        description: 'Мы гарантируем быструю обработку заявки и оформление сделки. В среднем от звонка до получения денег проходит всего 2 часа. Без долгих ожиданий и проволочек.',
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
const Guarantees = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: guaranteesPageSchema }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center py-12 mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u041D\u0430\u0448\u0438 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0438" }), _jsx("p", { className: "text-lg text-neutral-600 text-center", children: "\u0427\u0442\u043E \u043C\u044B \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u0443\u0435\u043C \u043F\u0440\u0438 \u0432\u044B\u043A\u0443\u043F\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" })] }), _jsx("div", { className: "flex flex-col gap-8 mb-8", children: guarantees.map((guarantee, index) => (_jsx(Card, { className: "p-8", children: _jsxs("div", { className: "flex flex-row gap-4", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-3xl", children: guarantee.icon }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-2xl font-bold text-neutral-900 mb-3", children: guarantee.title }), _jsx("p", { className: "text-base text-neutral-600 leading-6 mb-4", children: guarantee.description }), _jsx("div", { className: "flex flex-col gap-2", children: guarantee.details.map((detail, idx) => (_jsxs("div", { className: "flex flex-row items-start gap-2", children: [_jsx("span", { className: "text-primary-600 text-base mt-0.5", children: "\u2713" }), _jsx("span", { className: "text-base text-neutral-700 flex-1", children: detail })] }, idx))) })] })] }) }, index))) }), _jsxs("div", { className: "bg-primary-600 rounded-xl p-8 mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "\u041D\u0430\u0448\u0435 \u043E\u0431\u0435\u0449\u0430\u043D\u0438\u0435" }), _jsxs("p", { className: "text-lg text-white mb-6 leading-7", children: ["\u041C\u044B \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u0443\u0435\u043C, \u0447\u0442\u043E \u043A\u0430\u0436\u0434\u0430\u044F \u0441\u0434\u0435\u043B\u043A\u0430 \u0431\u0443\u0434\u0435\u0442 \u043F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u0430 \u0447\u0435\u0441\u0442\u043D\u043E, \u0431\u044B\u0441\u0442\u0440\u043E \u0438 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E. \u0412\u0430\u0448\u0435 \u0434\u043E\u0432\u0435\u0440\u0438\u0435 - \u044D\u0442\u043E \u043D\u0430\u0448\u0430 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u044F, \u0438 \u043C\u044B \u0434\u043E\u0440\u043E\u0436\u0438\u043C \u0435\u044E.", ' ', _jsx("button", { onClick: () => navigate('/reviews'), className: "underline", children: "\u041F\u0440\u043E\u0447\u0438\u0442\u0430\u0439\u0442\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u043E \u0432\u044B\u043A\u0443\u043F\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), ' ', "\u0438", ' ', _jsx("button", { onClick: () => navigate('/why-us'), className: "underline", children: "\u0443\u0437\u043D\u0430\u0439\u0442\u0435 \u043A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442\u043D\u044B\u0435 \u043F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430 \u043D\u0430\u0448\u0435\u0439 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438" }), "."] }), _jsx("div", { className: "flex flex-col gap-3", children: [
                                    'Мы всегда выполняем свои обещания и соблюдаем все договоренности',
                                    'Вы можете в любой момент отказаться от сделки без каких-либо обязательств',
                                    'Мы всегда готовы ответить на ваши вопросы и объяснить все детали',
                                    'Наша цель - сделать процесс продажи автомобиля максимально простым и выгодным для вас',
                                ].map((item) => (_jsxs("div", { className: "flex flex-row items-start gap-3", children: [_jsx("span", { className: "text-xl text-white font-bold mt-0.5", children: "\u2713" }), _jsx("span", { className: "text-lg text-white flex-1 leading-7", children: item })] }, item))) })] })] })] }));
};
export default Guarantees;
