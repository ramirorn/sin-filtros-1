// Configuración de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
    // Auth
    profile: `${API_URL}/sin-filtros/auth/profile`,
    login: `${API_URL}/sin-filtros/auth/login`,
    register: `${API_URL}/sin-filtros/auth/register`,
    logout: `${API_URL}/sin-filtros/auth/logout`,

    // Posts
    posts: `${API_URL}/sin-filtros/posts`,
    postById: (id) => `${API_URL}/sin-filtros/posts/${id}`,
    toggleLike: (id) => `${API_URL}/sin-filtros/posts/${id}/toggle-like`,
    addComment: (id) => `${API_URL}/sin-filtros/posts/${id}/comments`,

    // Chat
    chat: `${API_URL}/sin-filtros/chat`,
};

export default API_ENDPOINTS;
