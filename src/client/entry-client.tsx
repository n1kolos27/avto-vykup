import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../routes/routes';
import { loadAnalytics } from '../lib/analytics/loader.js';
import '../styles/globals.css';

const container = document.getElementById('root');

if (!container) {
  console.error('Root container not found!');
  throw new Error('Root container #root not found in DOM');
}

try {
  const router = createBrowserRouter(routes);
  
  // В development режиме или если контент не отрендерен на сервере, используем createRoot
  // В production с SSR используем hydrateRoot
  const hasServerRenderedContent = container.hasChildNodes() && container.children.length > 0;
  
  if (hasServerRenderedContent) {
    // SSR режим - гидратация
    console.log('[Client] Hydrating React app (SSR mode)');
    hydrateRoot(
      container,
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
  } else {
    // Development режим или клиентский рендеринг - создаем новый root
    console.log('[Client] Rendering React app (Client-side mode)');
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
  }
  
  // Загружаем аналитику после рендеринга
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAnalytics);
  } else {
    // Небольшая задержка для завершения рендеринга
    setTimeout(loadAnalytics, 100);
  }
  
  console.log('[Client] React app initialized successfully');
} catch (error) {
  console.error('[Client] Failed to initialize React app:', error);
  // Показываем сообщение об ошибке пользователю
  container.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: sans-serif;">
      <h1>Ошибка загрузки приложения</h1>
      <p>Не удалось загрузить приложение. Пожалуйста, обновите страницу.</p>
      <p style="color: #666; font-size: 12px;">${error instanceof Error ? error.message : String(error)}</p>
    </div>
  `;
  throw error;
}

