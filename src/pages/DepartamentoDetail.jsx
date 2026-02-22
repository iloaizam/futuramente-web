import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDepartamento } from '../data/departamentos.js';
import { motion, AnimatePresence } from 'framer-motion';

function Lightbox({ open, onClose, items, index, setIndex }) {
  const item = items[index];
  if (!open || !item) return null;

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div className="lightbox" aria-hidden={!open} onClick={onClose}>
      <button className="lb-btn lb-close" type="button" aria-label="Cerrar" onClick={onClose}>
        ×
      </button>
      {items.length > 1 ? (
        <>
          <button className="lb-btn lb-prev" type="button" aria-label="Anterior" onClick={(e) => (e.stopPropagation(), prev())}>
            ‹
          </button>
          <button className="lb-btn lb-next" type="button" aria-label="Siguiente" onClick={(e) => (e.stopPropagation(), next())}>
            ›
          </button>
        </>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.img
          key={item.src}
          className="lb-image"
          src={item.src}
          alt={item.caption || 'Evidencia'}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </AnimatePresence>

      {item.caption ? <div className="lb-caption">{item.caption}</div> : null}
    </div>
  );
}

export default function DepartamentoDetail() {
  const { slug } = useParams();
  const dept = useMemo(() => getDepartamento(slug), [slug]);

  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  if (!dept) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="section-title">No encontrado</h1>
          <p className="section-sub">Ese departamento no existe en el listado.</p>
          <Link className="btn btn-blue" to="/departamentos">
            Volver
          </Link>
        </div>
      </section>
    );
  }

  const openAt = (idx) => {
    setLbIndex(idx);
    setLbOpen(true);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="page-head">
          <div>
            <h1 className="section-title" style={{ marginBottom: 6 }}>
              {dept.nombre}
            </h1>
            <p className="section-sub" style={{ marginBottom: 0 }}>
              Evidencias y registros del departamento.
            </p>
          </div>

          <Link className="btn btn-ghost" to="/departamentos">
            ← Volver
          </Link>
        </div>

        <div className="gallery-grid">
          {dept.evidencias.map((ev, idx) => (
            <button
              key={ev.src}
              className="gallery-item gallery-btn"
              type="button"
              onClick={() => openAt(idx)}
              aria-label={ev.caption || 'Ver imagen'}
            >
              <img src={ev.src} alt={ev.caption || 'Evidencia'} />
              <div className="gallery-caption">{ev.caption}</div>
            </button>
          ))}
        </div>

        <div className="hint card" style={{ marginTop: 18 }}>
          <p className="muted" style={{ margin: 0 }}>
            Si ves imágenes rotas, es porque aún no has copiado las fotos reales a <code>public/assets/evidencias/{dept.slug}</code>.
            Cuando las pongas ahí con los mismos nombres, se verán automáticamente.
          </p>
        </div>
      </div>

      <Lightbox
        open={lbOpen}
        onClose={() => setLbOpen(false)}
        items={dept.evidencias}
        index={lbIndex}
        setIndex={setLbIndex}
      />
    </section>
  );
}
