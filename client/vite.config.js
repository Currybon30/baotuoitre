import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();

const { PORT = 3000 } = process.env;

export default defineConfig({
  plugins: [react({
      jsxRuntime: 'classic'
    })
  ],
  base: '/baotuoitre/', // Base path for the build
  server: {
    port: Number(PORT), // Port where the Vite app runs
    proxy: {
      '/api': {
        target: 'https://thuytrang-tuoitre-server.onrender.com',
        changeOrigin: true,
      },
      '/auth': {
        target: 'https://thuytrang-tuoitre-server.onrender.com',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../dist', 
  },
});