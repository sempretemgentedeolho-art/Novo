import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function TamanhoTexto() {
  const navigate = useNavigate();
  const [size, setSize] = useState(3); // 0=Pequeno, 1=Menor, 2=Médio, 3=Grande, 4=Muito Grande

  const sizes = ["Pequeno", "Menor", "Médio", "Grande", "Muito Grande"];
  const textSizes = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"];

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Tamanho do texto. Aqui você aumenta ou diminui o tamanho das letras no WhatsApp. É muito simples! Você vê uma barra com bolinhas embaixo. Arraste a bolinha para a direita para aumentar as letras, ou para a esquerda para diminuir. Acima da barra tem um exemplo de conversa, assim você já vê como vai ficar antes de salvar. Quando encontrar o tamanho que fica bom para você, é só clicar em OK no canto superior direito. Se quiser voltar sem mudar nada, clique na seta à sua esquerda acima."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(createPageUrl("Acessibilidade"))}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Tamanho do texto</h1>
          </div>
          <button className="text-[#25D366] font-medium">OK</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Info card */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">📖 Como funciona</h3>
            <p className="text-sm text-gray-700">
              Arraste a bolinha na barra para aumentar ou diminuir as letras. O exemplo acima mostra como vai ficar!
            </p>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <h3 className="text-sm text-gray-500 mb-4">👁️ Prévia das mensagens</h3>
            
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className={`${textSizes[size]} text-gray-900 font-medium mb-1`}>Maria Silva</p>
                <p className={`${textSizes[size]} text-gray-700`}>
                  Oi! Como você está?
                </p>
                <p className={`text-xs text-gray-500 mt-1`}>10:30</p>
              </div>

              <div className="bg-[#dcf8c6] rounded-lg p-3 shadow-sm ml-8">
                <p className={`${textSizes[size]} text-gray-900`}>
                  Estou bem! E você?
                </p>
                <p className={`text-xs text-gray-600 mt-1 text-right`}>10:32 ✓✓</p>
              </div>
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Pequeno</span>
              <span className="text-lg font-semibold text-[#25D366]">{sizes[size]}</span>
              <span className="text-sm text-gray-600">Muito Grande</span>
            </div>

            <input
              type="range"
              min="0"
              max="4"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#25D366]"
            />

            <div className="flex justify-between mt-1">
              {sizes.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === size ? 'bg-[#25D366]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Dica */}
          <div className="bg-green-50 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">💚 Dica</h3>
            <p className="text-sm text-gray-700">
              Escolha um tamanho que você consiga ler sem esforço. Não tenha vergonha de aumentar bastante se precisar!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}