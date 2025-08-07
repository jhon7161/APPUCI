import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import {
  agregarPaciente as agregarPacienteStore,
  actualizarPacienteStore
} from '../reducers/pacienteSlice'
import {
  getPacientePorHistoria,
  agregarPaciente,
  actualizarPaciente
} from '../services/pacienteService'

const PacienteForm = () => {
  const dispatch = useDispatch()
  const pacientes = useSelector(state => state.pacientes)

  const getFormInicial = () => ({
    nombre: '',
    apellido: '',
    edad: '',
    sc: '',
    tiss: '',
    historiaClinica: '',
    sexo: '',
    apache: '',
    tipoUCI: '',
    peso: '',
    talla: '',
    eps: '',
    cama: '',
    fechaIngreso: '',
    fechaActual: new Date().toISOString().split('T')[0],
    diasEstancia: '',
    diagnosticos: [],
    problemas: '',
    enfermeroJefe: { manana: '', tarde: '', noche: '' },
    hb: '', hto: '', leuc: '', neut: '', linf: '', cay: '', plaq: '',
    bun: '', creat: '', glicemia: '',
    na: '', k: '', cl: '', ca: '', mg: '',
    pt: '', ptt: '', inr: '',
    rx: '', cultivos: '', hemo: '', uro: '', ekg: '', pdeo: '',
    medicamentosInfusion: [],medicamentosHorarios: [],dosisUnica: []
  })

  const [historiaClinica, setHistoriaClinica] = useState('')
  const [form, setForm] = useState(getFormInicial())
  const [modoEdicion, setModoEdicion] = useState(false)
  const [pacienteExistenteId, setPacienteExistenteId] = useState(null)
  const [nuevoMedInfusion, setNuevoMedInfusion] = useState({ nombre: '', dosis: '' })
  const [nuevoMedHorario, setNuevoMedHorario] = useState({
  fechaInicio: '',
  nombre: '',
  horas: '',
  dosis: '',
  via: '',
  manana: '',
  tarde: '',
  noche: ''
})
const [nuevoDosisUnica, setNuevoDosisUnica] = useState({
  hora: '',
  nombre: '',
  dosis: '',
  via: '',
  ordenadoPor: '',
  hospitalariamente: ''
})





  useEffect(() => {
    const fetchPaciente = async () => {
      if (historiaClinica.trim() === '') {
        setForm(getFormInicial())
        setPacienteExistenteId(null)
        setModoEdicion(false)
        return
      }

      const pacientesPorHistoria = await getPacientePorHistoria(historiaClinica)

      if (pacientesPorHistoria.length > 0) {
        const registroActual = pacientesPorHistoria.find(p => p.fechaActual === form.fechaActual)

        if (registroActual) {
          setForm({ ...getFormInicial(), ...registroActual }) // ✅ Evita campos undefined
          setPacienteExistenteId(registroActual.id)
          setModoEdicion(true)
        } else {
          const ultimo = pacientesPorHistoria[0]
          const base = {
            ...getFormInicial(),
            nombre: ultimo.nombre,
            apellido: ultimo.apellido,
            edad: ultimo.edad,
            sexo: ultimo.sexo,
            eps: ultimo.eps,
            talla: ultimo.talla,
            peso: ultimo.peso,
            historiaClinica,
            fechaIngreso: ultimo.fechaIngreso,
            fechaActual: form.fechaActual
          }

          base.sc = calcularSC(base.peso, base.talla)
          base.diasEstancia = calcularDiasEstancia(base.fechaIngreso, base.fechaActual)

          setForm(base)
          setPacienteExistenteId(null)
          setModoEdicion(false)
        }
      } else {
        setForm({ ...getFormInicial(), historiaClinica })
        setPacienteExistenteId(null)
        setModoEdicion(false)
      }
    }

    fetchPaciente()
  }, [historiaClinica, form.fechaActual])

  const calcularSC = (peso, tallaMetros) => {
  const p = parseFloat(peso)
  const tM = parseFloat(tallaMetros) // Ya viene en metros

  if (isNaN(p) || isNaN(tM)) return ''

  const sc = 0.007184 * Math.pow(p, 0.425) * Math.pow(tM, 0.725)
  return sc.toFixed(2)

  }

  const calcularDiasEstancia = (fechaIngreso, fechaActual) => {
    const ingreso = new Date(fechaIngreso)
    const actual = new Date(fechaActual)
    const diff = Math.floor((actual - ingreso) / (1000 * 60 * 60 * 24))
    return isNaN(diff) ? '' : diff.toString()
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm(prev => {
      const actualizado = { ...prev, [name]: value }

      if (name === 'peso' || name === 'talla') {
        actualizado.sc = calcularSC(actualizado.peso, actualizado.talla)
      }

      if (name === 'fechaIngreso' || name === 'fechaActual') {
        actualizado.diasEstancia = calcularDiasEstancia(
          name === 'fechaIngreso' ? value : prev.fechaIngreso,
          name === 'fechaActual' ? value : prev.fechaActual
        )
      }

      return actualizado
    })
  }

  const handleChangeHistoria = (e) => {
    const valor = e.target.value
    setHistoriaClinica(valor)

    if (valor.trim() === '') {
      setForm(getFormInicial())
    } else {
      setForm(prev => ({ ...prev, historiaClinica: valor }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (modoEdicion && pacienteExistenteId) {
        const actualizado = await actualizarPaciente(pacienteExistenteId, form)
        dispatch(actualizarPacienteStore(actualizado))
        alert('Registro actualizado con éxito')
      } else {
        const nuevo = await agregarPaciente(form)
        dispatch(agregarPacienteStore(nuevo))
        alert('Paciente registrado')
      }

      setForm({ ...getFormInicial(), historiaClinica: form.historiaClinica })
      setModoEdicion(false)
      setPacienteExistenteId(null)
    } catch (err) {
      console.error('Error al guardar:', err)
      alert('Ocurrió un error al guardar el registro.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="formulario-paciente">
      <h2>{modoEdicion ? 'Editar paciente del día' : 'Nuevo registro diario de paciente'}</h2>

      <div>
        <label>Historia Clínica:</label>
        <input name="historiaClinica" value={historiaClinica || ''} onChange={handleChangeHistoria} required />
      </div>

      <div>
        <label>Nombre:</label>
        <input name="nombre" value={form.nombre || ''} onChange={handleChange} />
        <label>Apellido:</label>
        <input name="apellido" value={form.apellido || ''} onChange={handleChange} />
      </div>

      <div>
        <label>Edad:</label>
        <input name="edad" value={form.edad || ''} onChange={handleChange} />
        <label>Sexo:</label>
        <input name="sexo" value={form.sexo || ''} onChange={handleChange} />
      </div>

      <div>
        <label>SC:</label>
        <input name="sc" value={form.sc || ''} readOnly />
        <label>TISS:</label>
        <input name="tiss" value={form.tiss || ''} onChange={handleChange} />
        <label>APACHE:</label>
        <input name="apache" value={form.apache || ''} onChange={handleChange} />
      </div>

      <div>
        <label>Tipo de UCI:</label>
        <input name="tipoUCI" value={form.tipoUCI || ''} onChange={handleChange} />
        <label>Peso:</label>
        <input name="peso" value={form.peso || ''} onChange={handleChange} />
        <label>Talla:</label>
        <input name="talla" value={form.talla || ''} onChange={handleChange} />
      </div>

      <div>
        <label>EPS:</label>
        <input name="eps" value={form.eps || ''} onChange={handleChange} />
        <label>Cama:</label>
        <input name="cama" value={form.cama || ''} onChange={handleChange} />
      </div>

      <div>
        <label>Fecha de Ingreso:</label>
        <input type="date" name="fechaIngreso" value={form.fechaIngreso || ''} onChange={handleChange} />
        <label>Fecha Actual:</label>
        <input type="date" name="fechaActual" value={form.fechaActual || ''} onChange={handleChange} />
      </div>

      <div>
        <label>Días de Estancia:</label>
        <input name="diasEstancia" value={form.diasEstancia || ''} readOnly />
      </div>

      <div>
        <label>Diagnósticos:</label>
        <input
          name="diagnosticos"
          value={form.diagnosticos?.join(', ') || ''}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              diagnosticos: e.target.value.split(',').map(d => d.trim())
            }))
          }
        />
      </div>

      <div>
        <label>Problemas:</label>
        <textarea name="problemas" value={form.problemas || ''} onChange={handleChange} />
      </div>

      <div>
        <label>Enfermero Jefe Mañana:</label>
        <input
          name="enfermeroJefeManana"
          value={form.enfermeroJefe?.manana || ''}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              enfermeroJefe: { ...prev.enfermeroJefe, manana: e.target.value }
            }))
          }
        />
        <label>Enfermero Jefe Tarde:</label>
        <input
          name="enfermeroJefeTarde"
          value={form.enfermeroJefe?.tarde || ''}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              enfermeroJefe: { ...prev.enfermeroJefe, tarde: e.target.value }
            }))
          }
        />
        <label>Enfermero Jefe Noche:</label>
        <input
          name="enfermeroJefeNoche"
          value={form.enfermeroJefe?.noche || ''}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              enfermeroJefe: { ...prev.enfermeroJefe, noche: e.target.value }
            }))
          }
        />
      </div>


      <fieldset>
  <legend>Laboratorios y Estudios</legend>

  {/* Fila 1 */}
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
    {['hb', 'hto', 'leuc', 'neut', 'linf', 'cay', 'plaq', 'bun', 'creat'].map((campo) => (
      <div key={campo} style={{ display: 'flex', flexDirection: 'column', width: '100px' }}>
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

  {/* Fila 2 */}
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
    {['glicemia', 'na', 'k', 'cl', 'ca', 'mg', 'pt', 'ptt', 'inr'].map((campo) => (
      <div key={campo} style={{ display: 'flex', flexDirection: 'column', width: '100px' }}>
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

  {/* Fila 3 */}
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
    {['rx', 'cultivos', 'hemo', 'uro'].map((campo) => (
      <div key={campo} style={{ display: 'flex', flexDirection: 'column', width: '120px' }}>
        <label>{campo.toUpperCase()}</label>
        <input
          name={campo}
          value={form[campo] || ''}
          onChange={handleChange}
          placeholder="Resultado"
        />
      </div>
    ))}
  </div>

  {/* Fila 4 */}
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
    {['ekg', 'pdeo'].map((campo) => (
      <div key={campo} style={{ display: 'flex', flexDirection: 'column', width: '120px' }}>
        <label>{campo.toUpperCase()}</label>
        <input
          name={campo}
          value={form[campo] || ''}
          onChange={handleChange}
          placeholder="Resultado"
        />
      </div>
    ))}
  </div>
</fieldset>

      <fieldset>
  <legend>💉 Medicamentos en Infusión</legend>

  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
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
    <button
      type="button"
      onClick={() => {
        if (nuevoMedInfusion.nombre.trim() && nuevoMedInfusion.dosis.trim()) {
          setForm((prev) => ({
            ...prev,
            medicamentosInfusion: [
              ...(prev.medicamentosInfusion || []),
              { ...nuevoMedInfusion },
            ],
          }))
          setNuevoMedInfusion({ nombre: '', dosis: '' })
        }
      }}
    >
      Agregar
    </button>
  </div>

  <ul>
    {form.medicamentosInfusion?.map((med, idx) => (
      <li key={idx}>
        <strong>{med.nombre}</strong> - {med.dosis}
        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              medicamentosInfusion: prev.medicamentosInfusion.filter(
                (_, i) => i !== idx
              ),
            }))
          }
        >
          Eliminar
        </button>
      </li>
    ))}
  </ul>
</fieldset>
<fieldset>
  <legend>🕒 Medicamentos en Horarios</legend>

  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
    <input
      type="date"
      value={nuevoMedHorario.fechaInicio}
      onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, fechaInicio: e.target.value })}
    />
    <input
      type="text"
      placeholder="Nombre"
      value={nuevoMedHorario.nombre}
      onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, nombre: e.target.value })}
    />
    <input
      type="text"
      placeholder="Horas"
      value={nuevoMedHorario.horas}
      onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, horas: e.target.value })}
    />
    <input
      type="text"
      placeholder="Dosis"
      value={nuevoMedHorario.dosis}
      onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, dosis: e.target.value })}
    />
    <input
      type="text"
      placeholder="Vía"
      value={nuevoMedHorario.via}
      onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, via: e.target.value })}
    />
    <input
      type="text"
      placeholder="Mañana (enfermero)"
      value={nuevoMedHorario.manana}
      onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, manana: e.target.value })}
    />
    <input
      type="text"
      placeholder="Tarde (enfermero)"
      value={nuevoMedHorario.tarde}
      onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, tarde: e.target.value })}
    />
    <input
      type="text"
      placeholder="Noche (enfermero)"
      value={nuevoMedHorario.noche}
      onChange={(e) => setNuevoMedHorario({ ...nuevoMedHorario, noche: e.target.value })}
    />
  </div>

  <button
    type="button"
    onClick={() => {
      const { fechaInicio, nombre, horas, dosis, via } = nuevoMedHorario
      if (fechaInicio && nombre && horas && dosis && via) {
        setForm((prev) => ({
          ...prev,
          medicamentosHorarios: [
            ...(prev.medicamentosHorarios || []),
            { ...nuevoMedHorario },
          ],
        }))
        setNuevoMedHorario({
          fechaInicio: '',
          nombre: '',
          horas: '',
          dosis: '',
          via: '',
          manana: '',
          tarde: '',
          noche: ''
        })
      } else {
        alert('Por favor llena los campos obligatorios.')
      }
    }}
  >
    Agregar Medicamento
  </button>

  <ul style={{ marginTop: '1rem' }}>
    {form.medicamentosHorarios?.map((med, idx) => (
      <li key={idx}>
        <strong>{med.fechaInicio}</strong> - <strong>{med.nombre}</strong> - {med.horas} - {med.dosis} - {med.via} | 
        🕒 Mañana: {med.manana || '---'}, Tarde: {med.tarde || '---'}, Noche: {med.noche || '---'}
        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              medicamentosHorarios: prev.medicamentosHorarios.filter((_, i) => i !== idx),
            }))
          }
          style={{ marginLeft: '1rem' }}
        >
          Eliminar
        </button>
      </li>
    ))}
  </ul>
