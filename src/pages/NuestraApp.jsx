import React from 'react';
import { motion } from 'framer-motion';
import { useInViewOnce } from '../hooks/useInViewOnce.js';
import { asset } from '../utils/assets.js';
import './NuestraApp.css';

// Copied from Home.jsx to adhere to "do not touch" rule for existing files.
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

// New component for step animations
function StepReveal({ children, direction, delay }) {
  const { ref, inView } = useInViewOnce({ rootMargin: '0px 0px -20% 0px' });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -30 : 30,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--blue)' }}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brand-2)' }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const tutorialSteps = [
  {
    number: '01',
    title: 'Descarga el instalador desde la página',
    description: 'Haz clic en los botones de descarga de arriba para obtener los instaladores.',
  },
  {
    number: '02',
    title: 'Ejecuta el archivo .exe como administrador',
    description: 'Haz click en el boton descargar de todos modos.',
  },
  {
    number: '03',
    title: 'Paso 3',
    description: 'Abre los archivos para iniciar la instalación.',
  },
  {
    number: '04',
    title: 'Paso 4',
    description: 'Haz click en el boton "Más información".',
  },
  {
    number: '05',
    title: 'Paso 5',
    description: 'Haz click en el boton "Ejecutar de todas formas".',
  },
  {
    number: '06',
    title: 'Paso 6',
    description: 'Escoge una ubicación para la instalación y haz click en Extract, escoge muy bien la ubicación del archivo porque ahi se guardaran las carpetas que contienen los recursos educativos.',
  },
];

