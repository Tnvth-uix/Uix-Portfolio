"use client";

import { useRef, useState } from "react";
import {
  getSectionImages,
  addSectionImages,
  setSectionLayout,
  removeSectionImage,
} from "../lib/store";

const LAYOUTS = [
  { id: "single", label: "Una imagen grande" },
  { id: "grid2", label: "Cuadrícula 2 columnas" },
  { id: "row", label: "Carrusel horizontal" },
  { id: "background", label: "Fondo de sección" },
];

export default function ImageManager({ slug, sections, onChange }) {
  const [open, setOpen] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);
  const inputRef = useRef(null);

  const current = getSectionImages(slug, sectionIndex);

  const handleFiles = (files) => {
    const list = [...files].filter((f) => f.type.startsWith("image/"));
    if (!list.length) return;
    list.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        addSectionImages(slug, sectionIndex, [e.target.result]);
        onChange?.();
      };
      reader.readAsDataURL(file);
    });
  };

  const setLayout = (layout) => {
    setSectionLayout(slug, sectionIndex, layout);
    onChange?.();
  };

  const removeImg = (i) => {
    removeSectionImage(slug, sectionIndex, i);
    onChange?.();
  };

  return (
    <>
      <button className="img-fab" onClick={() => setOpen(true)} type="button">
        🖼 Imágenes
      </button>

      {open && (
        <div className="img-modal-backdrop" onClick={() => setOpen(false)}>
          <div className="img-modal" onClick={(e) => e.stopPropagation()}>
            <div className="img-modal-head">
              <h4>Imágenes por sección</h4>
              <button
                className="img-modal-close"
                onClick={() => setOpen(false)}
                type="button"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <label className="img-modal-label">Sección</label>
            <select
              value={sectionIndex}
              onChange={(e) => setSectionIndex(Number(e.target.value))}
            >
              {sections.map((title, i) => (
                <option value={i} key={i}>
                  {String(i + 1).padStart(2, "0")} · {title}
                </option>
              ))}
            </select>

            <label className="img-modal-label">Acomodo</label>
            <div className="img-layout-row">
              {LAYOUTS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className={`img-layout-btn ${current.layout === l.id ? "active" : ""}`}
                  onClick={() => setLayout(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {current.layout === "background" && (
              <p className="img-hint">Se usa solo la primera imagen como fondo.</p>
            )}

            <label className="img-modal-label">Subir imagen</label>
            <div
              className="img-drop"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFiles(e.dataTransfer.files);
              }}
            >
              + Arrastra o haz clic para subir
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {current.images.length > 0 && (
              <div className="img-thumbs">
                {current.images.map((src, i) => (
                  <div className="img-thumb" key={i}>
                    <img src={src} alt="" />
                    <button onClick={() => removeImg(i)} type="button" aria-label="Quitar imagen">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
