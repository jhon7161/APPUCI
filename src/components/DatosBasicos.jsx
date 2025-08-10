// DatosBasicos.jsx
const DatosBasicos = ({ form, onChange }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1 }}>
        <label>Nombre:</label>
        <input name="nombre" value={form.nombre || ''} onChange={onChange} />
      </div>
      <div style={{ flex: 1 }}>
        <label>Apellido:</label>
        <input name="apellido" value={form.apellido || ''} onChange={onChange} />
      </div>
      <div style={{ flex: 1 }}>
        <label>Edad:</label>
        <input name="edad" value={form.edad || ''} onChange={onChange} />
      </div>
      <div style={{ flex: 1 }}>
        <label>Sexo:</label>
        <input name="sexo" value={form.sexo || ''} onChange={onChange} />
      </div>
      <div style={{ flex: 1 }}>
        <label>SC:</label>
        <input name="sc" value={form.sc || ''} readOnly />
      </div>
      <div style={{ flex: 1 }}>
        <label>TISS:</label>
        <input name="tiss" value={form.tiss || ''} onChange={onChange} />
      </div>
      <div style={{ flex: 1 }}>
        <label>APACHE:</label>
        <input name="apache" value={form.apache || ''} onChange={onChange} />
      </div>
    </div>
  )
}

export default DatosBasicos
