// src/components/Camas.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Camas() {
  const navigate = useNavigate();

  // Creamos un arreglo de 8 camas
  const camas = Array.from({ length: 8 }, (_, i) => i + 1);

  const handleClickCama = (numeroCama) => {
    navigate(`/paciente/${numeroCama}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>🏥 Selecciona una cama</h1>
      <div style={styles.grid}>
        {camas.map((cama) => (
          <button
            key={cama}
            style={styles.cama}
            onClick={() => handleClickCama(cama)}
          >
            🛏️ Cama {cama}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
  },
  titulo: {
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
    maxWidth: "600px",
    margin: "auto",
  },
  cama: {
    padding: "1rem",
    fontSize: "1.2rem",
    cursor: "pointer",
    borderRadius: "10px",
    border: "2px solid #007BFF",
    backgroundColor: "#f8f9fa",
    transition: "0.3s",
  },
};
