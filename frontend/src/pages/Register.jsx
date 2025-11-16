import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm.js";
import { useState } from "react";
import API_ENDPOINTS from "../config/api.js";

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { values, handleChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (
      !values.username.trim() ||
      !values.email.trim() ||
      !values.password.trim() ||
      !values.firstname.trim() ||
      !values.lastname.trim()
    ) {
      setError("Todos los campos son requeridos");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          profile: {
            firstname: values.firstname,
            lastname: values.lastname,
          },
        }),
      });
      const data = await response.json();
      if (response.ok) {
        handleReset();
        navigate("/login");
      } else {
        setError(data.message || "Error al registrar usuario");
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
      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent text-center mb-6 sm:mb-8">
            Crear Cuenta
          </h2>

          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-2xl backdrop-blur-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              type="text"
              name="username"
              placeholder="Nombre de Usuario"
              value={values.username}
              onChange={handleChange}
            />

            <input
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={values.email}
              onChange={handleChange}
            />

            <input
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={values.password}
              onChange={handleChange}
            />

            <input
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              type="text"
              name="firstname"
              placeholder="Nombre"
              value={values.firstname}
              onChange={handleChange}
            />

            <input
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition col-span-1 md:col-span-2"
              type="text"
              name="lastname"
              placeholder="Apellido"
              value={values.lastname}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-3 rounded-full shadow-lg shadow-cyan-500/30 hover:scale-105 hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Registrando..." : "Registrar"}
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
            ¿Ya tienes una cuenta?{" "}
            <Link
              className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition"
              to="/login"
            >
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
