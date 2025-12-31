import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function ContrasteElevado() {
  const navigate = useNavigate();
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Contraste elevado. Esta opção deixa as cores mais fortes e vibrantes, facilitando muito para enxergar melhor. É perfeito se você tem dificuldade para distinguir as cores ou se as letras parecem meio apagadas. Para ativar, é só tocar no botão que está na tela. Quando você ativar, vai ver um exemplo de como fica: as cores ficam mais vivas e as letras mais destacadas. Se gostar, deixe ativado. Se não gostar, é só tocar de novo para desativar. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Contraste elevado</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Info card */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">🎨 O que é contraste elevado?</h3>
            <p className="text-sm text-gray-700 mb-3">
              Deixa as cores mais fortes e vibrantes, facilitando muito para enxergar. As letras ficam mais escuras e os fundos mais claros.
            </p>
            <p className="text-sm text-gray-700">
              <strong>Quando usar:</strong> Se você tem dificuldade para ler as mensagens ou se tudo parece meio apagado na tela.
            </p>
          </div>

          {/* Toggle */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {highContrast ? "✅ Ativado" : "Desativado"}
                </h3>
                <p className="text-sm text-gray-600">
                  {highContrast 
                    ? "O contraste elevado está ativo. As cores estão mais vibrantes!"
                    : "Toque no botão para ativar e ver a diferença"}
                </p>
              </div>
              <div className="relative inline-block w-16 h-9 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-16 h-9 rounded-full ${highContrast ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all ${highContrast ? 'after:translate-x-7' : ''}`}></div>
              </div>
            </div>
          </div>

          {/* Preview comparison */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">👁️ Veja a diferença:</h3>

            {/* Sem contraste elevado */}
            <div className={`rounded-lg p-4 ${highContrast ? 'opacity-50' : 'border-2 border-[#25D366]'}`}>
              <p className="text-xs text-gray-500 mb-3">Sem contraste elevado</p>
              <div className="bg-gray-100 rounded-lg p-3 mb-2">
                <p className="text-gray-600 text-sm">Maria Silva</p>
                <p className="text-gray-700">Oi, como vai?</p>
              </div>
              <div className="bg-green-100 rounded-lg p-3 ml-8">
                <p className="text-gray-700">Tudo bem!</p>
              </div>
            </div>

            {/* Com contraste elevado */}
            <div className={`rounded-lg p-4 ${!highContrast ? 'opacity-50' : 'border-2 border-[#25D366]'}`}>
              <p className="text-xs text-gray-500 mb-3">Com contraste elevado</p>
              <div className="bg-white border-2 border-gray-800 rounded-lg p-3 mb-2">
                <p className="text-gray-900 font-semibold text-sm">Maria Silva</p>
                <p className="text-black font-medium">Oi, como vai?</p>
              </div>
              <div className="bg-[#25D366] rounded-lg p-3 ml-8">
                <p className="text-black font-medium">Tudo bem!</p>
              </div>
            </div>
          </div>

          {/* Dica */}
          <div className="bg-green-50 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">💚 Dica importante</h3>
            <p className="text-sm text-gray-700">
              Ative e use o WhatsApp normalmente. Se sentir que está mais fácil de ler, deixe ativado! Cada pessoa é diferente, escolha o que fica melhor para você.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}