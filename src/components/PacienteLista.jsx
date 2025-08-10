import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getTodosPacientes,
  eliminarPaciente
} from '../services/pacienteService'
import {
  setPacientes,
  eliminarPacienteStore
} from '../reducers/pacienteSlice'

export default function PacienteLista({ onCargarPaciente }) {
  const dispatch = useDispatch()
  const pacientes = useSelector(state => state.pacientes)

  useEffect(() => {
    getTodosPacientes().then(data => dispatch(setPacientes(data)))
  }, [dispatch])

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      await eliminarPaciente(id)
      dispatch(eliminarPacienteStore(id))
    }
  }

  return (
    <div>
      <h2>Pacientes registrados</h2>
      <ul>
        {pacientes.map(p => (
          <li key={p.id}>
            {p.nombre} {p.apellido} ({p.historiaClinica}) - {p.fechaActual}
            <button onClick={() => handleDelete(p.id)}>Eliminar</button>{' '}
            <button onClick={() => onCargarPaciente && onCargarPaciente(p)}>Cargar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
