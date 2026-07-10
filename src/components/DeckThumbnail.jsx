"use client";

const PALETTES = [
  ["#6366f1", "#8b5cf6"],
  ["#3b82f6", "#06b6d4"],
  ["#ec4899", "#f97316"],
  ["#8b5cf6", "#3b82f6"],
  ["#06b6d4", "#10b981"],
  ["#f97316", "#eab308"],
  ["#ef4444", "#f97316"],
  ["#3b82f6", "#6366f1"],
];

const ICONS = [
  "id.png",
  "usuario.png",
  "care.png",
  "dinero.png",
  "gears.png",
  "bank.png",
  "ahorro.png",
  "whatsapp.png",
];

export default function DeckThumbnail({ index }) {
  const [color1, color2] = PALETTES[index % PALETTES.length];
  const icon = ICONS[index % ICONS.length];

  return (
    <div
      className="deck-thumbnail"
      style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}
    >
      <div className="deck-thumbnail-icon">
        <img src={`/iconos/${icon}`} alt="" />
      </div>
    </div>
  );
}
