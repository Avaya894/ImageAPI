import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  outDir: '/bin/staticsites/51cbfc71-21e4-4baf-b61a-0ef741c1d8c3-swa-oryx/app',
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
