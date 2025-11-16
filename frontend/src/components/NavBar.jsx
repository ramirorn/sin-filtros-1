import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { createPortal } from "react-dom";
import logo from "../assets/Sin Filtros Logo.png";
import API_ENDPOINTS from "../config/api.js";

export const NavBar = ({ authStatus, onLogout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch(API_ENDPOINTS.logout, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsLogoutModalOpen(false);
        onLogout();
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Nombre */}
          <div className="shrink-0">
            <Link
              to="/"
              className="flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <img
                src={logo}
                alt="Sin Filtros"
                className="h-10 w-10 object-contain"
              />
              <span className="hidden md:inline-block bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent font-extrabold uppercase text-lg tracking-wider">
                Sin Filtros
              </span>
            </Link>
          </div>

          {/* Botón menú móvil */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:bg-white/10 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {authStatus === "authenticated" ? (
              <>
                <Link
                  to="/home"
                  className="text-slate-300 px-4 py-2 rounded-full font-medium hover:bg-white/10 hover:text-cyan-400 transition"
                >
                  Inicio
                </Link>
                <Link
                  to="/community"
                  className="text-slate-300 px-4 py-2 rounded-full font-medium hover:bg-white/10 hover:text-cyan-400 transition"
                >
                  Comunidad
                </Link>
                <Link
                  to="/education"
                  className="text-slate-300 px-4 py-2 rounded-full font-medium hover:bg-white/10 hover:text-cyan-400 transition"
                >
                  Educación
                </Link>
                <Link
                  to="/games"
                  className="text-slate-300 px-4 py-2 rounded-full font-medium hover:bg-white/10 hover:text-cyan-400 transition"
                >
                  Minijuegos
                </Link>
                <Link
                  to="/profile"
                  className="text-slate-300 px-4 py-2 rounded-full font-medium hover:bg-white/10 hover:text-cyan-400 transition"
                >
                  Perfil
                </Link>
                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="bg-linear-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-red-500/30"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 px-4 py-2 rounded-full font-medium hover:bg-white/10 hover:text-cyan-400 transition"
                >
                  Ingresar
                </Link>
                <Link
                  to="/register"
                  className="bg-linear-to-r from-cyan-400 to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2 absolute bg-slate-900/98 backdrop-blur-lg left-0 right-0 shadow-xl border-b border-white/10">
            {authStatus === "authenticated" ? (
              <>
                <Link
                  to="/home"
                  className="block text-slate-300 hover:bg-white/10 hover:text-cyan-400 px-3 py-2 rounded-md text-base font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/community"
                  className="block text-slate-300 hover:bg-white/10 hover:text-cyan-400 px-3 py-2 rounded-md text-base font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Comunidad
                </Link>
                <Link
                  to="/education"
                  className="block text-slate-300 hover:bg-white/10 hover:text-cyan-400 px-3 py-2 rounded-md text-base font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Educación
                </Link>
                <Link
                  to="/games"
                  className="block text-slate-300 hover:bg-white/10 hover:text-cyan-400 px-3 py-2 rounded-md text-base font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Minijuegos
                </Link>
                <Link
                  to="/profile"
                  className="block text-slate-300 hover:bg-white/10 hover:text-cyan-400 px-3 py-2 rounded-md text-base font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Perfil
                </Link>
                <button
                  onClick={() => {
                    setIsLogoutModalOpen(true);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left bg-linear-to-r from-red-500 to-pink-600 text-white px-3 py-2 rounded-md text-base font-semibold transition hover:scale-105"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-slate-300 hover:bg-white/10 hover:text-cyan-400 px-3 py-2 rounded-md text-base font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Ingresar
                </Link>
                <Link
                  to="/register"
                  className="block bg-linear-to-r from-cyan-400 to-blue-600 text-white px-3 py-2 rounded-md text-base font-semibold transition hover:scale-105"
                  onClick={() => setMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900/95 backdrop-blur-lg border border-red-500/20 rounded-3xl shadow-2xl w-full max-w-md p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg shadow-red-500/30">
                  🚪
                </div>
                <h3 className="text-2xl font-bold text-slate-50 mb-2">
                  ¿Cerrar sesión?
                </h3>
                <p className="text-slate-400 mb-6">
                  Estás a punto de salir de tu cuenta. ¿Estás seguro?
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setIsLogoutModalOpen(false)}
                    disabled={isLoggingOut}
                    className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-slate-300 py-3 rounded-full font-semibold hover:bg-white/20 hover:scale-105 transition-all disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </nav>
  );
};
