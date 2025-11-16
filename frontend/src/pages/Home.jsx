import { useEffect, useState } from "react";
import { Link } from "react-router";
import API_ENDPOINTS from "../config/api.js";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

export const Home = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetchWithAuth(API_ENDPOINTS.profile);
        if (response.ok) {
          const data = await response.json();
          setProfile(data.profile);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  const userName = profile?.profile?.firstname || "Usuario";
  const motivationalPhrases = [
    "Cada día sin fumar es una victoria 💪",
    "Tu salud mejora con cada hora que pasa 🌟",
    "Eres más fuerte que cualquier adicción ⚡",
    "El cambio comienza contigo 🚀",
    "Hoy es otro día de libertad 🦋",
  ];

  const randomPhrase =
    motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];

  // Simulación de datos - en producción vendrían del backend
  const stats = {
    daysSmoking: 127,
    cigarettesAvoided: 2540,
    moneySaved: 50800,
  };

  const quickActions = [
    {
      title: "Comunidad",
      description: "Comparte tu progreso y apoya a otros",
      icon: "💬",
      link: "/community",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Educación",
      description: "Aprende más sobre tu recuperación",
      icon: "📚",
      link: "/education",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Minijuegos",
      description: "Distráete cuando sientas ansiedad",
      icon: "🎮",
      link: "/games",
      color: "from-green-500 to-green-600",
    },
  ];

  const healthBenefits = [
    {
      time: "20 minutos",
      benefit: "Tu presión arterial y frecuencia cardíaca se normalizan",
      achieved: true,
    },
    {
      time: "12 horas",
      benefit:
        "El nivel de monóxido de carbono en sangre vuelve a la normalidad",
      achieved: true,
    },
    {
      time: "2 semanas",
      benefit: "Mejora la circulación y aumenta la función pulmonar",
      achieved: true,
    },
    {
      time: "1-9 meses",
      benefit: "Disminuye la tos y dificultad para respirar",
      achieved: stats.daysSmoking >= 30,
    },
    {
      time: "1 año",
      benefit: "Riesgo de enfermedad cardíaca se reduce a la mitad",
      achieved: stats.daysSmoking >= 365,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/30">
                👋
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-50">
                  ¡Bienvenido, {userName}!
                </h1>
                <p className="text-lg text-slate-400 mt-1">{randomPhrase}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-6 border-l-4 border-emerald-400">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-300 font-semibold">Días Sin Fumar</h3>
              <span className="text-3xl">🎯</span>
            </div>
            <p className="text-4xl font-bold bg-linear-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
              {stats.daysSmoking}
            </p>
            <p className="text-sm text-slate-400 mt-2">
              ¡Sigue así, vas excelente!
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-6 border-l-4 border-cyan-400">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-300 font-semibold">
                Cigarrillos Evitados
              </h3>
              <span className="text-3xl">🚭</span>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              {stats.cigarettesAvoided.toLocaleString()}
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Cada uno cuenta para tu salud
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-6 border-l-4 border-yellow-400">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-300 font-semibold">Dinero Ahorrado</h3>
              <span className="text-3xl">💰</span>
            </div>
            <p className="text-4xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              ${stats.moneySaved.toLocaleString()}
            </p>
            <p className="text-sm text-slate-400 mt-2">Invierte en tu futuro</p>
          </div>
        </div>

        {/* Accesos Rápidos */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 mb-6">
            Accesos Rápidos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl overflow-hidden hover:scale-105 hover:shadow-cyan-500/20 transition-all"
              >
                <div
                  className={`bg-gradient-to-r ${action.color} p-6 text-white text-center`}
                >
                  <div className="text-5xl mb-3">{action.icon}</div>
                  <h3 className="text-xl font-bold">{action.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-400 text-center group-hover:text-slate-300 transition">
                    {action.description}
                  </p>
                  <div className="mt-4 text-center">
                    <span className="text-cyan-400 font-semibold group-hover:text-cyan-300">
                      Ir ahora →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Timeline de Beneficios */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-6 mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 mb-6">
            🏥 Tu Línea de Tiempo de Recuperación
          </h2>
          <div className="space-y-4">
            {healthBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-2xl ${
                  benefit.achieved
                    ? "bg-emerald-500/10 border border-emerald-500/20"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <div className="shrink-0">
                  {benefit.achieved ? (
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/30">
                      ✓
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-slate-500">
                      ○
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-bold mb-1 ${
                      benefit.achieved ? "text-emerald-400" : "text-slate-300"
                    }`}
                  >
                    {benefit.time}
                  </h3>
                  <p
                    className={
                      benefit.achieved ? "text-emerald-300" : "text-slate-400"
                    }
                  >
                    {benefit.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivación y Recursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tip del Día */}
          <div className="relative bg-white/5 backdrop-blur-lg border border-yellow-400/20 rounded-3xl shadow-2xl p-8 overflow-hidden group hover:border-yellow-400/40 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-yellow-500/30">
                  💡
                </div>
                <h3 className="text-2xl font-extrabold text-slate-50">
                  Tip del Día
                </h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Cuando sientas el impulso de fumar, intenta la técnica 4-7-8:
                Inhala 4 segundos, mantén 7 segundos, exhala 8 segundos. Repite
                3 veces.
              </p>
              <Link
                to="/games/breathing"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-yellow-500/30"
              >
                Practicar ahora
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Ayuda de Emergencia */}
          <div className="relative bg-white/5 backdrop-blur-lg border border-pink-400/20 rounded-3xl shadow-2xl p-8 overflow-hidden group hover:border-pink-400/40 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-pink-500/30">
                  🆘
                </div>
                <h3 className="text-2xl font-extrabold text-slate-50">
                  ¿Necesitas Ayuda?
                </h3>
              </div>
              <p className="text-slate-300 mb-6">
                Si estás pasando por un momento difícil, no estás solo. Contamos
                con recursos para ayudarte.
              </p>
              <div className="space-y-3">
                <Link
                  to="/community"
                  className="block bg-white/10 backdrop-blur-sm border border-white/20 text-slate-50 px-6 py-3 rounded-full font-bold hover:bg-white/20 hover:scale-105 transition-all text-center"
                >
                  Hablar con la comunidad
                </Link>
                <a
                  href="tel:+5408002221002"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-all text-center shadow-lg shadow-pink-500/30"
                >
                  <span>📞</span>
                  Línea de ayuda 24/7
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
