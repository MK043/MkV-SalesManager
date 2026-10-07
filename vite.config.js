import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/orders': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/dashboard': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/bookings': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/customers': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/warehouse': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/cash': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/admin': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/reports': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/company-tasks': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/shifts': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/work-items': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/audit': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/company': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/clients': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/users': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});
