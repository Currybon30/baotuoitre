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
  base: '/', // Base path for the build
  server: {
    port: Number(PORT), // Port where the Vite app runs
  },
  build: {
    outDir: '../dist', 
  },
});