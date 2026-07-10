"use client";

import { useRef, useState } from "react";
import { printIframe } from "../../lib/exportPdf";

export default function EmbeddedApp({
  src,
  title,
  pdfFilename,
  pdfLabel = "Descargar PDF",
}) {
  const iframeRef = useRef(null);
  const [iframeReady, setIframeReady] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = () => {
    const iframe = iframeRef.current;
    if (!iframe || !pdfFilename || !iframeReady) return;

    setError("");
    try {
      printIframe(iframe, pdfFilename);
    } catch {
      setError("No se pudo generar el PDF. Intenta de nuevo.");
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
            disabled={!iframeReady}
          >
            {pdfLabel} ↓
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
