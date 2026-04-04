import { territories } from './territories.js';

export const departamentos = territories.map((territory) => ({
  slug: territory.slug,
  nombre: territory.name,
  cover: territory.cover,
  evidencias: territory.evidences,
}));

export function getDepartamento(slug) {
  return departamentos.find((departamento) => departamento.slug === slug);
}
