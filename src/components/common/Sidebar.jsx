"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SECTIONS } from "../../data/sections";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const [indicator, setIndicator] = useState({ top: 0, height: 0, opacity: 0 });

  const activeHref = SECTIONS.find((s) => s.href === pathname)?.href;

  const moveIndicatorTo = useCallback((href) => {
    const el = itemRefs.current[href];
    const nav = navRef.current;
    if (!el || !nav) return;
    const elRect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    setIndicator({
      top: elRect.top - navRect.top,
      height: elRect.height,
      opacity: 1,
    });
  }, []);

  // "Magic pill" nav indicator: slides between items on hover, and snaps
  // back to the active section on mouse-leave/route change/resize.
  useEffect(() => {
    if (!activeHref) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const id = requestAnimationFrame(() => moveIndicatorTo(activeHref));
    const onResize = () => moveIndicatorTo(activeHref);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
    };
  }, [activeHref, collapsed, open, moveIndicatorTo]);

  const handleMouseLeave = () => {
    if (activeHref) moveIndicatorTo(activeHref);
    else setIndicator((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <>
      <button
        className="sb-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar menú de secciones" : "Abrir menú de secciones"}
        aria-expanded={open}
      >
        <span className="sb-toggle-bars" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="sb-toggle-label">Secciones</span>
      </button>

      {collapsed && (
        <button
          type="button"
          className="sb-reopen"
          onClick={() => setCollapsed(false)}
          aria-label="Mostrar panel de secciones"
        >
          <span className="sb-reopen-icon" aria-hidden>
            ›
          </span>
          <span className="sb-reopen-label">Secciones</span>
        </button>
      )}

      {open && <div className="sb-scrim" onClick={() => setOpen(false)} />}

      <aside
        className={`sb ${open ? "sb-open" : ""} ${collapsed ? "sb-collapsed" : ""}`}
      >
        <div className="sb-head">
          <div className="eyebrow">Propuesta · Secciones</div>
          <button
            type="button"
            className="sb-panel-btn sb-panel-btn-collapse"
            onClick={() => setCollapsed(true)}
            aria-label="Ocultar panel de secciones"
            title="Ocultar panel"
          >
            <span aria-hidden>‹</span>
            <span className="sb-panel-btn-label">Ocultar</span>
          </button>
          <button
            type="button"
            className="sb-panel-btn sb-panel-btn-close"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú de secciones"
            title="Cerrar"
          >
            <span aria-hidden>×</span>
          </button>
        </div>
        <nav className="sb-nav" ref={navRef} onMouseLeave={handleMouseLeave}>
          <div
            className="sb-indicator"
            style={{
              transform: `translateY(${indicator.top}px)`,
              height: indicator.height,
              opacity: indicator.opacity,
            }}
            aria-hidden="true"
          />
          {SECTIONS.map((s) => {
            const active = pathname === s.href;
            return (
              <Link
                key={s.href}
                href={s.href}
                ref={(el) => {
                  itemRefs.current[s.href] = el;
                }}
                className={`sb-item ${active ? "sb-item-active" : ""}`}
                onClick={() => setOpen(false)}
                onMouseEnter={() => moveIndicatorTo(s.href)}
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
