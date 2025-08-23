import React from 'react';

const TipoUci = ({ form, onChange }) => {
  return (
    <>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 10 }}>
        <div style={{ flex: 1 }}>
          <label>Tipo de UCI:</label>
          <select
            name="tipoUCI"
            value={form.tipoUCI || ''}
            onChange={onChange}
          >
            <option value="">Seleccione...</option>
            <option value="UCI">UCI</option>
            <option value="UCI INTERMEDIOS">UCI INTERMEDIOS</option>
            <option value="UCIP">UCIP</option>
            <option value="UCIA">UCIA</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label>Peso (kg):</label>
          <input
            type="number"
            step="0.1"
            name="peso"
            value={form.peso || ''}
            onChange={onChange}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label>Talla (m):</label>
          <input
            type="number"
            step="0.01"
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
