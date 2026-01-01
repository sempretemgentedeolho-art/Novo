import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Video } from "lucide-react";

export default function VideoConversaGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Botão de Vídeo na Conversa. Esse botão é especial! Serve para você fazer uma chamada de vídeo pelo WhatsApp. Vou explicar tudo. O que é? É o ícone de uma câmera de vídeo que fica lá em cima, ao lado do ícone do telefone, quando você abre uma conversa. Para que serve? Serve para você fazer uma videochamada! Você vai ver o rosto da pessoa na tela e ela vai ver o seu. É muito emocionante ver os netos, filhos e amigos pelo vídeo! Como usar. Passo um: Abra a conversa com a pessoa. Passo dois: Olhe lá em cima, no canto direito. Ao lado do telefone tem o ícone de uma câmera de vídeo. Passo três: Toque no ícone da câmera de vídeo. Passo quatro: A chamada de vídeo vai começar! A câmera frontal do seu celular vai ligar. Passo cinco: Quando a pessoa atender, vocês vão se ver! O rosto dela aparece grande na tela, e o seu aparece pequenininho num cantinho. Importante saber. A videochamada usa mais internet que a ligação de voz. Prefira usar quando estiver com WiFi ligado em casa. Se a imagem ficar travando, pode ser que a internet esteja fraca. Você pode desligar a câmera durante a chamada se quiser, tocando no ícone da câmera. Para desligar a chamada, toque no botão vermelho. Dicas especiais. Segure o celular na vertical, fica melhor. Fique num lugar com boa luz, para a pessoa te ver bem. Olhe para a câmera quando falar, não para a tela, assim a pessoa sente que você está olhando para ela. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Botão de Vídeo</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Video className="w-16 h-16 text-white" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">📹 O que é?</h2>
            <p className="text-gray-700 leading-relaxed">
              É o ícone de uma <strong>câmera de vídeo</strong> que fica lá em cima, ao lado do ícone do telefone, quando você abre uma conversa.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💜 Para que serve?</h2>
            <p className="text-gray-700 mb-3">
              Serve para você fazer uma <strong>videochamada</strong>!
            </p>
            <p className="text-gray-700">
              Você vai <strong>ver o rosto da pessoa</strong> na tela e ela vai ver o seu. É muito emocionante ver os netos, filhos e amigos pelo vídeo!
            </p>
          </div>

          <div className="bg-white border-2 border-purple-500 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Como Usar:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Abra a conversa com a pessoa</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <p className="text-gray-700 pt-1">Olhe lá em cima, no canto direito. Ao lado do telefone tem o ícone de uma <strong>câmera de vídeo 📹</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <p className="text-gray-700 pt-1">Toque no ícone da câmera de vídeo</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <p className="text-gray-700 pt-1">A chamada de vídeo vai começar! A câmera frontal do seu celular vai ligar</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  5
                </div>
                <p className="text-gray-700 pt-1">Quando a pessoa atender, vocês vão se ver! O rosto dela aparece grande na tela, e o seu aparece pequenininho num cantinho</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Importante Saber:</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">
                  🌐 A videochamada usa <strong>mais internet</strong> que a ligação de voz
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">
                  📶 Prefira usar quando estiver com <strong>WiFi ligado em casa</strong>
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">
                  🐌 Se a imagem ficar travando, pode ser que a internet esteja fraca
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">
                  👁️ Você pode <strong>desligar a câmera</strong> durante a chamada se quiser, tocando no ícone da câmera
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">
                  🔴 Para <strong>desligar a chamada</strong>, toque no botão vermelho
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">✨ Dicas Especiais:</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Posição do celular</p>
                  <p className="text-sm text-gray-700">Segure o celular na vertical, fica melhor</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Iluminação</p>
                  <p className="text-sm text-gray-700">Fique num lugar com boa luz, para a pessoa te ver bem</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-start gap-3">
                <span className="text-2xl">👀</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Para onde olhar</p>
                  <p className="text-sm text-gray-700">Olhe para a câmera quando falar (não para a tela), assim a pessoa sente que você está olhando para ela</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-pink-100 border-l-4 border-pink-500 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">❤️ Resumo:</h3>
            <p className="text-gray-700">
              A videochamada do WhatsApp é <strong>perfeita para matar a saudade</strong> dos netos, filhos e pessoas queridas. É quase como se estivessem juntos!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}