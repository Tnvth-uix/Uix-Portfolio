"use client";

import { useState } from "react";

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

const ADVISOR = {
  name: "Ana Carolina Quintal Zogbi",
  role: "Customer Success",
  email: "ana.quintal@jansan.mx",
  sla: "Plazo máximo de respuesta de 1 día hábil",
};

function ContactCard({ contact }) {
  return (
    <div className="contact-card">
      <div className="contact-header">
        <h3>{contact.company}</h3>
      </div>
      <div className="contact-body">
        <div className="contact-field">
          <span className="label">Contacto:</span>
          <span className="value">{contact.name}</span>
        </div>
        <div className="contact-field">
          <span className="label">Cargo:</span>
          <span className="value">{contact.role}</span>
        </div>
        <div className="contact-field">
          <span className="label">Correo electrónico:</span>
          <a href={`mailto:${contact.email}`} className="value email-link">
            {contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ title, children }) {
  return (
    <div className="info-block">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default function BusinessCasesSectionPage() {
  const [activeTab, setActiveTab] = useState("casos");

  return (
    <main className="sec sec-references">
      <div className="wrap">
        <div className="ref-header">
          <div className="eyebrow">Referencias y Políticas</div>
          <h1 className="display-sm">
            Nuestra <span className="grad-text">Experiencia y Trayectoria</span>
          </h1>
        </div>

        {/* Tab Navigation */}
        <nav className="tab-nav">
          <button
            className={`tab-btn ${activeTab === "casos" ? "active" : ""}`}
            onClick={() => setActiveTab("casos")}
          >
            Casos de Éxito
          </button>
          <button
            className={`tab-btn ${activeTab === "politicas" ? "active" : ""}`}
            onClick={() => setActiveTab("politicas")}
          >
            Políticas y Confidencialidad
          </button>
          <button
            className={`tab-btn ${activeTab === "soporte" ? "active" : ""}`}
            onClick={() => setActiveTab("soporte")}
          >
            Soporte y Comunicación
          </button>
        </nav>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Casos de Éxito */}
          {activeTab === "casos" && (
            <div className="tab-pane">
              <p className="intro-text">
                Como referencia de nuestra experiencia y trayectoria, compartimos
                los datos de contacto de algunos de nuestros clientes activos.
              </p>

              <div className="contacts-grid">
                {CONTACTS.map((contact) => (
                  <ContactCard key={contact.email} contact={contact} />
                ))}
              </div>
            </div>
          )}

          {/* Políticas y Confidencialidad */}
          {activeTab === "politicas" && (
            <div className="tab-pane">
              <h2 className="section-title">
                Confidencialidad, Protección de Datos y Propiedad Intelectual
              </h2>

              <div className="policies-grid">
                <InfoBlock title="Acuerdo de Confidencialidad (NDA)">
                  <p>
                    Estamos en plena disposición de firmar el Acuerdo de
                    Confidencialidad (NDA) que HostGator considere necesario
                    para garantizar la protección de la información compartida
                    durante el proceso de evaluación, contratación y ejecución
                    del proyecto.
                  </p>
                </InfoBlock>

                <InfoBlock title="Protección y Manejo de la Información">
                  <p>
                    Toda la información proporcionada por HostGator será tratada
                    con estricta confidencialidad y utilizada exclusivamente para
                    los fines relacionados con el proyecto.
                  </p>
                </InfoBlock>

                <InfoBlock title="Propiedad Intelectual">
                  <p>
                    Toda la documentación, entregables, hallazgos,
                    investigaciones, análisis, materiales y demás activos
                    generados, recopilados o desarrollados durante la ejecución
                    del proyecto serán propiedad exclusiva de HostGator una vez
                    concluido el proyecto y conforme a los términos establecidos
                    en el contrato correspondiente.
                  </p>
                </InfoBlock>
              </div>
            </div>
          )}

          {/* Soporte y Comunicación */}
          {activeTab === "soporte" && (
            <div className="tab-pane">
              <h2 className="section-title">Punto focal del proyecto</h2>

              <div className="advisor-card">
                <div className="advisor-header">
                  <h3>{ADVISOR.name}</h3>
                  <span className="role">{ADVISOR.role}</span>
                </div>
                <div className="advisor-body">
                  <div className="advisor-field">
                    <span className="label">Medio de comunicación formal:</span>
                    <span className="value">Correo electrónico</span>
                  </div>
                  <div className="advisor-field">
                    <span className="label">Contacto:</span>
                    <a href={`mailto:${ADVISOR.email}`} className="value email-link">
                      {ADVISOR.email}
                    </a>
                  </div>
                  <div className="advisor-field">
                    <span className="label">Tiempos de respuesta (SLA):</span>
                    <span className="value">{ADVISOR.sla}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .sec-references {
          padding-top: 60px;
          padding-bottom: 80px;
        }

        .ref-header {
          margin-bottom: 60px;
        }

        .ref-header .eyebrow {
          margin-bottom: 16px;
        }

        .ref-header h1 {
          margin: 0;
        }

        /* Tab Navigation */
        .tab-nav {
          display: flex;
          gap: 16px;
          margin-bottom: 60px;
          border-bottom: 1px solid var(--color-border, #e5e7eb);
          flex-wrap: wrap;
        }

        .tab-btn {
          padding: 16px 0;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          color: var(--color-text-secondary, #6b7280);
          border-bottom: 3px solid transparent;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .tab-btn:hover {
          color: var(--color-text, #111827);
        }

        .tab-btn.active {
          color: var(--color-text, #111827);
          border-bottom-color: var(--color-primary, #6366f1);
        }

        /* Tab Content */
        .tab-content {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .tab-pane {
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .intro-text {
          font-size: 16px;
          line-height: 1.6;
          color: var(--color-text, #111827);
          margin-bottom: 40px;
          max-width: 65ch;
        }

        /* Contact Cards */
        .contacts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 40px;
        }

        .contact-card {
          border: 1px solid var(--color-border, #e5e7eb);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .contact-card:hover {
          border-color: var(--color-primary, #6366f1);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
        }

        .contact-header {
          padding: 20px;
          background: var(--color-bg-secondary, #f9fafb);
          border-bottom: 1px solid var(--color-border, #e5e7eb);
        }

        .contact-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--color-text, #111827);
        }

        .contact-body {
          padding: 20px;
        }

        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .contact-field:last-child {
          margin-bottom: 0;
        }

        .contact-field .label {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--color-text-secondary, #6b7280);
        }

        .contact-field .value {
          font-size: 15px;
          color: var(--color-text, #111827);
        }

        .email-link {
          color: var(--color-primary, #6366f1);
          text-decoration: none;
        }

        .email-link:hover {
          text-decoration: underline;
        }

        /* Policies Grid */
        .section-title {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 40px 0;
          color: var(--color-text, #111827);
        }

        .policies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }

        .info-block {
          padding: 24px;
          border: 1px solid var(--color-border, #e5e7eb);
          border-radius: 12px;
          background: var(--color-bg-secondary, #f9fafb);
        }

        .info-block h3 {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text, #111827);
        }

        .info-block p {
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          color: var(--color-text-secondary, #6b7280);
        }

        /* Advisor Card */
        .advisor-card {
          border: 1px solid var(--color-border, #e5e7eb);
          border-radius: 12px;
          overflow: hidden;
          max-width: 500px;
        }

        .advisor-header {
          padding: 24px;
          background: linear-gradient(135deg, var(--color-primary, #6366f1), var(--color-primary-light, #818cf8));
          color: white;
        }

        .advisor-header h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
          font-weight: 600;
        }

        .advisor-header .role {
          font-size: 14px;
          opacity: 0.95;
        }

        .advisor-body {
          padding: 24px;
        }

        .advisor-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .advisor-field:last-child {
          margin-bottom: 0;
        }

        .advisor-field .label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--color-text-secondary, #6b7280);
        }

        .advisor-field .value {
          font-size: 15px;
          color: var(--color-text, #111827);
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .sec-references {
            padding-top: 40px;
            padding-bottom: 60px;
          }

          .tab-nav {
            gap: 12px;
            margin-bottom: 40px;
          }

          .tab-btn {
            font-size: 14px;
            padding: 12px 0;
          }

          .contacts-grid {
            grid-template-columns: 1fr;
          }

          .policies-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .section-title {
            font-size: 20px;
          }
        }
      `}</style>
    </main>
  );
}
