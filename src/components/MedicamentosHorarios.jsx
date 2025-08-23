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
      <div className="grid-8 input-grid">
        {Object.keys(nuevoMedHorario).map((key) => (
          <input
            key={key}
            type={key === 'fechaInicio' ? 'date' : 'text'}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={nuevoMedHorario[key]}
            onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, [key]: e.target.value })}
          />
        ))}
      </div>

      <button className="btn-agregar" type="button" onClick={agregarMedicamento}>Agregar</button>

      <div className="table-wrapper">
        <table className="tabla">
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
      <td className="celda-num">{idx + 1}</td>
      <td className="celda-input">{med.fechaInicio}</td>
      <td className="celda-input">{med.nombre}</td>
      <td className="celda-input">{med.horas}</td>
      <td className="celda-input">{med.dosis}</td>
      <td className="celda-input">{med.via}</td>
      <td className="celda-input">{med.manana}</td>
      <td className="celda-input">{med.tarde}</td>
      <td className="celda-input">{med.noche}</td>
      <td>
        <button className="btn-eliminar" onClick={() => eliminarMedicamento(idx)}>❌</button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </fieldset>
  );
};

export default MedicamentosHorarios;
