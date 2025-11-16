import { useState } from "react";

export const Education = () => {
  const [activeTab, setActiveTab] = useState("videos");

  const videos = [
    {
      id: 1,
      title: "Las claves para dejar de fumar | Rafael Santandreu",
      url: "https://www.youtube.com/embed/6U2kAxFLh9k?",
      description: "Una guíapara dejar el cigarrillo definitivamente.",
      duration: "2:18",
    },
    {
      id: 2,
      title: "¿Qué hace el tabaco en tu cerebro? | Tu mejor yo",
      url: "https://www.youtube.com/embed/XfNBtAt0ylc?",
      description: "Descubre cómo el tabaco afecta cada parte de tu organismo.",
      duration: "3:21",
    },
    {
      id: 3,
      title:
        "¡Deja de fumar por fin este 2025 con este poderoso enfoque! - Testimonio",
      url: "https://www.youtube.com/embed/hZkE1FDMnXw?",
      description:
        "Personas que lograron dejar el cigarrillo comparten su historia.",
      duration: "30:22",
    },
    {
      id: 4,
      title: "RESPIRACIÓN para REDUCIR la ANSIEDAD 🌱 Técnica 478",
      url: "https://www.youtube.com/embed/EGO5m_DBzF8?si=KaK2VykTVtIjTpD1",
      description:
        "Aprende técnicas efectivas para manejar la ansiedad sin fumar.",
      duration: "7:06",
    },
  ];

  const articles = [
    {
      id: 1,
      title: "Los primeros 30 días sin fumar",
      excerpt:
        "Descubre qué esperar durante el primer mes sin cigarrillos y cómo tu cuerpo comienza a recuperarse desde el primer día.",
      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=250&fit=crop",
      readTime: "5 min",
      category: "Recuperación",
    },
    {
      id: 2,
      title: "Mitos y verdades sobre dejar de fumar",
      excerpt:
        "Desmitificamos las creencias más comunes sobre el proceso de dejar el tabaco y te damos información basada en ciencia.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
      readTime: "7 min",
      category: "Información",
    },
    {
      id: 3,
      title: "Beneficios económicos de no fumar",
      excerpt:
        "Calcula cuánto dinero puedes ahorrar al año dejando el cigarrillo y en qué podrías invertir esos ahorros.",
      image:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop",
      readTime: "4 min",
      category: "Motivación",
    },
    {
      id: 4,
      title: "Alimentación para recuperar tu salud",
      excerpt:
        "Conoce qué alimentos te ayudarán a limpiar tu organismo y recuperarte más rápido del daño del tabaco.",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop",
      readTime: "6 min",
      category: "Salud",
    },
    {
      id: 5,
      title: "Cómo manejar las recaídas",
      excerpt:
        "Las recaídas son normales. Aprende a identificar los desencadenantes y cómo superarlos sin rendirte.",
      image:
        "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=400&h=250&fit=crop",
      readTime: "5 min",
      category: "Apoyo",
    },
    {
      id: 6,
      title: "El poder del apoyo social",
      excerpt:
        "Descubre por qué compartir tu proceso con otros es clave para mantener tu compromiso de no fumar.",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop",
      readTime: "4 min",
      category: "Comunidad",
    },
  ];

  const resources = [
    {
      id: 1,
      title: "Línea Nacional de Ayuda (0800-999-3040)",
      description: "Atención telefónica gratuita las 24 horas",
      icon: "📞",
      link: "tel:+5408009993040",
    },
    {
      id: 2,
      title: "Guía PDF Completa",
      description: "Descarga nuestra guía paso a paso para dejar de fumar",
      icon: "📄",
      link: "https://www.argentina.gob.ar/sites/default/files/bancos/2018-10/0000000584cnt-2017-05_manual-autoayuda-dejar-de-fumar.pdf",
    },
    {
      id: 3,
      title: "App de Seguimiento",
      description: "Registra tu progreso diario y celebra tus logros",
      icon: "📱",
      link: "#",
    },
    {
      id: 4,
      title: "Grupos de Apoyo",
      description: "Encuentra grupos locales cerca de ti",
      icon: "👥",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/30">
                📚
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-50">
                  Centro Educativo
                </h1>
              </div>
            </div>
            <p className="text-lg text-slate-400 max-w-3xl">
              Recursos, información y herramientas para apoyarte en tu camino
              hacia una vida libre de tabaco
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800/50 backdrop-blur-lg shadow-xl sticky top-0 z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("videos")}
              className={`py-4 px-6 font-bold whitespace-nowrap border-b-2 transition ${
                activeTab === "videos"
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              🎥 Videos
            </button>
            <button
              onClick={() => setActiveTab("articles")}
              className={`py-4 px-6 font-bold whitespace-nowrap border-b-2 transition ${
                activeTab === "articles"
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              📖 Artículos
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`py-4 px-6 font-bold whitespace-nowrap border-b-2 transition ${
                activeTab === "resources"
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              🔗 Recursos
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Videos Tab */}
        {activeTab === "videos" && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 mb-2">
                Videos Educativos
              </h2>
              <p className="text-slate-400">
                Contenido audiovisual para aprender más sobre el proceso de
                dejar de fumar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl overflow-hidden hover:scale-105 hover:shadow-cyan-500/20 transition-all"
                >
                  <div className="aspect-video bg-slate-950">
                    <iframe
                      width="100%"
                      height="100%"
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-cyan-400/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-400/30">
                        {video.duration}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-50 mb-2">
                      {video.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === "articles" && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 mb-2">
                Artículos y Guías
              </h2>
              <p className="text-slate-400">
                Información detallada basada en evidencia científica
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl overflow-hidden hover:scale-105 hover:shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-purple-400/20 text-purple-400 text-xs font-bold px-3 py-1 rounded-full border border-purple-400/30">
                        {article.category}
                      </span>
                      <span className="text-sm text-slate-400">
                        ⏱️ {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-50 mb-2 hover:text-cyan-400 transition">
                      {article.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                      {article.excerpt}
                    </p>
                    <button className="text-cyan-400 font-bold hover:text-cyan-300 transition text-sm flex items-center gap-1">
                      Leer más
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 mb-2">
                Recursos Adicionales
              </h2>
              <p className="text-slate-400">
                Herramientas y contactos útiles para tu proceso
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {resources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-6 hover:scale-105 hover:shadow-cyan-500/20 transition-all flex items-start gap-4"
                >
                  <div className="text-4xl">{resource.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-50 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {resource.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Estadísticas */}
            <div className="relative bg-white/5 backdrop-blur-lg border border-emerald-400/20 rounded-3xl p-8 overflow-hidden group hover:border-emerald-400/40 transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30">
                    💡
                  </div>
                  <h3 className="text-2xl font-bold text-slate-50">
                    ¿Sabías que...?
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent mb-2">
                      20 min
                    </div>
                    <p className="text-slate-300">
                      Tu presión arterial y frecuencia cardíaca vuelven a la
                      normalidad
                    </p>
                  </div>
                  <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent mb-2">
                      48 horas
                    </div>
                    <p className="text-slate-300">
                      Tu sentido del olfato y gusto comienzan a mejorar
                    </p>
                  </div>
                  <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent mb-2">
                      1 año
                    </div>
                    <p className="text-slate-300">
                      Tu riesgo de enfermedad cardíaca se reduce a la mitad
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
