import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap ft-grid">
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            UiX Portafolio
          </div>
          <h3>
            Convierte tus reportes
            <br />
            en <span className="grad-text">presentaciones</span>.
          </h3>
        </div>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link href="/projects">Presentaciones</Link>
            <Link href="/upload">Subir Markdown</Link>
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
        © {new Date().getFullYear()} UiX Portafolio · Diseño de experiencia
      </div>
    </footer>
  );
}
