import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Ear, Volume2, Hand } from "lucide-react";

export default function TalkBack() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "TalkBack. Esta é uma ferramenta muito especial para quem não enxerga bem ou não enxerga nada. O TalkBack fala em voz alta tudo que está na tela do celular! Quando você toca em algum lugar, ele fala o que é. Por exemplo, se você tocar no botão de mensagens, ele fala: botão mensagens. É como se o celular te contasse tudo que está acontecendo. Para ativar o TalkBack, você precisa ir nas Configurações do celular, não aqui no WhatsApp. Vou te ensinar o caminho: Configurações do celular, depois Acessibilidade, e lá você encontra o TalkBack. Esta tela te mostra como funciona e te guia para ativar. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.70;
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">TalkBack</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Info principal */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 mb-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Ear className="w-10 h-10" />
              <h2 className="text-2xl font-bold">O que é TalkBack?</h2>
            </div>
            <p className="text-lg leading-relaxed">
              É como ter alguém lendo a tela do celular para você! O TalkBack fala em voz alta tudo que está na tela - botões, mensagens, nomes, tudo!
            </p>
          </div>

          {/* Para quem é */}
          <div className="bg-yellow-50 rounded-lg p-5 mb-6 border-2 border-yellow-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">👥 Para quem é o TalkBack?</h3>
            <div className="space-y-2">
              <p className="text-gray-700">✓ Pessoas que não enxergam</p>
              <p className="text-gray-700">✓ Pessoas que enxergam muito pouco</p>
              <p className="text-gray-700">✓ Quem tem dificuldade para ler na tela</p>
              <p className="text-gray-700">✓ Quem prefere ouvir ao invés de ler</p>
            </div>
          </div>

          {/* Como funciona */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Como funciona:</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Hand className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">1. Você toca na tela</p>
                  <p className="text-sm text-gray-700">Toca em qualquer lugar com o dedo</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">2. O TalkBack fala</p>
                  <p className="text-sm text-gray-700">Ele diz em voz alta o que você tocou</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👆</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">3. Toque duas vezes para abrir</p>
                  <p className="text-sm text-gray-700">Se quiser abrir algo, toque duas vezes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Exemplo prático */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">💬 Exemplo no WhatsApp:</h3>
            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👆</span>
                <p className="text-gray-900">Você toca em uma conversa</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔊</span>
                <p className="text-gray-700 italic">"Maria Silva. Última mensagem: Oi, como vai? 14:30"</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👆👆</span>
                <p className="text-gray-900">Toca duas vezes</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <p className="text-gray-700">A conversa abre!</p>
              </div>
            </div>
          </div>

          {/* Como ativar */}
          <div className="bg-orange-50 rounded-lg p-5 mb-6 border-2 border-orange-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">⚙️ Como ativar o TalkBack:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xl font-bold text-orange-600">1</span>
                <p className="text-gray-900 pt-0.5">Saia do WhatsApp e vá para a tela inicial do celular</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl font-bold text-orange-600">2</span>
                <p className="text-gray-900 pt-0.5">Procure o ícone de "Configurações" (parece uma engrenagem)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl font-bold text-orange-600">3</span>
                <p className="text-gray-900 pt-0.5">Dentro de Configurações, procure "Acessibilidade"</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl font-bold text-orange-600">4</span>
                <p className="text-gray-900 pt-0.5">Lá você vai encontrar o "TalkBack"</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl font-bold text-orange-600">5</span>
                <p className="text-gray-900 pt-0.5">Toque no botão para ativar</p>
              </div>
            </div>
          </div>

          {/* Atenção */}
          <div className="bg-red-50 rounded-lg p-5 border-2 border-red-200">
            <h3 className="text-xl font-semibold text-red-700 mb-3">⚠️ Muito importante!</h3>
            <p className="text-gray-900 mb-3 font-medium">
              Quando o TalkBack está ativado, o celular funciona diferente:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Um toque só fala o que é</li>
              <li>• Dois toques é que abre</li>
              <li>• Para rolar a tela, use dois dedos</li>
            </ul>
            <p className="text-gray-900 mt-4">
              <strong>Dica:</strong> Peça para alguém te ajudar na primeira vez que for ativar!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}