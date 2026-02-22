import { defineConfig } from 'vite';

export default defineConfig({
  // Para GitHub Pages es común necesitar base: '/NOMBRE_REPO/'
  // Si usas HashRouter, normalmente puede quedar '/' y no falla.
  base: './'
});
