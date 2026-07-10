"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DeckCard from "../components/DeckCard";
import { getExamples, getUserDecks } from "../lib/store";

export default function Home() {
  const [decks, setDecks] = useState(getExamples());

  useEffect(() => {
    setDecks([...getExamples(), ...getUserDecks()]);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-blob">
          <span className="b1" />
          <span className="b2" />
        </div>
        <div className="wrap">
          <div className="eyebrow">Portafolio de presentaciones · UX/UI</div>
          <h1 className="display">
            Reportes que se
            <br />
            leen como <span className="grad-text">cine</span>.
          </h1>
          <p className="hero-lead">
            UiX convierte cada caso de estudio en una presentación de una sola
            página: escribes en Markdown, y aquí se vuelve un deck editorial listo
            para presumir.
          </p>
          <div className="hero-cta">
            <Link href="/projects" className="btn btn-primary">
              Ver presentaciones →
            </Link>
            <Link href="/upload" className="btn btn-ghost">
              Subir un reporte .md
            </Link>
          </div>

          <div className="stat-row">
            <div>
              <div className="n grad-text">8</div>
              <div className="l">Bloques por caso</div>
            </div>
            <div>
              <div className="n grad-text">100%</div>
              <div className="l">Markdown a deck</div>
            </div>
            <div>
              <div className="n grad-text">1</div>
              <div className="l">Página por proyecto</div>
            </div>
            <div>
              <div className="n grad-text">∞</div>
              <div className="l">Presentaciones</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DECKS */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Casos de estudio</div>
              <h2>Presentaciones destacadas</h2>
            </div>
            <Link href="/projects" className="btn btn-ghost">
              Ver todas
            </Link>
          </div>
          <div className="deck-grid">
            {decks.slice(0, 4).map((d, i) => (
              <DeckCard deck={d} index={i} key={d.slug} />
            ))}
            <Link href="/upload" className="deck-card upload">
              <div>
                <div className="plus">+</div>
                <h3>Sube tu reporte</h3>
                <p>
                  Arrastra un archivo <strong>.md</strong> con la estructura de
                  bloques y obtén una presentación al instante.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
