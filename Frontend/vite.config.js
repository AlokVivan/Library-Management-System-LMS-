import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/", // ✅ Add this line to fix asset loading issues
  plugins: [react()],
  server: {
    port: 5173,
  },
})
