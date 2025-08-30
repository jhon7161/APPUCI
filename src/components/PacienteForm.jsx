// src/components/PacienteForm.jsx
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'

import {
  agregarPaciente as agregarPacienteStore,
  actualizarPacienteStore
} from '../reducers/pacienteSlice'
import { asignarPaciente } from '../reducers/camasSlice'
import { getPacientePorHistoria, agregarPaciente, actualizarPaciente } from '../services/pacienteService'

import DatosBasicos from './DatosBasicos'
import FechasEstancia from './FechasEstancia'
import TipoUci from './TipoUci'
import DiagnosticosProblemas from './DiagnosticosProblemas'
import LaboratoriosEstudios from './LaboratoriosEstudios'
import MedicamentosInfusion from './MedicamentosInfusion'
import MedicamentosHorarios from './MedicamentosHorarios'
import DosisUnica from './DosisUnica'

// Hojas extra
import ComponenteHoja2 from '../hoja2/controldeliquidos'
import ComponenteHoja3 from '../HOJA3/ComponenteHoja3'
import ComponenteHoja4 from '../HOJA4/ComponenteHoja4'
import ComponenteHoja5 from '../hoja5/ComponenteHoja5'
import ComponenteHoja6 from '../HOJA6/ComponenteHoja6'

import { notifyWithTimeout } from '../reducers/notificationReducer'
import '../index.css'

const fechaHoyISO = () => new Date().toISOString().split('T')[0]

