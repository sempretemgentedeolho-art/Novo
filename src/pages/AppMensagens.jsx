import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Search, MessageSquarePlus } from "lucide-react";

export default function AppMensagens() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(
      "Este é o aplicativo de Mensagens. Aqui você envia e recebe SMS. Toque na seta para voltar."
    );
    utter.lang = "pt-BR";
    utter.rate = 0.95;
    synth.speak(utter);
    return () => synth.cancel();
  }, []);

  const conversas = [
    { nome: "Maria Silva", mensagem: "Oi! Como você está?", hora: "10:30" },
    { nome: "João Santos", mensagem: "Vamos nos encontrar hoje?", hora: "09:15" },
    { nome: "Ana Costa", mensagem: "Obrigada pela ajuda!", hora: "Ontem" },
  ];

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
            <div className="bg-blue-500 text-white p-4 pt-8">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => navigate(createPageUrl("TelaInicial"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold flex-1 ml-4">Mensagens</h1>
                <MessageSquarePlus className="w-6 h-6" />
              </div>
              
              <div className="bg-white/20 rounded-full px-4 py-2 flex items-center gap-2">
                <Search className="w-5 h-5" />
                <input
                  type="text"
                  placeholder="Pesquisar conversas"
                  className="bg-transparent placeholder:text-white/70 outline-none flex-1 text-white"
                />
              </div>
            </div>

            {/* Lista de Conversas */}
            <div className="overflow-y-auto" style={{ height: "calc(100% - 140px)" }}>
              {conversas.map((conversa, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                    {conversa.nome[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{conversa.nome}</h3>
                      <span className="text-xs text-gray-500">{conversa.hora}</span>
                    </div>
                    <p className="text-sm text-gray-600">{conversa.mensagem}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}