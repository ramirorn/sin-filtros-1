export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-slate-900 to-slate-800 text-white mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-6 sm:mb-8">
          {/* Información del Proyecto */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Sin Filtros
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Plataforma de apoyo para jóvenes que desean dejar de fumar.
              Comunidad, recursos y herramientas para tu camino hacia una vida
              libre de tabaco.
            </p>
          </div>

          {/* Equipo de Desarrollo */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Equipo de Desarrollo
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center justify-center gap-2">
                <span className="text-cyan-400">▹</span>
                Pereyra Roman, Ramiro Nicolás
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-cyan-400">▹</span>
                Gomez Gaona, Axel Rodrigo
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-cyan-400">▹</span>
                Miño Presentado, Santiago
              </li>
            </ul>
          </div>

          {/* Información Adicional */}
          <div className="text-left">
            <h3 className="text-xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Contacto
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <a
                href="mailto:sinfiltrosapi@gmail.com"
                className="flex items-center gap-2 hover:text-cyan-400 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                sinfiltrosapi@gmail.com
              </a>
              <p className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Soporte 24/7
              </p>
              <p className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Práctica Profesional
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              &copy; {currentYear} Sin Filtros. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-cyan-400 transition">
                Términos de Servicio
              </a>
              <a href="#" className="hover:text-cyan-400 transition">
                Privacidad
              </a>
              <a href="#" className="hover:text-cyan-400 transition">
                Ayuda
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
