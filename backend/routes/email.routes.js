import { Router } from 'express';
import { handleSendEmail, handleWelcomeEmail } from '../controllers/email.controllers.js';

// Importamos tu middleware de autenticación
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const emailRoutes = Router();

// Aplicamos el middleware de autenticación a TODAS estas rutas
emailRoutes.use(authMiddleware);

emailRoutes.post('/send-email', handleSendEmail);
emailRoutes.post('/send-welcome', handleWelcomeEmail);