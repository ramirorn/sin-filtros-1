import { useEffect, useState } from "react";
import { PostCard } from "../components/PostCard";
import { CreatePostModal } from "../components/CreatePostModal";
import { Loading } from "../components/Loading";
import API_ENDPOINTS from "../config/api.js";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

export const Community = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(API_ENDPOINTS.posts);

      const data = await response.json();
      if (response.ok) {
        // Asegurarse de que data.posts sea un array
        setPosts(Array.isArray(data.posts) ? data.posts : []);
      } else {
        setError(data.msg || "Error al cargar los posts");
      }
    } catch (err) {
      console.log(err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    setIsCreateModalOpen(false);
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(
      posts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
                💬 Comunidad Sin Filtro
              </h1>
              <p className="text-sm sm:text-base text-slate-400">
                Comparte tu progreso, experiencias y apoya a otros en su camino
              </p>
            </div>
          </div>

          {/* Create Post Button */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-3 px-4 sm:px-6 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span className="text-xl sm:text-2xl">✍️</span>
            <span>Crear Publicación</span>
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl backdrop-blur-sm">
            {error}
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-16 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-slate-300 text-lg font-semibold mb-2">
                No hay publicaciones aún
              </p>
              <p className="text-slate-400 mb-6">
                ¡Sé el primero en compartir tu experiencia!
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-cyan-500/30"
              >
                Crear Primera Publicación
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onDelete={handlePostDeleted}
                onUpdate={handlePostUpdated}
              />
            ))
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};
