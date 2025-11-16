import { Navigate, Route, Routes } from "react-router";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

// Paginas
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Community } from "../pages/Community";
import { Games } from "../pages/Games";
import { BreathingGame } from "../pages/games/BreathingGame";
import { BreakCigarette } from "../pages/games/BreakCigarette";
import { MemoryGame } from "../pages/games/MemoryGame";
import { CountdownGame } from "../pages/games/CountdownGame";
import { Education } from "../pages/Education";
// import { Tasks } from "../pages/Tasks";

// Enrutador principal
export const AppRouter = ({ authStatus, onLogin, onLogout }) => {
  return (
    <Routes>
      {/* Rutas publicas */}
      <Route element={<PublicRoutes authStatus={authStatus} />}>
        <Route path="/login" element={<Login onLoginSucces={onLogin} />} />
        <Route path="/register" element={<Register />} />
      </Route>
      {/* Rutas privadas */}
      <Route element={<PrivateRoutes authStatus={authStatus} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/education" element={<Education />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/breathing" element={<BreathingGame />} />
        <Route path="/games/break-cigarette" element={<BreakCigarette />} />
        <Route path="/games/memory" element={<MemoryGame />} />
        <Route path="/games/countdown" element={<CountdownGame />} />
        <Route path="/profile" element={<Profile onLogout={onLogout} />} />
      </Route>

      <Route
        path="*"
        element={
          <Navigate to={authStatus === "authenticated" ? "/home" : "/login"} />
        }
      />
    </Routes>
  );
};
