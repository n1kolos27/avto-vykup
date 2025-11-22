import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from './Button.js';
const EmptyState = ({ title, description, icon, actionLabel, onAction, variant = 'default', }) => {
    const getIcon = () => {
        if (icon)
            return icon;
        switch (variant) {
            case 'error':
                return _jsx("span", { className: "text-6xl mb-4", children: "\u26A0\uFE0F" });
            case 'info':
                return _jsx("span", { className: "text-6xl mb-4", children: "\u2139\uFE0F" });
            default:
                return _jsx("span", { className: "text-6xl mb-4", children: "\uD83D\uDCED" });
        }
    };
    const getVariantClasses = () => {
        switch (variant) {
            case 'error':
                return 'text-error-600 dark:text-error-400';
            case 'info':
                return 'text-info-600 dark:text-info-400';
            default:
                return 'text-neutral-600 dark:text-neutral-400';
        }
    };
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-12 px-4 text-center", children: [_jsx("div", { className: getVariantClasses(), children: getIcon() }), _jsx("h3", { className: "text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2", children: title }), description && (_jsx("p", { className: "text-base text-neutral-600 dark:text-neutral-400 mb-6 max-w-md", children: description })), actionLabel && onAction && (_jsx(Button, { onClick: onAction, variant: "primary", children: actionLabel }))] }));
};
export default EmptyState;