export default function NuestraApp() {
  const handleDownload = (filePath) => {
    const link = document.createElement('a');
    // The user provided a specific implementation for this handler.
    link.href = `${import.meta.env.BASE_URL}assets/downloads/${filePath}`;
    link.download = filePath;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="section">
      <div className="container" style={{ paddingBottom: 0 }}>
        <Reveal>
          <div style={{ textAlign: 'center' }}>
            <span className="eyebrow">Herramientas Educativas</span>
            <h1 className="section-title">Nuestra App</h1>
            <p className="section-sub">
              Herramientas diseñadas para transformar la educación en Colombia.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="app-grid">
            <div className="app-card">
              <div className="icon">
                <DownloadIcon />
              </div>
              <h2>Descarga nuestras Herramientas Educativas</h2>
              <p>Descarga el instalador de la Herramienta.</p>
              <a
                href="https://drive.google.com/uc?export=download&id=1q9sUuUoGj7QDsaNUEOIytgk94VvEXnPv" target="_blank" rel="noopener"
                className="btn btn-primary"
              >
                Descargar instalador
              </a>
              <span className="badge">Windows .exe</span>
            </div>

            <div className="app-divider"></div>

            <div className="app-card">
              <div className="icon">
                <DocumentIcon />
              </div>
              <h2>Descarga nuestros Recursos Educativos</h2>
              <p>Descarga el instalador de los Recursos Educativos Futuramente-web.</p>
              <a
                href="https://drive.google.com/uc?export=download&id=1DL3pQ1DcL73gltQirvYcnFa3MdPNEyuU" target="_blank" rel="noopener"
                className="btn btn-primary"
              >
                Descargar instalador
              </a>
              <span className="badge">Windows .exe</span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="app-footer-note">
            * Compatible con Windows 10 y 11. Se requieren permisos de administrador para instalar.
          </p>
        </Reveal>
      </div>

      <div className="section tutorial">
        <div className="container">
          <Reveal>
            <div className="tutorial__header">
              <h2 className="section-title">Tutorial de Instalación</h2>
              <p className="section-sub">
                Sigue estos pasos para instalar correctamente nuestras herramientas en tu equipo.
              </p>
            </div>
          </Reveal>

          <div className="tutorial__steps">
            {tutorialSteps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <StepReveal key={step.number} direction={isLeft ? 'left' : 'right'} delay={index * 0.15}>
                  <div className={`tutorial__step tutorial__step--${isLeft ? 'left' : 'right'}`}>
                    <div className="tutorial__step-image">
                      <img
                        src={asset(`assets/img/paso${index + 1}.png`)}
                        alt={`Paso ${step.number}`}
                        className="tutorial__img"
                      />
                    </div>
                    <div className="tutorial__step-content">
                      <span className="tutorial__step-number">{step.number}</span>
                      <h3 className="tutorial__step-title">{step.title}</h3>
                      <p className="tutorial__step-desc">{step.description}</p>
                    </div>
                  </div>
                </StepReveal>
              );
            })}
          </div>
        </div>
      </div>

            {/* ── Tutorial Portal de Educación Offline ── */}
      <div className="section tutorial">
        <div className="container">
          <Reveal>
            <div className="tutorial__header">
              <h2 className="section-title">Tutorial Portal de Educación Offline</h2>
              <p className="section-sub">
                Sigue estos pasos para acceder al portal de educación offline.
              </p>
            </div>
          </Reveal>

          <div className="tutorial__steps">
            {[
              {
                number: '01',
                img: 'paso7.png',
                title: 'Paso 1',
                description: 'Abre la carpeta "Portal de Educación Offline" y haz click en el archivo Recursos Educativos Offline.',
              },
              {
                number: '02',
                img: 'paso8.png',
                title: 'Paso 2',
                description: 'Veras una ventana como se muestra en la imagen,haz click en el boton verde "Iniciar" para acceder a los recursos educativos offline.',
              },
              {
                number: '03',
                img: 'PE3.png',
                title: 'Paso 3',
                description: 'Una vez dentro del portal, podrás acceder a los recursos educativos offline disponibles, cuando termines tu trabajo dale click al boton "Detener".',
              },
            ].map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <StepReveal key={step.number} direction={isLeft ? 'left' : 'right'} delay={index * 0.15}>
                  <div className={`tutorial__step tutorial__step--${isLeft ? 'left' : 'right'}`}>
                    <div className="tutorial__step-image">
                      <img
                        src={asset(`assets/img/${step.img}`)}
                        alt={`Paso ${step.number}`}
                        className="tutorial__img"
                      />
                    </div>
                    <div className="tutorial__step-content">
                      <span className="tutorial__step-number">{step.number}</span>
                      <h3 className="tutorial__step-title">{step.title}</h3>
                      <p className="tutorial__step-desc">{step.description}</p>
                    </div>
                  </div>
                </StepReveal>
              );
            })}
          </div>
        </div>
      </div>

            {/* ── Tutorial Portal de Herramientas Educativas ── */}
      <div className="section tutorial">
        <div className="container">
          <Reveal>
            <div className="tutorial__header">
              <h2 className="section-title">Tutorial Portal de Herramientas Educativas</h2>
              <p className="section-sub">
                Sigue estos pasos para acceder al portal de herramientas educativas.
              </p>
            </div>
          </Reveal>

          <div className="tutorial__steps">
            {[
              {
                number: '01',
                img: 'HE1.png',
                title: 'Paso 1',
                description: 'Abre la carpeta "Herramientas educativas" desde la ubicación de instalación y haz click en la carpeta html.',
              },
              {
                number: '02',
                img: 'HE2.png',
                title: 'Paso 2',
                description: 'Haz click en el archivo index, este te llevara al portal de herramientas educativas.',
              },
              {
                number: '03',
                img: 'HE3.png',
                title: 'Paso 3',
                description: 'Una vez dentro del portal, podrás acceder a todas las herramientas educativas disponibles.',
              },
            ].map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <StepReveal key={step.number} direction={isLeft ? 'left' : 'right'} delay={index * 0.15}>
                  <div className={`tutorial__step tutorial__step--${isLeft ? 'left' : 'right'}`}>
                    <div className="tutorial__step-image">
                      <img
                        src={asset(`assets/img/${step.img}`)}
                        alt={`Paso ${step.number}`}
                        className="tutorial__img"
                      />
                    </div>
                    <div className="tutorial__step-content">
                      <span className="tutorial__step-number">{step.number}</span>
                      <h3 className="tutorial__step-title">{step.title}</h3>
                      <p className="tutorial__step-desc">{step.description}</p>
                    </div>
                  </div>
                </StepReveal>
              );
            })}
          </div>
        </div>
      </div>        

    </section>
  );
}