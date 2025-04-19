import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ No proxy needed in production
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional, for local dev
  },
})
