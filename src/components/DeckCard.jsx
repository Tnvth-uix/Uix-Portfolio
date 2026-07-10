"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { getAccent } from "./DeckThumbnail";

export default function DeckCard({ deck, index, onDelete }) {
  const { mode } = useAuth();
  const accent = getAccent(index);

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`¿Eliminar "${deck.title}"? Esta acción no se puede deshacer.`)) {
      onDelete?.(deck.slug);
    }
  };

  return (
    <div className="deck-card" style={{ "--deck-accent": accent }}>
      <Link
        href={`/projects/${deck.slug}`}
        className="card-hit"
        aria-label={`Ver ${deck.title}`}
      />
      <span className="deck-card-bar" aria-hidden />
      <div className="deck-card-main">
        <div className="deck-card-meta">
          <span className="deck-card-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="deck-card-chip">{deck.example ? "Reporte" : "Case"}</span>
        </div>
        <h3>{deck.title}</h3>
      </div>
      <span className="go" aria-hidden>
        <span className="arw">→</span>
      </span>
      {!deck.example && mode === "admin" && (
        <button className="card-del" onClick={handleDelete} type="button">
          Eliminar
        </button>
      )}
    </div>
  );
}
