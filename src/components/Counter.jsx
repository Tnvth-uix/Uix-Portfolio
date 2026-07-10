"use client";

import { useEffect, useRef, useState } from "react";

/*
  Animates a metric string like "+40%" or "−86%" counting up from 0
  when it scrolls into view. Preserves sign prefix and unit suffix.
*/
export default function Counter({ value, duration = 1400 }) {
  const ref = useRef(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    const match = String(value).match(/^([+\-−]?)(\d+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, sign, numStr, suffix] = match;
    const target = parseInt(numStr, 10);
    setDisplay(`${sign}0${suffix}`);

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(`${sign}${Math.round(target * eased)}${suffix}`);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
