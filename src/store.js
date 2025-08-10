import { configureStore } from '@reduxjs/toolkit'
import pacientesReducer from './reducers/pacienteSlice'
import notificationReducer from './reducers/notificationReducer'

export const store = configureStore({
  reducer: {
    pacientes: pacientesReducer,
    notification: notificationReducer
  }
})
