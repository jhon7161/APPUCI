// src/store.js
import { configureStore } from '@reduxjs/toolkit'
import pacientesReducer from './reducers/pacienteSlice'

export const store = configureStore({
  reducer: {
    pacientes: pacientesReducer
  }
})
