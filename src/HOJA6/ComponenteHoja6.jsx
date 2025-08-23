import React, { useEffect } from 'react'
import ComponenteGasesSanguineos from './ComponenteGasesSanguineos'
import NeumoniaForm from './NeumoniaForm'
import HojaPosiciones from './HojaPosiciones'

const HORAS = Array.from({ length: 18 }, (_, i) => i + 7) // 7 a 24 horas

const ComponenteHoja6 = ({ form, setForm }) => {
  const columnas = [
    'MODO', 'FR TTL', 'FR VENT', 'FIO2', 'PEEP', 'VT', 'VM', 'PS', 'PIM', 'PPL', 'PMA EDI', 'DISTENS', 'PNO EUM', 'DRIVING PRESS',
    'CANULA', 'VENTURI'
  ]

  // Inicializar hoja6.datos si no existe
  useEffect(() => {
    if (!form.hoja6) {
      setForm(prev => ({
        ...prev,
        hoja6: {
          datos: Array.from({ length: HORAS.length }, () =>
            columnas.reduce((acc, col) => ({ ...acc, [col]: "" }), {})
          ),
          gases: [],
          neumonia: {
            NN: "",
            NAC: "",
            NAC_TR: "",
            NAN: "",
            NAN_TR: "",
            NBA: "",
            NBA_TR: "",
            DIAS_VM: ""
          },
          terapeuta: ""
        }
      }))
    }
  }, [])

  const handleChange = (horaIdx, campo, valor) => {
    const nuevosDatos = [...form.hoja6.datos]
    nuevosDatos[horaIdx] = { ...nuevosDatos[horaIdx], [campo]: valor }
    setForm(prev => ({ ...prev, hoja6: { ...prev.hoja6, datos: nuevosDatos } }))
  }

  return (
    <div className="hoja6-wrapper">
      <h3>Hoja 6 - Ventilación y Oxigenoterapia</h3>
      <table className="hoja6-table">
        <thead>
          <tr>
            <th>HORA</th>
            {columnas.map(col => (
              <th key={col} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HORAS.map((hora, idx) => (
            <tr key={idx}>
              <td>{hora}</td>
              {columnas.map(col => (
                <td key={col}>
                  <input
                    type="text"
                    value={form.hoja6.datos[idx]?.[col] || ''}
                    onChange={e => handleChange(idx, col, e.target.value)}
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

      <NeumoniaForm form={form} setForm={setForm} /> {/* PASAMOS form y setForm */}

      <HojaPosiciones form={form} setForm={setForm} />
    </div>
  )
}

export default ComponenteHoja6
