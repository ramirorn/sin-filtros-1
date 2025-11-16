import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = "Eres el asistente virtual conversacional del proyecto 'Sin Filtros', una iniciativa contra el tabaquismo. Tu objetivo es: 1) Ofrecer apoyo empático a quienes quieren dejar de fumar. 2) Proporcionar datos e información educativa sobre los daños del tabaco. 3) Responder a preguntas con un tono positivo y motivacional. 4) Nunca promuevas ni trivialices el consumo de tabaco. Mantén las respuestas claras y concisas.";

/**
 * Función que se conecta a la API de Gemini
 * @param {string} prompt El mensaje del usuario
 * @returns {string} La respuesta de la IA
 */

export const getAIResponse = async (prompt) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ]
        });

        return response.text;

    } catch (err) {
        console.log("Error al conectar con la IA: ", err);
        throw new Error("Error al conectar con la IA")
    }
}