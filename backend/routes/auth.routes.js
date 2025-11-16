import { Router } from "express";
import { register, login, logout, getAuthProfile, updateAuthProfile } from "../controllers/auth.controllers.js";
import { applyValidations } from "../middlewares/validator.js";
import { registerValidations, updateAuthProfileValidations } from "../middlewares/validations/auth.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multerConfig.js";

export const authRoutes = Router();
authRoutes.post("/auth/register", registerValidations, applyValidations, register)
authRoutes.post("/auth/login", login)
authRoutes.post("/auth/logout", authMiddleware, logout)
authRoutes.get("/auth/profile", authMiddleware, getAuthProfile)
authRoutes.put("/auth/profile", authMiddleware, upload.single("profile_picture"),updateAuthProfileValidations, applyValidations, updateAuthProfile)