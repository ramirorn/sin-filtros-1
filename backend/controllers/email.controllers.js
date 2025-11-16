import { sendEmailHelper } from '../helpers/email.helper.js';

/**
 * Controlador para manejar una solicitud de envío de correo
 * Asume que es llamado por una ruta POST con { to, subject, html } en el req.body
 */
export const handleSendEmail = async (req, res) => {
  const { to, subject, html } = req.body;

  // Validación básica de entrada
  if (!to || !subject || !html) {
    return res.status(400).json({ 
      message: 'Faltan campos requeridos: to, subject, html' 
    });
  }

  try {
    // Llamamos a nuestro helper que hace el trabajo real
    const emailData = await sendEmailHelper(to, subject, html);
    
    // Enviamos una respuesta exitosa
    res.status(200).json({ 
      message: 'Correo enviado exitosamente', 
      messageId: emailData.id 
    });

  } catch (error) {
    // Si el helper lanza un error, lo capturamos aquí
    console.error('Error en el controlador handleSendEmail:', error);
    res.status(500).json({ 
      message: 'Falló el envío del correo', 
      error: error.message 
    });
  }
};

/**
 * Otro controlador de ejemplo (ej. para un correo de bienvenida)
 */
export const handleWelcomeEmail = async (req, res) => {
  const { email, nombre } = req.body;

  if (!email || !nombre) {
    return res.status(400).json({ message: 'Faltan email y nombre' });
  }

  const subject = '¡Bienvenido a Sin Filtros!';
  const html = `
    <h1>Hola ${nombre},</h1>
    <p>Te damos la bienvenida a la comunidad <strong>Sin Filtros</strong>.</p>
    <p>Juntos, estamos creando un futuro más saludable.</p>
  `;

  try {
    await sendEmailHelper(email, subject, html);
    res.status(200).json({ message: 'Correo de bienvenida enviado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar bienvenida', error: error.message });
  }
};