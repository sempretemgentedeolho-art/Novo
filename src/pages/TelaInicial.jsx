import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronDown } from "lucide-react";
import PainelRapido from "../components/PainelRapido";

export default function TelaInicial() {
  const navigate = useNavigate();
  const [showPainel, setShowPainel] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Aparelho desbloqueado. Escolha o aplicativo que deseja abrir. Deslize do topo para acessar as configurações rápidas."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps = [
    { nome: "Telefone", icone: "📞", tela: "AppTelefone", cor: "from-green-400 to-green-600" },
    { nome: "Mensagens", icone: "💬", tela: "AppMensagens", cor: "from-blue-400 to-blue-600" },
    { nome: "Câmera", icone: "📷", tela: "AppCamera", cor: "from-gray-400 to-gray-600" },
    { nome: "Galeria", icone: "🖼️", tela: "AppGaleria", cor: "from-purple-400 to-purple-600" },
    { nome: "Configurações", icone: "⚙️", tela: "AppConfiguracoes", cor: "from-gray-500 to-gray-700" },
    { nome: "WhatsApp", icone: "💚", tela: "AppWhatsApp", cor: "from-green-500 to-green-700" },
    { nome: "Facebook", icone: "📘", tela: "AppFacebook", cor: "from-blue-500 to-blue-700" },
    { nome: "Instagram", icone: "📸", tela: "AppInstagram", cor: "from-pink-400 via-purple-500 to-orange-500" },
    { nome: "TikTok", icone: "🎵", tela: "AppTikTok", cor: "from-black to-cyan-600" },
    { nome: "Relógio", icone: "⏰", tela: "AppRelogio", cor: "from-indigo-400 to-indigo-600" },
    { nome: "Calculadora", icone: "🧮", tela: "AppCalculadora", cor: "from-orange-400 to-orange-600" },
    { nome: "Dicas", icone: "💡", tela: "AppDicas", cor: "from-yellow-400 to-yellow-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1c3d] via-[#102650] to-[#0b1c3d] flex flex-col items-center justify-start text-white relative">
      {/* Barra de status */}
      <div className="w-full flex justify-between items-center text-sm px-6 pt-6 opacity-80 relative z-10">
        <span className="font-medium">
          {currentTime.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <div className="flex gap-3 items-center">
          <span>📶</span>
          <span>📡</span>
          <span>🔋 98%</span>
        </div>
      </div>

      {/* Indicador de deslizar */}
      <button
        onClick={() => setShowPainel(true)}
        className="mt-2 mb-4 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
        <span className="text-xs">Deslize para baixo</span>
      </button>

      {/* Data */}
      <div className="text-center mb-6 opacity-90">
        <p className="text-lg capitalize">
          {currentTime.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      {/* Grid de apps */}
      <div className="grid grid-cols-3 gap-4 px-6 pb-24">
        {apps.map((app) => (
          <button
            key={app.nome}
            onClick={() => navigate(createPageUrl(app.tela))}
            className="group"
          >
            <div
              className={`w-full aspect-square rounded-[2rem] bg-gradient-to-br ${app.cor} flex items-center justify-center shadow-lg hover:shadow-2xl transition-all hover:scale-105 active:scale-95`}
            >
              <div className="text-5xl">{app.icone}</div>
            </div>
            <span className="text-sm font-medium mt-2 block text-center group-hover:scale-105 transition-transform">
              {app.nome}
            </span>
          </button>
        ))}
      </div>

      {/* Barra de navegação inferior */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-6 text-white/70">
        <button className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors">
          ◀
        </button>
        <button className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors">
          ⚪
        </button>
        <button className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors">
          ▶
        </button>
      </div>

      {/* Painel de Configurações Rápidas */}
      <PainelRapido isOpen={showPainel} onClose={() => setShowPainel(false)} />
    </div>
  );
}