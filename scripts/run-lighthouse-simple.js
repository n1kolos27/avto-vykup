#!/usr/bin/env node

/**
 * Упрощенный скрипт для запуска Lighthouse через npx
 * Использует npx для запуска без локальной установки
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '..', 'lighthouse-reports');

// Создаем директорию для отчетов
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('\n========================================');
console.log('🚀 ЗАПУСК LIGHTHOUSE');
console.log('========================================\n');
console.log(`📊 Тестируем: ${URL}\n`);
console.log('🔍 Запускаем анализ Lighthouse...');
console.log('   Это займет 30-60 секунд...\n');

try {
  // Запускаем Lighthouse через npx
  const htmlPath = path.join(OUTPUT_DIR, 'lighthouse-report.html');
  const jsonPath = path.join(OUTPUT_DIR, 'lighthouse-report.json');

  console.log('📝 Генерируем HTML отчет...');
  execSync(
    `npx --yes lighthouse "${URL}" --output=html --output-path="${htmlPath}" --chrome-flags="--headless --no-sandbox" --quiet`,
    { stdio: 'inherit', cwd: process.cwd() }
  );

  console.log('\n📝 Генерируем JSON отчет...');
  execSync(
    `npx --yes lighthouse "${URL}" --output=json --output-path="${jsonPath}" --chrome-flags="--headless --no-sandbox" --quiet`,
    { stdio: 'inherit', cwd: process.cwd() }
  );

  // Парсим JSON отчет
  if (fs.existsSync(jsonPath)) {
    const report = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const categories = report.categories;

    console.log('\n========================================');
    console.log('📊 РЕЗУЛЬТАТЫ LIGHTHOUSE');
    console.log('========================================\n');

    // Performance
    const performance = categories.performance;
    console.log(`🎯 Performance: ${Math.round(performance.score * 100)}/100`);
    if (performance.score >= 0.9) {
      console.log('   ✅ Отлично!');
    } else if (performance.score >= 0.75) {
      console.log('   ⚠️  Хорошо, но можно улучшить');
    } else {
      console.log('   ❌ Требует оптимизации');
    }

    // Accessibility
    const accessibility = categories.accessibility;
    console.log(`\n♿ Accessibility: ${Math.round(accessibility.score * 100)}/100`);
    if (accessibility.score === 1) {
      console.log('   ✅ Идеально!');
    } else {
      console.log('   ⚠️  Есть проблемы с доступностью');
    }

    // Best Practices
    const bestPractices = categories['best-practices'];
    console.log(`\n✨ Best Practices: ${Math.round(bestPractices.score * 100)}/100`);
    if (bestPractices.score === 1) {
      console.log('   ✅ Идеально!');
    } else {
      console.log('   ⚠️  Есть проблемы');
    }

    // SEO
    const seo = categories.seo;
    console.log(`\n🔍 SEO: ${Math.round(seo.score * 100)}/100`);
    if (seo.score === 1) {
      console.log('   ✅ Идеально!');
    } else {
      console.log('   ⚠️  Есть проблемы с SEO');
    }

    // Core Web Vitals
    console.log('\n========================================');
    console.log('🎯 CORE WEB VITALS');
    console.log('========================================\n');

    const audits = report.audits;

    // FCP
    const fcp = audits['first-contentful-paint'];
    if (fcp && fcp.numericValue) {
      const fcpValue = fcp.numericValue;
      const fcpTarget = 1800;
      console.log(`📊 First Contentful Paint (FCP): ${(fcpValue / 1000).toFixed(2)}s`);
      console.log(fcpValue < fcpTarget ? `   ✅ В пределах цели (< ${fcpTarget / 1000}s)` : `   ⚠️  Выше цели (< ${fcpTarget / 1000}s)`);
    }

    // LCP
    const lcp = audits['largest-contentful-paint'];
    if (lcp && lcp.numericValue) {
      const lcpValue = lcp.numericValue;
      const lcpTarget = 2500;
      console.log(`\n📊 Largest Contentful Paint (LCP): ${(lcpValue / 1000).toFixed(2)}s`);
      console.log(lcpValue < lcpTarget ? `   ✅ В пределах цели (< ${lcpTarget / 1000}s)` : `   ⚠️  Выше цели (< ${lcpTarget / 1000}s)`);
    }

    // TTI
    const tti = audits['interactive'];
    if (tti && tti.numericValue) {
      const ttiValue = tti.numericValue;
      const ttiTarget = 3800;
      console.log(`\n📊 Time to Interactive (TTI): ${(ttiValue / 1000).toFixed(2)}s`);
      console.log(ttiValue < ttiTarget ? `   ✅ В пределах цели (< ${ttiTarget / 1000}s)` : `   ⚠️  Выше цели (< ${ttiTarget / 1000}s)`);
    }

    // CLS
    const cls = audits['cumulative-layout-shift'];
    if (cls && cls.numericValue !== undefined) {
      const clsValue = cls.numericValue;
      const clsTarget = 0.1;
      console.log(`\n📊 Cumulative Layout Shift (CLS): ${clsValue.toFixed(3)}`);
      console.log(clsValue < clsTarget ? `   ✅ В пределах цели (< ${clsTarget})` : `   ⚠️  Выше цели (< ${clsTarget})`);
    }

    // TBT
    const tbt = audits['total-blocking-time'];
    if (tbt && tbt.numericValue) {
      const tbtValue = tbt.numericValue;
      const tbtTarget = 200;
      console.log(`\n📊 Total Blocking Time (TBT): ${Math.round(tbtValue)}ms`);
      console.log(tbtValue < tbtTarget ? `   ✅ В пределах цели (< ${tbtTarget}ms)` : `   ⚠️  Выше цели (< ${tbtTarget}ms)`);
    }

    console.log('\n========================================');
    console.log('📁 Отчеты сохранены:');
    console.log(`   HTML: ${htmlPath}`);
    console.log(`   JSON: ${jsonPath}`);
    console.log('========================================\n');

    // Проверяем, есть ли проблемы
    const hasIssues =
      performance.score < 0.9 ||
      accessibility.score < 1 ||
      bestPractices.score < 1 ||
      seo.score < 1;

    if (!hasIssues) {
      console.log('🎉 ОТЛИЧНО! Все метрики в пределах целей!\n');
    } else {
      console.log('💡 Рекомендация: Откройте HTML отчет для детального анализа проблем.\n');
    }
  }

} catch (error) {
  console.error('\n❌ Ошибка при запуске Lighthouse:');
  console.error(error.message);
  console.error('\n💡 Альтернатива: Используйте Chrome DevTools вручную:');
  console.error('   1. Откройте http://localhost:3000 в Chrome');
  console.error('   2. Нажмите F12');
  console.error('   3. Найдите вкладку "Lighthouse"');
  console.error('   4. Выберите все категории и нажмите "Analyze page load"');
  console.error('   5. Подробные инструкции в файле: LIGHTHOUSE-START-NOW.md\n');
  process.exit(1);
}
