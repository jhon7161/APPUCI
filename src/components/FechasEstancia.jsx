// FechasEstancia.jsx
const FechasEstancia = ({ form, onChange }) => {
  return (
    <div className="form-row">
      <div className="form-group">
        <label>Fecha de Ingreso:</label>
        <input
          type="date"
          name="fechaIngreso"
          value={form.fechaIngreso || ''}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Fecha Actual:</label>
        <input
          type="date"
          name="fechaActual"
          value={form.fechaActual || ''}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Días de Estancia:</label>
        <input
          name="diasEstancia"
          value={form.diasEstancia || ''}
          readOnly
        />
      </div>
    </div>
  );
};

export default FechasEstancia;
