import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import Login from "./page/Login";
import Home from "./page/Home";
import Perfil from "./page/Perfil";
import Tiempos from "./page/Tiempos";
import Nadadores from "./page/Nadadores";
import Progreso from "./page/Progreso";
import Competencia from "./page/Competencia";
import NavBar from "./Components/NavBar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Institution from "./page/Institution.jsx";
import { Toaster } from "react-hot-toast";
import AddSwimmerForm from "./Components/AddSwimmerForm.jsx";
import EditSwimmerForm from "./Components/EditSwimmerForm.jsx";
import InsertTimesCompetencia from "./Components/InsertTimesCompetencia.jsx";
import ResultsCompetencia from "./Components/ResultsCompetencia.jsx";
import OrganisatedCompetencia from "./Components/OrganisatedCompetencia.jsx";

import Meters from "./page/Meters.jsx";
import Tests from "./page/Tests.jsx";
import AddUserForm from "./Components/AddUserForm.jsx";
import MiProgreso from "./Components/MiProgreso.jsx";
import EditUserForm from "./Components/EditUserForm.jsx";
import Users from "./page/Users.jsx";
import Comandos from "./page/Comandos.jsx";

import PanelProgramador from "./page/PanelProgramador.jsx";
import CronoSwim from "./page/CronoSwim.jsx";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <BrowserRouter basename="/natacion">
          
          <Toaster />
          <NavBar />
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute
                  requiredRol={["Administrador", "Programador"]}
                />
              }
            >
              <Route path="/tiempos" element={<Tiempos />} />
              <Route path="/miprogreso" element={<MiProgreso />} />
              <Route path="/perfil" element={<Perfil />} />
            </Route>

            <Route element={<ProtectedRoute requiredRol={["Programador"]} />}>
              <Route path="/cronoswim" element={<CronoSwim />} />
              <Route path="/competencia" element={<Competencia />} />
              <Route path="/organizar" element={<OrganisatedCompetencia />} />
              <Route path="/comandos" element={<Comandos />} />
              <Route
                path="/competencia/insert"
                element={<InsertTimesCompetencia />}
              />
              <Route
                path="/competencia/resultados"
                element={<ResultsCompetencia />}
              />
              <Route path="/nadadores" element={<Nadadores />} />
              <Route path="/añadir-nadador" element={<AddSwimmerForm />} />
              <Route
                path="/editar-nadador/:dni"
                element={<EditSwimmerForm />}
              />
              <Route path="/progreso" element={<Progreso />} />
              <Route path="/metros" element={<Meters />} />
              <Route path="/pruebas" element={<Tests />} />
              <Route path="/institucion" element={<Institution />} />
              <Route path="/usuarios" element={<Users />} />
              <Route path="/añadir-usuario" element={<AddUserForm />} />
              <Route path="/editar-usuario/:dni" element={<EditUserForm />} />
              <Route path="/panel-programador" element={<PanelProgramador />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
