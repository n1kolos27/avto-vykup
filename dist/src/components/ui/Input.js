import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { forwardRef, useState, useEffect } from 'react';
const Input = forwardRef(({ label, error, success, helperText, leftIcon, rightIcon, className = '', required, multiline, rows = 4, floatingLabel = false, onChangeText, onChange, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    useEffect(() => {
        setHasValue(!!value || (typeof value === 'string' && value.length > 0));
    }, [value]);
    const handleChange = (e) => {
        const newValue = e.target.value;
        setHasValue(!!newValue || newValue.length > 0);
        if (onChangeText) {
            onChangeText(newValue);
        }
        if (onChange) {
            onChange(e);
        }
    };
    const handleFocus = (e) => {
        setIsFocused(true);
        if (props.onFocus) {
            props.onFocus(e);
        }
    };
    const handleBlur = (e) => {
        setIsFocused(false);
        if (props.onBlur) {
            props.onBlur(e);
        }
    };
    const isFloatingActive = floatingLabel && (isFocused || hasValue);
    const getBorderColorClasses = () => {
        if (error)
            return 'border-error-500 dark:border-error-400 focus:border-error-600 dark:focus:border-error-500 focus:ring-error-200 dark:focus:ring-error-900/30';
        if (success)
            return 'border-success-500 dark:border-success-400 focus:border-success-600 dark:focus:border-success-500 focus:ring-success-200 dark:focus:ring-success-900/30';
        return 'border-neutral-300 dark:border-neutral-700 focus:border-primary-600 dark:focus:border-primary-400 focus:ring-primary-200 dark:focus:ring-primary-900/30';
    };
    const baseInputClasses = `w-full ${floatingLabel ? 'pt-6 pb-2' : 'py-3'} px-4 radius-input border bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-base transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) focus:outline-none focus:ring-2 focus:ring-offset-0 ${floatingLabel ? '' : 'focus:scale-[1.01]'} contain-layout`;
    const inputClasses = `${baseInputClasses} ${getBorderColorClasses()} ${leftIcon ? 'pl-10' : ''} ${(rightIcon || error || success) ? 'pr-10' : ''} ${className}`;
    const textareaClasses = `${baseInputClasses} ${getBorderColorClasses()} ${className} ${multiline ? 'resize-y' : ''}`;
    return (_jsxs("div", { className: "w-full mb-4", children: [_jsxs("div", { className: "relative w-full", children: [floatingLabel && label && (_jsxs("label", { className: `absolute left-4 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) pointer-events-none ${isFloatingActive
                            ? 'top-2 text-xs text-primary-600 dark:text-primary-400 font-medium scale-100'
                            : 'top-1/2 -translate-y-1/2 text-base text-neutral-500 dark:text-neutral-400 scale-100'} ${leftIcon ? 'left-10' : ''} ${error ? 'text-error-500 dark:text-error-400' : ''} ${success ? 'text-success-500 dark:text-success-400' : ''}`, children: [label, required && _jsx("span", { className: "text-error-500 dark:text-error-400", children: " *" })] })), !floatingLabel && label && (_jsxs("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: [label, required && _jsx("span", { className: "text-error-500 dark:text-error-400", children: " *" })] })), leftIcon && !multiline && (_jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none", children: leftIcon })), multiline ? (_jsx("textarea", { ref: ref, className: textareaClasses, "aria-label": label, "aria-invalid": error ? 'true' : 'false', "aria-describedby": error || helperText ? `${props.id || 'input'}-helper` : undefined, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, rows: rows, value: value, ...props })) : (_jsxs(_Fragment, { children: [_jsx("input", { ref: ref, className: `${inputClasses} min-h-[48px]`, "aria-label": label, "aria-invalid": error ? 'true' : 'false', "aria-describedby": error || helperText ? `${props.id || 'input'}-helper` : undefined, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, value: value, ...props }), rightIcon && !error && !success && (_jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none", children: rightIcon }))] })), error && !multiline && (_jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none", children: _jsx("span", { className: "text-xl text-error-500", "aria-label": "\u041E\u0448\u0438\u0431\u043A\u0430", children: "\u26A0\uFE0F" }) })), success && !error && !multiline && (_jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none", children: _jsx("span", { className: "text-xl text-success-500 success-check", "aria-label": "\u0423\u0441\u043F\u0435\u0448\u043D\u043E", children: "\u2713" }) }))] }), error && (_jsx("p", { id: `${props.id || 'input'}-helper`, className: "text-xs text-error-500 dark:text-error-400 mt-1 animate-slide-up", role: "alert", children: error })), helperText && !error && (_jsx("p", { id: `${props.id || 'input'}-helper`, className: "text-xs text-neutral-500 dark:text-neutral-400 mt-1", children: helperText }))] }));
});
Input.displayName = 'Input';
export default Input;
