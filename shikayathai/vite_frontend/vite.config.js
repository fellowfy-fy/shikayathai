import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginRadar } from 'vite-plugin-radar'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginRadar({
    enableDev: true,
    // Google Analytics tag injection
    analytics: [
      {
        id: 'G-LPXH1KHVNR',
      }],
    gtm: [
      {
        id: 'GTM-M78GFCC9',
      }]
  })],
})
