/**
 * SEO Metadata Audit Script
 * Проверяет все метаданные на соответствие критериям SEO
 */

const fs = require('fs');
const path = require('path');

// Критерии проверки
const CRITERIA = {
  title: {
    maxLength: 60,
    optimalLength: { min: 50, max: 60 },
  },
  description: {
    maxLength: 160,
    optimalLength: { min: 150, max: 160 },
  },
};

// Страницы для проверки
const pages = [
  { path: 'app/page.tsx', route: '/', name: 'Главная' },
  { path: 'app/layout.tsx', route: '/', name: 'Root Layout' },
  { path: 'app/about/page.tsx', route: '/about', name: 'О нас' },
  { path: 'app/services/page.tsx', route: '/services', name: 'Услуги - обзор' },
  { path: 'app/services/buyback-cars/page.tsx', route: '/services/buyback-cars', name: 'Выкуп автомобилей' },
  { path: 'app/services/urgent-buyback/page.tsx', route: '/services/urgent-buyback', name: 'Срочный выкуп' },
  { path: 'app/services/damaged-cars/page.tsx', route: '/services/damaged-cars', name: 'Выкуп битых авто' },
  { path: 'app/services/after-accident/page.tsx', route: '/services/after-accident', name: 'Выкуп после ДТП' },
  { path: 'app/services/credit-cars/page.tsx', route: '/services/credit-cars', name: 'Выкуп кредитных авто' },
  { path: 'app/services/premium-cars/page.tsx', route: '/services/premium-cars', name: 'Выкуп премиум авто' },
  { path: 'app/car-brands/page.tsx', route: '/car-brands', name: 'Марки автомобилей' },
  { path: 'app/calculator/page.tsx', route: '/calculator', name: 'Калькулятор' },
  { path: 'app/reviews/layout.tsx', route: '/reviews', name: 'Отзывы' },
  { path: 'app/contacts/layout.tsx', route: '/contacts', name: 'Контакты' },
  { path: 'app/faq/page.tsx', route: '/faq', name: 'FAQ' },
  { path: 'app/blog/page.tsx', route: '/blog', name: 'Блог - список' },
  { path: 'app/how-we-work/page.tsx', route: '/how-we-work', name: 'Как мы работаем' },
  { path: 'app/prices/page.tsx', route: '/prices', name: 'Цены' },
  { path: 'app/guarantees/page.tsx', route: '/guarantees', name: 'Гарантии' },
  { path: 'app/why-us/page.tsx', route: '/why-us', name: 'Почему мы' },
  { path: 'app/documents/page.tsx', route: '/documents', name: 'Документы' },
];

