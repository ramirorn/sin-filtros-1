import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { EditPostModal } from "./EditPostModal";
import API_ENDPOINTS from "../config/api.js";

export const PostCard = ({ post, onDelete, onUpdate }) => {
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Actualizar comentarios cuando el post cambia
  useEffect(() => {
    setComments(post.comments || []);
    setLikes(post.likes || []);
  }, [post]);

  // Obtener el usuario actual
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.profile, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentUserId(data.profile._id);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleLike = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.toggleLike(post._id), {
        method: "PUT",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.post.likes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(API_ENDPOINTS.addComment(post._id), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text: newComment }),
      });

      if (response.ok) {
        const data = await response.json();
        // El backend devuelve el comentario con author poblado
        setComments([...comments, data.comment]);
        setNewComment("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.postById(post._id), {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        onDelete(post._id);
        setIsDeleteModalOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isAuthor = currentUserId === post.author?._id;
  const isLiked = likes.includes(currentUserId);

  // Validación de seguridad
  if (!post.author) {
    return null;
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl overflow-hidden hover:scale-[1.02] hover:shadow-cyan-500/10 transition-all">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
            {post.author.profile?.profile_picture ? (
              <img
                src={post.author.profile.profile_picture}
                alt={post.author.username}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-bold text-lg">
                {post.author.username[0].toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="font-bold text-slate-50">{post.author.username}</p>
            <p className="text-xs text-slate-400">
              {new Date(post.createdAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {isAuthor && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium px-3 py-1 rounded-full hover:bg-cyan-400/10 transition"
            >
              Editar
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1 rounded-full hover:bg-red-400/10 transition"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>

      {/* Image */}
      {post.images && post.images.length > 0 && (
        <div className="relative w-full bg-slate-950">
          <img
            src={post.images[0].url}
            alt="Post"
            className="w-full max-h-[500px] object-contain"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <p className="text-slate-300 mb-3 whitespace-pre-wrap">
          {post.description}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full font-bold border border-cyan-400/30"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-6 pt-3 border-t border-white/10">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 ${
              isLiked ? "text-red-400" : "text-slate-400"
            } hover:text-red-400 transition font-bold`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={isLiked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm">{likes.length}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-sm">{comments.length}</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-white/10">
            {/* Comment Form */}
            <form onSubmit={handleComment} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escribe un comentario..."
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm transition"
                />
                <button
                  type="submit"
                  className="bg-linear-to-r from-cyan-400 to-blue-600 text-white px-5 py-2 rounded-full font-bold hover:scale-105 transition-all text-sm shadow-lg shadow-cyan-500/30"
                >
                  Enviar
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {comments.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-4">
                  No hay comentarios aún. ¡Sé el primero en comentar!
                </p>
              ) : (
                comments.map((comment) => {
                  // Validar que el comentario exista
                  if (!comment || !comment.text) return null;

                  // El backend popula 'author' con username y profile.profile_picture
                  const author = comment.author;
                  const authorName = author?.username || "Usuario";
                  const profilePic = author?.profile?.profile_picture;

                  return (
                    <div
                      key={comment._id || Math.random()}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 bg-linear-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center shrink-0 overflow-hidden shadow-lg shadow-purple-500/30">
                        {profilePic ? (
                          <img
                            src={profilePic}
                            alt={authorName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-xs font-bold">
                            {authorName[0]?.toUpperCase() || "?"}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3">
                        <p className="text-sm font-bold text-slate-200">
                          {authorName}
                        </p>
                        <p className="text-sm text-slate-300 mt-1">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {createPortal(
        <EditPostModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          post={post}
          onPostUpdated={onUpdate}
        />,
        document.body
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900/95 backdrop-blur-lg border border-red-500/20 rounded-3xl shadow-2xl w-full max-w-md p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg shadow-red-500/30">
                  ⚠️
                </div>
                <h3 className="text-2xl font-bold text-slate-50 mb-2">
                  ¿Eliminar publicación?
                </h3>
                <p className="text-slate-400 mb-6">
                  Esta acción no se puede deshacer. La publicación se eliminará
                  permanentemente.
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-slate-300 py-3 rounded-full font-semibold hover:bg-white/20 hover:scale-105 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-lg shadow-red-500/30"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
