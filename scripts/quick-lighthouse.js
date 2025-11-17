#!/usr/bin/env node

/**
 * Быстрый запуск Lighthouse без сборки production
 * Тестирует текущий dev сервер
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '..', 'lighthouse-reports');

console.log('\n🚀 Быстрый запуск Lighthouse...\n');
console.log(`📊 Тестируем: ${URL}\n`);

try {
  // Запускаем Lighthouse быстро
  const jsonPath = path.join(OUTPUT_DIR, 'lighthouse-quick.json');

  console.log('⏳ Запускаю анализ (это займет ~30 секунд)...\n');

  execSync(
    `npx --yes lighthouse "${URL}" --output=json --output-path="${jsonPath}" --chrome-flags="--headless --no-sandbox --disable-gpu" --quiet --only-categories=performance,accessibility,best-practices,seo`,
    { stdio: 'inherit', cwd: process.cwd(), timeout: 120000 }
  );

  if (fs.existsSync(jsonPath)) {
    const report = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const categories = report.categories;

    console.log('\n========================================');
    console.log('📊 РЕЗУЛЬТАТЫ');
    console.log('========================================\n');
    console.log(`Performance: ${Math.round(categories.performance.score * 100)}/100`);
    console.log(`Accessibility: ${Math.round(categories.accessibility.score * 100)}/100`);
    console.log(`Best Practices: ${Math.round(categories['best-practices'].score * 100)}/100`);
    console.log(`SEO: ${Math.round(categories.seo.score * 100)}/100\n`);
    console.log('✅ Готово! JSON отчет:', jsonPath);
  }
} catch (error) {
  console.error('\n❌ Ошибка:', error.message);
  process.exit(1);
}
