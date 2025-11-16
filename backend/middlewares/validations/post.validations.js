// validators/post.validators.js
import { body, param } from "express-validator";
import { PostModel } from "../../models/post.model.js";


/**
 * Valida los campos necesarios para crear un nuevo post.
 * Usado por: createPost
 */
export const createPostValidator = [
    body("description")
        .notEmpty().withMessage("La descripción es obligatoria.")
        .trim()
        .isLength({ min: 1, max: 2200 }).withMessage("La descripción debe tener entre 1 y 2200 caracteres."),

    body("images")
        .optional()
        .isArray().withMessage("Las imágenes deben ser un array."),
    
    // Valida cada item dentro del array 'images', si es que existe
    body("images.*.url")
        .notEmpty().withMessage("La URL de la imagen no puede estar vacía.")
        .isURL().withMessage("Debe ser una URL de imagen válida."),

    body("tags")
        .optional()
        .isArray().withMessage("Los tags deben ser un array."),
    
    // Valida cada tag dentro del array 'tags'
    body("tags.*")
        .isString().withMessage("Cada tag debe ser texto.")
        .trim()
        .notEmpty().withMessage("Los tags no pueden estar vacíos.")
];

/**
 * Valida el campo 'text' para un nuevo comentario.
 * Usado por: createComment
 */
export const createCommentValidator = [
    body("text")
        .notEmpty().withMessage("El texto del comentario es obligatorio.")
        .trim()
        .isLength({ min: 1, max: 1000 }).withMessage("El comentario no puede tener más de 1000 caracteres.")
];

/**
 * Valida que el parámetro de ruta 'id' sea un MongoID válido
 * y que el post exista en la base de datos.
 * Usado por: getPostById, toggleLike
 */
export const validatePostById = [
    param("id")
        .isMongoId().withMessage("El ID del post no es válido.")
        .custom(async (id) => {
            // Verificamos que el post realmente exista
            const post = await PostModel.findById(id);
            if (!post) {
                throw new Error("Post no encontrado.");
            }
            return true;
        })
];

export const updatePostValidator = [
    body("description")
        .optional() // El usuario no está obligado a enviarlo
        .notEmpty()
        .withMessage("La descripción no puede estar vacía")
        .trim(),

    body("images")
        .optional() // El usuario no está obligado a enviar imágenes
        .isArray()
        .withMessage("Las imágenes deben ser un array"),

    // Valida cada URL dentro del array "images"
    body("images.*.url")
        .notEmpty()
        .withMessage("La URL de la imagen no puede estar vacía")
        .isURL()
        .withMessage("La URL de la imagen debe ser válida"),

    body("tags")
        .optional() // El usuario no está obligado a enviar tags
        .isArray()
        .withMessage("Los tags deben ser un array"),

    // Valida cada string dentro del array "tags"
    body("tags.*")
        .notEmpty()
        .withMessage("El tag no puede estar vacío")
        .isString()
        .withMessage("Cada tag debe ser texto")
        .trim()
];