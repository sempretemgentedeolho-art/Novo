import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { X } from "lucide-react";

const coresCabelo = [
  "rainbow", "#000000", "#3D2817", "#654321", "#8B4513", "#A0522D",
  "#D2691E", "#DEB887", "#F5DEB3", "#808080"
];

export default function EditarCabelo() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState("cabelo");
  const [corSelecionada, setCorSelecionada] = useState("#654321");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Olá! Esta é a última tela de personalização! No topo, à esquerda tem um X para fechar, e à direita tem um botão azul Concluir. No centro você vê seu avatar pronto! Abaixo tem cinco abas: Estilo, Cabelo, Maquiagem, Rosto e Corpo. Você está na aba Cabelo. Aqui você escolhe a cor e o estilo do cabelo. Tem várias bolinhas de cores: colorido, preto, marrom, loiro e outras. Clique na cor que você gosta. Abaixo tem: Estilo de cabelo, mostrando: Barba e bigode. Você vê quadradinhos vazios com diferentes estilos de cabelo e barba. Clique em cada um para ver como fica! Pode rolar a tela para baixo para ver mais opções. Quando terminar de escolher tudo, clique no botão azul Concluir lá em cima, do lado direito!"
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleConcluir = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Parabéns! Você terminou de criar seu avatar! Agora ele está salvo e pronto para usar. Muito bem! Vamos voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
      
      setTimeout(() => {
        navigate(createPageUrl("TudoProntoAvatar"));
      }, 4500);
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
          <button onClick={() => navigate(createPageUrl("TipoCorpo"))}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={handleConcluir}
            className="px-6 py-2 bg-[#1877F2] text-white rounded-full font-medium"
          >
            Concluir
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Avatar preview */}
          <div className="flex justify-center py-8 bg-gradient-to-b from-purple-100 to-white">
            <div className="text-9xl">👤</div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 px-4">
            {["Estilo", "Cabelo", "Maquiagem", "Rosto", "Corpo"].map((aba) => (
              <button
                key={aba}
                onClick={() => setAbaAtiva(aba.toLowerCase())}
                className={`flex-1 py-3 text-sm ${
                  abaAtiva === aba.toLowerCase()
                    ? "border-b-2 border-gray-900 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {aba}
              </button>
            ))}
          </div>

          <div className="px-6 py-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Estilo de cabelo  •  Barba e bigode
            </h3>

            {/* Cores */}
            <div className="flex gap-3 mb-6 overflow-x-auto">
              {coresCabelo.map((cor, index) => (
                <button
                  key={index}
                  onClick={() => setCorSelecionada(cor)}
                  className={`w-10 h-10 rounded-full flex-shrink-0 transition-all ${
                    corSelecionada === cor ? 'ring-4 ring-blue-500 ring-offset-2' : ''
                  }`}
                  style={{
                    background: cor === "rainbow"
                      ? "linear-gradient(135deg, red, orange, yellow, green, blue, purple)"
                      : cor
                  }}
                />
              ))}
            </div>

            {/* Estilos de cabelo */}
            <div className="grid grid-cols-3 gap-3">
              {Array(9).fill(0).map((_, index) => (
                <button
                  key={index}
                  className="aspect-square rounded-2xl bg-gray-100 border border-gray-200"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}