#!/usr/bin/env node
/**
 * Скрипт для запуска тестов с детальным отчетом
 * Собирает статистику, категоризирует ошибки и создает отчет
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('🧪 Запуск полноценного тестирования сайта...\n');

// Создаем директорию для отчетов
const reportsDir = path.join(projectRoot, 'test-reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const reportFile = path.join(reportsDir, `test-report-${timestamp}.json`);

try {
  console.log('📦 Сборка проекта для тестирования...');
  execSync('npm run build', { 
    cwd: projectRoot, 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  console.log('\n🚀 Запуск тестов...');
  
  // Запускаем тесты с JSON репортером
  const testCommand = 'npx playwright test --reporter=json,list,html';
  
  try {
    execSync(testCommand, {
      cwd: projectRoot,
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production',
        CI: 'false', // Отключаем CI режим для локального запуска
      },
    });
    
    console.log('\n✅ Все тесты завершены');
  } catch (error) {
    // Тесты могут завершиться с ошибкой, но мы все равно собираем отчет
    console.log('\n⚠️  Некоторые тесты провалились, собираем отчет...');
  }
  
  // Читаем JSON отчет если он есть
  const jsonReportPath = path.join(projectRoot, 'test-results', 'report.json');
  if (fs.existsSync(jsonReportPath)) {
    const reportData = JSON.parse(fs.readFileSync(jsonReportPath, 'utf-8'));
    
    // Анализируем результаты
    const analysis = analyzeTestResults(reportData);
    
    // Сохраняем анализ
    fs.writeFileSync(reportFile, JSON.stringify(analysis, null, 2));
    
    // Выводим краткую статистику
    console.log('\n📊 Статистика тестов:');
    console.log(`   Всего тестов: ${analysis.total}`);
    console.log(`   ✅ Успешно: ${analysis.passed}`);
    console.log(`   ❌ Провалено: ${analysis.failed}`);
    console.log(`   ⏭️  Пропущено: ${analysis.skipped}`);
    console.log(`   ⏱️  Время выполнения: ${analysis.duration}ms`);
    
    if (analysis.failed > 0) {
      console.log('\n❌ Проваленные тесты:');
      analysis.failedTests.forEach((test, index) => {
        console.log(`   ${index + 1}. ${test.title}`);
        if (test.error) {
          console.log(`      Ошибка: ${test.error.message}`);
        }
      });
      
      console.log('\n📋 Категории ошибок:');
      Object.entries(analysis.errorCategories).forEach(([category, count]) => {
        console.log(`   ${category}: ${count}`);
      });
    }
    
    console.log(`\n📄 Полный отчет сохранен: ${reportFile}`);
  } else {
    console.log('\n⚠️  JSON отчет не найден. Проверьте test-results/report.json');
  }
  
} catch (error) {
  console.error('\n❌ Ошибка при запуске тестов:', error.message);
  process.exit(1);
}

/**
 * Анализ результатов тестов
 */
function analyzeTestResults(reportData) {
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    duration: 0,
    failedTests: [],
    errorCategories: {},
    pages: {},
    components: {},
  };
  
  if (!reportData || !reportData.suites) {
    return results;
  }
  
  function processSuite(suite) {
    if (suite.specs) {
      suite.specs.forEach(spec => {
        spec.tests.forEach(test => {
          results.total++;
          results.duration += test.results.reduce((sum, r) => sum + (r.duration || 0), 0);
          
          const status = test.results[0]?.status || 'skipped';
          
          if (status === 'passed') {
            results.passed++;
          } else if (status === 'failed') {
            results.failed++;
            
            const error = test.results[0]?.error;
            const testInfo = {
              title: `${spec.title} - ${test.title}`,
              file: spec.file,
              error: error ? {
                message: error.message,
                stack: error.stack,
              } : null,
            };
            
            results.failedTests.push(testInfo);
            
            // Категоризируем ошибки
            if (error) {
              const category = categorizeError(error.message);
              results.errorCategories[category] = (results.errorCategories[category] || 0) + 1;
            }
            
            // Группируем по страницам/компонентам
            const filePath = spec.file || '';
            if (filePath.includes('/pages/')) {
              const pageName = path.basename(filePath, '.spec.ts');
              results.pages[pageName] = (results.pages[pageName] || 0) + 1;
            } else if (filePath.includes('/components/')) {
              const componentName = path.basename(filePath, '.spec.ts');
              results.components[componentName] = (results.components[componentName] || 0) + 1;
            }
          } else {
            results.skipped++;
          }
        });
      });
    }
    
    if (suite.suites) {
      suite.suites.forEach(subSuite => processSuite(subSuite));
    }
  }
  
  reportData.suites.forEach(suite => processSuite(suite));
  
  return results;
}

/**
 * Категоризация ошибок
 */
function categorizeError(errorMessage) {
  const message = errorMessage.toLowerCase();
  
  if (message.includes('timeout') || message.includes('waiting for')) {
    return 'Timeout';
  }
  if (message.includes('not found') || message.includes('not visible')) {
    return 'Element Not Found';
  }
  if (message.includes('react') || message.includes('root element')) {
    return 'React Loading';
  }
  if (message.includes('network') || message.includes('fetch')) {
    return 'Network Error';
  }
  if (message.includes('assertion') || message.includes('expected')) {
    return 'Assertion Failed';
  }
  if (message.includes('navigation') || message.includes('url')) {
    return 'Navigation Error';
  }
  
  return 'Other';
}

