import { useForm } from "../hooks/useForm";
import { useState } from "react";
import API_ENDPOINTS from "../config/api.js";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

export const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { values, handleChange, handleReset } = useForm({
    prompt: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.prompt.trim()) return;

    const userMessage = values.prompt;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    handleReset();
    setLoading(true);

    try {
      const response = await fetchWithAuth(API_ENDPOINTS.chat, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.text },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Error al obtener respuesta" },
        ]);
      }
    } catch (err) {
      console.log(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Error al conectar con el servidor" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900/95 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Asistente Virtual
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-slate-400 mt-8">
              <p className="text-lg font-semibold">¡Hola! 👋</p>
              <p className="mt-2">¿En qué puedo ayudarte hoy?</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl p-3 ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                    : "bg-white/5 backdrop-blur-sm border border-white/10 text-slate-300"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              name="prompt"
              value={values.prompt}
              onChange={handleChange}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-slate-50 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !values.prompt.trim()}
              className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
