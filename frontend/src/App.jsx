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
import NavBar from "./Components/NavBar";


function App() {
  return (
    <AuthProvider>


      <BrowserRouter basename="/natacion">
      <NavBar />
      <Routes>
        <Route  index element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route
              element={
                <ProtectedRoute
                  requiredRol={["Administrador","Programador"]}
                />
              }
            >
              <Route path="/tiempos" element={<Tiempos/>} />
              <Route path="/progreso" element={<Progreso/>} />
              <Route path="/perfil" element={<Perfil/>} />
        </Route>


        <Route
              element={
                <ProtectedRoute
                  requiredRol={["Programador"]}
                />
              }
            >
              <Route path="/nadadores" element={<Nadadores/>} />
        </Route>
       



      </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;