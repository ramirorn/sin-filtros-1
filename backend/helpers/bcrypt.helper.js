import bcrypt from "bcrypt";

// Hasheo de la contraseña
export const hashPassword = async (password) => {
    const saltRounds = 10;

    return await bcrypt.hash(password, saltRounds);
};

// Comparacion de la contraseña
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};