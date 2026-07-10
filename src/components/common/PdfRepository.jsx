"use client";

import { useState } from "react";

export default function PdfRepository({ docs }) {
  const [active, setActive] = useState(docs[0] || null);

  if (!docs.length) {
    return <p className="pdf-empty">Aún no hay documentos cargados en este repositorio.</p>;
  }

  return (
    <div className="pdf-repo">
      <ul className="pdf-list">
        {docs.map((doc) => (
          <li key={doc.url}>
            <button
              className={`pdf-list-item ${active?.url === doc.url ? "pdf-list-item-active" : ""}`}
              onClick={() => setActive(doc)}
            >
              <span className="pdf-list-title">{doc.title}</span>
              {doc.subtitle && <span className="pdf-list-subtitle">{doc.subtitle}</span>}
            </button>
            <a
              className="pdf-download"
              href={doc.url}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar ↓
            </a>
          </li>
        ))}
      </ul>

      <div className="pdf-viewer">
        {active ? (
          <iframe key={active.url} src={active.url} title={active.title} />
        ) : (
          <p className="pdf-empty">Selecciona un documento para visualizarlo.</p>
        )}
      </div>
    </div>
  );
}
