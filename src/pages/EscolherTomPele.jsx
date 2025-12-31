import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

const tonsPele = [
  "#3D2817", "#4A3222", "#5C3D2E", "#6F4E37", "#8B5A3C", "#A0694B",
  "#6F4E37", "#8B6F47", "#A67C52", "#C19A6B", "#D4A574", "#E8B887",
  "#C68642", "#D4A574", "#E8C4A0", "#F5D5B3", "#FFE4C4", "#FFF0DC",
  "#708090", "#98D8C8", "#87CEEB", "#4682B4", "#9370DB", "#CD5C5C"
];

export default function EscolherTomPele() {
  const navigate = useNavigate();
  const [selectedTom, setSelectedTom] = useState(tonsPele[14]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Olá! Agora você vai escolher a cor da pele do seu avatar. No topo, à esquerda, tem uma seta para voltar. No centro você vê o bonequinho que está sendo criado. Abaixo está escrito: Tom de pele. Você vê várias bolinhas coloridas. São tons de pele diferentes, do mais escuro ao mais claro, e até cores divertidas como cinza, verde, azul, roxo e rosa! Clique na bolinha da cor que você mais gosta. Quando você clicar, vai ver um círculo ao redor dela mostrando que foi escolhida. Lá embaixo tem um botão azul grande escrito: Avançar. Depois de escolher a cor, clique em Avançar para continuar. Vou repetir: Escolha uma bolinha de cor que você gostar e depois clique em Avançar!"
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
        "Muito bem! Você escolheu a cor. Agora vamos escolher o formato do rosto do seu avatar!"
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
      
      setTimeout(() => {
        navigate(createPageUrl("FormatoRosto"));
      }, 3500);
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("MostreVibeAvatares"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">
            Comece escolhendo um tom de pele
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Avatar preview */}
          <div className="flex justify-center py-8 bg-gradient-to-b from-purple-100 to-white">
            <div className="text-8xl">🧑</div>
          </div>

          <div className="px-6 py-6">
            <p className="text-sm text-gray-700 mb-6">
              Comece com alguns detalhes básicos. Depois, você terá acesso a todas as opções de edição.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tom de pele</h3>

            {/* Cores em grid */}
            <div className="grid grid-cols-6 gap-3 mb-8">
              {tonsPele.map((cor, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTom(cor)}
                  className={`w-12 h-12 rounded-full transition-all ${
                    selectedTom === cor ? 'ring-4 ring-blue-500 ring-offset-2' : ''
                  }`}
                  style={{ backgroundColor: cor }}
                />
              ))}
            </div>

            <p className="text-xs text-gray-500 mb-8">
              Os avatares são públicos. Seus amigos podem compartilhá-los ou interagir com eles. Para alterar isso, acesse as configurações.{" "}
              <span className="text-[#1877F2]">Saiba mais</span>
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 border-t border-gray-200 bg-white">
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