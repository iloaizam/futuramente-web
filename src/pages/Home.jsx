import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { departamentos } from '../data/departamentos.js';
import { asset } from '../utils/assets.js';
import { useInViewOnce } from '../hooks/useInViewOnce.js';
import InteractiveMap from "../components/InteractiveMap.jsx";
import GradientText from "../components/GradientText.jsx";


const slides = [
  {
    id: 'sobre',
    eyebrow: 'Sobre Nosotros',
    title: 'Formamos docentes, inspiramos futuros.',
    img: asset('assets/img/hero-1.jpeg'),
    ctas: [{ label: 'Sobre Nosotros', type: 'primary', href: '#sobre' }]
  },
  {
    id: 'proposito',
    eyebrow: 'Propósito',
    title: 'Claros y medibles',
    text: 'Comunicación, seguimiento, vinculación y escalabilidad.',
    img: asset('assets/img/hero-2.jpeg'),
    ctas: [{ label: 'Propósito', type: 'info', href: '#proposito' }]
  },
  {
    id: 'roadmap',
    eyebrow: 'Etapas',
    title: 'De formación a acción',
    text: 'Diplomado y semilleros de investigación en territorio.',
    img: asset('assets/img/hero-3.jpeg'),
    ctas: [
      { label: 'Ver Etapas', type: 'blue', href: '#roadmap' },
      { label: 'Beneficios', type: 'ghost', href: '#beneficios' }
    ]
  },
  {
    id: 'contacto',
    eyebrow: 'Contacto',
    title: '¿Hablamos?',
    text: 'Escríbenos o síguenos en redes para sumarte como aliado.',
    img: asset('assets/img/hero-4.jpeg'),
    ctas: [
      {
        label: 'Escribir correo',
        type: 'primary',
        external: true,
        href: 'mailto:comunicafut_man@unal.edu.co?subject=Consulta%20FuturaMente'
      },
      { label: 'Ver detalles', type: 'secondary', href: '#contacto' }
    ]
  }
];



