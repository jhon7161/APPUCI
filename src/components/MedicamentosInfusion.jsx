import React, { useState } from 'react';

const MedicamentosInfusion = ({ form, setForm }) => {
  const [nuevoMedInfusion, setNuevoMedInfusion] = useState({ nombre: '', dosis: '' });

  const agregarMedicamento = () => {
    if (nuevoMedInfusion.nombre.trim() && nuevoMedInfusion.dosis.trim()) {
      setForm(prev => ({
        ...prev,
        medicamentosInfusion: [...(prev.medicamentosInfusion || []), { ...nuevoMedInfusion }]
      }));
      setNuevoMedInfusion({ nombre: '', dosis: '' });
    } else {
      alert('Complete nombre y dosis');
    }
  };

  const eliminarMedicamento = (idx) => {
    setForm(prev => ({
      ...prev,
      medicamentosInfusion: prev.medicamentosInfusion.filter((_, i) => i !== idx)
    }));
  };

  return (
    <fieldset className="fieldset-med">
      <legend>💉 Medicamentos en Infusión</legend>
      <div className="flex-gap">
        <input
          type="text"
          placeholder="Nombre del medicamento"
          name="nombre"
          value={nuevoMedInfusion.nombre}
          onChange={(e) =>
            setNuevoMedInfusion({ ...nuevoMedInfusion, nombre: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Dosis (ej: 20 mg/hora)"
          name="dosis"
          value={nuevoMedInfusion.dosis}
          onChange={(e) =>
            setNuevoMedInfusion({ ...nuevoMedInfusion, dosis: e.target.value })
          }
        />
        <button type="button" onClick={agregarMedicamento}>
          Agregar
        </button>
      </div>

      {/* Tabla en lugar de lista */}
      <table className="tabla-limpia" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Dosis</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {form.medicamentosInfusion?.map((med, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{med.nombre}</td>
              <td>{med.dosis}</td>
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

export default MedicamentosInfusion;
