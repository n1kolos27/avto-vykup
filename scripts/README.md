# Скрипты для проверки и оптимизации

Этот каталог содержит утилиты для автоматической проверки производительности и SEO оптимизации проекта.

## Доступные скрипты

### 1. Проверка производительности

```bash
npm run check:performance [URL]
```

Проверяет:
- Наличие критичных изображений
- Запускает Lighthouse аудит (если установлен)
- Генерирует отчет о производительности

**Параметры:**
- `URL` - URL для проверки (по умолчанию: http://localhost:3000)
- `--install-lighthouse` - автоматически установить Lighthouse CLI

**Примеры:**
```bash
# Проверка локального сервера
npm run check:performance

# Проверка production сайта
npm run check:performance https://your-domain.com

# С автоматической установкой Lighthouse
npm run check:performance -- --install-lighthouse
```

**Требования:**
- Node.js
- Lighthouse CLI (опционально, можно установить автоматически)

### 2. Проверка SEO

```bash
npm run check:seo
```

Проверяет:
- Наличие критичных изображений (og-image.png, icons, logo.png)
- Наличие SEO файлов (robots.txt, sitemap.ts, manifest.ts)
- Schema.org разметку в layout.tsx
- Метаданные

**Пример:**
```bash
npm run check:seo
```

### 3. Комплексная проверка

```bash
npm run check:all
```

Запускает все проверки последовательно:
1. SEO проверка
2. Проверка производительности

### 4. Генерация placeholder изображений

```bash
npm run generate:placeholders
```

Создает SVG placeholder изображения для разработки.

**⚠ ВНИМАНИЕ:** Это временные placeholder изображения. Для production необходимо создать реальные изображения с логотипом и брендингом.

## Установка зависимостей

### Lighthouse CLI

Для полной проверки производительности установите Lighthouse:

```bash
npm install -g lighthouse
```

Или используйте флаг `--install-lighthouse` при запуске проверки.

## Отчеты

Все скрипты генерируют отчеты:

- `performance-report.txt` - отчет о производительности
- `seo-report.txt` - отчет о SEO оптимизации
- `reports/lighthouse-report.html` - HTML отчет Lighthouse (если доступен)

## Ручная проверка

После автоматической проверки рекомендуется провести ручную проверку:

1. **Lighthouse**: Откройте Chrome DevTools → Lighthouse → Generate report
2. **Core Web Vitals**: Используйте PageSpeed Insights (https://pagespeed.web.dev/)
3. **SEO**: 
   - Google Rich Results Test: https://search.google.com/test/rich-results
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/

Подробные инструкции см. в `PERFORMANCE-CHECKLIST.md`.

## Troubleshooting

### Lighthouse не найден

```bash
npm install -g lighthouse
```

Или используйте флаг `--install-lighthouse`.

### Ошибки при проверке изображений

Убедитесь, что изображения находятся в папке `public/`:
- `public/og-image.png`
- `public/icon-192.png`
- `public/icon-512.png`
- `public/logo.png`

Инструкции по созданию изображений: `public/README-IMAGES.md`

### Ошибки при проверке файлов

Убедитесь, что все файлы существуют:
- `app/robots.txt` или `app/robots.ts`
- `app/sitemap.ts`
- `app/manifest.ts`
- `app/layout.tsx`

