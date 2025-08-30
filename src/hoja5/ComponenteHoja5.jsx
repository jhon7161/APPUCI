// src/components/ComponenteHoja5.jsx
import React from "react";
import InsumosForm from "./InsumosForm";

const CONVENCIONES = [
  { label: "→", value: "viene" },
  { label: "↑", value: "inicia" },
  { label: "▲", value: "cambia" },
  { label: "↓", value: "susp" },
];

const HORAS_GLUCO = [
  "06:00","08:00","10:00","12:00","14:00","16:00",
  "18:00","20:00","22:00","00:00","02:00","04:00"
];

const INVASIVOS_BASE = [
  ["cateter central", "EKG"],
  ["cateter mahurkar", "ecocardiograma"],
  ["cateter swan-ganz", "ecografia"],
  ["embolizacion de aneurisma", "TAC"],
  ["cateter arterial", "RNM"],
  ["cateter PIC", "rayos x"],
  ["cateter drum", "examenes laboratorio"],
  ["venopunsion", "baño"],
  ["sonda vesical", "cuidado ocular"],
  ["introductor de marcapaso transv", "cambios posicion y masaje"],
  ["marcapaso trasvenoso", "curacion"],
  ["marcapaso epicardico", "lavado gastrico"],
  ["marcapaso trascutaneo", "reanimacion CCP"],
  ["colostomia", "via oral"],
  ["sonda punta tungsteno", "nutricion enteral"],
  ["cateterismo cardiaco", "nutricion parenteral"],
  ["tubo a torax", "higiene oral"],
  ["tubo mediastinal", ""],
  ["traqueostomia", ""],
  ["intubacion orotraqueal", ""],
  ["herida quirurgica", ""],
  ["gastrostomia", ""],
  ["cateter CAPD", ""],
  ["cateter ventriculostomia", ""],
  ["cateter multiproposito", ""],
  ["drenaje hemovac", ""],
  ["teraopia VAC", ""],
  ["cateter PIA", ""],
  ["OTRO", ""],
];

