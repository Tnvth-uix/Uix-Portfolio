"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered reveal. Uses the existing `.reveal` / `.reveal.in` CSS
 * tokens so motion stays consistent and respects reduced-motion.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.12,
  y = 28,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -48px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "in" : ""} ${className}`.trim()}
      style={{
        "--reveal-y": `${y}px`,
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
