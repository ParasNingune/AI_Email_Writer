import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the backend during development
      '/api': {
        target: 'https://ai-email-writer-1-v7tp.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
