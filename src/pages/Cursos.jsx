import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const toArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
};

const COURSES = [
  {
    id: 1,
    title: 'Química Divertida',
    desc: 'Le damos la más cordial bienvenida a esta guía didáctica Química Divertida, diseñada para acompañarlo en el desarrollo de contenidos fundamentales de las ciencias naturales con un enfoque práctico, innovador y contextualizado. En este material encontrará:',
    shortDesc:[
      '• Actividades interactivas para explorar propiedades de la materia, métodos de separación de mezclas, leyes de los gases, reacciones químicas y nomenclatura inorgánica.',
      '• Experimentos sencillos y seguros que vinculan la teoría con fenómenos cotidianos, promoviendo el aprendizaje significativo.',
      '• Recursos gráficos y tablas que facilitan la comprensión de conceptos clave.',
      '• Preguntas reflexivas y debates para fomentar el pensamiento crítico y la conexión entre la química y problemáticas reales.',
      'Los estudiantes no solo aprenderán química, sino que descubrirán su relevancia en la vida diaria, la tecnología y el cuidado del medio ambiente. ¡Prepárese para despertar la curiosidad científica en el aula! Equipo FuturaMente, Fortaleciendo Vocaciones Regionales.'
    ],
    modules: [
      'Parte I: Propiedades de la materia y métodos de separación de mezclas (Fundamentación y práctica, Mezclas homogéneas y heterogéneas, Métodos de separación más comunes)',
      'Parte II: Gases (Fundamentación y práctica, Teoría cinética de los gases, Leyes de los gases, Ley de Charles)',
      'Parte III: Estados de Oxidación y las Reacciones Químicas (Estados de oxidación, Reacciones y ecuaciones químicas, Balanceo de ecuaciones químicas)',
      'Parte IV: Nomenclatura química de óxidos, bases, ácidos y sales (Fundamentación y práctica)'
    ],
    level: 'Intermedio',
    color: 'var(--blue)'
  },
  {
    id: 2,
    title: 'Física Divertida',
    desc: 'Le damos la más cordial bienvenida a esta guía didáctica diseñada para acompañarlo en el desarrollo de los contenidos fundamentales del curso Física Divertida. En este documento encontrará los detalles necesarios para orientar adecuadamente el avance del estudiante a lo largo de las cajas denotadas con colores: Azul, Verde, Rojo y Naranja.',
    shortDesc: [
      'La denominación del color de las cajas tiene que ver con la manera de involucrar al estudiante con el tipo de conocimiento a adquirir:',
      '• Azul: Contenido básico que se presenta al estudiante por parte del docente. Este es el análogo a los ejemplos que se presentan a lo largo de un curso tradicional.',
      '•Verde: Contenido básico que realiza el estudiante orientado por el docente, tomando como referencia las cajas azules. El estudiante extiende y complementa el contenido que acompaña el texto, este es el análogo a los talleres/problemas de práctica que se presentan a lo largo de un curso tradicional.',
      '•Rojo: Contenido complementario o de profundización. El estudiante realiza experimentos con sus propios recursos, obtiene datos en donde evidencia de manera directa la manifestación de los principios físicos estudiados a lo largo del texto. Este es el análogo a un laboratorio que se presenta a lo largo de un curso tradicional.',
      '•Naranja: Contenido complementario o de profundización. El estudiante resume y plantea alternativas a procedimientos realizados a lo largo del texto. Este es el análogo a talleres de repaso y asignación de tareas a lo largo de un curso tradicional.',
      'La duración del curso puede variar dependiendo del grado de profundidad al que se desee llegar con el estudiante en los campos conceptual y además procedimental, es decir, en la comprensión de la situación en términos físicos como de apropiación del conocimiento realizando aportes significativos al desarrollo del contenido general.'
    ],
    modules: [
      'Módulo I: Nuestro lugar en el cosmos (Historia del pensamiento científico, Eratóstenes y su legado, Movimiento natural, Laboratorio: medir la aceleración de la gravedad, Movimiento de un proyectil)',
      'Módulo II: Las reglas de la física (Concepto de escala, Movimiento circular y anti-gravedad, Conservación de la cantidad de movimiento, Conservación de la energía, La naturaleza eléctrica de la materia)'
    ],
    level: 'Intermedio',
    color: 'var(--brand-2)'
  },
  {
    id: 3,
    title: 'Ecología y Medio Ambiente',
    desc: 'Le damos la más cordial bienvenida a esta guía didáctica diseñada para acompañarle en el desarrollo de contenidos fundamentales de las asignaturas de Ciencias Naturales y Educación Ambiental, con un enfoque interdisciplinario que integra competencias científicas, ciudadanas y prácticas sostenibles.',
    shortDesc: [
      'Esta guía ha sido creada con el propósito de:',
      '• Fortalecer la enseñanza de temas críticos como el cambio climático, la gestión de residuos, la conservación del agua y la biodiversidad.',
      '• Promover metodologías activas mediante actividades experimentales, debates y proyectos comunitarios que fomenten la conciencia ambiental en los estudiantes.',
      '• Conectar el conocimiento científico con problemáticas locales, incentivando soluciones creativas y acciones concretas.',
      'Estructura y recursos:',
      'Cada módulo incluye: Fundamentos teóricos con base en estándares educativos y evidencia científica. Actividades prácticas adaptables a distintos contextos (urbanos/rurales). Herramientas evaluativas como rúbricas y guías de reflexión.',
      'Cómo usar esta guía:',
      '• Flexibilidad: Seleccione actividades según el nivel escolar y recursos disponibles.',
      '• Enfoque colaborativo: Fomenta el trabajo en equipo y la participación comunitaria.',
      '• Conexión con el currículo: Vincule los temas con asignaturas como Química, Geografía y Ética.',
      'Invitación final: Le animamos a transformar esta guía en una oportunidad para inspirar a sus estudiantes como agentes de cambio. Juntos, podemos cultivar una generación comprometida con el cuidado de nuestro planeta.',
      '¡Gracias por sumarse a esta iniciativa por un futuro sostenible!'
    ],
    modules: [
      'Módulo I: Cambio climático',
      'Módulo II: Manejo de residuos orgánicos e inorgánicos',
      'Módulo III: El agua',
      'Módulo IV: La pérdida de biodiversidad y su impacto en los ecosistemas locales'
    ],
    level: 'Principiante',
    color: 'var(--ok)'
  },
  {
    id: 4,
    title: 'Matemática Financiera para Niños',
    desc: 'El dinero hace parte de nuestra vida diaria: lo usamos para comprar alimentos, pagar servicios, estudiar, divertirnos y también para ayudar a quienes queremos. Pero, ¿sabemos realmente cómo cuidarlo, administrarlo y tomar buenas decisiones con él desde pequeños?',
    shortDesc: [
        'Este curso de educación financiera está pensado para acompañar a los niños y niñas en un viaje divertido y formativo, donde aprenderán a valorar el trabajo, a diferenciar entre deseos y necesidades, a ahorrar, a planear sus gastos y a tomar decisiones responsables como consumidores. Además, conocerán cómo funcionan los servicios públicos, qué son los impuestos y por qué todos participamos de la economía de nuestro país.',
        'Cada unidad está compuesta por varias subsecciones con la siguiente estructura:',
        '• Una introducción clara del tema.',
        '• Un objetivo que orienta el aprendizaje.',
        '• Explicaciones sencillas con ejemplos de la vida real.',
        '• Actividades para el aula y la casa que fomentan la reflexión y la práctica.',
        '• Una reflexión final para reforzar lo aprendido.',
        'Este curso no solo busca enseñar conceptos financieros, sino también formar hábitos saludables y valores como la responsabilidad, la honestidad, el esfuerzo y la solidaridad. Está diseñado para trabajar tanto en el aula como en familia, promoviendo conversaciones importantes sobre el uso consciente del dinero y los recursos.',
        '¡Bienvenidos a este viaje por el mundo de las finanzas! Cuidar el dinero es también cuidar nuestro futuro.',
        '¿Cómo está organizado este libro?',
        'El contenido se divide en cinco unidades temáticas. Cada una aborda un aspecto importante de la educación financiera, con un lenguaje cercano y ejemplos basados en la vida cotidiana:'
    ],
    modules: [
      'Unidad 1: Aprendemos de dónde viene el dinero y para qué lo usamos.',
      'Unidad 2: Descubrimos el valor del dinero a lo largo del tiempo.',
      'Unidad 3: Conocemos cómo cuidar nuestro dinero y nuestros recursos.',
      'Unidad 4: Reflexionamos sobre cómo manejar el dinero en familia y cumplir nuestros compromisos.',
      'Unidad 5: Entendemos cómo participamos en la economía del país como ciudadanos responsables.'
    ],
    
    level: 'Principiante',
    color: 'var(--ok)'
  },
  {
    id: 5,
    title: 'Metodología de Aprendizaje',
    desc: 'Le damos la más cordial bienvenida a esta guía didáctica diseñada para aprender contenidos fundamentales de las asignaturas de Química y Biología. El presente documento está estructurado en dos grandes bloques temáticos: una primera parte dedicada al aprendizaje de la Química, y una segunda enfocada en contenidos esenciales de Biología',
    shortDesc: [
      'En el área de Química, se abordan temas clave como:',
      'i) Introducción a la química, ii) Estructura atómica y tabla periódica, iii) El lenguaje de la química, iv) La matemática de la química, v) Estados de agregación de la materia, vi) El agua y la concentración de soluciones y vii) Cinética y equilibrio químico.',
      ' En cuanto a Biología, se desarrollan contenidos vinculados a la comprensión de la vida y los seres vivos, tales como: i) El origen de la vida, ii) Células procariotas y eucariotas, iii) De organismos unicelulares a pluricelulares, iv) La reproducción de los seres vivos, v) La reproducción humana, vi) La salud sexual y reproductiva',
      'Cada sección incluye objetivos generales y específicos, actividades iniciales, desarrollo teórico, tareas para el hogar y variedad de materiales complementarios (enlaces y videos gratuitos) que servirán como herramientas para enriquecer los conocimientos adquiridos.',
      ' Esperamos sinceramente que esta guía le sea útil, dinámica y significativa en su formación académica e intelectual.'
    ],
    modules: [
      'Módulo I: La química en la naturaleza (Introducción a la química, Estructura atómica y tabla periódica, El lenguaje de la química, La matemática de la química, Estados de agregación, El agua y concentración de soluciones, Cinética y equilibrio químico)',
      'Módulo II: La biología en la naturaleza (El origen de la vida, Células procariotas y eucariotas, Organismos unicelulares y pluricelulares, Reproducción de los seres vivos, Reproducción humana, Salud sexual y reproductiva)'
    ],
    level: 'Avanzado',
    color: 'var(--brand)'
  }
];

