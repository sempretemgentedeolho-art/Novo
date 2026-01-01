import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";

export default function GaleriaAnexo() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o botão de Galeria. Use quando você quer enviar fotos ou vídeos que já estão guardados no seu celular. Diferente da câmera, a galeria mostra suas fotos antigas."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Ao clicar em Galeria, você pode escolher uma ou várias fotos de uma vez. Depois, é só enviar. A pessoa recebe todas as fotos que você selecionou."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.80;
        synth.speak(utter2);
      }, 10000);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("WhatsApp"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Galeria</h2>
        </div>

        {/* Ícone */}
        <div className="p-6 flex justify-center">
          <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">O que é a Galeria?</h3>
            <p className="text-gray-700 leading-relaxed">
              A Galeria mostra todas as fotos e vídeos que estão salvos no seu celular. Você pode escolher e enviar para seus contatos.
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Como usar</h3>
            <ol className="space-y-2 text-sm text-green-800">
              <li>1. Abra a conversa</li>
              <li>2. Toque no clipe (📎)</li>
              <li>3. Escolha "Galeria"</li>
              <li>4. Toque nas fotos que quer enviar</li>
              <li>5. Toque no botão verde para confirmar</li>
            </ol>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Dica</h3>
            <p className="text-sm text-blue-800">
              Você pode enviar várias fotos de uma vez. Basta tocar em cada foto que deseja enviar antes de confirmar.
            </p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
            <h3 className="font-semibold text-purple-900 mb-2">Diferença entre Galeria e Câmera</h3>
            <p className="text-sm text-purple-800 mb-2">
              <strong>Galeria:</strong> Envia fotos e vídeos já salvos no celular
            </p>
            <p className="text-sm text-purple-800">
              <strong>Câmera:</strong> Tira foto nova na hora e envia
            </p>
          </div>
        </div>

        {/* Botão voltar */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => navigate(createPageUrl("WhatsApp"))}
            className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium"
          >
            Voltar ao WhatsApp
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}