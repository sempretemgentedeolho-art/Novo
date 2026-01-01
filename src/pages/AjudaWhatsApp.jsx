import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, HelpCircle, MessageCircle, Phone, Video, Users } from "lucide-react";

export default function AjudaWhatsApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o botão de ajuda do WhatsApp. Marcado com um ponto de interrogação. Quando você clicar neste botão, o WhatsApp explica tudo que você pode fazer no aplicativo."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Aqui você ouve explicações sobre conversas, atualizações, ligações, grupos e todas as funções do WhatsApp. É como ter um guia sempre disponível."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.80;
        synth.speak(utter2);
      }, 9000);
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
          <h2 className="text-lg font-medium">Botão de Ajuda</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <HelpCircle className="w-12 h-12 text-gray-700" />
            </div>
            <p className="text-center text-gray-600 text-sm">
              Este é o botão de ajuda, marcado com <strong>?</strong>
            </p>
          </div>

          {/* Para que serve */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para que serve?</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              O botão de ajuda explica todas as funções do WhatsApp com áudio e textos claros. É como ter um professor particular sempre disponível.
            </p>
          </div>

          {/* O que você aprende */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">O que você aprende ao clicar</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Conversas</p>
                  <p className="text-sm text-blue-800">Como enviar mensagens, fotos e áudios</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Ligações</p>
                  <p className="text-sm text-blue-800">Como fazer chamadas de voz e vídeo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Grupos</p>
                  <p className="text-sm text-blue-800">Como criar e participar de grupos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Video className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Status e Canais</p>
                  <p className="text-sm text-blue-800">Como ver e postar atualizações</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quando usar */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">Quando usar</h3>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li>• Quando você esqueceu como fazer algo</li>
              <li>• Quando está aprendendo uma função nova</li>
              <li>• Quando quer relembrar um recurso</li>
              <li>• Quando está com dúvida sobre qualquer coisa</li>
            </ul>
          </div>

          {/* Dica */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <h3 className="font-semibold text-green-900 mb-2">💡 Dica importante</h3>
            <p className="text-sm text-green-800">
              Sempre que tiver dúvida, clique no botão de ajuda. Não tenha medo de explorar. Todas as explicações são feitas com calma e repetidas vezes.
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