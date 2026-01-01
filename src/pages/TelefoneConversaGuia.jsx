import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Phone } from "lucide-react";

export default function TelefoneConversaGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Botão de Telefone na Conversa. Esse botão serve para você fazer uma ligação de voz pelo WhatsApp! Vou explicar tudo com muito carinho. O que é? É o ícone de telefone que fica lá em cima, no canto direito da tela, quando você abre uma conversa. Para que serve? Serve para você ligar para a pessoa usando a internet. É como uma ligação normal de telefone, mas usando o WhatsApp. A vantagem é que não gasta os minutos do seu plano, só usa a internet. Como usar. Passo um: Abra a conversa com a pessoa que você quer ligar. Passo dois: Olhe lá em cima, no canto direito. Você vai ver o ícone de um telefone. Passo três: Toque no ícone do telefone. Passo quatro: A ligação vai começar! Você vai ouvir o telefone chamar, igual ligação normal. Passo cinco: Quando a pessoa atender, é só conversar normalmente! Importante saber. A ligação pelo WhatsApp usa internet. Se você estiver com WiFi ligado em casa, é de graça! Se estiver usando dados móveis, consome um pouquinho da sua internet, mas bem pouquinho. A qualidade é boa, às vezes até melhor que ligação normal. Você pode desligar a ligação tocando no botão vermelho que aparece na tela. Diferença entre ligação normal e WhatsApp. Ligação normal: usa os minutos do seu plano de telefone. Ligação pelo WhatsApp: usa a internet, não gasta minutos. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Botão de Telefone</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
              <Phone className="w-16 h-16 text-white" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">📞 O que é?</h2>
            <p className="text-gray-700 leading-relaxed">
              É o ícone de telefone que fica <strong>lá em cima, no canto direito</strong> da tela, quando você abre uma conversa.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💚 Para que serve?</h2>
            <p className="text-gray-700 mb-3">
              Serve para você <strong>ligar para a pessoa usando a internet</strong>.
            </p>
            <p className="text-gray-700">
              É como uma ligação normal de telefone, mas usando o WhatsApp. A vantagem é que <strong>não gasta os minutos do seu plano</strong>, só usa a internet!
            </p>
          </div>

          <div className="bg-white border-2 border-[#25D366] rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Como Usar:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Abra a conversa com a pessoa que você quer ligar</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <p className="text-gray-700 pt-1">Olhe lá em cima, no <strong>canto direito</strong>. Você vai ver o ícone de um telefone 📞</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <p className="text-gray-700 pt-1">Toque no ícone do telefone</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <p className="text-gray-700 pt-1">A ligação vai começar! Você vai ouvir o telefone chamar, igual ligação normal</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  5
                </div>
                <p className="text-gray-700 pt-1">Quando a pessoa atender, é só conversar normalmente!</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Importante Saber:</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">
                  🌐 A ligação pelo WhatsApp <strong>usa internet</strong>
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">
                  📶 Se você estiver com <strong>WiFi ligado em casa</strong>, é de graça!
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">
                  📱 Se estiver usando <strong>dados móveis</strong>, consome um pouquinho da sua internet (mas bem pouquinho)
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">
                  🎧 A qualidade é boa, às vezes até melhor que ligação normal
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">
                  🔴 Você pode <strong>desligar</strong> tocando no botão vermelho que aparece na tela
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🔄 Diferença:</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">📞 Ligação Normal:</p>
                <p className="text-sm text-gray-700">Usa os minutos do seu plano de telefone</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg border-2 border-green-400">
                <p className="font-semibold text-gray-900 mb-1">💚 Ligação pelo WhatsApp:</p>
                <p className="text-sm text-gray-700">Usa a internet, não gasta minutos</p>
              </div>
            </div>
          </div>

          <div className="bg-green-100 border-l-4 border-green-500 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">💚 Resumo:</h3>
            <p className="text-gray-700">
              O botão de telefone no WhatsApp é perfeito para <strong>ligar de graça</strong> para seus filhos, netos e amigos que também têm WhatsApp!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}