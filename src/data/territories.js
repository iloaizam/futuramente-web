// src/data/territories.js
export const territories = [
  {
    key: "amazonas",
    name: "Amazonas",
    color: "#85c536",
    visited: true,
    evidences: [
      { type: "image", src: "assets/img/Foto1-Amazonas.jpeg", caption: "Evidencia 1" },
      { type: "image", src: "assets/img/Foto2-Amazonas.jpeg", caption: "Evidencia 2" },
      { type: "image", src: "assets/img/Foto3-Amazonas.jpeg", caption: "Evidencia 3" }
    ]
  },
  {
    key: "arauca",
    name: "Arauca",
    color: "#3871c1",
    visited: true,
    evidences: [
      { type: "image", src: "assets/img/Foto1-Arauca.JPG", caption: "Evidencia 1" },
      { type: "image", src: "assets/img/Foto2-Arauca.JPG", caption: "Evidencia 2" },
      { type: "image", src: "assets/img/Foto3-Arauca.JPG", caption: "Evidencia 3" }
    ] 
  },
  {
    key: "atlantico",
    name: "Atlántico",
    color: "#4ed5db",
    visited: true,
    evidences: [
      { type: "image", src: "assets/img/Fotos1-barranquilla.jpeg", caption: "Evidencia 1" },
      { type: "image", src: "assets/img/Fotos2-barranquilla.jpeg", caption: "Evidencia 2" },
      { type: "image", src: "assets/img/Fotos3-barranquilla.jpeg", caption: "Evidencia 3" }
    ]
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
    evidences: [
      { type: "image", src: "assets/img/Foto1-Cundinamarca.jpg", caption: "Evidencia 1" },
      { type: "image", src: "assets/img/Foto2-Cundinamarca.jpg", caption: "Evidencia 2" },
      { type: "image", src: "assets/img/Foto3-Cundinamarca.jpg", caption: "Evidencia 3" }
    ]
  },
  {
    key: "tolima",
    name: "Tolima",
    color: "#98198e",
    visited: true,
    evidences: [      
      { type: "image", src: "assets/img/IMG_4919-tolima.JPG", caption: "Evidencia 1 Tolima" },
      { type: "image", src: "assets/img/IMG_4830-tolima.jpg", caption: "Evidencia 2-tolima" },
      { type: "image", src: "assets/img/IMG_4893-tolima.jpg", caption: "Evidencia 3-tolima" },
      { type: "image", src: "assets/img/IMG_4876-tolima.JPG", caption: "Evidencia 4-tolima" }
    ]
  },
  {
    key: "valle-del-cauca",
    name: "Valle del Cauca",
    color: "#ffbd59",
    visited: true,
    evidences: [
      { type: "image", src: "assets/img/Foto1-ValleCauca.jpeg", caption: "Evidencia 1 Tolima" },
      { type: "image", src: "assets/img/Foto2-ValleCauca.jpeg", caption: "Evidencia 2-tolima" },
      { type: "image", src: "assets/img/Foto3-ValleCauca.jpeg", caption: "Evidencia 2-tolima" }
    ]
  }
];

// Helpers
export function getTerritoryByName(name) {
  const n = (name || "").trim().toLowerCase();
  return territories.find(t => t.name.toLowerCase() === n);
}