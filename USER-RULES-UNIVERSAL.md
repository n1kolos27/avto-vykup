# User Rules - Universal Development Standards

## ⚡ КРИТИЧЕСКИ ВАЖНЫЕ ПРАВИЛА РАБОТЫ AI

### 🔴 ОБЯЗАТЕЛЬНО ПЕРЕД ЗАВЕРШЕНИЕМ ЛЮБОЙ ЗАДАЧИ:

1. **ТЕСТИРОВАНИЕ НА LOCALHOST - ОБЯЗАТЕЛЬНО**
   - НИКОГДА не завершай задачу без проверки на localhost
   - Запускай сервер разработки и проверяй, что все работает:
     * Frontend: `npm run dev`, `yarn dev`, `pnpm dev`, `npm start` и т.д.
     * Backend: проверь API endpoints, database connections
     * Full Stack: проверь интеграцию frontend-backend
   - Проверяй в браузере/Postman/клиенте, что функционал работает корректно
   - Если что-то не работает - ИСПРАВЛЯЙ сразу, не откладывай
   - Не говори "сделал, проверьте сами" - ПРОВЕРЬ САМ

2. **АНАЛИЗ КАЖДОГО ЭЛЕМЕНТА**
   - Каждый созданный/измененный компонент/модуль должен быть проанализирован на:
     * **SEO оптимизацию** (мета-теги, Schema.org, семантика, структурированные данные)
     * **Performance** (Lighthouse метрики, bundle size, lazy loading, database queries, API response time)
     * **Accessibility** (ARIA, keyboard navigation, контраст, screen readers)
     * **Security** (валидация, санитизация, rate limiting, SQL injection, XSS, CSRF)
     * **Code Quality** (TypeScript strict, ESLint, типизация, SOLID принципы, DRY, KISS)
     * **Scalability** (может ли код масштабироваться, нет ли узких мест)
     * **Maintainability** (читаемость, документация, тестируемость)
   - НЕ создавай "работающий" код - создавай "production-ready" код

3. **ПРОАКТИВНОЕ ПРЕДЛОЖЕНИЕ УЛУЧШЕНИЙ**
   - После каждого изменения анализируй:
     * Можно ли улучшить метрики производительности?
     * Есть ли возможности для оптимизации (кэширование, мемоизация, индексы БД)?
     * Нужны ли дополнительные функции для полноты решения?
     * Соответствует ли элемент индустриальным стандартам?
     * Можно ли улучшить архитектуру?
     * Есть ли дублирование кода?
   - Предлагай конкретные улучшения с обоснованием, не жди запроса
   - Ищи паттерны и анти-паттерны в коде

4. **ДОВЕДЕНИЕ ДО СОВЕРШЕНСТВА ("PRODUCTION-READY")**
   - Каждый элемент должен быть доведен до production-ready состояния:
     * Все edge cases обработаны (null checks, error boundaries, fallbacks)
     * Все состояния (loading, error, success, empty) реализованы
     * Все анимации/переходы плавные и осмысленные
     * Все тексты проверены на опечатки и грамматику
     * Все изображения/ассеты оптимизированы
     * Все формы валидированы на клиенте и сервере
     * Все API endpoints имеют обработку ошибок
     * Все database queries оптимизированы и безопасны
     * Все зависимости актуальны и безопасны
   - НЕ останавливайся на "работает" - доводи до "production-ready"

5. **РАБОТА С МЕТРИКАМИ И СТАНДАРТАМИ**
   - Каждое изменение должно улучшать или поддерживать высокие метрики:
     * **Frontend**: Lighthouse Score 90+/100, Core Web Vitals в зеленой зоне
     * **Backend**: Response time < 200ms для простых запросов, < 1s для сложных
     * **Database**: Query time < 100ms для простых запросов, правильные индексы
     * **API**: Rate limiting, proper status codes, error handling
     * **Code Quality**: ESLint 0 ошибок, TypeScript strict mode, 0 any
     * **Test Coverage**: Критичные пути покрыты тестами
   - Если метрика ухудшилась - ИСПРАВЛЯЙ немедленно
   - Измеряй метрики ДО и ПОСЛЕ изменений

