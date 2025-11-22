# Выкуп авто - Remix версия

Полная версия проекта "Выкуп авто" на React Router v7 (включает функциональность Remix).

## Структура проекта

```
remix-version/
├── app/
│   ├── components/      # React компоненты
│   │   ├── ui/         # UI компоненты (Button, Card, Input и т.д.)
│   │   ├── sections/   # Секции страниц (HeroSection, StatsSection и т.д.)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   └── ...
│   ├── lib/            # Утилиты и конфигурация
│   │   ├── config/     # Конфигурация приложения
│   │   ├── validation/ # Валидация форм
│   │   ├── types/       # TypeScript типы
│   │   ├── utils/       # Утилиты
│   │   └── design-system/ # Дизайн-система
│   ├── routes/          # File-based routing
│   │   ├── _index.tsx   # Главная страница
│   │   ├── calculator.tsx
│   │   ├── reviews.tsx
│   │   ├── blog.tsx
│   │   ├── blog.$slug.tsx
│   │   ├── contacts.tsx
│   │   ├── api.evaluation.ts
│   │   ├── api.contact.ts
│   │   ├── api.review.ts
│   │   ├── sitemap[.]xml.tsx
│   │   ├── robots[.]txt.tsx
│   │   └── $.tsx        # 404 страница
│   ├── styles/          # Стили
│   │   └── globals.css
│   ├── root.tsx         # Root layout
│   ├── entry.client.tsx
│   └── entry.server.tsx
├── public/              # Статические файлы
├── package.json
├── react-router.config.ts
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## Установка и запуск

```bash
# Установка зависимостей
npm install --legacy-peer-deps

# Запуск dev сервера
npm run dev

# Сборка для production
npm run build

# Запуск production сервера
npm start
```

## Основные изменения по сравнению с Vite версией

1. **Роутинг**: React Router v7 file-based routing вместо React Router DOM
2. **SSR**: Встроенный SSR через React Router
3. **API Routes**: Resource routes с actions вместо Express routes
4. **Импорты**: Использование `~/` вместо `@/` для путей
5. **Формы**: Использование Remix Form компонента (можно адаптировать)

## Созданные маршруты

- `/` - Главная страница
- `/calculator` - Калькулятор стоимости
- `/reviews` - Отзывы клиентов
- `/blog` - Блог
- `/blog/:slug` - Статья блога
- `/contacts` - Контакты
- `/api/evaluation` - API для формы оценки
- `/api/contact` - API для формы контактов
- `/api/review` - API для формы отзывов
- `/sitemap.xml` - Sitemap
- `/robots.txt` - Robots.txt
- `/*` - 404 страница

## Что портировано

✅ Базовая структура проекта
✅ Tailwind CSS конфигурация
✅ Все компоненты (55+ файлов)
✅ Конфигурация и утилиты
✅ Валидация
✅ Дизайн-система
✅ Основные маршруты
✅ API routes для форм
✅ SEO (sitemap, robots.txt)
✅ Аналитика (Google Analytics, Yandex Metrika)

## Что нужно доработать

- Адаптировать все компоненты (заменить импорты `react-router-dom` на `react-router`)
- Создать остальные маршруты (services, about, faq и т.д.)
- Адаптировать формы для использования Remix Form
- Добавить обработку ошибок
- Настроить переменные окружения
- Добавить тесты

## Технологии

- React Router v7 (Remix функциональность)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons
- Zod (валидация)

