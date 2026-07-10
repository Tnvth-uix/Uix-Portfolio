"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import html2pdf from "html2pdf.js";
import ImageManager from "./ImageManager";
import TaxonomyBlock from "./TaxonomyBlock";
import {
  getDeckImages,
  deleteDeck,
  getPendingOverrides,
  savePendingOverride,
  getDeckInterstitials,
} from "../lib/store";
import { applyPendingOverrides } from "../lib/markdown";

const SceneBackground = dynamic(() => import("./SceneBackground"), { ssr: false });

export default function Presentation({ deck }) {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [imagesData, setImagesData] = useState({});
  const [pendingOverrides, setPendingOverrides] = useState({});
  const [interstitials, setInterstitials] = useState({});
  const [inView, setInView] = useState({});
  const [show3D, setShow3D] = useState(false);
  const slideRefs = useRef([]);
  const scrollFracRef = useRef(0);

  const total = deck.slides.length + 1; // + cover

  const refreshImages = () => {
    setImagesData(getDeckImages(deck.slug));
    setInterstitials(getDeckInterstitials(deck.slug));
  };

  useEffect(() => {
    refreshImages();
    setPendingOverrides(getPendingOverrides(deck.slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck.slug]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      scrollFracRef.current = h > 0 ? window.scrollY / h : 0;
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

  // Gate the 3D backdrop: skip entirely on reduced-motion, narrow viewports,
  // or low-end hardware so the chunk often isn't even downloaded.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.innerWidth < 768;
    const lowEnd = (navigator.hardwareConcurrency ?? 8) < 4 || (navigator.deviceMemory ?? 8) < 4;
    if (!reduced && !narrow && !lowEnd) setShow3D(true);
  }, []);

  // Progressive disclosure: reveal each slide's content the first time
  // it enters the viewport, instead of showing everything at once.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = slideRefs.current.indexOf(entry.target);
            if (idx !== -1) {
              setInView((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }));
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    slideRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [deck.slides.length]);

  const goTo = (i) => {
    slideRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteDeck = () => {
    if (confirm(`¿Eliminar "${deck.title}"? Esta acción no se puede deshacer.`)) {
      deleteDeck(deck.slug);
      router.push("/projects");
    }
  };

  const handleDownloadPDF = () => {
    const element = document.querySelector(".pres");
    if (!element) return;

    const opt = {
      margin: 10,
      filename: `${deck.title}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const handlePendingClick = (e) => {
    const chip = e.target.closest(".pending-mark");
    if (!chip) return;
    const key = chip.getAttribute("data-pending-key");
    const label = chip.getAttribute("data-pending-label");
    const current = pendingOverrides[key] || "";
    const value = window.prompt(`Completar: ${label}`, current);
    if (value !== null && value.trim()) {
      const next = savePendingOverride(deck.slug, key, value.trim());
      setPendingOverrides(next);
    }
  };

  const pad = (n) => String(n).padStart(2, "0");

  // Per-slide target opacity for the 3D backdrop: strong behind the cover,
  // faint behind photo slides (has-bg), medium behind plain-tone slides.
  const zoneOpacity = useMemo(() => {
    const arr = [0.55]; // cover
    deck.slides.forEach((_, i) => {
      const imgData = imagesData[i];
      const hasBg = imgData?.layout === "background" && imgData.images?.length > 0;
      arr.push(hasBg ? 0.12 : 0.4);
    });
    return arr;
  }, [deck.slides, imagesData]);

  return (
    <div className="pres">
      {show3D && (
        <SceneBackground scrollFracRef={scrollFracRef} targetOpacity={zoneOpacity[active] ?? 0.3} />
      )}
      <div className="progress" style={{ width: `${progress}%` }} />
      <div className="progress-pct">{Math.round(progress)}%</div>

      <ImageManager
        slug={deck.slug}
        sections={deck.slides.map((s) => s.title)}
        onChange={refreshImages}
      />

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

      <div className="chevron-nav">
        <button
          className="chevron-btn chevron-up"
          onClick={() => active > 0 && goTo(active - 1)}
          disabled={active === 0}
          aria-label="Slide anterior"
        >
          ↑
        </button>
        <button
          className="chevron-btn chevron-down"
          onClick={() => active < total - 1 && goTo(active + 1)}
          disabled={active === total - 1}
          aria-label="Siguiente slide"
        >
          ↓
        </button>
        <button
          className="chevron-btn"
          onClick={handleDownloadPDF}
          aria-label="Descargar como PDF"
          title="Descargar proyecto como PDF"
        >
          ⬇
        </button>
      </div>

      {/* Cover */}
      <section
        className="slide slide-cover"
        ref={(el) => (slideRefs.current[0] = el)}
      >
        <div className="tech-grid" />
        <div className="wrap">
          <h1 className="typing-caret">{deck.title}</h1>
          <p className="sub">{deck.subtitle}</p>
        </div>
        <div className="scroll-hint">↓ Desplázate para recorrer el caso</div>
        <div className="slide-num">
          01 / {pad(total)}
        </div>
      </section>

      {interstitials[-1] && (
        <section className="slide-fullscreen">
          <div className="fs-media" style={{ backgroundImage: `url(${interstitials[-1]})` }} />
          {deck.slides[0]?.title && (
            <div className="fs-caption">
              <div className="fs-caption-eyebrow">Siguiente escena</div>
              <p>{deck.slides[0].title}</p>
            </div>
          )}
        </section>
      )}

      {/* Content slides, with any fullscreen interstitials interleaved right after their section */}
      {deck.slides.flatMap((s, i) => {
        const imgData = imagesData[i];
        const bgImage =
          imgData?.layout === "background" && imgData.images?.length > 0
            ? imgData.images[0]
            : null;
        const revealed = !!inView[i];
        const tone = i % 2 === 0 ? "tone-a" : "tone-b";

        const nodes = [
          <section
            key={i}
            className={`slide ${revealed ? "in-view" : ""} ${
              bgImage ? "has-bg" : tone
            }`}
            style={
              bgImage
                ? {
                    backgroundImage: `linear-gradient(180deg, rgba(23,18,50,.78), rgba(23,18,50,.92)), url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
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
                      <div className="metric" key={j} style={{ "--i": j }}>
                        <div className="v grad-text">{m.v}</div>
                        <div className="k">{m.k}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div
                  className="md"
                  onClick={handlePendingClick}
                  dangerouslySetInnerHTML={{
                    __html: applyPendingOverrides(s.html, pendingOverrides),
                  }}
                />
                {i === 0 && <TaxonomyBlock slug={deck.slug} raw={deck.raw || ""} />}
                {!bgImage && imgData?.images?.length > 0 && (
                  <div className={`img-block layout-${imgData.layout || "single"}`}>
                    {imgData.images.map((src, k) => (
                      <img src={src} alt="" key={k} style={{ "--i": k }} />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="slide-num">
              {pad(i + 2)} / {pad(total)}
            </div>
          </section>,
        ];

        if (interstitials[i]) {
          nodes.push(
            <section key={`gap-${i}`} className="slide-fullscreen">
              <div className="fs-media" style={{ backgroundImage: `url(${interstitials[i]})` }} />
              {deck.slides[i + 1]?.title && (
                <div className="fs-caption">
                  <div className="fs-caption-eyebrow">Siguiente escena</div>
                  <p>{deck.slides[i + 1].title}</p>
                </div>
              )}
            </section>
          );
        }

        return nodes;
      })}

    </div>
  );
}
