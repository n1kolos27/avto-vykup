import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom';
import { routes } from '../routes/routes.js';
export async function render(url) {
    const handler = createStaticHandler(routes);
    // Преобразуем относительный URL в полный для Request
    const fullUrl = url.startsWith('http') ? url : `http://localhost:3000${url}`;
    const request = new Request(fullUrl);
    const context = await handler.query(request);
    if (context instanceof Response) {
        throw context;
    }
    const router = createStaticRouter(handler.dataRoutes, context);
    const html = renderToString(_jsx(React.StrictMode, { children: _jsx(StaticRouterProvider, { router: router, context: context }) }));
    return { html };
}
