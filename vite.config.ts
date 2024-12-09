import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills as polyfill } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), polyfill()],
  base: '/twa-sample/',
})
