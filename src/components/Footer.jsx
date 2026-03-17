import { FaFacebookF, FaInstagram } from 'react-icons/fa';
const footerLogo = `${import.meta.env.BASE_URL}assets/img/logo-blanco.png`;

export default function Footer({ year }) {
  return (
    <footer className="site-footer site-footer-premium">
      <div className="container footer-main">
        <div className="footer-brand">
          <img
            src={footerLogo}
            alt="FuturaMente"
            className="footer-logo"
          />
          <p>
            Un espacio para fortalecer vocaciones, impulsar el aprendizaje y
            conectar tecnología, creatividad e innovación con impacto en
            comunidad.
          </p>
        </div>

        <div className="footer-column">
          <h4>Navegación</h4>
          <a href="#inicio">Inicio</a>
          <a href="#sobre-nosotros">Sobre nosotros</a>
          <a href="#proposito">Propósito</a>
          <a href="#etapas">Etapas</a>
          <a href="#beneficios">Beneficios</a>
          <a href="#aliados">Aliados</a>
          <a href="#contacto">Contacto</a>
        </div>

        <div className="footer-column">
          <h4>Contacto</h4>
          <a href="mailto:comunicafut_man@unal.edu.co">
            comunicafut_man@unal.edu.co
          </a>
          <span>Manizales, Colombia</span>
          <span>Programa FuturaMente</span>
        </div>

        <div className="footer-column">
          <h4>Síguenos</h4>

          <div className="footer-socials footer-socials-row">
            <a
              href="https://www.facebook.com/profile.php?id=61553607898327"
              target="_blank"
              rel="noreferrer"
              className="footer-social-icon"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/proyecto_futuramente/?hl=es"
              target="_blank"
              rel="noreferrer"
              className="footer-social-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} FuturaMente. Todos los derechos reservados.</span>

        
      </div>
    </footer>
  );
}

