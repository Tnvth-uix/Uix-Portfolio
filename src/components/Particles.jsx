"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#8C59FE", "#597AFF", "#00C4B3", "#ACE738"];

/* Subtle constellation-style particle field. Canvas-based, low density,
   connects nearby particles with faint lines for a technological feel. */
export default function Particles({
  count = 46,
  speed = 1,
  size = 1,
  particleOpacity = 0.6,
  linkOpacity = 0.14,
  linkDistance = 120,
  glow = false,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf;
    let w = 0;
    let h = 0;
    let particles = [];

    const resize = () => {
      const parent = canvas.parentElement;
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22 * speed,
        vy: (Math.random() - 0.5) * 0.22 * speed,
        r: (Math.random() * 1.5 + 0.6) * size,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    resize();
    init();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            ctx.strokeStyle = `rgba(140, 89, 254, ${linkOpacity * (1 - dist / linkDistance)})`;
            ctx.lineWidth = glow ? 1.25 : 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        if (glow) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        }
        ctx.globalAlpha = particleOpacity;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count, speed, size, particleOpacity, linkOpacity, linkDistance, glow]);

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />;
}
