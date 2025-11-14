#!/usr/bin/env node

/**
 * Скрипт для проверки SEO оптимизации
 * Проверяет наличие критичных SEO элементов
 */

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

function checkFileExists(filePath, description) {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    log(`✓ ${filePath}`, 'green');
    return true;
  } else {
    log(`✗ ${filePath} - ${description}`, 'red');
    return false;
  }
}

function checkImageFiles() {
  log('\n📸 Проверка изображений для SEO:', 'blue');
  
  const images = [
    { path: 'public/og-image.png', desc: 'Open Graph изображение (1200x630px)' },
    { path: 'public/icon-192.png', desc: 'PWA иконка 192x192px' },
    { path: 'public/icon-512.png', desc: 'PWA иконка 512x512px' },
    { path: 'public/logo.png', desc: 'Логотип для Schema.org' },
  ];

  const results = images.map(img => ({
    ...img,
    exists: checkFileExists(img.path, img.desc),
  }));

  return results;
}

function checkSEOFiles() {
  log('\n📄 Проверка SEO файлов:', 'blue');
  
  const files = [
    { path: 'app/robots.ts', desc: 'robots.ts (или robots.txt)' },
    { path: 'app/robots.txt', desc: 'robots.txt (альтернатива robots.ts)' },
    { path: 'app/sitemap.ts', desc: 'sitemap.ts' },
    { path: 'app/manifest.ts', desc: 'manifest.ts' },
  ];

  const results = files.map(file => ({
    ...file,
    exists: checkFileExists(file.path, file.desc),
  }));

  // Проверяем, что хотя бы robots.ts или robots.txt существует
  const hasRobots = results.find(r => r.path === 'app/robots.ts' && r.exists) || 
                   results.find(r => r.path === 'app/robots.txt' && r.exists);
  
  if (hasRobots) {
    log('✓ robots файл найден', 'green');
  } else {
    log('✗ robots файл не найден (нужен app/robots.ts или app/robots.txt)', 'red');
  }

  return results;
}

function checkLayoutFile() {
  log('\n🔍 Проверка layout.tsx:', 'blue');
  
  const layoutPath = path.join(process.cwd(), 'app/layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    log('✗ app/layout.tsx не найден', 'red');
    return { exists: false, checks: [] };
  }

  const content = fs.readFileSync(layoutPath, 'utf-8');
  const checks = [
    { name: 'Organization Schema', pattern: /organizationSchema|Organization/i, found: false },
    { name: 'LocalBusiness Schema', pattern: /localBusinessSchema|LocalBusiness/i, found: false },
    { name: 'Metadata', pattern: /export\s+const\s+metadata/i, found: false },
    { name: 'Viewport', pattern: /export\s+const\s+viewport/i, found: false },
  ];

  checks.forEach(check => {
    check.found = check.pattern.test(content);
    if (check.found) {
      log(`✓ ${check.name}`, 'green');
    } else {
      log(`✗ ${check.name}`, 'red');
    }
  });

  return { exists: true, checks };
}

function checkMetadataFiles() {
  log('\n📋 Проверка метаданных:', 'blue');
  
  const metadataPath = path.join(process.cwd(), 'lib/seo/metadata.ts');
  if (fs.existsSync(metadataPath)) {
    log('✓ lib/seo/metadata.ts', 'green');
    return true;
  } else {
    log('✗ lib/seo/metadata.ts не найден', 'red');
    return false;
  }
}

function generateSEOReport(results) {
  const reportPath = path.join(process.cwd(), 'seo-report.txt');
  
  const missingImages = results.images.filter(img => !img.exists);
  const missingFiles = results.files.filter(file => !file.exists);
  const failedChecks = results.layout.checks.filter(check => !check.found);

  const report = `
ОТЧЕТ ПРОВЕРКИ SEO ОПТИМИЗАЦИИ
================================
Дата: ${new Date().toLocaleString('ru-RU')}

ИЗОБРАЖЕНИЯ:
${missingImages.length === 0 
  ? '✓ Все изображения присутствуют'
  : `✗ Отсутствует ${missingImages.length} изображений:\n${missingImages.map(img => `  - ${img.path}: ${img.desc}`).join('\n')}`}

SEO ФАЙЛЫ:
${missingFiles.length === 0 
  ? '✓ Все SEO файлы присутствуют'
  : `✗ Отсутствует ${missingFiles.length} файлов:\n${missingFiles.map(file => `  - ${file.path}`).join('\n')}`}

LAYOUT ПРОВЕРКА:
${results.layout.exists 
  ? (failedChecks.length === 0 
      ? '✓ Все проверки пройдены'
      : `⚠ Не пройдено ${failedChecks.length} проверок:\n${failedChecks.map(check => `  - ${check.name}`).join('\n')}`)
  : '✗ layout.tsx не найден'}

МЕТАДАННЫЕ:
${results.metadata ? '✓ Файл метаданных найден' : '✗ Файл метаданных не найден'}

СЛЕДУЮЩИЕ ШАГИ:
1. Создайте отсутствующие изображения (см. public/README-IMAGES.md)
2. Проверьте Schema.org через Google Rich Results Test
3. Проверьте Open Graph через Facebook Sharing Debugger
4. Отправьте sitemap в Google Search Console и Yandex Webmaster

ИНСТРУКЦИИ:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Google Search Console: https://search.google.com/search-console
- Yandex Webmaster: https://webmaster.yandex.ru/
`;

  fs.writeFileSync(reportPath, report);
  log(`\n✓ Отчет сохранен: ${reportPath}`, 'green');
}

function main() {
  log('🔍 Запуск проверки SEO оптимизации...\n', 'blue');

  const results = {
    images: checkImageFiles(),
    files: checkSEOFiles(),
    layout: checkLayoutFile(),
    metadata: checkMetadataFiles(),
  };

  generateSEOReport(results);

  const missingCount = 
    results.images.filter(img => !img.exists).length +
    results.files.filter(file => !file.exists).length +
    results.layout.checks.filter(check => !check.found).length +
    (results.metadata ? 0 : 1);

  if (missingCount === 0) {
    log('\n✅ Все SEO проверки пройдены!', 'green');
  } else {
    log(`\n⚠ Найдено ${missingCount} проблем. См. seo-report.txt для деталей.`, 'yellow');
  }

  log('\nДля детальной информации см. PERFORMANCE-CHECKLIST.md', 'blue');
}

main();

