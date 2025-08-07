import axios from 'axios'

const baseUrl = 'http://localhost:3001/pacientes'

export const getTodosPacientes = () =>
  axios.get(baseUrl).then(res => res.data)

export const getPacientePorHistoria = (historiaClinica) =>
  axios.get(`${baseUrl}?historiaClinica=${historiaClinica}`).then(res => res.data)

export const agregarPaciente = (nuevoPaciente) =>
  axios.post(baseUrl, nuevoPaciente).then(res => res.data)

export const actualizarPaciente = (id, datosActualizados) =>
  axios.put(`${baseUrl}/${id}`, datosActualizados).then(res => res.data)

export const eliminarPaciente = (id) =>
  axios.delete(`${baseUrl}/${id}`).then(res => res.data)
