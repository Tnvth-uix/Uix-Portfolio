import Link from "next/link";
import EmbeddedApp from "../../../components/common/EmbeddedApp";

export const metadata = {
  title: "Investigación de deseabilidad · mercado mexicano — Business Cases By UPAX",
};

export default function InvestigacionMercadoMexicanoPage() {
  return (
    <main className="sec sec-doc">
      <div className="wrap">
        <Link href="/mercado-mexicano" className="eyebrow" style={{ textDecoration: "none" }}>
          ← Volver a Sección 4
        </Link>
        <h1 className="display-sm" style={{ margin: "16px 0 12px", maxWidth: "34ch" }}>
          <span className="grad-text">PrestaPrenda</span>
        </h1>
        <p className="hero-lead" style={{ marginTop: 8, maxWidth: "60ch" }}>
          Reporte de investigación de deseabilidad realizado con consumidores
          mexicanos, con hallazgos accionables sobre percepción y comportamiento de
          compra.
        </p>

        <EmbeddedApp
          src="/embeds/mercado-mexicano/index.html"
          title="Reporte de investigación — Deseabilidad"
          pdfFilename="PrestaPrenda-Reporte.pdf"
          pdfLabel="Descargar PDF"
        />
      </div>
    </main>
  );
}
