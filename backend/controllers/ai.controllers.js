import { getAIResponse } from "../helpers/gemini.helper.js";

export const chatWithAssistant = async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({
            ok: false,
            msg: "Se requiere un prompt para la conversacion"
        })
    }

    try {
        const aiText = await getAIResponse(prompt);

        res.json({
            ok: true,
            msg: "Respuesta de la IA",
            text: aiText
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error del servidor al conectar con el asistente virtual.",
        });
    }
}