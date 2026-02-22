import React from 'react';

export default function Footer({ year }) {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <span>© {year} FuturaMente</span>
        <span className="muted">Hecho con Vite + React</span>
      </div>
    </footer>
  );
}
