import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPacientes } from './reducers/pacienteSlice'
import PacienteForm from './components/PacienteForm'
import PacienteLista from './components/PacienteLista'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPacientes())
  }, [dispatch])

  return (
    <div>
      <PacienteForm />
      <PacienteLista />
    </div>
  )
}
