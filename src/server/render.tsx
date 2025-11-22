import { render } from './entry-server.js';
import { getSchemaForRoute } from '../lib/seo/schema.js';
import { logger } from '../lib/logger.js';
import { createSSRError, classifySSRError, formatSSRErrorForLog } from '../lib/ssr-errors.js';

export interface RenderResult {
  html: string;
  schemas: unknown[];
  error?: string;
  errorType?: string;
}

export async function renderApp(req: { url: string }): Promise<RenderResult> {
  const startTime = Date.now();
  
  try {
    const { html } = await render(req.url);
    
    // Получаем Schema разметку для текущего роута
    const urlObj = new URL(req.url, 'http://localhost');
    const schemas = getSchemaForRoute(urlObj.pathname);
    
    const renderTime = Date.now() - startTime;
    logger.debug('SSR render successful', {
      url: req.url,
      renderTime,
      htmlLength: html?.length || 0,
    }, 'SSR');
    
    return { html, schemas };
  } catch (error) {
    const renderTime = Date.now() - startTime;
    const errorType = classifySSRError(error, req.url);
    const ssrError = createSSRError(error, req.url, errorType, {
      renderTime,
    });
    
    // Детальное логирование ошибки
    logger.error('SSR Render Error', formatSSRErrorForLog(ssrError), 'SSR');
    
    // Возвращаем fallback HTML вместо выбрасывания ошибки
    // Это позволяет клиенту загрузиться и отрендерить страницу на клиенте
    return {
      html: '<div id="root"></div>',
      schemas: [],
      error: ssrError.message,
      errorType: ssrError.type,
    };
  }
}

