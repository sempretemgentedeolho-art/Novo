import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function TipoCorpo() {
  const navigate = useNavigate();
  const [tipoCorpo, setTipoCorpo] = useState("masculino");
  const [selectedCorpo, setSelectedCorpo] = useState(1);
  const [estrutura, setEstrutura] = useState(50);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Olá! Agora vamos escolher o corpo do avatar. No topo tem uma seta para voltar. Você vê o bonequinho de corpo inteiro agora! Está escrito: Tipo de corpo. No topo tem três opções: Todos, Masculino e Feminino. Clique na opção que você preferir. Abaixo você vê quatro corpos diferentes, todos cinzas. O segundo está selecionado com um quadrado ao redor. Clique em cada um para ver os tipos de corpo: mais magro, mais forte, mais arredondado. Escolha o que você mais gosta! Depois tem: Estrutura, com uma barrinha para arrastar e deixar o corpo mais fino ou mais forte. E também: Músculos, com outra barrinha. Lá embaixo tem o botão azul: Continuar. Quando terminar de escolher, clique em Continuar!"
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleContinuar = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Perfeito! Agora vamos personalizar o cabelo e outros detalhes do seu avatar!"
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
      
      setTimeout(() => {
        navigate(createPageUrl("EditarCabelo"));
      }, 3500);
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("FormatoRosto"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Avatar preview corpo inteiro */}
          <div className="flex justify-center py-8 bg-gradient-to-b from-purple-100 to-white">
            <div className="text-9xl">🧍</div>
          </div>

          <div className="px-6 py-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipo de corpo</h3>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-200">
              <button
                onClick={() => setTipoCorpo("todos")}
                className={`pb-2 px-2 ${tipoCorpo === "todos" ? "border-b-2 border-gray-900 font-semibold" : "text-gray-500"}`}
              >
                Todos
              </button>
              <button
                onClick={() => setTipoCorpo("masculino")}
                className={`pb-2 px-2 ${tipoCorpo === "masculino" ? "border-b-2 border-gray-900 font-semibold" : "text-gray-500"}`}
              >
                Masculino
              </button>
              <button
                onClick={() => setTipoCorpo("feminino")}
                className={`pb-2 px-2 ${tipoCorpo === "feminino" ? "border-b-2 border-gray-900 font-semibold" : "text-gray-500"}`}
              >
                Feminino
              </button>
            </div>

            {/* Tipos de corpo */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCorpo(index)}
                  className={`aspect-[3/4] rounded-2xl bg-gray-100 flex items-center justify-center transition-all ${
                    selectedCorpo === index ? 'ring-4 ring-blue-500' : ''
                  }`}
                >
                  <div className="text-4xl">🧍</div>
                </button>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estrutura</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={estrutura}
              onChange={(e) => setEstrutura(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-6"
            />

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Músculos</h3>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-8"
            />
          </div>
        </div>

        <div className="px-6 pb-6 border-t border-gray-200 bg-white">
          {/* Progress bar */}
          <div className="flex gap-1 mb-4">
            <div className="flex-1 h-1 bg-gray-900 rounded"></div>
            <div className="flex-1 h-1 bg-gray-900 rounded"></div>
            <div className="flex-1 h-1 bg-gray-300 rounded"></div>
          </div>

          <button
            onClick={handleContinuar}
            className="w-full bg-[#1877F2] text-white py-4 rounded-full font-medium text-lg"
          >
            Continuar
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}