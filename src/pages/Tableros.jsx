import React from 'react';

export default function Tableros() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Tableros</h1>
        <p className="section-sub">Visualiza el tablero interactivo del proyecto.</p>

        <div className="pbi-wrap">
          <iframe
            title="Tablero Futuramente"
            src="https://app.powerbi.com/view?r=eyJrIjoiM2YyMWExOTQtMjc2NC00ODNkLTgwMzctYjE2MzhlNDM0OTM5IiwidCI6IjU3N2ZjMWQ4LTA5MjItNDU4ZS04N2JmLWVjNGY0NTVlYjYwMCIsImMiOjR9"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
