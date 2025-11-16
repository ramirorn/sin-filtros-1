// Configuración de la API
const API_URL = process.env.API_URL;
export const API_ENDPOINTS = {
    // Auth
    profile: `${API_URL}/auth/profile`,
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
    logout: `${API_URL}/auth/logout`,

    // Posts
    posts: `${API_URL}/sin-filtros/posts`,
    postById: (id) => `${API_URL}/sin-filtros/posts/${id}`,
    toggleLike: (id) => `${API_URL}/sin-filtros/posts/${id}/toggle-like`,
    addComment: (id) => `${API_URL}/sin-filtros/posts/${id}/comments`,

    // Chat
    chat: `${API_URL}/sin-filtros/chat`,
};

export default API_ENDPOINTS;
