import React from 'react';

const TipoUci = ({ form, onChange }) => {
  return (
    <>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 10 }}>
        <div style={{ flex: 1 }}>
          <label>Tipo de UCI:</label>
          <input
            name="tipoUCI"
            value={form.tipoUCI || ''}
            onChange={onChange}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Peso (kg):</label>
          <input
            name="peso"
            value={form.peso || ''}
            onChange={onChange}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Talla (m):</label>
          <input
            name="talla"
            value={form.talla || ''}
            onChange={onChange}
          />
        </div>
      </div>

      {/* EPS, cama */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 10 }}>
        <div style={{ flex: 1 }}>
          <label>EPS:</label>
          <input
            name="eps"
            value={form.eps || ''}
            onChange={onChange}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Cama:</label>
          <input
            name="cama"
            value={form.cama || ''}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default TipoUci;