</fieldset>
<fieldset>
  <legend>💊 Medicamentos de Dosis Única</legend>

  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
    <input
      type="time"
      value={nuevoDosisUnica.hora}
      onChange={(e) => setNuevoDosisUnica({ ...nuevoDosisUnica, hora: e.target.value })}
    />
    <input
      type="text"
      placeholder="Nombre"
      value={nuevoDosisUnica.nombre}
      onChange={(e) => setNuevoDosisUnica({ ...nuevoDosisUnica, nombre: e.target.value })}
    />
    <input
      type="text"
      placeholder="Dosis"
      value={nuevoDosisUnica.dosis}
      onChange={(e) => setNuevoDosisUnica({ ...nuevoDosisUnica, dosis: e.target.value })}
    />
    <input
      type="text"
      placeholder="Vía"
      value={nuevoDosisUnica.via}
      onChange={(e) => setNuevoDosisUnica({ ...nuevoDosisUnica, via: e.target.value })}
    />
    <input
      type="text"
      placeholder="Ordenado por"
      value={nuevoDosisUnica.ordenadoPor}
      onChange={(e) => setNuevoDosisUnica({ ...nuevoDosisUnica, ordenadoPor: e.target.value })}
    />
    <input
      type="text"
      placeholder="Hospitalariamente"
      value={nuevoDosisUnica.hospitalariamente}
      onChange={(e) => setNuevoDosisUnica({ ...nuevoDosisUnica, hospitalariamente: e.target.value })}
    />
  </div>

  <button
    type="button"
    onClick={() => {
      const { hora, nombre, dosis, via, ordenadoPor, hospitalariamente } = nuevoDosisUnica
      if (hora && nombre && dosis && via && ordenadoPor && hospitalariamente) {
        setForm((prev) => ({
          ...prev,
          dosisUnica: [
            ...(prev.dosisUnica || []),
            { ...nuevoDosisUnica },
          ],
        }))
        setNuevoDosisUnica({
          hora: '',
          nombre: '',
          dosis: '',
          via: '',
          ordenadoPor: '',
          hospitalariamente: ''
        })
      } else {
        alert('Por favor llena todos los campos.')
      }
    }}
  >
    Agregar Medicamento
  </button>

  <ul style={{ marginTop: '1rem' }}>
    {form.dosisUnica?.map((med, idx) => (
      <li key={idx}>
        <strong>{med.hora}</strong> - <strong>{med.nombre}</strong> - {med.dosis} - {med.via} - Ordenado por: {med.ordenadoPor} - Hospitalariamente: {med.hospitalariamente}
        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              dosisUnica: prev.dosisUnica.filter((_, i) => i !== idx),
            }))
          }
          style={{ marginLeft: '1rem' }}
        >
          Eliminar
        </button>
      </li>
    ))}
  </ul>
</fieldset>




      <button type="submit">{modoEdicion ? 'Actualizar' : 'Guardar'}</button>
    </form>
  )
}

export default PacienteForm
