import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { departamentos } from '../data/departamentos.js';

export default function Drawer({ open, onClose, onGoToSection }) {
  const [deptOpen, setDeptOpen] = useState(false);
  const navigate = useNavigate();

  const deptChips = useMemo(() => departamentos.slice(0, 7), []);

  const closeAnd = (fn) => {
    onClose?.();
    fn?.();
  };

  return (
    <>
      <aside className="drawer" aria-hidden={!open}>
        <div className="drawer-head">
          <h3>Evidencias en Territorio</h3>
          <button className="icon-btn close" type="button" onClick={onClose} aria-label="Cerrar menú">
            ×
          </button>
        </div>

        <nav className="drawer-nav" aria-label="Menú lateral">
          <div className="drawer-group">
            <div className="drawer-group-title">Inicio</div>
            <button className="drawer-link" type="button" onClick={() => closeAnd(() => onGoToSection('sobre'))}>Sobre Nosotros</button>
            <button className="drawer-link" type="button" onClick={() => closeAnd(() => onGoToSection('proposito'))}>Propósito</button>
            <button className="drawer-link" type="button" onClick={() => closeAnd(() => onGoToSection('roadmap'))}>Etapas</button>
            <button className="drawer-link" type="button" onClick={() => closeAnd(() => onGoToSection('beneficios'))}>Beneficios</button>
            <button className="drawer-link" type="button" onClick={() => closeAnd(() => onGoToSection('aliados'))}>Aliados</button>
            <button className="drawer-link" type="button" onClick={() => closeAnd(() => onGoToSection('contacto'))}>Contacto</button>
          </div>

          <div className="drawer-group">
            <div className="drawer-group-title">Evidencias</div>

            <div className="drawer-row">
              <Link className="drawer-link" to="/tableros" onClick={onClose}>Tableros</Link>
            </div>

            <div className="drawer-row">
              <Link className="drawer-link" to="/departamentos" onClick={onClose}>Departamentos</Link>
              <button
                className="drawer-caret"
                type="button"
                onClick={() => setDeptOpen(v => !v)}
                aria-expanded={deptOpen}
                aria-controls="submenu-dept"
              >
                ▾
              </button>
            </div>

            <div className="drawer-sub" id="submenu-dept" hidden={!deptOpen}>
              <div className="chips">
                {deptChips.map((d) => (
                  <button
                    key={d.slug}
                    className="chip dept"
                    type="button"
                    onClick={() => closeAnd(() => navigate(`/departamentos/${d.slug}`))}
                  >
                    {d.nombre}
                  </button>
                ))}
                <button className="chip" type="button" onClick={() => closeAnd(() => navigate('/departamentos'))}>
                  Ver todos
                </button>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <div
        className="drawer-backdrop"
        hidden={!open}
        onClick={onClose}
        aria-hidden={!open}
      />
    </>
  );
}
