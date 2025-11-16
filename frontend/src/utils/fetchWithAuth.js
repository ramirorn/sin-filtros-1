// Función auxiliar para hacer fetch con autenticación
// Compatible con iOS Safari que tiene problemas con cookies cross-origin

export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('auth_token');

    const headers = {
        ...options.headers,
    };

    // Agregar token en Authorization header si existe
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        credentials: 'include', // Mantener cookies por si el navegador las soporta
        headers,
    };

    return fetch(url, config);
};
