import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap ft-grid">
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            UiX · Diseño UX/UI para la transformación digital
          </div>
          <h3>
            Agenda tu <span className="grad-text">diagnóstico gratis</span>.
          </h3>
          <div className="ft-contact">
            <a href="tel:+525597074674">+52 55 9707 4674</a>
            <a href="mailto:contacto@uixdesign.com">contacto@uixdesign.com</a>
          </div>
          <p className="ft-meta" style={{ marginTop: 14, maxWidth: "44ch" }}>
            Periférico Sur 4277, Jardines en la Montaña, Tlalpan, 14210, CDMX,
            México
          </p>
        </div>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link href="/projects">Business Cases</Link>
            <Link href="/upload">Nuevo Business Case</Link>
            <Link href="/#contacto">Contacto</Link>
            <a
              href="https://github.com/Tnvth-uix/Uix-Portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="wrap ft-meta" style={{ marginTop: 40 }}>
        © {new Date().getFullYear()} UiX Portafolio · Todos los derechos
        reservados · Política de privacidad
      </div>
    </footer>
  );
}
