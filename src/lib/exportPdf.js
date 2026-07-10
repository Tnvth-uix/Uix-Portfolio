/*
 * PDF export strategy.
 *
 * The previous implementation rasterized content with html2canvas, which
 * repaints the DOM from scratch and does not understand things like
 * backdrop-filter, CSS grid, web fonts loaded async, or scroll-triggered
 * reveal animations. The result never matched what the user actually saw
 * on screen.
 *
 * Instead we lean on the browser's own print engine (the same engine that
 * renders the page). Calling window.print()/iframe.print() produces a PDF
 * that is pixel-faithful to the live view, as long as we scope what's
 * visible to the target element via print-only CSS (see the
 * "Print scoping" rules in globals.css).
 */

function setSuggestedFilename(filename) {
  if (!filename) return () => {};
  const previousTitle = document.title;
  document.title = filename.replace(/\.pdf$/i, "");
  return () => {
    document.title = previousTitle;
  };
}

/**
 * Prints only `element` (and its descendants), hiding the rest of the page
 * chrome (header, sidebar, footer, buttons, etc.) via the `.print-scope`
 * marker classes defined in globals.css.
 */
export function printElement(element, filename) {
  if (!element) {
    throw new Error("No hay contenido para exportar.");
  }

  const restoreTitle = setSuggestedFilename(filename);
  element.classList.add("print-target");
  document.documentElement.classList.add("print-scoping");

  const cleanup = () => {
    element.classList.remove("print-target");
    document.documentElement.classList.remove("print-scoping");
    restoreTitle();
    window.removeEventListener("afterprint", cleanup);
  };
  window.addEventListener("afterprint", cleanup);

  // Give the browser a tick to apply the print-scope classes before
  // opening the print dialog.
  window.requestAnimationFrame(() => window.print());
}

/**
 * Prints the document living inside an iframe, using that document's own
 * stylesheets/layout, which is a perfect match to what's rendered on
 * screen.
 */
export function printIframe(iframe, filename) {
  const win = iframe?.contentWindow;
  if (!win) {
    throw new Error("No hay contenido para exportar.");
  }

  const restoreTitle = setSuggestedFilename(filename);
  const cleanup = () => {
    restoreTitle();
    win.removeEventListener("afterprint", cleanup);
  };
  win.addEventListener("afterprint", cleanup);

  win.focus();
  win.print();
}
