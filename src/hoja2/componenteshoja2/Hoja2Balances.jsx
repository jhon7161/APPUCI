// src/components/hoja2/Hoja2Balances.jsx
import React from "react";

const Hoja2Balances = ({ totales24h, gu24h }) => {
  return (
    <div className="balances-container">
      <h4 className="balances-title">📊 Balances 24h</h4>
      <div className="balances-table-wrapper">
        <table className="balances-table">
          <thead>
            <tr>
              <th>Total Adm 24h</th>
              <th>Previo</th>
              <th>Total Eliminado 24h</th>
              <th>Balance Día</th>
              <th>Balance Acumulado</th>
              <th>GU 24h</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totales24h.totalAdm}</td>
              <td>{totales24h.previo}</td>
              <td>{totales24h.totalElim}</td>
              <td>{totales24h.balanceDia}</td>
              <td>{totales24h.balanceAcum24}</td>
              <td>{gu24h}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hoja2Balances;
