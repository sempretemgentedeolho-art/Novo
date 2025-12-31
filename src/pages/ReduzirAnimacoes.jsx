import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function ReduzirAnimacoes() {
  const navigate = useNavigate();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Reduzir animações. Sabe quando as coisas na tela ficam mexendo rápido, entrando e saindo? Isso são as animações. Para algumas pessoas, esses movimentos podem incomodar, deixar tonto ou confundir. Com esta opção ativada, tudo fica mais calmo e tranquilo. As telas aparecem de forma mais suave, sem pular ou mexer demais. Para ativar, é só tocar no botão. Experimente usar o WhatsApp com a opção ativada e veja se fica mais confortável para você. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Reduzir animações</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Info card */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">✨ O que são animações?</h3>
            <p className="text-sm text-gray-700 mb-3">
              São os movimentos que acontecem na tela: coisas que entram pulando, que giram, que aparecem de repente...
            </p>
            <p className="text-sm text-gray-700">
              <strong>Por que reduzir?</strong> Esses movimentos podem deixar algumas pessoas tontas, confusas ou incomodadas. Com essa opção ativada, tudo fica mais calmo.
            </p>
          </div>

          {/* Toggle */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {reduced ? "✅ Ativado" : "Desativado"}
                </h3>
                <p className="text-sm text-gray-600">
                  {reduced 
                    ? "As animações estão reduzidas. Tudo mais calmo!"
                    : "Toque no botão para deixar tudo mais tranquilo"}
                </p>
              </div>
              <div className="relative inline-block w-16 h-9 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={reduced}
                  onChange={(e) => setReduced(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-16 h-9 rounded-full ${reduced ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all ${reduced ? 'after:translate-x-7' : ''}`}></div>
              </div>
            </div>
          </div>

          {/* Explicação visual */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 O que muda quando você ativa:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-medium text-gray-900">Telas aparecem mais suave</p>
                  <p className="text-sm text-gray-700">Sem pulos ou movimentos bruscos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="font-medium text-gray-900">Mensagens aparecem direto</p>
                  <p className="text-sm text-gray-700">Sem efeitos de entrada</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <p className="font-medium text-gray-900">Transições mais simples</p>
                  <p className="text-sm text-gray-700">Mudanças de tela mais diretas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quando usar */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">👍 Quando usar esta opção:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Se os movimentos te deixam tonto</li>
              <li>✓ Se você se perde com muita coisa mexendo na tela</li>
              <li>✓ Se você prefere tudo mais simples e direto</li>
              <li>✓ Se você quer que o celular responda mais rápido</li>
            </ul>
          </div>

          {/* Dica */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">💚 Dica</h3>
            <p className="text-sm text-gray-700">
              Experimente ativar e use o WhatsApp por alguns minutos. Se sentir que ficou mais fácil e confortável, deixe ativado!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}