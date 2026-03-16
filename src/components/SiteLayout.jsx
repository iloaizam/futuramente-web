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
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!isHome) {
      setActiveSection('');
      return;
    }

    const elements = homeSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7]
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  const goToSection = (id) => {
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
      }
      setDrawerOpen(false);
      return;
    }

    navigate('/', { state: { scrollTo: id } });
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <header className="site-header">
        <div className="container nav nav-shell">
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

          <nav className="menu desktop-menu" aria-label="Navegación principal">
            {homeSections.map((s) => (
              <button
                key={s.id}
                className={`linklike nav-link ${activeSection === s.id ? 'is-active' : ''}`}
                type="button"
                onClick={() => goToSection(s.id)}
              >
                {s.label}
              </button>
            ))}
            <button
              className="linklike"
              type="button"
              onClick={() => navigate('/cursos')}
            >
              Cursos
            </button>
          </nav>

          <div className="nav-actions">
            <button
              className={`icon-btn hamburger menu-toggle ${drawerOpen ? 'is-open' : ''}`}
              type="button"
              onClick={toggleDrawer}
              aria-label={drawerOpen ? 'Cerrar menú lateral' : 'Abrir menú lateral'}
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
  activeSection={activeSection}
/>


      <main>
        <Outlet />
      </main>

      <Footer year={year} />
    </>
  );
}
