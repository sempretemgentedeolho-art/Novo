import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Search, Mic } from "lucide-react";

export default function AppGoogle() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o Google. Aqui você pode pesquisar qualquer coisa na internet. Digite sua pergunta ou use o microfone para buscar por voz."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[50px] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-3xl z-10"></div>
          
          <div
            className="relative rounded-[46px] overflow-hidden bg-white"
            style={{ aspectRatio: "9/19.5" }}
          >
            {/* Header */}
            <div className="bg-white p-4 pt-8 border-b">
              <button onClick={() => navigate(createPageUrl("TelaInicial"))}>
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
              {/* Logo Google */}
              <div className="text-center mb-8">
                <h1 className="text-6xl font-bold mb-2">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </h1>
              </div>

              {/* Barra de Pesquisa */}
              <div className="relative mb-6">
                <div className="flex items-center gap-3 p-4 rounded-full border-2 border-gray-300 shadow-lg">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Pesquisar ou digitar URL"
                    className="flex-1 outline-none text-gray-700"
                  />
                  <Mic className="w-5 h-5 text-blue-500" />
                </div>
              </div>

              {/* Atalhos */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { nome: "YouTube", icone: "📺", cor: "bg-red-100" },
                  { nome: "Gmail", icone: "📧", cor: "bg-blue-100" },
                  { nome: "Maps", icone: "🗺️", cor: "bg-green-100" },
                  { nome: "Drive", icone: "📁", cor: "bg-yellow-100" },
                  { nome: "Fotos", icone: "📷", cor: "bg-purple-100" },
                  { nome: "Play", icone: "▶️", cor: "bg-green-100" },
                  { nome: "News", icone: "📰", cor: "bg-blue-100" },
                  { nome: "Tradutor", icone: "🌐", cor: "bg-indigo-100" },
                ].map((app, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`${app.cor} w-14 h-14 rounded-2xl mx-auto mb-2 flex items-center justify-center text-2xl shadow-sm`}>
                      {app.icone}
                    </div>
                    <span className="text-xs text-gray-600">{app.nome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}