// src/hoja6/ComponenteHoja6.jsx
import React from 'react'
import ComponenteGasesSanguineos from './ComponenteGasesSanguineos'
import NeumoniaForm from './NeumoniaForm'
import HojaPosiciones from './HojaPosiciones'

const HORAS = Array.from({ length: 18 }, (_, i) => i + 7) // 7 a 24 horas

const ComponenteHoja6 = ({ form, setForm }) => {
  const columnas = [
    'MODO', 'FR TTL', 'FR VENT', 'FIO2', 'PEEP', 'VT', 'VM', 'PS', 'PIM', 'PPL', 'PMA EDI', 'DISTENS', 'PNO EUM', 'DRIVING PRESS',
    'CANULA', 'VENTURI'
  ]

  const handleChange = (horaIdx, campo, valor) => {
    const nuevosDatos = [...form.hoja6.datos]
    nuevosDatos[horaIdx] = { ...nuevosDatos[horaIdx], [campo]: valor }
    setForm(prev => ({ ...prev, hoja6: { ...prev.hoja6, datos: nuevosDatos } }))
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <h3>Hoja 6 - Ventilación y Oxigenoterapia</h3>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
        <thead>
          <tr>
            <th>HORA</th>
            {columnas.map(col => (
              <th
                key={col}
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  whiteSpace: 'nowrap',
                  padding: '5px',
                  fontWeight: 'bold'
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HORAS.map((hora, idx) => (
            <tr key={idx}>
              <td style={{ textAlign: 'center' }}>{hora}</td>
              {columnas.map(col => (
                <td key={col}>
                  <input
                    type="text"
                    value={form.hoja6.datos[idx]?.[col] || ''}
                    onChange={e => handleChange(idx, col, e.target.value)}
                    style={{ width: '49px', fontSize: 12 }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 30 }}>
        <ComponenteGasesSanguineos form={form} setForm={setForm} />
      </div>
      <NeumoniaForm />
      <HojaPosiciones/>
    </div>
  )
}

export default ComponenteHoja6
