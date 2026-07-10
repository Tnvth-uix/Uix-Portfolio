"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header style={{
      backgroundColor: "#283593",
      borderBottom: "1px solid #7B1FA2",
      padding: "1rem",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img src="/logo.png" alt="UiX" width={40} height={40} />
          <span style={{ fontSize: "1.25rem", fontWeight: "bold", background: "linear-gradient(to right, #00E676, #00BFA5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            UiX
          </span>
        </Link>
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link href="/" style={{ color: "#F3E5F5" }}>Inicio</Link>
          <Link href="/projects" style={{ color: "#F3E5F5" }}>Proyectos</Link>
        </nav>
      </div>
    </header>
  );
}
