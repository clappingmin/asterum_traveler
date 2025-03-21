import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import ssr from 'vite-plugin-ssr/plugin';
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ssr({
      prerender: true,
    }),
    removeConsole({
      externalValue: [
        `
  █████╗ ███████╗████████╗███████╗██████╗ ██╗   ██╗███╗   ███╗     
 ██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗██║   ██║████╗ ████║     
 ███████║███████╗   ██║   █████╗  ██████╔╝██║   ██║██╔████╔██║     
 ██╔══██║╚════██║   ██║   ██╔══╝  ██╔══██╗██║   ██║██║╚██╔╝██║     
 ██║  ██║███████║   ██║   ███████╗██║  ██║╚██████╔╝██║ ╚═╝ ██║     
 ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝     
                                                                   
 ████████╗██████╗  █████╗ ██╗   ██╗███████╗██╗     ███████╗██████╗ 
 ╚══██╔══╝██╔══██╗██╔══██╗██║   ██║██╔════╝██║     ██╔════╝██╔══██╗
    ██║   ██████╔╝███████║██║   ██║█████╗  ██║     █████╗  ██████╔╝
    ██║   ██╔══██╗██╔══██║╚██╗ ██╔╝██╔══╝  ██║     ██╔══╝  ██╔══██╗
    ██║   ██║  ██║██║  ██║ ╚████╔╝ ███████╗███████╗███████╗██║  ██║
    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝                                                                                                                                                                                                                                                                                   
 `,
      ],
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
