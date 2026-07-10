"use client";

import { useRef, useState } from "react";
import { exportElementToPdf } from "../../lib/exportPdf";

export default function EmbeddedApp({
  src,
  title,
  pdfFilename,
  pdfLabel = "Descargar PDF",
}) {
  const iframeRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    const iframe = iframeRef.current;
    if (!iframe || downloading || !pdfFilename || !iframeReady) return;

    const doc = iframe.contentDocument;
    const element = doc?.getElementById("root") || doc?.body;
    if (!element) {
      setError("Espera a que termine de cargar el reporte.");
      return;
    }

    setDownloading(true);
    setError("");
    try {
      await exportElementToPdf(element, pdfFilename);
    } catch {
      setError("No se pudo generar el PDF. Intenta de nuevo.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className={pdfFilename ? "embed-report" : undefined}>
      {pdfFilename && (
        <div className="embed-report-actions">
          <button
            type="button"
            className="btn btn-ghost embed-pdf-btn"
            onClick={handleDownload}
            disabled={downloading || !iframeReady}
          >
            {downloading ? "Generando PDF…" : `${pdfLabel} ↓`}
          </button>
          {error && <span className="embed-pdf-error">{error}</span>}
        </div>
      )}
      <div className="embed-frame">
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          loading="lazy"
          onLoad={() => setIframeReady(true)}
        />
      </div>
    </div>
  );
}
