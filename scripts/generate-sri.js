/**
 * Скрипт для генерации SRI хешей для внешних скриптов
 * 
 * Использование:
 * node scripts/generate-sri.js <url>
 * 
 * Пример:
 * node scripts/generate-sri.js https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID
 */

const https = require('https');
const crypto = require('crypto');

const url = process.argv[2];

if (!url) {
  console.error('Usage: node scripts/generate-sri.js <url>');
  process.exit(1);
}

/**
 * Генерирует SRI hash для скрипта
 */
function generateSRIHash(content) {
  const hash = crypto.createHash('sha384').update(content).digest('base64');
  return `sha384-${hash}`;
}

/**
 * Загружает скрипт и генерирует SRI hash
 */
https.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed to fetch script: ${res.statusCode}`);
    process.exit(1);
  }

  const chunks = [];
  res.on('data', (chunk) => chunks.push(chunk));
  res.on('end', () => {
    const content = Buffer.concat(chunks);
    const hash = generateSRIHash(content);
    
    console.log('\n=== SRI Hash ===');
    console.log(`URL: ${url}`);
    console.log(`Hash: ${hash}`);
    console.log(`\nUsage in HTML:`);
    console.log(`<script src="${url}" integrity="${hash}" crossorigin="anonymous"></script>`);
    console.log('\n');
  });
}).on('error', (err) => {
  console.error(`Error fetching script: ${err.message}`);
  process.exit(1);
});

