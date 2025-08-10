import React, { useState } from 'react';

const MedicamentosHorarios = ({ form, setForm }) => {
  const [nuevoMedHorario, setNuevoMedHorario] = useState({
    fechaInicio: '',
    nombre: '',
    horas: '',
    dosis: '',
    via: '',
    manana: '',
    tarde: '',
    noche: ''
  });

  const agregarMedicamento = () => {
    if (
      nuevoMedHorario.nombre.trim() &&
      nuevoMedHorario.fechaInicio.trim() &&
      nuevoMedHorario.dosis.trim()
    ) {
      setForm(prev => ({
        ...prev,
        medicamentosHorarios: [...(prev.medicamentosHorarios || []), nuevoMedHorario],
      }));
      setNuevoMedHorario({
        fechaInicio: '',
        nombre: '',
        horas: '',
        dosis: '',
        via: '',
        manana: '',
        tarde: '',
        noche: ''
      });
    } else {
      alert('Complete nombre, fecha inicio y dosis');
    }
  };

  const eliminarMedicamento = (idx) => {
    setForm(prev => ({
      ...prev,
      medicamentosHorarios: prev.medicamentosHorarios.filter((_, i) => i !== idx)
    }));
  };

  return (
    <fieldset className="fieldset-med">
      <legend>🕒 Medicamentos en Horarios</legend>
      <div className="grid-8">
        <input
          type="date"
          value={nuevoMedHorario.fechaInicio}
          onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, fechaInicio: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoMedHorario.nombre}
          onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Horas"
          value={nuevoMedHorario.horas}
          onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, horas: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dosis"
          value={nuevoMedHorario.dosis}
          onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, dosis: e.target.value })}
        />
        <input
          type="text"
          placeholder="Vía"
          value={nuevoMedHorario.via}
          onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, via: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mañana (enfermero)"
          value={nuevoMedHorario.manana}
          onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, manana: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tarde (enfermero)"
          value={nuevoMedHorario.tarde}
          onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, tarde: e.target.value })}
        />
        <input
          type="text"
          placeholder="Noche (enfermero)"
          value={nuevoMedHorario.noche}
          onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, noche: e.target.value })}
        />
      </div>

      <button type="button" onClick={agregarMedicamento}>
        Agregar
      </button>

      {/* Tabla en lugar de lista */}
      <table className="tabla-limpia" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha Inicio</th>
            <th>Nombre</th>
            <th>Horas</th>
            <th>Dosis</th>
            <th>Vía</th>
            <th>Mañana</th>
            <th>Tarde</th>
            <th>Noche</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {form.medicamentosHorarios?.map((med, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{med.fechaInicio}</td>
              <td>{med.nombre}</td>
              <td>{med.horas}</td>
              <td>{med.dosis}</td>
              <td>{med.via}</td>
              <td>{med.manana}</td>
              <td>{med.tarde}</td>
              <td>{med.noche}</td>
              <td>
                <button type="button" onClick={() => eliminarMedicamento(idx)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </fieldset>
  );
};

export default MedicamentosHorarios;
