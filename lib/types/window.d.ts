/**
 * Window Type Extensions
 * 
 * Типы для расширений глобального объекта window
 */

/**
 * Google Analytics gtag function
 */
declare global {
  interface Window {
    /**
     * Google Analytics gtag function
     * @param command - Команда gtag ('config' | 'event' | 'js' | 'set')
     * @param targetId - ID цели или дата
     * @param config - Конфигурация события (опционально)
     */
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;

    /**
     * Google Analytics dataLayer
     */
    dataLayer?: unknown[];

    /**
     * Yandex Metrika function
     * @param id - ID счетчика Yandex Metrika
     * @param method - Метод ('hit' | 'reachGoal' | 'params' | 'userParams' | 'extLink' | 'file' | 'notBounce' | 'addFileExtension')
     * @param target - Цель (URL для hit, название цели для reachGoal, и т.д.)
     * @param params - Параметры (опционально)
     */
    ym?: (
      id: number,
      method: 'hit' | 'reachGoal' | 'params' | 'userParams' | 'extLink' | 'file' | 'notBounce' | 'addFileExtension',
      target: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export {};
