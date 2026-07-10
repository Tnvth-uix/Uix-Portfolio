"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DeckCard from "../../components/DeckCard";
import Counter from "../../components/Counter";
import Particles from "../../components/Particles";
import { getExamples, getAllDecks, deleteDeck } from "../../lib/store";
import { useAuth } from "../../contexts/AuthContext";

const CERTS = ["ISO 9001", "NN/g UX", "Google UX", "Baymard"];

/* Headline business cases (business impact up front) */
const CASES = [
  {
    metric: "+40%",
    copy: "más préstamos gracias a un diseño UX que combina autoservicio intuitivo y soporte con asesor virtual.",
    client: "Círculo Azteca",
    href: "/projects/afiliacion-unica-canal-de-adquisicion-circulo-azteca",
  },
  {
    metric: "+30%",
    copy: "ventas y atención en minutos: así rediseñamos la nueva experiencia móvil SAC de Grupo Elektra.",
    client: "Grupo Elektra · SAC",
    href: "/projects",
  },
  {
    metric: "−86%",
    copy: "en tiempo de contratación. La UX/UI que hizo a Reclutalia reclutar en tiempo récord.",
    client: "Reclutalia · Grupo Salinas",
    href: "/projects/reclutalia",
  },
];

/* Company proof — kept intentionally minimal */
const STATS = [
  { big: "+90", desc: "Business Cases entregados", icon: "/iconos/trofeo.png" },
  { big: "+20M", desc: "usuarios en las plataformas UiX", icon: "/iconos/usuario.png" },
  { big: "+9", desc: "años en México y LATAM", icon: "/iconos/reloj.png" },
  { big: "1er", desc: "en LATAM en ser nominada", icon: "/iconos/stars.png" },
];

/* Floating 3D icons scattered around the hero */
const HERO_ICONS = [
  { src: "/iconos/idea.png", cls: "hi-1" },
  { src: "/iconos/target.png", cls: "hi-2" },
  { src: "/iconos/gears.png", cls: "hi-3" },
  { src: "/iconos/design.png", cls: "hi-4" },
  { src: "/iconos/think.png", cls: "hi-5" },
];

export default function Home() {
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
    <main>
      {/* ================= COMPACT HERO ================= */}
      <section className="ihero ihero-compact">
        <Particles count={54} />
        <div className="wrap">
          <div className="eyebrow">Business Cases · UX/UI · México &amp; LATAM</div>
          <h1>
            No diseñamos pantallas, <span className="grad-text">Diseñamos experiencia de usuario</span>.
          </h1>
          <p className="lead">
            Transformacios procesos complicados en experiencias simples.
            Explora el impactor eal caso por caso.
          </p>
          <div className="hero-cta">
            <Link href="#casos" className="btn btn-grad">
              Ver Proyectos ↓
            </Link>
            <a href="mailto:contacto@uixdesign.com" className="btn btn-ghost">
              Hablemos
            </a>
          </div>

          <p className="cert-discreet">
            Certificados por {CERTS.join(" · ")}
          </p>
        </div>
      </section>

      {/* ================= HEADLINE CASES ================= */}
      <section className="sec" id="casos" style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <div className="eyebrow">Business Cases destacados</div>
          <h2 className="display-sm" style={{ margin: "16px 0 0", maxWidth: "22ch" }}>
            El impacto que genera un buen{" "}
            <span className="grad-text">diseño de experiencia</span>.
          </h2>

          <div className="cases">
            {CASES.map((c) => (
              <Link href={c.href} className="case" key={c.metric}>
                <div className="metric-big grad-text">
                  <Counter value={c.metric} />
                </div>
                <div className="copy">
                  {c.copy}
                  <span className="client">{c.client}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ALL BUSINESS CASES ================= */}
      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Explora la biblioteca</div>
              <h2>Todos los Proyectos</h2>
            </div>
            <Link href="/projects" className="btn btn-ghost">
              Ver todos →
            </Link>
          </div>
          <div className="deck-grid">
            {decks.slice(0, 4).map((d, i) => (
              <DeckCard deck={d} index={i} key={d.slug} onDelete={handleDelete} />
            ))}
            {mode === "admin" && (
              <Link href="/upload" className="deck-card upload">
                <div>
                  <div className="plus">+</div>
                  <h3>Nuevo Proyecto</h3>
                  <p>
                    Sube un reporte <strong>.md</strong> y conviértelo en un Business
                    Case al instante.
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ================= MINIMAL COMPANY PROOF ================= */}
      <section className="stats-band stats-band-slim">
        <div className="wrap">
          <div className="stats-slim">
            <div className="stats-slim-intro">
              <div className="eyebrow">UiX en números</div>
              <p>
                La agencia UX/UI para crear experiencias{" "}
                <span className="grad-text">memorables</span>.
              </p>
            </div>
            <div className="stats-grid stats-grid-4">
              {STATS.map((s) => (
                <div className="stat-cell" key={s.big}>
                  <img src={s.icon} alt="" className="stat-icon" />
                  <div className="big grad-text">
                    <Counter value={s.big} />
                  </div>
                  <div className="desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
