"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: "#283593",
      borderTop: "1px solid #7B1FA2",
      padding: "3rem 1rem",
      textAlign: "center",
      color: "#F3E5F5",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p>&copy; {currentYear} UiX Portfolio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
