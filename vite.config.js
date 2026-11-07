import { defineConfig } from 'vite';

// Vite solo se usa como servidor de desarrollo con recarga automática.
// Sirve public/ tal cual: no hay build, los pipelines publican public/ directamente.
export default defineConfig({
  root: 'public',
  publicDir: false,
  server: {
    port: 5173,
    strictPort: false,
  },
});
