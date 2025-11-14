# Systems Documentation

Полная документация всех систем проекта "Выкуп авто".

## Структура систем

```
lib/
├── design-system/        ✅ Design System
├── config/               ✅ Config System
├── types/                ✅ Types System
├── error-handling/       ✅ Error Handling System
├── validation/           ✅ Validation System
├── security/             ✅ Security System
├── rate-limiting/        ✅ Rate Limiting System
├── sanitization/        ✅ Sanitization System (deprecated, use security)
├── analytics/            ✅ Analytics System
├── seo/                  ✅ SEO System
├── email/                ✅ Email System
├── logging/              ✅ Logging System
├── caching/              ✅ Caching System
├── performance/          ✅ Performance Monitoring System
├── api/                  ✅ API System
├── component-system/     ✅ Component System
├── testing/              ✅ Testing System
├── state-management/     ✅ State Management System
└── documentation/        ✅ Documentation System
```

## 1. Design System

**Расположение:** `lib/design-system/`

Единая система дизайн-токенов для всего проекта.

### Компоненты:
- `tokens.ts` - Единый источник всех дизайн-токенов
- `spacing.ts` - Утилиты для работы с отступами
- `typography.ts` - Утилиты для типографики
- `colors.ts` - Утилиты для работы с цветами

### Использование:
```typescript
import { spacing, colors, typography } from '@/lib/design-system';
```

**Документация:** См. `DESIGN-SYSTEM.md`

---

## 2. Config System

**Расположение:** `lib/config/`

Централизованная конфигурация приложения.

### Компоненты:
- `env.ts` - Переменные окружения
- `constants.ts` - Константы приложения
- `routes.ts` - Маршруты и навигация
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { APP_CONFIG, ENV, RATE_LIMIT, VALIDATION } from '@/lib/config';
```

---

## 3. Types System

**Расположение:** `lib/types/`

Типы TypeScript для всего приложения.

### Компоненты:
- `forms.ts` - Типы форм
- `api.ts` - Типы API
- `domain.ts` - Доменные типы
- `common.ts` - Общие типы
- `index.ts` - Главный экспорт

### Использование:
```typescript
import type { EvaluationFormData, ApiResponse } from '@/lib/types';
```

---

## 4. Error Handling System

**Расположение:** `lib/error-handling/`

Единая система обработки ошибок.

### Компоненты:
- `types.ts` - Типы ошибок
- `errors.ts` - Создание ошибок
- `logger.ts` - Логирование ошибок
- `handlers.ts` - Обработчики ошибок
- `retry.ts` - Retry логика
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { createError, handleApiError, logError, retryOperation } from '@/lib/error-handling';
```

### Примеры:
```typescript
// Создание ошибки
const error = createError('Сообщение', 'ERROR_CODE', 400);

// Обработка API ошибки
const result = handleApiError(error);

// Retry операция
const data = await retryOperation(() => fetchData(), { maxRetries: 3 });
```

---

## 5. Validation System

**Расположение:** `lib/validation/`

Система валидации данных.

### Компоненты:
- `types.ts` - Типы валидации
- `validators.ts` - Валидаторы для типов данных
- `forms.ts` - Валидаторы форм
- `async.ts` - Асинхронные валидаторы
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { validatePhone, validateEmail, validateEvaluationForm } from '@/lib/validation';
```

### Примеры:
```typescript
// Валидация поля
const isValid = validatePhone('+79991234567');

// Валидация формы
const result = validateEvaluationForm(formData);
if (!result.isValid) {
  // Обработка ошибок
}
```

---

## 6. Security System

**Расположение:** `lib/security/`

Комплексная система безопасности.

### Компоненты:
- `types.ts` - Типы безопасности
- `sanitization.ts` - Санитизация данных
- `headers.ts` - Security headers
- `threat-detection.ts` - Обнаружение угроз
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { sanitizeString, sanitizeEmail, checkSecurity, getDefaultSecurityHeaders } from '@/lib/security';
```

### Примеры:
```typescript
// Санитизация
const safe = sanitizeString(userInput);

// Проверка безопасности
const check = checkSecurity(userInput);
if (!check.safe) {
  // Обработка угроз
}
```

---

## 7. Rate Limiting System

**Расположение:** `lib/rate-limiting/`

Система ограничения частоты запросов.

