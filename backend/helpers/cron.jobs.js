import cron from 'node-cron';
import { sendNotificationToUser } from './notifications.helper.js';
import { UserModel } from '../models/user.model.js';

export const startMotivationalCron = () => {
    console.log('Iniciando servicio de Cron Jobs...');

    // Tarea 1: Mensaje motivacional diario
    // Se ejecuta todos los días a las 10:00 AM (zona horaria de Argentina)
    cron.schedule('0 10 * * *', async () => {
        console.log('CRON (10:00 AM): Ejecutando tarea de motivación diaria...');

        try {

            console.log('CRON: (Simulación) Tarea de motivación completada. Implementar la lógica de búsqueda de usuarios.');

        } catch (error) {
            console.error('Error en la tarea CRON de motivación:', error.message);
        }
    }, {
        timezone: "America/Argentina/Buenos_Aires"
    });
};