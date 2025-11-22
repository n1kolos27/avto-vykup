import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
const ToastComponent = ({ toast, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    useEffect(() => {
        // Trigger entrance animation
        setTimeout(() => setIsVisible(true), 10);
        if (toast.duration !== 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, toast.duration || 5000);
            return () => clearTimeout(timer);
        }
    }, []);
    const handleClose = () => {
        setIsRemoving(true);
        setTimeout(() => {
            onClose(toast.id);
        }, 200);
    };
    const getColors = () => {
        switch (toast.type) {
            case 'success':
                return {
                    bg: 'bg-success-100 dark:bg-success-900/30',
                    border: 'border-success-500 dark:border-success-400',
                    text: 'text-success-800 dark:text-success-300',
                    icon: '✓'
                };
            case 'error':
                return {
                    bg: 'bg-error-100 dark:bg-error-900/30',
                    border: 'border-error-500 dark:border-error-400',
                    text: 'text-error-800 dark:text-error-300',
                    icon: '✕'
                };
            case 'info':
                return {
                    bg: 'bg-info-100 dark:bg-info-900/30',
                    border: 'border-info-500 dark:border-info-400',
                    text: 'text-info-800 dark:text-info-300',
                    icon: 'ℹ'
                };
            case 'warning':
                return {
                    bg: 'bg-warning-100 dark:bg-warning-900/30',
                    border: 'border-warning-500 dark:border-warning-400',
                    text: 'text-warning-800 dark:text-warning-300',
                    icon: '⚠'
                };
            default:
                return {
                    bg: 'bg-neutral-100 dark:bg-neutral-800',
                    border: 'border-neutral-500 dark:border-neutral-600',
                    text: 'text-neutral-800 dark:text-neutral-200',
                    icon: '•'
                };
        }
    };
    const colors = getColors();
    return (_jsxs("div", { className: `flex flex-row items-center px-4 py-3 rounded-lg border min-h-[48px] mb-2 shadow-md dark:shadow-dark-md transition-all duration-200 ${colors.bg} ${colors.border} ${isVisible && !isRemoving
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2'}`, role: "alert", "aria-live": "polite", children: [_jsx("span", { className: `text-xl mr-3 ${colors.text}`, children: colors.icon }), _jsx("span", { className: `flex-1 text-sm font-medium ${colors.text}`, children: toast.message }), _jsx("button", { onClick: handleClose, className: `ml-3 p-1 ${colors.text} hover:opacity-70 transition-opacity`, "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435", children: _jsx("span", { className: "text-xl font-bold", children: "\u00D7" }) })] }));
};
export default ToastComponent;
