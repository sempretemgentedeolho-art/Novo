import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function AvatarInicial() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Olá! Agora você está na tela de Avatar. No topo, à esquerda, tem uma seta para voltar. No centro você vê três bonequinhos, que são exemplos de avatares. Abaixo está escrito: Diga mais com os avatares agora disponíveis no WhatsApp. No meio da tela tem um botão verde grande escrito: Criar avatar. É nele que você deve clicar para começar a criar seu bonequinho! Abaixo tem um link azul: Saiba mais, se você quiser mais informações. Vou repetir o mais importante: Clique no botão verde Criar avatar para começar!"
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleCriarAvatar = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Muito bem! Agora você vai ver opções de como criar seu avatar. Aguarde um momento."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
      
      setTimeout(() => {
        navigate(createPageUrl("CriarAvatarOpcoes"));
      }, 4000);
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("TudoProntoAvatar"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Avatar</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Ilustração de avatares */}
          <div className="mb-8 flex gap-4">
            <div className="text-6xl">🧑</div>
            <div className="text-6xl">👩</div>
            <div className="text-6xl">🧑‍🦱</div>
          </div>

          <p className="text-center text-gray-700 text-sm mb-12 px-4">
            Diga mais com os avatares agora disponíveis no WhatsApp
          </p>

          <button
            onClick={handleCriarAvatar}
            className="w-full max-w-sm bg-[#25D366] text-white py-3.5 rounded-full font-medium text-lg mb-6"
          >
            Criar avatar
          </button>

          <button className="text-[#00a884] font-medium">
            Saiba mais
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}