import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Search, Camera, MoreVertical } from "lucide-react";

export default function AppWhatsApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(
      "Este é o WhatsApp. Aqui você vê suas conversas. Toque na seta no canto superior esquerdo para voltar."
    );
    utter.lang = "pt-BR";
    utter.rate = 0.95;
    synth.speak(utter);
    return () => synth.cancel();
  }, []);

  const conversas = [
    { nome: "Maria", mensagem: "Oi! Tudo bem?", hora: "14:30", novas: 2 },
    { nome: "João", mensagem: "Vamos almoçar hoje?", hora: "13:15", novas: 0 },
    { nome: "Ana", mensagem: "Obrigada!", hora: "Ontem", novas: 0 },
    { nome: "Pedro", mensagem: "👍", hora: "Ontem", novas: 1 },
  ];

  return (
    <div className="h-[100dvh] bg-white overflow-hidden flex flex-col">
            {/* Header WhatsApp */}
            <div className="bg-[#008069] text-white p-4 pt-8">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => navigate(createPageUrl("TelaInicial"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-4">
                  <Camera className="w-6 h-6" />
                  <Search className="w-6 h-6" />
                  <MoreVertical className="w-6 h-6" />
                </div>
              </div>
              <h1 className="text-2xl font-bold">WhatsApp</h1>
            </div>

            {/* Lista de Conversas */}
            <div className="overflow-y-auto" style={{ height: "calc(100% - 120px)" }}>
              {conversas.map((conv, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 border-b border-gray-200 active:bg-gray-100">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl">
                    {conv.nome[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{conv.nome}</h3>
                      <span className="text-xs text-gray-500">{conv.hora}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conv.mensagem}</p>
                  </div>
                  {conv.novas > 0 && (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                      {conv.novas}
                    </div>
                  )}
                </div>
              ))}
            </div>
    </div>
  );
}