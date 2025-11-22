/**
 * Скрипт для анализа результатов тестов Playwright
 * Категоризирует ошибки и создает отчет
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testResultsDir = path.join(__dirname, '..', 'test-results');
const reportDir = path.join(__dirname, '..', 'test-reports');

// Создаем директорию для отчетов если не существует
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

function findTestResults() {
  const results = [];
  
  // Ищем JSON файлы с результатами
  function searchDir(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        searchDir(fullPath);
      } else if (file.name.endsWith('.json') && file.name !== '.last-run.json') {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const data = JSON.parse(content);
          results.push({ file: fullPath, data });
        } catch (e) {
          console.warn(`Failed to parse ${fullPath}:`, e.message);
        }
      }
    }
  }
  
  if (fs.existsSync(testResultsDir)) {
    searchDir(testResultsDir);
  }
  
  // Также ищем в playwright-report/data
  const playwrightReportDir = path.join(__dirname, '..', 'playwright-report', 'data');
  if (fs.existsSync(playwrightReportDir)) {
    searchDir(playwrightReportDir);
  }
  
  return results;
}

function categorizeError(error) {
  const message = error.message || error.text || '';
  const lowerMessage = message.toLowerCase();
  
  // Категории ошибок
  if (lowerMessage.includes('timeout') || lowerMessage.includes('waiting for')) {
    return 'Timeout';
  }
  
  if (lowerMessage.includes('element') && (lowerMessage.includes('not found') || lowerMessage.includes('not visible'))) {
    return 'Element Not Found';
  }
  
  if (lowerMessage.includes('react') || lowerMessage.includes('hydration') || lowerMessage.includes('loading')) {
    return 'React Loading';
  }
  
  if (lowerMessage.includes('network') || lowerMessage.includes('fetch') || lowerMessage.includes('request failed')) {
    return 'Network Error';
  }
  
  if (lowerMessage.includes('assertion') || lowerMessage.includes('expected')) {
    return 'Assertion Failed';
  }
  
  if (lowerMessage.includes('navigation') || lowerMessage.includes('route')) {
    return 'Navigation Error';
  }
  
  return 'Other';
}

function analyzeResults() {
  const results = findTestResults();
  
  if (results.length === 0) {
    console.log('⚠️  Не найдено результатов тестов');
    return null;
  }
  
  const analysis = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    errorsByCategory: {},
    errorsByPage: {},
    failedTests: [],
    summary: {
      critical: [],
      medium: [],
      minor: [],
    },
  };
  
  for (const { data } of results) {
    if (data.suites) {
      for (const suite of data.suites) {
        processSuite(suite, analysis);
      }
    }
    
    if (data.tests) {
      for (const test of data.tests) {
        processTest(test, analysis);
      }
    }
  }
  
  // Категоризируем ошибки по приоритетам
  for (const test of analysis.failedTests) {
    const category = test.category;
    
    if (category === 'Timeout' || category === 'React Loading' || category === 'Network Error') {
      analysis.summary.critical.push(test);
    } else if (category === 'Element Not Found' || category === 'Assertion Failed') {
      analysis.summary.medium.push(test);
    } else {
      analysis.summary.minor.push(test);
    }
  }
  
  return analysis;
}

function processSuite(suite, analysis) {
  if (suite.specs) {
    for (const spec of suite.specs) {
      if (spec.tests) {
        for (const test of spec.tests) {
          processTest(test, analysis);
        }
      }
    }
  }
  
  if (suite.suites) {
    for (const subSuite of suite.suites) {
      processSuite(subSuite, analysis);
    }
  }
}

function processTest(test, analysis) {
  analysis.totalTests++;
  
  if (test.status === 'passed') {
    analysis.passed++;
  } else if (test.status === 'failed') {
    analysis.failed++;
    
    const error = test.results?.[0]?.error || test.error || {};
    const category = categorizeError(error);
    
    // Увеличиваем счетчик категории
    analysis.errorsByCategory[category] = (analysis.errorsByCategory[category] || 0) + 1;
    
    // Извлекаем название страницы из теста
    const testTitle = test.title || '';
    const pageMatch = testTitle.match(/Page: (\/[^\s]*)/);
    const page = pageMatch ? pageMatch[1] : 'unknown';
    
    analysis.errorsByPage[page] = (analysis.errorsByPage[page] || 0) + 1;
    
    analysis.failedTests.push({
      title: testTitle,
      page,
      category,
      error: error.message || error.text || 'Unknown error',
      duration: test.duration || 0,
    });
  } else if (test.status === 'skipped') {
    analysis.skipped++;
  }
}

function generateReport(analysis) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportFile = path.join(reportDir, `test-analysis-${timestamp}.json`);
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: analysis.totalTests,
      passed: analysis.passed,
      failed: analysis.failed,
      skipped: analysis.skipped,
      passRate: analysis.totalTests > 0 
        ? ((analysis.passed / analysis.totalTests) * 100).toFixed(2) + '%'
        : '0%',
    },
    errorsByCategory: analysis.errorsByCategory,
    errorsByPage: analysis.errorsByPage,
    failedTests: analysis.failedTests,
    prioritizedErrors: {
      critical: analysis.summary.critical.length,
      medium: analysis.summary.medium.length,
      minor: analysis.summary.minor.length,
    },
    recommendations: generateRecommendations(analysis),
  };
  
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf-8');
  
  // Выводим краткий отчет в консоль
  console.log('\n📊 Анализ результатов тестов\n');
  console.log(`Всего тестов: ${report.summary.total}`);
  console.log(`✅ Прошло: ${report.summary.passed}`);
  console.log(`❌ Провалилось: ${report.summary.failed}`);
  console.log(`⏭️  Пропущено: ${report.summary.skipped}`);
  console.log(`📈 Процент успеха: ${report.summary.passRate}\n`);
  
  if (Object.keys(analysis.errorsByCategory).length > 0) {
    console.log('Ошибки по категориям:');
    for (const [category, count] of Object.entries(analysis.errorsByCategory)) {
      console.log(`  ${category}: ${count}`);
    }
    console.log('');
  }
  
  if (Object.keys(analysis.errorsByPage).length > 0) {
    console.log('Ошибки по страницам:');
    for (const [page, count] of Object.entries(analysis.errorsByPage)) {
      console.log(`  ${page}: ${count}`);
    }
    console.log('');
  }
  
  console.log('Приоритизация ошибок:');
  console.log(`  🔴 Критические: ${report.prioritizedErrors.critical}`);
  console.log(`  🟡 Средние: ${report.prioritizedErrors.medium}`);
  console.log(`  🟢 Мелкие: ${report.prioritizedErrors.minor}\n`);
  
  console.log(`📄 Полный отчет сохранен: ${reportFile}\n`);
  
  return reportFile;
}

function generateRecommendations(analysis) {
  const recommendations = [];
  
  if (analysis.errorsByCategory['Timeout'] > 0) {
    recommendations.push({
      priority: 'high',
      issue: 'Timeout ошибки',
      recommendation: 'Увеличить timeout для медленных тестов или оптимизировать загрузку страниц',
    });
  }
  
  if (analysis.errorsByCategory['React Loading'] > 0) {
    recommendations.push({
      priority: 'high',
      issue: 'Проблемы с загрузкой React',
      recommendation: 'Улучшить waitForPageLoad функцию и проверку гидратации',
    });
  }
  
  if (analysis.errorsByCategory['Element Not Found'] > 0) {
    recommendations.push({
      priority: 'medium',
      issue: 'Элементы не найдены',
      recommendation: 'Проверить селекторы и улучшить ожидание появления элементов',
    });
  }
  
  if (analysis.errorsByCategory['Network Error'] > 0) {
    recommendations.push({
      priority: 'high',
      issue: 'Сетевые ошибки',
      recommendation: 'Проверить доступность сервера и исправить failed запросы',
    });
  }
  
  return recommendations;
}

// Запускаем анализ
try {
  const analysis = analyzeResults();
  
  if (analysis) {
    generateReport(analysis);
  } else {
    console.log('⚠️  Нет данных для анализа');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Ошибка при анализе результатов:', error);
  process.exit(1);
}

