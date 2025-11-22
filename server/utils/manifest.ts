import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../../src/lib/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ManifestChunk {
  file: string;
  src?: string;
  isEntry?: boolean;
  imports?: string[];
  css?: string[];
}

interface Manifest {
  [key: string]: ManifestChunk;
}

/**
 * Чтение Vite manifest файла
 */
export function readManifest(): Manifest | null {
  // Vite создает manifest.json в корне dist/client, а не в .vite/
  const manifestPath = path.join(__dirname, '../dist/client/manifest.json');
  
  if (!fs.existsSync(manifestPath)) {
    // Пробуем альтернативный путь
    const altPath = path.join(__dirname, '../dist/client/.vite/manifest.json');
    if (fs.existsSync(altPath)) {
      try {
        const manifestContent = fs.readFileSync(altPath, 'utf-8');
        return JSON.parse(manifestContent) as Manifest;
      } catch (error) {
        logger.error('Error reading manifest from .vite', { error: error instanceof Error ? error.message : String(error) });
      }
    }
    return null;
  }
  
  try {
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    return JSON.parse(manifestContent) as Manifest;
  } catch (error) {
    logger.error('Error reading manifest', { error: error instanceof Error ? error.message : String(error) });
    return null;
  }
}

/**
 * Генерация preload ссылок для критических ресурсов
 * Оптимизировано для быстрой загрузки критических ресурсов
 */
export function generatePreloadLinks(manifest: Manifest | null): string {
  if (!manifest) {
    return '';
  }
  
  const links: string[] = [];
  
  // Находим entry point (обычно index.html -> main entry)
  const entryChunk = Object.values(manifest).find((chunk) => chunk.isEntry);
  
  if (entryChunk) {
    // 1. Preload критических CSS файлов (высокий приоритет)
    if (entryChunk.css && entryChunk.css.length > 0) {
      entryChunk.css.forEach((cssFile) => {
        links.push(`<link rel="preload" href="/${cssFile}" as="style" onload="this.onload=null;this.rel='stylesheet'">`);
        links.push(`<noscript><link rel="stylesheet" href="/${cssFile}"></noscript>`);
      });
    }
    
    // 2. Preload основного JS файла (высокий приоритет)
    if (entryChunk.file) {
      links.push(`<link rel="modulepreload" href="/${entryChunk.file}" crossorigin>`);
    }
    
    // 3. Preload критических vendor chunks (React, React Router)
    if (entryChunk.imports) {
      const criticalVendors = ['react-vendor', 'router-vendor'];
      
      entryChunk.imports.forEach((importKey) => {
        const importChunk = manifest[importKey];
        if (!importChunk) return;
        
        // Критические vendor chunks загружаем с высоким приоритетом
        const isCritical = criticalVendors.some(vendor => importChunk.file?.includes(vendor));
        
        if (importChunk.file) {
          if (isCritical) {
            // Критические chunks - modulepreload
            links.push(`<link rel="modulepreload" href="/${importChunk.file}" crossorigin>`);
          } else {
            // Не критические chunks - prefetch (низкий приоритет)
            // Это будет обработано в generatePrefetchLinks
          }
        }
        
        // CSS для критических импортов
        if (isCritical && importChunk.css) {
          importChunk.css.forEach((cssFile) => {
            links.push(`<link rel="preload" href="/${cssFile}" as="style" onload="this.onload=null;this.rel='stylesheet'">`);
            links.push(`<noscript><link rel="stylesheet" href="/${cssFile}"></noscript>`);
          });
        }
      });
    }
  }
  
  return links.join('\n  ');
}

/**
 * Генерация prefetch ссылок для не критических ресурсов
 */
export function generatePrefetchLinks(manifest: Manifest | null): string {
  if (!manifest) {
    return '';
  }
  
  const links: string[] = [];
  
  // Prefetch для всех остальных чанков (не entry)
  Object.values(manifest).forEach((chunk) => {
    if (!chunk.isEntry && chunk.file && chunk.file.endsWith('.js')) {
      links.push(`<link rel="prefetch" href="/${chunk.file}" as="script" crossorigin>`);
    }
  });
  
  return links.length > 0 ? links.join('\n  ') : '';
}

