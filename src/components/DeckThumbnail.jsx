"use client";

import { useEffect, useRef } from "react";

export default function DeckThumbnail({ title, index }) {
  const canvasRef = useRef(null);

  const palettes = [
    { bg1: "#6366f1", bg2: "#8b5cf6", accent: "#60a5fa" },
    { bg1: "#3b82f6", bg2: "#06b6d4", accent: "#34d399" },
    { bg1: "#ec4899", bg2: "#f97316", accent: "#fbbf24" },
    { bg1: "#8b5cf6", bg2: "#3b82f6", accent: "#60a5fa" },
    { bg1: "#06b6d4", bg2: "#10b981", accent: "#34d399" },
    { bg1: "#f97316", bg2: "#eab308", accent: "#fbbf24" },
    { bg1: "#ef4444", bg2: "#f97316", accent: "#fbbf24" },
    { bg1: "#3b82f6", bg2: "#6366f1", accent: "#a78bfa" },
  ];

  const palette = palettes[index % palettes.length];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, palette.bg1);
    grad.addColorStop(1, palette.bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Geometric shapes
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = "white";

    // Circles
    ctx.beginPath();
    ctx.arc(w * 0.8, h * 0.2, 80, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(w * 0.15, h * 0.85, 120, 0, Math.PI * 2);
    ctx.fill();

    // Lines
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.3);
    ctx.lineTo(w * 0.6, h * 0.3);
    ctx.stroke();

    ctx.globalAlpha = 1;

    // Main title
    const words = title.split(" ");
    const lines = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      ctx.font = "bold 28px system-ui, -apple-system, sans-serif";
      const metrics = ctx.measureText(testLine);

      if (metrics.width > w - 40 && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const totalHeight = lines.length * 32;
    let startY = h / 2 - totalHeight / 2;

    lines.forEach((line, idx) => {
      ctx.font = "bold 28px system-ui, -apple-system, sans-serif";
      ctx.fillText(line, w / 2, startY + idx * 36);
    });

    // Accent line below title
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 40, startY + lines.length * 36 + 16);
    ctx.lineTo(w / 2 + 40, startY + lines.length * 36 + 16);
    ctx.stroke();
  }, [title, index, palette]);

  return (
    <canvas
      ref={canvasRef}
      className="deck-thumbnail"
      width={400}
      height={300}
    />
  );
}
