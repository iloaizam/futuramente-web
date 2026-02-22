import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Drawer from './Drawer.jsx';
import Footer from './Footer.jsx';

const homeSections = [
  { id: 'sobre', label: 'Sobre Nosotros' },
  { id: 'proposito', label: 'Propósito' },
  { id: 'roadmap', label: 'Etapas' },
  { id: 'beneficios', label: 'Beneficios' },
  { id: 'aliados', label: 'Aliados' },
  { id: 'contacto', label: 'Contacto' }
];

export default function SiteLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    // Cerrar drawer al cambiar de ruta
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Evitar scroll del body cuando el drawer está abierto
    document.documentElement.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [drawerOpen]);

  const goToSection = (id) => {
    if (isHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    navigate('/', { state: { scrollTo: id } });
  };

  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <button
            className="brand"
            onClick={() => navigate('/')}
            aria-label="Ir al inicio"
            type="button"
          >
            <img
              className="brand-logo"
              src={`${import.meta.env.BASE_URL}assets/img/logo.png`}
              alt="FuturaMente"
            />
          </button>

          <nav className="menu" aria-label="Navegación principal">
            {homeSections.map((s) => (
              <button
                key={s.id}
                className="linklike"
                type="button"
                onClick={() => goToSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="btn btn-ghost hide-md"
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir evidencias"
            >
              Evidencias
            </button>

            <button
              className="icon-btn hamburger"
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menú lateral"
              aria-expanded={drawerOpen}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onGoToSection={goToSection}
      />

      <main>
        <Outlet />
      </main>

      <Footer year={year} />
    </>
  );
}