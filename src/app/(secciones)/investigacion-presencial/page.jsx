import fs from "fs";
import path from "path";
import HtmlEmbedWithPdf from "../../../components/common/HtmlEmbedWithPdf";

export const metadata = {
  title: "Investigación presencial en México — Business Cases By UPAX",
};

export default function InvestigacionPresencialPage() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "src/data/embeds/investigacion-presencial.html"),
    "utf-8"
  );

  return (
    <main className="sec sec-doc">
      <div className="wrap">
        <div className="eyebrow">Sección 6</div>
        <h1 className="display-sm" style={{ margin: "16px 0 12px", maxWidth: "30ch" }}>
          Capacidad para realizar{" "}
          <span className="grad-text">investigaciones presenciales en México</span>
        </h1>

        <HtmlEmbedWithPdf
          html={html}
          filename="Investigacion-Presencial.pdf"
          label="Descargar PDF"
        />
      </div>
    </main>
  );
}