### Компоненты:
- `types.ts` - Типы rate limiting
- `memory.ts` - In-memory хранилище
- `redis.ts` - Redis хранилище (готовность)
- `utils.ts` - Утилиты
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { rateLimit, getClientIP } from '@/lib/rate-limiting';
```

### Примеры:
```typescript
const result = rateLimit(`api:${ip}`, { windowMs: 60000, maxRequests: 10 });
if (!result.allowed) {
  // Лимит превышен
}
```

---

## 8. Sanitization System

**Расположение:** `lib/sanitization/`

**Статус:** Deprecated - используйте `lib/security`

Реэкспортирует функции из Security System для обратной совместимости.

---

## 9. Analytics System

**Расположение:** `lib/analytics/`

Система аналитики (Google Analytics, Yandex Metrika).

### Компоненты:
- `types.ts` - Типы аналитики
- `google-analytics.ts` - Google Analytics
- `yandex-metrika.ts` - Yandex Metrika
- `events.ts` - Отслеживание событий
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { trackEvent, trackConversion, trackPhoneClick } from '@/lib/analytics';
```

### Примеры:
```typescript
trackPhoneClick('+79991234567');
trackFormSubmit('evaluation');
trackConversion('call');
```

---

## 10. SEO System

**Расположение:** `lib/seo/`

Система SEO оптимизации.

### Компоненты:
- `metadata.ts` - Генерация мета-тегов
- `schema.ts` - Schema.org разметка
- `sitemap.ts` - Генерация sitemap
- `robots.ts` - Генерация robots.txt
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { generateMetadata, generateOrganizationSchema, generateSitemap } from '@/lib/seo';
```

### Примеры:
```typescript
// Генерация метаданных
export const metadata = generateMetadata({
  title: 'Заголовок',
  description: 'Описание',
  path: '/page',
});

// Генерация sitemap
const sitemap = generateSitemap(entries);
```

---

## 11. Email System

**Расположение:** `lib/email/`

Система отправки email.

### Компоненты:
- `sender.ts` - Отправка email
- `templates.ts` - Шаблоны писем
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { sendEmail, formatEvaluationEmail } from '@/lib/email';
```

### Примеры:
```typescript
const email = formatEvaluationEmail(formData);
await sendEmail({
  to: 'admin@example.com',
  subject: email.subject,
  html: email.html,
  text: email.text,
});
```

---

## 12. Logging System

**Расположение:** `lib/logging/`

Структурированное логирование.

### Компоненты:
- `types.ts` - Типы логирования
- `logger.ts` - Логгер
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { logger } from '@/lib/logging';
```

### Примеры:
```typescript
logger.info('User logged in', { userId: '123' });
logger.error('Failed to process', { error }, error);
```

---

## 13. Caching System

**Расположение:** `lib/caching/`

In-memory кэширование.

### Компоненты:
- `types.ts` - Типы кэширования
- `memory.ts` - In-memory кэш
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { set, get, remove, clear } from '@/lib/caching';
```

### Примеры:
```typescript
// Сохранение в кэш
set('user:123', userData, { ttl: 3600000 });

// Получение из кэша
const data = get('user:123');
```

---

## 14. Performance Monitoring System

**Расположение:** `lib/performance/`

Мониторинг производительности.

### Компоненты:
- `types.ts` - Типы метрик
- `monitor.ts` - Мониторинг
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { trackMetric, trackCoreWebVitals } from '@/lib/performance';
```

### Примеры:
```typescript
trackMetric('api-response-time', 150);
trackCoreWebVitals({ lcp: 2500, fid: 100, cls: 0.1 });
```

---

## 15. API System

**Расположение:** `lib/api/`

Клиент для API запросов.

### Компоненты:
- `client.ts` - API клиент
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { ApiClient } from '@/lib/api';
```

### Примеры:
```typescript
const client = new ApiClient({ baseURL: 'https://api.example.com' });
const data = await client.get('/users');
await client.post('/users', userData);
```

---

## 16. Component System

**Расположение:** `lib/component-system/`

Система компонентов с документацией и правилами использования.

### Компоненты:
- `components.md` - Документация всех компонентов
- `accessibility.md` - Руководство по доступности
- `rules.md` - Правила использования компонентов
- `index.ts` - Главный экспорт

### Использование:
См. документацию в `lib/component-system/` для подробной информации о каждом компоненте.

---

## 17. Testing System

**Расположение:** `lib/testing/`

Система тестирования (Vitest, Testing Library, Playwright).

### Компоненты:
- `config/` - Конфигурация тестов
- `utils/` - Утилиты для тестов
- `unit/` - Unit тесты
- `components/` - Тесты компонентов
- `e2e/` - E2E тесты

