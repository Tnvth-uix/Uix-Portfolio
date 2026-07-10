import { parseMarkdown } from "./markdown";
import { EXAMPLES } from "../data/examples";

const KEY = "uix.presentations.v1";
const IMG_KEY = "uix.images.v1";

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
  deleteDeckImages(slug);
}

/* ============================================================
   Section images — attached per business case + section index.
   Stored separately from deck content so they apply to both
   user-uploaded decks and seeded examples.
   Shape: { [slug]: { [sectionIndex]: { layout, images: [dataUrl] } } }
   ============================================================ */

function readImageStore() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(IMG_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeImageStore(data) {
  localStorage.setItem(IMG_KEY, JSON.stringify(data));
}

export function getDeckImages(slug) {
  return readImageStore()[slug] || {};
}

export function getSectionImages(slug, sectionIndex) {
  const deck = getDeckImages(slug);
  return deck[sectionIndex] || { layout: "single", images: [] };
}

export function addSectionImages(slug, sectionIndex, dataUrls) {
  const store = readImageStore();
  const deck = store[slug] || {};
  const sec = deck[sectionIndex] || { layout: "single", images: [] };
  sec.images = [...sec.images, ...dataUrls];
  deck[sectionIndex] = sec;
  store[slug] = deck;
  writeImageStore(store);
}

export function setSectionLayout(slug, sectionIndex, layout) {
  const store = readImageStore();
  const deck = store[slug] || {};
  const sec = deck[sectionIndex] || { layout: "single", images: [] };
  sec.layout = layout;
  deck[sectionIndex] = sec;
  store[slug] = deck;
  writeImageStore(store);
}

export function removeSectionImage(slug, sectionIndex, imgIndex) {
  const store = readImageStore();
  const deck = store[slug] || {};
  const sec = deck[sectionIndex];
  if (!sec) return;
  sec.images = sec.images.filter((_, i) => i !== imgIndex);
  deck[sectionIndex] = sec;
  store[slug] = deck;
  writeImageStore(store);
}

export function deleteDeckImages(slug) {
  const store = readImageStore();
  delete store[slug];
  writeImageStore(store);
}
