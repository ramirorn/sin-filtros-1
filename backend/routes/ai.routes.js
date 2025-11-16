import {Router} from "express";
import { chatWithAssistant } from "../controllers/ai.controllers.js";

export const aiRoutes = Router();

aiRoutes.post("/chat",chatWithAssistant)