6. **НЕ ЖДАТЬ - АНАЛИЗИРОВАТЬ И ПРЕДЛАГАТЬ**
   - Не жди указаний - анализируй проект и предлагай улучшения:
     * Ищи узкие места в производительности (N+1 queries, неоптимальные алгоритмы)
     * Ищи возможности для улучшения UX (loading states, error messages, feedback)
     * Ищи возможности для улучшения SEO (мета-теги, структурированные данные)
     * Ищи возможности для улучшения безопасности (валидация, санитизация)
     * Ищи возможности для рефакторинга (дублирование, сложность)
     * Предлагай расширения функционала в рамках архитектуры проекта

7. **ПРОВЕРКА РАБОТОСПОСОБНОСТИ**
   - После ЛЮБОГО изменения:
     * Проверь, что проект собирается: `npm run build`, `yarn build`, `mvn build` и т.д.
     * Проверь, что нет ошибок TypeScript/компиляции
     * Проверь, что нет ошибок ESLint/Linter
     * Проверь, что нет ошибок тестов: `npm test`, `pytest`, `jest` и т.д.
     * Проверь, что сервер запускается без ошибок
     * Проверь в браузере/клиенте, что все работает
     * Проверь логи на наличие warnings/errors
   - Если что-то сломалось - ИСПРАВЛЯЙ сразу

8. **ДОКУМЕНТАЦИЯ И КОММЕНТАРИИ**
   - Все сложные решения должны быть задокументированы:
     * JSDoc/TSDoc для всех публичных функций, классов, компонентов
     * README для сложных модулей с примерами использования
     * Комментарии для неочевидной бизнес-логики и алгоритмов
     * API документация для endpoints (OpenAPI/Swagger где применимо)
     * Database schema документация
   - Обновляй документацию при изменениях
   - Документируй "почему", а не "что" (код сам говорит "что")

### 🚫 ЗАПРЕЩЕНО:

- ❌ Завершать задачу без проверки на localhost
- ❌ Говорить "сделал, проверьте сами"
- ❌ Создавать код, который "работает, но не production-ready"
- ❌ Игнорировать метрики производительности
- ❌ Пропускать валидацию и безопасность
- ❌ Использовать `any` в TypeScript (используй `unknown` если необходимо)
- ❌ Оставлять TODO комментарии без реализации или с датой реализации
- ❌ Создавать компоненты без accessibility
- ❌ Использовать произвольные значения вместо констант/конфигурации
- ❌ Хардкодить значения (URLs, credentials, magic numbers)
- ❌ Игнорировать ошибки (catch и молчать)
- ❌ Создавать технический долг без обоснования

### ✅ ОБЯЗАТЕЛЬНО:

- ✅ Тестировать на localhost перед завершением
- ✅ Анализировать каждый элемент на все метрики
- ✅ Предлагать улучшения проактивно
- ✅ Доводить до production-ready состояния каждый элемент
- ✅ Измерять метрики до и после изменений
- ✅ Исправлять проблемы немедленно
- ✅ Документировать сложные решения
- ✅ Следовать принципам SOLID, DRY, KISS, YAGNI
- ✅ Использовать типизацию везде где возможно
- ✅ Обрабатывать все edge cases и ошибки

---

## 🔄 ПРОЦЕСС РАБОТЫ НАД ЗАДАЧЕЙ

### Шаг 1: Анализ и планирование
1. Изучи существующий код и архитектуру проекта
2. Определи, какие компоненты/модули/системы затронуты
3. Проверь метрики ДО изменений (если возможно)
4. Составь план с учетом всех аспектов качества:
   - Архитектурные решения
   - Влияние на производительность
   - Безопасность
   - Масштабируемость
   - Тестируемость
5. Определи зависимости и риски

### Шаг 2: Реализация
1. Следуй всем правилам кодирования из этого файла
2. Используй только конфигурацию/константы из централизованных мест
3. Типизируй все через TypeScript strict mode / строгую типизацию
4. Добавляй валидацию и безопасность на всех уровнях
5. Реализуй все состояния (loading, error, success, empty)
6. Добавляй ARIA атрибуты для accessibility (frontend)
7. Оптимизируй database queries (backend)
8. Добавляй proper error handling везде

