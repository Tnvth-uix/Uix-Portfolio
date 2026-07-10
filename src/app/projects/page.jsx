"use client";

export default function ProjectsPage() {
  return (
    <div style={{ backgroundColor: "#283593", minHeight: "100vh", color: "#F3E5F5", padding: "2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "2rem",
          background: "linear-gradient(to right, #00E676, #00BFA5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Proyectos
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <a key={i} href={`/projects/proyecto-${i}`} style={{
              backgroundColor: "#4A148C",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #7B1FA2",
              textDecoration: "none",
              color: "#F3E5F5",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                aspectRatio: "16/9",
                backgroundColor: "linear-gradient(135deg, #7B1FA2, #3949AB)",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                color: "#F3E5F5",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}>
                Proyecto {i}
              </div>
              <p style={{ color: "#00E676", fontSize: "0.875rem", fontWeight: "600" }}>Cliente {i}</p>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#F3E5F5" }}>
                Proyecto {i}
              </h3>
              <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <span style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.75rem",
                  backgroundColor: "#7B1FA2",
                  borderRadius: "9999px",
                  color: "#F3E5F5",
                }}>
                  Design
                </span>
                <span style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.75rem",
                  backgroundColor: "rgba(0, 230, 118, 0.2)",
                  borderRadius: "9999px",
                  color: "#00E676",
                }}>
                  UX/UI
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
