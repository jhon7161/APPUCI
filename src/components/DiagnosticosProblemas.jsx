import React, { useState } from 'react';


const DiagnosticosProblemas = ({ form, setForm }) => {
  const [nuevoDiagnostico, setNuevoDiagnostico] = useState('');
  const [nuevoProblema, setNuevoProblema] = useState('');

  const agregarDiagnostico = () => {
    if (!nuevoDiagnostico.trim()) return;
    setForm(prev => ({
      ...prev,
      diagnosticos: [...(prev.diagnosticos || []), nuevoDiagnostico.trim()]
    }));
    setNuevoDiagnostico('');
  };

  const eliminarDiagnostico = (index) => {
    setForm(prev => ({
      ...prev,
      diagnosticos: prev.diagnosticos.filter((_, i) => i !== index)
    }));
  };

  const agregarProblema = () => {
    if (!nuevoProblema.trim()) return;
    setForm(prev => ({
      ...prev,
      problemas: [...(prev.problemas || []), nuevoProblema.trim()]
    }));
    setNuevoProblema('');
  };

  const eliminarProblema = (index) => {
    setForm(prev => ({
      ...prev,
      problemas: prev.problemas.filter((_, i) => i !== index)
    }));
  };

  const handleEnfermeroChange = (turno, valor) => {
    setForm(prev => ({
      ...prev,
      enfermeroJefe: { ...prev.enfermeroJefe, [turno]: valor }
    }));
  };

  return (
    <div className="formulario-paciente">
      {/* Diagnósticos */}
      <fieldset className="fieldset-custom">
        <legend>📋 Diagnósticos</legend>
        <div className="input-group">
          <input
            value={nuevoDiagnostico}
            onChange={(e) => setNuevoDiagnostico(e.target.value)}
            placeholder="Nuevo diagnóstico"
          />
          <button type="button" onClick={agregarDiagnostico}>Agregar</button>
        </div>
        <table className="tabla">
          <thead>
            <tr>
              <th>#</th>
              <th>Diagnóstico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(form.diagnosticos || []).map((diag, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{diag}</td>
                <td>
                  <button className="btn-eliminar" onClick={() => eliminarDiagnostico(index)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>

      {/* Problemas */}
      <fieldset className="fieldset-custom" style={{ marginTop: '1rem' }}>
        <legend>⚠ Problemas</legend>
        <div className="input-group">
          <input
            value={nuevoProblema}
            onChange={(e) => setNuevoProblema(e.target.value)}
            placeholder="Nuevo problema"
          />
          <button type="button" onClick={agregarProblema}>Agregar</button>
        </div>
        <table className="tabla">
          <thead>
            <tr>
              <th>#</th>
              <th>Problema</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(form.problemas || []).map((prob, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{prob}</td>
                <td>
                  <button className="btn-eliminar" onClick={() => eliminarProblema(index)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>

      {/* Enfermero jefe */}
      <fieldset className="fieldset-custom" style={{ marginTop: '1rem' }}>
        <legend>👩‍⚕️ Enfermero Jefe</legend>
        <div className="flex-gap">
          {['manana','tarde','noche'].map((turno) => (
            <div key={turno} className="form-group">
              <label>{turno.charAt(0).toUpperCase() + turno.slice(1)}:</label>
              <input
                value={form.enfermeroJefe?.[turno] || ''}
                onChange={(e) => handleEnfermeroChange(turno, e.target.value)}
              />
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default DiagnosticosProblemas;
