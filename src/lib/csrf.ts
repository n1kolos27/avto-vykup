/**
 * CSRF Token Management
 * Утилиты для работы с CSRF токенами на клиенте
 */

let csrfTokenCache: string | null = null;

/**
 * Получение CSRF токена с сервера
 */
export async function getCSRFToken(): Promise<string | null> {
  // Используем кэш, если токен уже получен
  if (csrfTokenCache) {
    return csrfTokenCache;
  }

  try {
    const response = await fetch('/api/csrf-token');
    if (response.ok) {
      const data = await response.json();
      csrfTokenCache = data.csrfToken || null;
      return csrfTokenCache;
    }
  } catch (_error) {
    // В случае ошибки возвращаем null
    // Форма все равно попытается отправиться, но сервер вернет ошибку
    return null;
  }

  return null;
}

/**
 * Очистка кэша CSRF токена
 * Используется при ошибке CSRF для получения нового токена
 */
export function clearCSRFTokenCache(): void {
  csrfTokenCache = null;
}

/**
 * Получение CSRF токена (синхронно, если уже в кэше)
 */
export function getCachedCSRFToken(): string | null {
  return csrfTokenCache;
}

