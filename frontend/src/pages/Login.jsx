import { Link } from "react-router";
import { useForm } from "../hooks/useForm.js";
import { useState } from "react";
import { Loading } from "../components/Loading.jsx";

export const Login = ({ onLoginSucces }) => {
  const { values, handleChange, handleReset } = useForm({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!values.email.trim() || !values.password.trim()) {
      setError("Email y password son requeridos");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/sin-filtros/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (response.ok) {
        onLoginSucces();
      } else {
        setError("Credenciales invalidas");
        alert(data.message);
        handleReset();
      }
    } catch (err) {
      console.log(err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent text-center mb-8">
            Iniciar Sesión
          </h2>

          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-2xl backdrop-blur-sm">
              {error}
            </div>
          )}

          <label className="block text-sm text-slate-300 font-semibold mb-2">
            Email
          </label>
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            className="w-full mb-4 px-4 py-3 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />

          <label className="block text-sm text-slate-300 font-semibold mb-2">
            Contraseña
          </label>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full mb-6 px-4 py-3 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-3 rounded-full shadow-lg shadow-cyan-500/30 hover:scale-105 hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <button
            onClick={handleReset}
            className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 text-slate-300 px-6 py-2 rounded-full font-medium hover:bg-white/10 hover:scale-105 transition-all"
          >
            Reiniciar Formulario
          </button>

          <p className="text-sm text-slate-400">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
