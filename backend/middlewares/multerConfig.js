import multer from "multer";
import path from "path";

// import { fileURLToPath } from "url";

// // ! Adaptacion para ES modules (por defecto __filename y __dirname no existen en ES modules)

// // * Da la ruta completa del archivo actual
// const __filename = fileURLToPath(import.meta.url);
// // * Da la carpeta donde esta el archivo actual
// const __dirname = path.dirname(__filename);

// // * Esto resuelve a: backend/public/uploads/logos
// const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads')

// ? Configuracion del almacenamiento / Guarda en la RAM
const storage = multer.memoryStorage();

// * 2 Configuracion de multer
export const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // * Limite de 5MB para el archivo
    fileFilter: (req, file, cb) => {
        // * Archivos admitidos
        const filetypes = /jpeg|jpg|png|webp/; // * Expresion regular

        // *  mimetype Devuelve true si la expresion regular encuentra coincidencias
        // * viene algo como image/jpg o image/png, etc
        const mimetype = filetypes.test(file.mimetype);

        // * extanme Comprueba la extension del archivo
        // * file.originalname es el nombre original del archivo (por ejemplo: "foto.png").
        // * path.extname() extrae la extensión (.png).
        // * .toLowerCase() la convierte en minúsculas por si viene en mayúsculas.
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        // * Si ambas condiciones son true, el archivo pasa el filtro
        if (mimetype && extname) {
            return cb(null, true)
        };

        // * En caso de que no pase el filtro:
        cb(new Error("Solo se permiten archivos de imagen (jpeg/jpg/png/webp)"));
    }
});