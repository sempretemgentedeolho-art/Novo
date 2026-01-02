import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Hand, MoveLeft, MoveUp, Square } from "lucide-react";

export default function NavegacaoGestos() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Navegação por gestos. Aqui você aprende a usar o celular deslizando o dedo, ao invés de apertar botões. É mais moderno e rápido."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-[#1976D2] text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("Home"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Navegação por Gestos</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Hand className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">O que são gestos?</h3>
            <p className="text-gray-700 leading-relaxed">
              Gestos são movimentos com o dedo na tela para controlar o celular. Ao invés de apertar botões, você desliza o dedo.
            </p>
          </div>

          {/* Gestos principais */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Gestos principais</h3>
            
            {/* Voltar */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <div className="flex items-center gap-2 mb-2">
                <MoveLeft className="w-5 h-5 text-blue-700" />
                <h4 className="font-semibold text-blue-900">Voltar</h4>
              </div>
              <p className="text-sm text-blue-800 mb-2">
                Deslize o dedo da ESQUERDA para a DIREITA (começando da borda)
              </p>
              <p className="text-xs text-blue-700">
                Funciona igual ao botão ← de voltar
              </p>
            </div>

            {/* Tela inicial */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <div className="flex items-center gap-2 mb-2">
                <MoveUp className="w-5 h-5 text-green-700" />
                <h4 className="font-semibold text-green-900">Ir para tela inicial</h4>
              </div>
              <p className="text-sm text-green-800 mb-2">
                Deslize o dedo de BAIXO para CIMA (começando da barra branca ou borda inferior)
              </p>
              <p className="text-xs text-green-700">
                Funciona igual ao botão ⭕ home
              </p>
            </div>

            {/* Apps recentes */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Square className="w-5 h-5 text-purple-700" />
                <h4 className="font-semibold text-purple-900">Ver apps abertos</h4>
              </div>
              <p className="text-sm text-purple-800 mb-2">
                Deslize de BAIXO para CIMA e SEGURE (ou deslize e pause no meio)
              </p>
              <p className="text-xs text-purple-700">
                Mostra todos os apps que estão abertos. Você pode fechar deslizando para cima.
              </p>
            </div>
          </div>

          {/* Como aprender */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">Como se acostumar</h3>
            <ol className="space-y-2 text-sm text-yellow-800">
              <li>1. <strong>Pratique devagar:</strong> Não precisa fazer rápido</li>
              <li>2. <strong>Comece pelas bordas:</strong> Os gestos funcionam melhor nas bordas da tela</li>
              <li>3. <strong>Use com calma:</strong> Se errar, não tem problema, tente de novo</li>
              <li>4. <strong>Pode voltar aos botões:</strong> Nas Configurações você ativa os botões se preferir</li>
            </ol>
          </div>

          {/* Dicas */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Dicas</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Comece devagar, aos poucos você pega o jeito</li>
              <li>• Deslize começando BEM na borda da tela</li>
              <li>• Não precisa fazer força, só um movimento suave</li>
              <li>• Se não funcionar na primeira, tente de novo</li>
            </ul>
          </div>

          {/* Alternativa */}
          <div className="bg-gray-50 border-l-4 border-gray-400 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Prefere botões?</h3>
            <p className="text-sm text-gray-700 mb-2">
              Você pode voltar a usar os botões tradicionais (⬅️ Voltar, ⭕ Home, ▢ Apps):
            </p>
            <ol className="space-y-1 text-sm text-gray-700 mt-2">
              <li>1. Abra "Configurações"</li>
              <li>2. Vá em "Tela" ou "Display"</li>
              <li>3. Procure "Navegação" ou "Botões"</li>
              <li>4. Escolha "Botões de navegação"</li>
            </ol>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}