### Шаг 3: Тестирование на localhost
1. Запусти сервер разработки
2. Проверь все сценарии использования:
   - Happy path (основной сценарий)
   - Edge cases (граничные случаи)
   - Error cases (ошибки)
3. Проверь на разных размерах экрана (responsive для frontend)
4. Проверь keyboard navigation (accessibility)
5. Проверь работу форм и валидацию
6. Проверь обработку ошибок
7. Проверь API endpoints (если backend)
8. Проверь database queries (если backend)

### Шаг 4: Проверка качества кода
1. Запусти linter - должно быть 0 ошибок
2. Проверь TypeScript - должно быть 0 ошибок, 0 any
3. Проверь, что все импорты корректны
4. Проверь, что нет неиспользуемого кода
5. Проверь code style (Prettier, ESLint)
6. Проверь, что нет дублирования кода
7. Проверь сложность кода (cyclomatic complexity)

### Шаг 5: Проверка метрик
1. Запусти Lighthouse в браузере (frontend)
2. Проверь Core Web Vitals
3. Проверь SEO Score (если применимо)
4. Проверь Accessibility Score
5. Проверь Performance метрики backend (response time, throughput)
6. Проверь database performance (query time, indexes)
7. Если метрики ниже целевых - ИСПРАВЛЯЙ

### Шаг 6: Анализ и предложение улучшений
1. Проанализируй созданный/измененный элемент:
   - Можно ли улучшить производительность?
   - Можно ли улучшить UX?
   - Можно ли улучшить SEO?
   - Можно ли улучшить безопасность?
   - Можно ли улучшить архитектуру?
   - Есть ли возможности для рефакторинга?
   - Есть ли возможности для расширения функционала?
2. Предложи конкретные улучшения с обоснованием
3. Если улучшения критичны - реализуй их сразу

### Шаг 7: Финальная проверка
1. Убедись, что все работает на localhost
2. Убедись, что нет ошибок в консоли браузера/логах
3. Убедись, что нет ошибок в терминале
4. Убедись, что метрики соответствуют целям
5. Убедись, что документация обновлена
6. Только после этого сообщай о завершении

---

## 🎯 Философия разработки

**Главный принцип: Production-ready с первого коммита**

Каждый элемент проекта должен быть готов к production:
- **Code Quality**: ESLint 0 ошибок, TypeScript strict mode, 0 any, SOLID принципы
- **Performance**: Оптимальные метрики для стека (Lighthouse 90+, API < 200ms, DB queries < 100ms)
- **Security**: 0 уязвимостей, валидация 100% входных данных, proper authentication/authorization
- **Accessibility**: WCAG 2.1 AA соответствие, keyboard navigation, screen reader support
- **SEO**: Правильные мета-теги, структурированные данные, semantic HTML
- **Scalability**: Код готов к масштабированию, нет узких мест
- **Maintainability**: Читаемый код, документация, тестируемость

