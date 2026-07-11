import ProjectsCatalog from "../../../components/ProjectsCatalog";

export const metadata = {
  title: "Experiencia en tecnología, SaaS y telecomunicaciones — Portafolio UiX",
};

export default function ExperienciaCxPage() {
  return (
    <main className="sec sec-doc">
      <div className="wrap">
        <div className="eyebrow">Sección 5</div>
        <h1 className="display-sm" style={{ margin: "16px 0 12px", maxWidth: "30ch" }}>
          Experiencia en el sector{" "}
          <span className="grad-text">tecnológico, SaaS y telecomunicaciones</span>
        </h1>
        <p className="hero-lead" style={{ marginTop: 8, maxWidth: "60ch" }}>
          Proyectos de productos SaaS y plataformas tecnológicas —
          Reclutalia, Compensalia y ZEUS—, evidencia directa de nuestra
          experiencia en tecnología, SaaS y telecomunicaciones.
        </p>

        <ProjectsCatalog only={["reclutalia", "compensalia", "zeus"]} />
      </div>
    </main>
  );
}
