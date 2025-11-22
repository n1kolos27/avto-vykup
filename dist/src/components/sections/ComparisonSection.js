import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Card from '../ui/Card';
const tabs = [
    { id: 'self', label: 'ПРОДАЖА СВОИМИ СИЛАМИ' },
    { id: 'us', label: 'ПРОДАЖА НАМ', isRecommended: true },
    { id: 'auction', label: 'АВТОАУКЦИОНЫ' },
];
const comparisonData = {
    self: {
        pros: [
            'Возможность получить максимальную цену',
            'Полный контроль над процессом продажи',
            'Прямой контакт с покупателем',
        ],
        cons: [
            'Долгий процесс поиска покупателя (1-2 месяца)',
            'Много времени на показы и переговоры',
            'Риск встреч с недобросовестными покупателями',
            'Нужно самому оформлять документы',
            'Риск мошенничества',
            'Нет гарантии быстрой продажи',
        ],
    },
    us: {
        pros: [
            'Сделка за 2 часа от звонка до получения денег',
            'Честная рыночная цена (до 97% от рыночной стоимости)',
            'Моментальная оплата наличными или на карту',
            'Оформляем все документы сами',
            'Принимаем автомобили в любом состоянии',
            'Бесплатный выезд специалиста',
            'Эвакуатор и переоформление за наш счет',
            'Безопасная сделка с официальным оформлением',
            'Работаем с кредитными автомобилями',
            'Помощь с документами и банком',
        ],
        cons: [],
    },
    auction: {
        pros: [
            'Возможность продать быстро',
            'Публичные торги',
        ],
        cons: [
            'Низкая цена (обычно 60-70% от рыночной)',
            'Комиссия аукциона (5-10%)',
            'Долгое ожидание торгов (1-2 недели)',
            'Нет гарантии продажи',
            'Нужно самому доставлять автомобиль',
            'Ограничения по состоянию автомобиля',
            'Сложная процедура оформления',
        ],
    },
};
const ComparisonSection = () => {
    const [activeTab, setActiveTab] = useState('us');
    const currentData = comparisonData[activeTab];
    return (_jsxs("section", { className: "bg-white dark:bg-neutral-900 py-16 px-4 transition-colors relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto", children: [_jsx(AnimatedSection, { animationType: "fade-slide", delay: 0, children: _jsxs("div", { className: "flex flex-col items-center mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent", children: "\u0421\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432 \u043F\u0440\u043E\u0434\u0430\u0436\u0438" }), _jsx("p", { className: "text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]", children: "\u0421\u0440\u0430\u0432\u043D\u0438\u0442\u0435 \u0440\u0430\u0437\u043D\u044B\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u0443\u0447\u0448\u0438\u0439" })] }) }), _jsx("div", { className: "overflow-x-auto mb-8", children: _jsx("div", { className: "flex flex-row gap-3 px-1", children: tabs.map((tab) => (_jsxs("button", { className: `px-5 py-3 rounded-lg border-2 min-w-[200px] min-h-[44px] relative transition-all ${activeTab === tab.id
                                    ? 'border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/30'
                                    : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800'} ${tab.isRecommended ? 'border-success-500 dark:border-success-400' : ''}`, onClick: () => setActiveTab(tab.id), "aria-label": tab.label, "aria-pressed": activeTab === tab.id, children: [tab.isRecommended && (_jsx("span", { className: "absolute -top-2 right-2 text-xs font-bold text-success-500 dark:text-success-400 bg-white dark:bg-neutral-800 px-2 py-0.5 rounded", children: "\u0420\u0415\u041A\u041E\u041C\u0415\u041D\u0414\u0423\u0415\u041C" })), _jsx("span", { className: `text-sm font-semibold text-center block ${activeTab === tab.id
                                            ? 'text-primary-600 dark:text-primary-400'
                                            : 'text-neutral-600 dark:text-neutral-300'}`, children: tab.label })] }, tab.id))) }) }), _jsx(AnimatedSection, { animationType: "fade-slide", delay: 100, children: _jsxs("div", { className: "flex flex-col gap-6", children: [currentData.pros.length > 0 && (_jsx(AnimatedCard, { delay: 0, children: _jsxs(Card, { hover3D: true, className: "p-6 bg-success-50 dark:bg-success-900/20 border border-success-500 dark:border-success-400", children: [_jsx("h3", { className: "text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4", children: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430" }), currentData.pros.map((pro, index) => (_jsxs("div", { className: "flex flex-row items-start gap-3 mb-3", children: [_jsx("span", { className: "text-lg text-success-500 dark:text-success-400 font-bold mt-0.5", children: "\u2713" }), _jsx("p", { className: "flex-1 text-base text-neutral-700 dark:text-neutral-200 leading-6", children: pro })] }, index)))] }) })), currentData.cons.length > 0 && (_jsx(AnimatedCard, { delay: 100, children: _jsxs(Card, { hover3D: true, className: "p-6 bg-error-50 dark:bg-error-900/20 border border-error-500 dark:border-error-400", children: [_jsx("h3", { className: "text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4", children: "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043A\u0438" }), currentData.cons.map((con, index) => (_jsxs("div", { className: "flex flex-row items-start gap-3 mb-3", children: [_jsx("span", { className: "text-lg text-error-500 dark:text-error-400 font-bold mt-0.5", children: "\u2715" }), _jsx("p", { className: "flex-1 text-base text-neutral-700 dark:text-neutral-200 leading-6", children: con })] }, index)))] }) }))] }) })] })] }));
};
export default React.memo(ComparisonSection);
