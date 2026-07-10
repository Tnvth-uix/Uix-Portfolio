import Link from "next/link";

export default function Header() {
  return (
    <header className="hd">
      <div className="wrap hd-inner">
        <Link href="/" className="hd-logo">
          <img src="/logo.png" alt="UiX" />
          <span>
            Uix<span className="grad-text">Portafolio</span>
          </span>
        </Link>
        <nav className="hd-nav">
          <Link href="/projects">Presentaciones</Link>
          <Link href="/upload">Subir MD</Link>
          <Link href="/upload" className="btn btn-grad hd-cta">
            Nueva presentación
          </Link>
        </nav>
      </div>
    </header>
  );
}
