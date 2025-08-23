// src/components/RichmondRass.jsx
import React from "react";
import "./RichmondRass.css";

const datosRASS = [
  { puntuacion: "Mas 4", termino: "combativo", descripcion: "combativo y violento, peligro inmediato para el grupo" },
  { puntuacion: "Mas 3", termino: "muy agitado", descripcion: "agresivo, se intenta retirar los tubos o cateteres" },
  { puntuacion: "Mas 2", termino: "agitado", descripcion: "movimientos frecuentes y sin proposito lucha con el ventilador" },
  { puntuacion: "Mas 1", termino: "inquieto", descripcion: "ansioso pero sin movimientos agresivos" },
  { puntuacion: "0", termino: "despierto y tranquilo", descripcion: "" },
  { puntuacion: "Menos 1", termino: "somnoliento", descripcion: "no esta plenamente alerta pero se mantiene despierto mas de diez segundos" },
  { puntuacion: "Menos 2", termino: "sedacion leve", descripcion: "despierta brevemente a la voz, mantiene contacto visual hasta diez segundos" },
  { puntuacion: "Menos 3", termino: "sedaccion moderada", descripcion: "movimiento o apertura a la voz, sin contacto visual" },
  { puntuacion: "Menos 4", termino: "sedaccion profunda", descripcion: "sin respuesta a la voz con movimiento o apertura ocular al estimulo fisico" },
  { puntuacion: "Menos 5", termino: "sin respuesta", descripcion: "sin respuesta a la voz o estimulo fisico" },
];

const RichmondRass = () => {
  return (
    <div className="rass-container">
      <h2 className="titulo">AGITACION SEDACCION RICHMOND RASS</h2>
      <table className="rass-table">
        <thead>
          <tr>
            <th>PUNTUACION</th>
            <th>TERMINO</th>
            <th>DESCRIPCION</th>
          </tr>
        </thead>
        <tbody>
          {datosRASS.map((item, index) => (
            <tr key={index}>
              <td>{item.puntuacion}</td>
              <td>{item.termino}</td>
              <td>{item.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RichmondRass;
