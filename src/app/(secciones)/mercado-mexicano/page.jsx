import EmbeddedApp from "../../../components/common/EmbeddedApp";
import PdfRepository from "../../../components/common/PdfRepository";
import { MERCADO_MEXICANO_DOCS } from "../../../data/documents";

export const metadata = {
  title: "Dominio del mercado mexicano — Business Cases By UPAX",
};

export default function MercadoMexicanoPage() {
  return (
    <main className="sec sec-doc">
      <div className="wrap">
        <div className="eyebrow">Sección 4</div>
        <h1 className="display-sm" style={{ margin: "16px 0 12px", maxWidth: "34ch" }}>
          Dominio comprobado de la cultura y{" "}
          <span className="grad-text">hábitos de consumo del mercado mexicano</span>
        </h1>
        <p className="hero-lead" style={{ marginTop: 8, maxWidth: "60ch" }}>
          Reporte de investigación de deseabilidad realizado con consumidores
          mexicanos, con hallazgos accionables sobre percepción y comportamiento de
          compra.
        </p>

        <div style={{ marginTop: 40 }}>
          <EmbeddedApp
            src="/embeds/mercado-mexicano/index.html"
            title="Reporte de investigación — Deseabilidad"
          />
        </div>

        <div className="sec-head" style={{ marginTop: 60 }}>
          <div>
            <div className="eyebrow">Descargas</div>
            <h2>Reporte completo en PDF</h2>
          </div>
        </div>
        <PdfRepository docs={MERCADO_MEXICANO_DOCS} />
      </div>
    </main>
  );
}
