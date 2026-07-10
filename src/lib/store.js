import { parseMarkdown } from "./markdown";
import { EXAMPLES } from "../data/examples";

const KEY = "uix.presentations.v1";
const IMG_KEY = "uix.images.v1";
const PENDING_KEY = "uix.pending.v1";
const TAX_KEY = "uix.taxonomy.v1";

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
  if (!parsed.slug) {
    throw new Error("El proyecto necesita un título (# Título) para poder guardarse.");
  }

  let arr = [];
  try {
    arr = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (!Array.isArray(arr)) arr = [];
  } catch {
    arr = [];
  }

  const filtered = arr.filter((d) => {
    try {
      return parseMarkdown(d.raw).slug !== parsed.slug;
    } catch {
      return true;
    }
  });
  filtered.push({ raw, slug: parsed.slug, savedAt: Date.now() });

  try {
    localStorage.setItem(KEY, JSON.stringify(filtered));
  } catch (err) {
    throw new Error(
      "No se pudo guardar en este navegador (¿espacio de almacenamiento lleno?)."
    );
  }

  // Verify the write actually landed before trusting it.
  const check = JSON.parse(localStorage.getItem(KEY) || "[]");
  const saved = check.find((d) => d.slug === parsed.slug);
  if (!saved) {
    throw new Error("El guardado no se confirmó. Intenta de nuevo.");
  }

  return parsed;
}

export function deleteDeck(slug) {
  const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
  const filtered = arr.filter((d) => parseMarkdown(d.raw).slug !== slug);
  localStorage.setItem(KEY, JSON.stringify(filtered));
  deleteDeckImages(slug);
  deleteDeckPending(slug);
  deleteDeckTaxonomy(slug);
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

/* ============================================================
   Pending-data overrides — fills for [PENDIENTE]/[TODO]/[FALTA]
   markers, keyed by deck slug + marker key.
   Shape: { [slug]: { [markerKey]: value } }
   ============================================================ */

function readPendingStore() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(PENDING_KEY) || "{}");
  } catch {
    return {};
  }
}

function writePendingStore(data) {
  localStorage.setItem(PENDING_KEY, JSON.stringify(data));
}

export function getPendingOverrides(slug) {
  return readPendingStore()[slug] || {};
}

export function savePendingOverride(slug, key, value) {
  const store = readPendingStore();
  store[slug] = { ...(store[slug] || {}), [key]: value };
  writePendingStore(store);
  return store[slug];
}

export function deleteDeckPending(slug) {
  const store = readPendingStore();
  delete store[slug];
  writePendingStore(store);
}

/* ============================================================
   Taxonomy selection — which services / methodologies / methods
   apply to a business case. Seeded once from the raw markdown text
   (substring match), then editable and persisted per slug.
   Shape: { [slug]: { [field]: [item, ...] } }
   ============================================================ */

function readTaxStore() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(TAX_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeTaxStore(data) {
  localStorage.setItem(TAX_KEY, JSON.stringify(data));
}

function autoDetect(raw, items) {
  const text = String(raw || "").toLowerCase();
  return items.filter((item) => text.includes(item.toLowerCase()));
}

/* fieldsWithItems: { [field]: string[] } — the master catalog per field. */
export function getTaxonomySelection(slug, fieldsWithItems, raw) {
  const store = readTaxStore();
  if (store[slug]) return store[slug];
  const seeded = {};
  for (const [field, items] of Object.entries(fieldsWithItems)) {
    seeded[field] = autoDetect(raw, items);
  }
  store[slug] = seeded;
  writeTaxStore(store);
  return seeded;
}

export function toggleTaxonomyItem(slug, field, item) {
  const store = readTaxStore();
  const current = store[slug] || {};
  const list = current[field] || [];
  current[field] = list.includes(item)
    ? list.filter((x) => x !== item)
    : [...list, item];
  store[slug] = current;
  writeTaxStore(store);
  return current[field];
}

export function deleteDeckTaxonomy(slug) {
  const store = readTaxStore();
  delete store[slug];
  writeTaxStore(store);
}
