import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


export const uploadFromBuffer = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: 'sin-filtros-posts' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);

    })
}

// Helper para extraer el Public ID
const getPublicIdFromUrl = (url) => {
    // Busca la parte después de la carpeta 'sin-filtros-posts/' y elimina la extensión.
    const urlParts = url.split('sin-filtros-posts/');
    if (urlParts.length < 2) return null;

    let publicIdWithExtension = urlParts[1];

    // Elimina la extensión (.jpg, .png, etc.)
    const publicId = publicIdWithExtension.split('.').slice(0, -1).join('.');

    return `sin-filtros-posts/${publicId}`;
};

// Elimina una imagen de Cloudinary usando su URL completa.
export const deleteFileByUrl = async (imageUrl) => {
    if (!imageUrl) return;

    const publicId = getPublicIdFromUrl(imageUrl);

    if (publicId) {
        console.log(`Intentando eliminar Public ID: ${publicId}`);
        return cloudinary.uploader.destroy(publicId);
    }
};