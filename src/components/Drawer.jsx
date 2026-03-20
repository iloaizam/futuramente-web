import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { departamentos } from '../data/departamentos.js';

const homeLinks = [
  { id: 'sobre', label: 'Sobre Nosotros' },
  { id: 'proposito', label: 'Propósito' },
  { id: 'roadmap', label: 'Etapas' },
  { id: 'beneficios', label: 'Beneficios' },
  { id: 'aliados', label: 'Aliados' },
  { id: 'contacto', label: 'Contacto' }

];

export default function Drawer({ open, onClose, onGoToSection, activeSection }) {
  const [deptOpen, setDeptOpen] = useState(false);
  const navigate = useNavigate();

  const deptChips = useMemo(() => departamentos.slice(0, 7), []);

  const closeAnd = (fn) => {
    onClose?.();
    fn?.();
  };

  return (
    <>
      <aside className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <div className="drawer-head-copy">
            <span className="drawer-eyebrow">Menú</span>
            <h3>Explora FuturaMente</h3>
            <p>Navega por el programa y consulta las evidencias en territorio.</p>
          </div>

          <button
            className="drawer-close"
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <span />
          </button>
        </div>

        <nav className="drawer-nav" aria-label="Menú lateral">
          <div className="drawer-group">
            <div className="drawer-group-title">Inicio</div>

            {homeLinks.map((item) => (
              <button
                key={item.id}
                className={`drawer-link ${activeSection === item.id ? 'is-active' : ''}`}
                type="button"
                onClick={() => closeAnd(() => onGoToSection(item.id))}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="drawer-group">
            <div className="drawer-group-title">Evidencias</div>

            <Link className="drawer-link" to="/tableros" onClick={onClose}>
              Tableros
            </Link>

            <div className="drawer-row">
              <Link className="drawer-link drawer-link-inline" to="/departamentos" onClick={onClose}>
                Departamentos
              </Link>

              <button
                className={`drawer-caret ${deptOpen ? 'is-open' : ''}`}
                type="button"
                onClick={() => setDeptOpen((v) => !v)}
                aria-expanded={deptOpen}
                aria-controls="submenu-dept"
                aria-label={deptOpen ? 'Cerrar departamentos' : 'Abrir departamentos'}
              >
                <span />
              </button>
            </div>

            <div className="drawer-group-title">Formación</div>
            <Link className="drawer-link" to="/cursos" onClick={onClose}>
              Cursos
            </Link>

            <Link className="drawer-link" to="/diplomados" onClick={onClose}>
              Diplomados
            </Link>

            <div className={`drawer-sub ${deptOpen ? 'is-open' : ''}`} id="submenu-dept" hidden={!deptOpen}>
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

                <button
                  className="chip"
                  type="button"
                  onClick={() => closeAnd(() => navigate('/departamentos'))}
                >
                  Ver todos
                </button>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <div
        className={`drawer-backdrop ${open ? 'is-open' : ''}`}
        hidden={!open}
        onClick={onClose}
        aria-hidden={!open}
      />
    </>
  );
}
