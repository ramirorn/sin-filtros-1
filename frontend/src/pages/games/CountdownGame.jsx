import { useState, useEffect } from "react";
import { Link } from "react-router";

export const CountdownGame = () => {
  const [targetNumber, setTargetNumber] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setLevel(1);
    setGameOver(false);
    startNewRound();
  };

  const startNewRound = () => {
    const newTarget = Math.floor(Math.random() * 50) + 20;
    setTargetNumber(newTarget);
    setCurrentNumber(0);
    setTimeLeft(10);
    setIsPlaying(true);
  };

  const handleClick = () => {
    if (!isPlaying) return;

    const newNumber = currentNumber + 1;
    setCurrentNumber(newNumber);

    if (newNumber === targetNumber) {
      const timeBonus = timeLeft * 10;
      const newScore = score + 100 + timeBonus;
      setScore(newScore);
      setLevel(level + 1);

      setTimeout(() => {
        startNewRound();
      }, 500);
    }
  };

  const progress = targetNumber > 0 ? (currentNumber / targetNumber) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">⏱️</div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent mb-2">
              Cuenta Regresiva
            </h1>
            <p className="text-slate-400">
              Haz clic hasta alcanzar el número objetivo
            </p>
          </div>

          {!isPlaying && !gameOver && (
            <div className="text-center">
              <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-lg text-slate-200 mb-3">
                  ¿Cómo jugar?
                </h3>
                <ul className="text-left text-slate-300 space-y-2">
                  <li>• Haz clic en el botón para aumentar el contador</li>
                  <li>
                    • Alcanza el número objetivo antes de que termine el tiempo
                  </li>
                  <li>• Ganas puntos extra por tiempo restante</li>
                  <li>• Cada nivel aumenta la dificultad</li>
                </ul>
              </div>
              <button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-emerald-400 to-teal-600 text-white py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-emerald-500/30"
              >
                Comenzar Juego
              </button>
            </div>
          )}

          {isPlaying && (
            <div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {level}
                  </div>
                  <div className="text-sm text-slate-400">Nivel</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {score}
                  </div>
                  <div className="text-sm text-slate-400">Puntos</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {timeLeft}
                  </div>
                  <div className="text-sm text-slate-400">Segundos</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300 font-semibold">
                    {currentNumber} / {targetNumber}
                  </span>
                  <span className="text-slate-400">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden border border-white/20">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-teal-600 h-full transition-all duration-300 rounded-full shadow-lg shadow-emerald-500/30"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Click Button */}
              <button
                onClick={handleClick}
                className="w-full bg-gradient-to-r from-emerald-400 to-teal-600 text-white py-20 rounded-3xl font-bold text-4xl hover:scale-105 transition-all active:scale-95 shadow-2xl shadow-emerald-500/40"
              >
                CLIC
              </button>
            </div>
          )}

          {gameOver && (
            <div className="text-center">
              <div className="text-6xl mb-4">
                {score >= 500 ? "🏆" : score >= 300 ? "🎉" : "💪"}
              </div>
              <h2 className="text-3xl font-bold text-slate-50 mb-3">
                ¡Juego Terminado!
              </h2>
              <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-2xl p-6 mb-6">
                <div className="text-5xl font-bold text-emerald-400 mb-2">
                  {score}
                </div>
                <div className="text-slate-300 mb-2">Puntos totales</div>
                <div className="text-xl font-semibold text-slate-200 mb-2">
                  Nivel alcanzado: {level}
                </div>
                <div className="text-slate-400">
                  {score >= 500
                    ? "¡Increíble! Eres un campeón 🏆"
                    : score >= 300
                    ? "¡Muy bien! Gran desempeño 💪"
                    : score >= 100
                    ? "¡Buen intento! 👍"
                    : "¡Sigue practicando! 💚"}
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-emerald-400 to-teal-600 text-white py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-emerald-500/30"
                >
                  Jugar de Nuevo
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
