import PdfRepository from "../../../components/common/PdfRepository";
import { OPERACION_FORMAL_DOCS } from "../../../data/documents";

export const metadata = {
  title: "Operación formal en México — Portafolio UiX",
};

export default function OperacionFormalPage() {
  return (
    <main className="sec sec-doc">
      <div className="wrap">
        <div className="eyebrow">Sección 2</div>
        <h1 className="display-sm" style={{ margin: "16px 0 12px", maxWidth: "26ch" }}>
          Operación formal establecida en{" "}
          <span className="grad-text">México (RFC vigente)</span>
        </h1>
        <p className="hero-lead" style={{ marginTop: 8, maxWidth: "60ch" }}>
          Documentación fiscal que acredita nuestra operación formal en territorio
          mexicano. Puedes revisarla directamente o descargarla.
        </p>

        <div style={{ marginTop: 40 }}>
          <PdfRepository docs={OPERACION_FORMAL_DOCS} />
        </div>
      </div>
    </main>
  );
}
