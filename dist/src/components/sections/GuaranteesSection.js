import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Card from '../ui/Card';
const guarantees = [
    {
        icon: '🛡️',
        title: 'Юридическая безопасность',
        description: 'Все сделки оформляются официально с соблюдением всех требований законодательства. Вы получаете полную юридическую защиту.',
    },
    {
        icon: '📄',
        title: 'Прозрачные документы',
        description: 'Все документы оформляются в вашем присутствии. Вы видите каждый шаг процесса и можете задать любые вопросы.',
    },
    {
        icon: '🔒',
        title: 'Защита от мошенников',
        description: 'Мы работаем официально, имеем все необходимые лицензии. Ваши данные и деньги в полной безопасности.',
    },
    {
        icon: '🏆',
        title: 'Гарантия честной цены',
        description: 'Мы предлагаем рыночную стоимость автомобиля. Если вы найдете более выгодное предложение, мы готовы обсудить цену.',
    },
];
const GuaranteesSection = () => {
    return (_jsxs("section", { className: "bg-white dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto", children: [_jsx(AnimatedSection, { animationType: "fade-slide", delay: 0, children: _jsxs("div", { className: "flex flex-col items-center mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent", children: "\u041D\u0430\u0448\u0438 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0438" }), _jsx("p", { className: "text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]", children: "\u041C\u044B \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u0443\u0435\u043C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C, \u0447\u0435\u0441\u0442\u043D\u043E\u0441\u0442\u044C \u0438 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C \u043A\u0430\u0436\u0434\u043E\u0439 \u0441\u0434\u0435\u043B\u043A\u0438" })] }) }), _jsx("div", { className: "flex flex-row flex-wrap gap-6", children: guarantees.map((guarantee, index) => (_jsx(AnimatedCard, { delay: index * 100, children: _jsxs(Card, { hover3D: true, className: "flex-1 min-w-[200px] flex flex-col items-center p-6", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4", children: _jsx("span", { className: "text-4xl", children: guarantee.icon }) }), _jsx("h3", { className: "text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-center", children: guarantee.title }), _jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-300 text-center leading-5", children: guarantee.description })] }) }, index))) })] })] }));
};
export default React.memo(GuaranteesSection);
