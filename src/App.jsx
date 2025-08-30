// src/App.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { fetchPacientes } from "./reducers/pacienteSlice";
import Home from "./components/Home";
import Camas from "./components/Camas";
import PacienteForm from "./components/PacienteForm";
import PacienteLista from "./components/PacienteLista";
import Notification from "./components/Notification";

import "./index.css";

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
        <Route path="/" element={<Home />} /> {/* Página principal */}
        <Route path="/camas" element={<Camas />} />
        <Route
          path="/paciente/:historia"
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
