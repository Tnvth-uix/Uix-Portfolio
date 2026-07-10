"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function DeckCard({ deck, index, onDelete }) {
  const { mode } = useAuth();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`¿Eliminar "${deck.title}"? Esta acción no se puede deshacer.`)) {
      onDelete?.(deck.slug);
    }
  };

  return (
    <div className="deck-card">
      <Link
        href={`/projects/${deck.slug}`}
        className="card-hit"
        aria-label={`Ver ${deck.title}`}
      />
      <div className="deck-card-top">
        <div className="idx">{String(index + 1).padStart(2, "0")}</div>
        {!deck.example && mode === "admin" && (
          <button className="card-del" onClick={handleDelete} type="button">
            Eliminar
          </button>
        )}
      </div>
      <div className="deck-card-body">
        <div className="client">{deck.client}</div>
        <h3>{deck.title}</h3>
        <p>{deck.subtitle}</p>
        <div className="tag-row">
          {deck.slides.slice(0, 4).map((s, i) => (
            <span className="tag" key={i}>
              {s.title}
            </span>
          ))}
        </div>
      </div>
      <span className="go">
        Ver Business Case <span className="arw">→</span>
      </span>
    </div>
  );
}
