import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Smile } from "lucide-react";

export default function EmojiGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Botão de Emoji. Os emojis são aquelas carinhas e desenhinhos fofos que você vê nas mensagens! Vou explicar tudo com carinho. O que são emojis? Emojis são desenhinhos pequenos que expressam sentimentos e coisas. Têm carinhas felizes, tristes, corações, mãozinhas, flores, e muitos outros. Servem para deixar as mensagens mais carinhosas e divertidas! Onde fica o botão? Quando você está escrevendo uma mensagem, olhe lá embaixo. Do lado esquerdo da caixinha onde você escreve, tem uma carinha sorrindo. Essa é a carinha dos emojis! Como usar. Passo um: Abra uma conversa. Passo dois: Toque na caixinha onde você escreve mensagens, lá embaixo. Passo três: Olhe do lado esquerdo. Toque na carinha sorrindo. Passo quatro: Vai abrir um monte de emojis! Role para o lado ou para baixo para ver mais. Passo cinco: Toque no emoji que você quer. Ele vai aparecer na mensagem. Passo seis: Pode escolher vários emojis! É só tocar em cada um. Passo sete: Quando terminar, toque no botão de enviar. Emojis mais usados por pessoas mais velhas. Carinha feliz, sorrindo. Carinha com coração nos olhos, para demonstrar amor. Coração vermelho, para mandar carinho. Mãozinha acenando, para cumprimentar. Florzinha, para deixar bonito. Palminhas, para parabenizar. Sol, para desejar um dia lindo. Lua, para desejar boa noite. Dica especial. Não precisa ter medo de usar emojis! Eles deixam a mensagem mais carinhosa. Seus filhos e netos vão adorar receber mensagens com emojis de você. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Botão de Emoji</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Smile className="w-16 h-16 text-white" />
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">😊 O que são Emojis?</h2>
            <p className="text-gray-700 mb-3">
              Emojis são <strong>desenhinhos pequenos</strong> que expressam sentimentos e coisas.
            </p>
            <p className="text-gray-700">
              Têm carinhas felizes 😊, tristes 😢, corações ❤️, mãozinhas 👋, flores 🌸, e muitos outros. Servem para deixar as mensagens mais <strong>carinhosas e divertidas</strong>!
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">📍 Onde Fica o Botão?</h2>
            <p className="text-gray-700">
              Quando você está escrevendo uma mensagem, olhe lá embaixo. Do <strong>lado esquerdo da caixinha</strong> onde você escreve, tem uma <strong>carinha sorrindo 😊</strong>. Essa é a carinha dos emojis!
            </p>
          </div>

          <div className="bg-white border-2 border-yellow-400 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Como Usar:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Abra uma conversa</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <p className="text-gray-700 pt-1">Toque na caixinha onde você escreve mensagens, lá embaixo</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <p className="text-gray-700 pt-1">Olhe do lado esquerdo. Toque na <strong>carinha sorrindo 😊</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <p className="text-gray-700 pt-1">Vai abrir um monte de emojis! Role para o lado ou para baixo para ver mais</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  5
                </div>
                <p className="text-gray-700 pt-1">Toque no emoji que você quer. Ele vai aparecer na mensagem</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  6
                </div>
                <p className="text-gray-700 pt-1">Pode escolher vários emojis! É só tocar em cada um</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  7
                </div>
                <p className="text-gray-700 pt-1">Quando terminar, toque no botão de enviar</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">❤️ Emojis Mais Usados:</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-3xl mb-1">😊</p>
                <p className="text-sm text-gray-800 font-medium">Carinha feliz</p>
                <p className="text-xs text-gray-600">Para sorrir</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-3xl mb-1">😍</p>
                <p className="text-sm text-gray-800 font-medium">Com coração</p>
                <p className="text-xs text-gray-600">Para amor</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-3xl mb-1">❤️</p>
                <p className="text-sm text-gray-800 font-medium">Coração</p>
                <p className="text-xs text-gray-600">Para carinho</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-3xl mb-1">👋</p>
                <p className="text-sm text-gray-800 font-medium">Mãozinha</p>
                <p className="text-xs text-gray-600">Para cumprimentar</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-3xl mb-1">🌸</p>
                <p className="text-sm text-gray-800 font-medium">Florzinha</p>
                <p className="text-xs text-gray-600">Para enfeitar</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-3xl mb-1">👏</p>
                <p className="text-sm text-gray-800 font-medium">Palminhas</p>
                <p className="text-xs text-gray-600">Para parabenizar</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-3xl mb-1">☀️</p>
                <p className="text-sm text-gray-800 font-medium">Sol</p>
                <p className="text-xs text-gray-600">Bom dia!</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-3xl mb-1">🌙</p>
                <p className="text-sm text-gray-800 font-medium">Lua</p>
                <p className="text-xs text-gray-600">Boa noite!</p>
              </div>
            </div>
          </div>

          <div className="bg-green-100 border-l-4 border-green-500 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💚 Dica Especial:</h3>
            <p className="text-gray-700 mb-2">
              Não precisa ter medo de usar emojis! Eles deixam a mensagem mais <strong>carinhosa</strong>.
            </p>
            <p className="text-gray-700">
              Seus filhos e netos vão <strong>adorar</strong> receber mensagens com emojis de você! 😊❤️
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}