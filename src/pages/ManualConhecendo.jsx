import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";

export default function ManualConhecendo() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Nesta tela você aprenderá sobre os botões e componentes do seu Samsung A56. Na parte superior está a câmera frontal e o alto-falante."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <div className="min-h-[100dvh] bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[50px] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-3xl z-10"></div>
          
          <div
            className="relative rounded-[46px] overflow-hidden bg-white"
            style={{ aspectRatio: "9/19.5" }}
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 pt-8">
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => navigate(createPageUrl("ManualUsuario"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">Conhecendo o Aparelho</h1>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto p-6" style={{ height: "calc(100% - 100px)" }}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Samsung A56</h2>
              
              {/* Parte Frontal */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">📱 Parte Frontal</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                      <p className="font-medium">Câmera Frontal</p>
                      <p className="text-sm text-gray-600">32MP para selfies e videochamadas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                      <p className="font-medium">Alto-falante</p>
                      <p className="text-sm text-gray-600">Para chamadas e notificações</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0">3</div>
                    <div>
                      <p className="font-medium">Tela Super AMOLED</p>
                      <p className="text-sm text-gray-600">6.6 polegadas com 120Hz</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lateral Direita */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">👉 Lateral Direita</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                      <p className="font-medium">Botão Liga/Desliga</p>
                      <p className="text-sm text-gray-600">Pressione para ligar ou desligar a tela</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                      <p className="font-medium">Botões de Volume</p>
                      <p className="text-sm text-gray-600">+ para aumentar, - para diminuir</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parte Inferior */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">⬇️ Parte Inferior</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                      <p className="font-medium">Porta USB-C</p>
                      <p className="text-sm text-gray-600">Para carregar e transferir dados</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                      <p className="font-medium">Alto-falante</p>
                      <p className="text-sm text-gray-600">Som estéreo de alta qualidade</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold shrink-0">3</div>
                    <div>
                      <p className="font-medium">Microfone</p>
                      <p className="text-sm text-gray-600">Captura de áudio com cancelamento de ruído</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parte Traseira */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">📸 Parte Traseira</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                      <p className="font-medium">Câmera Principal 50MP</p>
                      <p className="text-sm text-gray-600">Fotos de alta qualidade</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                      <p className="font-medium">Ultra Wide 12MP</p>
                      <p className="text-sm text-gray-600">Fotos panorâmicas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">3</div>
                    <div>
                      <p className="font-medium">Flash LED</p>
                      <p className="text-sm text-gray-600">Iluminação para fotos noturnas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}