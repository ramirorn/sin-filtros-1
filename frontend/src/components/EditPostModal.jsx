import { useState, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import API_ENDPOINTS from "../config/api.js";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

export const EditPostModal = ({ isOpen, onClose, post, onPostUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { values, handleChange, setValues } = useForm({
    description: "",
    tags: "",
  });

  useEffect(() => {
    if (post) {
      setValues({
        description: post.description || "",
        tags: post.tags ? post.tags.join(", ") : "",
      });
      if (post.images && post.images.length > 0) {
        setImagePreview(post.images[0].url);
      }
    }
  }, [post, setValues]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!values.description.trim()) {
      setError("La descripción es requerida");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("description", values.description);

      if (values.tags.trim()) {
        const tagsArray = values.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);
        tagsArray.forEach((tag) => {
          formData.append("tags[]", tag);
        });
      }

      if (selectedImage) {
        formData.append("images", selectedImage);
      }

      const response = await fetchWithAuth(API_ENDPOINTS.postById(post._id), {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        onPostUpdated(data.post);
        onClose();
        setSelectedImage(null);
      } else {
        setError(data.msg || "Error al actualizar la publicación");
      }
    } catch (err) {
      console.log(err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900/95 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-slate-900/95 backdrop-blur-lg">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            ✏️ Editar Publicación
          </h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-200 text-3xl font-bold leading-none transition"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-2xl backdrop-blur-sm">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Descripción *
            </label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Comparte tu experiencia, logros o pensamientos..."
              rows="5"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none transition"
            />
            <p className="text-xs text-slate-500 mt-1">
              Máximo 2200 caracteres
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Etiquetas (opcional)
            </label>
            <input
              type="text"
              name="tags"
              value={values.tags}
              onChange={handleChange}
              placeholder="Ej: motivación, día 30, logro"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <p className="text-xs text-slate-500 mt-1">
              Separa las etiquetas con comas
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Cambiar imagen (opcional)
            </label>
            <div className="border-2 border-dashed border-white/10 bg-white/5 rounded-2xl p-4 text-center hover:border-cyan-400/40 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload-edit"
              />
              <label
                htmlFor="image-upload-edit"
                className="cursor-pointer flex flex-col items-center"
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 rounded-2xl object-contain"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-red-500/30"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-slate-500 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-slate-400">
                      Haz clic para seleccionar una imagen
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-slate-300 py-3 rounded-full font-semibold hover:bg-white/20 hover:scale-105 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-3 rounded-full font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30"
            >
              {loading ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
