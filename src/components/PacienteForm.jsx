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

const PacienteForm = ({ pacienteCargado }) => {
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
    medicamentosInfusion: [],
    medicamentosHorarios: [],
    dosisUnica: []
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

  // Cargar paciente si se pasa desde padre
  useEffect(() => {
    if (pacienteCargado) {
      setForm({
        ...getFormInicial(),
        ...pacienteCargado,
      })
      setModoEdicion(true)
      setPacienteExistenteId(pacienteCargado.id)
      setHistoriaClinica(pacienteCargado.historiaClinica || '')
    }
  }, [pacienteCargado])

  // Cargar datos al cambiar historiaClinica o fechaActual
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
          setForm({ ...getFormInicial(), ...registroActual }) // Evita campos undefined
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
    <form onSubmit={handleSubmit} className="formulario-paciente" style={{ maxWidth: '900px', margin: 'auto' }}>
      <h2>{modoEdicion ? 'Editar paciente del día' : 'Nuevo registro diario de paciente'}</h2>

      <div>
        <label>Historia Clínica:</label>
        <input
          name="historiaClinica"
          value={historiaClinica || ''}
          onChange={handleChangeHistoria}
          required
          style={{ width: '100%' }}
          placeholder="Ingrese número de historia clínica"
        />
      </div>

      {/* Datos básicos */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <label>Nombre:</label>
          <input name="nombre" value={form.nombre || ''} onChange={handleChange} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Apellido:</label>
          <input name="apellido" value={form.apellido || ''} onChange={handleChange} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Edad:</label>
          <input name="edad" value={form.edad || ''} onChange={handleChange} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Sexo:</label>
          <input name="sexo" value={form.sexo || ''} onChange={handleChange} />
        </div>
      </div>

      {/* SC, TISS, APACHE */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 10 }}>
        <div style={{ flex: 1 }}>
          <label>SC:</label>
          <input name="sc" value={form.sc || ''} readOnly />
        </div>
        <div style={{ flex: 1 }}>
          <label>TISS:</label>
          <input name="tiss" value={form.tiss || ''} onChange={handleChange} />
        </div>
        <div style={{ flex: 1 }}>
          <label>APACHE:</label>
          <input name="apache" value={form.apache || ''} onChange={handleChange} />
        </div>
      </div>

      {/* Tipo UCI, peso, talla */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 10 }}>
        <div style={{ flex: 1 }}>
          <label>Tipo de UCI:</label>
          <input name="tipoUCI" value={form.tipoUCI || ''} onChange={handleChange} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Peso (kg):</label>
          <input name="peso" value={form.peso || ''} onChange={handleChange} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Talla (m):</label>
          <input name="talla" value={form.talla || ''} onChange={handleChange} />
        </div>
      </div>

      {/* EPS, cama */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 10 }}>
        <div style={{ flex: 1 }}>
          <label>EPS:</label>
          <input name="eps" value={form.eps || ''} onChange={handleChange} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Cama:</label>
          <input name="cama" value={form.cama || ''} onChange={handleChange} />
        </div>
      </div>

      {/* Fechas y días estancia */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 10 }}>
        <div style={{ flex: 1 }}>
          <label>Fecha de Ingreso:</label>
          <input type="date" name="fechaIngreso" value={form.fechaIngreso || ''} onChange={handleChange} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Fecha Actual:</label>
          <input type="date" name="fechaActual" value={form.fechaActual || ''} onChange={handleChange} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Días de Estancia:</label>
          <input name="diasEstancia" value={form.diasEstancia || ''} readOnly />
        </div>
      </div>

      {/* Diagnósticos y problemas */}
      <div style={{ marginTop: 10 }}>
        <label>Diagnósticos (separados por coma):</label>
        <input
          name="diagnosticos"
          value={form.diagnosticos?.join(', ') || ''}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              diagnosticos: e.target.value.split(',').map(d => d.trim())
            }))
          }
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <label>Problemas:</label>
        <textarea name="problemas" value={form.problemas || ''} onChange={handleChange} rows={3} style={{ width: '100%' }} />
      </div>

      {/* Enfermero jefe */}
      <div style={{ display: 'flex', gap: '10px', marginTop: 10 }}>
        <div style={{ flex: 1 }}>
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
        </div>
        <div style={{ flex: 1 }}>
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
        </div>
        <div style={{ flex: 1 }}>
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
      </div>

      {/* Laboratorios */}
      <fieldset style={{ marginTop: 20 }}>
        <legend>Laboratorios y Estudios</legend>
        {[
          ['hb', 'hto', 'leuc', 'neut', 'linf', 'cay', 'plaq', 'bun', 'creat'],
          ['glicemia', 'na', 'k', 'cl', 'ca', 'mg', 'pt', 'ptt', 'inr'],
          ['rx', 'cultivos', 'hemo', 'uro'],
          ['ekg', 'pdeo']
        ].map((grupo, i) => (
          <div
            key={i}
            style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: 10 }}
          >
            {grupo.map(campo => (
              <div key={campo} style={{ flex: '1 0 90px', display: 'flex', flexDirection: 'column' }}>
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

      {/* Medicamentos en infusión */}
      <fieldset style={{ marginTop: 20 }}>
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
              <strong>{med.nombre}</strong> - {med.dosis}{' '}
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

      {/* Medicamentos en horarios */}
      <fieldset style={{ marginTop: 20 }}>
        <legend>🕒 Medicamentos en Horarios</legend>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}
        >
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
            if (
              nuevoMedHorario.nombre.trim() &&
              nuevoMedHorario.fechaInicio.trim() &&
              nuevoMedHorario.dosis.trim()
            ) {
              setForm((prev) => ({
                ...prev,
                medicamentosHorarios: [...(prev.medicamentosHorarios || []), nuevoMedHorario],
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
            } else alert('Complete nombre, fecha inicio y dosis')
          }}
        >
          Agregar
        </button>

        <ul>
          {form.medicamentosHorarios?.map((med, idx) => (
            <li key={idx}>
              <strong>{med.nombre}</strong> ({med.fechaInicio}) - Dosis: {med.dosis}, Vía: {med.via}, Horas: {med.horas}, Enfermeros: M-{med.manana} T-{med.tarde} N-{med.noche}
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    medicamentosHorarios: prev.medicamentosHorarios.filter((_, i) => i !== idx),
                  }))
                }
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* Dosis únicas */}
      <fieldset style={{ marginTop: 20 }}>
        <legend>💊 Dosis Única</legend>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}
        >
          <input
            type="time"
            value={nuevoDosisUnica.hora}
            onChange={(e) => setNuevoDosisUnica({ ...nuevoDosisUnica, hora: e.target.value })}
            placeholder="Hora"
          />
          <input
            type="text"
            value={nuevoDosisUnica.nombre}
            onChange={(e) => setNuevoDosisUnica({ ...nuevoDosisUnica, nombre: e.target.value })}
            placeholder="Nombre"
          />
          <input
            type="text"
            value={nuevoDosisUnica.dosis}
            onChange={(e) => setNuevoDosisUnica({ ...nuevoDosisUnica, dosis: e.target.value })}
            placeholder="Dosis"
          />
          <input
            type="text"
            value={nuevoDosisUnica.via}
            onChange={(e) => setNuevoDosisUnica({ ...nuevoDosisUnica, via: e.target.value })}
            placeholder="Vía"
          />
          <input
            type="text"
            value={nuevoDosisUnica.ordenadoPor}
            onChange={(e) => setNuevoDosisUnica({ ...nuevoDosisUnica, ordenadoPor: e.target.value })}
            placeholder="Ordenado por"
          />
          <input
            type="text"
            value={nuevoDosisUnica.hospitalariamente}
            onChange={(e) => setNuevoDosisUnica({ ...nuevoDosisUnica, hospitalariamente: e.target.value })}
            placeholder="Hospitalariamente"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            if (nuevoDosisUnica.nombre.trim() && nuevoDosisUnica.hora.trim()) {
              setForm((prev) => ({
                ...prev,
                dosisUnica: [...(prev.dosisUnica || []), nuevoDosisUnica],
              }))
              setNuevoDosisUnica({
                hora: '',
                nombre: '',
                dosis: '',
                via: '',
                ordenadoPor: '',
                hospitalariamente: ''
              })
            } else alert('Complete nombre y hora')
          }}
        >
          Agregar
        </button>

        <ul>
          {form.dosisUnica?.map((dosis, idx) => (
            <li key={idx}>
              <strong>{dosis.nombre}</strong> - Hora: {dosis.hora}, Dosis: {dosis.dosis}, Vía: {dosis.via}, Ordenado por: {dosis.ordenadoPor}, Hospitalariamente: {dosis.hospitalariamente}
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    dosisUnica: prev.dosisUnica.filter((_, i) => i !== idx),
                  }))
                }
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      <button type="submit" style={{ marginTop: 20 }}>
        {modoEdicion ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  )
}

export default PacienteForm
