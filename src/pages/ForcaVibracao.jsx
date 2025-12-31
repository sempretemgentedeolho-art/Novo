import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Smartphone } from "lucide-react";

export default function ForcaVibracao() {
  const navigate = useNavigate();
  const [strength, setStrength] = useState(2); // 0=Desligado, 1=Fraco, 2=Médio, 3=Forte

  const strengths = ["Desligado", "Fraco", "Médio", "Forte"];

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Força da vibração. Quando chega uma mensagem no WhatsApp, o celular vibra para te avisar. Aqui você escolhe se quer que essa vibração seja fraquinha, média ou forte. Tem até a opção de desligar a vibração se você não gostar. Para ajustar, é muito simples: toque nas opções que aparecem na tela - Desligado, Fraco, Médio ou Forte. Quando você tocar, o celular vai vibrar para você sentir como fica. Assim você escolhe a intensidade que mais gosta. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleVibrate = (level) => {
    setStrength(level);
    if (level === 0) return; // Não vibra se desligado
    
    // Padrões de vibração
    const patterns = [
      [],
      [100], // Fraco
      [200], // Médio
      [300], // Forte
    ];
    
    if (navigator.vibrate) {
      navigator.vibrate(patterns[level]);
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("Acessibilidade"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Força da vibração</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Info card */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">📳 Como funciona</h3>
            <p className="text-sm text-gray-700">
              Toque em cada opção para sentir a vibração. Escolha a intensidade que você mais gosta ou desligue se preferir!
            </p>
          </div>

          {/* Vibration icon */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Smartphone className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Current selection */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-1">Intensidade selecionada:</p>
            <p className="text-3xl font-bold text-gray-900">{strengths[strength]}</p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {strengths.map((name, index) => (
              <button
                key={index}
                onClick={() => handleVibrate(index)}
                className={`w-full p-5 rounded-lg border-2 transition-all ${
                  strength === index
                    ? 'border-[#25D366] bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className={`text-lg font-semibold ${
                      strength === index ? 'text-[#25D366]' : 'text-gray-900'
                    }`}>
                      {name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {index === 0 && "Sem vibração"}
                      {index === 1 && "Vibração suave"}
                      {index === 2 && "Vibração normal"}
                      {index === 3 && "Vibração intensa"}
                    </p>
                  </div>
                  {strength === index && (
                    <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Dicas */}
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">💡 Dica</h3>
              <p className="text-sm text-gray-700">
                A vibração ajuda você a perceber quando chega mensagem, mesmo com o celular no bolso ou na bolsa!
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">💚 Para economizar bateria</h3>
              <p className="text-sm text-gray-700">
                Se você quer economizar bateria, escolha "Fraco" ou "Desligado". A vibração gasta energia do celular.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}