### Использование:
```bash
npm run test        # Unit тесты
npm run test:e2e    # E2E тесты
npm run test:coverage # Coverage
```

---

## 18. State Management System

**Расположение:** `lib/state-management/`

Централизованное управление состоянием.

### Компоненты:
- `store.ts` - Глобальное состояние
- `hooks.ts` - Специализированные хуки
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { AppStateProvider, useUI, useEvaluationForm } from '@/lib/state-management';

// В провайдере
<AppStateProvider>
  <App />
</AppStateProvider>

// В компоненте
const { isMenuOpen, setMenuOpen } = useUI();
const { data, setData, errors } = useEvaluationForm();
```

---

## 19. Documentation System

**Расположение:** `lib/documentation/`

Автоматическая генерация документации.

### Компоненты:
- `generator.ts` - Генератор документации
- `types.ts` - Типы документации
- `index.ts` - Главный экспорт

### Использование:
```typescript
import { extractJSDoc, generateMarkdownDoc } from '@/lib/documentation';
```

**Примечание:** Для полной функциональности рекомендуется использовать TypeDoc.

---

## Взаимодействие систем

### Типичный поток обработки запроса:

1. **Rate Limiting** - проверка лимитов
2. **Security** - санитизация и проверка безопасности
3. **Validation** - валидация данных
4. **API/Email** - выполнение операции
5. **Error Handling** - обработка ошибок
6. **Logging** - логирование
7. **Analytics** - отслеживание событий
8. **Performance** - мониторинг производительности

### Пример интеграции:

```typescript
import { rateLimit, getClientIP } from '@/lib/rate-limiting';
import { sanitizeString } from '@/lib/security';
import { validateEvaluationForm } from '@/lib/validation';
import { handleApiError, logError } from '@/lib/error-handling';
import { sendEmail, formatEvaluationEmail } from '@/lib/email';
import { trackFormSubmit } from '@/lib/analytics';
import { logger } from '@/lib/logging';

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    const rateLimitResult = rateLimit(`evaluation:${ip}`, { windowMs: 60000, maxRequests: 10 });
    if (!rateLimitResult.allowed) {
      return new Response('Rate limit exceeded', { status: 429 });
    }

    // Получение и санитизация данных
    const data = await request.json();
    const sanitized = sanitizeString(data.name);

    // Валидация
    const validation = validateEvaluationForm(data);
    if (!validation.isValid) {
      return new Response(JSON.stringify({ errors: validation.errors }), { status: 400 });
    }

    // Отправка email
    const email = formatEvaluationEmail(data);
    await sendEmail({ to: 'admin@example.com', ...email });

    // Аналитика
    trackFormSubmit('evaluation');

    // Логирование
    logger.info('Evaluation form submitted', { ip, brand: data.brand });

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    logError(error);
    const result = handleApiError(error);
    return new Response(JSON.stringify({ error: result.message }), { status: result.statusCode });
  }
}
```

---

## Миграция со старых импортов

### Старые импорты → Новые импорты

```typescript
// ❌ Старый способ
import { handleApiError } from '@/lib/error-handler';
import { validatePhone } from '@/lib/validation';
import { sanitizeString } from '@/lib/sanitize';
import { rateLimit } from '@/lib/rateLimit';
import { trackEvent } from '@/lib/analytics';
import { generateMetadata } from '@/lib/seo';
import { sendEmail } from '@/lib/email';

// ✅ Новый способ
import { handleApiError } from '@/lib/error-handling';
import { validatePhone } from '@/lib/validation';
import { sanitizeString } from '@/lib/security';
import { rateLimit } from '@/lib/rate-limiting';
import { trackEvent } from '@/lib/analytics';
import { generateMetadata } from '@/lib/seo';
import { sendEmail } from '@/lib/email';
```

---

## Best Practices

1. **Всегда используйте систематизированные системы** - не создавайте дублирующий функционал
2. **Импортируйте из index.ts** - используйте главные экспорты модулей
3. **Используйте типы** - все системы полностью типизированы
4. **Обрабатывайте ошибки** - используйте Error Handling System
5. **Логируйте важные события** - используйте Logging System
6. **Валидируйте и санитизируйте** - используйте Validation и Security системы
7. **Отслеживайте производительность** - используйте Performance Monitoring
8. **Кэшируйте где возможно** - используйте Caching System

---

## Дополнительная документация

- `DESIGN-SYSTEM.md` - Документация Design System
- `PROJECT-VISION.md` - Философия проекта
- `README.md` - Общая информация о проекте

