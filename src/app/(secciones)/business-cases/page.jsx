import EmbeddedApp from "../../../components/common/EmbeddedApp";

export const metadata = {
  title: "Experiencia previa UX research / CX — Business Cases By UPAX",
};

export default function BusinessCasesSectionPage() {
  return (
    <main className="sec sec-doc">
      <div className="wrap">
        <div className="eyebrow">Sección 8</div>
        <h1 className="display-sm" style={{ margin: "16px 0 12px", maxWidth: "30ch" }}>
          Experiencia previa en proyectos de{" "}
          <span className="grad-text">UX research y/o CX</span>
        </h1>
        <p className="hero-lead" style={{ marginTop: 8, maxWidth: "60ch" }}>
          Proyecto interactivo que documenta nuestro proceso e impacto en
          investigación de experiencia de usuario y customer experience.
        </p>

        <div style={{ marginTop: 40 }}>
          <EmbeddedApp
            src="/embeds/experiencia-cx/index.html"
            title="Experiencia previa en proyectos de UX research y/o CX"
          />
        </div>
      </div>
    </main>
  );
}
