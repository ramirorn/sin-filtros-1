import admin from "firebase-admin"
import { UserModel } from "../models/user.model.js"

export const initializeFirebaseAdmin = async () => {
    const projectId = process.env.FCM_PROJECT_ID;
    const clientEmail = process.env.FCM_CLIENT_EMAIL;
    const privateKey = process.env.FCM_PRIVATE_KEY?.replace(/\\n/g, '\n');;

    if (!projectId || !clientEmail || !privateKey) {
        console.warn('Advertencia: Variables de entorno FCM (PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY) no están configuradas. Las notificaciones push no funcionarán.');
        return;
    }

    try {
        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    clientEmail,
                    privateKey,
                }),
            });
            console.log('Firebase Admin SDK inicializado correctamente.');
        }
    } catch (err) {
        console.error('Error inicializando Firebase Admin SDK:', err.message);
    }
}

export const sendNotification = async (deviceToken, title, body, data = {}) => {
    if (admin.apps.length === 0) {
        console.log('Firebase Admin no está inicializado. No se puede enviar el mensaje.');
        return { success: false, error: 'Firebase no inicializado' };
    }

    if (!deviceToken) {
        console.log('No se proporcionó un deviceToken. Abortando.');
        return { success: false, error: 'Token no proporcionado' };
    }

    const message = {
        notification: {
            title: title,
            body: body,
        },
        data: data, // Puedes enviar datos extra a la app
        token: deviceToken,
    };

    try {
        const response = await admin.messaging().send(message);
        console.log(`Mensaje enviado exitosamente a ${deviceToken.substring(0, 20)}...:`, response);
        return { success: true, response: response };
    } catch (error) {
        console.error(`Error al enviar el mensaje a ${deviceToken.substring(0, 20)}...:`, error.message);

        // Auto-limpieza: Si el token es inválido, lo borramos de la BD.
        if (error.code === 'messaging/registration-token-not-registered' || error.code === 'messaging/invalid-registration-token') {
            await UserModel.updateMany(
                { device_tokens: deviceToken },
                { $pull: { device_tokens: deviceToken } }
            );
            console.log(`Token inválido ${deviceToken.substring(0, 20)}... eliminado de la BD.`);
        }

        return { success: false, error: error.message };
    }
}

export const sendNotificationToUser = async (userId, title, body, data = {}) => {
    try {
        const user = await UserModel.findById(userId).select('device_tokens').lean();

        if (!user || !user.device_tokens || user.device_tokens.length === 0) {
            console.log(`Usuario ${userId} no encontrado o no tiene tokens de dispositivo.`);
            return;
        }

        // Enviamos la notificación a todos los dispositivos registrados del usuario
        const sendPromises = user.device_tokens.map(token =>
            sendNotification(token, title, body, data)
        );

        await Promise.allSettled(sendPromises);
        console.log(`Notificaciones enviadas al usuario ${userId}`);

    } catch (error) {
        console.error(`Error al buscar tokens para el usuario ${userId}:`, error.message);
    }

}