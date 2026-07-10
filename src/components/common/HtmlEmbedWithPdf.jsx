"use client";

import { useRef, useState } from "react";
import { printElement } from "../../lib/exportPdf";

export default function HtmlEmbedWithPdf({ html, filename, label = "Descargar PDF" }) {
  const containerRef = useRef(null);
  const [error, setError] = useState("");

  const handleDownload = () => {
    const element = containerRef.current;
    if (!element) return;

    setError("");
    try {
      printElement(element, filename);
    } catch {
      setError("No se pudo generar el PDF. Intenta de nuevo.");
    }
  };

  return (
    <div className="embed-report">
      <div className="embed-report-actions">
        <button type="button" className="btn btn-ghost embed-pdf-btn" onClick={handleDownload}>
          {label} ↓
        </button>
        {error && <span className="embed-pdf-error">{error}</span>}
      </div>
      <div
        ref={containerRef}
        className="embed-card-dark"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
