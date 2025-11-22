import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import PhoneButton from '../PhoneButton';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { APP_CONFIG } from '../../lib/config';
const features = [
    {
        icon: '💳',
        title: 'Погашение автокредита',
        description: 'Помогаем решить вопрос с банком и погасить кредит',
    },
    {
        icon: '💰',
        title: 'Справедливая оценка',
        description: 'Честная рыночная цена без занижения стоимости',
    },
    {
        icon: '⏱️',
        title: 'За наш счет',
        description: 'Эвакуатор, переоформление и все расходы берем на себя',
    },
];
const UrgencySection = () => {
    const navigate = useNavigate();
    const phone1 = APP_CONFIG.PHONE_1;
    const [slotsLeft] = useState(3);
    const [timeLeft, setTimeLeft] = useState({
        hours: 2,
        minutes: 30,
        seconds: 0,
    });
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                seconds--;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                    if (minutes < 0) {
                        minutes = 59;
                        hours--;
                        if (hours < 0) {
                            hours = 23;
                        }
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (_jsx("section", { className: "cta-urgent-gradient py-20 px-4 relative", children: _jsxs("div", { className: "max-w-[1200px] w-full mx-auto relative z-10", children: [_jsxs("div", { className: "glass-morphism-subtle rounded-3xl p-8 border border-white/30 mb-12", children: [_jsxs("div", { className: "flex flex-row items-center bg-error-600/20 px-4 py-2 rounded-full mb-5 self-center gap-2", children: [_jsx("span", { className: "text-xl", children: "\u26A0\uFE0F" }), _jsx("span", { className: "text-sm font-semibold text-white", children: "\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435" })] }), _jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4 text-center leading-tight", children: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0441\u0435\u0433\u043E\u0434\u043D\u044F!" }), _jsx("p", { className: "text-lg md:text-xl text-white/95 mb-8 text-center max-w-[700px] mx-auto leading-relaxed", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0443\u044E \u043E\u0446\u0435\u043D\u043A\u0443 \u0438 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0443\u044E \u0441\u043A\u0438\u0434\u043A\u0443 \u043F\u0440\u0438 \u0441\u0434\u0435\u043B\u043A\u0435 \u0441\u0435\u0433\u043E\u0434\u043D\u044F" }), _jsxs("div", { className: "flex flex-row flex-wrap gap-6 mb-8 justify-center", children: [_jsxs("div", { className: "flex-1 min-w-[160px] flex flex-col items-center bg-white/10 p-6 rounded-2xl border border-white/20", children: [_jsx("span", { className: "text-4xl mb-3", children: "\uD83D\uDC65" }), _jsx("span", { className: "text-3xl font-bold text-white mb-2", children: slotsLeft }), _jsx("span", { className: "text-sm text-white/85 text-center", children: "\u0421\u043B\u043E\u0442\u043E\u0432 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C" })] }), _jsxs("div", { className: "flex-1 min-w-[160px] flex flex-col items-center bg-white/10 p-6 rounded-2xl border border-white/20", children: [_jsx("span", { className: "text-4xl mb-3", children: "\u23F1\uFE0F" }), _jsxs("span", { className: "text-3xl font-bold text-white mb-2", children: [String(timeLeft.hours).padStart(2, '0'), ":", String(timeLeft.minutes).padStart(2, '0'), ":", String(timeLeft.seconds).padStart(2, '0')] }), _jsx("span", { className: "text-sm text-white/85 text-center", children: "\u0414\u043E \u043A\u043E\u043D\u0446\u0430 \u0430\u043A\u0446\u0438\u0438" })] }), _jsxs("div", { className: "flex-1 min-w-[160px] flex flex-col items-center bg-white/10 p-6 rounded-2xl border border-white/20", children: [_jsx("span", { className: "text-4xl mb-3", children: "\uD83D\uDCDE" }), _jsx("span", { className: "text-3xl font-bold text-white mb-2", children: "47+" }), _jsx("span", { className: "text-sm text-white/85 text-center", children: "\u041E\u0446\u0435\u043D\u043E\u043A \u0441\u0435\u0433\u043E\u0434\u043D\u044F" })] })] }), _jsxs("div", { className: "flex flex-row flex-wrap gap-4 justify-center items-center", children: [_jsx(Button, { onClick: () => navigate('/calculator'), size: "lg", variant: "secondary", className: "min-w-[240px] flex-1", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043E\u0446\u0435\u043D\u043A\u0443 \u0441\u0435\u0439\u0447\u0430\u0441" }), _jsx(PhoneButton, { phone: phone1, variant: "secondary", size: "lg" })] })] }), _jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-2xl md:text-3xl font-bold text-white mb-12 text-center leading-tight", children: "\u0421\u0440\u043E\u0447\u043D\u044B\u0439 \u0432\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u0432 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 \u00AB\u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u0438\u0439 \u0410\u0432\u0442\u043E \u0410\u043B\u044C\u044F\u043D\u0441\u00BB \u0441 9:00 \u0434\u043E 22:00 \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E" }), _jsx(AnimatedSection, { animationType: "stagger", delay: 200, children: _jsx("div", { className: "flex flex-row flex-wrap gap-6", children: features.map((feature, index) => (_jsx(AnimatedCard, { delay: index * 100, children: _jsxs(Card, { hover3D: true, variant: "outlined", className: "flex-1 min-w-[280px] bg-white/10 dark:bg-white/5 p-8 flex flex-col items-center border border-white/30 dark:border-white/20 transition-colors", children: [_jsx("div", { className: "w-[72px] h-[72px] rounded-full bg-white/20 dark:bg-white/10 flex items-center justify-center mb-5", children: _jsx("span", { className: "text-4xl", children: feature.icon }) }), _jsx("h4", { className: "text-xl font-bold text-white mb-3 text-center", children: feature.title }), _jsx("p", { className: "text-base text-white/95 dark:text-white/90 text-center leading-6", children: feature.description })] }) }, index))) }) })] })] }) }));
};
export default React.memo(UrgencySection);
