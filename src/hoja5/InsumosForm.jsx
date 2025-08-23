// src/components/InsumosForm.jsx
import React, { useState } from "react";

// Lista base con los insumos más frecuentes en UCI
const INSUMOS_BASE = [
  "XL 5000",
  "Buretrol SSN 0.9%",
  "Lactato de Ringer",
];

const InsumosForm = () => {
  const [insumos, setInsumos] = useState(
    INSUMOS_BASE.map((item) => ({
      nombre: item,
      M: 0,
      T: 0,
      N: 0,
    }))
  );

  const [nuevoInsumo, setNuevoInsumo] = useState("");

  const handleChange = (idx, turno, value) => {
    const nuevos = [...insumos];
    nuevos[idx][turno] = Number(value);
    setInsumos(nuevos);
  };

  const agregarInsumo = () => {
    if (nuevoInsumo.trim() === "") return;
    setInsumos([
      ...insumos,
      { nombre: nuevoInsumo.trim(), M: 0, T: 0, N: 0 },
    ]);
    setNuevoInsumo("");
  };

  const calcularTotal = (item) => item.M + item.T + item.N;

  return (
    <div style={{ overflowX: "auto" }}>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>LISTA DE EQUIPOS Y MEDICAMENTOS</th>
            <th>M</th>
            <th>T</th>
            <th>N</th>
            <th>TOTAL 24 HORAS</th>
          </tr>
        </thead>
        <tbody>
          {insumos.map((item, idx) => (
            <tr key={idx}>
              <td>{item.nombre}</td>
              {["M", "T", "N"].map((turno) => (
                <td key={turno}>
                  <input
                    type="number"
                    value={item[turno]}
                    min="0"
                    onChange={(e) => handleChange(idx, turno, e.target.value)}
                    style={{ width: 60 }}
                  />
                </td>
              ))}
              <td style={{ textAlign: "center", fontWeight: "bold" }}>
                {calcularTotal(item)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          placeholder="Agregar nuevo insumo"
          value={nuevoInsumo}
          onChange={(e) => setNuevoInsumo(e.target.value)}
          style={{ width: 200, marginRight: 10 }}
        />
        <button onClick={agregarInsumo}>Agregar</button>
      </div>
    </div>
  );
};

export default InsumosForm;
