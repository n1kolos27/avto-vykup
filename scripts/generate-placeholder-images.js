#!/usr/bin/env node

/**
 * Скрипт для генерации placeholder изображений
 * ВНИМАНИЕ: Это временные placeholder изображения для разработки.
 * Для production необходимо создать реальные изображения с логотипом и брендингом.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Простой SVG генератор для placeholder изображений
function generateSVGPlaceholder(width, height, text, bgColor = '#0284c7', textColor = '#ffffff') {
  // Разбиваем текст на строки для многострочного текста
  const lines = text.split('\n');
  const fontSize = Math.min(width, height) / (lines.length > 1 ? 8 : 10);
  const lineHeight = fontSize * 1.2;
  const totalHeight = lines.length * lineHeight;
  const startY = (height - totalHeight) / 2 + fontSize;
  
  const textElements = lines.map((line, index) => {
    const y = startY + (index * lineHeight);
    return `<tspan x="50%" y="${y}">${line}</tspan>`;
  }).join('\n    ');
  
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text font-family="Arial, sans-serif" font-size="${fontSize}" 
        font-weight="bold" fill="${textColor}" text-anchor="middle">
    ${textElements}
  </text>
</svg>`;
}

async function generatePNGFromSVG(svgContent, outputPath) {
  try {
    // Конвертируем SVG в PNG используя sharp
    await sharp(Buffer.from(svgContent))
      .png()
      .toFile(outputPath);
    console.log(`✓ Создан PNG: ${outputPath}`);
  } catch (error) {
    // Fallback: сохраняем SVG если конвертация не удалась
    const svgPath = outputPath.replace('.png', '.svg');
    fs.writeFileSync(svgPath, svgContent);
    console.log(`⚠ Не удалось создать PNG, создан SVG: ${svgPath}`);
    console.log(`  Ошибка: ${error.message}`);
  }
}

async function createPlaceholderImages() {
  const publicDir = path.join(process.cwd(), 'public');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const images = [
    {
      path: path.join(publicDir, 'og-image.png'),
      width: 1200,
      height: 630,
      text: 'Выкуп авто\nВыкуп автомобилей в Москве и МО',
      description: 'Open Graph изображение',
    },
    {
      path: path.join(publicDir, 'icon-192.png'),
      width: 192,
      height: 192,
      text: 'ТОП-1',
      description: 'PWA иконка 192x192',
    },
    {
      path: path.join(publicDir, 'icon-512.png'),
      width: 512,
      height: 512,
      text: 'ТОП-1',
      description: 'PWA иконка 512x512',
    },
    {
      path: path.join(publicDir, 'logo.png'),
      width: 600,
      height: 120,
      text: 'Выкуп авто',
      description: 'Логотип для Schema.org',
    },
  ];

  console.log('📸 Генерация placeholder изображений...\n');

  for (const { path: imagePath, width, height, text, description } of images) {
    if (fs.existsSync(imagePath)) {
      console.log(`✓ ${path.basename(imagePath)} уже существует`);
      continue;
    }

    const svg = generateSVGPlaceholder(width, height, text);
    await generatePNGFromSVG(svg, imagePath);
  }

  console.log('\n⚠ ВНИМАНИЕ: Созданы placeholder PNG изображения для разработки!');
  console.log('Для production необходимо:');
  console.log('1. Создать реальные изображения с логотипом и брендингом');
  console.log('2. Оптимизировать их (WebP, сжатие)');
  console.log('3. Разместить в папке public/');
  console.log('\nИнструкции: см. public/README-IMAGES.md');
}

if (require.main === module) {
  createPlaceholderImages().catch((error) => {
    console.error('Ошибка при создании изображений:', error);
    process.exit(1);
  });
}

module.exports = { createPlaceholderImages };

