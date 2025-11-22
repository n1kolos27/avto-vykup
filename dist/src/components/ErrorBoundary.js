import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { logger } from '../lib/logger.js';
import EmptyState from './ui/EmptyState.js';
import Button from './ui/Button.js';
/**
 * Error Boundary компонент для обработки ошибок в дочерних компонентах
 */
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.handleReset = () => {
            this.setState((prevState) => ({
                hasError: false,
                error: null,
                retryCount: prevState.retryCount + 1,
            }));
        };
        this.state = {
            hasError: false,
            error: null,
            retryCount: 0,
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
            retryCount: 0,
        };
    }
    componentDidCatch(error, errorInfo) {
        logger.error('ErrorBoundary caught an error', {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
        }, 'ErrorBoundary');
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (_jsx("div", { className: "flex flex-1 justify-center items-center p-5 bg-white dark:bg-neutral-900 transition-colors animate-fade-in", children: _jsxs("div", { className: "max-w-[500px] w-full", children: [_jsx(EmptyState, { variant: "error", title: "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A", description: this.state.error
                                ? `Произошла ошибка: ${this.state.error.message}. Пожалуйста, попробуйте обновить страницу или вернуться на главную.`
                                : 'Произошла ошибка при загрузке страницы. Пожалуйста, попробуйте обновить страницу.', actionLabel: "\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0441\u043D\u043E\u0432\u0430", onAction: this.handleReset }), this.state.retryCount > 0 && (_jsxs("p", { className: "text-sm text-neutral-500 dark:text-neutral-400 text-center mt-4", children: ["\u041F\u043E\u043F\u044B\u0442\u043A\u0430 ", this.state.retryCount] })), _jsxs("div", { className: "flex flex-row gap-3 justify-center mt-6", children: [_jsx(Button, { onClick: this.handleReset, variant: "primary", children: "\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0441\u043D\u043E\u0432\u0430" }), _jsx(Link, { to: "/", children: _jsx(Button, { variant: "outline", children: "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E" }) })] })] }) }));
        }
        return this.props.children;
    }
}