**Принципы работы:**
- **Непрерывное улучшение**: каждое изменение должно улучшать или поддерживать метрики
- **Data-driven подход**: решения на основе данных, метрик и аналитики
- **Best Practices First**: следование индустриальным стандартам и паттернам
- **Проактивность**: выявление и устранение проблем до их возникновения
- **SOLID принципы**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **DRY (Don't Repeat Yourself)**: избегай дублирования кода
- **KISS (Keep It Simple, Stupid)**: простота превыше сложности
- **YAGNI (You Aren't Gonna Need It)**: не добавляй функционал "на будущее"

---

## 🏗 Архитектурные принципы

### Модульность и разделение ответственности

Каждый модуль/компонент должен иметь одну четкую ответственность:

```typescript
// ✅ Правильно - Single Responsibility Principle
class UserService {
  async getUser(id: string): Promise<User> { }
  async updateUser(id: string, data: UserData): Promise<User> { }
}

class UserValidator {
  validateUserData(data: UserData): ValidationResult { }
}

// ❌ Неправильно - слишком много ответственностей
class UserManager {
  async getUser() { }
  async validateUser() { }
  async sendEmail() { }
  async generateReport() { }
}
```

### Централизация конфигурации

Все настройки приложения должны быть централизованы:

```typescript
// ✅ Правильно
// config/app.config.ts
export const APP_CONFIG = {
  api: {
    baseUrl: process.env.API_BASE_URL,
    timeout: 5000,
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
  },
};

// Использование
import { APP_CONFIG } from '@/config/app.config';
const apiUrl = APP_CONFIG.api.baseUrl;

// ❌ Неправильно
const apiUrl = process.env.API_BASE_URL; // Прямое использование env
const timeout = 5000; // Хардкод
```

### Структура типов

Типы должны быть организованы по модулям и переиспользоваться:

```typescript
// ✅ Правильно
// types/user.types.ts
export interface User {
  id: string;
  email: string;
  name: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

// types/api.types.ts
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

// Использование
import type { User, UserRole } from '@/types/user.types';
import type { ApiResponse } from '@/types/api.types';

// ❌ Неправильно
// Определение типов в компонентах/модулях
function UserComponent() {
  type User = { id: string; name: string; }; // Дублирование
}
```

### Design System подходы

Используй систему дизайн-токенов для консистентности:

```typescript
// ✅ Правильно
// design-system/tokens.ts
export const TOKENS = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    error: '#dc3545',
  },
  typography: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
  },
};

// Использование
import { TOKENS } from '@/design-system/tokens';
const padding = TOKENS.spacing.md;

// ❌ Неправильно
const padding = '16px'; // Произвольные значения
const color = '#007bff'; // Хардкод цветов
```

### Паттерны проектирования

Используй проверенные паттерны где уместно:

```typescript
// ✅ Правильно - Repository Pattern
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}

class PostgresUserRepository implements UserRepository {
  // Реализация для PostgreSQL
}

class MongoUserRepository implements UserRepository {
  // Реализация для MongoDB
}

// ✅ Правильно - Factory Pattern
class DatabaseConnectionFactory {
  static create(type: 'postgres' | 'mongodb'): DatabaseConnection {
    switch (type) {
      case 'postgres':
        return new PostgresConnection();
      case 'mongodb':
        return new MongoConnection();
    }
  }
}

// ✅ Правильно - Dependency Injection
class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService
  ) {}
}
```

---

## 📝 Правила кодирования

### Именование

**Компоненты/Классы:**
- PascalCase для имен компонентов, классов, интерфейсов
- Описательные имена, отражающие назначение
- Избегай аббревиатур если они не общеприняты

```typescript
// ✅ Правильно
export class UserAuthenticationService { }
export interface PaymentProcessor { }
export default function UserProfileCard() { }

// ❌ Неправильно
export class UAS { } // Непонятная аббревиатура
export class Service1 { } // Неописательное имя
export default function Card() { } // Слишком общее
```

**Переменные и функции:**
- camelCase для переменных и функций
- Описательные имена
- Boolean переменные начинаются с `is`, `has`, `should`, `can`
- Функции-обработчики начинаются с `handle`, `on`
- Функции-валидаторы начинаются с `validate`, `is`, `check`
- Функции-получатели данных начинаются с `get`, `fetch`, `load`

```typescript
// ✅ Правильно
const isLoading = true;
const hasError = false;
const shouldValidate = true;
const canEdit = false;
const handleSubmit = () => { };
const validateEmail = (email: string) => { };
const getUserById = async (id: string) => { };

// ❌ Неправильно
const loading = true;
const error = false;
const validate = true;
const submit = () => { };
const email = (email: string) => { };
```

**Константы:**
- UPPER_SNAKE_CASE для констант
- Группируй связанные константы в объекты

```typescript
// ✅ Правильно
const MAX_RETRY_ATTEMPTS = 3;
const API_TIMEOUT_MS = 5000;

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// ❌ Неправильно
const maxRetryAttempts = 3; // Должна быть константа
const apiTimeout = 5000;
```

**Файлы и директории:**
- kebab-case для файлов и директорий
- Имена файлов должны отражать содержимое

```
// ✅ Правильно
user-service.ts
user-profile-card.tsx
api-client.ts
database-connection.ts

// ❌ Неправильно
UserService.ts // PascalCase для файлов
user.ts // Слишком общее
service.ts // Неописательное
```

### Структура файлов и компонентов

Стандартный порядок в файлах:

```typescript
// 1. Импорты внешних библиотек
import React, { useState, useEffect } from 'react';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

// 2. Импорты внутренних модулей (группируй по типу)
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { UserService } from '@/services/user.service';
import { validateEmail } from '@/utils/validation';

// 3. Импорты типов
import type { User } from '@/types/user.types';
import type { ApiResponse } from '@/types/api.types';

// 4. Константы модуля
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT = 5000;

// 5. Типы и интерфейсы
interface ComponentProps {
  title: string;
  description?: string;
}

// 6. Основной код
export default function Component({ title, description }: ComponentProps) {
  // Hooks / State
  const [state, setState] = useState();

  // Effects
  useEffect(() => { }, []);

  // Handlers
  const handleClick = () => { };

  // Render / Return
  return <div>{/* JSX */}</div>;
}

// 7. Вспомогательные функции (если используются только здесь)
function helperFunction() { }
```

### TypeScript/JavaScript правила

**TypeScript:**
- ✅ Strict mode всегда включен
- ✅ Все функции, компоненты, классы типизированы
- ✅ Использовать `interface` для объектов, `type` для union types и utility types
- ✅ Избегать `any` - использовать `unknown` если необходимо
- ✅ Опциональные параметры помечаются `?`
- ✅ Использовать `as const` для литеральных типов
- ✅ Использовать generics для переиспользуемого кода

```typescript
// ✅ Правильно
interface User {
  id: string;
  email: string;
  name?: string; // Опциональное поле
}

type UserRole = 'admin' | 'user' | 'guest'; // Union type

function processData<T>(data: T): T { // Generic
  return data;
}

const STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const; // Literal type

// ❌ Неправильно
function processData(data: any): any { // any запрещен
  return data;
}

interface User {
  id: any; // any запрещен
  email: string;
}
```

**JavaScript (если используется):**
- ✅ Использовать современный синтаксис (ES6+)
- ✅ Использовать `const` по умолчанию, `let` только когда нужно переприсваивание
- ✅ Избегать `var`
- ✅ Использовать arrow functions где возможно
- ✅ Использовать деструктуризацию
- ✅ Использовать async/await вместо callbacks

```javascript
// ✅ Правильно
const users = [];
let currentIndex = 0;

const getUser = async (id) => {
  const response = await fetch(`/api/users/${id}`);
  const { data } = await response.json();
  return data;
};

// ❌ Неправильно
var users = []; // var устарел
let users = []; // const достаточно если не переприсваивается

function getUser(id, callback) { // Callback вместо async/await
  fetch(`/api/users/${id}`).then(response => {
    callback(response);
  });
}
```

### Code Organization

**Разделение по слоям (Layered Architecture):**

```
project/
├── src/
│   ├── presentation/     # UI слой (React components, pages)
│   ├── application/      # Бизнес-логика (services, use cases)
│   ├── domain/           # Доменная модель (entities, types)
│   ├── infrastructure/   # Инфраструктура (database, API clients)
│   └── shared/           # Общие утилиты и константы
```

**Разделение по фичам (Feature-based):**

```
project/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   ├── users/
│   │   └── payments/
│   └── shared/
```

**Разделение по типам (Type-based):**

```
project/
├── src/
│   ├── components/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── hooks/
│   └── constants/
```

Выбирай подход в зависимости от размера проекта и команды.

---

## 🚀 Full Stack подходы

### Frontend паттерны

**React/Next.js:**
- Server Components по умолчанию, Client Components только когда необходимо
- Использовать `use client` директиву только для интерактивности
- Code splitting для больших компонентов
- Lazy loading для не критичных компонентов
- Оптимизация ре-рендеров (React.memo, useMemo, useCallback)

```typescript
// ✅ Правильно - Server Component
export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id); // Server-side data fetching
  return <UserProfile user={user} />;
}

// ✅ Правильно - Client Component только для интерактивности
'use client';
export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// ✅ Правильно - Code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
});
```

**Vue.js:**
- Composition API для новой логики
- Оптимизация реактивности (ref, computed, watch)
- Lazy loading компонентов

```typescript
// ✅ Правильно
<script setup lang="ts">
import { ref, computed } from 'vue';

const count = ref(0);
const doubleCount = computed(() => count.value * 2);
</script>
```

**Angular:**
- OnPush change detection strategy
- Lazy loading модулей
- Использование RxJS для асинхронных операций

```typescript
// ✅ Правильно
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent { }
```

### Backend паттерны

**API Design:**
- RESTful принципы для REST APIs
- Правильные HTTP методы (GET, POST, PUT, PATCH, DELETE)
- Правильные HTTP status codes
- Версионирование API (`/api/v1/`, `/api/v2/`)
- Pagination для списков
- Filtering, sorting, searching
- Rate limiting
- Proper error responses

```typescript
// ✅ Правильно
// GET /api/v1/users?page=1&limit=10&sort=name&filter=active
router.get('/api/v1/users', async (req, res) => {
  const { page = 1, limit = 10, sort, filter } = req.query;

  try {
    const users = await userService.getUsers({
      page: parseInt(page),
      limit: parseInt(limit),
      sort,
      filter,
    });

    res.status(200).json({
      data: users,
      pagination: {
        page,
        limit,
        total: users.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

// ❌ Неправильно
router.get('/users', async (req, res) => {
  const users = await db.users.findMany(); // Нет pagination, фильтрации
  res.json(users); // Нет обработки ошибок, неправильный формат ответа
});
```

**Database Patterns:**
- Использовать ORM/Query Builder для безопасности
- Prepared statements для предотвращения SQL injection
- Правильные индексы для производительности
- Транзакции для атомарных операций
- Миграции для изменений схемы
- Connection pooling

```typescript
// ✅ Правильно - ORM (Prisma example)
const user = await prisma.user.create({
  data: {
    email: validatedEmail, // Валидированные данные
    name: validatedName,
  },
});

// ✅ Правильно - Транзакция
await prisma.$transaction(async (tx) => {
  await tx.user.create({ data: userData });
  await tx.account.create({ data: accountData });
});

// ❌ Неправильно - Raw SQL без prepared statements
const query = `SELECT * FROM users WHERE email = '${email}'`; // SQL injection risk
```

**Error Handling:**
- Централизованная обработка ошибок
- Правильные типы ошибок
- Логирование ошибок
- User-friendly error messages
- Не раскрывать внутренние детали в production

```typescript
// ✅ Правильно
class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public isOperational = true
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
  }
}

// Middleware для обработки ошибок
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  res.status(err.statusCode || 500).json({
    error: err.isOperational ? err.message : 'Internal server error',
  });
});
```

### DevOps подходы

**CI/CD:**
- Автоматические тесты в pipeline
- Линтинг и проверка типов
- Build проверка
- Автоматический deployment после успешных тестов
- Environment variables для разных окружений

```yaml
# ✅ Правильно - GitHub Actions example
name: CI/CD Pipeline

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

**Environment Management:**
- Разные конфигурации для dev, staging, production
- Secrets management (не коммитить в git)
- Environment variables для конфигурации

```typescript
// ✅ Правильно
const config = {
  env: process.env.NODE_ENV || 'development',
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL, // Из secrets
  jwtSecret: process.env.JWT_SECRET, // Из secrets
};

// ❌ Неправильно
const config = {
  apiUrl: 'http://localhost:3000', // Хардкод
  jwtSecret: 'my-secret-key', // В коде!
};
```

### Testing подходы

**Unit Tests:**
- Тестировать изолированные функции/методы
- Покрывать edge cases
- Использовать моки для зависимостей

```typescript
// ✅ Правильно
describe('validateEmail', () => {
  it('should return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('should return false for invalid email', () => {
    expect(validateEmail('invalid')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
});
```

**Integration Tests:**
- Тестировать взаимодействие компонентов
- Тестировать API endpoints
- Использовать test database

```typescript
// ✅ Правильно
describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', name: 'Test User' })
      .expect(201);

    expect(response.body.data.email).toBe('test@example.com');
  });
});
```

**E2E Tests:**
- Тестировать полные пользовательские сценарии
- Использовать инструменты типа Playwright, Cypress

```typescript
// ✅ Правильно
test('user can login and view profile', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/profile');
});
```

---

## ✨ Quality Assurance

### Code Quality

**ESLint/Prettier:**
- 0 ошибок, 0 предупреждений
- Консистентный code style
- Автоматическое форматирование

**TypeScript:**
- Strict mode всегда включен
- 0 использований `any`
- Все функции и компоненты типизированы
- Правильное использование generics

**Code Review Checklist:**
- [ ] Код читаемый и понятный
- [ ] Нет дублирования кода
- [ ] Следует принципам SOLID
- [ ] Правильная обработка ошибок
- [ ] Есть тесты для критичных путей
- [ ] Документация обновлена

### Performance метрики

**Frontend:**
- Lighthouse Score: 90+/100
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1
- Total Blocking Time (TBT): < 200ms
- Bundle size оптимизирован

**Backend:**
- Response time: < 200ms для простых запросов, < 1s для сложных
- Throughput: достаточная для нагрузки
- Database query time: < 100ms
- Memory usage: в пределах нормы
- CPU usage: оптимизирован

**Оптимизации:**
- Code splitting
- Lazy loading
- Caching (browser, CDN, server)
- Database indexing
- Query optimization
- Image optimization
- Minification и compression

### Security требования

**Валидация:**
- Все пользовательские данные валидированы
- Валидация на клиенте И сервере
- Sanitization для предотвращения XSS
- Parameterized queries для предотвращения SQL injection

**Authentication & Authorization:**
- Secure password hashing (bcrypt, argon2)
- JWT tokens с expiration
- Proper session management
- Role-based access control (RBAC)

**Security Headers:**
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- Referrer-Policy

**Rate Limiting:**
- Защита от brute force
- API rate limiting
- DDoS protection

### Accessibility стандарты

**WCAG 2.1 AA соответствие:**
- Минимальный контраст текста: 4.5:1 для обычного текста, 3:1 для крупного
- Минимальный размер кликабельных элементов: 44x44px
- Правильные ARIA атрибуты
- Keyboard navigation для всех интерактивных элементов
- Screen reader support
- Focus management

```tsx
// ✅ Правильно
<button
  aria-label="Закрыть модальное окно"
  aria-expanded={isOpen}
  onClick={handleClose}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClose();
    }
  }}
