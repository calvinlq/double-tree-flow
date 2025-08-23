import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger']
  },
  build: {
    lib: {
      entry: `${__dirname}/index.ts`,
      name: 'DoubleTreeFlow',
      formats: ['umd', 'es'],
      fileName: (format) => `double-tree-flow.${format}.js`,
    },
    rollupOptions: {
      output: {
        // 对于UMD格式，将CSS内联到JS中
        assetFileNames: (assetInfo) => {
            if (assetInfo.names?.includes('style.css')) {
              return 'double-tree-flow.css';
            }
            return assetInfo.names?.[0] || 'unknown-asset';
          },
      },
      plugins: [],
    },
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        // 可以在这里添加全局SCSS变量
        // additionalData: '@import "@/styles/variables.scss";'
      }
    },
  },
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
    },
  },
});