function getIcon(id) {
  switch (id) {
    case 1: return '🧪';
    case 2: return '🌌';
    case 3: return '🌱';
    case 4: return '💰';
    case 5: return '📚';
    default: return '🎓';
  }
}

function AccordionItem({ course, isOpen, onToggle }) {
  return (
    <div className={`cursos-item ${isOpen ? 'is-open' : ''}`}>
      <button
        className="cursos-header"
        onClick={onToggle}
        type="button"
        aria-expanded={isOpen}
      >
        <div className="cursos-header-left">
          <span className="cursos-icon">{getIcon(course.id)}</span>
          <span className="cursos-title">{course.title}</span>
        </div>

        <div className="cursos-header-right">
          <span className="cursos-badge" style={{ backgroundColor: course.color }}>
            {course.level}
          </span>
          <span className="cursos-toggle-icon">
            {isOpen ? '−' : '+'}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: 'hidden' }}
          >
            <div className="cursos-body">
              <div className="cursos-body-inner" style={{ borderLeftColor: course.color }}>
                <p className="cursos-desc">{course.desc}</p>

                {toArray(course.shortDesc).map((item, index) => (
                  <p key={index} className="cursos-short-desc-item">
                    {item}
                  </p>
                ))}

                <div className="cursos-modules-section">
                  <h4 className="cursos-subtitle">Módulos del curso</h4>
                  <ul className="cursos-module-list">
                    {course.modules.map((mod, i) => (
                      <li key={i}>
                        <span style={{ color: course.color, marginRight: '8px', fontWeight: 'bold' }}>•</span>
                        {mod}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Cursos() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Nuestros Cursos</h1>
        <p className="section-sub">Explora nuestra oferta académica.</p>

        <div className="cursos-accordion">
          {COURSES.map((c) => (
            <AccordionItem
              key={c.id}
              course={c}
              isOpen={openId === c.id}
              onToggle={() => toggle(c.id)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .cursos-accordion {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 40px;
          max-width: 900px;
          margin: 0 auto;
        }
        .cursos-item {
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .cursos-item:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .cursos-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s;
        }
        .cursos-header:hover {
          background: rgba(0,0,0,0.02);
        }
        .cursos-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .cursos-icon {
          font-size: 1.5rem;
          line-height: 1;
        }
        .cursos-title {
          font-weight: 700;
          font-size: 1.1rem;
          margin: 0;
          color: var(--text);
        }
        .cursos-header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .cursos-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #fff;
          padding: 4px 10px;
          border-radius: 99px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .cursos-toggle-icon {
          font-size: 1.5rem;
          color: var(--muted);
          width: 24px;
          text-align: center;
          line-height: 1;
        }
        
        .cursos-body {
          padding: 0 24px 24px 24px;
        }
        .cursos-body-inner {
          padding-left: 20px;
          border-left: 4px solid #ccc; /* Overridden inline */
        }
        .cursos-desc {
          margin-bottom: 20px;
          line-height: 1.6;
          color: var(--text);
          font-size: 1rem;
        }
        .cursos-short-desc-item {
          margin-bottom: 8px;
          line-height: 1.6;
          color: var(--text);
          font-size: 1rem;
        }
        .cursos-short-desc-item:last-of-type {
          margin-top: 0.75rem;
        }
        .cursos-subtitle {
          margin: 0 0 12px;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text);
        }
        .cursos-module-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .cursos-module-list li {
          margin-bottom: 8px;
          line-height: 1.5;
          color: var(--muted);
          display: flex;
          align-items: baseline;
        }

        @media (max-width: 600px) {
          .cursos-header {
            padding: 16px;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .cursos-header-right {
            width: 100%;
            justify-content: space-between;
          }
          .cursos-body {
            padding: 0 16px 20px 16px;
          }
        }
      `}</style>
    </section>
  );
}