>
  <CloseIcon aria-hidden="true" />
</button>

<input
  aria-invalid={hasError}
  aria-describedby={hasError ? 'error-message' : undefined}
/>
```

### SEO оптимизация

**Мета-теги:**
- Title (уникальный для каждой страницы)
- Description (релевантное описание)
- Open Graph теги
- Twitter Card теги

**Структурированные данные:**
- Schema.org разметка
- JSON-LD формат
- Релевантные типы (Organization, Product, Article и т.д.)

**Технические аспекты:**
- Semantic HTML
- Правильная иерархия заголовков (h1-h6)
- Alt текст для изображений
- Sitemap.xml
- Robots.txt
- Canonical URLs
- Mobile-friendly (responsive design)

---

## 🚀 Best Practices

### Error Handling

**Frontend:**
```typescript
// ✅ Правильно - Error Boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

// ✅ Правильно - Try-catch для async операций
try {
  const data = await fetchData();
} catch (error) {
  if (error instanceof NetworkError) {
    showError('Network error. Please check your connection.');
  } else {
    showError('Something went wrong. Please try again.');
  }
  logger.error(error);
}
```

**Backend:**
```typescript
// ✅ Правильно - Централизованная обработка
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error({
    error: err,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Не раскрывать внутренние ошибки в production
  res.status(500).json({
    error: 'Internal server error',
  });
});
```

### Caching Strategies

**Browser Caching:**
- Static assets: long cache (1 year) с versioning
- HTML: short cache или no-cache
- API responses: appropriate cache headers

**Server-side Caching:**
- Redis для session storage
- Memory cache для часто используемых данных
- CDN для static assets

```typescript
// ✅ Правильно
const cacheKey = `user:${userId}`;
const cachedUser = await redis.get(cacheKey);

