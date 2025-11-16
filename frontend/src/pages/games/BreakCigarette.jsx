import { useState, useEffect } from "react";
import { Link } from "react-router";

export const BreakCigarette = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cigarettes, setCigarettes] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

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
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const spawnCigarette = setInterval(() => {
      const newCigarette = {
        id: Date.now(),
        x: Math.random() * 80 + 10, // 10-90% del ancho
        y: -10,
      };
      setCigarettes((prev) => [...prev, newCigarette]);
    }, 800);

    return () => clearInterval(spawnCigarette);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const moveInterval = setInterval(() => {
      setCigarettes((prev) =>
        prev
          .map((cig) => ({ ...cig, y: cig.y + 2 }))
          .filter((cig) => cig.y < 100)
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setGameOver(false);
    setCigarettes([]);
  };

  const breakCigarette = (id) => {
    setCigarettes((prev) => prev.filter((cig) => cig.id !== id));
    setScore((prev) => prev + 10);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🚭</div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent mb-2">
              Rompe el Cigarro
            </h1>
            <p className="text-slate-400">
              ¡Destruye todos los cigarrillos que puedas!
            </p>
          </div>

          {!isPlaying && !gameOver && (
            <div className="text-center">
              <div className="bg-red-400/10 border border-red-400/20 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-lg text-slate-200 mb-3">
                  ¿Cómo jugar?
                </h3>
                <ul className="text-left text-slate-300 space-y-2">
                  <li>• Haz clic en los cigarrillos para destruirlos</li>
                  <li>• Cada cigarro destruido suma 10 puntos</li>
                  <li>• Tienes 30 segundos para conseguir el mejor puntaje</li>
                  <li>• ¡Reacciona rápido!</li>
                </ul>
              </div>
              <button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-red-500/30"
              >
                Comenzar Juego
              </button>
            </div>
          )}

          {isPlaying && (
            <div>
              {/* Stats */}
              <div className="flex justify-between items-center mb-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-50">
                    {score}
                  </div>
                  <div className="text-sm text-slate-400">Puntos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {timeLeft}
                  </div>
                  <div className="text-sm text-slate-400">Segundos</div>
                </div>
              </div>

              {/* Game Area */}
              <div className="relative bg-gradient-to-b from-blue-900/30 to-blue-800/30 rounded-2xl h-96 overflow-hidden border-2 border-white/10">
                {cigarettes.map((cig) => (
                  <button
                    key={cig.id}
                    onClick={() => breakCigarette(cig.id)}
                    className="absolute text-4xl hover:scale-110 transition-transform cursor-pointer"
                    style={{
                      left: `${cig.x}%`,
                      top: `${cig.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    🚬
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameOver && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-slate-50 mb-3">
                ¡Juego Terminado!
              </h2>
              <div className="bg-red-400/10 border border-red-400/20 rounded-2xl p-6 mb-6">
                <div className="text-5xl font-bold text-red-400 mb-2">
                  {score}
                </div>
                <div className="text-slate-300">Puntos totales</div>
                <div className="mt-4 text-slate-400">
                  {score >= 300
                    ? "¡Increíble! Eres un maestro destruyendo cigarros 🏆"
                    : score >= 200
                    ? "¡Muy bien! Sigue así 💪"
                    : score >= 100
                    ? "¡Buen intento! Puedes mejorar 👍"
                    : "¡Inténtalo de nuevo! 💚"}
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-red-500/30"
                >
                  Jugar de Nuevo
                </button>
                <Link
                  to="/games"
                  className="block w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
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
