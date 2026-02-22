// src/data/territories.js
export const territories = [
  {
    key: "amazonas",
    name: "Amazonas",
    color: "#85c536",
    visited: true,
    evidences: [
      { type: "image", src: "assets/territorio/amazonas/1.jpg", caption: "Actividad en territorio" }
    ]
  },
  {
    key: "arauca",
    name: "Arauca",
    color: "#3871c1",
    visited: true,
    evidences: []
  },
  {
    key: "atlantico",
    name: "Atlántico",
    color: "#4ed5db",
    visited: false,
    evidences: []
  },
  {
    key: "caldas",
    name: "Caldas",
    color: "#51b59f",
    visited: true,
    evidences: [
    { type: "image", src: "assets/img/caldas-evi-taller.JPG", caption: "Taller en territorio" },
    { type: "image", src: "assets/img/caldas-evi-profes.JPG", caption: "Entrega diplomas a profesores" },
    { type: "image", src: "assets/img/caldas-evi-estudiantes.jpg", caption: "Actividad con estudiantes" }

  ]
  },
  {
    key: "cundinamarca",
    name: "Cundinamarca",
    color: "#ec058e",
    visited: true,
    evidences: []
  },
  {
    key: "tolima",
    name: "Tolima",
    color: "#98198e",
    visited: false,
    evidences: []
  },
  {
    key: "valle-del-cauca",
    name: "Valle del Cauca",
    color: "#ffbd59",
    visited: true,
    evidences: []
  }
];

// Helpers
export function getTerritoryByName(name) {
  const n = (name || "").trim().toLowerCase();
  return territories.find(t => t.name.toLowerCase() === n);
}