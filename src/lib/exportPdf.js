export async function exportElementToPdf(element, filename) {
  if (!element) {
    throw new Error("No hay contenido para exportar.");
  }

  const { default: html2pdf } = await import("html2pdf.js");

  await html2pdf()
    .set({
      margin: 8,
      filename,
      image: { type: "jpeg", quality: 0.92 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        scrollY: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    })
    .from(element)
    .save();
}
