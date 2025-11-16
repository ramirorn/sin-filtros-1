import { sendNotification } from "../helpers/notifications.helper.js";
import { UserModel } from "../models/user.model.js";

export const registerDevice = async (req, res) => {
    const { token } = req.body;
    const userId = req.usuarioLogueado?.id;

    if (!token) {
        return res.status(400).json({ ok: false, message: 'El token del dispositivo es requerido.' });
    }

    if (!userId) {
        return res.status(401).json({ ok: false, message: 'Usuario no autenticado.' });
    }

    try {
        await UserModel.findByIdAndUpdate(userId, {
            $addToSet: { device_tokens: token }
        });

        res.status(200).json({ ok: true, message: 'Dispositivo registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar el dispositivo:', error.message);
        res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
    }
};

export const unregisterDevice = async (req, res) => {
    const { token } = req.body;
    const userId = req.usuarioLogueado?.id;

    if (!token) {
        return res.status(400).json({ ok: false, message: 'El token del dispositivo es requerido.' });
    }

    if (!userId) {
        return res.status(401).json({ ok: false, message: 'Usuario no autenticado.' });
    }

    try {
        await UserModel.findByIdAndUpdate(userId, {
            $pull: { device_tokens: token }
        });

        res.status(200).json({ ok: true, message: 'Dispositivo des-registrado exitosamente.' });
    } catch (error) {
        console.error('Error al des-registrar el dispositivo:', error.message);
        res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
    }
};

export const testNotification = async (req, res) => {
    const { testToken } = req.body;
    const userId = req.usuarioLogueado?.id;

    if (!testToken) {
        return res.status(400).json({ ok: false, message: 'El "testToken" es requerido en el body.' });
    }

    console.log(`Usuario ${userId} está enviando una notificación de prueba...`);

    const result = await sendNotification(
        testToken,
        'Prueba desde Backend (Sin Filtros) 🚀',
        '¡Hola! Si recibes esto, la API de notificaciones funciona perfectamente.'
    );

    if (result.success) {
        res.status(200).json({ ok: true, message: 'Notificación de prueba enviada', response: result.response });
    } else {
        res.status(500).json({ ok: false, message: 'Error al enviar la notificación', error: result.error });
    }
};