# Руководство по автоматизации проверок

Этот документ описывает автоматизированные инструменты для проверки производительности и SEO оптимизации проекта.

## Быстрый старт

### 1. Проверка SEO

```bash
npm run check:seo
```

Эта команда проверит:
- ✅ Наличие всех критичных изображений
- ✅ Наличие SEO файлов (robots.txt, sitemap.ts, manifest.ts)
- ✅ Schema.org разметку в layout.tsx
- ✅ Метаданные

**Результат:** Отчет сохраняется в `seo-report.txt`

### 2. Проверка производительности

```bash
npm run check:performance
```

Эта команда проверит:
- ✅ Наличие критичных изображений
- ✅ Запустит Lighthouse аудит (если установлен)
- ✅ Создаст HTML отчет Lighthouse

**Результат:** 
- Отчет сохраняется в `performance-report.txt`
- Lighthouse HTML отчет в `reports/lighthouse-report.html`

### 3. Комплексная проверка

```bash
npm run check:all
```

Запускает все проверки последовательно.

## Установка Lighthouse

Для полной проверки производительности необходимо установить Lighthouse CLI:

```bash
npm install -g lighthouse
```

Или используйте автоматическую установку:

```bash
npm run check:performance -- --install-lighthouse
```

## Создание placeholder изображений

Для разработки можно создать временные placeholder изображения:

```bash
npm run generate:placeholders
```

**⚠ ВНИМАНИЕ:** Это только SVG placeholder изображения. Для production необходимо создать реальные изображения с логотипом и брендингом согласно инструкции в `public/README-IMAGES.md`.

## Интерпретация результатов

### SEO проверка

**Все проверки пройдены:**
```
✅ Все SEO проверки пройдены!
```

**Найдены проблемы:**
```
⚠ Найдено X проблем. См. seo-report.txt для деталей.
```

Откройте `seo-report.txt` для детальной информации о проблемах.

### Проверка производительности

**Успешно:**
```
✅ Проверка завершена!
```

**Lighthouse не установлен:**
```
⚠ Lighthouse не установлен
Установите Lighthouse: npm install -g lighthouse
```

## Следующие шаги после автоматической проверки

### 1. Создание изображений

Если скрипт обнаружил отсутствующие изображения:

1. Откройте `public/README-IMAGES.md`
2. Создайте изображения согласно требованиям:
   - `og-image.png` (1200x630px)
   - `icon-192.png` (192x192px)
   - `icon-512.png` (512x512px)
   - `logo.png` (минимум 600x60px)
3. Оптимизируйте изображения (WebP, сжатие)
4. Разместите в папке `public/`

### 2. Ручная SEO валидация

После создания изображений проведите ручную проверку:

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Проверьте Schema.org разметку

2. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Проверьте Open Graph теги

3. **Отправка sitemap**
   - Google Search Console: https://search.google.com/search-console
   - Yandex Webmaster: https://webmaster.yandex.ru/
   - URL sitemap: `https://your-domain.com/sitemap.xml`

### 3. Ручная проверка производительности

1. **Lighthouse через Chrome DevTools**
   - Откройте сайт в Chrome
   - F12 → Lighthouse → Generate report
   - Цель: 100/100 по всем категориям

2. **PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Проверьте Core Web Vitals
   - Целевые значения:
     - LCP < 2.5s
     - FID < 100ms
     - CLS < 0.1

3. **WebPageTest**
   - URL: https://www.webpagetest.org/
   - Детальный анализ производительности

## Интеграция в CI/CD

### GitHub Actions пример

```yaml
name: Performance & SEO Check

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run check:all
      - uses: actions/upload-artifact@v2
        with:
          name: reports
          path: |
            seo-report.txt
            performance-report.txt
            reports/
```

## Регулярные проверки

### Еженедельно

```bash
npm run check:all
```

Проверьте отчеты и исправьте найденные проблемы.

### Перед релизом

1. Запустите все проверки
2. Создайте/обновите изображения
3. Проведите ручную валидацию
4. Проверьте Lighthouse scores
5. Проверьте Core Web Vitals

## Troubleshooting

### Проблема: Lighthouse не запускается

**Решение:**
```bash
npm install -g lighthouse
```

Или используйте Chrome DevTools для ручной проверки.

### Проблема: Изображения не найдены

**Решение:**
1. Убедитесь, что изображения находятся в `public/`
2. Проверьте названия файлов (должны точно совпадать)
3. Создайте изображения согласно `public/README-IMAGES.md`

### Проблема: Ошибки в скриптах

**Решение:**
1. Убедитесь, что Node.js версии 18+
2. Переустановите зависимости: `npm install`
3. Проверьте права доступа к файлам

## Дополнительные ресурсы

- **PERFORMANCE-CHECKLIST.md** - Детальный чеклист проверки производительности
- **DEPLOYMENT-TIMEWEB.md** - Инструкции по развертыванию
- **public/README-IMAGES.md** - Инструкции по созданию изображений

