# FuturaMente (Vite + React)

Migración de la web estática a un proyecto moderno con **Vite + React**, manteniendo el contenido original y mejorando el look & feel (más limpio, responsive, animaciones suaves al hacer scroll, slider moderno y menú lateral).

## Requisitos
- Node.js 18+

## Correr local
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy en GitHub Pages (recomendado)
Este proyecto usa **HashRouter**, así que funciona bien en GitHub Pages sin configuración extra de rutas.

1. En GitHub, activa Pages para tu repo (Settings → Pages) y selecciona:
   - Source: GitHub Actions **o**
   - Branch: `gh-pages` (si usas ese flujo)

2. La forma más simple es usar un workflow que publique `dist/`.

> Nota: en `vite.config.js` dejamos `base: './'` para que funcione en subcarpetas.

## Evidencias (fotos)
En el sitio original, las fotos se referencian como:

```
/public/assets/evidencias/<departamento>/...
```

En este React conservamos esa misma idea: si copias tus imágenes a esa ruta, se verán automáticamente.

Ejemplo:
- `public/assets/evidencias/caldas/ejemplo-01.jpg`

Luego puedes ampliar el listado por departamento en:
- `src/data/departamentos.js`
