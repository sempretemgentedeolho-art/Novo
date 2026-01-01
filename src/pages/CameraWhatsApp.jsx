import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Camera, Image, Video, Zap } from "lucide-react";

export default function CameraWhatsApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Câmera do WhatsApp. Vamos aprender para que serve e como usar! A câmera do WhatsApp é muito simples. Você usa ela para tirar fotos e fazer vídeos rápidos para enviar nas conversas. É diferente da câmera normal do celular porque já fica pronta para mandar para alguém. Quando você toca no ícone da câmera, ela abre rapidinho. Aí você pode tirar uma foto tocando no botão redondo grande, ou segurar esse botão para gravar um vídeo. As fotos e vídeos que você tira pelo WhatsApp não ficam salvos na galeria do celular, elas são enviadas direto para a pessoa. Mas se você quiser, pode tocar no ícone de galeria e escolher uma foto que já está salva no seu celular para enviar. É muito prático! Use a câmera do WhatsApp quando quiser mandar uma foto rápida de algo que está vendo agora. Por exemplo: tirar foto de um produto na loja para mostrar para alguém, ou fazer um vídeo curtinho mostrando onde você está. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Câmera do WhatsApp</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center">
              <Camera className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Para que serve */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">📸 Para que serve?</h2>
            <p className="text-gray-700 leading-relaxed">
              A câmera do WhatsApp serve para tirar fotos e fazer vídeos rápidos para enviar nas suas conversas. É mais prático que tirar foto normal e depois procurar na galeria!
            </p>
          </div>

          {/* Como usar */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 Como usar:</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Abrir a câmera</p>
                  <p className="text-sm text-gray-700">Toque no ícone da câmera no topo do WhatsApp (ao lado dos 3 pontinhos)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Tirar a foto</p>
                  <p className="text-sm text-gray-700">Toque no botão redondo grande branco no meio da tela embaixo</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Fazer vídeo</p>
                  <p className="text-sm text-gray-700">Segure o botão redondo (não solte) para gravar vídeo</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Enviar</p>
                  <p className="text-sm text-gray-700">Depois de tirar, escolha para quem enviar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Funções extras */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">✨ Funções extras:</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Image className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Galeria</p>
                  <p className="text-sm text-gray-700">Toque no quadradinho no canto para escolher uma foto que já está salva</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Flash</p>
                  <p className="text-sm text-gray-700">Se estiver escuro, toque no raio para ligar a luz</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Video className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Trocar câmera</p>
                  <p className="text-sm text-gray-700">Toque na setinha circular para mudar entre câmera da frente e de trás</p>
                </div>
              </div>
            </div>
          </div>

          {/* Para onde vão as fotos */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">📱 Para onde vão as fotos?</h2>
            <p className="text-gray-700 mb-3">
              As fotos que você tira pela câmera do WhatsApp <strong>não ficam salvas na galeria do celular automaticamente</strong>. Elas são enviadas direto para a pessoa.
            </p>
            <p className="text-gray-700">
              <strong>Dica:</strong> Se você quiser guardar a foto, antes de enviar, toque no botão de salvar (setinha para baixo) que aparece na tela.
            </p>
          </div>

          {/* Quando usar */}
          <div className="bg-green-50 rounded-lg p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💚 Quando usar:</h2>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Mostrar um produto na loja para alguém</li>
              <li>✓ Tirar foto de um documento rapidinho</li>
              <li>✓ Fazer vídeo curto mostrando onde você está</li>
              <li>✓ Fotografar algo que você viu e quer compartilhar rápido</li>
              <li>✓ Mostrar algo engraçado que está acontecendo agora</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}