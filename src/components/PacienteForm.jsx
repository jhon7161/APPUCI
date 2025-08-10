import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import {
  agregarPaciente as agregarPacienteStore,
  actualizarPacienteStore
} from '../reducers/pacienteSlice'
import {
  getPacientePorHistoria,
  agregarPaciente,
  actualizarPaciente
} from '../services/pacienteService'
import DatosBasicos from './DatosBasicos'
import FechasEstancia from './FechasEstancia'
import TipoUci from './TipoUci'
import DiagnosticosProblemas from './DiagnosticosProblemas.JSX'
import LaboratoriosEstudios from './LaboratoriosEstudios'
import MedicamentosInfusion from './MedicamentosInfusion'
import MedicamentosHorarios from './MedicamentosHorarios'
import DosisUnica from './DosisUnica'
import { notifyWithTimeout } from '../reducers/notificationReducer'
import '../index.css';


const fechaHoyISO = () => new Date().toISOString().split('T')[0]

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
  fechaActual: fechaHoyISO(),
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

const calcularSC = (peso, tallaMetros) => {
  const p = parseFloat(peso)
  const tM = parseFloat(tallaMetros)
  if (isNaN(p) || isNaN(tM)) return ''
  return (0.007184 * Math.pow(p, 0.425) * Math.pow(tM, 0.725)).toFixed(2)
}

const calcularDiasEstancia = (fechaIngreso, fechaActual) => {
  const ingreso = new Date(fechaIngreso)
  const actual = new Date(fechaActual)
  const diff = Math.floor((actual - ingreso) / (1000 * 60 * 60 * 24))
  return isNaN(diff) ? '' : diff.toString()
}

const PacienteForm = ({ pacienteCargado }) => {
  const dispatch = useDispatch()
  // pacientes no se usa en tu código, podrías eliminarlo para limpiar
  // const pacientes = useSelector(state => state.pacientes)

  const [historiaClinica, setHistoriaClinica] = useState('')
  const [form, setForm] = useState(getFormInicial())
  const [modoEdicion, setModoEdicion] = useState(false)
  const [pacienteExistenteId, setPacienteExistenteId] = useState(null)

  // Cargar paciente pasado desde el padre
  useEffect(() => {
    if (pacienteCargado) {
      setForm(prev => ({ ...getFormInicial(), ...pacienteCargado }))
      setModoEdicion(true)
      setPacienteExistenteId(pacienteCargado.id ?? null)
      setHistoriaClinica(pacienteCargado.historiaClinica ?? '')
    }
  }, [pacienteCargado])

  // Cargar paciente al cambiar historiaClinica o fechaActual
  useEffect(() => {
    if (!historiaClinica.trim()) {
      setForm(getFormInicial())
      setPacienteExistenteId(null)
      setModoEdicion(false)
      return
    }

    const fetchPaciente = async () => {
      try {
        const pacientesPorHistoria = await getPacientePorHistoria(historiaClinica)
        if (pacientesPorHistoria.length === 0) {
          setForm(prev => ({ ...getFormInicial(), historiaClinica }))
          setPacienteExistenteId(null)
          setModoEdicion(false)
          return
        }

        // Buscar registro para la fechaActual exacta
        const registroActual = pacientesPorHistoria.find(p => p.fechaActual === form.fechaActual)

        if (registroActual) {
          setForm({ ...getFormInicial(), ...registroActual }) // evito undefined
          setPacienteExistenteId(registroActual.id)
          setModoEdicion(true)
        } else {
          // Si no hay registro para la fecha, precargo datos base para nuevo registro
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
      } catch (error) {
        console.error('Error al cargar paciente:', error)
      }
    }

    fetchPaciente()
  }, [historiaClinica, form.fechaActual])

  // Maneja cambio en inputs del form
  const handleChange = useCallback(e => {
    const { name, value } = e.target

    setForm(prev => {
      const actualizado = { ...prev, [name]: value }

      // Actualiza SC si cambia peso o talla
      if (name === 'peso' || name === 'talla') {
        actualizado.sc = calcularSC(actualizado.peso, actualizado.talla)
      }

      // Actualiza días estancia si cambia fechaIngreso o fechaActual
      if (name === 'fechaIngreso' || name === 'fechaActual') {
        actualizado.diasEstancia = calcularDiasEstancia(
          name === 'fechaIngreso' ? value : prev.fechaIngreso,
          name === 'fechaActual' ? value : prev.fechaActual
        )
      }

      return actualizado
    })
  }, [])

  // Maneja cambio de historia clinica de forma controlada
  const handleChangeHistoria = e => {
    const valor = e.target.value
    setHistoriaClinica(valor)

    if (!valor.trim()) {
      setForm(getFormInicial())
    } else {
      setForm(prev => ({ ...prev, historiaClinica: valor }))
    }
  }

  // Guardar o actualizar paciente
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      if (modoEdicion && pacienteExistenteId) {
        const actualizado = await actualizarPaciente(pacienteExistenteId, form)
        dispatch(actualizarPacienteStore(actualizado))
        dispatch(notifyWithTimeout('Registro actualizado con éxito', 3000))
      } else {
        const nuevo = await agregarPaciente(form)
        dispatch(agregarPacienteStore(nuevo))
        dispatch(notifyWithTimeout('Paciente registrado', 3000))
      }

      setForm(prev => ({ ...getFormInicial(), historiaClinica: prev.historiaClinica }))
      setModoEdicion(false)
      setPacienteExistenteId(null)
    } catch (err) {
      console.error('Error al guardar:', err)
      dispatch(notifyWithTimeout('Ocurrió un error al guardar el registro.', 3000))
    }
  }

  return (
    <form
  onSubmit={handleSubmit}
  className="formulario-paciente"
>
  {/* Encabezado */}
  <div className="form-header">
    <div className="header-left">Clínica</div>
    <div className="header-center">UNIDAD DE CUIDADOS INTENSIVOS</div>
    <div className="header-right">Código versión actualizada</div>
  </div>

  <h2>{modoEdicion ? 'Editar paciente del día' : 'Nuevo registro diario de paciente'}</h2>

  <div>
    <label htmlFor="historiaClinica">Historia Clínica:</label>
    <input
      id="historiaClinica"
      name="historiaClinica"
      value={historiaClinica}
      onChange={handleChangeHistoria}
      required
      placeholder="Ingrese número de historia clínica"
      autoComplete="off"
    />
  </div>
      <DatosBasicos form={form} onChange={handleChange} />
      <TipoUci form={form} onChange={handleChange} />
      <FechasEstancia form={form} onChange={handleChange} />

      <DiagnosticosProblemas form={form} setForm={setForm} />
      <LaboratoriosEstudios form={form} setForm={setForm} />
      <MedicamentosInfusion form={form} setForm={setForm} />
      <MedicamentosHorarios form={form} setForm={setForm} />
      <DosisUnica form={form} setForm={setForm} />

      <button type="submit" style={{ marginTop: 20 }}>
        {modoEdicion ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  )
}

export default PacienteForm