/* === Componentes auxiliares === */
const SelectConvencion = ({ value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    <option value=""></option>
    {CONVENCIONES.map((c) => (
      <option key={c.value} value={c.label}>
        {c.label}
      </option>
    ))}
  </select>
);

const CeldaProcedimiento = ({ activo, onToggle }) => (
  <td
    onClick={onToggle}
    style={{ cursor: "pointer", background: activo ? "lightgreen" : "", textAlign: "center" }}
  >
    {activo ? "✔" : ""}
  </td>
);

const FilaGlucometria = ({ label, campo, data, onChange }) => (
  <tr>
    <td><strong>{label}</strong></td>
    {data.map((g, idx) => (
      <td key={g.hora}>
        <input
          type="number"
          value={g[campo] || ""}
          onChange={(e) => onChange(idx, campo, e.target.value)}
          style={{ width: 60 }}
          placeholder={campo === "valor" ? "mg/dL" : "U"}
        />
      </td>
    ))}
  </tr>
);

/* === Componente principal === */
const ComponenteHoja5 = ({ form, setForm }) => {
  const hoja5 = form.hoja5 || {};

  const invasivos = hoja5.invasivos || INVASIVOS_BASE;
  const extraData = hoja5.extraData || INVASIVOS_BASE.map(() => ({
    sitio: "",
    fecha: "",
    dias: "",
    observacion: "",
    procedimientosTexto: "",
    procedimientos: { M: false, T: false, N: false },
    convenciones: { M: "", T: "", N: "" },
  }));
  const glucometrias = hoja5.glucometrias || HORAS_GLUCO.map((hora) => ({ hora, valor: "", insulina: "" }));

  const actualizarHoja5 = (nuevos) => setForm(prev => ({ ...prev, hoja5: { ...prev.hoja5, ...nuevos } }));

  const handleChangeConvencion = (idx, turno, value) => {
    const nuevos = [...extraData];
    nuevos[idx].convenciones[turno] = value;
    if (value === "▲") {
      const nuevosInvasivos = [...invasivos];
      nuevosInvasivos.splice(idx + 1, 0, [invasivos[idx][0], ""]);
      nuevos.splice(idx + 1, 0, { sitio: "", fecha: "", dias: "", observacion: "", procedimientosTexto: "", procedimientos: { M: false, T: false, N: false }, convenciones: { M: "", T: "", N: "" } });
      actualizarHoja5({ invasivos: nuevosInvasivos, extraData: nuevos });
    } else {
      actualizarHoja5({ extraData: nuevos });
    }
  };

  const handleFecha = (idx, fecha) => {
    const nuevos = [...extraData];
    nuevos[idx].fecha = fecha;
    if (fecha) {
      const f = new Date(fecha);
      const hoy = new Date();
      const diff = Math.floor((hoy - f) / (1000 * 60 * 60 * 24));
      nuevos[idx].dias = diff >= 0 ? diff : 0;
    }
    actualizarHoja5({ extraData: nuevos });
  };

  const handleObs = (idx, value) => {
    const nuevos = [...extraData];
    nuevos[idx].observacion = value;
    actualizarHoja5({ extraData: nuevos });
  };

  const handleSitio = (idx, value) => {
    const nuevos = [...extraData];
    nuevos[idx].sitio = value;
    actualizarHoja5({ extraData: nuevos });
  };

  const handleProcedimientoTexto = (idx, value) => {
    const nuevos = [...extraData];
    nuevos[idx].procedimientosTexto = value;
    actualizarHoja5({ extraData: nuevos });
  };

  const toggleProcedimiento = (idx, turno) => {
    const nuevos = [...extraData];
    nuevos[idx].procedimientos[turno] = !nuevos[idx].procedimientos[turno];
    actualizarHoja5({ extraData: nuevos });
  };

  const handleGlucoChange = (idx, campo, valor) => {
    const nuevos = [...glucometrias];
    nuevos[idx][campo] = valor;
    actualizarHoja5({ glucometrias: nuevos });
  };

  return (
    <div className="hoja5-wrapper" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <table className="hoja5-table">
        <thead>
          <tr>
            <th>D. INVASIVOS</th><th>SITIO</th><th>M</th><th>T</th><th>N</th>
            <th>FECHA INSERC</th><th>DIAS</th><th>OBS</th>
            <th>PROCEDIMIENTOS</th><th>M</th><th>T</th><th>N</th>
          </tr>
        </thead>
        <tbody>
          {invasivos.map((row, idx) => (
            <tr key={idx}>
              <td>{row[0]}</td>
              <td>
                <input
                  type="text"
                  value={extraData[idx]?.sitio || ""}
                  onChange={(e) => handleSitio(idx, e.target.value)}
                  style={{ width: 80 }} // <- ancho reducido
                />
              </td>
              {["M","T","N"].map(turno => (
                <td key={turno}>
                  <SelectConvencion
                    value={extraData[idx]?.convenciones?.[turno] || ""}
                    onChange={(val) => handleChangeConvencion(idx, turno, val)}
                  />
                </td>
              ))}
              <td>
                <input type="date" value={extraData[idx]?.fecha || ""} onChange={e => handleFecha(idx, e.target.value)} />
              </td>
              <td>{extraData[idx]?.dias}</td>
              <td>
                <input type="text" value={extraData[idx]?.observacion || ""} onChange={e => handleObs(idx, e.target.value)} />
              </td>
              <td>
                <input
                  type="text"
                  value={extraData[idx]?.procedimientosTexto || row[1]}
                  onChange={(e) => handleProcedimientoTexto(idx, e.target.value)}
                />
              </td>
              {["M","T","N"].map(t => (
                <CeldaProcedimiento key={t} activo={extraData[idx]?.procedimientos?.[t]} onToggle={() => toggleProcedimiento(idx,t)} />
              ))}
            </tr>
          ))}
        </tbody>
         <tr>
      <td colSpan="12" style={{ textAlign: "center", fontWeight: "bold", paddingTop: 10 }}>
        Convenciones: → viene | ↑ inicia | ▲ cambia | ↓ susp
      </td>
             </tr>
            </table>
            <div style={{ overflowX: "auto" }}>
            <table className="hoja5-table gluco-table" border="1">
            <thead>
             <tr>
              <th></th>
              {HORAS_GLUCO.map(hora => <th key={hora}>{hora}</th>)}
            </tr>
          </thead>
          <tbody>
            <FilaGlucometria label="Glucometría (mg/dL)" campo="valor" data={glucometrias} onChange={handleGlucoChange} />
            <FilaGlucometria label="Insulina (U)" campo="insulina" data={glucometrias} onChange={handleGlucoChange} />
          </tbody>
        </table>
      </div>

      <InsumosForm form={form} setForm={setForm} />
    </div>
  );
};

export default ComponenteHoja5;
