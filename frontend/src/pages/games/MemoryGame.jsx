import { useState, useEffect } from "react";
import { Link } from "react-router";

const emojis = ["🍎", "🥗", "🏃", "💪", "🧘", "💧", "😊", "🌟"];

export const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = () => {
    const gameCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));

    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsPlaying(true);
    setGameWon(false);
  };

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) {
      return;
    }

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;

      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second]);
        setFlipped([]);

        if (matched.length + 2 === cards.length) {
          setTimeout(() => setGameWon(true), 500);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🧠</div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
              Memoria Saludable
            </h1>
            <p className="text-slate-400">
              Encuentra las parejas de hábitos saludables
            </p>
          </div>

          {!isPlaying && !gameWon && (
            <div className="text-center">
              <div className="bg-purple-400/10 border border-purple-400/20 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-lg text-slate-200 mb-3">
                  ¿Cómo jugar?
                </h3>
                <ul className="text-left text-slate-300 space-y-2">
                  <li>• Haz clic en las tarjetas para voltearlas</li>
                  <li>• Encuentra las parejas de emojis iguales</li>
                  <li>
                    • Intenta completar el juego con el menor número de
                    movimientos
                  </li>
                  <li>• ¡Ejercita tu memoria mientras te diviertes!</li>
                </ul>
              </div>
              <button
                onClick={initializeGame}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-purple-500/30"
              >
                Comenzar Juego
              </button>
            </div>
          )}

          {isPlaying && !gameWon && (
            <div>
              {/* Stats */}
              <div className="text-center mb-6 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <div className="text-2xl font-bold text-slate-50">
                  Movimientos: {moves}
                </div>
              </div>

              {/* Game Grid */}
              <div className="grid grid-cols-4 gap-4">
                {cards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`aspect-square rounded-2xl text-5xl font-bold transition-all duration-300 ${
                      flipped.includes(card.id) || matched.includes(card.id)
                        ? "bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
                        : "bg-purple-500 hover:bg-purple-600 shadow-lg shadow-purple-500/30"
                    }`}
                  >
                    {flipped.includes(card.id) || matched.includes(card.id)
                      ? card.emoji
                      : "?"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameWon && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-slate-50 mb-3">
                ¡Felicitaciones!
              </h2>
              <div className="bg-purple-400/10 border border-purple-400/20 rounded-2xl p-6 mb-6">
                <div className="text-5xl font-bold text-purple-400 mb-2">
                  {moves}
                </div>
                <div className="text-slate-300 mb-4">Movimientos</div>
                <div className="text-slate-400">
                  {moves <= 12
                    ? "¡Memoria excepcional! 🏆"
                    : moves <= 18
                    ? "¡Excelente trabajo! 💪"
                    : moves <= 24
                    ? "¡Bien hecho! 👍"
                    : "¡Buen intento! Puedes mejorar 💚"}
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={initializeGame}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-purple-500/30"
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
