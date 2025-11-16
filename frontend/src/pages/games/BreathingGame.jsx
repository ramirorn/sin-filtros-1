import { useState, useEffect } from "react";
import { Link } from "react-router";

export const BreathingGame = () => {
  const [phase, setPhase] = useState("ready"); // ready, inhale, hold, exhale, complete
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const phaseConfig = {
    inhale: { duration: 4, text: "Inhala profundamente", color: "bg-blue-500" },
    hold: { duration: 7, text: "Mantén el aire", color: "bg-purple-500" },
    exhale: { duration: 8, text: "Exhala lentamente", color: "bg-green-500" },
  };

  useEffect(() => {
    if (!isActive || phase === "ready" || phase === "complete") return;

    const config = phaseConfig[phase];
    if (count < config.duration) {
      const timer = setTimeout(() => setCount(count + 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Cambiar a la siguiente fase
      if (phase === "inhale") {
        setPhase("hold");
        setCount(0);
      } else if (phase === "hold") {
        setPhase("exhale");
        setCount(0);
      } else if (phase === "exhale") {
        const newCycles = cycles + 1;
        setCycles(newCycles);
        if (newCycles >= 3) {
          setPhase("complete");
          setIsActive(false);
        } else {
          setPhase("inhale");
          setCount(0);
        }
      }
    }
  }, [count, phase, isActive, cycles]);

  const startExercise = () => {
    setIsActive(true);
    setPhase("inhale");
    setCount(0);
    setCycles(0);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase("ready");
    setCount(0);
    setCycles(0);
  };

  const currentConfig = phaseConfig[phase] || {};
  const progress =
    phase !== "ready" && phase !== "complete"
      ? (count / currentConfig.duration) * 100
      : 0;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🫁</div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
              Respiración 4-7-8
            </h1>
            <p className="text-slate-400">
              Técnica para reducir ansiedad y estrés
            </p>
          </div>

          {/* Main Content */}
          {phase === "ready" && (
            <div className="text-center">
              <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-lg text-slate-200 mb-3">
                  ¿Cómo funciona?
                </h3>
                <ul className="text-left text-slate-300 space-y-2">
                  <li>• Inhala por 4 segundos</li>
                  <li>• Mantén el aire por 7 segundos</li>
                  <li>• Exhala por 8 segundos</li>
                  <li>• Repite 3 ciclos completos</li>
                </ul>
              </div>
              <button
                onClick={startExercise}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-cyan-500/30"
              >
                Comenzar Ejercicio
              </button>
            </div>
          )}

          {phase !== "ready" && phase !== "complete" && (
            <div className="text-center">
              {/* Círculo animado */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-6">
                <div
                  className={`absolute inset-0 ${currentConfig.color} rounded-full opacity-20 animate-pulse`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl sm:text-7xl font-bold text-slate-50 mb-2">
                      {currentConfig.duration - count}
                    </div>
                    <div className="text-base sm:text-xl font-semibold text-slate-300">
                      {currentConfig.text}
                    </div>
                  </div>
                </div>
                {/* Progress circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray="753.98"
                    strokeDashoffset={753.98 - (753.98 * progress) / 100}
                    className={currentConfig.color.replace("bg-", "text-")}
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Ciclos */}
              <div className="text-center mb-4">
                <span className="text-slate-400 font-medium">
                  Ciclo {cycles + 1} de 3
                </span>
              </div>

              <button
                onClick={resetExercise}
                className="w-full bg-white/5 border border-white/10 text-slate-300 py-3 rounded-full font-semibold hover:bg-white/10 transition"
              >
                Detener
              </button>
            </div>
          )}

          {phase === "complete" && (
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-slate-50 mb-3">
                ¡Excelente trabajo!
              </h2>
              <p className="text-slate-400 mb-6">
                Has completado 3 ciclos de respiración 4-7-8.
                <br />
                ¿Cómo te sientes ahora?
              </p>
              <div className="space-y-3">
                <button
                  onClick={startExercise}
                  className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-cyan-500/30"
                >
                  Hacer otro ejercicio
                </button>
                <Link
                  to="/games"
                  className="block w-full bg-white/5 border border-white/10 text-slate-300 py-3 rounded-full font-semibold hover:bg-white/10 transition"
                >
                  Volver a Minijuegos
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Back button */}
        <div className="text-center mt-6">
          <Link to="/games" className="text-white hover:underline">
            ← Volver a Minijuegos
          </Link>
        </div>
      </div>
    </div>
  );
};
