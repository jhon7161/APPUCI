import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPacientes } from './reducers/pacienteSlice'
import PacienteForm from './components/PacienteForm'
import PacienteLista from './components/PacienteLista'
import Notification from './components/Notification'  // <-- Importar aquí

export default function App() {
  const dispatch = useDispatch()
  const [pacienteCargado, setPacienteCargado] = useState(null)

  useEffect(() => {
    dispatch(fetchPacientes())
  }, [dispatch])

  return (
    <div>
      <Notification />  {/* <-- Mostrar notificaciones */}
      <PacienteForm pacienteCargado={pacienteCargado} />
      <PacienteLista onCargarPaciente={setPacienteCargado} />
    </div>
  )
}
