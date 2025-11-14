# Component System - Accessibility Guidelines

Руководство по доступности для всех компонентов проекта.

## WCAG 2.1 AA Compliance

Все компоненты должны соответствовать стандарту WCAG 2.1 Level AA.

## Основные принципы

### 1. Семантический HTML

Используйте правильные HTML теги:
- `<nav>` для навигации
- `<header>`, `<footer>`, `<main>` для структуры
- `<button>` для кнопок, не `<div>`
- `<label>` для полей ввода
- `<form>` для форм

### 2. ARIA атрибуты

#### Обязательные ARIA:
- `aria-label` - для элементов без видимого текста
- `aria-labelledby` - связь с label
- `aria-describedby` - описание элемента
- `aria-invalid` - для полей с ошибками
- `aria-required` - для обязательных полей
- `aria-expanded` - для раскрывающихся элементов
- `aria-controls` - связь с контролируемым элементом
- `aria-hidden="true"` - для декоративных элементов

#### Примеры:
```tsx
// Кнопка меню
<button
  aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
  aria-expanded={isMenuOpen}
  aria-controls="mobile-menu"
>
  <FiMenu aria-hidden="true" />
</button>

// Поле ввода с ошибкой
<Input
  aria-invalid={!!error}
  aria-describedby={error ? `${id}-error` : undefined}
/>
{error && (
  <p id={`${id}-error`} role="alert">
    {error}
  </p>
)}
```

### 3. Keyboard Navigation

Все интерактивные элементы должны быть доступны с клавиатуры:

- **Tab** - переход между элементами
- **Enter/Space** - активация кнопок
- **Arrow keys** - навигация в меню
- **Escape** - закрытие модальных окон

#### Пример:
```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isOpen, onClose]);
```

### 4. Focus Management

- Видимые focus states для всех интерактивных элементов
- Логический порядок фокуса
- Focus trap в модальных окнах
- Skip links для навигации

#### CSS для focus:
```css
*:focus-visible {
  outline: 2px solid var(--color-primary-600);
  outline-offset: 2px;
  border-radius: var(--radius-md);
}
```

### 5. Цвет и контраст

- Минимальный контраст 4.5:1 для обычного текста
- Минимальный контраст 3:1 для крупного текста (18pt+)
- Не полагаться только на цвет для передачи информации

### 6. Размеры кликабельных элементов

- Минимальный размер 44x44px (WCAG 2.1)
- Достаточное пространство между элементами

### 7. Альтернативный текст

- Все изображения должны иметь `alt` текст
- Декоративные изображения: `alt=""`
- Иконки: `aria-label` или `aria-hidden="true"`

### 8. Формы

- Все поля должны иметь `<label>`
- Обязательные поля помечены `aria-required="true"`
- Ошибки связаны через `aria-describedby`
- Успешная валидация через `aria-invalid="false"`

### 9. Анимации

- Уважать `prefers-reduced-motion`
- Не использовать мигающие элементы (>3 раз/сек)

```tsx
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  setPrefersReducedMotion(mediaQuery.matches);
  
  const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
}, []);

<motion.div
  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
/>
```

### 10. Screen Readers

- Использовать `role` атрибуты где необходимо
- `role="alert"` для важных сообщений
- `role="status"` для обновлений статуса
- `role="navigation"` для навигации
- `role="main"` для основного контента

## Чеклист доступности

Перед публикацией компонента проверьте:

- [ ] Все интерактивные элементы доступны с клавиатуры
- [ ] Все изображения имеют alt текст
- [ ] Все формы имеют labels
- [ ] Ошибки связаны с полями через ARIA
- [ ] Focus states видны
- [ ] Контраст текста соответствует WCAG AA
- [ ] Размеры кликабельных элементов >= 44x44px
- [ ] Анимации уважают prefers-reduced-motion
- [ ] Screen reader тестирование пройдено
- [ ] Keyboard navigation работает корректно

## Инструменты для тестирования

1. **Lighthouse** - автоматическая проверка доступности
2. **axe DevTools** - расширение для браузера
3. **WAVE** - веб-доступность evaluation tool
4. **Screen readers** - NVDA, JAWS, VoiceOver

## Ресурсы

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)

