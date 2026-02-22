export const departamentos = [
  {
    slug: 'amazonas',
    nombre: 'Amazonas',
    cover: '/assets/img/cover-amazonas.jpg',
    // Puedes reemplazar esto por tus imágenes reales cuando las tengas.
    evidencias: [
      { src: '/assets/evidencias/amazonas/ejemplo-01.jpg', caption: 'Actividad con docentes – Amazonas' }
    ]
  },
  {
    slug: 'arauca',
    nombre: 'Arauca',
    cover: '/assets/img/cover-arauca.jpg',
    evidencias: [
      { src: '/assets/evidencias/arauca/ejemplo-01.jpg', caption: 'Actividad con docentes – Arauca' }
    ]
  },
  {
    slug: 'atlantico',
    nombre: 'Atlántico',
    cover: '/assets/img/cover-atlantico.avif',
    evidencias: [
      { src: '/assets/evidencias/atlantico/ejemplo-01.jpg', caption: 'Actividad con docentes – Atlántico' }
    ]
  },
  {
    slug: 'caldas',
    nombre: 'Caldas',
    cover: '/assets/img/cover-caldas.avif',
    evidencias: [
      { src: '/assets/evidencias/caldas/ejemplo-01.jpg', caption: 'Actividad con docentes – Caldas' }
    ]
  },
  {
    slug: 'cundinamarca',
    nombre: 'Cundinamarca',
    cover: '/assets/img/cover-cundinamarca.jpg',
    evidencias: [
      { src: '/assets/evidencias/cundinamarca/ejemplo-01.jpg', caption: 'Actividad con docentes – Cundinamarca' }
    ]
  },
  {
    slug: 'tolima',
    nombre: 'Tolima',
    cover: '/assets/img/cover-tolima.jpg',
    evidencias: [
      { src: '/assets/evidencias/tolima/ejemplo-01.jpg', caption: 'Actividad con docentes – Tolima' }
    ]
  },
  {
    slug: 'valle-del-cauca',
    nombre: 'Valle del Cauca',
    cover: '/assets/img/cover-valle.webp',
    evidencias: [
      { src: '/assets/evidencias/valle-del-cauca/ejemplo-01.jpg', caption: 'Actividad con docentes – Valle del Cauca' }
    ]
  }
];

export function getDepartamento(slug) {
  return departamentos.find(d => d.slug === slug);
}
