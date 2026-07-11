import EmbeddedApp from "../../../components/common/EmbeddedApp";

export const metadata = {
  title: "Experiencia previa UX research / CX — Portafolio UiX",
};

export default function ExperienciaUxCxPage() {
  return (
    <main className="sec sec-doc">
      <div className="wrap">
        <div className="eyebrow">Sección 7</div>
        <h1 className="display-sm" style={{ margin: "16px 0 12px", maxWidth: "30ch" }}>
          Experiencia previa en proyectos de{" "}
          <span className="grad-text">UX research y/o CX</span>
        </h1>
        <p className="hero-lead" style={{ marginTop: 8, maxWidth: "60ch" }}>
          Proyecto interactivo que documenta nuestro proceso e impacto en
          investigación de experiencia de usuario y customer experience.
        </p>

        <EmbeddedApp
          src="/embeds/experiencia-cx/index.html"
          title="Experiencia previa en proyectos de UX research y/o CX"
          pdfFilename="Experiencia-UX-Research-CX.pdf"
          pdfLabel="Descargar PDF"
        />
      </div>
    </main>
  );
}
