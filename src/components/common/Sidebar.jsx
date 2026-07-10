"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SECTIONS } from "../../data/sections";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="sb-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir secciones"
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      {open && <div className="sb-scrim" onClick={() => setOpen(false)} />}

      <aside className={`sb ${open ? "sb-open" : ""}`}>
        <div className="sb-head">
          <div className="eyebrow">Propuesta · Secciones</div>
        </div>
        <nav className="sb-nav">
          {SECTIONS.map((s) => {
            const active = pathname === s.href;
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`sb-item ${active ? "sb-item-active" : ""}`}
                onClick={() => setOpen(false)}
              >
                <span className="sb-num">{s.n}</span>
                <span className="sb-label">{s.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
