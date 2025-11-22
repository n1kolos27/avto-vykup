/**
 * Скрипт для запуска полного набора тестов и анализа результатов
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧹 Освобождаю порты...');
try {
  execSync('npm run free:ports', { stdio: 'inherit' });
} catch (e) {
  console.warn('⚠️  Не удалось освободить порты');
}

console.log('🔨 Собираю проект...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (e) {
  console.error('❌ Ошибка сборки:', e.message);
  process.exit(1);
}

console.log('🧪 Запускаю тесты...');
const testResultsFile = path.join(__dirname, '..', 'test-results.json');

try {
  execSync(
    'npx playwright test --reporter=list,json --timeout=60000 --max-failures=100',
    {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    }
  );
} catch (e) {
  console.warn('⚠️  Некоторые тесты провалились');
}

console.log('📊 Анализирую результаты...');
try {
  execSync('npm run test:e2e:analyze', { stdio: 'inherit' });
} catch (e) {
  console.warn('⚠️  Не удалось проанализировать результаты');
}

console.log('✅ Готово! Откройте playwright-report/index.html для детального просмотра');

