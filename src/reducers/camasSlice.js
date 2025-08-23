// src/reducers/camasSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  paciente: null
}))

const camasSlice = createSlice({
  name: 'camas',
  initialState,
  reducers: {
    agregarCama: (state) => {
      const nuevaId = state.length + 1
      state.push({ id: nuevaId, paciente: null })
    },
    asignarPacienteACama: (state, action) => {
      const { idCama, paciente } = action.payload
      const cama = state.find(c => c.id === idCama)
      if (cama) cama.paciente = paciente
    },
    eliminarPacienteDeCama: (state, action) => {
      const idCama = action.payload
      const cama = state.find(c => c.id === idCama)
      if (cama) cama.paciente = null
    }
  }
})

export const { agregarCama, asignarPacienteACama, eliminarPacienteDeCama } = camasSlice.actions
export default camasSlice.reducer
