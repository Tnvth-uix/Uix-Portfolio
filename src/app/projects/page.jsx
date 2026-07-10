"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DeckCard from "../../components/DeckCard";
import { getExamples, getUserDecks } from "../../lib/store";

export default function ProjectsPage() {
  const [decks, setDecks] = useState(getExamples());

  useEffect(() => {
    setDecks([...getExamples(), ...getUserDecks()]);
  }, []);

  return (
    <main className="sec" style={{ paddingTop: 60 }}>
      <div className="wrap">
        <div className="eyebrow">Portafolio</div>
        <h1 className="display-sm" style={{ margin: "16px 0 12px", maxWidth: "18ch" }}>
          Todas las <span className="grad-text">presentaciones</span>
        </h1>
        <p className="hero-lead" style={{ marginTop: 8 }}>
          Casos de estudio construidos con la estructura de 8 bloques. Cada uno se
          recorre como una landing page de una sola página.
        </p>

        <div className="deck-grid" style={{ marginTop: 54 }}>
          {decks.map((d, i) => (
            <DeckCard deck={d} index={i} key={d.slug} />
          ))}
          <Link href="/upload" className="deck-card upload">
            <div>
              <div className="plus">+</div>
              <h3>Nueva presentación</h3>
              <p>
                Sube un <strong>.md</strong> y aparecerá aquí junto a las demás.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
