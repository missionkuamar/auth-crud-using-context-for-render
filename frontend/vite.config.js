import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  // Build output for Render (correct, keep this ✅)
  build: {
    outDir: path.resolve(__dirname, '../backend/frontend/dist'),
    emptyOutDir: true,
  },

  // Dev-only settings
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
