#!/usr/bin/env node

/**
 * Скрипт для автоматической проверки производительности
 * Использует Lighthouse CLI для проверки метрик
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkLighthouseInstalled() {
  try {
    execSync('lighthouse --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function installLighthouse() {
  log('Установка Lighthouse CLI...', 'blue');
  try {
    execSync('npm install -g lighthouse', { stdio: 'inherit' });
    log('✓ Lighthouse установлен', 'green');
    return true;
  } catch (error) {
    log('✗ Ошибка установки Lighthouse', 'red');
    console.error(error);
    return false;
  }
}

function runLighthouse(url, outputPath) {
  log(`\nЗапуск Lighthouse аудита для ${url}...`, 'blue');
  
  try {
    const command = `lighthouse ${url} --output html --output-path ${outputPath} --quiet --chrome-flags="--headless"`;
    execSync(command, { stdio: 'inherit' });
    log(`✓ Отчет сохранен: ${outputPath}`, 'green');
    return true;
  } catch (error) {
    log('✗ Ошибка при запуске Lighthouse', 'red');
    console.error(error);
    return false;
  }
}

function checkCoreWebVitals(url) {
  log(`\nПроверка Core Web Vitals для ${url}...`, 'blue');
  log('Для детальной проверки используйте:', 'yellow');
  log('1. PageSpeed Insights: https://pagespeed.web.dev/', 'yellow');
  log('2. Chrome DevTools → Performance → Record', 'yellow');
  log('3. WebPageTest: https://www.webpagetest.org/', 'yellow');
}

function checkRequiredImages() {
  log('\nПроверка критичных изображений...', 'blue');
  
  const requiredImages = [
    { path: 'public/og-image.png', description: 'Open Graph изображение (1200x630px)' },
    { path: 'public/icon-192.png', description: 'PWA иконка малый размер (192x192px)' },
    { path: 'public/icon-512.png', description: 'PWA иконка большой размер (512x512px)' },
    { path: 'public/logo.png', description: 'Логотип для Schema.org (минимум 600x60px)' },
  ];

  const missing = [];
  const existing = [];

  requiredImages.forEach(({ path: imagePath, description }) => {
    const fullPath = path.join(process.cwd(), imagePath);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      log(`✓ ${imagePath} (${sizeKB} KB)`, 'green');
      existing.push({ path: imagePath, description, size: sizeKB });
    } else {
      log(`✗ ${imagePath} - ОТСУТСТВУЕТ`, 'red');
      log(`  Требуется: ${description}`, 'yellow');
      missing.push({ path: imagePath, description });
    }
  });

  if (missing.length > 0) {
    log(`\n⚠ Найдено ${missing.length} отсутствующих изображений`, 'yellow');
    log('Создайте изображения согласно инструкции в public/README-IMAGES.md', 'yellow');
  } else {
    log('\n✓ Все критичные изображения присутствуют', 'green');
  }

  return { missing, existing };
}

function generateReport(results) {
  const reportPath = path.join(process.cwd(), 'performance-report.txt');
  const report = `
ПОЛНЫЙ ОТЧЕТ ПРОВЕРКИ ПРОИЗВОДИТЕЛЬНОСТИ
========================================
Дата: ${new Date().toLocaleString('ru-RU')}

ИЗОБРАЖЕНИЯ:
${results.images.missing.length > 0 
  ? `✗ Отсутствует ${results.images.missing.length} изображений\n${results.images.missing.map(img => `  - ${img.path}: ${img.description}`).join('\n')}`
  : '✓ Все критичные изображения присутствуют'}

LIGHTHOUSE:
${results.lighthouse.success 
  ? `✓ Отчет создан: ${results.lighthouse.path}`
  : '✗ Не удалось создать отчет. Установите Lighthouse: npm install -g lighthouse'}

CORE WEB VITALS:
⚠ Требуется ручная проверка через:
  - PageSpeed Insights: https://pagespeed.web.dev/
  - Chrome DevTools → Performance
  - WebPageTest: https://www.webpagetest.org/

ЦЕЛЕВЫЕ МЕТРИКИ:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- FCP (First Contentful Paint): < 1.8s
- TTI (Time to Interactive): < 3.8s

СЛЕДУЮЩИЕ ШАГИ:
1. Создайте отсутствующие изображения (см. public/README-IMAGES.md)
2. Проверьте Lighthouse отчет: ${results.lighthouse.path || 'N/A'}
3. Проведите ручную проверку Core Web Vitals
4. Отправьте sitemap в Google Search Console и Yandex Webmaster
`;

  fs.writeFileSync(reportPath, report);
  log(`\n✓ Отчет сохранен: ${reportPath}`, 'green');
}

async function main() {
  log('🚀 Запуск проверки производительности...\n', 'blue');

  const url = process.argv[2] || 'http://localhost:3000';
  const outputDir = path.join(process.cwd(), 'reports');
  
  // Создаем директорию для отчетов
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const results = {
    images: { missing: [], existing: [] },
    lighthouse: { success: false, path: null },
  };

  // Проверка изображений
  results.images = checkRequiredImages();

  // Проверка Lighthouse
  if (!checkLighthouseInstalled()) {
    log('\n⚠ Lighthouse не установлен', 'yellow');
    const shouldInstall = process.argv.includes('--install-lighthouse');
    if (shouldInstall) {
      if (installLighthouse()) {
        const reportPath = path.join(outputDir, 'lighthouse-report.html');
        results.lighthouse.success = runLighthouse(url, reportPath);
        results.lighthouse.path = reportPath;
      }
    } else {
      log('Установите Lighthouse: npm install -g lighthouse', 'yellow');
      log('Или запустите с флагом: --install-lighthouse', 'yellow');
    }
  } else {
    const reportPath = path.join(outputDir, 'lighthouse-report.html');
    results.lighthouse.success = runLighthouse(url, reportPath);
    results.lighthouse.path = reportPath;
  }

  // Проверка Core Web Vitals
  checkCoreWebVitals(url);

  // Генерация отчета
  generateReport(results);

  log('\n✅ Проверка завершена!', 'green');
  log('\nДля детальной информации см. PERFORMANCE-CHECKLIST.md', 'blue');
}

main().catch(console.error);

