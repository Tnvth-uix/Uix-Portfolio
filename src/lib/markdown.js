import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: true });

/* Slugify a title into a URL-safe id */
export function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/*
  Cleans up section titles: strips a leading "Bloque N — " prefix and a
  leading plain "N. " numbering, then normalizes any "Portada / Índice"
  variant down to a plain "Índice".
*/
function stripBlockPrefix(title) {
  let clean = title
    .replace(/^\s*bloque\s*\d+\s*[:\-—–]*\s*/i, "")
    .replace(/^\s*\d+\s*[.)]\s*/, "")
    .trim();
  if (/^portada\s*\/\s*índice$/i.test(clean)) clean = "Índice";
  return clean || title;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/*
  Convention for uploaded markdown:

    # Project Title
    > Client · one-line description        (optional blockquote sub-line)

    ## Section name
    ...content (markdown)...

    ## Another section
    ...

  The H1 becomes the cover slide. Every H2 becomes its own slide.
  Content between H2s is rendered as markdown (bold, lists, links, quotes).

  Missing/pending data can be marked inline as [PENDIENTE], [TODO] or
  [FALTA: descripción] — these render as clickable chips the viewer can
  fill in, persisted locally per project.
*/
export function parseMarkdown(raw) {
  const text = String(raw).replace(/\r\n/g, "\n").trim();
  const lines = text.split("\n");

  let title = "Presentación sin título";
  let client = "";
  let subtitle = "";
  const sections = [];
  let current = null;
  let sawTitle = false;

  for (const line of lines) {
    const h1 = line.match(/^#\s+(.*)/);
    const h2 = line.match(/^##\s+(.*)/);

    if (h1) {
      title = h1[1].trim();
      sawTitle = true;
      continue;
    }
    if (h2) {
      current = { title: stripBlockPrefix(h2[1].trim()), lines: [] };
      sections.push(current);
      continue;
    }
    // Blockquote right after the H1 (before any H2) = subtitle/client line
    if (!current && sawTitle) {
      const q = line.match(/^>\s*(.*)/);
      if (q && q[1].trim()) {
        const val = q[1].trim();
        if (!client) {
          // Split "Client · description" on middot / dash / pipe
          const parts = val.split(/\s*[·|—–-]\s*/);
          client = parts.shift().trim();
          subtitle = parts.join(" · ").trim();
        } else {
          subtitle = subtitle ? subtitle + " " + val : val;
        }
        continue;
      }
    }
    if (current) current.lines.push(line);
  }

  let pendingCounter = 0;
  const slides = sections
    .map((s, sIndex) => {
      const body = s.lines.join("\n").trim();
      if (!body && !s.title) return null;
      const withHeadings = boldLineToHeading(body);
      const withMeta = markMetaRow(withHeadings);
      const withMarkers = markPending(withMeta, sIndex, () => pendingCounter++);
      return {
        title: s.title,
        html: marked.parse(withMarkers),
        metrics: extractMetrics(body),
      };
    })
    .filter(Boolean);

  return {
    title,
    client: client || "UiX",
    subtitle: subtitle || "Caso de estudio de diseño de experiencia.",
    slug: slugify(title),
    slides,
  };
}

/*
  A line that is ENTIRELY a bold run (e.g. "**¿Cómo lo resolvimos?**" on
  its own line) reads as a lead-in label, not real prose. Promoting it to
  a proper H3 lets it pick up the small-caps + card treatment automatically,
  turning flat Q&A-style content into distinct visual groups.
*/
function boldLineToHeading(body) {
  return body.replace(/^\*\*([^\n*]+)\*\*\s*$/gm, "### $1");
}

/*
  Turns an adjacent "**Cliente** X" / "**Proyecto** Y" pair (as commonly
  found at the top of "Datos Generales") into a two-chip visual block
  instead of a plain paragraph.
*/
function markMetaRow(body) {
  return body.replace(
    /\*\*Cliente\*\*\s*([^\n]+)\n\*\*Proyecto\*\*\s*([^\n]+)/i,
    (_m, cliente, proyecto) => `<div class="meta-row">
  <div class="meta-chip">
    <span class="meta-k">Cliente</span>
    <span class="meta-v">${escapeHtml(cliente.trim())}</span>
  </div>
  <div class="meta-chip meta-chip-accent">
    <span class="meta-k">Proyecto</span>
    <span class="meta-v">${escapeHtml(proyecto.trim())}</span>
  </div>
</div>`
  );
}

/*
  Replaces [PENDIENTE], [TODO] and [FALTA: label] markers with a stable,
  clickable inline chip. The key is deterministic (slide index + order)
  so a saved override always maps back to the right marker on re-parse.
*/
function markPending(body, slideIndex, nextId) {
  return body.replace(
    /\[(PENDIENTE|TODO|FALTA)\s*:?\s*([^\]]*)\]/gi,
    (_match, kind, label) => {
      const key = `s${slideIndex}-${nextId()}`;
      const cleanLabel = (label || kind).trim() || "Falta información";
      return `<span class="pending-mark" data-pending-key="${key}" data-pending-label="${escapeHtml(
        cleanLabel
      )}">⚠ ${escapeHtml(cleanLabel)} <em>✎ editar</em></span>`;
    }
  );
}

/*
  Heuristic: pull out standalone "NN% — label" or "**Label** value" style
  metrics so we can render big number cards. Kept conservative so it only
  fires on clearly numeric bullet lines.
*/
function extractMetrics(body) {
  const metrics = [];
  const re = /^[-*]\s+(?:\*\*)?([\d.,]+\s?%?|[\d.,]+\/\d+)(?:\*\*)?\s*[—–-]\s*(.+)$/gm;
  let m;
  while ((m = re.exec(body)) !== null) {
    metrics.push({ v: m[1].trim(), k: m[2].replace(/\*\*/g, "").trim() });
  }
  return metrics.length >= 2 && metrics.length <= 6 ? metrics : [];
}

/*
  Substitutes already-saved override values into rendered pending-mark
  spans. Called at render time (not parse time) so it can react to
  localStorage without re-parsing the whole deck.
*/
export function applyPendingOverrides(html, overrides) {
  if (!overrides || !Object.keys(overrides).length) return html;
  return html.replace(
    /<span class="pending-mark" data-pending-key="([^"]+)" data-pending-label="([^"]*)">.*?<\/span>/g,
    (match, key, label) => {
      const val = overrides[key];
      if (!val) return match;
      return `<span class="pending-mark resolved" data-pending-key="${key}" data-pending-label="${label}">${escapeHtml(
        val
      )} <em>✎</em></span>`;
    }
  );
}
