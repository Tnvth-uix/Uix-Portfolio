import ProjectsCatalog from "../../components/ProjectsCatalog";

export default function ProjectsPage() {
  return (
    <main className="sec" style={{ paddingTop: 60 }}>
      <div className="wrap">
        <div className="eyebrow">Biblioteca</div>
        <h1 className="display-sm" style={{ margin: "16px 0 12px", maxWidth: "18ch" }}>
          Todos los <span className="grad-text">Business Cases</span>
        </h1>
        <p className="hero-lead" style={{ marginTop: 8 }}>
          Casos de negocio con estructura de 8 bloques. Cada uno se recorre como una
          landing de una sola página.
        </p>

        <ProjectsCatalog />
      </div>
    </main>
  );
}
