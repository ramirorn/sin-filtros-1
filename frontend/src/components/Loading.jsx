export const Loading = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-12">
      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-lg shadow-cyan-500/30"></div>
      <p className="mt-4 text-lg font-semibold text-slate-300">Cargando...</p>
    </div>
  );
};
