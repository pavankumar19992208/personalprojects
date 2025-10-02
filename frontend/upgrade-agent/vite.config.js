import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: './',  // Ensures relative paths for assets
  plugins: [react()],
  assetsInclude: ['**/*.lottie'],
  server: {
    allowedHosts: ['5c28dc41bef5.ngrok-free.app'],
    host: '0.0.0.0', // Allows connections from other devices
    strictPort: true, // Prevent auto-port switching
  },
  build: {
    outDir: 'dist',       // Output folder
    assetsDir: 'assets',  // Keeps assets inside "dist/assets"
    rollupOptions: {
      input: 'index.html', // Ensures correct entry point
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  }
});
