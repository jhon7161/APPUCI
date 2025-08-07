import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTodosPacientes } from '../services/pacienteService'

// 🔁 Esta es la acción que debes importar como fetchPacientes
export const fetchPacientes = createAsyncThunk(
  'pacientes/fetchPacientes',
  async () => {
    const data = await getTodosPacientes()
    return data
  }
)

const pacienteSlice = createSlice({
  name: 'pacientes',
  initialState: [],
  reducers: {
    setPacientes: (state, action) => action.payload,
    agregarPaciente: (state, action) => {
      state.push(action.payload)
    },
    actualizarPacienteStore: (state, action) => {
      const index = state.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    eliminarPacienteStore: (state, action) => {
      return state.filter(p => p.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPacientes.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const {
  setPacientes,
  agregarPaciente,
  actualizarPacienteStore,
  eliminarPacienteStore
} = pacienteSlice.actions

export default pacienteSlice.reducer
