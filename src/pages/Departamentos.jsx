import React from 'react';
import { Link } from 'react-router-dom';
import { departamentos } from '../data/departamentos.js';
import { motion } from 'framer-motion';
import { asset } from '../utils/assets.js';

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
                <div
                  className="inst-cover"
                  style={{ backgroundImage: `url(${asset(d.cover)})` }}
                />
                <div className="inst-info">
                  <h3>{d.nombre}</h3>
                  <span className="inst-tag">Ver</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}