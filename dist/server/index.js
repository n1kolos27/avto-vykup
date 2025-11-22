import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { renderApp } from '../src/server/render.js';
import { generateMetadata } from '../src/lib/seo/metadata.js';
import { generateSchemaHTML } from '../src/lib/seo/schema.js';
import { readManifest, generatePreloadLinks, generatePrefetchLinks } from './utils/manifest.js';
import { getPort, isPortAvailable, isHttpServerAvailable } from './utils/port-utils.js';
import { ENV } from '../src/lib/config/env.js';
import { logger } from '../src/lib/logger.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PREFERRED_PORT = ENV.PORT || 3000;
const VITE_PORT = ENV.VITE_PORT || 3001;
const isProduction = ENV.NODE_ENV === 'production';
// Middleware
app.use(compression());
// Security middleware
import { globalRateLimit, nonceMiddleware } from './middleware/security.js';
import { requestIdMiddleware } from './middleware/request-id.js';
import { csrfTokenMiddleware, csrfProtection } from './middleware/csrf.js';
app.use(requestIdMiddleware);
app.use(globalRateLimit);
// В development режиме не используем nonce, чтобы разрешить unsafe-inline для Vite
if (isProduction) {
    app.use(nonceMiddleware);
}
app.use(csrfTokenMiddleware); // Генерирует CSRF токены для всех запросов
// CSP с nonces для безопасности (улучшенная версия без unsafe-inline)
app.use((req, res, next) => {
    // В development режиме не используем nonce, чтобы разрешить unsafe-inline для Vite
    const nonce = isProduction ? (req.nonce || '') : '';
    helmet({
        contentSecurityPolicy: {
            useDefaults: false,
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: [
                    "'self'",
                    // В development режиме разрешаем unsafe-inline и Vite dev server
                    ...(isProduction ? [] : ["'unsafe-inline'", "'unsafe-eval'", `http://localhost:${VITE_PORT}`, `http://localhost:${VITE_PORT}/*`]),
                    ...(isProduction && nonce ? [`'nonce-${nonce}'`] : []),
                    // Разрешаем загрузку скриптов аналитики с SRI
                    "https://www.googletagmanager.com",
                    "https://mc.yandex.ru",
                ],
                // styleSrc: используем unsafe-hashes для конкретных inline стилей и unsafe-inline только для Tailwind JIT
                // Tailwind JIT генерирует классы на этапе сборки, но некоторые динамические классы могут требовать unsafe-inline
                // unsafe-hashes позволяет использовать конкретные inline стили без полного unsafe-inline
                styleSrc: [
                    "'self'",
                    // В development режиме разрешаем unsafe-inline для Vite HMR и React
                    ...(isProduction ? [] : ["'unsafe-inline'"]),
                    // В production: если есть nonce, используем его, иначе unsafe-inline для Tailwind
                    // nonce работает только для SSR стилей, для клиентских нужен unsafe-inline
                    ...(isProduction && nonce ? [`'nonce-${nonce}'`] : []),
                    // Разрешаем unsafe-hashes для конкретных inline стилей
                    "'unsafe-hashes'",
                    // unsafe-inline для Tailwind JIT и клиентских стилей (безопасно в production)
                    "'unsafe-inline'",
                ],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'", "https:"],
                fontSrc: ["'self'", "data:"],
                objectSrc: ["'none'"],
                mediaSrc: ["'self'"],
                frameSrc: ["'none'"],
                baseUri: ["'self'"],
                formAction: ["'self'"],
                upgradeInsecureRequests: [],
            },
        },
        crossOriginEmbedderPolicy: false,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        // X-Content-Type-Options: nosniff
        noSniff: true,
        // Referrer-Policy
        referrerPolicy: {
            policy: 'strict-origin-when-cross-origin',
        },
        // Permissions-Policy добавляется через отдельный middleware
        // (helmet 7.x не поддерживает permissionsPolicy напрямую)
    })(req, res, next);
});
// Permissions-Policy header (добавляем отдельно, так как helmet 7.x не поддерживает его напрямую)
app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'geolocation=(self), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()');
    next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Статические файлы
