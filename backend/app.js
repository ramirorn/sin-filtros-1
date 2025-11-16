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
	'https://sin-filtros-1.vercel.app',
	process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
	origin: function (origin, callback) {
		// Permitir peticiones sin origin (como Postman, apps móviles, etc.)
		if (!origin) return callback(null, true);

		if (allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			console.log('Origin bloqueado por CORS:', origin);
			callback(new Error('No permitido por CORS'));
		}
	},
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	exposedHeaders: ['set-cookie'],
};

// Configuraciones
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//Rutas
app.use('/sin-filtros', routes);

//Conexion a la base de datos
app.listen(PORT, async () => {
	console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
	await connectDB();
});
