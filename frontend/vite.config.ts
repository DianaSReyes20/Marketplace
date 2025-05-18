/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  server: {
    proxy: {
      '/api': {
        target:
          mode === 'development'
            ? 'http://localhost:3000'
            : import.meta.env.VITE_API_URL,
        changeOrigin: true,
        secure: mode !== 'development',
      },
    },
  },
}));
