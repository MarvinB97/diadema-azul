import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.hdr'], // Incluye archivos .exr como activos
  build: {
    chunkSizeWarningLimit: 1000, // Aumenta el límite (en kB)
  },
})
