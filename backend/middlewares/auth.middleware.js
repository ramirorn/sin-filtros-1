import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
    // Extraer el token de las cookies
    const token = req.cookies["token"];

    // Si no hay token, el usuario no esta autenticado
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "Usuario no autenticado",
        });
    }

    // Verificar el token
    const decoded = verifyToken(token);

    // Enviar los datos del usuario logueado al req
    req.usuarioLogueado = decoded;

    // Continuar con la ejecucion
    next();
};
