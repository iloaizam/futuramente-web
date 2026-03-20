import React from 'react';

export default function Diplomados() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Nuestros Diplomados</h1>
        <p className="section-sub">
          Programas de formación avanzada para profesionales comprometidos con 
          su desarrollo académico y profesional.
        </p>

        <div className="diplomados-grid">
          <div className="card">
            <h2 className="section-title" style={{ marginTop: 0, textAlign: 'center'}}>Diplomado en Tecnología Educativa</h2>
            <p style={{ marginTop: '1rem' , textAlign: 'justify' }}>
              Este diplomado está diseñado para docentes y profesionales de la 
              educación que buscan integrar herramientas tecnológicas innovadoras 
              en sus prácticas pedagógicas. A través de un enfoque práctico y 
              contextualizado, los participantes desarrollarán competencias digitales 
              para transformar sus entornos de aprendizaje.
            </p>
            <a
              href="https://fcen.unal.edu.co/menu/educacion-continua/diplomado-tecnologias-educativa/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginTop: '1.5rem' }}
            >
              Ver más información
            </a>
          </div>

          <div className="card">
            <h2 className="section-title" style={{ marginTop: 0, textAlign: 'center'}}>Diplomado “Maestro de Maestros”</h2>
            <p style={{ marginTop: '1rem', textAlign: 'justify' }}>
              Un espacio de formación en el que docentes de todo el país se encuentran con nuevas metodologías y herramientas
              para enriquecer su práctica educativa.
            </p>
            <ul className="stage-list">
              <li>Más de 3 módulos desarrollados.</li>
              <li>Oportunidades para compartir experiencias y aprender en comunidad.</li>
            </ul>
          </div>
        </div>

      </div>
      <style>{`
        .diplomados-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 40px;
        }
        @media (max-width: 768px) {
          .diplomados-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}