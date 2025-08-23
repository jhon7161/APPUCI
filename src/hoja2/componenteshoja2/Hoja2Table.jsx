// src/components/hoja2/Hoja2Table.jsx
import React from "react";
import { HORAS } from "./helpers";


const Hoja2Table = ({
  administrados, eliminados,
  totalAdminHora, acumAdmin,
  diuresisHora, diuresisAcum,
  totalElimHora, acumElim,
  balanceAcum, guPorHora,
  onNombreAdmin, onDosisAdmin,
  onDiuresisHora, onNombreElim,
  onValorElim
}) => {
  return (
    <div className="hoja2-table-wrapper">
      <table className="hoja2-table">
        <thead>
          <tr>
            <th>Hora</th>
            {administrados.map((col, i) => (
              <th key={`adm-h-${i}`}>
                <input
                  type="text"
                  placeholder={`Med ${i + 1}`}
                  value={col.nombre}
                  onChange={(e) => onNombreAdmin(i, e.target.value)}
                  className="input-header"
                />
              </th>
            ))}
            <th>Total Adm</th>
            <th>Acum Adm</th>
            <th>Diuresis hora</th>
            <th>Diuresis acum.</th>
            {eliminados.otros.map((col, i) => (
              <th key={`elim-h-${i}`}>
                <input
                  type="text"
                  placeholder={`Otro ${i + 1}`}
                  value={col.nombre}
                  onChange={(e) => onNombreElim(i, e.target.value)}
                  className="input-header"
                />
              </th>
            ))}
            <th>Total Elim</th>
            <th>Acum Elim</th>
            <th>Balance (Acum)</th>
            <th>GU</th>
          </tr>
        </thead>
        <tbody>
          {HORAS.map((hora, h) => (
            <tr key={hora}>
              <td>{hora}</td>
              {administrados.map((col, i) => (
                <td key={`adm-${i}-${h}`}>
                  <input
                    type="number"
                    value={col.dosis[h]}
                    onChange={(e) => onDosisAdmin(i, h, e.target.value)}
                    className="input-cell"
                  />
                </td>
              ))}
              <td>{totalAdminHora[h]}</td>
              <td>{acumAdmin[h]}</td>
              <td>
                <input
                  type="number"
                  value={diuresisHora[h]}
                  onChange={(e) => onDiuresisHora(h, e.target.value)}
                  className="input-cell"
                />
              </td>
              <td>{diuresisAcum[h]}</td>
              {eliminados.otros.map((col, i) => (
                <td key={`elim-${i}-${h}`}>
                  <input
                    type="number"
                    value={col.valores[h]}
                    onChange={(e) => onValorElim(i, h, e.target.value)}
                    className="input-cell"
                  />
                </td>
              ))}
              <td>{totalElimHora[h]}</td>
              <td>{acumElim[h]}</td>
              <td>{balanceAcum[h]}</td>
              <td>{guPorHora[h]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Hoja2Table;
