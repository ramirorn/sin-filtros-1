import { Router } from "express"
import { registerDevice, unregisterDevice, testNotification } from "../controllers/notifications.controllers.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

export const notificationsRoutes = Router();
notificationsRoutes.use(authMiddleware);

/**
 * @route   POST /api/notifications/register-device
 * @desc    Registra un token de dispositivo para el usuario logueado
 * @access  Privado
 */
notificationsRoutes.post('/register-device', registerDevice);

/**
 * @route   POST /api/notifications/unregister-device
 * @desc    Elimina un token de dispositivo (al hacer logout)
 * @access  Privado
 */
notificationsRoutes.post('/unregister-device', unregisterDevice);


/**
 * @route   POST /api/notifications/test-notification
 * @desc    Envía una notificación de prueba a un token
 * @access  Privado (solo para pruebas)
 */
notificationsRoutes.post('/test-notification', testNotification);