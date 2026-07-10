import { parseMarkdown } from "./markdown";
import { EXAMPLES } from "../data/examples";

const KEY = "uix.presentations.v1";

/* Example decks are always available and marked read-only. */
export function getExamples() {
  return EXAMPLES.map((raw) => ({ ...parseMarkdown(raw), example: true, raw }));
}

/* User decks live in localStorage as raw markdown + slug. */
export function getUserDecks() {
  if (typeof window === "undefined") return [];
  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
    return arr.map((d) => ({ ...parseMarkdown(d.raw), raw: d.raw, savedAt: d.savedAt }));
  } catch {
    return [];
  }
}

/* Merges examples + user decks, de-duplicated by slug (user decks win). */
export function getAllDecks() {
  const bySlug = new Map();
  for (const d of getExamples()) bySlug.set(d.slug, d);
  for (const d of getUserDecks()) bySlug.set(d.slug, d);
  return [...bySlug.values()];
}

export function getDeckBySlug(slug) {
  return getAllDecks().find((d) => d.slug === slug) || null;
}

export function saveDeck(raw) {
  const parsed = parseMarkdown(raw);
  const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
  const filtered = arr.filter((d) => parseMarkdown(d.raw).slug !== parsed.slug);
  filtered.push({ raw, slug: parsed.slug, savedAt: Date.now() });
  localStorage.setItem(KEY, JSON.stringify(filtered));
  return parsed;
}

export function deleteDeck(slug) {
  const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
  const filtered = arr.filter((d) => parseMarkdown(d.raw).slug !== slug);
  localStorage.setItem(KEY, JSON.stringify(filtered));
}
