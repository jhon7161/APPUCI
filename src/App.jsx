// src/App.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchPacientes } from "./reducers/pacienteSlice";
import Camas from "./components/Camas";
import PacienteForm from "./components/PacienteForm";
import PacienteLista from "./components/PacienteLista";
import Notification from "./components/Notification";
import './index.css';


export default function App() {
  const dispatch = useDispatch();
  const [pacienteCargado, setPacienteCargado] = useState(null);

  useEffect(() => {
    dispatch(fetchPacientes());
  }, [dispatch]);

  return (
    <Router>
      <Notification />
      <Routes>
        <Route path="/" element={<Camas />} />
        <Route
          path="/paciente/:numeroCama"
          element={<PacienteForm pacienteCargado={pacienteCargado} />}
        />
        <Route
          path="/lista"
          element={<PacienteLista onCargarPaciente={setPacienteCargado} />}
        />
      </Routes>
    </Router>
  );
}
