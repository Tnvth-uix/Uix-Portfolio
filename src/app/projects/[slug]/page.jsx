"use client";

export default function ProjectPage({ params }) {
  const projectTitle = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const blocks = [
    { num: 1, title: "Portada", desc: "Introducción cinematográfica" },
    { num: 2, title: "Objetivo y Reto", desc: "Qué se buscaba lograr" },
    { num: 3, title: "Proceso", desc: "Metodología y pasos" },
    { num: 4, title: "Resultados", desc: "Impacto del proyecto" },
    { num: 5, title: "Mockups", desc: "Prototipos y diseños" },
    { num: 6, title: "Métricas", desc: "Datos cuantitativos" },
    { num: 7, title: "Antes y Después", desc: "Comparativa visual" },
    { num: 8, title: "Testimonios", desc: "Feedback y conclusiones" },
  ];

  return (
    <div style={{ backgroundColor: "#283593", color: "#F3E5F5", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4A148C, #283593)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        position: "relative",
      }}>
        <a href="/projects" style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          color: "#00E676",
          textDecoration: "none",
        }}>
          ← Volver
        </a>

        <div style={{ maxWidth: "800px" }}>
          <span style={{ color: "#00E676", fontWeight: "600" }}>Caso de Estudio</span>
          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            background: "linear-gradient(to right, #00E676, #00BFA5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            {projectTitle}
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#E8EAF6" }}>
            Un proyecto cinematográfico que demuestra nuestra metodología UX/UI
          </p>
        </div>
      </section>

      {/* Bloques */}
      {blocks.map((block) => (
        <section key={block.num} style={{
          minHeight: "100vh",
          padding: "5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid #7B1FA2",
        }}>
          <div style={{ maxWidth: "900px", width: "100%" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2rem" }}>
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00E676, #00BFA5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#283593",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}>
                {block.num}
              </div>
              <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#00E676" }}>
                {block.title}
              </h2>
            </div>
            <p style={{ fontSize: "1.125rem", color: "#E8EAF6", lineHeight: "1.8" }}>
              {block.desc}
            </p>
            <div style={{
              marginTop: "2rem",
              padding: "2rem",
              backgroundColor: "#4A148C",
              borderRadius: "0.5rem",
              border: "1px solid #7B1FA2",
              minHeight: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F3E5F5",
              fontSize: "1.25rem",
            }}>
              Contenido del Bloque {block.num}: {block.title}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{
        padding: "5rem 2rem",
        background: "linear-gradient(135deg, #4A148C, #283593)",
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: "2rem", color: "#00E676", marginBottom: "2rem" }}>
          ¿Te gustó este proyecto?
        </h2>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/projects" style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#00E676",
            color: "#283593",
            textDecoration: "none",
            borderRadius: "0.5rem",
            fontWeight: "600",
          }}>
            Ver Más Proyectos
          </a>
          <a href="#" style={{
            padding: "0.75rem 1.5rem",
            border: "2px solid #00E676",
            color: "#00E676",
            textDecoration: "none",
            borderRadius: "0.5rem",
            fontWeight: "600",
          }}>
            Contactar
          </a>
        </div>
      </section>
    </div>
  );
}
