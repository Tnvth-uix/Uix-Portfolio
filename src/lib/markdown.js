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
  Convention for uploaded markdown:

    # Project Title
    > Client · one-line description        (optional blockquote sub-line)

    ## Section name
    ...content (markdown)...

    ## Another section
    ...

  The H1 becomes the cover slide. Every H2 becomes its own slide.
  Content between H2s is rendered as markdown (bold, lists, links, quotes).
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
      current = { title: h2[1].trim(), lines: [] };
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

  const slides = sections
    .map((s) => {
      const body = s.lines.join("\n").trim();
      if (!body && !s.title) return null;
      return {
        title: s.title,
        html: marked.parse(body),
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
