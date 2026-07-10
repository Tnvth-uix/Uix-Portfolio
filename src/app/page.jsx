"use client";

import Link from "next/link";

const CERTS = ["ISO 9001", "NN/g UX", "Google UX", "Baymard"];
const CLIENTS = ["Grupo Elektra", "Banco Azteca", "Grupo Salinas", "Reclutalia", "Círculo Azteca"];

const CASES = [
  {
    metric: "+40%",
    copy: "más préstamos gracias a un diseño UX que combina autoservicio intuitivo y soporte con asesor virtual.",
    client: "Círculo Azteca",
    cta: "Conocer el caso",
    href: "/projects/afiliacion-unica",
  },
  {
    metric: "+30%",
    copy: "ventas y atención en minutos: así rediseñamos la nueva experiencia móvil SAC de Grupo Elektra.",
    client: "Grupo Elektra · SAC",
    cta: "Ver resultados",
    href: "/projects",
  },
  {
    metric: "−86%",
    copy: "en tiempo de contratación. La UX/UI que hizo a Reclutalia reclutar en tiempo récord.",
    client: "Reclutalia · Grupo Salinas",
    cta: "Explorar la solución",
    href: "/projects/reclutalia",
  },
];

const STATS = [
  { big: "+130", desc: "especialistas enfocados en mejorar tu revenue." },
  { big: "+90", desc: "proyectos entregados para empresas de alto volumen transaccional." },
  { big: "+9", desc: "años diseñando experiencias digitales en México y LATAM." },
  { big: "+20M", desc: "usuarios ya usan las plataformas diseñadas por UiX." },
  { big: "1er", desc: "agencia en Latinoamérica en ser nominada." },
];

const SERVICES = [
  { t: "Consultoría UX/UI", d: "Alineamos UX y negocio para incrementar conversiones y satisfacción con un enfoque estratégico." },
  { t: "Diseño UX", d: "Soluciones digitales intuitivas que mejoran resultados y optimizan el recorrido del usuario." },
  { t: "Diseño UI", d: "Interfaces estratégicas listas para desarrollo que impulsan las conversiones de tu negocio." },
  { t: "Service Design", d: "Diseñamos y optimizamos procesos para experiencias omnicanal consistentes y escalables." },
  { t: "Product Design", d: "Diseñamos soluciones digitales que escalan y reducen riesgos de inversión." },
];

const QUOTES = [
  {
    q: "Transformaron un proceso que nos tomaba semanas en una experiencia de minutos. El impacto en ventas fue inmediato.",
    who: "Dirección Digital",
    role: "Grupo Elektra",
  },
  {
    q: "UiX entiende el negocio, no solo el pixel. Cada decisión de diseño llegó respaldada con datos.",
    who: "Producto & Innovación",
    role: "Banco Azteca",
  },
  {
    q: "Redujeron nuestro tiempo de contratación a niveles que creíamos imposibles. Un socio estratégico.",
    who: "Capital Humano",
    role: "Reclutalia",
  },
];

export default function Home() {
  return (
    <main>
      {/* ================= IMPACT HERO ================= */}
      <section className="ihero">
        <div className="wrap">
          <div className="eyebrow">Agencia UX/UI · México &amp; LATAM</div>
          <h1>
            La agencia UX/UI para crear experiencias{" "}
            <span className="grad-text">memorables</span>.
          </h1>
          <p className="lead">
            Transformamos procesos complicados en experiencias que venden solas.
          </p>
          <div className="hero-cta">
            <Link href="#contacto" className="btn btn-grad">
              ¡Hablemos!
            </Link>
            <Link href="#nosotros" className="btn btn-ghost">
              Conoce UiX
            </Link>
          </div>

          <div className="cert">
            <span className="lbl">Estamos certificados por</span>
            <div className="logos">
              {CERTS.map((c) => (
                <div className="logo" key={c}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CLIENTS / TRUST ================= */}
      <section className="sec" id="nosotros">
        <div className="wrap">
          <div className="eyebrow">Ellos ya confían en nosotros</div>
          <h2 className="display-sm" style={{ margin: "16px 0 0", maxWidth: "20ch" }}>
            Transformamos ideas en soluciones digitales que{" "}
            <span className="grad-text">generan impacto real</span>.
          </h2>
          <div className="logo-wall">
            {CLIENTS.map((c) => (
              <div className="logo" key={c}>
                {c}
              </div>
            ))}
          </div>

          {/* Business-impact cases */}
          <div className="cases">
            {CASES.map((c) => (
              <Link href={c.href} className="case" key={c.metric}>
                <div className="metric-big grad-text">{c.metric}</div>
                <div className="copy">
                  {c.copy}
                  <span className="client">{c.client}</span>
                </div>
                <span className="go">
                  {c.cta} <span className="arw">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS BAND ================= */}
      <section className="stats-band">
        <div className="wrap">
          <div className="eyebrow">Quiénes somos</div>
          <h2>
            Un equipo que diseña para el{" "}
            <span className="grad-text">crecimiento del negocio</span>.
          </h2>
          <div className="stats-grid">
            {STATS.map((s) => (
              <div className="stat-cell" key={s.big}>
                <div className="big grad-text">{s.big}</div>
                <div className="desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Nuestros servicios</div>
              <h2>Convertimos visitas en clientes.</h2>
            </div>
          </div>
          <div className="svc">
            {SERVICES.map((s, i) => (
              <div className="svc-card" key={s.t}>
                <div className="no">{String(i + 1).padStart(2, "0")}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <Link href="#contacto" className="more grad-text">
                  Me interesa →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Lo que dicen nuestros clientes</div>
              <h2>Impulsamos a las marcas líderes de México.</h2>
            </div>
          </div>
          <div className="quotes">
            {QUOTES.map((t, i) => (
              <div className="quote" key={i}>
                <div className="mark">“</div>
                <p>{t.q}</p>
                <div className="who">
                  {t.who}
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA BAND ================= */}
      <section className="sec" id="contacto" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band">
            <h2>Agenda un diagnóstico y mejora tus conversiones.</h2>
            <a href="mailto:contacto@uixdesign.com" className="btn">
              Agendar ahora →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
