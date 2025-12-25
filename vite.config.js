import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'

// HTML変換プラグイン（file://プロトコル対応）
function htmlTransformPlugin() {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html
        // script: type="module" crossorigin を defer に変更
        .replace(/<script type="module" crossorigin src="(.+?)"><\/script>/g, '<script defer src="$1"></script>')
        // link: crossorigin を削除
        .replace(/<link rel="stylesheet" crossorigin href="(.+?)">/g, '<link rel="stylesheet" href="$1">')
    }
  }
}

export default defineConfig({
  root: 'src',
  base: './',
  plugins: [htmlTransformPlugin()],
  build: {
    outDir: '../tmp',
    emptyOutDir: true,
    modulePreload: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          }
          if (/css/i.test(extType)) {
            return `css/[name][extname]`;
          }
          return `${extType}/[name][extname]`;
        },
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js',
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer
      ]
    }
  }
})
