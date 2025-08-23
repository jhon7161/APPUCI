// src/components/hoja2/AuxiliaresEnfermeria.jsx
import React from "react";

const AuxiliaresEnfermeria = ({ form, setForm }) => (
  <fieldset style={{ marginTop: 20 }}>
    <legend>👩‍⚕️ Auxiliares de Enfermería</legend>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
      {["manana", "tarde", "noche"].map((turno) => (
        <div key={turno}>
          <label>Auxiliar {turno.charAt(0).toUpperCase() + turno.slice(1)}:</label>
          <input
            type="text"
            value={form.auxiliarEnfermeria[turno]}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                auxiliarEnfermeria: { ...prev.auxiliarEnfermeria, [turno]: e.target.value }
              }))
            }
            placeholder="Nombre del auxiliar en turno..."
          />
        </div>
      ))}
    </div>
  </fieldset>
);

export default AuxiliaresEnfermeria;
