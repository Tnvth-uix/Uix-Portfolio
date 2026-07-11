"use client";

import { useState } from "react";
import Particles from "../../components/Particles";
import Counter from "../../components/Counter";
import Reveal from "../../components/common/Reveal";

const CERTS = ["ISO 9001", "NN/g UX", "Google UX", "Baymard"];

/* Company proof — kept intentionally minimal */
const STATS = [
  { big: "+90", desc: "Proyectos entregados", icon: "/iconos/trofeo.png" },
  { big: "+20M", desc: "usuarios en las plataformas UiX", icon: "/iconos/usuario.png" },
  { big: "+9", desc: "años en México y LATAM", icon: "/iconos/reloj.png" },
  { big: "1er", desc: "en LATAM en ser nominada", icon: "/iconos/stars.png" },
];

/* Client references — kept as live proof, not marketing copy */
const REF_TABS = [
  { key: "casos", label: "Casos de Éxito" },
  { key: "politicas", label: "Políticas y Confidencialidad" },
  { key: "soporte", label: "Soporte y Comunicación" },
];

const CONTACTS = [
  {
    company: "Grupo Salinas",
    name: "Nayeli Enedina Zárate Ortiz",
    role: "Directora de Plataformas Digitales",
    email: "nzarate@elektra.com.mx",
  },
  {
    company: "Banco Azteca",
    name: "Raquel Maritza Hernández Ramírez",
    role: "Directora de Procesos de Investigación y Cobranza",
    email: "rhramirez@bancoazteca.com.mx",
  },
];

const POLICIES = [
  {
    no: "01",
    title: "Acuerdo de Confidencialidad (NDA)",
    text: "Estamos en plena disposición de firmar el Acuerdo de Confidencialidad (NDA) que se considere necesario para garantizar la protección de la información compartida durante el proceso de evaluación, contratación y ejecución del proyecto.",
  },
  {
    no: "02",
    title: "Protección y Manejo de la Información",
    text: "Toda la información proporcionada será tratada con estricta confidencialidad y utilizada exclusivamente para los fines relacionados con el proyecto.",
  },
  {
    no: "03",
    title: "Propiedad Intelectual",
    text: "Toda la documentación, entregables, hallazgos, investigaciones, análisis, materiales y demás activos generados, recopilados o desarrollados durante la ejecución del proyecto serán propiedad exclusiva del cliente una vez concluido, conforme a los términos establecidos en el contrato correspondiente.",
  },
];

const ADVISOR = {
  name: "Marco Antonio Gonzalez Morales",
  role: "Customer Success",
  channel: "Correo electrónico",
  email: "marco.gonzalezm@jansan.mx",
  sla: "Plazo máximo de respuesta de 1 día hábil",
};

function ReferencesSection() {
  const [tab, setTab] = useState("casos");

  return (
    <section className="sec ref-sec">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">Referencias &amp; Governance</div>
          <h2 className="display-sm" style={{ margin: "16px 0 0", maxWidth: "26ch" }}>
            Nuestra <span className="grad-text">experiencia y trayectoria</span>.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <nav className="ref-tabs" role="tablist" aria-label="Referencias">
          {REF_TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              className={`ref-tab ${tab === t.key ? "active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
          </nav>
        </Reveal>

        {tab === "casos" && (
          <div className="ref-pane">
            <Reveal>
              <p className="ref-intro">
                Como referencia de nuestra experiencia y trayectoria, compartimos
                los datos de contacto de algunos de nuestros clientes activos.
              </p>
            </Reveal>
            <div className="ref-cards">
              {CONTACTS.map((c, i) => (
                <Reveal key={c.email} delay={i * 90}>
                  <div className="ref-card">
                  <div className="ref-card-top">
                    <span className="ref-dot" />
                    <h3>{c.company}</h3>
                  </div>
                  <dl className="ref-card-body">
                    <div>
                      <dt>Contacto</dt>
                      <dd>{c.name}</dd>
                    </div>
                    <div>
                      <dt>Cargo</dt>
                      <dd>{c.role}</dd>
                    </div>
                    <div>
                      <dt>Correo electrónico</dt>
                      <dd>
                        <a href={`mailto:${c.email}`} className="ref-email">
                          {c.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {tab === "politicas" && (
          <div className="ref-pane">
            <Reveal>
              <p className="ref-intro">
                Confidencialidad, protección de datos y propiedad intelectual —
                los tres pilares que rigen cómo tratamos la información de cada proyecto.
              </p>
            </Reveal>
            <div className="policy-grid">
              {POLICIES.map((p, i) => (
                <Reveal key={p.no} delay={i * 90}>
                  <div className="policy-card">
                  <span className="policy-no">{p.no}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {tab === "soporte" && (
          <div className="ref-pane">
            <Reveal>
              <p className="ref-intro">Punto focal del proyecto.</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="advisor-card">
              <div className="advisor-avatar">
                {ADVISOR.name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </div>
              <div className="advisor-info">
                <h3>{ADVISOR.name}</h3>
                <span className="advisor-role">{ADVISOR.role}</span>
              </div>
              <div className="advisor-grid">
                <div>
                  <dt>Medio de comunicación</dt>
                  <dd>{ADVISOR.channel}</dd>
                </div>
                <div>
                  <dt>Contacto</dt>
                  <dd>
                    <a href={`mailto:${ADVISOR.email}`} className="ref-email">
                      {ADVISOR.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>SLA de respuesta</dt>
                  <dd>{ADVISOR.sla}</dd>
                </div>
              </div>
            </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      {/* ================= COMPACT HERO ================= */}
      <section className="ihero ihero-compact">
        <Particles count={54} />
        <div className="wrap ihero-intro">
          <div className="eyebrow">Portafolio · UX/UI · México &amp; LATAM</div>
          <h1>
            No diseñamos pantallas, <span className="grad-text">Diseñamos experiencias</span>.
          </h1>
          <p className="lead">
            Transformamos procesos complicados en experiencias simples.
            Explora el impacto real caso por caso.
          </p>

          <p className="cert-discreet">
            Certificados por {CERTS.join(" · ")}
          </p>
        </div>
      </section>

      {/* ================= REFERENCES & GOVERNANCE ================= */}
      <ReferencesSection />

      {/* ================= MINIMAL COMPANY PROOF ================= */}
      <section className="stats-band stats-band-slim">
        <div className="wrap">
          <div className="stats-slim">
            <Reveal className="stats-slim-intro">
              <div className="eyebrow">UiX en números</div>
              <p>
                La agencia UX/UI para crear experiencias{" "}
                <span className="grad-text">memorables</span>.
              </p>
            </Reveal>
            <div className="stats-grid stats-grid-4">
              {STATS.map((s, i) => (
                <Reveal key={s.big} delay={i * 80}>
                  <div className="stat-cell">
                    <img src={s.icon} alt="" className="stat-icon" />
                    <div className="big grad-text">
                      <Counter value={s.big} />
                    </div>
                    <div className="desc">{s.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
