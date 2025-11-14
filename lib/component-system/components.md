# Component System - Components Documentation

Полная документация всех компонентов проекта.

## Структура компонентов

```
components/
├── ui/                    # Базовые UI компоненты
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── LoadingSpinner.tsx
│   └── Toast.tsx
├── sections/              # Секции страниц
│   ├── HeroSection.tsx
│   ├── AdvantagesSection.tsx
│   ├── ProcessSection.tsx
│   ├── StatsSection.tsx
│   ├── ComparisonSection.tsx
│   ├── FAQSection.tsx
│   ├── ReviewsPreview.tsx
│   ├── CasesSection.tsx
│   ├── GuaranteesSection.tsx
│   ├── TrustSection.tsx
│   ├── UrgencySection.tsx
│   └── SectionCTA.tsx
├── Header.tsx             # Навигация
├── Footer.tsx             # Подвал
├── ChatWidget.tsx         # Виджет чата
├── PhoneButton.tsx        # Кнопка звонка
├── CarEvaluationForm.tsx  # Форма оценки
├── Calculator.tsx         # Калькулятор стоимости
├── BlogCard.tsx           # Карточка блога
├── ReviewCard.tsx         # Карточка отзыва
├── Breadcrumbs.tsx        # Хлебные крошки
├── AnimatedCard.tsx       # Анимированная карточка
├── AnimatedSection.tsx    # Анимированная секция
├── FloatingCTA.tsx        # Плавающий CTA
├── PreparationTips.tsx    # Советы по подготовке
├── PriceFactors.tsx       # Факторы цены
├── Analytics.tsx          # Компонент аналитики
└── ScrollAnalytics.tsx    # Аналитика прокрутки
```

## UI Components

### Button

**Расположение:** `components/ui/Button.tsx`

**Описание:** Универсальная кнопка с вариантами стилей и размерами.

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean
- `children`: ReactNode
- `className`: string

**Использование:**
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Нажми меня
</Button>
```

**Accessibility:**
- Поддерживает ARIA атрибуты
- Минимальный размер 44x44px
- Keyboard navigation
- Focus states

### Card

**Расположение:** `components/ui/Card.tsx`

**Описание:** Карточка для отображения контента.

**Props:**
- `variant`: 'default' | 'elevated' | 'outlined'
- `hover`: boolean
- `children`: ReactNode
- `className`: string

**Использование:**
```tsx
<Card variant="elevated" hover>
  <h3>Заголовок</h3>
  <p>Контент карточки</p>
</Card>
```

### Input

**Расположение:** `components/ui/Input.tsx`

**Описание:** Поле ввода с валидацией и иконками.

**Props:**
- `label`: string
- `error`: string
- `success`: boolean
- `helperText`: string
- `leftIcon`: ReactNode
- `rightIcon`: ReactNode
- Стандартные HTML input props

**Использование:**
```tsx
<Input
  label="Email"
  type="email"
  error={errors.email}
  required
/>
```

**Accessibility:**
- Связан с label через htmlFor
- ARIA атрибуты для ошибок
- Keyboard navigation

### Toast

**Расположение:** `components/ui/Toast.tsx`

**Описание:** Уведомления для пользователя.

**Types:**
- 'success' | 'error' | 'info' | 'warning'

**Использование:**
```tsx
import { toast } from '@/lib/toast';

toast.success('Операция выполнена успешно');
toast.error('Произошла ошибка');
```

**Accessibility:**
- ARIA live regions
- Автоматическое скрытие
- Keyboard dismissible

## Layout Components

### Header

**Расположение:** `components/Header.tsx`

**Описание:** Главная навигация сайта.

**Features:**
- Sticky header
- Mobile menu
- Active route highlighting
- Phone buttons

**Accessibility:**
- ARIA navigation labels
- Keyboard navigation
- Mobile menu accessibility

### Footer

**Расположение:** `components/Footer.tsx`

**Описание:** Подвал сайта с контактами и навигацией.

**Features:**
- Контактная информация
- Навигационные ссылки
- Социальные сети (если есть)

## Form Components

### CarEvaluationForm

**Расположение:** `components/CarEvaluationForm.tsx`

**Описание:** Форма для оценки автомобиля.

**Features:**
- Валидация полей
- Автозаполнение марок
- Отслеживание аналитики
- Toast уведомления

**Accessibility:**
- Полная валидация
- ARIA labels
- Error messages

### Calculator

**Расположение:** `components/Calculator.tsx`

**Описание:** Калькулятор стоимости автомобиля.

**Features:**
- Расчет стоимости
- Валидация данных
- Предварительная оценка

## Section Components

Все секции следуют единым принципам:
- Анимации при появлении
- Единый стиль
- Responsive design
- Accessibility

### HeroSection

**Расположение:** `components/sections/HeroSection.tsx`

**Описание:** Главная секция с призывом к действию.

### ProcessSection

**Расположение:** `components/sections/ProcessSection.tsx`

**Описание:** Секция с этапами работы.

### AdvantagesSection

**Расположение:** `components/sections/AdvantagesSection.tsx`

**Описание:** Преимущества компании.

## Правила использования компонентов

1. **Всегда используйте типизированные компоненты** - не создавайте кастомные без необходимости
2. **Следуйте Design System** - используйте токены из `lib/design-system`
3. **Accessibility first** - все компоненты должны быть доступны
4. **Responsive design** - все компоненты адаптивны
5. **Performance** - используйте lazy loading для тяжелых компонентов

