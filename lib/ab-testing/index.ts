/**
 * A/B Testing System
 * 
 * Простая система для A/B тестирования различных элементов интерфейса
 */

/**
 * Получение варианта для A/B теста
 * @param testName - Название теста
 * @param variants - Массив вариантов (например, ['A', 'B'])
 * @returns Выбранный вариант
 */
export function getABTestVariant(testName: string, variants: string[] = ['A', 'B']): string {
  if (typeof window === 'undefined') {
    return variants[0]; // По умолчанию вариант A на сервере
  }

  try {
    // Проверяем, есть ли сохраненный вариант в localStorage
    const storageKey = `ab_test_${testName}`;
    const savedVariant = localStorage.getItem(storageKey);

    if (savedVariant && variants.includes(savedVariant)) {
      return savedVariant;
    }

    // Генерируем новый вариант на основе хеша пользователя
    const userId = getUserId();
    const hash = simpleHash(`${testName}_${userId}`);
    const variantIndex = hash % variants.length;
    const selectedVariant = variants[variantIndex];

    // Сохраняем выбранный вариант
    localStorage.setItem(storageKey, selectedVariant);

    return selectedVariant;
  } catch (error) {
    // Если localStorage недоступен (например, в приватном режиме), возвращаем вариант по умолчанию
    console.warn('localStorage недоступен для A/B теста:', error);
    return variants[0];
  }
}

/**
 * Получение или создание уникального ID пользователя
 */
function getUserId(): string {
  if (typeof window === 'undefined') {
    // На сервере возвращаем временный ID
    return `server_${Date.now()}`;
  }

  const storageKey = 'user_id';
  let userId = localStorage.getItem(storageKey);

  if (!userId) {
    userId = generateUserId();
    localStorage.setItem(storageKey, userId);
  }

  return userId;
}

/**
 * Генерация уникального ID пользователя
 */
function generateUserId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Простая хеш-функция для детерминированного выбора варианта
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Отслеживание участия в A/B тесте
 */
export function trackABTestParticipation(
  testName: string,
  variant: string,
  elementName?: string
): void {
  if (typeof window === 'undefined') return;

  // Отправка события в аналитику
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'ab_test_view', {
      test_name: testName,
      variant: variant,
      element: elementName,
    });
  }

  // Yandex Metrika
  if (typeof window.ym !== 'undefined') {
    const YANDEX_METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
    if (YANDEX_METRIKA_ID) {
      const id = parseInt(YANDEX_METRIKA_ID, 10);
      if (!isNaN(id) && window.ym) {
        window.ym(id, 'reachGoal', 'ab_test_view', {
          test_name: testName,
          variant: variant,
          element: elementName,
        });
      }
    }
  }
}

/**
 * Отслеживание конверсии в A/B тесте
 */
export function trackABTestConversion(
  testName: string,
  variant: string,
  conversionType: string,
  value?: number
): void {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'ab_test_conversion', {
      test_name: testName,
      variant: variant,
      conversion_type: conversionType,
      value: value,
    });
  }

  // Yandex Metrika
  if (typeof window.ym !== 'undefined') {
    const YANDEX_METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
    if (YANDEX_METRIKA_ID) {
      const id = parseInt(YANDEX_METRIKA_ID, 10);
      if (!isNaN(id) && window.ym) {
        window.ym(id, 'reachGoal', 'ab_test_conversion', {
          test_name: testName,
          variant: variant,
          conversion_type: conversionType,
          value: value,
        });
      }
    }
  }
}

/**
 * React Hook для использования A/B тестов
 * 
 * ВНИМАНИЕ: Это не настоящий React hook, а обычная функция.
 * Для использования в React компонентах, вызывайте её напрямую.
 * Для настоящего hook используйте useState + useEffect.
 */
export function useABTest(testName: string, variants: string[] = ['A', 'B']): string {
  if (typeof window === 'undefined') {
    return variants[0];
  }

  try {
    const variant = getABTestVariant(testName, variants);
    
    // Отслеживание участия (только один раз)
    const storageKey = `ab_test_tracked_${testName}`;
    if (!localStorage.getItem(storageKey)) {
      trackABTestParticipation(testName, variant);
      localStorage.setItem(storageKey, 'true');
    }

    return variant;
  } catch (error) {
    // Если localStorage недоступен, возвращаем вариант по умолчанию
    console.warn('localStorage недоступен для A/B теста:', error);
    return variants[0];
  }
}

// gtag уже определен в lib/analytics/google-analytics.ts
// Не нужно переопределять здесь

