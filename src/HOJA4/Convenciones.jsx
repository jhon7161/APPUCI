// src/components/Convenciones.jsx
import React from "react";
import "./Convenciones.css";

const PupilaCircle = ({ size }) => {
  // Escala: cada mm = 6px de diámetro
  const diameter = size * 6;
  return (
    <div
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
        borderRadius: "50%",
        backgroundColor: "black",
        margin: "0 auto",
      }}
    ></div>
  );
};

const Convenciones = () => {
  const datos = [
    {
      texto: "1= Agitado, ansioso",
      pupila: 1,
      extra: ["A=ALERTA", "P=PRESENTE", "1", "NO", "NO", "NO"],
    },
    {
      texto: "2=Cooperador, orientado, tranquilo",
      pupila: 2,
      extra: ["S=SOMNOLIENTO", "D=DISMINUIDA", "2", "Al dolor", "Incomprensible", "Extensión"],
    },
    {
      texto: "3=Responde a órdenes",
      pupila: 3,
      extra: ["EST=ESTUPOR", "A=AUSENTE", "3", "Al hablarle", "Inapropiada", "Flexión"],
    },
    {
      texto: "4= Dormido breve respuesta a la luz",
      pupila: 4,
      extra: ["C=COMA", "", "4", "Espontánea", "Confusa", "Retirada"],
    },
    {
      texto: "5= Respuesta a solo dolor",
      pupila: 5,
      extra: ["", "", "5", "", "Orientado", "Localiza"],
    },
    {
      texto: "6= No responde",
      pupila: 6,
      extra: ["", "", "6", "", "", "Obedece"],
    },
  ];

  return (
    <div className="convenciones-container">
      <h2 className="titulo">CONVENCIONES</h2>
      <table className="convenciones-tabla">
        <tbody>
          {datos.map((fila, i) => (
            <tr key={i}>
              {/* Texto */}
              <td>{fila.texto}</td>

              {/* Columna de pupila con círculo */}
              <td>
                <PupilaCircle size={fila.pupila} />
              </td>

              {/* Columna con número en mm */}
              <td>{fila.pupila}mm</td>

              {/* Extras */}
              {fila.extra.map((e, j) =>
                e ? (
                  <td key={j}>{e}</td>
                ) : (
                  <td
                    key={j}
                    style={{
                      border: "none", // sin cuadricula
                      background: "transparent",
                    }}
                  />
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Convenciones;
