"use client";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#283593", color: "#F3E5F5" }}>
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}>
        <h1 style={{
          fontSize: "4rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          background: "linear-gradient(to right, #00E676, #00BFA5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          UiX Portfolio
        </h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "1rem", maxWidth: "600px" }}>
          Presentaciones cinematográficas de proyectos UX/UI
        </p>
        <p style={{ color: "#E8EAF6", maxWidth: "600px" }}>
          Explora una colección curada de trabajos de diseño, desde investigación y prototipado hasta métricas de impacto.
        </p>
        <a href="/projects" style={{
          marginTop: "2rem",
          padding: "0.75rem 2rem",
          background: "linear-gradient(to right, #00E676, #00BFA5)",
          color: "#283593",
          fontWeight: "bold",
          borderRadius: "0.5rem",
          textDecoration: "none",
          display: "inline-block",
        }}>
          Explorar Proyectos
        </a>
      </section>

      <section style={{
        padding: "5rem 2rem",
        backgroundColor: "#283593",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "2rem",
            marginBottom: "3rem",
            textAlign: "center",
            color: "#00E676",
          }}>
            Últimos Proyectos
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}>
            {[1, 2, 3, 4].map((i) => (
              <a key={i} href={`/projects/proyecto-${i}`} style={{
                backgroundColor: "#4A148C",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #7B1FA2",
                textDecoration: "none",
                color: "#F3E5F5",
              }}>
                <div style={{
                  aspectRatio: "16/9",
                  backgroundColor: "#7B1FA2",
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  color: "#F3E5F5",
                }}>
                  Proyecto {i}
                </div>
                <p style={{ color: "#00E676", fontSize: "0.875rem", fontWeight: "600" }}>Cliente {String.fromCharCode(64 + i)}</p>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#F3E5F5" }}>
                  Proyecto {i}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
