import React, { useState } from "react";
import Tiss28Form from "./Tiss28Form";
import '../index.css'

const DatosBasicos = ({ form, onChange }) => {
  const [mostrarTiss, setMostrarTiss] = useState(false);
  const abrirTiss = () => setMostrarTiss(true);
  const cerrarTiss = () => setMostrarTiss(false);

  const guardarTiss = (total /*, seleccionados */) => {
    // Ajusta al handler padre que espera e.target
    onChange({ target: { name: "tiss", value: String(total) } });
    cerrarTiss();
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <div style={{ flex: 1 }}>
        <label>Nombre:</label>
        <input name="nombre" value={form.nombre || ""} onChange={onChange} />
      </div>
      <div style={{ flex: 1 }}>
        <label>Apellido:</label>
        <input name="apellido" value={form.apellido || ""} onChange={onChange} />
      </div>
      <div style={{ flex: 1 }}>
        <label>Edad:</label>
        <input name="edad" value={form.edad || ""} onChange={onChange} />
      </div>

      {/* Selector de sexo */}
      <div style={{ flex: 1 }}>
        <label>Sexo:</label>
        <select name="sexo" value={form.sexo || ""} onChange={onChange}>
          <option value="">Seleccione...</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>

      <div style={{ flex: 1 }}>
        <label>SC:</label>
        <input name="sc" value={form.sc || ""} readOnly />
      </div>

      {/* TISS */}
      <div style={{ flex: 1 }}>
        <label>TISS:</label>
        <input
          name="tiss"
          value={form.tiss || ""}
          readOnly
          onClick={abrirTiss}
          title="Haz clic para valorar TISS-28"
          style={{ cursor: "pointer", background: "#f0f8ff" }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <label>APACHE:</label>
        <input name="apache" value={form.apache || ""} onChange={onChange} />
      </div>

      {mostrarTiss && (
        <Tiss28Form
          onClose={cerrarTiss}
          onSave={guardarTiss}
          // defaultSelected={[8,12]} // opcional
        />
      )}
    </div>
  );
};

export default DatosBasicos;
