import PdfRepository from "../../../components/common/PdfRepository";
import { SEGURIDAD_INFORMACION_DOCS } from "../../../data/documents";

export const metadata = {
  title: "Seguridad de la información — Business Cases By UPAX",
};

export default function SeguridadInformacionPage() {
  return (
    <main className="sec sec-doc">
      <div className="wrap">
        <div className="eyebrow">Sección 8</div>
        <h1 className="display-sm" style={{ margin: "16px 0 12px", maxWidth: "30ch" }}>
          Certificación ISO 27001 y{" "}
          <span className="grad-text">política de seguridad de la información</span>
        </h1>
        <p className="hero-lead" style={{ marginTop: 8, maxWidth: "60ch" }}>
          Política documentada que rige el tratamiento y protección de la información
          en nuestros proyectos.
        </p>

        <div style={{ marginTop: 40 }}>
          <PdfRepository docs={SEGURIDAD_INFORMACION_DOCS} />
        </div>
      </div>
    </main>
  );
}
