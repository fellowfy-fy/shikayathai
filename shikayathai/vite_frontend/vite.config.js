import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://127.0.0.1:8000', // Replace with your Django backend URL
        changeOrigin: true,
        secure: false, // Set to true if you're using HTTPS
      },
    },
  },
})
