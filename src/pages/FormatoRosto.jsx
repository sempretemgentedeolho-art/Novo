import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function FormatoRosto() {
  const navigate = useNavigate();
  const [selectedFormato, setSelectedFormato] = useState(0);
  const [larguraRosto, setLarguraRosto] = useState(50);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Olá! Agora você vai escolher o formato do rosto. No topo, à esquerda, tem uma seta para voltar. No centro você vê seu bonequinho crescendo! Abaixo está escrito: Formato do rosto. Você vê várias cabecinhas cinzas com formatos diferentes. A primeira está selecionada, com um quadrado ao redor. Clique em cada cabecinha para ver os diferentes formatos de rosto: mais redondo, mais quadrado, mais fino ou mais largo. Escolha o que você mais gosta! Abaixo tem: Largura do rosto, com uma barrinha que você pode arrastar para os lados. Arraste para a esquerda para deixar o rosto mais fino, ou para a direita para deixar mais largo. Lá embaixo tem uma barrinha mostrando seu progresso e o botão azul: Avançar. Depois de escolher, clique em Avançar!"
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleAvancar = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Ótimo! Agora vamos escolher o tipo de corpo do seu avatar!"
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
      
      setTimeout(() => {
        navigate(createPageUrl("TipoCorpo"));
      }, 3000);
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("EscolherTomPele"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Avatar preview */}
          <div className="flex justify-center py-8 bg-gradient-to-b from-purple-100 to-white">
            <div className="text-9xl">🧑</div>
          </div>

          <div className="px-6 py-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Formato do rosto</h3>

            {/* Formatos de rosto */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFormato(index)}
                  className={`aspect-square rounded-2xl bg-gray-100 flex items-center justify-center transition-all ${
                    selectedFormato === index ? 'ring-4 ring-blue-500' : ''
                  }`}
                >
                  <div className="w-12 h-16 bg-gray-300 rounded-full"></div>
                </button>
              ))}
              <button className="aspect-square rounded-2xl border-2 border-gray-300 flex items-center justify-center text-gray-400">
                <span className="text-2xl">...</span>
                <div className="absolute bottom-1 text-xs">Ver tudo</div>
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Largura do rosto</h3>

            <input
              type="range"
              min="0"
              max="100"
              value={larguraRosto}
              onChange={(e) => setLarguraRosto(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-8"
            />
          </div>
        </div>

        <div className="px-6 pb-6 border-t border-gray-200 bg-white">
          {/* Progress bar */}
          <div className="flex gap-1 mb-4">
            <div className="flex-1 h-1 bg-gray-900 rounded"></div>
            <div className="flex-1 h-1 bg-gray-300 rounded"></div>
            <div className="flex-1 h-1 bg-gray-300 rounded"></div>
          </div>

          <button
            onClick={handleAvancar}
            className="w-full bg-[#1877F2] text-white py-4 rounded-full font-medium text-lg"
          >
            Avançar
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}