import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';
import Home from './pages/Home.jsx';
import Departamentos from './pages/Departamentos.jsx';
import DepartamentoDetail from './pages/DepartamentoDetail.jsx';
import Tableros from './pages/Tableros.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    // Si venimos con state { scrollTo: 'id' } desde otra página, hacemos scroll.
    const target = location.state?.scrollTo;
    if (!target) {
      // Si es navegación normal, subimos al top.
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Dejar que pinte primero.
    const t = setTimeout(() => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);

    return () => clearTimeout(t);
  }, [location.key]);

  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/departamentos" element={<Departamentos />} />
          <Route path="/departamentos/:slug" element={<DepartamentoDetail />} />
          <Route path="/tableros" element={<Tableros />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
