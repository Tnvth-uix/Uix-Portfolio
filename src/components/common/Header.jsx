"use client";

import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const { mode } = useAuth();

  return (
    <header className="hd">
      <div className="wrap hd-inner">
        <Link href="/" className="hd-logo">
          <img src="https://iytpfckxdikpqqzmstyp.supabase.co/storage/v1/object/public/business-case-images/logo.png" alt="Logo" />
          <span className="hd-word">
            Portafolio
          </span>
        </Link>
        <nav className="hd-nav">
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
