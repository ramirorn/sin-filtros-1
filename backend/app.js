// Importaciones
import express from 'express';
import 'dotenv/config';
import { connectDB } from './config/database.js';
import cookieParser from 'cookie-parser';
import { routes } from './routes/index.js';
import cors from 'cors';

// Configuración de CORS
const allowedOrigins = [
	'http://localhost:5173',
	'http://localhost:3000',
	process.env.FRONTEND_URL
].filter(Boolean);

// Configuraciones
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	}),
);

//Rutas
app.use('/sin-filtros', routes);

//Conexion a la base de datos
app.listen(PORT, async () => {
	console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
	await connectDB();
});
