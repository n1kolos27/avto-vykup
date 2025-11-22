import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];
  
  // Bundle analyzer (только в режиме analyze)
  if (mode === 'analyze') {
    plugins.push(
      visualizer({
        open: true,
        filename: 'dist/bundle-stats.html',
        gzipSize: true,
        brotliSize: true,
      }) as any
    );
  }
  
  return {
    plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist/client',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: (id) => {
          // React core libraries (критический код)
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          
          // React Router (критический код)
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }
          
          // Forms libraries (react-hook-form, zod) - загружаются по требованию
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/zod')) {
            return 'forms-vendor';
          }
          
          // UI библиотеки (если будут добавлены)
          if (id.includes('node_modules/@radix-ui') || id.includes('node_modules/@headlessui')) {
            return 'ui-vendor';
          }
          
          // Все остальные node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          
          // Разделяем код приложения по маршрутам для лучшего code splitting
          if (id.includes('/routes/')) {
            const routeMatch = id.match(/\/routes\/([^/]+)/);
            if (routeMatch) {
              const routeName = routeMatch[1];
              // Крупные страницы в отдельные чанки
              if (['Calculator', 'Blog', 'Reviews'].includes(routeName)) {
                return `route-${routeName.toLowerCase()}`;
              }
            }
          }
        },
        // Оптимизация для лучшего кэширования
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    manifest: true,
    // Оптимизация размера бандла
    minify: 'esbuild',
    target: 'es2015',
    cssCodeSplit: true,
    sourcemap: false,
    // Увеличиваем лимит предупреждений для больших чанков
    chunkSizeWarningLimit: 1000,
    // Оптимизация для production
    reportCompressedSize: true,
    emptyOutDir: true,
  },
  ssr: {
    // Пакеты, которые должны быть включены в SSR bundle
    noExternal: ['react', 'react-dom', 'react-router-dom'],
    // Оптимизация SSR
    resolve: {
      conditions: ['node'],
    },
  },
  server: {
    port: Number(process.env.VITE_PORT) || 3001,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT || 3000}`,
        changeOrigin: true,
      },
    },
  },
  // Оптимизация для production
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  };
});

