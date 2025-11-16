import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            password: user.password,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );

    return token;
};

export const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
};