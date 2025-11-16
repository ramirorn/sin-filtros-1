import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Loading } from "../components/Loading";
import { useForm } from "../hooks/useForm";
import API_ENDPOINTS from "../config/api.js";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

export const Profile = ({ onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { values, handleChange, setValues } = useForm({
    username: "",
    firstname: "",
    lastname: "",
    biography: "",
  });

  useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true);
      setError("");
      try {
        const profileResponse = await fetchWithAuth(API_ENDPOINTS.profile);
        if (!profileResponse.ok) {
          throw new Error("No se pudo obtener el perfil");
        }
        const profileBody = await profileResponse.json();
        setProfile(profileBody.profile);

        setValues({
          username: profileBody?.profile?.username || "",
          firstname: profileBody?.profile?.profile?.firstname || "",
          lastname: profileBody?.profile?.profile?.lastname || "",
          biography: profileBody?.profile?.profile?.biography || "",
        });

        if (profileBody?.profile?.profile?.profile_picture) {
          setImagePreview(profileBody.profile.profile.profile_picture);
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserProfile();
  }, [setValues]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const logoutResponse = await fetchWithAuth(API_ENDPOINTS.logout, {
        method: "POST",
      });
      if (!logoutResponse.ok) {
        throw new Error("No se pudo cerrar la sesión");
      }
      // Limpiar localStorage
      localStorage.removeItem("auth_token");
      setIsLogoutModalOpen(false);
      onLogout();
    } catch (err) {
      console.log(err);
      setError(err.message || "Error al cerrar sesión");
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    setError(null);

    // Validaciones frontend
    if (!values.username || values.username.trim() === "") {
      setError("El nombre de usuario es requerido");
      setIsUpdating(false);
      return;
    }

    if (values.username.length < 3 || values.username.length > 20) {
      setError("El nombre de usuario debe tener entre 3 y 20 caracteres");
      setIsUpdating(false);
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
      setError(
        "El nombre de usuario solo puede contener letras, números y guión bajo (sin espacios)"
      );
      setIsUpdating(false);
      return;
    }

    if (!values.firstname || values.firstname.trim() === "") {
      setError("El nombre es requerido");
      setIsUpdating(false);
      return;
    }

    if (!values.lastname || values.lastname.trim() === "") {
      setError("El apellido es requerido");
      setIsUpdating(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", values.username.trim());
      formData.append("profile[firstname]", values.firstname.trim());
      formData.append("profile[lastname]", values.lastname.trim());
      formData.append("profile[biography]", values.biography.trim());

      // Solo agregar imagen si se seleccionó una nueva
      if (selectedImage) {
        formData.append("profile_picture", selectedImage);
      }

      const response = await fetchWithAuth(API_ENDPOINTS.profile, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error del servidor:", errorData);
        // Manejar múltiples errores de validación
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const errorMessages = errorData.errors
            .map((err) => err.msg || err.message)
            .join(". ");
          setError(errorMessages);
          setIsUpdating(false);
          return;
        }

        // Mensajes de error personalizados según el código de estado
        if (response.status === 400) {
          setError(errorData.msg || "Los datos proporcionados no son válidos");
        } else if (response.status === 409) {
          setError("El nombre de usuario ya está en uso. Intenta con otro");
        } else if (response.status === 401) {
          setError(
            "Tu sesión ha expirado. Por favor, inicia sesión nuevamente"
          );
        } else {
          setError(
            errorData.msg || "No se pudo actualizar el perfil. Intenta de nuevo"
          );
        }

        setIsUpdating(false);
        return;
      }

      const updatedProfileData = await response.json();
      setProfile(updatedProfileData.profile);

      // Actualizar values con los datos nuevos del servidor
      setValues({
        username: updatedProfileData.profile?.username || "",
        firstname: updatedProfileData.profile?.profile?.firstname || "",
        lastname: updatedProfileData.profile?.profile?.lastname || "",
        biography: updatedProfileData.profile?.profile?.biography || "",
      });

      // Mantener la imagen actual si no se subió una nueva
      if (
        selectedImage &&
        updatedProfileData.profile?.profile?.profile_picture
      ) {
        setImagePreview(updatedProfileData.profile.profile.profile_picture);
      } else if (!selectedImage && profile?.profile?.profile_picture) {
        setImagePreview(profile.profile.profile_picture);
      }

      setIsEditing(false);
      setSelectedImage(null);
    } catch (err) {
      // Asegurar que siempre mostramos un string
      setError(err.message || String(err) || "Error al actualizar el perfil");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError(null);
    setSelectedImage(null);
    setValues({
      username: profile?.username || "",
      firstname: profile?.profile?.firstname || "",
      lastname: profile?.profile?.lastname || "",
      biography: profile?.profile?.biography || "",
    });
    if (profile?.profile?.profile_picture) {
      setImagePreview(profile.profile.profile_picture);
    }
  };

  if (isLoading) return <Loading />;

  const userName = profile?.profile?.firstname || "---";
  const userLastName = profile?.profile?.lastname || "---";
  const userBiography = profile?.profile?.biography || "Sin biografía";
  const profileImage = profile?.profile?.profile_picture;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <section className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8">
          <header className="mb-6 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Mi Perfil
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Información de la cuenta
            </p>
          </header>

          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-2xl backdrop-blur-sm">
              {String(error.msg)}
            </div>
          )}

          {/* imagen de perfil */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-3xl font-bold">
                    {userName[0]?.toUpperCase() || "?"}
                  </span>
                )}
              </div>
              {isEditing && (
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                  placeholder="Tu nombre de usuario"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    placeholder="Tu apellido"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Biografía
                </label>
                <textarea
                  name="biography"
                  value={values.biography}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none transition"
                  placeholder="Cuéntanos sobre ti..."
                />
              </div>

              <div className="flex gap-3 mb-6">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-3 px-4 rounded-full shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isUpdating ? "Guardando..." : "Guardar Cambios"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isUpdating}
                  className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 text-slate-300 font-semibold py-3 px-4 rounded-full hover:bg-white/10 hover:scale-105 transition-all disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <label className="block text-xs text-slate-400 mb-1 uppercase font-medium">
                    Nombre de Usuario
                  </label>
                  <p className="text-lg text-slate-50 font-semibold">
                    @{profile?.username || "---"}
                  </p>
                </div>

                <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <label className="block text-xs text-slate-400 mb-1 uppercase font-medium">
                    Nombre Completo
                  </label>
                  <p className="text-lg text-slate-50 font-semibold">
                    {userName} {userLastName}
                  </p>
                </div>

                <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <label className="block text-xs text-slate-400 mb-1 uppercase font-medium">
                    Biografía
                  </label>
                  <p className="text-sm text-slate-300">{userBiography}</p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-3 px-4 rounded-full hover:scale-105 transition-all shadow-lg shadow-cyan-500/30 mb-4"
              >
                ✏️ Editar Perfil
              </button>
            </>
          )}

          <div className="mb-6 text-center">
            <p className="text-sm text-slate-400">
              Datos protegidos · Sesión segura
            </p>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              disabled={isLoggingOut}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-3 px-4 rounded-full hover:scale-105 transition-all shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Cerrar Sesión
            </button>

            <Link
              to={"/home"}
              className="flex-1 border border-white/10 bg-white/5 backdrop-blur-sm text-slate-300 font-bold py-3 px-4 rounded-full hover:bg-white/10 hover:scale-105 transition-all text-center"
            >
              Volver
            </Link>
          </div>
        </section>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
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
        </div>
      )}
    </div>
  );
};
