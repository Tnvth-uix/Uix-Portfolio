"use client";

import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const { mode } = useAuth();

  return (
    <header className="hd">
      <div className="wrap hd-inner">
        <Link href="/" className="hd-logo">
          <img src="/logo.png" alt="Logo" />
          <span className="hd-word">
            Portafolio
          </span>
        </Link>
        <nav className="hd-nav">
          <Link href="/projects">Proyectos</Link>
          {mode === "admin" && (
            <>
              <Link href="/upload">Subir MD</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
