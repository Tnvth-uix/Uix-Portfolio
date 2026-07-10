import { parseMarkdown } from "./markdown";
import { EXAMPLES } from "../data/examples";
import { supabase } from "./supabase";

const KEY = "uix.presentations.v1";
const IMG_KEY = "uix.images.v1";
const PENDING_KEY = "uix.pending.v1";
const TAX_KEY = "uix.taxonomy.v1";
const INTER_KEY = "uix.interstitials.v1";

// ============================================================
// Presentations / Decks
// ============================================================

export function getExamples() {
  return EXAMPLES.map((raw) => ({ ...parseMarkdown(raw), example: true, raw }));
}

export async function getUserDecks() {
  if (typeof window === "undefined") return [];

  // Try to fetch from Supabase first
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("business_cases")
        .select("id, slug, title, content, created_at, updated_at, is_example")
        .eq("is_example", false);

      if (error) throw error;

      if (data && data.length > 0) {
        const decks = data.map((row) => ({
          ...parseMarkdown(row.content),
          raw: row.content,
          savedAt: new Date(row.updated_at).getTime(),
          id: row.id,
        }));

        // Sync to localStorage for offline cache
        try {
          const existing = JSON.parse(localStorage.getItem(KEY) || "[]");
          const merged = Array.from(
            new Map([...existing, ...decks].map((d) => [d.slug, d])).values()
          );
          localStorage.setItem(KEY, JSON.stringify(merged));
        } catch {
          // localStorage error, continue with Supabase data
        }

        return decks;
      }
    } catch (err) {
      console.warn("Failed to fetch from Supabase, falling back to localStorage:", err);
    }
  }

  // Fallback to localStorage
  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
    return arr.map((d) => ({ ...parseMarkdown(d.raw), raw: d.raw, savedAt: d.savedAt }));
  } catch {
    return [];
  }
}

export async function getAllDecks() {
  const examples = getExamples();
  const userDecks = await getUserDecks();

  const bySlug = new Map();
  for (const d of examples) bySlug.set(d.slug, d);
  for (const d of userDecks) bySlug.set(d.slug, d);

  return [...bySlug.values()];
}

export async function getDeckBySlug(slug) {
  const allDecks = await getAllDecks();
  return allDecks.find((d) => d.slug === slug) || null;
}

export async function saveDeck(raw) {
  const parsed = parseMarkdown(raw);
  if (!parsed.slug) {
    throw new Error("El proyecto necesita un título (# Título) para poder guardarse.");
  }

  // Save to localStorage (cache)
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

  // Verify localStorage write
  const check = JSON.parse(localStorage.getItem(KEY) || "[]");
  const saved = check.find((d) => d.slug === parsed.slug);
  if (!saved) {
    throw new Error("El guardado no se confirmó. Intenta de nuevo.");
  }

  // Save to Supabase
  if (supabase) {
    try {
      const { data: existing } = await supabase
        .from("business_cases")
        .select("id")
        .eq("slug", parsed.slug)
        .single();

      if (existing?.id) {
        // Update existing
        await supabase
          .from("business_cases")
          .update({
            title: parsed.title || "Untitled",
            content: raw,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
      } else {
        // Insert new
        await supabase.from("business_cases").insert({
          slug: parsed.slug,
          title: parsed.title || "Untitled",
          content: raw,
          is_example: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn("Failed to save to Supabase, but localStorage saved:", err);
    }
  }

  return parsed;
}

export async function deleteDeck(slug) {
  // Delete from localStorage
  const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
  const filtered = arr.filter((d) => parseMarkdown(d.raw).slug !== slug);
  localStorage.setItem(KEY, JSON.stringify(filtered));

  // Delete associated data
  deleteDeckImages(slug);
  deleteDeckPending(slug);
  deleteDeckTaxonomy(slug);
  deleteDeckInterstitials(slug);

  // Delete from Supabase
  if (supabase) {
    try {
      const { data: deck } = await supabase
        .from("business_cases")
        .select("id")
        .eq("slug", slug)
        .single();

      if (deck?.id) {
        await supabase.from("business_cases").delete().eq("id", deck.id);
      }
    } catch (err) {
      console.warn("Failed to delete from Supabase:", err);
    }
  }
}

// ============================================================
// Section Images
// ============================================================

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

// ============================================================
// Pending Data Overrides
// ============================================================

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

// ============================================================
// Taxonomy Selection
// ============================================================

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

// ============================================================
// Fullscreen Interstitials
// ============================================================

function readInterStore() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(INTER_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeInterStore(data) {
  localStorage.setItem(INTER_KEY, JSON.stringify(data));
}

export function getDeckInterstitials(slug) {
  return readInterStore()[slug] || {};
}

export function setInterstitial(slug, afterIndex, dataUrl) {
  const store = readInterStore();
  const deck = { ...(store[slug] || {}) };
  deck[afterIndex] = dataUrl;
  store[slug] = deck;
  writeInterStore(store);
}

export function removeInterstitial(slug, afterIndex) {
  const store = readInterStore();
  const deck = { ...(store[slug] || {}) };
  delete deck[afterIndex];
  store[slug] = deck;
  writeInterStore(store);
}

export function deleteDeckInterstitials(slug) {
  const store = readInterStore();
  delete store[slug];
  writeInterStore(store);
}
