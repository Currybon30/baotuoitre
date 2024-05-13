import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const { PORT = 8000 } = process.env;

export default defineConfig({
  plugins: [react({
      jsxRuntime: 'classic' // Add this line
    }
  )],
  server: {
    proxy: {
      '/api': {
        target: `https://thuytrang-tuoitre.onrender.com/:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/index.js",
    },
  },
});