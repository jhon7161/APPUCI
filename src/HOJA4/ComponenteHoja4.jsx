
import React, { useState } from "react";
import Convenciones from "./Convenciones";
import RichmondRass from "./RichmondRass";
import EscalaBraden from "./EscalaBraden";

const HORAS = [
  "07:00","08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00","18:00",
  "19:00","20:00","21:00","22:00","23:00","00:00",
  "01:00","02:00","03:00","04:00","05:00","06:00"
];

const Hoja4 = () => {
  const [datos, setDatos] = useState(
    HORAS.map(h => ({
      hora: h,
      rass: "",
      pupilaOD: "",
      pupilaOI: "",
      reaccionOD: "",
      reaccionOI: "",
      conciencia: "",
      fuerzaDer: "",
      fuerzaIzq: "",
      convulsiones: "",
      ao: "",
      rv: "",
      rm: "",
      total: ""
    }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...datos];
    updated[index][field] = value;

    // recalcular Glasgow total
    const ao = parseInt(updated[index].ao) || 0;
    const rv = parseInt(updated[index].rv) || 0;
    const rm = parseInt(updated[index].rm) || 0;
    updated[index].total = ao + rv + rm;

    setDatos(updated);
  };

  const inputStyle = {
    width: "40px",
    textAlign: "center",
    margin: "0 2px"
  };

  return (
    <div style={{ padding: "15px", overflowX: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
        Hoja 4 - Control Neurológico
      </h2>

      {/* Tabla principal de control neurológico */}
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "12px" }}>
        <thead>
          <tr style={{ backgroundColor: "#ddd" }}>
            <th style={{ border: "1px solid #999", padding: "4px" }}>Hora</th>
            <th style={{ border: "1px solid #999", padding: "4px" }}>RASS</th>
            <th style={{ border: "1px solid #999", padding: "4px" }}>Pupilas (mm) OD/OI</th>
            <th style={{ border: "1px solid #999", padding: "4px" }}>Reacción OD/OI</th>
            <th style={{ border: "1px solid #999", padding: "4px" }}>Conciencia</th>
            <th style={{ border: "1px solid #999", padding: "4px" }}>Fuerza Der/Izq</th>
            <th style={{ border: "1px solid #999", padding: "4px" }}>Convulsiones</th>
            <th style={{ border: "1px solid #999", padding: "4px" }}>Glasgow AO/RV/RM/Total</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((row, index) => (
            <tr key={row.hora}>
              <td style={{ border: "1px solid #999", padding: "2px", textAlign: "center" }}>
                {row.hora}
              </td>

              {/* RASS */}
              <td style={{ border: "1px solid #999", padding: "2px", textAlign: "center" }}>
                <input
                  type="text"
                  value={row.rass}
                  onChange={(e) => handleChange(index, "rass", e.target.value)}
                  style={inputStyle}
                  placeholder="-5 a +4"
                />
              </td>

              {/* Pupilas */}
              <td style={{ border: "1px solid #999", padding: "2px", textAlign: "center" }}>
                <input
                  type="text"
                  placeholder="OD"
                  value={row.pupilaOD}
                  onChange={(e) => handleChange(index, "pupilaOD", e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="OI"
                  value={row.pupilaOI}
                  onChange={(e) => handleChange(index, "pupilaOI", e.target.value)}
                  style={inputStyle}
                />
              </td>

              {/* Reacción */}
              <td style={{ border: "1px solid #999", padding: "2px", textAlign: "center" }}>
                <input
                  type="text"
                  placeholder="OD"
                  value={row.reaccionOD}
                  onChange={(e) => handleChange(index, "reaccionOD", e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="OI"
                  value={row.reaccionOI}
                  onChange={(e) => handleChange(index, "reaccionOI", e.target.value)}
                  style={inputStyle}
                />
              </td>

              {/* Conciencia */}
              <td style={{ border: "1px solid #999", padding: "2px", textAlign: "center" }}>
                <input
                  type="text"
                  value={row.conciencia}
                  onChange={(e) => handleChange(index, "conciencia", e.target.value)}
                  style={{ ...inputStyle, width: "50px" }}
                  placeholder="A/S/EST/C"
                />
              </td>

              {/* Fuerza */}
              <td style={{ border: "1px solid #999", padding: "2px", textAlign: "center" }}>
                <input
                  type="text"
                  placeholder="Der"
                  value={row.fuerzaDer}
                  onChange={(e) => handleChange(index, "fuerzaDer", e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Izq"
                  value={row.fuerzaIzq}
                  onChange={(e) => handleChange(index, "fuerzaIzq", e.target.value)}
                  style={inputStyle}
                />
              </td>

              {/* Convulsiones */}
              <td style={{ border: "1px solid #999", padding: "2px", textAlign: "center" }}>
                <input
                  type="text"
                  value={row.convulsiones}
                  onChange={(e) => handleChange(index, "convulsiones", e.target.value)}
                  style={{ ...inputStyle, width: "50px" }}
                  placeholder="Sí/No"
                />
              </td>

              {/* Glasgow */}
              <td style={{ border: "1px solid #999", padding: "2px", textAlign: "center" }}>
                AO <input
                  type="text"
                  value={row.ao}
                  onChange={(e) => handleChange(index, "ao", e.target.value)}
                  style={inputStyle}
                />
                RV <input
                  type="text"
                  value={row.rv}
                  onChange={(e) => handleChange(index, "rv", e.target.value)}
                  style={inputStyle}
                />
                RM <input
                  type="text"
                  value={row.rm}
                  onChange={(e) => handleChange(index, "rm", e.target.value)}
                  style={inputStyle}
                />
                Total <input
                  type="text"
                  value={row.total}
                  readOnly
                  style={{ ...inputStyle, backgroundColor: "#eee" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Guía de convenciones */}
      <Convenciones />

      {/* Escala de RASS */}
      <RichmondRass />

      {/* Escala de Braden */}
      <EscalaBraden />
    </div>
  );
};

export default Hoja4;
