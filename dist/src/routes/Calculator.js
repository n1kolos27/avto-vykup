import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import Calculator from '../components/Calculator.js';
import Breadcrumbs from '../components/Breadcrumbs.js';
import PriceFactors from '../components/PriceFactors.js';
import PreparationTips from '../components/PreparationTips.js';
import CarEvaluationForm from '../components/CarEvaluationForm.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';
const baseUrl = APP_CONFIG.BASE_URL;
const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Калькулятор стоимости автомобиля',
    description: 'Онлайн калькулятор для расчета предварительной стоимости автомобиля. Учитывает марку, модель, год выпуска, пробег и состояние.',
    url: `${baseUrl}/calculator`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'RUB',
    },
    featureList: [
        'Расчет стоимости автомобиля',
        'Учет марки и модели',
        'Учет года выпуска',
        'Учет пробега',
        'Учет состояния',
        'Мгновенный результат',
    ],
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    provider: {
        '@type': 'Organization',
        name: 'Выкуп авто | Московский Авто Альянс',
        url: baseUrl,
    },
};
const CalculatorPage = () => {
    const navigate = useNavigate();
    const handleLinkPress = (path) => {
        navigate(path);
    };
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: webApplicationSchema, id: "calculator-schema" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center mb-8 mt-4", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u041A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" }), _jsxs("p", { className: "text-base text-neutral-600 text-center max-w-[800px] leading-6", children: ["\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u0443\u044E \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F \u0437\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0438\u043D\u0443\u0442. \u0422\u043E\u0447\u043D\u0443\u044E \u0446\u0435\u043D\u0443 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442 \u043D\u0430\u0448 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u043F\u0440\u0438 \u043E\u0441\u043C\u043E\u0442\u0440\u0435.", ' ', _jsx("button", { onClick: () => handleLinkPress('/prices'), className: "text-primary-600 underline", children: "\u0423\u0437\u043D\u0430\u0439\u0442\u0435, \u043A\u0430\u043A \u043C\u044B \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u043C \u0446\u0435\u043D\u0443 \u043F\u0440\u0438 \u0432\u044B\u043A\u0443\u043F\u0435 \u0430\u0432\u0442\u043E" }), ' ', "\u0438", ' ', _jsx("button", { onClick: () => handleLinkPress('/how-we-work'), className: "text-primary-600 underline", children: "\u043E\u0437\u043D\u0430\u043A\u043E\u043C\u044C\u0442\u0435\u0441\u044C \u0441 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u043C \u0432\u044B\u043A\u0443\u043F\u0430 \u0437\u0430 4 \u0448\u0430\u0433\u0430" }), ". \u0422\u0430\u043A\u0436\u0435 \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C", ' ', _jsx("button", { onClick: () => handleLinkPress('/services/urgent-buyback'), className: "text-primary-600 underline", children: "\u0441\u0440\u043E\u0447\u043D\u044B\u0439 \u0432\u044B\u043A\u0443\u043F \u0437\u0430 2 \u0447\u0430\u0441\u0430" }), ' ', "\u0438", ' ', _jsx("button", { onClick: () => handleLinkPress('/car-brands'), className: "text-primary-600 underline", children: "\u0432\u044B\u043A\u0443\u043F \u0432\u0441\u0435\u0445 \u043C\u0430\u0440\u043E\u043A \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), "."] })] }), _jsx("div", { className: "mb-12", children: _jsx(Calculator, {}) }), _jsxs("div", { className: "flex flex-col gap-6 mb-12", children: [_jsx(PriceFactors, {}), _jsx(PreparationTips, {})] }), _jsxs("div", { className: "mb-12", id: "contact-form", children: [_jsxs("div", { className: "flex flex-col items-center mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-3 text-center", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0442\u043E\u0447\u043D\u0443\u044E \u043E\u0446\u0435\u043D\u043A\u0443" }), _jsx("p", { className: "text-base text-neutral-600 text-center max-w-[600px]", children: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443, \u0438 \u043D\u0430\u0448 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u0443\u0442\u043E\u0447\u043D\u0435\u043D\u0438\u044F \u0434\u0435\u0442\u0430\u043B\u0435\u0439" })] }), _jsx(CarEvaluationForm, {})] })] })] }));
};
export default CalculatorPage;
