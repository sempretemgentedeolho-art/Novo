import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, MapPin } from "lucide-react";

export default function LocalizacaoTempoReal() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Localização em tempo real. Aqui você pode ver se está compartilhando sua localização em tempo real com alguém. Localização em tempo real mostra onde você está no momento, no mapa, para as pessoas escolhidas. No momento, você não está compartilhando sua localização em tempo real em nenhuma conversa. Para ativar essa opção, você precisa mudar as configurações do seu celular. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("Privacidade"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Localização em tempo real</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="relative mb-6">
            <MapPin className="w-24 h-24 text-[#25D366]" />
            <div className="absolute -top-2 -left-2">
              <div className="w-8 h-8 bg-[#25D366] rounded-full opacity-20 animate-ping"></div>
            </div>
            <div className="absolute -top-1 -right-2">
              <div className="w-6 h-6 bg-[#25D366] rounded-full opacity-30 animate-ping" style={{animationDelay: '0.3s'}}></div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
            Você não está compartilhando sua localização em tempo real em nenhuma conversa
          </h3>

          <p className="text-sm text-gray-600 text-center">
            A localização em tempo real requer dados em segundo plano. Você pode alterar essa opção nas configurações do seu dispositivo.
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}