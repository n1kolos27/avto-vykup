/**
 * Утилиты для работы с портами
 * Проверка доступности, автоматический выбор свободного порта
 */
import { createServer } from 'net';
import http from 'http';
/**
 * Проверка доступности порта
 * @param port - номер порта для проверки
 * @returns Promise<boolean> - true если порт свободен, false если занят
 */
export async function isPortAvailable(port) {
    return new Promise((resolve) => {
        const server = createServer();
        server.listen(port, () => {
            server.once('close', () => resolve(true));
            server.close();
        });
        server.on('error', () => {
            resolve(false);
        });
    });
}
/**
 * Поиск свободного порта начиная с указанного
 * @param startPort - начальный порт для поиска
 * @param maxAttempts - максимальное количество попыток (по умолчанию 10)
 * @returns Promise<number> - номер свободного порта
 * @throws Error если не удалось найти свободный порт
 */
export async function findFreePort(startPort, maxAttempts = 10) {
    for (let i = 0; i < maxAttempts; i++) {
        const port = startPort + i;
        if (await isPortAvailable(port)) {
            return port;
        }
    }
    throw new Error(`Не удалось найти свободный порт в диапазоне ${startPort}-${startPort + maxAttempts - 1}`);
}
/**
 * Получение порта с автоматическим выбором альтернативы при конфликте
 * @param preferredPort - предпочтительный порт
 * @param autoFindAlternative - автоматически искать альтернативный порт при конфликте
 * @returns Promise<number> - номер порта для использования
 */
export async function getPort(preferredPort, autoFindAlternative = true) {
    const isAvailable = await isPortAvailable(preferredPort);
    if (isAvailable) {
        return preferredPort;
    }
    if (!autoFindAlternative) {
        throw new Error(`Порт ${preferredPort} занят`);
    }
    // Ищем альтернативный порт
    const alternativePort = await findFreePort(preferredPort + 1, 10);
    return alternativePort;
}
/**
 * Получение информации о процессе, использующем порт (только для диагностики)
 * @param port - номер порта
 * @returns Promise<string | null> - информация о процессе или null
 */
export async function getPortInfo(port) {
    // Эта функция может быть расширена для получения информации о процессе
    // В базовой реализации просто возвращаем null
    return null;
}
/**
 * Проверка доступности HTTP сервера по порту
 * @param port - номер порта для проверки
 * @param timeout - таймаут в миллисекундах (по умолчанию 2000)
 * @returns Promise<boolean> - true если сервер доступен, false если нет
 */
export async function isHttpServerAvailable(port, timeout = 2000) {
    return new Promise((resolve) => {
        const req = http.get(`http://localhost:${port}`, { timeout }, (res) => {
            resolve(res.statusCode !== undefined && res.statusCode < 500);
        });
        req.on('error', () => {
            resolve(false);
        });
        req.on('timeout', () => {
            req.destroy();
            resolve(false);
        });
    });
}
