import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { departamentos } from '../data/departamentos.js';
import { asset } from '../utils/assets.js';
import { useInViewOnce } from '../hooks/useInViewOnce.js';
import InteractiveMap from "../components/InteractiveMap.jsx";


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
        animate={inView ? { opacity: 1, y: 0 } : {}}
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
      <section className="section">
        <div className="container">
          <InteractiveMap />
        </div>
      </section>
      <section id="sobre" className="section">
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

      <section id="proposito" className="section section-alt">
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

      <section id="roadmap" className="section">
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

      <section id="beneficios" className="section section-alt">
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

      <section id="aliados" className="section">
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

      <section id="contacto" className="section section-alt">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Contacto</h2>
            <p className="section-sub">¿Quieres saber más sobre el programa, sumarte o colaborar como aliado?</p>
          </Reveal>

          <Reveal>
            <div className="card contact-card">
              <p className="muted" style={{ margin: '0 0 10px' }}>
                📩 Correo del proyecto:{' '}
                <a
                  className="contact-mail"
                  href="mailto:comunicafut_man@unal.edu.co?subject=Consulta%20sobre%20FuturaMente&body=Hola%2C%20quisiera%20saber%20m%C3%A1s%20sobre%20FuturaMente..."
                >
                  comunicafut_man@unal.edu.co
                </a>
              </p>

              <div className="social-wrap">
                <span className="muted">🌐 Redes sociales:</span>
                <div className="social-links">
                  <a
                    className="btn btn-fb"
                    href="https://www.facebook.com/people/Proyecto-FuturaMente/61553607898327/?mibextid=tPfjzR"
                    target="_blank"
                    rel="noopener"
                  >
                    Facebook
                  </a>

                  <a
                    className="btn btn-ig"
                    href="https://www.instagram.com/proyecto_futuramente/?igsh=cmUyYzZ2bjk2aDgy"
                    target="_blank"
                    rel="noopener"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
