import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Hand } from "lucide-react";

export default function TempoToque() {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(1); // 0=Curto, 1=Médio, 2=Longo

  const durations = ["Curto (0,5s)", "Médio (1s)", "Longo (1,5s)"];

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Tempo de toque. Esta opção é para quem tem dificuldade para tocar na tela rapidinho. Sabe quando você precisa segurar o dedo na tela um pouquinho mais tempo? Aqui você escolhe quanto tempo precisa segurar. Curto é mais rápido, médio é normal, e longo dá mais tempo para você. Por exemplo: se você escolher longo, quando for apagar uma mensagem, vai precisar segurar o dedo por mais tempo. Isso ajuda a não apagar sem querer! Escolha a opção que fica mais confortável para você. Clique na seta à sua esquerda acima para voltar."
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

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("Acessibilidade"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Tempo de toque</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Info card */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">👆 O que é tempo de toque?</h3>
            <p className="text-sm text-gray-700 mb-3">
              É quanto tempo você precisa segurar o dedo na tela para fazer algumas ações, como apagar mensagens ou abrir menus.
            </p>
            <p className="text-sm text-gray-700">
              <strong>Por que ajustar?</strong> Se você tem dificuldade para tocar rápido ou toca sem querer, aumente o tempo!
            </p>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Hand className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Current selection */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-1">Tempo selecionado:</p>
            <p className="text-3xl font-bold text-gray-900">{durations[duration]}</p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {durations.map((name, index) => (
              <button
                key={index}
                onClick={() => setDuration(index)}
                className={`w-full p-5 rounded-lg border-2 transition-all ${
                  duration === index
                    ? 'border-[#25D366] bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className={`text-lg font-semibold ${
                      duration === index ? 'text-[#25D366]' : 'text-gray-900'
                    }`}>
                      {name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {index === 0 && "Toque rápido - para quem tem facilidade"}
                      {index === 1 && "Tempo normal - padrão do WhatsApp"}
                      {index === 2 && "Mais tempo - melhor para quem tem dificuldade"}
                    </p>
                  </div>
                  {duration === index && (
                    <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Exemplo prático */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Quando você vai usar:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✏️</span>
                <div>
                  <p className="font-medium text-gray-900">Apagar mensagens</p>
                  <p className="text-sm text-gray-700">Segurar em cima da mensagem</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <p className="font-medium text-gray-900">Copiar texto</p>
                  <p className="text-sm text-gray-700">Segurar em cima da palavra</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="font-medium text-gray-900">Fixar conversas</p>
                  <p className="text-sm text-gray-700">Segurar na conversa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dica */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">💚 Recomendação</h3>
            <p className="text-sm text-gray-700">
              Se você às vezes apaga mensagens sem querer ou abre coisas que não quer, escolha "Longo". Isso dá mais tempo para você pensar antes de fazer a ação!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}