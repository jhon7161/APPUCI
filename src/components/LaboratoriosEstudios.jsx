import React from 'react';

const LaboratoriosEstudios = ({ form, setForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const grupos = [
    ['hb', 'hto', 'leuc', 'neut', 'linf', 'cay', 'plaq', 'bun', 'creat'],
    ['glicemia', 'na', 'k', 'cl', 'ca', 'mg', 'pt', 'ptt', 'inr'],
    ['rx', 'cultivos', 'hemo', 'uro'],
    ['ekg', 'pdeo'],
  ];

  return (
    <fieldset className="fieldset-lab">
      <legend>Laboratorios y Estudios</legend>
      {grupos.map((grupo, i) => (
        <div key={i} className="form-row">
          {grupo.map((campo) => (
            <div key={campo} className="form-group small">
              <label>{campo.toUpperCase()}</label>
              <input
                name={campo}
                value={form[campo] || ''}
                onChange={handleChange}
                placeholder="Valor"
              />
            </div>
          ))}
        </div>
      ))}
    </fieldset>
  );
};

export default LaboratoriosEstudios;
