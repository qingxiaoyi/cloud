import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// elementPlus config
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 别名
import { fileURLToPath, URL } from 'node:url'
//setup兼容
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  server:{
    host:'127.0.0.1',
    port:5173,
    proxy:{
      '/cloud':{
        target:"http://127.0.0.1:3456",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cloud/, '')
      }
    }
  },
  plugins: [vue(),VueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
