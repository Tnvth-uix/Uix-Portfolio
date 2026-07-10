"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { parseMarkdown } from "../../lib/markdown";
import { saveDeck, getUserDecks, deleteDeck } from "../../lib/store";
import { useAuth } from "../../contexts/AuthContext";

const SAMPLE = `# Mi Proyecto
> Cliente · Una línea que describe el caso

## Datos Generales
**Cliente** Nombre del cliente
**Proyecto** Nombre del proyecto

Descripción general del alcance en 2–4 líneas.

### Servicios
- Diseño de experiencia UX
- Diseño de interfaz UI

## Objetivo y Reto
### Objetivo
Qué buscábamos lograr.

### Reto
El principal obstáculo a resolver.

## Resultados
- 30% — Reducción de tiempos
- 92% — Tasa de éxito

Impacto en negocio: [FALTA: cifra de conversión]
`;

export default function UploadPage() {
  const router = useRouter();
  const { mode } = useAuth();
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    if (mode !== "admin") {
      router.push("/");
      return;
    }
    async function loadDecks() {
      const decks = await getUserDecks();
      setSaved(decks);
    }
    loadDecks();
  }, [mode, router]);

  const handleRaw = (raw) => {
    setError("");
    try {
      const parsed = parseMarkdown(raw);
      if (!parsed.slides.length) {
        setError(
          "No se detectaron secciones. Usa encabezados ## para cada bloque."
        );
        return;
      }
      setPreview({ ...parsed, raw });
    } catch {
      setError("No pudimos leer el archivo. ¿Es un Markdown válido?");
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!/\.(md|markdown|txt)$/i.test(file.name)) {
      setError("Sube un archivo .md, .markdown o .txt");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => handleRaw(e.target.result);
    reader.readAsText(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const [saving, setSaving] = useState(false);

  const confirmSave = async () => {
    if (!preview || saving) return;
    setSaving(true);
    setError("");
    try {
      const parsed = await saveDeck(preview.raw);
      router.push(`/projects/${parsed.slug}`);
    } catch (err) {
      setSaving(false);
      setError(err?.message || "No se pudo guardar el Business Case. Intenta de nuevo.");
    }
  };

  const removeSaved = async (slug) => {
    await deleteDeck(slug);
    const decks = await getUserDecks();
    setSaved(decks);
  };

  return (
    <main className="up">
      <div className="wrap">
        <div className="eyebrow">Nuevo Business Case</div>
        <h1>
          De <span className="grad-text">Markdown</span>
          <br />a Business Case.
        </h1>
        <p className="up-lead">
          Sube un reporte con la estructura de bloques y lo convertimos en un
          Business Case editorial de una sola página. Se guarda en este navegador.
        </p>

        {/* Dropzone */}
        <div
          className={`dropzone ${drag ? "drag" : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
        >
          <div className="ic">↑</div>
          <h3>Arrastra tu archivo .md aquí</h3>
          <p>o haz clic para elegirlo · .md · .markdown · .txt</p>
          <input
            ref={inputRef}
            type="file"
            accept=".md,.markdown,.txt"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        {error && (
          <p style={{ color: "#e5484d", marginTop: 16, fontWeight: 700 }}>
            {error}
          </p>
        )}

        <div className="up-actions">
          <button
            className="btn btn-ghost"
            onClick={() => handleRaw(SAMPLE)}
            type="button"
          >
            Probar con un ejemplo
          </button>
        </div>

        {/* Preview */}
        {preview && (
          <div style={{ marginTop: 40 }}>
            <div className="sec-head" style={{ marginBottom: 20 }}>
              <div>
                <div className="eyebrow">Vista previa</div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginTop: 10 }}>
                  {preview.title}
                </h2>
              </div>
              <button
                className="btn btn-grad"
                onClick={confirmSave}
                type="button"
                disabled={saving}
              >
                {saving ? "Guardando…" : "Guardar y ver →"}
              </button>
            </div>
            <p style={{ color: "var(--ink-soft)", marginBottom: 18 }}>
              <strong>{preview.client}</strong> · {preview.slides.length}{" "}
              diapositivas detectadas
            </p>
            <div className="tag-row">
              {preview.slides.map((s, i) => (
                <span className="tag" key={i}>
                  {String(i + 1).padStart(2, "0")} · {s.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Saved decks */}
        {saved.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <div className="eyebrow">Guardadas en este navegador</div>
            <div className="saved-list">
              {saved.map((d) => (
                <div className="saved-item" key={d.slug}>
                  <div>
                    <div className="nm">{d.title}</div>
                    <div className="ft-meta">
                      {d.client} · {d.slides.length} diapositivas
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <Link href={`/projects/${d.slug}`} className="go">
                      Ver →
                    </Link>
                    <button className="del" onClick={() => removeSaved(d.slug)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Format hint */}
        <div className="hint-card">
          <h4>Estructura recomendada del Markdown</h4>
          <pre>{`# Título del proyecto
> Cliente · Descripción en una línea

## Datos Generales
...contenido...

## Objetivo y Reto
### Objetivo
...
### Reto
...

## Resultados
- 30% — Reducción de tiempos
- 92% — Tasa de éxito`}</pre>
        </div>

        <div className="hint-card">
          <h4>Marca datos pendientes o faltantes</h4>
          <p style={{ color: "var(--ink-soft)", marginBottom: 12, fontSize: "0.92rem" }}>
            Usa <strong>[PENDIENTE]</strong>, <strong>[TODO]</strong> o{" "}
            <strong>[FALTA: descripción]</strong> donde falte información. Se
            muestran como chips clicables dentro del Business Case para
            completarlos ahí mismo.
          </p>
          <pre>{`## Resultados
Impacto de negocio: [FALTA: cifra de conversión]
Tiempo promedio: [PENDIENTE]`}</pre>
        </div>
      </div>
    </main>
  );
}
