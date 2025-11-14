'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { FiAlertCircle, FiRefreshCw, FiHome } from 'react-icons/fi';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary компонент для обработки ошибок в дочерних компонентах
 * 
 * Использование:
 * <ErrorBoundary>
 *   <ComponentThatMightError />
 * </ErrorBoundary>
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Обновляем состояние, чтобы следующий рендер показал fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Логируем ошибку для отладки
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Вызываем callback, если он предоставлен
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // В production можно отправить ошибку в сервис мониторинга
    if (process.env.NODE_ENV === 'production') {
      // Здесь можно добавить отправку в Sentry, LogRocket и т.д.
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Если предоставлен кастомный fallback, используем его
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Стандартный fallback UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
              <FiAlertCircle className="text-yellow-600 text-4xl" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Что-то пошло не так
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Произошла ошибка при загрузке компонента. Пожалуйста, попробуйте обновить страницу.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
                <p className="text-sm font-semibold text-red-800 mb-2">
                  Детали ошибки (только в dev режиме):
                </p>
                <p className="text-sm text-red-700 font-mono break-all">
                  {this.state.error.message}
                </p>
                {this.state.error.stack && (
                  <details className="mt-2">
                    <summary className="text-xs text-red-600 cursor-pointer">
                      Stack trace
                    </summary>
                    <pre className="text-xs text-red-600 mt-2 whitespace-pre-wrap">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[52px]"
              >
                <FiRefreshCw />
                <span>Попробовать снова</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-300 hover:scale-105 min-h-[52px]"
              >
                <FiHome />
                <span>На главную</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}


