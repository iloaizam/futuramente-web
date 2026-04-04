import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getDepartamento } from '../data/departamentos.js';
import { asset } from '../utils/assets.js';

function MediaFigure({ item, className, autoPlay = false }) {
  if (item.type === 'video') {
    return (
      <video
        className={className}
        src={asset(item.src)}
        poster={item.poster ? asset(item.poster) : undefined}
        controls={false}
        autoPlay={autoPlay}
        muted
        loop={autoPlay}
        playsInline
        preload={autoPlay ? 'auto' : 'metadata'}
      />
    );
  }

  return (
    <img
      className={className}
      src={asset(item.src)}
      alt={item.caption || 'Evidencia'}
      loading="lazy"
    />
  );
}

function Lightbox({ open, onClose, items, index, setIndex }) {
  const item = items[index];
  const prev = () => setIndex((current) => (current - 1 + items.length) % items.length);
  const next = () => setIndex((current) => (current + 1) % items.length);
  const stop = (event) => event.stopPropagation();

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prev();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, setIndex, items.length]);

  if (!open || !item) return null;

  return (
    <div className="lightbox" aria-hidden={!open} aria-modal="true" role="dialog" onClick={onClose}>
      <button className="lb-btn lb-close" type="button" aria-label="Cerrar" onClick={onClose}>
        ×
      </button>

      {items.length > 1 ? (
        <>
          <button
            className="lb-btn lb-prev"
            type="button"
            aria-label="Anterior"
            onClick={(event) => {
              event.stopPropagation();
              prev();
            }}
          >
            ‹
          </button>
          <button
            className="lb-btn lb-next"
            type="button"
            aria-label="Siguiente"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
          >
            ›
          </button>
        </>
      ) : null}

      <AnimatePresence mode="wait">
        {item.type === 'video' ? (
          <motion.video
            key={item.src}
            className="lb-video"
            src={asset(item.src)}
            poster={item.poster ? asset(item.poster) : undefined}
            controls
            autoPlay
            muted
            playsInline
            onClick={stop}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        ) : (
          <motion.img
            key={item.src}
            className="lb-image"
            src={asset(item.src)}
            alt={item.caption || 'Evidencia'}
            onClick={stop}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
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
          <Link className="btn btn-blue" to="/" state={{ scrollTo: 'mapa-territorios' }}>
            Volver al mapa
          </Link>
        </div>
      </section>
    );
  }

  const openAt = (index) => {
    setLbIndex(index);
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
              Evidencias y registros del departamento en formato galeria.
            </p>
          </div>

          <Link className="btn btn-ghost" to="/" state={{ scrollTo: 'mapa-territorios' }}>
            ← Volver al mapa
          </Link>
        </div>

        <div className="gallery-grid gallery-masonry">
          {dept.evidencias.map((ev, index) => (
            <button
              key={`${ev.src}-${index}`}
              className="gallery-item gallery-card gallery-btn"
              type="button"
              onClick={() => openAt(index)}
              aria-label={ev.type === 'video' ? 'Ver video' : 'Ver foto'}
            >
              <div className="gallery-media">
                <MediaFigure item={ev} className="gallery-media-asset" autoPlay={ev.type === 'video'} />
                <span className="gallery-pill">{ev.type === 'video' ? 'Video' : 'Foto'}</span>
              </div>
              {ev.caption ? <div className="gallery-caption">{ev.caption}</div> : null}
            </button>
          ))}
        </div>

        <div className="detail-nav-panel">
          <Link className="btn btn-blue detail-nav-button" to="/" state={{ scrollTo: 'mapa-territorios' }}>
            Seguir navegando en el mapa
          </Link>
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
