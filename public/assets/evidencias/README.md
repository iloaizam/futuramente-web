# Evidencias por departamento

Guarda aqui las fotos que alimentan la vista de detalle de cada departamento.
Los videos ya no deben versionarse dentro del repositorio: ahora salen desde storage externo.
Si quieres conservar una copia local para desarrollo, guardala en `local-evidencias/<departamento>/videos/`.

Estructura recomendada:

```text
public/assets/evidencias/
  amazonas/
    imagenes/
    videos/
  arauca/
    imagenes/
    videos/
  atlantico/
    imagenes/
    videos/
  caldas/
    imagenes/
    videos/
  cundinamarca/
    imagenes/
    videos/
  tolima/
    imagenes/
    videos/
  valle-del-cauca/
    imagenes/
    videos/
```

Convencion sugerida:

- Fotos: `foto-01.jpg`, `foto-02.jpg`
- Videos locales: solo como copia de trabajo en `local-evidencias/`, no para subir a git

Cuando agregues una foto nueva, registrala en `src/data/territories.js`.
Cuando agregues un video nuevo, subelo al storage externo y registra su URL en `src/data/externalVideoStorage.js`.

Ejemplos de rutas:

- Amazonas: `/assets/evidencias/amazonas/imagenes/`
- Arauca: `/assets/evidencias/arauca/imagenes/`
- Atlantico: `/assets/evidencias/atlantico/imagenes/`
- Caldas: `/assets/evidencias/caldas/imagenes/`
- Cundinamarca: `/assets/evidencias/cundinamarca/imagenes/`
- Tolima: `/assets/evidencias/tolima/imagenes/`
- Valle del Cauca: `/assets/evidencias/valle-del-cauca/imagenes/`

Videos por departamento:

- Amazonas: configura `baseUrl` o `files` en `src/data/externalVideoStorage.js`
- Arauca: configura `baseUrl` o `files` en `src/data/externalVideoStorage.js`
- Atlantico: configura `baseUrl` o `files` en `src/data/externalVideoStorage.js`
- Caldas: configura `baseUrl` o `files` en `src/data/externalVideoStorage.js`
- Cundinamarca: configura `baseUrl` o `files` en `src/data/externalVideoStorage.js`
- Tolima: configura `baseUrl` o `files` en `src/data/externalVideoStorage.js`
- Valle del Cauca: configura `baseUrl` o `files` en `src/data/externalVideoStorage.js`

Ejemplo rapido:

```js
export const externalVideoStorage = {
  tolima: {
    baseUrl: 'https://tu-storage.com/futuramente/tolima',
    files: {},
  },
};
```

Si un video cambia de nombre en el storage, usa `files`:

```js
tolima: {
  baseUrl: '',
  files: {
    'DJI_20250822095655_0008_D.MP4': 'https://tu-storage.com/futuramente/tolima/video-01.mp4',
  },
}
```
