import { configureStore } from '@reduxjs/toolkit'
import pacientesReducer from './reducers/pacienteSlice'
import notificationReducer from './reducers/notificationReducer'
import camasReducer from './reducers/camasSlice';
export const store = configureStore({
  reducer: {
    pacientes: pacientesReducer,
    camas: camasReducer,
    notification: notificationReducer
  }
})
