// src/components/Camas.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { liberarCama } from "../reducers/camasSlice";

export default function Camas() {
  const camas = useSelector(state => state.camas);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [documentoInput, setDocumentoInput] = useState({}); // Para camas libres

  // Navegar a PacienteForm con historia y cama
  const handleIrPacienteForm = (camaId, documento) => {
    if (!documento) return;
    navigate(`/paciente/${documento}?cama=${camaId}`);
  };

  // Liberar la cama
  const handleDarSalida = (camaId) => {
    dispatch(liberarCama(camaId));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Camas UCI</h2>

      {/* Botón para volver a Home */}
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "8px 16px",
          marginBottom: "20px",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
        }}
      >
        Volver a Home
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {camas.map(cama => (
          <li key={cama.id} style={{ marginBottom: "15px", border: "1px solid #ccc", padding: "10px", borderRadius: "6px" }}>
            <strong>Cama {cama.id}:</strong>{" "}
            {cama.paciente ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => handleIrPacienteForm(cama.id, cama.paciente.historiaClinica)}
                >
                  {cama.paciente.nombre} {cama.paciente.apellido} | Doc: {cama.paciente.historiaClinica} | Edad: {cama.paciente.edad}
                </span>
                <button
                  onClick={() => handleDarSalida(cama.id)}
                  style={{ marginLeft: "10px", backgroundColor: "#f44336", color: "#fff", border: "none", padding: "4px 8px", cursor: "pointer" }}
                >
                  Dar salida
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "5px" }}>
                <input
                  type="text"
                  placeholder="Número de documento"
                  value={documentoInput[cama.id] || ""}
                  onChange={e => setDocumentoInput(prev => ({ ...prev, [cama.id]: e.target.value }))}
                  style={{ padding: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <button
                  onClick={() => {
                    const doc = documentoInput[cama.id]?.trim();
                    if (doc) handleIrPacienteForm(cama.id, doc);
                  }}
                  style={{ padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}
                >
                  Asignar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
