// src/hoja3/ComponenteHoja3.jsx
import React, { useState } from "react";

const HORAS = [
  "07:00","08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00","18:00",
  "19:00","20:00","21:00","22:00","23:00","00:00",
  "01:00","02:00","03:00","04:00","05:00","06:00"
];

const COLUMNAS_BASE = [
  "FC","TAS","TAD","TAM","FR","SAT","TEMP","PVC","GC","IC",
  "VVS","IVS","VS","VRS","IRVS","SCVO2","PCP","TAMAP"
];

const ComponenteHoja3 = ({ form, setForm }) => {
  const [columnasExtras, setColumnasExtras] = useState([]);

  const agregarColumna = () => {
    const nueva = prompt("Nombre de la nueva columna:");
    if (nueva && !columnasExtras.includes(nueva)) {
      setColumnasExtras([...columnasExtras, nueva]);
    }
  };

  const handleChange = (horaIndex, campo, valor) => {
    setForm((prev) => {
      const hoja3 = prev.hoja3 || {};
      const datos = hoja3.datos ? [...hoja3.datos] : Array(24).fill({});
      datos[horaIndex] = { ...datos[horaIndex], [campo]: valor };
      return { ...prev, hoja3: { ...hoja3, datos } };
    });
  };

  // 🔹 Ajuste: columnas desde VRS hasta TAMAP con 5 caracteres
  const getInputStyle = (col) => {
    const columnas5 = ["VRS","IRVS","SCVO2","PCP","TAMAP"];
    if (columnas5.includes(col)) {
      return { width: "55px", textAlign: "center", maxLength: 5 };
    }
    return { width: "40px", textAlign: "center", maxLength: 3 };
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Monitoría Hemodinámica - 24 horas</h3>

      <button
        type="button"
        onClick={agregarColumna}
        style={{ marginBottom: 10 }}
      >
        + Agregar Columna
      </button>

      <div style={{ overflowX: "auto" }}>
        <table border="1" cellPadding="3" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th>Hora</th>
              {COLUMNAS_BASE.map((col) => (
                <th key={col}>{col}</th>
              ))}
              {columnasExtras.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HORAS.map((hora, i) => (
              <tr key={hora}>
                <td style={{ fontWeight: "bold", textAlign: "center" }}>{hora}</td>
                {COLUMNAS_BASE.map((col) => (
                  <td key={col}>
                    <input
                      type="text"
                      value={form.hoja3?.datos?.[i]?.[col] || ""}
                      onChange={(e) => handleChange(i, col, e.target.value)}
                      style={{
                        width: getInputStyle(col).width,
                        textAlign: "center"
                      }}
                      maxLength={getInputStyle(col).maxLength}
                    />
                  </td>
                ))}
                {columnasExtras.map((col) => (
                  <td key={col}>
                    <input
                      type="text"
                      value={form.hoja3?.datos?.[i]?.[col] || ""}
                      onChange={(e) => handleChange(i, col, e.target.value)}
                      style={{ width: "55px", textAlign: "center" }}
                      maxLength={5}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComponenteHoja3;
