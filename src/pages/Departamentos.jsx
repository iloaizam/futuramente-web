import React from 'react';
import { Link } from 'react-router-dom';
import { departamentos } from '../data/departamentos.js';
import { motion } from 'framer-motion';

export default function Departamentos() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Departamentos</h1>
        <p className="section-sub">Explora las evidencias por territorio.</p>

        <div className="inst-grid">
          {departamentos.map((d, idx) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.25) }}
            >
              <Link className="inst-card" to={`/departamentos/${d.slug}`}>
                <div className="inst-cover" style={{ backgroundImage: `url('${d.cover}')` }} />
                <div className="inst-info">
                  <h3>{d.nombre}</h3>
                  <span className="inst-tag">Ver</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="hint card" style={{ marginTop: 22 }}>
          <p className="muted" style={{ margin: 0 }}>
            Nota: En tu sitio original, las imágenes de evidencias estaban referenciadas como <code>/assets/evidencias/...</code>.
            En este proyecto React conservé esas rutas para que puedas copiar tus fotos a <code>public/assets/evidencias</code>
            y todo quede funcionando igual.
          </p>
        </div>
      </div>
    </section>
  );
}
