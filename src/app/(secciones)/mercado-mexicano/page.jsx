import ProjectsCatalog from "../../../components/ProjectsCatalog";

export const metadata = {
  title: "Dominio del mercado mexicano — Portafolio UiX",
};

const REPORT_CARD = {
  slug: "investigacion-mercado-mexicano",
  title: "PrestaPrenda",
  example: true,
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
          Proyectos entregados con consumidores mexicanos —incluida nuestra
          investigación de deseabilidad—, evidencia directa de nuestro
          conocimiento de la cultura y el comportamiento de compra local.
        </p>

        <ProjectsCatalog
          exclude={["reclutalia", "compensalia", "zeus"]}
          extra={[REPORT_CARD]}
        />
      </div>
    </main>
  );
}
