import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import dts from 'vite-plugin-dts';
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs';

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
    }),
    {
      name: 'copy-assets',
      closeBundle: () => {
        const srcDir = resolve(__dirname, 'assets/images');
        const destDir = resolve(__dirname, 'dist/assets/images');
        
        // 确保目标目录存在
        if (!existsSync(destDir)) {
          mkdirSync(destDir, { recursive: true });
          console.log(`Created directory: ${destDir}`);
        }
        
        // 自动读取并复制目录中的所有SVG文件
        try {
          const files = readdirSync(srcDir);
          // 定义支持的图片文件扩展名
          const imageExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp'];
          
          // 过滤出所有支持的图片文件
          const imageFiles = files.filter(file => {
            const ext = file.substring(file.lastIndexOf('.')).toLowerCase();
            return imageExtensions.includes(ext);
          });
          
          if (imageFiles.length === 0) {
            console.log(`No image files found in ${srcDir}`);
            return;
          }
          
          console.log(`Found ${imageFiles.length} image file(s) to copy`);
          imageFiles.forEach(image => {
            const srcPath = join(srcDir, image);
            const destPath = join(destDir, image);
            if (existsSync(srcPath)) {
              copyFileSync(srcPath, destPath);
              console.log(`Copied ${image} to ${destDir}`);
            }
          });
        } catch (error) {
          console.error(`Error reading directory ${srcDir}:`, error);
        }
      }
    }
  ]
});