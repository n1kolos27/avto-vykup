#!/usr/bin/env node

/**
 * Прямой запуск Lighthouse через Node.js API
 * Обходит проблемы с правами доступа на Windows
 */

const fs = require('fs');
const path = require('path');

// Проверяем, установлен ли lighthouse
let lighthouse, chromeLauncher;
try {
  const lighthouseModule = require('lighthouse');
  // Lighthouse может экспортироваться по-разному в разных версиях
  lighthouse = lighthouseModule.default || lighthouseModule;
  chromeLauncher = require('chrome-launcher');
} catch (e) {
  console.error('❌ Lighthouse не установлен. Устанавливаю...');
  console.log('Запустите: npm install --save-dev lighthouse chrome-launcher');
  process.exit(1);
}

const URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '..', 'lighthouse-reports');

// Создаем директорию для отчетов
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runLighthouse() {
  console.log('\n========================================');
  console.log('🚀 ЗАПУСК LIGHTHOUSE');
  console.log('========================================\n');
  console.log(`📊 Тестируем: ${URL}\n`);

  let chrome;

  try {
    // Запускаем Chrome с правильными флагами для Windows
    console.log('🌐 Запускаем Chrome...');
    chrome = await chromeLauncher.launch({
      chromeFlags: [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
      ],
      logLevel: 'silent',
    });

    console.log(`✅ Chrome запущен на порту ${chrome.port}\n`);

    // Настройки Lighthouse
    const options = {
      logLevel: 'info',
      output: ['html', 'json'],
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    };

    // Запускаем Lighthouse
    console.log('🔍 Запускаем анализ Lighthouse...');
    console.log('   Это займет 30-60 секунд...\n');

    const runnerResult = await lighthouse(URL, options);

    // Сохраняем HTML отчет
    const htmlReport = runnerResult.report[0];
    const htmlPath = path.join(OUTPUT_DIR, 'lighthouse-report.html');
    fs.writeFileSync(htmlPath, htmlReport);
    console.log(`✅ HTML отчет сохранен: ${htmlPath}`);

    // Сохраняем JSON отчет
    const jsonReport = runnerResult.report[1];
    const jsonPath = path.join(OUTPUT_DIR, 'lighthouse-report.json');
    fs.writeFileSync(jsonPath, jsonReport);
    console.log(`✅ JSON отчет сохранен: ${jsonPath}\n`);

    // Парсим результаты
    const lhr = runnerResult.lhr;
    const categories = lhr.categories;

    console.log('========================================');
    console.log('📊 РЕЗУЛЬТАТЫ LIGHTHOUSE');
    console.log('========================================\n');

    // Performance
    const performance = categories.performance;
    const perfScore = Math.round(performance.score * 100);
    console.log(`🎯 Performance: ${perfScore}/100`);
    if (performance.score >= 0.9) {
      console.log('   ✅ Отлично!');
    } else if (performance.score >= 0.75) {
      console.log('   ⚠️  Хорошо, но можно улучшить');
    } else {
      console.log('   ❌ Требует оптимизации');
    }

    // Accessibility
    const accessibility = categories.accessibility;
    const a11yScore = Math.round(accessibility.score * 100);
    console.log(`\n♿ Accessibility: ${a11yScore}/100`);
    if (accessibility.score === 1) {
      console.log('   ✅ Идеально!');
    } else {
      console.log('   ⚠️  Есть проблемы с доступностью');
      if (accessibility.auditRefs) {
        const issues = accessibility.auditRefs.filter(ref => ref.group === 'a11y-aria' || ref.group === 'a11y-color-contrast').length;
        console.log(`   Найдено проблем: ${issues}`);
      }
    }

    // Best Practices
    const bestPractices = categories['best-practices'];
    const bpScore = Math.round(bestPractices.score * 100);
    console.log(`\n✨ Best Practices: ${bpScore}/100`);
    if (bestPractices.score === 1) {
      console.log('   ✅ Идеально!');
    } else {
      console.log('   ⚠️  Есть проблемы');
    }

    // SEO
    const seo = categories.seo;
    const seoScore = Math.round(seo.score * 100);
    console.log(`\n🔍 SEO: ${seoScore}/100`);
    if (seo.score === 1) {
      console.log('   ✅ Идеально!');
    } else {
      console.log('   ⚠️  Есть проблемы с SEO');
    }

    // Core Web Vitals
    console.log('\n========================================');
    console.log('🎯 CORE WEB VITALS');
    console.log('========================================\n');

    const audits = lhr.audits;

    // FCP
    const fcp = audits['first-contentful-paint'];
    if (fcp && fcp.numericValue) {
      const fcpValue = fcp.numericValue;
      const fcpTarget = 1800;
      const fcpSeconds = (fcpValue / 1000).toFixed(2);
      console.log(`📊 First Contentful Paint (FCP): ${fcpSeconds}s`);
      if (fcpValue < fcpTarget) {
        console.log(`   ✅ В пределах цели (< ${fcpTarget / 1000}s)`);
      } else {
        console.log(`   ⚠️  Выше цели (< ${fcpTarget / 1000}s)`);
      }
    }

    // LCP
    const lcp = audits['largest-contentful-paint'];
    if (lcp && lcp.numericValue) {
      const lcpValue = lcp.numericValue;
      const lcpTarget = 2500;
      const lcpSeconds = (lcpValue / 1000).toFixed(2);
      console.log(`\n📊 Largest Contentful Paint (LCP): ${lcpSeconds}s`);
      if (lcpValue < lcpTarget) {
        console.log(`   ✅ В пределах цели (< ${lcpTarget / 1000}s)`);
      } else {
        console.log(`   ⚠️  Выше цели (< ${lcpTarget / 1000}s)`);
      }
    }

    // TTI
    const tti = audits['interactive'];
    if (tti && tti.numericValue) {
      const ttiValue = tti.numericValue;
      const ttiTarget = 3800;
      const ttiSeconds = (ttiValue / 1000).toFixed(2);
      console.log(`\n📊 Time to Interactive (TTI): ${ttiSeconds}s`);
      if (ttiValue < ttiTarget) {
        console.log(`   ✅ В пределах цели (< ${ttiTarget / 1000}s)`);
      } else {
        console.log(`   ⚠️  Выше цели (< ${ttiTarget / 1000}s)`);
      }
    }

    // CLS
    const cls = audits['cumulative-layout-shift'];
    if (cls && cls.numericValue !== undefined) {
      const clsValue = cls.numericValue;
      const clsTarget = 0.1;
      console.log(`\n📊 Cumulative Layout Shift (CLS): ${clsValue.toFixed(3)}`);
      if (clsValue < clsTarget) {
        console.log(`   ✅ В пределах цели (< ${clsTarget})`);
      } else {
        console.log(`   ⚠️  Выше цели (< ${clsTarget})`);
      }
    }

    // TBT
    const tbt = audits['total-blocking-time'];
    if (tbt && tbt.numericValue) {
      const tbtValue = tbt.numericValue;
      const tbtTarget = 200;
      console.log(`\n📊 Total Blocking Time (TBT): ${Math.round(tbtValue)}ms`);
      if (tbtValue < tbtTarget) {
        console.log(`   ✅ В пределах цели (< ${tbtTarget}ms)`);
      } else {
        console.log(`   ⚠️  Выше цели (< ${tbtTarget}ms)`);
      }
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
      console.log(`   Откройте: ${htmlPath}\n`);
    }

    // Возвращаем результаты для дальнейшей обработки
    return {
      performance: perfScore,
      accessibility: a11yScore,
      bestPractices: bpScore,
      seo: seoScore,
      htmlPath,
      jsonPath,
    };

  } catch (error) {
    console.error('\n❌ Ошибка при запуске Lighthouse:');
    console.error(error.message);
    if (error.stack) {
      console.error('\nДетали ошибки:');
      console.error(error.stack);
    }
    throw error;
  } finally {
    if (chrome) {
      try {
        await chrome.kill();
      } catch (e) {
        // Игнорируем ошибки при закрытии
      }
    }
  }
}

// Запускаем
runLighthouse()
  .then((results) => {
    console.log('✅ Тестирование завершено успешно!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Тестирование завершилось с ошибкой');
    process.exit(1);
  });
