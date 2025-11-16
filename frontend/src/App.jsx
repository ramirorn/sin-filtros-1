import { useEffect, useState } from "react";
import { AppRouter } from "./router/AppRouter";
import { Loading } from "./components/Loading";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { ChatBot } from "./components/ChatBot";
import API_ENDPOINTS from "./config/api.js";

export const App = () => {
  const [authStatus, setAuthStatus] = useState("checking");
  const [chatBotOpen, setChatBotOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.profile, {
          credentials: "include",
        });

        if (res.ok) {
          setAuthStatus("authenticated");
        } else {
          setAuthStatus("unauthenticated");
        }
      } catch (err) {
        console.log(err);
        setAuthStatus("unauthenticated");
      }
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setAuthStatus("authenticated");
  };

  const handleLogout = () => {
    setAuthStatus("unauthenticated");
  };

  if (authStatus === "checking") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <Loading />;
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar authStatus={authStatus} onLogout={handleLogout} />
      <main className="flex-1">
        <AppRouter
          authStatus={authStatus}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </main>
      <Footer />

      {/* Botón flotante del ChatBot */}
      {authStatus === "authenticated" && (
        <button
          onClick={() => setChatBotOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-40"
          title="Abrir Asistente Virtual"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}

      {/* Modal del ChatBot */}
      <ChatBot isOpen={chatBotOpen} onClose={() => setChatBotOpen(false)} />
    </div>
  );
};
