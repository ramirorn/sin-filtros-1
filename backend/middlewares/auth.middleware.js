import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
    // Extraer el token de las cookies o del header Authorization
    let token = req.cookies["token"];

    // Si no hay token en cookies, intentar obtenerlo del header (para compatibilidad con iOS)
    if (!token) {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); // Remover "Bearer " del inicio
        }
    }

    // Si no hay token, el usuario no esta autenticado
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "Usuario no autenticado",
        });
    }

    try {
        // Verificar el token
        const decoded = verifyToken(token);

        // Enviar los datos del usuario logueado al req
        req.usuarioLogueado = decoded;

        // Continuar con la ejecucion
        next();
    } catch (err) {
        return res.status(401).json({
            ok: false,
            message: "Token inválido o expirado",
        });
    }
};
