// import { fileURLToPath, URL } from 'node:url'
import path from "path";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
// import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/  "C:\Windows\System32\drivers\etc"
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // imports 是加入按裝套件的地方 API自動引入
      imports: ["vue", "vue-router"],
      dts: "src/auto-imports.js",
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 從 `./src/components/` 路徑查找
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: "src/auto-components.js",
      resolvers: [ElementPlusResolver()],
    }),
    Pages(),
    Layouts(),
    legacy({
      targets: ['defaults', 'ie >= 11', 'chrome >= 60'],
      // targets: ['defaults', 'not IE 11'],
      // targets: ['defaults', 'ie >= 11', 'chrome 52'],
      // additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      // renderLegacyChunks:true,
      // polyfills:[
      //   'es.symbol',
      //   'es.array.filter',
      //   'es.promise',
      //   'es.promise.finally',
      //   'es/map',
      //   'es/set',
      //   'es.array.for-each',
      //   'es.object.define-properties',
      //   'es.object.define-property',
      //   'es.object.get-own-property-descriptor',
      //   'es.object.get-own-property-descriptors',
      //   'es.object.keys',
      //   'es.object.to-string',
      //   'web.dom-collections.for-each',
      //   'esnext.global-this',
      //   'esnext.string.match-all'
      // ]
    }),
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      // '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/assets/scss/variablesExtendMixin.scss";` 
        additionalData: `@use '@/assets/scss/index.scss' as *;` 
      }
    }
  },
  server: {
    proxy: {
      '/api': { // /api 選項寫法/
        target: 'http://api.tgbetdev.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
    host: '0.0.0.0'
  },
})