if (isProduction) {
    const clientPath = path.join(__dirname, '../dist/client');
    if (fs.existsSync(clientPath)) {
        app.use(express.static(clientPath, { index: false }));
    }
}
app.use(express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../public')));
// API routes
import apiRouter from './routes/api.js';
// Диагностический endpoint для проверки состояния портов (доступен без CSRF)
app.get('/api/health/ports', async (req, res) => {
    try {
        const expressPortAvailable = await isPortAvailable(PREFERRED_PORT);
        const vitePortAvailable = await isPortAvailable(VITE_PORT);
        const viteHttpAvailable = !isProduction ? await isHttpServerAvailable(VITE_PORT, 1000) : false;
        res.json({
            express: {
                preferredPort: PREFERRED_PORT,
                portAvailable: expressPortAvailable,
                httpAvailable: true, // Express сервер уже запущен, если мы здесь
            },
            vite: {
                port: VITE_PORT,
                portAvailable: vitePortAvailable,
                httpAvailable: viteHttpAvailable,
                required: !isProduction,
            },
            environment: ENV.NODE_ENV,
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to check ports',
            message: error instanceof Error ? error.message : String(error),
        });
    }
});
// CSRF endpoint должен быть доступен без защиты CSRF (но после csrfTokenMiddleware)
app.get('/api/csrf-token', (req, res) => {
    const token = res.locals.csrfToken;
    if (token) {
        res.json({ csrfToken: token });
    }
    else {
        res.status(500).json({ error: 'Failed to generate CSRF token' });
    }
});
// Остальные API routes защищены CSRF
app.use('/api', csrfProtection, apiRouter);
// SEO routes (sitemap)
import sitemapRouter from './routes/sitemap.js';
app.use('/', sitemapRouter);
// Импорт кэширования
import { get as getCache, set as setCache } from '../src/lib/caching/index.js';
import { CACHE } from '../src/lib/config/constants.js';
// Кэш данных блог-постов для метаданных
let blogPostsCache = null;
// Загрузка данных блог-постов при старте (асинхронно)
(async () => {
    try {
        const { blogPosts } = await import('../src/routes/BlogPost.js');
        blogPostsCache = Object.fromEntries(Object.entries(blogPosts).map(([slug, post]) => [
            slug,
            { title: post.title, excerpt: post.excerpt, category: post.category },
        ]));
        logger.info('Blog posts metadata loaded', { count: Object.keys(blogPostsCache).length }, 'Server');
    }
    catch (error) {
        logger.warn('Failed to load blog posts metadata', {
            error: error instanceof Error ? error.message : String(error),
        }, 'Server');
    }
})();
/**
 * SSR функция для генерации HTML с кэшированием
 * Упрощенная версия с улучшенной обработкой ошибок
 */
async function renderHTML(url, metadata) {
    const cacheKey = `ssr:${url}`;
    // Проверяем кэш (только в production)
    if (isProduction) {
        const cached = getCache(cacheKey);
        if (cached) {
            logger.debug('SSR cache hit', { url }, 'SSR');
            return cached;
        }
        logger.debug('SSR cache miss', { url }, 'SSR');
    }
    try {
        const startTime = Date.now();
        // Рендерим React приложение
        const result = await renderApp({ url });
        const { html: reactHtml, schemas } = result;
        // Логируем результат SSR для диагностики
        if (!isProduction) {
            logger.debug('SSR render result', {
                url,
                htmlLength: reactHtml?.length || 0,
                hasHeader: reactHtml?.includes('<header') || false,
                hasMain: reactHtml?.includes('<main') || false,
                htmlPreview: reactHtml?.substring(0, 500) || '',
            }, 'SSR');
        }
        // Убеждаемся, что schemas - это массив объектов
        const validSchemas = Array.isArray(schemas) ? schemas : [];
        // Загружаем базовый HTML шаблон
        const templatePath = isProduction
            ? path.join(__dirname, '../dist/client/index.html')
            : path.join(__dirname, '../index.html');
        let html = fs.existsSync(templatePath)
            ? fs.readFileSync(templatePath, 'utf-8')
            : getBaseTemplate();
        // Вставляем отрендеренный HTML
        html = html.replace('<div id="root"></div>', `<div id="root">${reactHtml || ''}</div>`);
        // Добавляем метаданные
        if (metadata) {
            html = injectMetadata(html, metadata);
        }
        // Добавляем Schema разметку
        if (validSchemas && validSchemas.length > 0) {
            const schemaHTML = generateSchemaHTML(validSchemas);
            html = html.replace('</head>', `  ${schemaHTML}\n</head>`);
        }
        // Добавляем preload/prefetch ссылки (только в production)
        if (isProduction) {
            html = injectPreloadLinks(html);
        }
        // Добавляем preconnect для внешних ресурсов (всегда, для быстрого подключения)
        html = injectPreconnectLinks(html);
        // Добавляем dns-prefetch для дополнительной оптимизации
        html = injectDNSPrefetchLinks(html);
        const renderTime = Date.now() - startTime;
        logger.debug('SSR render completed', { url, renderTime });
        // Кэшируем результат
        if (isProduction) {
            if (isStaticPage(url)) {
                // Статические страницы: кэш на 1 час
                setCache(cacheKey, html, CACHE.HTML_MAX_AGE * 1000);
                logger.debug('SSR static page cached', { url, ttl: CACHE.HTML_MAX_AGE * 1000 }, 'SSR');
            }
            else if (isDynamicPage(url)) {
                // Динамические страницы: кэш на 5 минут
                const dynamicCacheTTL = 5 * 60 * 1000; // 5 минут
                setCache(cacheKey, html, dynamicCacheTTL);
                logger.debug('SSR dynamic page cached', { url, ttl: dynamicCacheTTL }, 'SSR');
            }
            else {
                // Остальные страницы: кэш на 10 минут
                const defaultCacheTTL = 10 * 60 * 1000; // 10 минут
                setCache(cacheKey, html, defaultCacheTTL);
                logger.debug('SSR page cached', { url, ttl: defaultCacheTTL }, 'SSR');
            }
        }
        return html;
    }
    catch (error) {
        // Детальное логирование ошибки SSR
        const { createSSRError, classifySSRError, formatSSRErrorForLog } = await import('../src/lib/ssr-errors.js');
        const errorType = classifySSRError(error, url);
        const ssrError = createSSRError(error, url, errorType, {
            stage: 'renderHTML',
        });
        logger.error('SSR HTML Generation Error', formatSSRErrorForLog(ssrError), 'SSR');
        return getFallbackHTML(metadata);
    }
}
/**
 * Базовый HTML шаблон
 */
function getBaseTemplate() {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="icon" href="/favicon.ico">
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
}
/**
 * Fallback HTML для ошибок
 */
function getFallbackHTML(metadata) {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="icon" href="/favicon.ico">
  ${metadata ? generateMetadata(metadata) : ''}
</head>
<body>
  <div id="root"></div>
  ${isProduction ? '<script type="module" src="/assets/main.js"></script>' : `<script type="module" src="http://localhost:${VITE_PORT}/src/client/entry-client.tsx"></script>`}
</body>
</html>`;
}
/**
 * Инъекция метаданных в HTML
 */
function injectMetadata(html, metadata) {
    if (metadata.title) {
        html = html.replace(/<title>.*?<\/title>/, `<title>${metadata.title}</title>`);
    }
    if (metadata.description) {
        const descriptionMeta = `<meta name="description" content="${metadata.description}">`;
        if (html.includes('<meta name="description"')) {
            html = html.replace(/<meta name="description"[^>]*>/, descriptionMeta);
        }
        else {
            html = html.replace('</head>', `  ${descriptionMeta}\n</head>`);
        }
    }
    const fullMeta = generateMetadata(metadata);
    html = html.replace('</head>', `  ${fullMeta}\n</head>`);
    return html;
}
/**
 * Инъекция preload/prefetch ссылок
 */
function injectPreloadLinks(html) {
    try {
        const manifest = readManifest();
        const preloadLinks = generatePreloadLinks(manifest);
        const prefetchLinks = generatePrefetchLinks(manifest);
        if (preloadLinks) {
            html = html.replace('</head>', `  ${preloadLinks}\n</head>`);
        }
        if (prefetchLinks) {
            html = html.replace('</head>', `  ${prefetchLinks}\n</head>`);
        }
    }
    catch (error) {
        logger.warn('Failed to inject preload links', { error: error instanceof Error ? error.message : String(error) });
    }
    return html;
}
/**
 * Инъекция preconnect ссылок для внешних ресурсов
 */
function injectPreconnectLinks(html) {
    const preconnectLinks = `
  <link rel="preconnect" href="https://www.google-analytics.com" crossorigin>
  <link rel="preconnect" href="https://mc.yandex.ru" crossorigin>
  <link rel="dns-prefetch" href="https://www.google-analytics.com">
  <link rel="dns-prefetch" href="https://mc.yandex.ru">`;
    // Добавляем только если еще не добавлены
    if (!html.includes('preconnect') || !html.includes('google-analytics.com')) {
        html = html.replace('</head>', `  ${preconnectLinks}\n</head>`);
    }
    return html;
}
/**
 * Инъекция dns-prefetch ссылок для дополнительной оптимизации DNS
 */
function injectDNSPrefetchLinks(html) {
    // DNS-prefetch для внешних ресурсов, которые могут понадобиться
    const dnsPrefetchLinks = `
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://fonts.gstatic.com">`;
    // Добавляем только если еще не добавлены
    if (!html.includes('fonts.googleapis.com')) {
        html = html.replace('</head>', `  ${dnsPrefetchLinks}\n</head>`);
    }
    return html;
}
/**
 * Проверка, является ли страница статической (можно кэшировать долго)
 */
function isStaticPage(url) {
    // Статические страницы: главная, о нас, контакты, FAQ и т.д.
    const staticRoutes = ['/', '/about', '/contacts', '/faq', '/guarantees', '/how-we-work', '/why-us', '/documents'];
    const pathname = new URL(url, 'http://localhost').pathname;
    return staticRoutes.includes(pathname) || pathname.startsWith('/blog/');
}
/**
 * Проверка, является ли страница динамической (требует короткого TTL)
 */
function isDynamicPage(url) {
    const pathname = new URL(url, 'http://localhost').pathname;
    // Динамические страницы: калькулятор, отзывы (могут обновляться)
    const dynamicRoutes = ['/calculator', '/reviews'];
    return dynamicRoutes.includes(pathname);
}
// SSR routes - только для production, в dev используем Vite
if (isProduction) {
    app.get('*', async (req, res) => {
        try {
            const metadata = getMetadataForRoute(req.path);
            const html = await renderHTML(req.url, metadata);
            res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
        }
        catch (error) {
            // Детальное логирование ошибки с контекстом запроса
            const { createSSRError, classifySSRError, formatSSRErrorForLog } = await import('../src/lib/ssr-errors.js');
            const errorType = classifySSRError(error, req.url);
            const ssrError = createSSRError(error, req.url, errorType, {
                stage: 'routeHandler',
                method: req.method,
                path: req.path,
                ip: req.ip || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
            });
            logger.error('SSR Route Handler Error', formatSSRErrorForLog(ssrError), 'SSR');
            const metadata = getMetadataForRoute(req.path);
            const fallbackHtml = getFallbackHTML(metadata);
            res.status(200).set({ 'Content-Type': 'text/html' }).send(fallbackHtml);
        }
    });
}
else {
    // В development режиме просто отдаем статику, SSR будет через Vite
    app.get('*', async (req, res) => {
        const metadata = getMetadataForRoute(req.path);
        const metadataHTML = generateMetadata(metadata);
        // Используем относительный путь для Vite, который проксирует запросы
        const viteScriptUrl = `http://localhost:${VITE_PORT}/src/client/entry-client.tsx`;
        // Проверяем доступность Vite сервера
        const viteAvailable = await isHttpServerAvailable(VITE_PORT, 1000);
        let viteStatusMessage = '';
        if (!viteAvailable) {
            viteStatusMessage = `
        <div style="background: #fee; border: 1px solid #fcc; padding: 15px; margin: 20px; border-radius: 5px;">
          <h3 style="color: #c00; margin-top: 0;">⚠️ Vite dev server недоступен</h3>
          <p>Vite dev server не запущен на порту ${VITE_PORT}.</p>
          <p><strong>Решение:</strong> Запустите Vite dev server:</p>
          <pre style="background: #f5f5f5; padding: 10px; border-radius: 3px; overflow-x: auto;">npm run dev:client</pre>
          <p>Или проверьте, что порт ${VITE_PORT} свободен и доступен.</p>
        </div>
      `;
            logger.warn('Vite server not available', { port: VITE_PORT, path: req.path });
        }
        res.status(200).send(`
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${metadataHTML}
        <script>
          // Проверка доступности Vite сервера
          const vitePort = ${VITE_PORT};
          const checkViteServer = async () => {
            try {
              const response = await fetch('http://localhost:' + vitePort, { 
                method: 'HEAD',
                cache: 'no-cache'
              });
              return response.ok;
            } catch (e) {
              return false;
            }
          };
          
          // Fallback: если Vite не загрузился за 10 секунд, показываем сообщение
          setTimeout(async () => {
            const root = document.getElementById('root');
            if (root && !root.hasChildNodes()) {
              const viteAvailable = await checkViteServer();
              if (!viteAvailable) {
                root.innerHTML = '<div style="padding: 20px; text-align: center; max-width: 600px; margin: 0 auto;"><h1>Загрузка приложения...</h1><p style="color: #c00;">⚠️ Vite dev server недоступен на порту ' + vitePort + '</p><p>Убедитесь, что Vite dev server запущен:</p><pre style="background: #f5f5f5; padding: 10px; border-radius: 3px; text-align: left; display: inline-block;">npm run dev:client</pre><p>Проверьте консоль браузера для диагностики ошибок.</p></div>';
              } else {
                root.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Загрузка приложения...</h1><p>Если страница не загружается, проверьте консоль браузера для диагностики ошибок.</p></div>';
              }
            }
          }, 10000);
        </script>
      </head>
      <body>
        <div id="root">${viteStatusMessage}</div>
        <script type="module" src="${viteScriptUrl}"></script>
        <noscript>
          <div style="padding: 20px; text-align: center;">
            <h1>Требуется JavaScript</h1>
            <p>Для работы этого приложения необходимо включить JavaScript в вашем браузере.</p>
          </div>
        </noscript>
      </body>
      </html>
    `);
    });
}
// Функция для получения метаданных по роуту
function getMetadataForRoute(pathname) {
    const domain = process.env.DOMAIN || 'mos-avto-alyans.ru';
    const baseUrl = `https://${domain}`;
    // Проверка, является ли это блог-постом
    const blogPostMatch = pathname.match(/^\/blog\/(.+)$/);
    if (blogPostMatch && blogPostsCache) {
        const slug = blogPostMatch[1];
        const post = blogPostsCache[slug];
        if (post) {
            return {
                title: `${post.title} | Блог о выкупе авто`,
                description: post.excerpt || 'Полезная статья о выкупе автомобилей',
                url: `${baseUrl}/blog/${slug}`,
                keywords: `выкуп авто, ${post.category.toLowerCase()}, ${post.title.toLowerCase()}`,
                image: `${baseUrl}/og-image.png`,
            };
        }
    }
    // Базовая мета-информация
    const baseMetadata = {
        title: 'Выкуп авто в Москве и МО | Быстро и Выгодно | До 97%',
        description: 'Профессиональный выкуп автомобилей в Москве и МО. Оценка за 5 минут, до 97% рыночной стоимости, моментальная оплата.',
        url: `${baseUrl}${pathname}`,
        keywords: 'выкуп авто, выкуп автомобилей, Москва, МО, срочный выкуп, выкуп битых авто, выкуп после ДТП',
        image: `${baseUrl}/og-image.png`,
    };
    // Специфичные метаданные для разных страниц
    const routeMetadata = {
        '/': baseMetadata,
        '/calculator': {
            title: 'Калькулятор стоимости автомобиля | Выкуп авто в Москве',
            description: 'Рассчитайте стоимость вашего автомобиля онлайн. Быстрая оценка за 5 минут. Бесплатный калькулятор выкупа авто.',
            url: `${baseUrl}/calculator`,
            keywords: 'калькулятор стоимости авто, оценка автомобиля, расчет цены авто, выкуп авто онлайн',
            image: `${baseUrl}/og-image.png`,
        },
        '/reviews': {
            title: 'Отзывы клиентов о выкупе авто | Реальные отзывы',
            description: 'Реальные отзывы клиентов о выкупе автомобилей в Москве и МО. Более 5000 довольных клиентов.',
            url: `${baseUrl}/reviews`,
            keywords: 'отзывы выкуп авто, отзывы клиентов, выкуп автомобилей отзывы',
            image: `${baseUrl}/og-image.png`,
        },
        '/blog': {
            title: 'Блог о выкупе автомобилей | Полезные статьи',
            description: 'Полезные статьи о выкупе автомобилей, оценке стоимости и продаже авто. Советы экспертов.',
            url: `${baseUrl}/blog`,
            keywords: 'блог выкуп авто, статьи о выкупе автомобилей, советы по продаже авто',
            image: `${baseUrl}/og-image.png`,
        },
        '/contacts': {
            title: 'Контакты | Выкуп авто в Москве и МО',
            description: 'Свяжитесь с нами для выкупа вашего автомобиля. Телефон: +7 (985) 752-00-01. Работаем 24/7.',
            url: `${baseUrl}/contacts`,
            keywords: 'контакты выкуп авто, телефон выкуп авто, адрес выкуп авто',
            image: `${baseUrl}/og-image.png`,
        },
        '/services': {
            title: 'Услуги по выкупу автомобилей | Все виды выкупа',
            description: 'Выкуп автомобилей в любом состоянии: битых, после ДТП, кредитных, премиум. Срочный выкуп за 2 часа.',
            url: `${baseUrl}/services`,
            keywords: 'услуги выкуп авто, виды выкупа автомобилей, срочный выкуп',
            image: `${baseUrl}/og-image.png`,
        },
        '/services/urgent-buyback': {
            title: 'Срочный выкуп авто за 2 часа | Москва и МО',
            description: 'Срочный выкуп автомобилей за 2 часа в Москве и МО. Моментальная оценка и оплата. Работаем 24/7.',
            url: `${baseUrl}/services/urgent-buyback`,
            keywords: 'срочный выкуп авто, выкуп за 2 часа, срочная продажа авто',
            image: `${baseUrl}/og-image.png`,
        },
        '/services/damaged-cars': {
            title: 'Выкуп битых авто | Поврежденные автомобили',
            description: 'Выкуп битых и поврежденных автомобилей в Москве и МО. Справедливая оценка остаточной стоимости.',
            url: `${baseUrl}/services/damaged-cars`,
            keywords: 'выкуп битых авто, выкуп поврежденных авто, выкуп разбитых машин',
            image: `${baseUrl}/og-image.png`,
        },
        '/services/after-accident': {
            title: 'Выкуп авто после ДТП | Москва и МО',
            description: 'Выкуп автомобилей после ДТП в Москве и МО. Быстрая оценка и выкуп поврежденных в аварии авто.',
            url: `${baseUrl}/services/after-accident`,
            keywords: 'выкуп после ДТП, выкуп авто после аварии, продажа битого авто',
            image: `${baseUrl}/og-image.png`,
        },
        '/services/credit-cars': {
            title: 'Выкуп кредитных автомобилей | Решение с банком',
            description: 'Выкуп автомобилей в кредите или залоге. Помогаем решить вопрос с банком. Быстрое оформление.',
            url: `${baseUrl}/services/credit-cars`,
            keywords: 'выкуп кредитных авто, выкуп авто в кредите, выкуп залоговых авто',
            image: `${baseUrl}/og-image.png`,
        },
        '/services/premium-cars': {
            title: 'Выкуп премиум и элитных автомобилей',
            description: 'Выкуп премиум и элитных автомобилей в Москве и МО. Профессиональная оценка дорогих авто.',
            url: `${baseUrl}/services/premium-cars`,
            keywords: 'выкуп премиум авто, выкуп элитных авто, выкуп дорогих машин',
            image: `${baseUrl}/og-image.png`,
        },
        '/car-brands': {
            title: 'Выкуп автомобилей всех марок | Москва и МО',
            description: 'Выкуп автомобилей всех марок и моделей в Москве и МО. Toyota, BMW, Mercedes, Audi и другие.',
            url: `${baseUrl}/car-brands`,
            keywords: 'выкуп авто всех марок, выкуп Toyota, выкуп BMW, выкуп Mercedes',
            image: `${baseUrl}/og-image.png`,
        },
        '/faq': {
            title: 'Часто задаваемые вопросы | Выкуп авто',
            description: 'Ответы на популярные вопросы о выкупе автомобилей. Как происходит оценка, какие документы нужны.',
            url: `${baseUrl}/faq`,
            keywords: 'вопросы выкуп авто, FAQ выкуп автомобилей, часто задаваемые вопросы',
            image: `${baseUrl}/og-image.png`,
        },
        '/about': {
            title: 'О нас | Выкуп авто в Москве и МО',
            description: 'О компании по выкупу автомобилей в Москве и МО. Более 10 лет опыта, 5000+ клиентов.',
            url: `${baseUrl}/about`,
            keywords: 'о нас, выкуп авто, компания выкуп авто',
            image: `${baseUrl}/og-image.png`,
        },
        '/documents': {
            title: 'Документы для выкупа авто | Список документов',
            description: 'Какие документы нужны для выкупа автомобиля. Полный список документов для быстрой продажи.',
            url: `${baseUrl}/documents`,
            keywords: 'документы выкуп авто, документы для продажи авто, список документов',
            image: `${baseUrl}/og-image.png`,
        },
    };
    const metadata = routeMetadata[pathname] || baseMetadata;
    // Убеждаемся, что URL всегда полный
    if (!metadata.url) {
        metadata.url = `${baseUrl}${pathname}`;
    }
    return metadata;
}
// Error handling middleware (должен быть после всех routes, включая SSR)
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
// notFoundHandler для не-GET запросов (GET обрабатываются SSR handler выше)
app.use((req, res, next) => {
    if (req.method !== 'GET') {
        notFoundHandler(req, res, next);
    }
    else {
        next();
    }
});
app.use(errorHandler);
// Запуск сервера с автоматическим выбором порта
(async () => {
    try {
        // Проверяем доступность порта и ищем альтернативу при необходимости
        const actualPort = await getPort(PREFERRED_PORT, true);
        if (actualPort !== PREFERRED_PORT) {
            logger.warn('Port conflict detected', {
                preferred: PREFERRED_PORT,
                actual: actualPort,
                message: `Порт ${PREFERRED_PORT} занят, используется порт ${actualPort}`,
            });
        }
        const server = app.listen(actualPort, () => {
            logger.info('Server started', {
                port: actualPort,
                preferredPort: PREFERRED_PORT,
                environment: ENV.NODE_ENV,
                vitePort: VITE_PORT,
            });
            // Auto-reload enabled: changes in server/ will trigger rebuild and restart
        });
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                logger.error('Port already in use', {
                    port: actualPort,
                    error: error.message,
                });
                logger.info('Solutions', {
                    solution1: `Stop the process using port ${actualPort}`,
                    solution2: `Set PORT environment variable to use a different port`,
                    solution3: process.platform === 'win32'
                        ? `Run: Get-NetTCPConnection -LocalPort ${actualPort} | Stop-Process -Id (Get-NetTCPConnection -LocalPort ${actualPort}).OwningProcess -Force`
                        : `Run: lsof -ti:${actualPort} | xargs kill -9`,
                });
                process.exit(1);
            }
            else {
                throw error;
            }
        });
    }
    catch (error) {
        logger.error('Failed to start server', {
            error: error instanceof Error ? error.message : String(error),
        });
        process.exit(1);
    }
})();
export default app;
