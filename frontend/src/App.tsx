import React from "react";

export const App: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #fdf6ec 0%, #f3e7dd 40%, #e8f0e4 100%)",
        fontFamily: '"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        color: "#4a3b2e"
      }}
    >
      <div
        style={{
          padding: "2.5rem 3rem",
          borderRadius: "1.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow:
            "0 18px 40px rgba(84, 62, 44, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.7)"
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
          🌱 Habit Garden
        </h1>
        <p style={{ marginBottom: "0.5rem" }}>
          A cozy cottage-core habit & journaling space.
        </p>
        <p style={{ fontSize: "0.95rem", opacity: 0.9 }}>
          Backend: FastAPI · DB: Postgres · Frontend: React + Vite
        </p>
      </div>
    </div>
  );
};

