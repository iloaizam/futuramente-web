import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">404</h1>
        <p className="section-sub">No encontramos esa página.</p>
        <Link className="btn btn-blue" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
