import React, { Component } from 'react';
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
            return (<div className="flex flex-1 justify-center items-center p-5 bg-white dark:bg-neutral-900 transition-colors animate-fade-in">
          <div className="max-w-[500px] w-full">
            <EmptyState variant="error" title="Что-то пошло не так" description={this.state.error
                    ? `Произошла ошибка: ${this.state.error.message}. Пожалуйста, попробуйте обновить страницу или вернуться на главную.`
                    : 'Произошла ошибка при загрузке страницы. Пожалуйста, попробуйте обновить страницу.'} actionLabel="Попробовать снова" onAction={this.handleReset}/>
            {this.state.retryCount > 0 && (<p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mt-4">
                Попытка {this.state.retryCount}
              </p>)}
            <div className="flex flex-row gap-3 justify-center mt-6">
              <Button onClick={this.handleReset} variant="primary">
                Попробовать снова
              </Button>
              <Link to="/">
                <Button variant="outline">На главную</Button>
              </Link>
            </div>
          </div>
        </div>);
        }
        return this.props.children;
    }
}
