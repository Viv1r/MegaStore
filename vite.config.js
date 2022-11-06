import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  server: {
    proxy: {
      "^/api": {
        target: "http://127.0.0.1:8000/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/g, '')
      }
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});