if (cachedUser) {
  return JSON.parse(cachedUser);
}

const user = await userService.getUser(userId);
await redis.setex(cacheKey, 3600, JSON.stringify(user)); // Cache for 1 hour
return user;
```

### State Management

**Frontend:**
- Локальное состояние: useState, useReducer
- Глобальное состояние: Context API, Zustand, Redux (если необходимо)
- Server state: React Query, SWR

```typescript
// ✅ Правильно - React Query для server state
const { data, isLoading, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

**Backend:**
- Stateless design где возможно
- Session management для stateful операций
- Database для persistent state

### Bundle Size оптимизация

- Code splitting
- Tree shaking
- Dynamic imports
- Удаление неиспользуемых зависимостей
- Оптимизация изображений
- Минификация и compression

```typescript
// ✅ Правильно - Dynamic import
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false, // Если не нужен на сервере
});

// ✅ Правильно - Tree shaking friendly imports
import { debounce } from 'lodash-es'; // Вместо import _ from 'lodash'
```

---

## ✅ Чеклист перед коммитом

Перед каждым коммитом проверь:

### Code Quality
- [ ] ESLint/Linter: 0 ошибок, 0 предупреждений
- [ ] TypeScript: 0 ошибок, 0 any
- [ ] Все функции/компоненты/классы типизированы
- [ ] Нет дублирования кода
- [ ] Код следует принципам SOLID, DRY, KISS
- [ ] Нет неиспользуемого кода

### Functionality
- [ ] Все работает на localhost
- [ ] Нет ошибок в консоли браузера/логах
- [ ] Все edge cases обработаны
- [ ] Все состояния (loading, error, success) реализованы
- [ ] Формы валидированы на клиенте и сервере

### Security
- [ ] Валидация всех пользовательских данных
- [ ] Санитизация пользовательского контента
- [ ] Нет SQL injection уязвимостей
- [ ] Нет XSS уязвимостей
- [ ] Rate limiting для API endpoints
- [ ] Правильная аутентификация и авторизация

### Performance
- [ ] Оптимизированы database queries
- [ ] Правильные индексы в базе данных
- [ ] Code splitting для больших компонентов
- [ ] Lazy loading где применимо
- [ ] Оптимизированы изображения
- [ ] Bundle size в пределах нормы

### Accessibility
- [ ] ARIA атрибуты для интерактивных элементов
- [ ] Keyboard navigation работает
- [ ] Контраст текста соответствует WCAG AA
- [ ] Screen reader friendly

### SEO (если применимо)
- [ ] Мета-теги добавлены (для новых страниц)
- [ ] Schema.org разметка (где применимо)
- [ ] Semantic HTML
- [ ] Alt текст для изображений

### Testing
- [ ] Unit тесты проходят (если есть)
- [ ] Integration тесты проходят (если есть)
- [ ] E2E тесты проходят (если есть)
- [ ] Критичные пути покрыты тестами

### Documentation
- [ ] JSDoc/TSDoc для публичных функций
- [ ] README обновлен (если необходимо)
- [ ] API документация обновлена (если необходимо)
- [ ] Комментарии для сложной логики

### DevOps
- [ ] Build проходит успешно
- [ ] Environment variables настроены правильно
- [ ] Миграции базы данных (если есть) протестированы
- [ ] CI/CD pipeline проходит (если настроен)

---

## 📚 Дополнительные принципы

### Принцип "Production-ready с первого коммита"

Каждый коммит должен быть готов к production:
- Код работает корректно
- Обработаны ошибки
- Есть валидация
- Оптимизирована производительность
- Соблюдена безопасность
- Есть документация

### Принцип "Непрерывного улучшения"

Каждое изменение должно:
- Улучшать или поддерживать метрики
- Улучшать читаемость кода
- Улучшать архитектуру
- Улучшать производительность
- Улучшать безопасность

### Принцип "Проактивности"

Не жди проблем - предотвращай их:
- Анализируй код на потенциальные проблемы
- Предлагай улучшения до запроса
- Оптимизируй до появления узких мест
- Документируй до возникновения вопросов

### Принцип "Best Practices First"

Всегда следуй индустриальным стандартам:
- Используй проверенные паттерны
- Следуй рекомендациям фреймворков/библиотек
- Изучай best practices для используемых технологий
- Не изобретай велосипед

---

**Помни: Цель - Production-ready код. Всегда. По всем метрикам. Без компромиссов.**
