const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Скрипт для создания favicon файлов на основе существующих иконок
 * Требует установленного sharp для обработки изображений
 */

async function generateFaviconFiles() {
  const publicDir = path.join(process.cwd(), 'public');
  const appDir = path.join(process.cwd(), 'app');

  // Проверяем наличие sharp
  let sharp;
  try {
    sharp = require('sharp');
  } catch (error) {
    console.error('❌ Ошибка: sharp не установлен. Установите: npm install sharp');
    process.exit(1);
  }

  // Проверяем наличие исходных файлов
  const icon512Path = path.join(publicDir, 'icon-512.png');
  if (!fs.existsSync(icon512Path)) {
    console.error('❌ Ошибка: icon-512.png не найден в public/');
    process.exit(1);
  }

  console.log('🎨 Создание favicon файлов...\n');

  try {
    // 1. Создаем app/icon.png (512x512) - копируем icon-512.png
    const appIconPath = path.join(appDir, 'icon.png');
    if (!fs.existsSync(appIconPath)) {
      await sharp(icon512Path)
        .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .png()
        .toFile(appIconPath);
      console.log('✓ Создан app/icon.png (512x512)');
    } else {
      console.log('✓ app/icon.png уже существует');
    }

    // 2. Создаем favicon.ico (multi-resolution: 16x16, 32x32, 48x48)
    // Для ICO нужно использовать специальную библиотеку или создать через онлайн-конвертер
    // Пока создадим favicon.png как временное решение, которое Next.js тоже поддерживает
    const faviconPath = path.join(appDir, 'favicon.ico');
    const faviconPngPath = path.join(appDir, 'favicon.png');

    // Создаем favicon.png (32x32) - Next.js будет использовать его
    if (!fs.existsSync(faviconPngPath)) {
      await sharp(icon512Path)
        .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .png()
        .toFile(faviconPngPath);
      console.log('✓ Создан app/favicon.png (32x32)');
    } else {
      console.log('✓ app/favicon.png уже существует');
    }

    // 3. Создаем apple-touch-icon.png (180x180)
    const appleTouchIconPath = path.join(publicDir, 'apple-touch-icon.png');
    if (!fs.existsSync(appleTouchIconPath)) {
      await sharp(icon512Path)
        .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .png()
        .toFile(appleTouchIconPath);
      console.log('✓ Создан public/apple-touch-icon.png (180x180)');
    } else {
      console.log('✓ public/apple-touch-icon.png уже существует');
    }

    console.log('\n✅ Все favicon файлы созданы успешно!');
    console.log('\n📝 Примечание:');
    console.log('   - app/icon.png используется Next.js 13+ как favicon автоматически');
    console.log('   - app/favicon.png используется как резервный вариант');
    console.log('   - Для создания настоящего .ico файла используйте онлайн-конвертер:');
    console.log('     https://convertio.co/png-ico/ или https://www.favicon-generator.org/');
    console.log('     Загрузите app/favicon.png и скачайте favicon.ico, затем поместите в app/');

  } catch (error) {
    console.error('❌ Ошибка при создании файлов:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  generateFaviconFiles().catch(console.error);
}

module.exports = { generateFaviconFiles };
