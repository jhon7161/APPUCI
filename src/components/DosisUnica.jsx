// DosisUnica.jsx
import React, { useState } from 'react';

const DosisUnica = ({ form, setForm }) => {
  const [nuevoDosisUnica, setNuevoDosisUnica] = useState({
    hora: '',
    nombre: '',
    dosis: '',
    via: '',
    ordenadoPor: '',
    hospitalariamente: ''
  });

  const agregarDosis = () => {
    if (nuevoDosisUnica.nombre.trim() && nuevoDosisUnica.hora.trim()) {
      setForm(prev => ({
        ...prev,
        dosisUnica: [...(prev.dosisUnica || []), nuevoDosisUnica]
      }));
      setNuevoDosisUnica({
        hora: '',
        nombre: '',
        dosis: '',
        via: '',
        ordenadoPor: '',
        hospitalariamente: ''
      });
    } else {
      alert('Complete nombre y hora');
    }
  };

  const eliminarDosis = (idx) => {
    setForm(prev => ({
      ...prev,
      dosisUnica: prev.dosisUnica.filter((_, i) => i !== idx)
    }));
  };

  return (
    <fieldset className="formulario-paciente">
      <legend>💊 Dosis Única</legend>

      <div className="form-grid-6">
        <input
          type="time"
          value={nuevoDosisUnica.hora}
          onChange={e => setNuevoDosisUnica({ ...nuevoDosisUnica, hora: e.target.value })}
          placeholder="Hora"
        />
        <input
          type="text"
          value={nuevoDosisUnica.nombre}
          onChange={e => setNuevoDosisUnica({ ...nuevoDosisUnica, nombre: e.target.value })}
          placeholder="Nombre"
        />
        <input
          type="text"
          value={nuevoDosisUnica.dosis}
          onChange={e => setNuevoDosisUnica({ ...nuevoDosisUnica, dosis: e.target.value })}
          placeholder="Dosis"
        />
        <input
          type="text"
          value={nuevoDosisUnica.via}
          onChange={e => setNuevoDosisUnica({ ...nuevoDosisUnica, via: e.target.value })}
          placeholder="Vía"
        />
        <input
          type="text"
          value={nuevoDosisUnica.ordenadoPor}
          onChange={e => setNuevoDosisUnica({ ...nuevoDosisUnica, ordenadoPor: e.target.value })}
          placeholder="Ordenado por"
        />
        <input
          type="text"
          value={nuevoDosisUnica.hospitalariamente}
          onChange={e => setNuevoDosisUnica({ ...nuevoDosisUnica, hospitalariamente: e.target.value })}
          placeholder="Hospitalariamente"
        />
      </div>

      <button type="button" onClick={agregarDosis} style={{ marginTop: '0.5rem' }}>
        Agregar
      </button>

      {/* Tabla limpia en lugar de lista */}
      <table className="tabla-limpia" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Hora</th>
            <th>Nombre</th>
            <th>Dosis</th>
            <th>Vía</th>
            <th>Ordenado por</th>
            <th>Hospitalariamente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {form.dosisUnica?.map((dosis, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{dosis.hora}</td>
              <td>{dosis.nombre}</td>
              <td>{dosis.dosis}</td>
              <td>{dosis.via}</td>
              <td>{dosis.ordenadoPor}</td>
              <td>{dosis.hospitalariamente}</td>
              <td>
                <button type="button" onClick={() => eliminarDosis(idx)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </fieldset>
  );
};

export default DosisUnica;
