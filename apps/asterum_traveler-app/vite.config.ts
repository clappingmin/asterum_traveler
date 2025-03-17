import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import ssr from 'vite-plugin-ssr/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ssr({
      prerender: true,
    }),
  ],
  ssr: {
    noExternal: ['styled-components'],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
