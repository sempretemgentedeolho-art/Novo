import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Music } from "lucide-react";

export default function AudioAnexo() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o botão de Áudio. Use quando você quer enviar uma música ou um áudio que já está salvo no seu celular. Diferente do microfone, aqui você envia áudios já gravados."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Ao clicar em Áudio, você escolhe um arquivo de música ou áudio dos seus arquivos e envia para a conversa. A pessoa pode ouvir diretamente no WhatsApp."
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
          <h2 className="text-lg font-medium">Enviar Áudio</h2>
        </div>

        {/* Ícone */}
        <div className="p-6 flex justify-center">
          <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center">
            <Music className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para que serve?</h3>
            <p className="text-gray-700 leading-relaxed">
              O botão de Áudio serve para enviar músicas ou gravações que já estão salvas no seu celular.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">O que você pode enviar</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Músicas baixadas no celular</li>
              <li>• Áudios salvos de outras conversas</li>
              <li>• Gravações antigas</li>
              <li>• Arquivos de som em geral</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Como usar</h3>
            <ol className="space-y-2 text-sm text-green-800">
              <li>1. Abra a conversa</li>
              <li>2. Toque no clipe (📎)</li>
              <li>3. Escolha "Áudio" (ícone laranja com nota musical)</li>
              <li>4. Selecione o arquivo de áudio</li>
              <li>5. Confirme o envio</li>
            </ol>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">Diferença importante</h3>
            <p className="text-sm text-purple-800 mb-2">
              <strong>Botão Áudio (pelo clipe):</strong> Envia músicas e áudios já salvos
            </p>
            <p className="text-sm text-purple-800">
              <strong>Botão Microfone (verde):</strong> Grava áudio novo na hora
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">💡 Quando usar</h3>
            <p className="text-sm text-yellow-800">
              Use quando quiser compartilhar uma música com alguém ou enviar um áudio que já está gravado no seu celular.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}