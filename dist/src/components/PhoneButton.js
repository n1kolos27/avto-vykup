import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PhoneButton = ({ phone, variant = 'primary', size = 'md', className = '', }) => {
    const handleClick = () => {
        window.location.href = `tel:${phone}`;
    };
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-4 py-2.5 min-h-[40px]';
            case 'md':
                return 'px-6 py-3.5 min-h-[56px]';
            case 'lg':
                return 'px-8 py-4.5 min-h-[64px]';
            default:
                return 'px-6 py-3.5 min-h-[56px]';
        }
    };
    const getTextSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'text-sm';
            case 'md':
                return 'text-base';
            case 'lg':
                return 'text-lg';
            default:
                return 'text-base';
        }
    };
    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 text-white';
            case 'secondary':
                return 'bg-white dark:bg-neutral-800 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400';
            case 'ghost':
                return 'bg-transparent hover:bg-primary-50 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400';
            default:
                return 'bg-primary-600 dark:bg-primary-500 text-white';
        }
    };
    const baseClasses = 'flex flex-row items-center justify-center rounded-xl gap-2 transition-all duration-200 focus-ring';
    const classes = `${baseClasses} ${getSizeClasses()} ${getVariantClasses()} ${className}`;
    return (_jsxs("button", { className: classes, onClick: handleClick, "aria-label": `Позвонить по телефону ${phone}`, children: [_jsx("span", { className: `${getTextSizeClasses()}`, children: "\uD83D\uDCDE" }), _jsx("span", { className: `${getTextSizeClasses()} font-semibold`, children: phone })] }));
};
export default PhoneButton;
