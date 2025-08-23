// src/HOJA4/EscalaBraden.jsx
import React from "react";

const condiciones = [
  {
    id: "percepcion",
    nombre: "Percepción sensorial",
    opciones: [
      "Completamente limitada",
      "Muy limitada",
      "Levemente limitada",
      "Sin alteración",
    ],
  },
  {
    id: "humedad",
    nombre: "Humedad: grado de humedad",
    opciones: [
      "Constantemente húmeda",
      "Muy húmeda",
      "Ocasionalmente húmeda",
      "Raramente húmeda",
    ],
  },
  {
    id: "actividad",
    nombre: "Actividad: grado de actividad física",
    opciones: [
      "Confinado a la cama",
      "Confinado a la silla",
      "Ocasionalmente camina",
      "Camina frecuentemente",
    ],
  },
  {
    id: "movilidad",
    nombre: "Movilidad",
    opciones: [
      "Completamente inmóvil",
      "Muy limitada",
      "Ligeramente limitada",
      "Sin limitación",
    ],
  },
  {
    id: "nutricion",
    nombre: "Nutrición",
    opciones: [
      "Muy inadecuada",
      "Probablemente inadecuada",
      "Adecuada",
      "Buena",
    ],
  },
  {
    id: "friccion",
    nombre: "Fricción y deslizamiento",
    opciones: [
      "Es un problema",
      "Problema potencial",
      "Sin problema aparente",
      "Buena",
    ],
  },
];

const calcularClasificacion = (puntaje) => {
  if (puntaje <= 12) return "Alto riesgo";
  if (puntaje >= 13 && puntaje <= 14) return "Riesgo moderado";
  if (puntaje >= 15 && puntaje <= 16) return "Riesgo bajo";
  return "Sin riesgo (≥17)";
};

const EscalaBraden = ({ form, setForm }) => {
  const braden = form.hoja4?.braden || {};
  const respuestas = braden.respuestas || {};
  const upp = braden.upp || [
    { derecha: "", izquierda: "" },
    { derecha: "", izquierda: "" },
    { derecha: "", izquierda: "" },
  ];
  const observaciones = braden.observaciones || "";

  const handleSelect = (condicionId, valor) => {
    const nuevasRespuestas = { ...respuestas, [condicionId]: valor };
    setForm(prev => ({
      ...prev,
      hoja4: {
        ...prev.hoja4,
        braden: { ...prev.hoja4?.braden, respuestas: nuevasRespuestas, upp, observaciones }
      }
    }));
  };

  const handleUppChange = (index, lado, valor) => {
    const nuevoUpp = upp.map((fila, i) => i === index ? { ...fila, [lado]: valor } : fila);
    setForm(prev => ({
      ...prev,
      hoja4: {
        ...prev.hoja4,
        braden: { ...prev.hoja4?.braden, respuestas, upp: nuevoUpp, observaciones }
      }
    }));
  };

  const handleObservacionesChange = (valor) => {
    setForm(prev => ({
      ...prev,
      hoja4: {
        ...prev.hoja4,
        braden: { ...prev.hoja4?.braden, respuestas, upp, observaciones: valor }
      }
    }));
  };

  const puntajeTotal = Object.values(respuestas).reduce(
    (acc, val) => acc + (parseInt(val) || 0),
    0
  );
  const clasificacion = calcularClasificacion(puntajeTotal);

  return (
    <div style={{ display: "flex", gap: "20px", padding: 20 }}>
      <div style={{ flex: 2 }}>
        <h2 style={{ textAlign: "center", marginBottom: 14, fontSize: "20px" }}>
          ESCALA DE BRADEN PARA PREDECIR RIESGO DE UPP
        </h2>

        <table
          border="1"
          cellPadding="8"
          style={{ width: "90%", borderCollapse: "collapse", marginBottom: 20 }}
        >
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th>Condiciones</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
            </tr>
          </thead>
          <tbody>
            {condiciones.map((cond) => (
              <tr key={cond.id}>
                <td>{cond.nombre}</td>
                {cond.opciones.map((op, idx) => (
                  <td
                    key={idx}
                    onClick={() => handleSelect(cond.id, idx + 1)}
                    style={{
                      cursor: "pointer",
                      background: respuestas[cond.id] === idx + 1 ? "#d4edda" : "white",
                    }}
                  >
                    {op}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <h4 style={{ marginTop: 20 }}>Sitio anatómico UPP IZQ o DER</h4>
        <table
          border="1"
          cellPadding="1"
          style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}
        >
          <tbody>
            {upp.map((fila, i) => (
              <tr key={i}>
                <td>
                  D(
                  <input
                    type="text"
                    value={fila.derecha}
                    onChange={(e) => handleUppChange(i, "derecha", e.target.value)}
                    style={{ width: "70px", margin: "0 5px" }}
                  /> )
                </td>
                <td>
                  I(
                  <input
                    type="text"
                    value={fila.izquierda}
                    onChange={(e) => handleUppChange(i, "izquierda", e.target.value)}
                    style={{ width: "70px", margin: "0 5px" }}
                  /> )
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h4>Observaciones sobre UPP</h4>
          <textarea
            rows="4"
            style={{ width: "100%", resize: "vertical" }}
            value={observaciones}
            onChange={(e) => handleObservacionesChange(e.target.value)}
          />
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{ textAlign: "center", marginBottom: 20, fontSize: "20px" }}>
          CLASIFICACIÓN DEL RIESGO
        </h2>

        <table
          border="1"
          cellPadding="7"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th>Puntaje</th>
              <th>Riesgo de desarrollar úlcera por presión</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{"<= 12"}</td>
              <td>Alto riesgo</td>
            </tr>
            <tr>
              <td>13 - 14</td>
              <td>Riesgo moderado</td>
            </tr>
            <tr>
              <td>15 - 16</td>
              <td>Riesgo bajo</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ marginTop: 20 }}>Puntuación total: {puntajeTotal}</h3>
        <h3>Clasificación: {clasificacion}</h3>
      </div>
    </div>
  );
};

export default EscalaBraden;
