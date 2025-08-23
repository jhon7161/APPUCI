// src/HOJA4/ComponenteHoja4.jsx
import React from "react";
import Convenciones from "./Convenciones";
import RichmondRass from "./RichmondRass";
import EscalaBraden from "./EscalaBraden";

const HORAS = [
  "07:00","08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00","18:00",
  "19:00","20:00","21:00","22:00","23:00","00:00",
  "01:00","02:00","03:00","04:00","05:00","06:00"
];

const Hoja4 = ({ form, setForm }) => {

  const calcularTotal = (fila) => {
    const ao = parseInt(fila.ao) || 0;
    const rv = parseInt(fila.rv) || 0;
    const rm = parseInt(fila.rm) || 0;
    const suma = ao + rv + rm;
    return suma ? `${suma}/15` : "";
  };

  const handleChange = (index, field, value) => {
    const nuevosDatos = form.hoja4.datos.map((d, i) =>
      i === index ? { ...d, [field]: value, total: calcularTotal({ ...d, [field]: value }) } : d
    );
    setForm(prev => ({ ...prev, hoja4: { datos: nuevosDatos } }));
  };

  const inputStyle = { width: "40px", textAlign: "center", margin: "0 2px" };

  return (
    <div className="hoja4-container">
      <h2>Hoja 4 - Control Neurológico</h2>

      <table className="hoja4-table">
        <thead>
          <tr>
            <th>Hora</th>
            <th>RASS</th>
            <th>Pupilas (mm) OD/OI</th>
            <th>Reacción OD/OI</th>
            <th>Conciencia</th>
            <th>Fuerza Der/Izq</th>
            <th>Convulsiones</th>
            <th>Glasgow AO/RV/RM/Total</th>
          </tr>
        </thead>
        <tbody>
          {form.hoja4.datos.map((row, index) => (
            <tr key={row.hora}>
              <td>{row.hora}</td>

              <td>
                <select value={row.rass} onChange={e => handleChange(index,'rass',e.target.value)} style={inputStyle}>
                  <option value="">-</option>
                  {[-5,-4,-3,-2,-1,0,1,2,3,4].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </td>

              <td>
                <select value={row.pupilaOD} onChange={e => handleChange(index,'pupilaOD',e.target.value)} style={inputStyle}>
                  <option value="">-</option>
                  {[1,2,3,4,5,6].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                <select value={row.pupilaOI} onChange={e => handleChange(index,'pupilaOI',e.target.value)} style={inputStyle}>
                  <option value="">-</option>
                  {[1,2,3,4,5,6].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </td>

              <td>
                <select value={row.reaccionOD} onChange={e => handleChange(index,'reaccionOD',e.target.value)} style={inputStyle}>
                  <option value="">-</option>
                  {["R","H","F"].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                <select value={row.reaccionOI} onChange={e => handleChange(index,'reaccionOI',e.target.value)} style={inputStyle}>
                  <option value="">-</option>
                  {["R","H","F"].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </td>

              <td>
                <select value={row.conciencia} onChange={e => handleChange(index,'conciencia',e.target.value)} style={{...inputStyle,width:"50px"}}>
                  <option value="">-</option>
                  {["A","S","EST","C"].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </td>

              <td>
                <select value={row.fuerzaDer} onChange={e => handleChange(index,'fuerzaDer',e.target.value)} style={inputStyle}>
                  <option value="">-</option>
                  {["P","D","A"].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                <select value={row.fuerzaIzq} onChange={e => handleChange(index,'fuerzaIzq',e.target.value)} style={inputStyle}>
                  <option value="">-</option>
                  {["P","D","A"].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </td>

              <td>
                <select value={row.convulsiones} onChange={e => handleChange(index,'convulsiones',e.target.value)} style={{...inputStyle,width:"50px"}}>
                  <option value="">-</option>
                  {["Sí","No"].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </td>

              <td className="hoja4-gl-total">
                AO <input type="text" value={row.ao} onChange={e => handleChange(index,'ao',e.target.value)} style={inputStyle}/>
                RV <input type="text" value={row.rv} onChange={e => handleChange(index,'rv',e.target.value)} style={inputStyle}/>
                RM <input type="text" value={row.rm} onChange={e => handleChange(index,'rm',e.target.value)} style={inputStyle}/>
                Total <input type="text" value={row.total} readOnly style={{...inputStyle, backgroundColor:"#eee"}}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Convenciones />
      <RichmondRass />
       <EscalaBraden form={form} setForm={setForm} />
    </div>
  );
};

export default Hoja4;
