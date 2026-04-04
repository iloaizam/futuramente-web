// Pega aqui las URLs externas de los videos despues de subirlos al storage.
// Si conservas los nombres originales, solo llena `baseUrl` por departamento.
// Si cambias nombres o rutas, usa `files` para asignar una URL exacta.
// En desarrollo local, si no hay URL externa, la app intentara leer desde
// `/local-evidencias/<departamento>/videos/<archivo>`.

export const externalVideoStorage = {
  amazonas: {
    baseUrl: '',
    files: {},
  },
  arauca: {
    baseUrl: '',
    files: {},
  },
  atlantico: {
    baseUrl: '',
    files: {},
  },
  caldas: {
    baseUrl: '',
    files: {},
  },
  cundinamarca: {
    baseUrl: '',
    files: {},
  },
  tolima: {
    baseUrl: '',
    files: {},
  },
  'valle-del-cauca': {
    baseUrl: '',
    files: {},
  },
};

function normalizeBaseUrl(baseUrl) {
  if (!baseUrl) return '';
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}

function getLocalVideoUrl(slug, file) {
  if (!import.meta.env.DEV) return null;
  return `/local-evidencias/${slug}/videos/${encodeURIComponent(file)}`;
}

export function resolveVideoUrl(slug, file) {
  const departmentStorage = externalVideoStorage[slug];
  if (!departmentStorage) return getLocalVideoUrl(slug, file);

  const directUrl = departmentStorage.files?.[file];
  if (directUrl) return directUrl;

  const baseUrl = normalizeBaseUrl(departmentStorage.baseUrl);
  if (!baseUrl) return getLocalVideoUrl(slug, file);

  return `${baseUrl}${encodeURIComponent(file)}`;
}
