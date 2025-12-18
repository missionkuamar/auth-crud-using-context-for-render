import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../backend/frontend/dist'),
    emptyOutDir: true,
  },
  server: {
    // port: 5173, // Vite default port (NOT 5000)
    proxy: {
      '/api': {
        target: 'https://auth-crud-using-context-for-render.onrender.com/', // Backend port
        changeOrigin: true,
      },
    },
  },
})