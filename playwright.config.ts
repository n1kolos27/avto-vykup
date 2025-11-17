import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright конфигурация для E2E тестирования
 *
 * Настройки:
 * - Chrome, Firefox, WebKit (Safari)
 * - Мобильные устройства (iPhone, Android)
 * - Screenshot и video на ошибках
 * - Retry стратегия
 */
export default defineConfig({
  // Тестовая директория
  testDir: './tests/e2e',

  // Максимальное время выполнения одного теста
  timeout: 60 * 1000, // Увеличиваем для мобильных устройств

  // Ожидание перед каждым действием
  expect: {
    timeout: 5000,
  },

  // Запускать тесты параллельно
  fullyParallel: true,

  // Запретить запуск тестов при ошибках компиляции
  forbidOnly: !!process.env.CI,

  // Повторные попытки только в CI
  retries: process.env.CI ? 2 : 0,

  // Количество воркеров в CI, локально - по количеству ядер
  workers: process.env.CI ? 1 : undefined,

  // Репортер
  reporter: [
    ['html'],
    ['list'],
    ...(process.env.CI ? [['github'] as const] : []),
  ],

  // Общие настройки для всех проектов
  use: {
    // Базовый URL
    baseURL: 'http://localhost:3000',

    // Трассировка на ошибках
    trace: 'on-first-retry',

    // Скриншоты на ошибках
    screenshot: 'only-on-failure',

    // Видео на ошибках
    video: 'retain-on-failure',

    // Action timeout
    actionTimeout: 10000,

    // Navigation timeout
    navigationTimeout: 30000,
  },

  // Конфигурация проектов (браузеры и устройства)
  projects: [
    // Desktop Chrome
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Desktop Firefox
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // Desktop WebKit (Safari)
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile Chrome (Android)
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },

    // Mobile Safari (iPhone)
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Web сервер для запуска приложения перед тестами
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
