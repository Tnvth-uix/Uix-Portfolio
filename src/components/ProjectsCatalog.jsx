"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DeckCard from "./DeckCard";
import { getExamples, getAllDecks, deleteDeck } from "../lib/store";
import { useAuth } from "../contexts/AuthContext";

export default function ProjectsCatalog() {
  const { mode } = useAuth();
  const [decks, setDecks] = useState(getExamples());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDecks() {
      const allDecks = await getAllDecks();
      setDecks(allDecks);
      setIsLoading(false);
    }
    loadDecks();
  }, []);

  const handleDelete = async (slug) => {
    await deleteDeck(slug);
    setDecks((prev) => prev.filter((d) => d.slug !== slug));
  };

  return (
    <div className="deck-grid" style={{ marginTop: 54 }}>
      {decks.map((d, i) => (
        <DeckCard deck={d} index={i} key={d.slug} onDelete={handleDelete} />
      ))}
      {mode === "admin" && (
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
  );
}
