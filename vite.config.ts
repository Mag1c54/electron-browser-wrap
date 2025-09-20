import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: {
          'main-preload': path.join(__dirname, 'electron/main-preload.ts'),
          'webview-preload': path.join(__dirname, 'electron/webview-preload.ts'),
        },
        vite: {
          build: {
            rollupOptions: {
              output: {
                inlineDynamicImports: false,
                entryFileNames: (chunkInfo) => {
                  return `${chunkInfo.name}.mjs`;
                },
              },
            },
          },
        },
      },
      renderer: process.env.NODE_ENV === 'damn-browser' ? undefined : {},
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/global.scss" as *;`
      },
    },
  },
  server: {
    port: 5173,
  },
})