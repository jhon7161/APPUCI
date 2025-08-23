// src/components/HojaPosiciones.jsx
import React, { useState } from "react";

const POSICIONES = [
  { nombre: "DLI", ejercicio: "Mov pasiva" },
  { nombre: "DLD", ejercicio: "Ejerc pasivo" },
  { nombre: "Sedente", ejercicio: "Ejerc activo" },
  { nombre: "Prono", ejercicio: "Ejerc asist" },
  { nombre: "Bipedo", ejercicio: "Ejerc resist" },
  { nombre: "Marcha", ejercicio: "FISIOTERAPIA" },
];

const HORAS = ["6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "2", "4"];

const FERULAS = [
  { nombre: "MMSS", tipos: ["1x1", "1x2", "2x1"] },
  { nombre: "MMII", tipos: ["1x1", "1x2", "2x1"] },
];

const cellStyle = {
  border: "1px solid black",
  padding: "5px",
  textAlign: "center",
};

const HojaPosiciones = () => {
  const [selecciones, setSelecciones] = useState({});
  const [fisio, setFisio] = useState("");

  const toggleCelda = (posicion, hora) => {
    const key = `${posicion}-${hora}`;
    setSelecciones((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleExtra = (posicion, campo) => {
    const key = `${posicion}-${campo}`;
    setSelecciones((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Tabla de posiciones */}
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ backgroundColor: "#d0e6ff" }}>
            <th style={cellStyle}>Posición</th>
            {HORAS.map((hora) => (
              <th key={hora} style={cellStyle}>
                {hora}
              </th>
            ))}
            <th style={cellStyle}>Ejercicios</th>
            <th style={cellStyle}>AM</th>
            <th style={cellStyle}>PM</th>
          </tr>
        </thead>
        <tbody>
          {POSICIONES.map((pos) => (
            <tr key={pos.nombre}>
              <td style={{ ...cellStyle, fontWeight: "bold" }}>{pos.nombre}</td>
              {HORAS.map((hora) => (
                <td
                  key={hora}
                  onClick={() => toggleCelda(pos.nombre, hora)}
                  style={{
                    ...cellStyle,
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {selecciones[`${pos.nombre}-${hora}`] ? "✔" : ""}
                </td>
              ))}
              <td style={cellStyle}>{pos.ejercicio}</td>
              {pos.nombre !== "Marcha" ? (
                <>
                  <td
                    onClick={() => toggleExtra(pos.nombre, "AM")}
                    style={{ ...cellStyle, cursor: "pointer" }}
                  >
                    {selecciones[`${pos.nombre}-AM`] ? "✔" : ""}
                  </td>
                  <td
                    onClick={() => toggleExtra(pos.nombre, "PM")}
                    style={{ ...cellStyle, cursor: "pointer" }}
                  >
                    {selecciones[`${pos.nombre}-PM`] ? "✔" : ""}
                  </td>
                </>
              ) : (
                <td style={cellStyle} colSpan={2}></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla de férulas */}
      <h3 style={{ marginTop: "20px" }}>Posición Férulas</h3>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#d0e6ff" }}>
            <th style={cellStyle}>Miembro</th>
            {["1x1", "1x2", "2x1"].map((tipo) => (
              <th key={tipo} style={cellStyle}>
                {tipo}
              </th>
            ))}
            <th style={cellStyle}>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {FERULAS.map((f) => (
            <tr key={f.nombre}>
              <td style={cellStyle}>{f.nombre}</td>
              {f.tipos.map((tipo) => (
                <td
                  key={tipo}
                  onClick={() => toggleExtra(f.nombre, tipo)}
                  style={{
                    ...cellStyle,
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {selecciones[`${f.nombre}-${tipo}`] ? "✔" : ""}
                </td>
              ))}
              <td style={cellStyle}></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Campo editable fisioterapeuta */}
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
        <label style={{ fontWeight: "bold" }}>Fisioterapeuta:</label>
        <input
          type="text"
          value={fisio}
          onChange={(e) => setFisio(e.target.value)}
          style={{
            border: "1px solid black",
            padding: "5px",
            borderRadius: "5px",
            width: "250px",
          }}
          placeholder="Nombre del fisioterapeuta"
        />
      </div>
    </div>
  );
};

export default HojaPosiciones;
