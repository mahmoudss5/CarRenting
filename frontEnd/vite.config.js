import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In Docker: VITE_API_TARGET=http://backend:8080
// Local dev:  leave unset → defaults to http://localhost:5000
const API_TARGET = process.env.VITE_API_TARGET ?? 'http://localhost:5000';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': { target: API_TARGET, changeOrigin: true },
      '/hubs': { target: API_TARGET, changeOrigin: true, ws: true },
      '/uploads': { target: API_TARGET, changeOrigin: true },
    },
  },
});
