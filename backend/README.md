# Sin Filtros - Backend

Backend API para la aplicación Sin Filtros.

## Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticación
- Cloudinary para almacenamiento de imágenes
- Google Gemini AI
- Firebase Admin
- Resend para emails

## Instalación Local

```bash
npm install
```

## Variables de Entorno

Copia `.env.example` a `.env` y configura tus variables:

```bash
cp .env.example .env
```

## Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Despliegue

### Render

1. Conecta tu repositorio de GitHub
2. Crea un nuevo Web Service
3. Configura:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Agrega las variables de entorno desde el dashboard
5. Despliega

### Railway

1. Conecta tu repositorio
2. Las variables de entorno se detectan automáticamente
3. Agrega tus valores en el dashboard
4. Railway desplegará automáticamente

## API Endpoints

- `/sin-filtros/auth` - Autenticación
- `/sin-filtros/posts` - Posts
- `/sin-filtros/ai` - Inteligencia Artificial
- `/sin-filtros/notifications` - Notificaciones
- `/sin-filtros/email` - Emails
