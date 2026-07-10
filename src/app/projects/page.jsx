"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DeckCard from "../../components/DeckCard";
import { getExamples, getAllDecks, deleteDeck } from "../../lib/store";
import { isAdmin } from "../../lib/auth";

export default function ProjectsPage() {
  const [decks, setDecks] = useState(getExamples());
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setDecks(getAllDecks());
    setAdmin(isAdmin());
  }, []);

  const handleDelete = (slug) => {
    deleteDeck(slug);
    setDecks((prev) => prev.filter((d) => d.slug !== slug));
  };

  return (
    <main className="sec" style={{ paddingTop: 60 }}>
      <div className="wrap">
        <div className="eyebrow">Biblioteca</div>
        <h1 className="display-sm" style={{ margin: "16px 0 12px", maxWidth: "18ch" }}>
          Todos los <span className="grad-text">Business Cases</span>
        </h1>
        <p className="hero-lead" style={{ marginTop: 8 }}>
          Casos de negocio con estructura de 8 bloques. Cada uno se recorre como una
          landing de una sola página.
        </p>

        <div className="deck-grid" style={{ marginTop: 54 }}>
          {decks.map((d, i) => (
            <DeckCard deck={d} index={i} key={d.slug} onDelete={handleDelete} admin={admin} />
          ))}
          {admin && (
            <Link href="/upload" className="deck-card upload">
              <div>
                <div className="plus">+</div>
                <h3>Nuevo Business Case</h3>
                <p>
                  Sube un <strong>.md</strong> y aparecerá aquí junto a los demás.
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
