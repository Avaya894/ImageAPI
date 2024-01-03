import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  outDir: 'dist',
  build: {
    rollupOptions: {
      external: [
        // other external modules...
        'react-bootstrap',
        'axios',
      ],
    },
  },

})
