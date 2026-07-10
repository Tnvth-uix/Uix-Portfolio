"use client";

import { useRef, useState } from "react";
import { exportElementToPdf } from "../../lib/exportPdf";

export default function HtmlEmbedWithPdf({ html, filename, label = "Descargar PDF" }) {
  const containerRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    const element = containerRef.current;
    if (!element || downloading) return;

    setDownloading(true);
    setError("");
    try {
      await exportElementToPdf(element, filename);
    } catch {
      setError("No se pudo generar el PDF. Intenta de nuevo.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="embed-report">
      <div className="embed-report-actions">
        <button
          type="button"
          className="btn btn-ghost embed-pdf-btn"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? "Generando PDF…" : `${label} ↓`}
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
