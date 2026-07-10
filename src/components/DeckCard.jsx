"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { getPalette, getIcon } from "./DeckThumbnail";

export default function DeckCard({ deck, index, onDelete }) {
  const { mode } = useAuth();
  const [color1, color2] = getPalette(index);
  const icon = getIcon(index);

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`¿Eliminar "${deck.title}"? Esta acción no se puede deshacer.`)) {
      onDelete?.(deck.slug);
    }
  };

  return (
    <div
      className="deck-card"
      style={{ background: `linear-gradient(160deg, ${color1}, ${color2})` }}
    >
      <Link
        href={`/projects/${deck.slug}`}
        className="card-hit"
        aria-label={`Ver ${deck.title}`}
      />
      <div className="deck-card-icon">
        <img src={`/iconos/${icon}`} alt="" />
      </div>
      {!deck.example && mode === "admin" && (
        <button className="card-del" onClick={handleDelete} type="button">
          Eliminar
        </button>
      )}
      <div className="deck-card-scrim" />
      <div className="deck-card-body">
        <h3>{deck.title}</h3>
        <span className="go">
          Ver <span className="arw">→</span>
        </span>
      </div>
    </div>
  );
}
