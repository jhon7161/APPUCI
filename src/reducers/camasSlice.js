// src/reducers/camasSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialCamas = [
  { id: 1, paciente: null },
  { id: 2, paciente: null },
  { id: 3, paciente: null },
  { id: 4, paciente: null },
  { id: 5, paciente: null },
];

const camasSlice = createSlice({
  name: "camas",
  initialState: initialCamas,
  reducers: {
    asignarPaciente(state, action) {
      const { camaId, paciente } = action.payload;
      const cama = state.find(c => c.id === camaId);
      if (cama) cama.paciente = paciente;
    },
    liberarCama(state, action) {
      const camaId = action.payload;
      const cama = state.find(c => c.id === camaId);
      if (cama) cama.paciente = null;
    },
  },
});

export const { asignarPaciente, liberarCama } = camasSlice.actions;
export default camasSlice.reducer;
