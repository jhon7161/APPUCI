// src/components/ComponenteGasesSanguineos.jsx
import React, { useState } from "react";


const COLUMNAS = [
  "Hora",
  "ART",
  "VEN",
  "YUG",
  "PH",
  "PCO2",
  "PO2",
  "BTO",
  "DB",
  "SAT",
  "H+",
  "CSO2",
  "PAO/FIO2",
  "QS/QT",
  "DavO2",
  "REO2",
  "IDO2",
  "IVO2",
];

const FILAS_INICIALES = Array.from({ length: 6 }, () =>
  COLUMNAS.reduce((acc, col) => ({ ...acc, [col]: "" }), {})
);

const ComponenteGasesSanguineos = () => {
  const [filas, setFilas] = useState(FILAS_INICIALES);
  const [neumonia, setNeumonia] = useState({
    NN: "",
    NAC: { M: "", T: "", N: "" },
    NAN: { M: "", T: "", N: "" },
    NBA: { M: "", T: "", N: "" },
  });
  const [terapeuta, setTerapeuta] = useState("");
  const [diasVM, setDiasVM] = useState("");

  const handleChange = (index, col, value) => {
    const nuevas = [...filas];
    nuevas[index][col] = value;
    setFilas(nuevas);
  };

  const handleNeumoniaChange = (tipo, campo, value) => {
    if (campo) {
      setNeumonia({
        ...neumonia,
        [tipo]: { ...neumonia[tipo], [campo]: value },
      });
    } else {
      setNeumonia({ ...neumonia, [tipo]: value });
    }
  };

  return (
    <div className="hoja6-container">
      <h2 className="titulo">Gases Sanguíneos</h2>
      <table className="tabla">
        <thead>
          <tr>
            {COLUMNAS.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, i) => (
            <tr key={i}>
              {COLUMNAS.map((col) => (
                <td key={col}>
                  <input
                    type="text"
                    value={fila[col]}
                    onChange={(e) => handleChange(i, col, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bloque Neumonía y Terapia */}
      
    </div>
  );
};

export default ComponenteGasesSanguineos;
