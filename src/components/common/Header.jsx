"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const { mode } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`hd ${scrolled ? "hd-scrolled" : ""}`}>
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
