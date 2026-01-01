import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Timer, Trash2, Shield } from "lucide-react";

export default function MensagensTemporariasGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Mensagens Temporárias. Vou explicar o que são e para que servem as mensagens temporárias. O que são? Mensagens temporárias são mensagens que desaparecem sozinhas depois de um tempo. É como se elas se apagassem automaticamente! Para que serve? Serve para conversas que você não precisa guardar para sempre. Por exemplo: combinar onde se encontrar, avisar que está chegando, mandar uma lista de compras. São coisas úteis na hora, mas que não precisam ficar guardadas. Como funciona? Você escolhe quanto tempo as mensagens vão durar antes de sumir. Pode ser 24 horas, 7 dias ou 90 dias. Depois desse tempo, puf! As mensagens somem sozinhas. Como ativar. Passo um: Abra a conversa com a pessoa. Passo dois: Toque nos 3 pontinhos no topo. Passo três: Escolha Mensagens temporárias. Passo quatro: Escolha o tempo: 24 horas, 7 dias ou 90 dias. Passo cinco: Confirme. Pronto! A partir de agora, as mensagens novas vão sumir depois do tempo escolhido. Importante saber. Só as mensagens novas somem. As mensagens antigas que já existiam continuam lá. Se alguém fizer uma captura de tela da mensagem antes dela sumir, a imagem fica salva. Quando desativar as mensagens temporárias, as mensagens voltam a ficar guardadas para sempre. Quando usar mensagens temporárias. Para conversas casuais do dia a dia. Para economizar espaço no celular. Para manter conversas mais limpas e organizadas. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Mensagens Temporárias</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Timer className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* O que são */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">⏱️ O que são?</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Mensagens temporárias são mensagens que <strong>desaparecem sozinhas</strong> depois de um tempo.
            </p>
            <p className="text-gray-700">
              É como se elas se <strong>apagassem automaticamente</strong>!
            </p>
          </div>

          {/* Para que serve */}
          <div className="bg-yellow-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💡 Para que serve?</h2>
            <p className="text-gray-700 mb-4">
              Serve para conversas que você <strong>não precisa guardar para sempre</strong>.
            </p>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">📍 Combinar onde se encontrar</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">🚗 Avisar que está chegando</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">🛒 Mandar uma lista de compras</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">💬 Conversas casuais do dia a dia</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-3">
              São coisas úteis na hora, mas que não precisam ficar guardadas!
            </p>
          </div>

          {/* Como funciona */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">⚙️ Como Funciona:</h3>
            <p className="text-gray-700 mb-4">
              Você escolhe <strong>quanto tempo</strong> as mensagens vão durar antes de sumir:
            </p>
            
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">24h</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">24 horas (1 dia)</p>
                  <p className="text-sm text-gray-700">Para coisas muito rápidas</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">7d</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">7 dias (1 semana)</p>
                  <p className="text-sm text-gray-700">Mais tempo, mas ainda temporário</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 font-bold">90d</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">90 dias (3 meses)</p>
                  <p className="text-sm text-gray-700">Mais tempo antes de sumir</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 p-3 rounded-lg mt-4">
              <p className="text-sm text-gray-800">
                💡 Depois desse tempo, <strong>puf!</strong> As mensagens somem sozinhas.
              </p>
            </div>
          </div>

          {/* Como ativar */}
          <div className="bg-white border-2 border-[#25D366] rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📝 Como Ativar:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xl">1️⃣</span>
                <p className="text-gray-700 pt-0.5">Abra a conversa com a pessoa</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">2️⃣</span>
                <p className="text-gray-700 pt-0.5">Toque nos 3 pontinhos no topo</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">3️⃣</span>
                <p className="text-gray-700 pt-0.5">Escolha "Mensagens temporárias"</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">4️⃣</span>
                <p className="text-gray-700 pt-0.5">Escolha o tempo (24h, 7 dias ou 90 dias)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">5️⃣</span>
                <p className="text-gray-700 pt-0.5">Toque em "Continuar" ou "OK"</p>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg mt-4">
              <p className="text-sm text-gray-800">
                ✅ Pronto! A partir de agora, as mensagens novas vão sumir depois do tempo escolhido.
              </p>
            </div>
          </div>

          {/* Importante saber */}
          <div className="bg-red-50 border-l-4 border-red-400 p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">⚠️ Importante Saber:</h3>
            <div className="space-y-2">
              <p className="text-gray-800">
                📌 <strong>Só as mensagens NOVAS somem.</strong> As mensagens antigas que já existiam continuam lá.
              </p>
              <p className="text-gray-800">
                📸 Se alguém fizer uma <strong>captura de tela</strong> da mensagem antes dela sumir, a imagem fica salva.
              </p>
              <p className="text-gray-800">
                🔄 Quando <strong>desativar</strong> as mensagens temporárias, as mensagens voltam a ficar guardadas para sempre.
              </p>
            </div>
          </div>

          {/* Quando usar */}
          <div className="bg-green-100 border-l-4 border-green-500 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💚 Quando Usar:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Para conversas casuais do dia a dia</li>
              <li>✓ Para economizar espaço no celular</li>
              <li>✓ Para manter conversas mais limpas e organizadas</li>
              <li>✓ Quando não quer acumular mensagens antigas</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}