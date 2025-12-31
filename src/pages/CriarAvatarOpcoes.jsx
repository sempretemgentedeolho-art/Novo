import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { X } from "lucide-react";

export default function CriarAvatarOpcoes() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Olá! Agora você vai escolher como criar seu avatar. No topo você vê um bonequinho fazendo uma selfie. Abaixo tem três bolinhas, mostrando que tem mais telas para ver. Está escrito: Crie seu próprio avatar. E explica: Tire uma selfie para criar um ponto de partida e depois personalize e edite seu avatar com o estilo que quiser. Tem dois botões grandes: O botão azul diz: Criar com uma selfie. Este é mais fácil! O celular tira uma foto sua e já cria um bonequinho parecido com você. Abaixo tem: Criar manualmente, se você quiser escolher tudo sozinho. Lá embaixo tem uma frase pequena sobre os Termos de Serviço. Vou repetir: Clique em Criar com uma selfie para o jeito mais fácil, ou Criar manualmente para escolher tudo você mesmo."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleSelfie = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Ótimo! Você escolheu criar com selfie. Agora vamos ver informações importantes da Meta sobre avatares."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
      
      setTimeout(() => {
        navigate(createPageUrl("MostreVibeAvatares"));
      }, 4000);
    }
  };

  const handleManual = () => {
    navigate(createPageUrl("EscolherTomPele"));
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-b from-purple-200 to-purple-100 flex flex-col">
        <StatusBar variant="light" />

        <div className="p-4">
          <button onClick={() => navigate(createPageUrl("AvatarInicial"))}>
            <X className="w-8 h-8 text-gray-800" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          {/* Avatar illustration */}
          <div className="mb-6 text-8xl">
            🤳
          </div>

          {/* Indicadores de página */}
          <div className="flex gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-3">
            Crie seu próprio avatar
          </h2>

          <p className="text-gray-700 text-center text-sm px-6 mb-12">
            Tire uma selfie para criar um ponto de partida e depois personalize e edite seu avatar com o estilo que quiser.
          </p>
        </div>

        <div className="px-6 pb-6 space-y-3">
          <button
            onClick={handleSelfie}
            className="w-full bg-[#1877F2] text-white py-4 rounded-full font-medium text-lg"
          >
            Criar com uma selfie
          </button>

          <button
            onClick={handleManual}
            className="w-full text-gray-900 py-4 font-medium text-lg"
          >
            Criar manualmente
          </button>

          <p className="text-xs text-gray-600 text-center pt-2">
            Os avatares estão sujeitos aos nossos <span className="text-[#1877F2]">Termos de Serviço</span>.
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}