import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/", // ✅ Needed for Vercel — ensures correct asset paths
  plugins: [react()],
  server: {
    port: 5173, // Only affects local dev, so you can keep this
  },
  build: {
    outDir: "dist", // ✅ Vercel uses this as default, no need to change unless customized
  }
})
