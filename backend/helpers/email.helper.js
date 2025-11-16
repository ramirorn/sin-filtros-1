import { Resend } from "resend";

// Cargamos la API key desde las variables de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Función helper para enviar correos usando Resend
 * @param {string} to - El destinatario del correo (ej: 'usuario@gmail.com')
 * @param {string} subject - El asunto del correo
 * @param {string} html - El contenido HTML del correo
 */
export const sendEmailHelper = async (to, subject, html) => {
  try {
    // La API de Resend devuelve un objeto con { data, error }
    const { data, error } = await resend.emails.send({
      // ¡IMPORTANTE! 'from' debe ser un dominio verificado en Resend.
      // Para pruebas, Resend te permite usar 'onboarding@resend.dev'
      from: 'Sin Filtros <onboarding@resend.dev>',
      to: [to], // 'to' debe ser un array de strings
      subject: subject,
      html: html,
      // tags: [{ name: 'project', value: 'sin-filtros' }] // Opcional: para organizar
    });

    // Si Resend devuelve un error, lo lanzamos
    if (error) {
      console.error('Error al enviar correo desde Resend:', error);
      throw new Error(error.message);
    }

    // Si todo va bien, devolvemos la data (contiene el ID del mensaje)
    console.log('Correo enviado exitosamente:', data.id);
    return data;

  } catch (catchError) {
    // Capturamos cualquier otro error (ej. de red)
    console.error('Error en sendEmailHelper:', catchError);
    throw catchError; // Re-lanzamos el error para que el controlador lo maneje
  }
};