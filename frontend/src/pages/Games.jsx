import { useState } from "react";
import { Link } from "react-router";

export const Games = () => {
  const games = [
    {
      id: 1,
      title: "Respiración Guiada",
      description: "Ejercicio de respiración 4-7-8 para controlar la ansiedad",
      icon: "🫁",
      color: "bg-blue-500",
      route: "/games/breathing",
    },
    {
      id: 2,
      title: "Rompe el Cigarro",
      description: "Destruye cigarrillos en este juego rápido y divertido",
      icon: "🚭",
      color: "bg-red-500",
      route: "/games/break-cigarette",
    },
    {
      id: 3,
      title: "Memoria Saludable",
      description: "Entrena tu mente con este juego de memoria",
      icon: "🧠",
      color: "bg-purple-500",
      route: "/games/memory",
    },
    {
      id: 4,
      title: "Cuenta Regresiva",
      description: "Desafía al tiempo y distrae tu mente",
      icon: "⏱️",
      color: "bg-green-500",
      route: "/games/countdown",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-3">
            🎮 Minijuegos
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            Distrae tu mente y controla la ansiedad con estos juegos
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {games.map((game) => (
            <Link
              key={game.id}
              to={game.route}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-6 hover:scale-105 hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <div
                className={`${game.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto shadow-lg`}
              >
                {game.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-50 text-center mb-2">
                {game.title}
              </h3>
              <p className="text-slate-400 text-sm text-center">
                {game.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Motivational Section */}
        <div className="mt-12 relative bg-white/5 backdrop-blur-lg border border-cyan-400/20 rounded-3xl p-8 overflow-hidden group hover:border-cyan-400/40 transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto shadow-lg shadow-cyan-500/30">
              💪
            </div>
            <h2 className="text-2xl font-bold text-slate-50 mb-3">
              ¡Sigue adelante!
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Cada vez que sientas ganas de fumar, juega uno de estos
              minijuegos.
              <br />
              Tu cuerpo y mente te lo agradecerán.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