const getFormInicial = (camaId = '') => ({
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
  cama: camaId,
  fechaIngreso: '',
  fechaActual: fechaHoyISO(),
  diasEstancia: '',
  diagnosticos: [],
  problemas: '',
  enfermeroJefe: { manana: '', tarde: '', noche: '' },
  auxiliarEnfermeria: { manana: '', tarde: '', noche: '' },
  hb: '', hto: '', leuc: '', neut: '', linf: '', cay: '', plaq: '',
  bun: '', creat: '', glicemia: '',
  na: '', k: '', cl: '', ca: '', mg: '',
  pt: '', ptt: '', inr: '',
  rx: '', cultivos: '', hemo: '', uro: '', ekg: '', pdeo: '',
  medicamentosInfusion: [],
  medicamentosHorarios: [],
  dosisUnica: [],
  hoja2: { administrados: Array.from({ length: 4 }, () => ({ nombre: '', dosis: Array(24).fill('') })), eliminados: { diuresisHora: Array(24).fill(''), otros: [{ nombre: '', valores: Array(24).fill('') }, { nombre: '', valores: Array(24).fill('') }] } },
  hoja3: { datos: Array(24).fill({}) },
  hoja4: { datos: Array(24).fill({}) },
  hoja5: { datos: Array(24).fill({}) },
  hoja6: { datos: Array(24).fill({}) },
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
  const navigate = useNavigate()
  const { historia } = useParams();          // historia = número de documento
  const [searchParams] = useSearchParams();
  const camaIdParam = searchParams.get("cama");  // camaId = número de cama


  const pacientes = useSelector(state => state.pacientes);
  const [form, setForm] = useState(getFormInicial(camaIdParam));
  const [historiaClinica, setHistoriaClinica] = useState(historia || '');
  const [modoEdicion, setModoEdicion] = useState(false)
  const [pacienteExistenteId, setPacienteExistenteId] = useState(null)
  const [pagina, setPagina] = useState(1)

  useEffect(() => {
  if (!historia) return;

  const pacienteExistente = pacientes.find(p => p.historiaClinica === historia);

  if (pacienteExistente) {
    setForm({
      ...getFormInicial(camaIdParam),
      ...pacienteExistente,
      historiaClinica: historia, // asegurar historia
      cama: camaIdParam           // asegurar cama
    });
    setModoEdicion(true);
    setPacienteExistenteId(pacienteExistente.id);
  } else {
    setForm(prev => ({
      ...getFormInicial(camaIdParam),
      historiaClinica: historia,
      cama: camaIdParam
    }));
    setModoEdicion(false);
  }
}, [historia, pacientes, camaIdParam]);




  useEffect(() => {
    if (pacienteCargado) {
      setForm(prev => ({
        ...getFormInicial(camaIdParam),
        ...pacienteCargado,
        cama: camaIdParam || pacienteCargado.cama || ''
      }));
    }
  }, [pacienteCargado, camaIdParam]);

  useEffect(() => {
    if (!historiaClinica.trim()) return

    const fetchPaciente = async () => {
      try {
        const pacientesPorHistoria = await getPacientePorHistoria(historiaClinica)
        if (pacientesPorHistoria.length === 0) {
          setForm(prev => ({ ...getFormInicial(camaIdParam), historiaClinica }))
          setPacienteExistenteId(null)
          setModoEdicion(false)
          return
        }
        const registroActual = pacientesPorHistoria.find(p => p.fechaActual === form.fechaActual)
        if (registroActual) {
          setForm({ ...getFormInicial(camaIdParam), ...registroActual, cama: camaIdParam })
          setPacienteExistenteId(registroActual.id)
          setModoEdicion(true)
        } else {
          const ultimo = pacientesPorHistoria[0]
          const base = {
            ...getFormInicial(camaIdParam),
            nombre: ultimo.nombre,
            apellido: ultimo.apellido,
            edad: ultimo.edad,
            sexo: ultimo.sexo,
            eps: ultimo.eps,
            talla: ultimo.talla,
            peso: ultimo.peso,
            historiaClinica,
            fechaIngreso: ultimo.fechaIngreso,
            fechaActual: form.fechaActual,
            cama: camaIdParam
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
  }, [historiaClinica, form.fechaActual, camaIdParam])

  const handleChange = useCallback(e => {
    const { name, value } = e.target
    setForm(prev => {
      const actualizado = { ...prev, [name]: value }
      if (name === 'peso' || name === 'talla') actualizado.sc = calcularSC(actualizado.peso, actualizado.talla)
      if (name === 'fechaIngreso' || name === 'fechaActual') actualizado.diasEstancia = calcularDiasEstancia(
        name === 'fechaIngreso' ? value : prev.fechaIngreso,
        name === 'fechaActual' ? value : prev.fechaActual
      )
      return actualizado
    })
  }, [])

  const handleChangeHistoria = e => {
    const valor = e.target.value
    setHistoriaClinica(valor)
    setForm(prev => ({ ...prev, historiaClinica: valor }))
  }

  const handleSubmit = async e => {
  e.preventDefault();

  const pacienteAAsignar = {
    ...form,
    historiaClinica: historiaClinica,
    cama: camaIdParam
  };

  try {
    let registro;
    if (modoEdicion && pacienteExistenteId) {
  registro = await actualizarPaciente(pacienteExistenteId, pacienteAAsignar);
  dispatch(actualizarPacienteStore(registro));
  // Actualizar cama en cualquier caso
  dispatch(asignarPaciente({ camaId: parseInt(camaIdParam), paciente: registro }));
  dispatch(notifyWithTimeout('Registro actualizado con éxito', 3000));
} else {
  registro = await agregarPaciente(pacienteAAsignar);
  dispatch(agregarPacienteStore(registro));
  dispatch(asignarPaciente({ camaId: parseInt(camaIdParam), paciente: registro }));
  dispatch(notifyWithTimeout('Paciente registrado', 3000));
}


    navigate('/camas'); // volver a vista de camas
  } catch (err) {
    console.error('Error al guardar:', err);
    dispatch(notifyWithTimeout('Ocurrió un error al guardar el registro.', 3000));
  }
};


  const NavHojas = () => (
    <div className="nav-hojas">
      {[1,2,3,4,5,6].map(n => (
        <button key={n} type="button" onClick={() => setPagina(n)} className={pagina===n?'activo':''}>
          {`Hoja ${n}`}
        </button>
      ))}
    </div>
  )

  return (
    <div className="paciente-form-wrapper">
      <form onSubmit={handleSubmit} className="formulario-paciente">
        <div className="form-header">
          <div className="header-left">Clínica</div>
          <div className="header-center">UNIDAD DE CUIDADOS INTENSIVOS</div>
          <div className="header-right">Código versión actualizada</div>
        </div>

        <h2>{modoEdicion ? 'Editar paciente del día' : `Nuevo registro - Cama ${camaIdParam}`}</h2>

        <div className="input-group">
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

        <NavHojas />

        {pagina === 1 && <div className="pagina1">
          <DatosBasicos form={form} onChange={handleChange} />
          <TipoUci form={form} onChange={handleChange} camaId={camaIdParam} />
          <FechasEstancia form={form} onChange={handleChange} />
          <DiagnosticosProblemas form={form} setForm={setForm} />
          <LaboratoriosEstudios form={form} setForm={setForm} />
          <MedicamentosInfusion form={form} setForm={setForm} />
          <MedicamentosHorarios form={form} setForm={setForm} />
          <DosisUnica form={form} setForm={setForm} />
        </div>}

        {pagina === 2 && <div className="pagina2"><ComponenteHoja2 form={form} setForm={setForm} /></div>}
        {pagina === 3 && <div className="pagina3"><ComponenteHoja3 form={form} setForm={setForm} /></div>}
                {pagina === 4 && <div className="pagina4"><ComponenteHoja4 form={form} setForm={setForm} /></div>}
        {pagina === 5 && <div className="pagina5"><ComponenteHoja5 form={form} setForm={setForm} /></div>}
        {pagina === 6 && <div className="pagina6"><ComponenteHoja6 form={form} setForm={setForm} /></div>}

        <div className="botones-navegacion">
          {pagina > 1 && <button type="button" onClick={() => setPagina(p => p-1)}>Anterior</button>}
          {pagina < 6 && <button type="button" onClick={() => setPagina(p => p+1)}>Siguiente</button>}
          <button type="submit">{modoEdicion ? 'Actualizar' : 'Guardar'}</button>
          <button type="button" onClick={() => navigate('/')} style={{marginLeft:10}}>Volver</button>
        </div>
      </form>
    </div>
  )
}

export default PacienteForm

