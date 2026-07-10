"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Presentation({ deck }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const slideRefs = useRef([]);

  const total = deck.slides.length + 1; // + cover

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      // find active slide
      let cur = 0;
      slideRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = i;
      });
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i) => {
    slideRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="pres">
      <div className="progress" style={{ width: `${progress}%` }} />

      <div className="dots">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            className={i === active ? "active" : ""}
            onClick={() => goTo(i)}
            aria-label={`Ir a diapositiva ${i + 1}`}
          />
        ))}
      </div>

      {/* Cover */}
      <section
        className="slide slide-cover"
        ref={(el) => (slideRefs.current[0] = el)}
      >
        <div className="wrap">
          <div className="client-line">{deck.client}</div>
          <h1>{deck.title}</h1>
          <p className="sub">{deck.subtitle}</p>
        </div>
        <div className="scroll-hint">↓ Desplázate para recorrer el caso</div>
        <div className="slide-num">
          01 / {pad(total)}
        </div>
      </section>

      {/* Content slides */}
      {deck.slides.map((s, i) => (
        <section
          key={i}
          className="slide"
          ref={(el) => (slideRefs.current[i + 1] = el)}
        >
          <div className="wrap slide-body">
            <div className="slide-label">
              <div className="kn">{pad(i + 1)}</div>
              <h2>{s.title}</h2>
              <div className="bar" />
            </div>
            <div>
              {s.metrics.length > 0 && (
                <div className="metric-grid">
                  {s.metrics.map((m, j) => (
                    <div className="metric" key={j}>
                      <div className="v grad-text">{m.v}</div>
                      <div className="k">{m.k}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="md" dangerouslySetInnerHTML={{ __html: s.html }} />
            </div>
          </div>
          <div className="slide-num">
            {pad(i + 2)} / {pad(total)}
          </div>
        </section>
      ))}

      {/* Outro */}
      <section className="sec">
        <div className="wrap" style={{ textAlign: "center", padding: "40px 0" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Fin del Business Case
          </div>
          <h2 className="display-sm" style={{ margin: "18px 0 30px" }}>
            ¿Vemos otro <span className="grad-text">Business Case</span>?
          </h2>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/projects" className="btn btn-primary">
              Todos los Business Cases
            </Link>
            <Link href="/upload" className="btn btn-ghost">
              Subir el tuyo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