function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <section id="inicio" className="hero hero-slider">
      <div className="container">
        <div className="slider" aria-label="Banner destacado">
          <button className="slider-btn prev" type="button" aria-label="Anterior" onClick={prev}>
            &#10094;
          </button>
          <button className="slider-btn next" type="button" aria-label="Siguiente" onClick={next}>
            &#10095;
          </button>

          <div className="slides" role="list">
            <AnimatePresence mode="wait">
              <motion.article
                key={slides[index].id}
                className="slide is-active"
                role="listitem"
                aria-roledescription="slide"
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                <img src={slides[index].img} alt={slides[index].eyebrow} />

                <div className="overlay">
                  <div className="overlay-inner">
                    <span className="eyebrow">{slides[index].eyebrow}</span>
                    <h1>{slides[index].title}</h1>
                    {slides[index].text ? <p>{slides[index].text}</p> : null}

                    <div className="cta-row">
                      {slides[index].ctas.map((cta) => {
                        const className =
                          cta.type === 'primary'
                            ? 'btn btn-primary'
                            : cta.type === 'info'
                              ? 'btn btn-info'
                              : cta.type === 'blue'
                                ? 'btn btn-blue'
                                : cta.type === 'secondary'
                                  ? 'btn btn-secondary'
                                  : 'btn btn-ghost';

                        if (cta.external) {
                          return (
                            <a key={cta.label} className={className} href={cta.href}>
                              {cta.label}
                            </a>
                          );
                        }

                        return (
                          <button
                            key={cta.label}
                            className={className}
                            type="button"
                            onClick={() => scrollToId(cta.href.replace('#', ''))}
                          >
                            {cta.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="dots" role="tablist" aria-label="Seleccionar banner">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Ir a ${s.eyebrow}`}
                aria-selected={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Reveal({ children }) {
  const { ref, inView } = useInViewOnce();

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
}


export default function Home() {
  const navigate = useNavigate();
  const deptNames = useMemo(() => departamentos.map((d) => d.nombre), []);

  return (
    <>
      <HeroSlider />
        <section className="home-section home-section-map">
          <div className="container">
            <Reveal>
              <InteractiveMap />
            </Reveal>
          </div>
        </section>

      <section id="sobre" className="home-section home-section-light">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Sobre Nosotros</h2>
            <div className="about-lead">
              <span className="eyebrow">FUTURAMENTE – FORTALECIENDO VOCACIONES REGIONALES</span>
              <h3>Formamos docentes, inspiramos futuros.</h3>
              <p>
                FuturaMente es un programa educativo que conecta a docentes y estudiantes con nuevas formas de aprender,
                enseñar e investigar. Desde diferentes regiones de Colombia, trabajamos juntos para construir una educación
                más innovadora, inclusiva y con impacto real en las comunidades.
              </p>
            </div>
          </Reveal>

          <div className="grid cols-2">
            <Reveal>
              <article className="card">
                <h3 style={{ marginTop: 0 }}>¿Qué es FuturaMente?</h3>
                <p className="lead">
                  FuturaMente es un proyecto financiado por el Sistema General de Regalías que busca despertar vocaciones científicas
                  y fortalecer la educación básica y media con un enfoque territorial, cultural y productivo.
                </p>
                <p>
                  Nace para fortalecer la labor docente y sembrar en los estudiantes la semilla de la investigación y la innovación educativa.
                  A través de formación, acompañamiento y recursos, ayudamos a transformar la manera en que se vive la educación en Colombia.
                </p>
              </article>
            </Reveal>

            <Reveal>
              <aside className="card">
                <h3 style={{ marginTop: 0 }}>Dónde se impacta</h3>
                <div className="chips">
                  {deptNames.map((n) => (
                    <span key={n} className="chip">
                      {n}
                    </span>
                  ))}
                  <button className="chip chip-cta" type="button" onClick={() => navigate('/departamentos')}>
                    Ver evidencias
                  </button>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="proposito" className="home-section home-section-soft-blue">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Propósito</h2>
            <div className="purpose card">
              <h3 style={{ margin: '0 0 6px' }}>Propósito</h3>
              <p>
                Impulsar el desarrollo de capacidades pedagógicas y de investigación que permitan a docentes y estudiantes
                ser protagonistas en la construcción de un futuro educativo más sólido, creativo y sostenible.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="programas" className="section">
        <div className="container">
          <Reveal>
            <div style={{ marginBottom: '32px' }}>
              <h2 className="section-title">Nuestros cursos</h2>
            </div>
          </Reveal>

          <div className="bento-wrapper">
            <Reveal>
              <div className="bento-grid">
                <div 
                  className="bento-cell cell-1" 
                  onClick={() => navigate('/cursos')}
                  role="button"
                  tabIndex={0}
                  aria-label="Ver curso Metodología de Aprendizaje"
                >
                  <span className="bento-icon">🧬</span>
                  <div className="bento-info">
                    <span className="bento-badge" style={{ background: 'var(--brand)' }}>Avanzado</span>
                    <h3>METODOLOGÍA DE APRENDIZAJE EN CIENCIAS EXACTAS Y NATURALES</h3>
                  </div>
                </div>
                <div 
                  className="bento-cell cell-2" 
                  onClick={() => navigate('/cursos')}
                  role="button"
                  tabIndex={0}
                >
                  <span className="bento-icon">🔭</span>
                  <div className="bento-info">
                    <span className="bento-badge" style={{ background: 'var(--brand-2)' }}>Intermedio</span>
                    <h3>Física Divertida</h3>
                  </div>
                </div>
                <div 
                  className="bento-cell cell-3" 
                  onClick={() => navigate('/cursos')}
                  role="button"
                  tabIndex={0}
                >
                  <span className="bento-icon">🌿</span>
                  <div className="bento-info">
                    <span className="bento-badge" style={{ background: 'var(--ok)' }}>Principiante</span>
                    <h3>Ecología y Medio Ambiente</h3>
                  </div>
                </div>
                <div 
                  className="bento-cell cell-4" 
                  onClick={() => navigate('/cursos')}
                  role="button"
                  tabIndex={0}
                >
                  <span className="bento-icon">💰</span>
                  <div className="bento-info">
                    <span className="bento-badge" style={{ background: '#f59e0b' }}>Principiante</span>
                    <h3>Matemática Financiera Para Niños</h3>
                  </div>
                </div>
                <div 
                  className="bento-cell cell-5" 
                  onClick={() => navigate('/cursos')}
                  role="button"
                  tabIndex={0}
                >
                  <span className="bento-icon">⚗️</span>
                  <div className="bento-info">
                    <span className="bento-badge" style={{ background: 'var(--blue)' }}>Intermedio</span>
                    <h3>Química Divertida</h3>
                  </div>
                </div>
              </div>
            </Reveal>

              <div className="bento-content">
              <Reveal>
                <div style={{ marginBottom: '32px' }}>
                <span className="eyebrow" style={{ color: 'var(--blue)', fontSize: '1.3rem' }}>FORMACIÓN DE CALIDAD</span>
                </div>
                <p style={{ textAlign: 'justify' }}>
                  Descubre nuestra oferta de cursos diseñados para transformar la educación.
                </p>
                <p style={{ textAlign: 'justify' }}>
                  Desde ciencias naturales hasta educación financiera, cada programa combina teoría, 
                  práctica y metodologías innovadoras para un aprendizaje significativo.
                </p>
                
                <div className="bento-stat">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Cursos disponibles</span>
                </div>

                <button 
                  className="btn btn-primary" 
                  type="button" 
                  onClick={() => navigate('/cursos')}
                  style={{ marginTop: '24px' }}
                >
                  Explorar cursos
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="ludix" className="section">
        <div className="container">
          <Reveal>
            <div className="ludix-grid">
              <div className="ludix-content-col">
                <div className="ludix-header">
                  <h2 className="section-title" style={{marginTop: 0, marginBottom: 0}}>Ludix</h2>
                  <span className="bento-badge" style={{ backgroundColor: 'var(--brand)', display: 'inline-block' }}>
                    Próximamente
                  </span>
                </div>
                <p>
                  Transforma el aula en una experiencia que los estudiantes realmente disfrutan. Con Ludix, los colegios puodran gestionar cursos de matemáticas, química, física y más, mientras los estudiantes aprenden jugando con crucigramas, sopas de letras y juegos interactivos. Los profesores siguen el progreso de cada estudiante en tiempo real.
                </p>
                <div className="ludix-features">
                  <div className="ludix-card">
                    <span className="eyebrow" style={{ color: 'var(--brand)' }}>Visión</span>
                    <p>Ser la plataforma educativa favorita de colegios y estudiantes, liderando una nueva forma de aprender.</p>
                  </div>
                  <div className="ludix-card">
                    <span className="eyebrow" style={{ color: 'var(--brand)' }}>Propósito</span>
                    <p>Hacer que aprender sea tan divertido como jugar, sin sacrificar la calidad académica.</p>
                  </div>
                </div>
              </div>

               <div className="ludix-logo-col">
                <img 
                  src={asset('assets/img/LUDIX-LOGO.png')} 
                  alt="Ludix - Plataforma educativa interactiva" 
                  className="ludix-logo"
                />
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={35}
                  showBorder={false}
                  className="ludix-brand-text"
                >
                  Ludix Unal
                </GradientText>
              </div>

            </div>
          </Reveal>
        </div>
      </section>
      <section id="diplomados" className="section section-alt">
        <div className="container">
          <Reveal>
            <div className="card" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
              <h2 className="section-title">Nuestros Diplomados</h2>
              <p style={{ margin: '1rem 0 1.5rem' }}>
                Ofrecemos diplomados de alta calidad diseñados para profesionales y 
                estudiantes que buscan profundizar sus conocimientos en áreas clave. 
                Nuestros programas combinan rigor académico con aplicación práctica, 
                preparándote para los desafíos del mundo actual.
              </p>
              <button 
                className="btn btn-primary" 
                type="button" 
                onClick={() => navigate('/diplomados')}
              >
                Conocer diplomados
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="nuestra-app-promo" className="home-section">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Nuestra App: FuturaMente</h2>
            <p className="section-sub">
              Lleva el aprendizaje al siguiente nivel con nuestras herramientas y recursos educativos, disponibles incluso sin conexión a internet.
            </p>
          </Reveal>
          <div className="grid cols-2">
            <Reveal>
              <div className="card">
                <h3 style={{ marginTop: 0 }}>Herramientas Educativas</h3>
                <p className="muted">
                  Un conjunto de aplicaciones interactivas para explorar conceptos de ciencia y tecnología de forma práctica y divertida.
                </p>
                <ul className="benefit-list" style={{ gridTemplateColumns: '1fr', gap: '10px' }}>
                  <li>
                    <span className="tick" aria-hidden="true">✓</span>
                    <div><strong>Herramientas interactivas</strong> para experimentar y aprender.</div>
                  </li>
                  <li>
                    <span className="tick" aria-hidden="true">✓</span>
                    <div><strong>Juegos pedagógicos</strong> que refuerzan el conocimiento.</div>
                  </li>
                  <li>
                    <span className="tick" aria-hidden="true">✓</span>
                    <div><strong>Videos tutoriales</strong> para sacar el máximo provecho a cada herramienta.</div>
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal>
              <div className="card">
                <h3 style={{ marginTop: 0 }}>Recursos Educativos Futuramente</h3>
                <p className="muted">
                  Una biblioteca de materiales didácticos diseñados para apoyar a los docentes y enriquecer la experiencia en el aula.
                </p>
                <ul className="benefit-list" style={{ gridTemplateColumns: '1fr', gap: '10px' }}>
                  <li>
                    <span className="tick" aria-hidden="true">✓</span>
                    <div><strong>Contenido pedagógico</strong> alineado con el currículo.</div>
                  </li>
                  <li>
                    <span className="tick" aria-hidden="true">✓</span>
                    <div><strong>Recursos didácticos</strong> accesibles sin necesidad de conexión a internet.</div>
                  </li>
                  <li>
                    <span className="tick" aria-hidden="true">✓</span>
                    <div><strong>Material instructivo</strong> para guiar a los docentes en su implementación.</div>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => navigate('/nuestra-app', { state: null })}
              >
                Descubre y descarga la App
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      

      <section id="roadmap" className="home-section home-section-light">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Etapas del proyecto</h2>
            <p className="section-sub">Así avanzamos de la formación a la acción en territorio.</p>
          </Reveal>

          <ol className="stages">
            <Reveal>
              <li className="stage card">
                <div className="stage-head">
                  <span className="stage-number">1</span>
                  <h3>Diplomado “Maestro de Maestros”</h3>
                </div>
                <p className="muted">
                  Un espacio de formación en el que docentes de todo el país se encuentran con nuevas metodologías y herramientas
                  para enriquecer su práctica educativa.
                </p>
                <ul className="stage-list">
                  <li>Más de 3 módulos desarrollados.</li>
                  <li>Oportunidades para compartir experiencias y aprender en comunidad.</li>
                </ul>
              </li>
            </Reveal>

            <Reveal>
              <li className="stage card">
                <div className="stage-head">
                  <span className="stage-number">2</span>
                  <h3>Semilleros de investigación</h3>
                </div>
                <p className="muted">Después del diplomado, el conocimiento se transforma en acción.</p>
                <ul className="stage-list">
                  <li>Creación de semilleros con docentes y estudiantes.</li>
                  <li>Acompañamiento metodológico especializado.</li>
                  <li>
                    <span className="chip money">Capital semilla: COP $500.000 por iniciativa</span>
                  </li>
                </ul>
              </li>
            </Reveal>
          </ol>
        </div>
      </section>

      <section id="beneficios" className="home-section home-section-soft-green">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Beneficios de participar</h2>
            <p className="section-sub">Al ser parte de FuturaMente, las instituciones, docentes y estudiantes reciben:</p>
          </Reveal>

          <Reveal>
            <div className="card">
              <ul className="benefit-list">
                <li>
                  <span className="tick" aria-hidden="true">
                    ✓
                  </span>
                  <div>
                    <strong>Formación actualizada</strong> en metodologías innovadoras.
                  </div>
                </li>
                <li>
                  <span className="tick" aria-hidden="true">
                    ✓
                  </span>
                  <div>Asesoría de un equipo de expertos en educación e investigación.</div>
                </li>
                <li>
                  <span className="tick" aria-hidden="true">
                    ✓
                  </span>
                  <div>Recursos económicos para llevar a cabo proyectos propios.</div>
                </li>
                <li>
                  <span className="tick" aria-hidden="true">
                    ✓
                  </span>
                  <div>Conexiones con experiencias educativas nacionales e internacionales.</div>
                </li>
                <li>
                  <span className="tick" aria-hidden="true">
                    ✓
                  </span>
                  <div>Un espacio para compartir, crecer y dejar huella en la comunidad educativa.</div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="aliados" className="home-section home-section-light">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Aliados</h2>
            <p className="section-sub">
              FuturaMente es posible gracias al trabajo conjunto de universidades, instituciones educativas, entidades gubernamentales y aliados
              estratégicos que creen en el poder de la educación para cambiar realidades.
            </p>
          </Reveal>

          <Reveal>
            <div className="card">
              <p className="muted" style={{ margin: 0 }}>
                Este ecosistema de colaboración impulsa iniciativas de formación, investigación y acompañamiento en territorio, conectando
                experiencias, saberes y recursos para generar impacto real.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <ul className="logos" aria-label="Logos de aliados">
              <li>
                <img src={asset("assets/img/aliado-1.png")} alt="Universidad Nacional de Colombia" />
              </li>
              <li>
                <img src={asset("assets/img/aliado-2.png")} alt="Sistema General de Regalías" />
              </li>
              <li>
                <img src={asset("assets/img/aliado-3.png")} alt="Universidad Americana" />
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="contacto" className="home-section home-section-cta">
  <div className="container">
    <Reveal>
      <div className="contact-cta">
        <div className="contact-cta-content">
          <span className="eyebrow">Contacto</span>
          <h2>¿Quieres sumarte, colaborar o saber más?</h2>
          <p>
            Escríbenos y conversemos sobre alianzas, actividades, comunidad y
            oportunidades para construir juntos.
          </p>
        </div>

        <a
          className="contact-cta-button"
          href="mailto:comunicafut_man@unal.edu.co"
        >
          comunicafut_man@unal.edu.co
        </a>
      </div>
    </Reveal>
  </div>
</section>

<style>{`
        .bento-wrapper {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
          align-items: center;
        }
        
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, auto);
          gap: 12px;
          grid-template-areas:
            "cell1 cell1 cell2"
            "cell3 cell4 cell2"
            "cell3 cell4 cell5";
          max-height: 480px;
        }

        .bento-cell {
          position: relative;
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          transition: transform 0.2s ease-out, filter 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }
        .bento-cell:hover {
          transform: scale(1.02);
          filter: brightness(1.1);
          z-index: 1;
        }

        .cell-1 { grid-area: cell1; background: linear-gradient(135deg, var(--brand), #f472b6); min-height: 200px; }
        .cell-2 { grid-area: cell2; background: linear-gradient(135deg, var(--brand-2), #a78bfa); min-height: 200px; }
        .cell-3 { grid-area: cell3; background: linear-gradient(135deg, var(--ok), #34d399); min-height: 200px; }
        .cell-4 { grid-area: cell4; background: linear-gradient(135deg, #f59e0b, #fbbf24); min-height: 160px; }
        .cell-5 { grid-area: cell5; background: linear-gradient(135deg, var(--blue), #60a5fa); min-height: 140px; }

        .bento-icon {
          font-size: 2.5rem;
          align-self: center;
          margin-bottom: auto;
          margin-top: 10px;
        }
        
        .bento-info {
          z-index: 2;
        }
        
        .bento-info h3 {
          color: #fff;
          margin: 8px 0 0;
          font-size: 0.95rem;
          font-weight: 700;
          line-height: 1.2;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .bento-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 700;
          color: #fff;
          padding: 2px 8px;
          border-radius: 99px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .bento-stat {
          margin-top: 20px;
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--brand-2);
          line-height: 1;
        }
        .stat-label {
          font-weight: 600;
          color: var(--muted);
        }

        @media (max-width: 1023px) {
          .bento-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .bento-content {
            order: -1; /* Text on top */
          }
        }

        @media (max-width: 767px) {
          .bento-grid {
            grid-template-areas: none;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            max-height: none;
          }
          .cell-1, .cell-2, .cell-3, .cell-4, .cell-5 {
            grid-area: auto;
            min-height: 160px;
          }
          /* Make the first cell span full width on mobile for visual balance */
          .cell-1 {
            grid-column: span 2;
          }
        }

        .ludix-grid {
          display: grid;
          grid-template-columns: 0.8fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .ludix-logo-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .ludix-logo {
          max-width: 320px;
          height: auto;
        }
        .ludix-brand-text {
          font-size: 3rem; /* text-5xl */
          font-weight: 700; /* font-bold */
          margin-bottom: 1rem; /* mb-4 */
          margin-top: 1rem;
          line-height: 1;
        }
        @media (min-width: 768px) {
          .ludix-brand-text { font-size: 3.75rem; /* md:text-6xl */ }
        }
        @media (min-width: 1024px) {
          .ludix-brand-text { font-size: 4.5rem; /* lg:text-7xl */ }
        }
        .ludix-header {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 12px;
          margin-bottom: 1rem;
        }
        .ludix-content-col p {
          text-align: justify;
          line-height: 1.6;
        }
        .ludix-features {
          margin-top: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .ludix-card {
          background: var(--surface, #fff);
          border: 1px solid var(--border, #eee);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .ludix-card p {
          margin-top: 0.5rem;
        }

        @media (max-width: 1023px) {
          .ludix-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .ludix-logo-col {
            order: -1;
          }
          .ludix-logo {
            max-width: 240px;
          }
        }

        @media (max-width: 767px) {
          .ludix-logo {
            max-width: 200px;
          }
          .ludix-content-col { text-align: left; }
          .ludix-features {
            grid-template-columns: 1fr;
          }
        }

        /* --- Ajustes para tarjetas de la App --- */
        #nuestra-app-promo .grid.cols-2 {
          grid-template-columns: 1fr 1fr;
        }
        #nuestra-app-promo .grid.cols-2 > div > div { /* motion.div dentro de Reveal */
          height: 100%;
        }
        #nuestra-app-promo .card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        #nuestra-app-promo .card p.muted {
          flex-grow: 1;
        }
        @media (max-width: 900px) {
          #nuestra-app-promo .grid.cols-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
