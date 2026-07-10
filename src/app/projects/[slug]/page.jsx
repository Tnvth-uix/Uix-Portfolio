"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Presentation from "../../../components/Presentation";
import { getDeckBySlug } from "../../../lib/store";

export default function ProjectPage({ params }) {
  const [deck, setDeck] = useState(undefined); // undefined = loading

  useEffect(() => {
    async function loadDeck() {
      const loaded = await getDeckBySlug(params.slug);
      setDeck(loaded);
    }
    loadDeck();
  }, [params.slug]);

  if (deck === undefined) {
    return (
      <main className="sec">
        <div className="wrap">
          <p className="eyebrow">Cargando presentación…</p>
        </div>
      </main>
    );
  }

  if (!deck) {
    return (
      <main className="sec" style={{ minHeight: "70vh" }}>
        <div className="wrap" style={{ textAlign: "center", paddingTop: 60 }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            404
          </div>
          <h1 className="display-sm" style={{ margin: "18px 0 24px" }}>
            No encontramos ese Business Case.
          </h1>
          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <Link href="/projects" className="btn btn-primary">
              Ver todas
            </Link>
            <Link href="/upload" className="btn btn-ghost">
              Subir una nueva
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <Presentation deck={deck} />;
}
