import React, { useState } from 'react';

const DiagnosticosProblemas = ({ form, setForm }) => {
  const [nuevoDiagnostico, setNuevoDiagnostico] = useState('');
  const [nuevoProblema, setNuevoProblema] = useState('');

  // Agregar diagnóstico
  const agregarDiagnostico = () => {
    if (!nuevoDiagnostico.trim()) return;
    setForm(prev => ({
      ...prev,
      diagnosticos: [...(prev.diagnosticos || []), nuevoDiagnostico.trim()]
    }));
    setNuevoDiagnostico('');
  };

  // Eliminar diagnóstico
  const eliminarDiagnostico = (index) => {
    setForm(prev => ({
      ...prev,
      diagnosticos: prev.diagnosticos.filter((_, i) => i !== index)
    }));
  };

  // Agregar problema
  const agregarProblema = () => {
    if (!nuevoProblema.trim()) return;
    setForm(prev => ({
      ...prev,
      problemas: [...(prev.problemas || []), nuevoProblema.trim()]
    }));
    setNuevoProblema('');
  };

  // Eliminar problema
  const eliminarProblema = (index) => {
    setForm(prev => ({
      ...prev,
      problemas: prev.problemas.filter((_, i) => i !== index)
    }));
  };

  // Cambiar enfermero jefe
  const handleEnfermeroChange = (turno, valor) => {
    setForm(prev => ({
      ...prev,
      enfermeroJefe: { ...prev.enfermeroJefe, [turno]: valor }
    }));
  };

  return (
    <div className="formulario-paciente">
      {/* Diagnósticos */}
      <fieldset>
        <legend>📋 Diagnósticos</legend>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            value={nuevoDiagnostico}
            onChange={(e) => setNuevoDiagnostico(e.target.value)}
            placeholder="Nuevo diagnóstico"
          />
          <button type="button" onClick={agregarDiagnostico}>Agregar</button>
        </div>
        <table className="tabla-limpia">
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
                  <button type="button" onClick={() => eliminarDiagnostico(index)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>

      {/* Problemas */}
      <fieldset style={{ marginTop: '1rem' }}>
        <legend>⚠ Problemas</legend>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            value={nuevoProblema}
            onChange={(e) => setNuevoProblema(e.target.value)}
            placeholder="Nuevo problema"
          />
          <button type="button" onClick={agregarProblema}>Agregar</button>
        </div>
        <table className="tabla-limpia">
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
                  <button type="button" onClick={() => eliminarProblema(index)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>

      {/* Enfermero jefe */}
      <fieldset style={{ marginTop: '1rem' }}>
        <legend>👩‍⚕️ Enfermero Jefe</legend>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div>
            <label>Mañana:</label>
            <input
              value={form.enfermeroJefe?.manana || ''}
              onChange={(e) => handleEnfermeroChange('manana', e.target.value)}
            />
          </div>
          <div>
            <label>Tarde:</label>
            <input
              value={form.enfermeroJefe?.tarde || ''}
              onChange={(e) => handleEnfermeroChange('tarde', e.target.value)}
            />
          </div>
          <div>
            <label>Noche:</label>
            <input
              value={form.enfermeroJefe?.noche || ''}
              onChange={(e) => handleEnfermeroChange('noche', e.target.value)}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default DiagnosticosProblemas;
