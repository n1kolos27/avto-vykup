import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import PhoneButton from '../PhoneButton';
import { APP_CONFIG } from '../../lib/config';
const SectionCTA = ({ title, description, variant = 'primary', }) => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: `${variant === 'primary' ? 'gradient-animated-primary' : 'cta-urgent-gradient'} rounded-2xl p-8 flex flex-col items-center transition-all duration-300 relative overflow-hidden`, children: [_jsx("h3", { className: "text-3xl font-bold text-white mb-3 text-center relative z-10", children: title }), description && (_jsx("p", { className: "text-base text-white/90 dark:text-white/95 mb-6 text-center relative z-10", children: description })), _jsxs("div", { className: "flex flex-row gap-3 flex-wrap justify-center relative z-10", children: [_jsx(Button, { onClick: () => navigate('/calculator'), size: "lg", variant: variant === 'primary' ? 'primary' : 'secondary', className: "min-w-[200px]", children: "\u041E\u0446\u0435\u043D\u0438\u0442\u044C \u0430\u0432\u0442\u043E \u043E\u043D\u043B\u0430\u0439\u043D" }), _jsx(PhoneButton, { phone: APP_CONFIG.PHONE_1, variant: variant === 'primary' ? 'secondary' : 'primary' })] })] }));
};
export default React.memo(SectionCTA);
