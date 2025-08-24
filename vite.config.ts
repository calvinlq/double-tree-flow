import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dts from 'vite-plugin-dts';

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
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      output: {
        // 对于UMD格式，将CSS内联到JS中
        assetFileNames: (assetInfo) => {
            return 'index.css';
          },
      },
      plugins: [],
    },
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
  },
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      copyDtsFiles: true
    })
  ]
});