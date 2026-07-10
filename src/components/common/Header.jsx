"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isAdmin } from "../../lib/auth";

export default function Header() {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setAdmin(isAdmin());
  }, []);

  return (
    <header className="hd">
      <div className="wrap hd-inner">
        <Link href="/" className="hd-logo">
          <img src="/logo.png" alt="Logo" />
          <span className="hd-by">By UPAX</span>
          <span className="hd-word">
            Business <span className="grad-text">Cases</span>
          </span>
        </Link>
        <nav className="hd-nav">
          <Link href="/projects">Business Cases</Link>
          {admin && <Link href="/upload">Subir MD</Link>}
          {admin && (
            <Link href="/upload" className="btn btn-grad hd-cta">
              Nuevo Business Case
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
