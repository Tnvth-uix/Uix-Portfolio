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

export function getPalette(index) {
  return PALETTES[index % PALETTES.length];
}

export function getIcon(index) {
  return ICONS[index % ICONS.length];
}
