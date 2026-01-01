import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Star, ArrowUp } from "lucide-react";

export default function AdicionarFavoritosGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Adicionar aos Favoritos. Esta função é perfeita para você! Serve para deixar as conversas mais importantes sempre fáceis de encontrar. Vou explicar tudo com calma. O que são favoritos? Favoritos são conversas que você marca como especiais. Quando você adiciona uma conversa aos favoritos, ela fica sempre no topo da lista, separada das outras. Assim fica muito mais fácil de encontrar! Para que serve? Imagine que você conversa muito com seus filhos, netos ou pessoas da família. Se você adicionar essas conversas aos favoritos, elas ficam sempre lá em cima, bem visíveis. Você não precisa ficar procurando no meio de todas as outras conversas. Como adicionar aos favoritos. Passo um: Abra a conversa com a pessoa. Passo dois: Toque nos 3 pontinhos no topo. Passo três: Escolha Adicionar aos favoritos. Passo quatro: Pronto! A conversa vai aparecer sempre no topo, com uma estrelinha do lado. Como tirar dos favoritos. Se você quiser tirar alguém dos favoritos, é só fazer o mesmo processo. Abra a conversa, toque nos 3 pontinhos, e escolha Remover dos favoritos. Quantas conversas posso ter como favoritas? Você pode adicionar até 3 conversas como favoritas. Escolha as pessoas mais importantes! Favoritos são ideais para filhos, netos, esposo ou esposa, médico importante, ou qualquer pessoa que você precise encontrar rápido. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.73;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-[#008069] text-white px-4 py-3 flex items-center">
          <button onClick={() => navigate(createPageUrl("WhatsApp"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold ml-4">Adicionar aos Favoritos</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Star className="w-16 h-16 text-white fill-white" />
            </div>
          </div>

          {/* O que é */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">⭐ O que são Favoritos?</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Favoritos são <strong>conversas que você marca como especiais</strong>.
            </p>
            <p className="text-gray-700">
              Quando você adiciona uma conversa aos favoritos, ela fica <strong>sempre no topo da lista</strong>, separada das outras. Assim fica muito mais fácil de encontrar!
            </p>
          </div>

          {/* Para que serve */}
          <div className="bg-yellow-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💡 Para que serve?</h2>
            <p className="text-gray-700 mb-4">
              Imagine que você conversa muito com seus filhos, netos ou pessoas da família.
            </p>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-800 mb-3">
                ✅ <strong>Com favoritos:</strong> Essas conversas ficam sempre lá em cima, bem visíveis
              </p>
              <p className="text-gray-800">
                ❌ <strong>Sem favoritos:</strong> Você precisa procurar no meio de todas as outras conversas
              </p>
            </div>
          </div>

          {/* Como adicionar */}
          <div className="bg-white border-2 border-[#25D366] rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">➕ Como Adicionar aos Favoritos:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Abra a conversa com a pessoa</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <p className="text-gray-700 pt-1">Toque nos <strong>3 pontinhos</strong> no topo</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <p className="text-gray-700 pt-1">Escolha <strong>"Adicionar aos favoritos"</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <p className="text-gray-700 pt-1">Pronto! A conversa vai aparecer sempre no topo, com uma <strong>estrelinha ⭐</strong> do lado</p>
              </div>
            </div>
          </div>

          {/* Exemplo visual */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">👁️ Como fica na lista:</h3>
            
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-600 mb-3 font-medium">📌 FAVORITAS (sempre no topo):</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">👨</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Filho João</p>
                    <p className="text-xs text-gray-600">Oi mãe!</p>
                  </div>
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                </div>
                <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">👩</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Neta Maria</p>
                    <p className="text-xs text-gray-600">Te amo vó!</p>
                  </div>
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-2">Outras conversas:</p>
              <div className="space-y-2 opacity-60">
                <div className="flex items-center gap-3 p-2 bg-white rounded">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">🏢</div>
                  <p className="text-sm text-gray-700">Sebrae Apoia</p>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white rounded">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">👨</div>
                  <p className="text-sm text-gray-700">Pedro Santos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Como tirar */}
          <div className="bg-orange-50 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">➖ Como Tirar dos Favoritos:</h3>
            <p className="text-gray-700 mb-3">
              Se você quiser tirar alguém dos favoritos, é só fazer o mesmo processo:
            </p>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                Abra a conversa → Toque nos 3 pontinhos → Escolha <strong>"Remover dos favoritos"</strong>
              </p>
            </div>
          </div>

          {/* Limite */}
          <div className="bg-red-50 border-l-4 border-red-400 p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">⚠️ Quantas conversas posso ter como favoritas?</h3>
            <p className="text-gray-700 mb-2">
              Você pode adicionar até <strong>3 conversas</strong> como favoritas.
            </p>
            <p className="text-sm text-gray-700">
              Escolha as pessoas mais importantes para você!
            </p>
          </div>

          {/* Quando usar */}
          <div className="bg-green-100 border-l-4 border-green-500 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💚 Ideal para:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Filhos e netos</li>
              <li>✓ Esposo ou esposa</li>
              <li>✓ Médico importante</li>
              <li>✓ Cuidador ou enfermeira</li>
              <li>✓ Pessoa que você precisa encontrar rápido</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}