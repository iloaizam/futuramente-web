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

const bundledVideoFiles = {
  amazonas: [
    'WhatsApp Video 2025-11-25 at 2.03.23 PM.mp4',
    'WhatsApp Video 2025-11-25 at 2.03.32 PM.mp4',
    'WhatsApp Video 2025-11-25 at 2.04.46 PM.mp4',
    'WhatsApp Video 2025-11-25 at 2.05.02 PM.mp4',
    'WhatsApp Video 2025-11-25 at 2.05.19 PM.mp4',
  ],
  arauca: [
    'VID_20251114_080359.mp4',
    'VID_20251114_080801.mp4',
    'VID_20251114_082920.mp4',
    'VID_20251114_083052.mp4',
    'VID_20251114_100923.mp4',
  ],
  atlantico: [
    'Video (1).mp4',
    'Video (4).mp4',
    'Video (8).mp4',
    'Video (10).mp4',
    'Video (11).mp4',
    'Video (12).mp4',
  ],
  caldas: [
    'IMG_7182.MOV',
    'IMG_7187.MOV',
  ],
  cundinamarca: [
    'DJI_20251017105326_0542_D.MP4',
    'DJI_20251017105342_0543_D.MP4',
    'DJI_20251017115347_0552_D.MP4',
    'DJI_20251017115655_0557_D.MP4',
  ],
  tolima: [
    'DJI_20250822111250_0030_D.MP4',
  ],
  'valle-del-cauca': [
    'Video (13).mp4',
    'Video (14).mp4',
    'Video (23).mp4',
    'Video (24).mp4',
    'Video (28).mp4',
  ],
};

function normalizeBaseUrl(baseUrl) {
  if (!baseUrl) return '';
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}

function getBundledVideoUrl(slug, file) {
  const files = bundledVideoFiles[slug] || [];
  if (!files.includes(file)) return null;
  return `/assets/evidencias/${slug}/videos/${file}`;
}

function canUseLocalVideoFallback() {
  if (typeof window === 'undefined') return false;

  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1';
}

function getLocalVideoUrl(slug, file) {
  if (!canUseLocalVideoFallback()) return null;
  return `/local-evidencias/${slug}/videos/${encodeURIComponent(file)}`;
}

export function resolveVideoUrl(slug, file) {
  const departmentStorage = externalVideoStorage[slug];
  const bundledUrl = getBundledVideoUrl(slug, file);
  if (!departmentStorage) return bundledUrl || getLocalVideoUrl(slug, file);

  const directUrl = departmentStorage.files?.[file];
  if (directUrl) return directUrl;

  const baseUrl = normalizeBaseUrl(departmentStorage.baseUrl);
  if (!baseUrl) return bundledUrl || getLocalVideoUrl(slug, file);

  return `${baseUrl}${encodeURIComponent(file)}`;
}
