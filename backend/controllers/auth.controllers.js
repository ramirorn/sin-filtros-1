import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { deleteFileByUrl, uploadFromBuffer } from "../helpers/cloudinary.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/user.model.js";
import { matchedData } from "express-validator"

export const register = async (req, res) => {
    try {
        const data = matchedData(req);

        const hashedPassword = await hashPassword(data.password);

        const user = await UserModel.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            profile: data.profile,
        })

        res.status(201).json({
            ok: true,
            msg: "Usuario creado con exito",
            user
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
            err,
        })
    }
}

// Login de usuario
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscar el usuario por su email
        const user = await UserModel.findOne({ email });
        if (!user)
            return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });

        // Comparar la contraseña recibida con la almacenada
        const isMatch = await comparePassword(password, user.password);

        // Si no coinciden las contraseñas
        if (!isMatch)
            return res.status(401).json({ ok: false, msg: "Contraseña incorrecta" });

        // Generar el token con JWT
        const token = generateToken(user);

        // Enviar el token en una cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60, // 1 hora
            secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Permitir cross-origin en producción
        });

        res.status(200).json({ ok: true, message: "Login exitoso", token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false, msg: "Error interno del servidor", err });
    }
};

// Logout de usuario
export const logout = async (req, res) => {
    try {
        // Eliminar la cookie del token
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });

        res.status(200).json({
            ok: true,
            message: "Logout exitoso",
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
            err,
        });
    }
};

// Traer perfil del usuario autenticado
export const getAuthProfile = async (req, res) => {
    try {
        // Obtener el usuario logueado
        const usuarioLogueado = req.usuarioLogueado;

        // Buscar el usuario en la base de datos
        const user = await UserModel.findOne({ _id: usuarioLogueado.id }).select(
            "-password"
        );

        res.status(200).json({
            ok: true,
            profile: user,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
            err,
        });
    }
};

// Actualizar perfil del usuario autenticado
export const updateAuthProfile = async (req, res) => {
    try {
        // Obtener los datos validados y solo los que vienen en el body
        const data = matchedData(req, { locations: ["body"] });

        // Si no hay datos para actualizar
        if (Object.keys(data).length === 0) { // Object.keys(data) devuelve un array con las claves del objeto
            return res.status(400).json({
                ok: false,
                message: "Sin datos para actualizar",
            });
        }

        // Obtener el usuario logueado
        const usuarioLogueado = req.usuarioLogueado;
        if (req.file) {
            // Obtener el usuario actual para eliminar la imagen anterior si existe
            const user = await UserModel.findById(usuarioLogueado.id);

            if (user.profile?.profile_picture) {
                console.log("Eliminando imagen anterior de perfil");
                await deleteFileByUrl(user.profile.profile_picture);
            }

            // Subir la nueva imagen a cloudinary
            const result = await uploadFromBuffer(req.file.buffer);

            // Agregar la URL de la nueva imagen a los datos
            if (!data.profile) data.profile = {};
            data.profile.profile_picture = result.secure_url;
        }
        // Actualizar el perfil del usuario
        const updatedProfile = await UserModel.findByIdAndUpdate(
            usuarioLogueado.id,
            { $set: data }, // Actualizar el campo profile{}
            { new: true } // Devolver el documento actualizado
        ).select("-password"); // Devolver el usuario actualizado sin la contraseña

        res.status(200).json({
            ok: true,
            message: "Perfil actualizado correctamente",
            profile: updatedProfile,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
            err,
        });
    }
};