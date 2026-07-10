"use client";

const ACCENTS = [
  "#597aff",
  "#8c59fe",
  "#00c4b3",
  "#597aff",
  "#00c4b3",
  "#8c59fe",
  "#597aff",
  "#00c4b3",
];

export function getAccent(index) {
  return ACCENTS[index % ACCENTS.length];
}

/** @deprecated Use getAccent — kept for any legacy imports */
export function getPalette(index) {
  const accent = getAccent(index);
  return [accent, accent];
}

/** @deprecated Icons removed from deck cards */
export function getIcon() {
  return null;
}
