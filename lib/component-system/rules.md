# Component System - Rules and Best Practices

Правила использования компонентов и best practices.

## Правила именования

### Компоненты
- PascalCase для имен компонентов
- Описательные имена
- Суффикс `Section` для секций страниц

Примеры:
- ✅ `CarEvaluationForm`
- ✅ `HeroSection`
- ❌ `Form1`
- ❌ `Section`

### Props
- camelCase для имен props
- Описательные имена
- Boolean props начинаются с `is`, `has`, `should`

Примеры:
- ✅ `isLoading`, `hasError`, `shouldValidate`
- ❌ `loading`, `error`, `validate`

## Структура компонента

### Стандартная структура:

```tsx
'use client'; // Если нужен client-side код

import React from 'react';
import { motion } from 'framer-motion';
// ... другие импорты

interface ComponentProps {
  // Props с типами
  title: string;
  description?: string;
  onAction?: () => void;
}

/**
 * ComponentName - краткое описание
 * 
 * @param props - Props компонента
 * @returns JSX элемент
 */
export default function ComponentName({
  title,
  description,
  onAction,
}: ComponentProps) {
  // Hooks
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // ...
  }, []);
  
  // Handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

## Импорты

### Порядок импортов:
1. React и Next.js
2. Сторонние библиотеки
3. Внутренние компоненты
4. Утилиты и типы
5. Стили (если есть)

```tsx
// 1. React/Next.js
import React, { useState } from 'react';
import Link from 'next/link';

// 2. Сторонние библиотеки
import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';

// 3. Внутренние компоненты
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// 4. Утилиты и типы
import { APP_CONFIG } from '@/lib/config';
import type { User } from '@/lib/types';

// 5. Стили (если есть)
import styles from './Component.module.css';
```

## Использование Design System

Всегда используйте токены из Design System:

```tsx
// ✅ Правильно
<div className="p-4 bg-primary-600 text-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold">Заголовок</h2>
</div>

// ❌ Неправильно
<div className="p-[16px] bg-[#0284c7] text-white rounded-[8px]">
  <h2 className="text-[24px] font-[700]">Заголовок</h2>
</div>
```

## Props и типизация

### Обязательные правила:
1. Все props должны быть типизированы
2. Используйте `interface` для props
3. Опциональные props помечайте `?`
4. Используйте `React.ReactNode` для children

```tsx
interface ButtonProps {
  // Обязательные
  children: React.ReactNode;
  onClick: () => void;
  
  // Опциональные
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}
```

## Обработка событий

### Именование handlers:
- `handle` + действие: `handleClick`, `handleSubmit`
- `on` + событие: `onChange`, `onFocus`

```tsx
const handleClick = () => {
  // Логика
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Логика
};
```

## Условный рендеринг

### Предпочтительные способы:

```tsx
// ✅ Простое условие
{isVisible && <Component />}

// ✅ Тернарный оператор для альтернативы
{isLoading ? <Spinner /> : <Content />}

// ✅ Множественные условия
{status === 'loading' && <Spinner />}
{status === 'error' && <Error />}
{status === 'success' && <Content />}
```

## Списки и ключи

```tsx
// ✅ Правильно
{items.map((item) => (
  <Item key={item.id} {...item} />
))}

// ❌ Неправильно (использование index)
{items.map((item, index) => (
  <Item key={index} {...item} />
))}
```

## Performance

### Оптимизации:
1. Используйте `React.memo` для тяжелых компонентов
2. Используйте `useMemo` для вычислений
3. Используйте `useCallback` для handlers
4. Lazy loading для больших компонентов

```tsx
// Memo для предотвращения лишних рендеров
export default React.memo(function Component({ data }) {
  // ...
});

// useMemo для вычислений
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// useCallback для handlers
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);
```

## Error Boundaries

Для критических компонентов используйте Error Boundaries:

```tsx
<ErrorBoundary fallback={<ErrorFallback />}>
  <CriticalComponent />
</ErrorBoundary>
```

## Тестирование

Каждый компонент должен быть тестируемым:
- Изолированная логика
- Четкие props
- Предсказуемое поведение
- Тесты для критических путей

## Документация

Каждый компонент должен иметь:
- JSDoc комментарий с описанием
- Описание props
- Примеры использования
- Accessibility notes (если применимо)

```tsx
/**
 * Button - универсальная кнопка
 * 
 * @param variant - Стиль кнопки ('primary' | 'secondary' | 'outline' | 'ghost')
 * @param size - Размер кнопки ('sm' | 'md' | 'lg')
 * @param isLoading - Показывать ли состояние загрузки
 * @param children - Содержимое кнопки
 * 
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Нажми меня
 * </Button>
 */
```

