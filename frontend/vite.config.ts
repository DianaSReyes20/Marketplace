import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración segura que no falla si falta la variable
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'http://localhost:3000/api')
  }
})