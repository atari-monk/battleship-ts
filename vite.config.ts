import {defineConfig} from 'vite'
import path from 'path'

export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  build: {
    target: 'esnext',
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'client/index.html'),
    },
  },
})