// Извлечение метаданных из файла
function extractMetadata(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const content = fs.readFileSync(fullPath, 'utf-8');
  const metadata = {
    title: null,
    description: null,
    keywords: null,
    ogTitle: null,
    ogDescription: null,
    twitterTitle: null,
    twitterDescription: null,
  };

  // Извлечение title
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
  if (titleMatch) {
    metadata.title = titleMatch[1];
  }

  // Извлечение description (многострочное)
  const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/s) ||
                   content.match(/description:\s*`([^`]+)`/s);
  if (descMatch) {
    metadata.description = descMatch[1].replace(/\s+/g, ' ').trim();
  }

  // Извлечение keywords
  const keywordsMatch = content.match(/keywords:\s*['"`]([^'"`]+)['"`]/s) ||
                       content.match(/keywords:\s*`([^`]+)`/s);
  if (keywordsMatch) {
    metadata.keywords = keywordsMatch[1].replace(/\s+/g, ' ').trim();
  }

  // Open Graph title
  const ogTitleMatch = content.match(/og:title['"]?\s*:\s*['"`]([^'"`]+)['"`]/) ||
                      content.match(/title:\s*['"`]([^'"`]+)['"`].*openGraph/i);
  if (ogTitleMatch) {
    metadata.ogTitle = ogTitleMatch[1];
  }

  // Open Graph description
  const ogDescMatch = content.match(/og:description['"]?\s*:\s*['"`]([^'"`]+)['"`]/s) ||
                     content.match(/description:\s*['"`]([^'"`]+)['"`].*openGraph/i);
  if (ogDescMatch) {
    metadata.ogDescription = ogDescMatch[1].replace(/\s+/g, ' ').trim();
  }

  // Twitter title
  const twitterTitleMatch = content.match(/twitter.*title['"]?\s*:\s*['"`]([^'"`]+)['"`]/i);
  if (twitterTitleMatch) {
    metadata.twitterTitle = twitterTitleMatch[1];
  }

  // Twitter description
  const twitterDescMatch = content.match(/twitter.*description['"]?\s*:\s*['"`]([^'"`]+)['"`]/is);
  if (twitterDescMatch) {
    metadata.twitterDescription = twitterDescMatch[1].replace(/\s+/g, ' ').trim();
  }

  return metadata;
}

// Проверка длины
function checkLength(text, maxLength, optimalRange) {
  if (!text) return { valid: false, issue: 'Отсутствует' };

  const length = text.length;
  const issues = [];

  if (length > maxLength) {
    issues.push(`Превышена максимальная длина: ${length} > ${maxLength}`);
  }

  if (length < optimalRange.min) {
    issues.push(`Короче оптимальной: ${length} < ${optimalRange.min}`);
  }

  if (length > optimalRange.max) {
    issues.push(`Длиннее оптимальной: ${length} > ${optimalRange.max}`);
  }

  return {
    valid: issues.length === 0,
    length,
    issues,
  };
}

// Проверка релевантности бренду
function checkBrandRelevance(text) {
  if (!text) return { valid: false, issue: 'Отсутствует' };

  const brandKeywords = ['выкуп авто', 'выкуп автомобилей', 'москва', 'мо', 'московская область'];
  const found = brandKeywords.filter(keyword =>
    text.toLowerCase().includes(keyword.toLowerCase())
  );

  return {
    valid: found.length > 0,
    foundKeywords: found,
    missingKeywords: brandKeywords.filter(k => !found.includes(k)),
  };
}

// Основная функция аудита
function auditMetadata() {
  const results = [];
  const titleMap = new Map();
  const descriptionMap = new Map();

  console.log('🔍 Начало аудита метаданных...\n');

  for (const page of pages) {
    const metadata = extractMetadata(page.path);

    if (!metadata) {
      console.log(`⚠️  Файл не найден: ${page.path}`);
      continue;
    }

    const result = {
      page: page.name,
      route: page.route,
      file: page.path,
      metadata,
      issues: [],
      warnings: [],
    };

    // Проверка title
    if (metadata.title) {
      const titleLength = checkLength(metadata.title, CRITERIA.title.maxLength, CRITERIA.title.optimalLength);
      if (!titleLength.valid) {
        result.issues.push(`Title: ${titleLength.issues.join(', ')}`);
      }

      // Проверка уникальности
      if (titleMap.has(metadata.title)) {
        result.issues.push(`Title дублируется с: ${titleMap.get(metadata.title)}`);
      } else {
        titleMap.set(metadata.title, page.name);
      }

      // Проверка релевантности бренду
      const brandCheck = checkBrandRelevance(metadata.title);
      if (!brandCheck.valid) {
        result.warnings.push(`Title не содержит ключевых слов бренда`);
      }
    } else {
      result.issues.push('Title отсутствует');
    }

    // Проверка description
    if (metadata.description) {
      const descLength = checkLength(metadata.description, CRITERIA.description.maxLength, CRITERIA.description.optimalLength);
      if (!descLength.valid) {
        result.issues.push(`Description: ${descLength.issues.join(', ')}`);
      }

      // Проверка уникальности
      if (descriptionMap.has(metadata.description)) {
        result.issues.push(`Description дублируется с: ${descriptionMap.get(metadata.description)}`);
      } else {
        descriptionMap.set(metadata.description, page.name);
      }

      // Проверка релевантности бренду
      const brandCheck = checkBrandRelevance(metadata.description);
      if (!brandCheck.valid) {
        result.warnings.push(`Description не содержит ключевых слов бренда`);
      }
    } else {
      result.issues.push('Description отсутствует');
    }

    // Проверка Open Graph
    if (metadata.ogTitle && metadata.ogTitle !== metadata.title) {
      result.warnings.push('Open Graph title отличается от основного title');
    }
    if (metadata.ogDescription && metadata.ogDescription !== metadata.description) {
      result.warnings.push('Open Graph description отличается от основного description');
    }

    // Проверка Twitter
    if (metadata.twitterTitle && metadata.twitterTitle !== metadata.title) {
      result.warnings.push('Twitter title отличается от основного title');
    }
    if (metadata.twitterDescription && metadata.twitterDescription !== metadata.description) {
      result.warnings.push('Twitter description отличается от основного description');
    }

    results.push(result);
  }

  // Вывод результатов
  console.log('📊 РЕЗУЛЬТАТЫ АУДИТА\n');
  console.log('='.repeat(80));

  let criticalCount = 0;
  let warningCount = 0;

  for (const result of results) {
    if (result.issues.length > 0 || result.warnings.length > 0) {
      console.log(`\n📄 ${result.page} (${result.route})`);
      console.log(`   Файл: ${result.file}`);

      if (result.metadata.title) {
        console.log(`   Title (${result.metadata.title.length}): ${result.metadata.title.substring(0, 70)}...`);
      }
      if (result.metadata.description) {
        console.log(`   Description (${result.metadata.description.length}): ${result.metadata.description.substring(0, 100)}...`);
      }

      if (result.issues.length > 0) {
        console.log(`   ❌ Критические проблемы:`);
        result.issues.forEach(issue => console.log(`      - ${issue}`));
        criticalCount += result.issues.length;
      }

      if (result.warnings.length > 0) {
        console.log(`   ⚠️  Предупреждения:`);
        result.warnings.forEach(warning => console.log(`      - ${warning}`));
        warningCount += result.warnings.length;
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n📈 СТАТИСТИКА:`);
  console.log(`   Всего страниц проверено: ${results.length}`);
  console.log(`   Критических проблем: ${criticalCount}`);
  console.log(`   Предупреждений: ${warningCount}`);
  console.log(`   Страниц без проблем: ${results.filter(r => r.issues.length === 0 && r.warnings.length === 0).length}`);

  // Сохранение отчета
  const reportPath = path.join(process.cwd(), 'metadata-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\n💾 Отчет сохранен в: ${reportPath}`);

  return results;
}

// Запуск аудита
if (require.main === module) {
  auditMetadata();
}

module.exports = { auditMetadata, extractMetadata, checkLength, checkBrandRelevance };
