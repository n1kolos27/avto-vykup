#!/usr/bin/env node

/**
 * Скрипт для автоматического тестирования всех страниц с помощью Lighthouse
 *
 * Использование:
 *   node scripts/lighthouse-test.js
 *
 * Требования:
 *   npm install -g lighthouse
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Список всех страниц для тестирования
const PAGES = [
  { url: 'http://localhost:3000/', name: 'Главная' },
  { url: 'http://localhost:3000/calculator', name: 'Калькулятор' },
  { url: 'http://localhost:3000/services', name: 'Услуги' },
  { url: 'http://localhost:3000/reviews', name: 'Отзывы' },
  { url: 'http://localhost:3000/blog', name: 'Блог' },
  { url: 'http://localhost:3000/contacts', name: 'Контакты' },
  { url: 'http://localhost:3000/faq', name: 'FAQ' },
  { url: 'http://localhost:3000/about', name: 'О нас' },
  { url: 'http://localhost:3000/prices', name: 'Цены' },
  { url: 'http://localhost:3000/guarantees', name: 'Гарантии' },
  { url: 'http://localhost:3000/how-we-work', name: 'Как мы работаем' },
  { url: 'http://localhost:3000/why-us', name: 'Почему мы' },
  { url: 'http://localhost:3000/documents', name: 'Документы' },
  { url: 'http://localhost:3000/sitemap-page', name: 'Карта сайта' },
  // Динамические страницы блога
  { url: 'http://localhost:3000/blog/kak-pravilno-otsenit-avtomobil', name: 'Блог - Как правильно оценить автомобиль' },
  { url: 'http://localhost:3000/blog/dokumenty-dlya-vykupa-avto', name: 'Блог - Документы для выкупа' },
];

// Создаем директорию для отчетов
const reportsDir = path.join(process.cwd(), 'lighthouse-reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Результаты тестирования
const results = [];

console.log('🚀 Начинаем Lighthouse тестирование...\n');
console.log(`📊 Всего страниц для тестирования: ${PAGES.length}\n`);

// Функция для получения имени файла из URL
function getFileName(url) {
  const urlPath = new URL(url).pathname;
  if (urlPath === '/') {
    return 'home';
  }
  return urlPath.replace(/\//g, '-').replace(/^-/, '').replace(/-$/, '') || 'home';
}

// Функция для запуска Lighthouse
function runLighthouse(page) {
  const fileName = getFileName(page.url);
  const reportPath = path.join(reportsDir, `${fileName}.html`);
  const jsonPath = path.join(reportsDir, `${fileName}.json`);

  console.log(`📄 Тестируем: ${page.name}`);
  console.log(`   URL: ${page.url}`);

  try {
    // Запускаем Lighthouse (разделяем на два вызова для html и json)
    const htmlCommand = `lighthouse "${page.url}" --output=html --output-path="${reportPath}" --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo`;
    const jsonCommand = `lighthouse "${page.url}" --output=json --output-path="${jsonPath}" --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --quiet`;

    // Запускаем HTML отчет
    execSync(htmlCommand, {
      stdio: 'pipe',
      cwd: process.cwd(),
    });

    // Запускаем JSON отчет
    execSync(jsonCommand, {
      stdio: 'pipe',
      cwd: process.cwd(),
    });

    // Читаем JSON отчет для извлечения метрик
    if (fs.existsSync(jsonPath)) {
      const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

      const scores = {
        performance: Math.round(jsonData.categories.performance?.score * 100 || 0),
        accessibility: Math.round(jsonData.categories.accessibility?.score * 100 || 0),
        'best-practices': Math.round(jsonData.categories['best-practices']?.score * 100 || 0),
        seo: Math.round(jsonData.categories.seo?.score * 100 || 0),
      };

      // Core Web Vitals
      const audits = jsonData.audits || {};
      const metrics = {
        fcp: audits['first-contentful-paint']?.numericValue || 0,
        lcp: audits['largest-contentful-paint']?.numericValue || 0,
        tti: audits['interactive']?.numericValue || 0,
        cls: audits['cumulative-layout-shift']?.numericValue || 0,
        tbt: audits['total-blocking-time']?.numericValue || 0,
      };

      results.push({
        ...page,
        scores,
        metrics,
        reportPath,
        jsonPath,
      });

      console.log(`   ✅ Performance: ${scores.performance}/100`);
      console.log(`   ✅ Accessibility: ${scores.accessibility}/100`);
      console.log(`   ✅ Best Practices: ${scores['best-practices']}/100`);
      console.log(`   ✅ SEO: ${scores.seo}/100`);
      console.log(`   📊 FCP: ${(metrics.fcp / 1000).toFixed(2)}s (цель: < 1.8s)`);
      console.log(`   📊 LCP: ${(metrics.lcp / 1000).toFixed(2)}s (цель: < 2.5s)`);
      console.log(`   📊 CLS: ${metrics.cls.toFixed(3)} (цель: < 0.1)`);
      console.log(`   📄 Отчет: ${reportPath}\n`);
    } else {
      console.log(`   ⚠️  JSON отчет не найден\n`);
    }
  } catch (error) {
    console.error(`   ❌ Ошибка при тестировании: ${error.message}\n`);
    results.push({
      ...page,
      error: error.message,
    });
  }
}

// Запускаем тестирование для всех страниц
PAGES.forEach((page, index) => {
  console.log(`\n[${index + 1}/${PAGES.length}]`);
  runLighthouse(page);

  // Небольшая задержка между запросами
  if (index < PAGES.length - 1) {
    console.log('⏳ Ожидание 2 секунды...\n');
    // В Node.js нет sleep, используем setTimeout в async функции
  }
});

// Создаем итоговый отчет
const summaryPath = path.join(reportsDir, 'summary.md');
const summary = generateSummary(results);
fs.writeFileSync(summaryPath, summary, 'utf8');

console.log('\n✅ Тестирование завершено!');
console.log(`📊 Итоговый отчет: ${summaryPath}`);
console.log(`📁 Все отчеты сохранены в: ${reportsDir}\n`);

// Функция для генерации итогового отчета
function generateSummary(results) {
  let summary = '# 📊 Lighthouse Тестирование - Итоговый отчет\n\n';
  summary += `**Дата:** ${new Date().toLocaleString('ru-RU')}\n`;
  summary += `**Всего страниц:** ${results.length}\n\n`;
  summary += '---\n\n';

  // Статистика по метрикам
  const avgScores = {
    performance: 0,
    accessibility: 0,
    'best-practices': 0,
    seo: 0,
  };

  const successfulResults = results.filter(r => !r.error);

  successfulResults.forEach(result => {
    avgScores.performance += result.scores.performance;
    avgScores.accessibility += result.scores.accessibility;
    avgScores['best-practices'] += result.scores['best-practices'];
    avgScores.seo += result.scores.seo;
  });

  const count = successfulResults.length;
  if (count > 0) {
    summary += '## 📈 Средние показатели\n\n';
    summary += `- **Performance:** ${Math.round(avgScores.performance / count)}/100\n`;
    summary += `- **Accessibility:** ${Math.round(avgScores.accessibility / count)}/100\n`;
    summary += `- **Best Practices:** ${Math.round(avgScores['best-practices'] / count)}/100\n`;
    summary += `- **SEO:** ${Math.round(avgScores.seo / count)}/100\n\n`;
    summary += '---\n\n';
  }

  // Детальные результаты
  summary += '## 📋 Детальные результаты\n\n';

  results.forEach((result, index) => {
    summary += `### ${index + 1}. ${result.name}\n\n`;
    summary += `**URL:** ${result.url}\n\n`;

    if (result.error) {
      summary += `❌ **Ошибка:** ${result.error}\n\n`;
    } else {
      summary += '**Метрики:**\n';
      summary += `- Performance: ${result.scores.performance}/100 ${result.scores.performance === 100 ? '✅' : '⚠️'}\n`;
      summary += `- Accessibility: ${result.scores.accessibility}/100 ${result.scores.accessibility === 100 ? '✅' : '⚠️'}\n`;
      summary += `- Best Practices: ${result.scores['best-practices']}/100 ${result.scores['best-practices'] === 100 ? '✅' : '⚠️'}\n`;
      summary += `- SEO: ${result.scores.seo}/100 ${result.scores.seo === 100 ? '✅' : '⚠️'}\n\n`;

      summary += '**Core Web Vitals:**\n';
      summary += `- FCP: ${(result.metrics.fcp / 1000).toFixed(2)}s ${result.metrics.fcp < 1800 ? '✅' : '⚠️'} (цель: < 1.8s)\n`;
      summary += `- LCP: ${(result.metrics.lcp / 1000).toFixed(2)}s ${result.metrics.lcp < 2500 ? '✅' : '⚠️'} (цель: < 2.5s)\n`;
      summary += `- TTI: ${(result.metrics.tti / 1000).toFixed(2)}s ${result.metrics.tti < 3800 ? '✅' : '⚠️'} (цель: < 3.8s)\n`;
      summary += `- CLS: ${result.metrics.cls.toFixed(3)} ${result.metrics.cls < 0.1 ? '✅' : '⚠️'} (цель: < 0.1)\n`;
      summary += `- TBT: ${result.metrics.tbt.toFixed(0)}ms ${result.metrics.tbt < 200 ? '✅' : '⚠️'} (цель: < 200ms)\n\n`;

      summary += `**Отчет:** [Открыть HTML отчет](${result.reportPath})\n\n`;
    }

    summary += '---\n\n';
  });

  // Итоговые рекомендации
  summary += '## 🎯 Рекомендации\n\n';

  const needsImprovement = results.filter(r =>
    !r.error && (
      r.scores.performance < 100 ||
      r.scores.accessibility < 100 ||
      r.scores['best-practices'] < 100 ||
      r.scores.seo < 100
    )
  );

  if (needsImprovement.length === 0) {
    summary += '✅ **Отлично!** Все страницы имеют метрики 100/100 по всем категориям!\n\n';
  } else {
    summary += `⚠️ **Требуется улучшение:** ${needsImprovement.length} страниц(ы) имеют метрики ниже 100/100.\n\n`;
    summary += 'Рекомендуется:\n';
    summary += '1. Открыть HTML отчеты для каждой страницы\n';
    summary += '2. Изучить рекомендации Lighthouse\n';
    summary += '3. Внедрить предложенные улучшения\n';
    summary += '4. Повторить тестирование\n\n';
  }

  return summary;
}
