#!/usr/bin/env node

/**
 * Скрипт для открытия Lighthouse HTML отчета через локальный сервер
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const REPORT_PATH = path.join(__dirname, '..', 'lighthouse-reports', 'lighthouse-report.html');
const PORT = 8080;

if (!fs.existsSync(REPORT_PATH)) {
  console.error('❌ HTML отчет не найден:', REPORT_PATH);
  console.error('   Сначала запустите: node scripts/run-lighthouse-direct.js');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/lighthouse-report.html') {
    const content = fs.readFileSync(REPORT_PATH, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log('\n========================================');
  console.log('📊 Lighthouse HTML Report');
  console.log('========================================\n');
  console.log(`✅ Сервер запущен на порту ${PORT}`);
  console.log(`📄 Откройте в браузере:`);
  console.log(`   http://localhost:${PORT}\n`);
  console.log('💡 Нажмите Ctrl+C для остановки сервера\n');

  // Пытаемся открыть в браузере
  const url = `http://localhost:${PORT}`;
  const command = process.platform === 'win32'
    ? `start ${url}`
    : process.platform === 'darwin'
    ? `open ${url}`
    : `xdg-open ${url}`;

  exec(command, (error) => {
    if (error) {
      console.log('⚠️  Не удалось открыть браузер автоматически');
      console.log(`   Откройте вручную: ${url}\n`);
    }
  });
});
