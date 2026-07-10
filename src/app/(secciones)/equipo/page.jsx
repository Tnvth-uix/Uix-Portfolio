import OrgChart from "../../../components/common/OrgChart";
import PdfRepository from "../../../components/common/PdfRepository";
import { TEAM_LEAD, TEAM_REPORTS, TEAM_CV_DOCS } from "../../../data/team";

export const metadata = {
  title: "Equipo asignado — Business Cases By UPAX",
};

export default function EquipoPage() {
  return (
    <main className="sec sec-doc">
      <div className="wrap">
        <div className="eyebrow">Sección 3</div>
        <h1 className="display-sm" style={{ margin: "16px 0 12px", maxWidth: "30ch" }}>
          Profesionales residentes en{" "}
          <span className="grad-text">México asignados al proyecto</span>
        </h1>
        <p className="hero-lead" style={{ marginTop: 8, maxWidth: "60ch" }}>
          Equipo activo y radicado en México, liderado por Customer Success con
          especialistas dedicados en investigación, diseño y contenido.
        </p>

        <div style={{ marginTop: 54 }}>
          <OrgChart lead={TEAM_LEAD} reports={TEAM_REPORTS} />
        </div>

        <div className="sec-head" style={{ marginTop: 70 }}>
          <div>
            <div className="eyebrow">Repositorio</div>
            <h2>CVs del equipo</h2>
          </div>
        </div>
        <PdfRepository docs={TEAM_CV_DOCS} />
      </div>
    </main>
  );
}
