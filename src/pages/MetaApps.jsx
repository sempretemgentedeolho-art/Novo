import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function MetaApps() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Esta é a seção Também da Meta. Aqui aparecem outros aplicativos que pertencem à mesma empresa do WhatsApp, a Meta."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Os apps mostrados são: Meta AI, que é uma inteligência artificial para responder perguntas. Instagram, para fotos e vídeos. Facebook, para se conectar com amigos. E Threads, para conversas e textos."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.80;
        synth.speak(utter2);
      }, 7000);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("ConfiguracoesWhatsApp"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Também da Meta</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Introdução */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#0081FB">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              <h3 className="text-xl font-semibold text-gray-900">Meta</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Meta é a empresa dona do WhatsApp, Instagram, Facebook e outros aplicativos que conectam pessoas.
            </p>
          </div>

          {/* Apps */}
          <div className="space-y-4">
            {/* Meta AI */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Meta AI App</h3>
                  <p className="text-sm text-gray-600">Inteligência artificial</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Faça perguntas e receba respostas. Peça receitas, dicas, informações e muito mais.
              </p>
              <p className="text-xs text-gray-500">
                💡 Você já pode usar a Meta AI dentro do WhatsApp pela barra de pesquisa!
              </p>
            </div>

            {/* Instagram */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-xl">📷</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Instagram</h3>
                  <p className="text-sm text-gray-600">Fotos e vídeos</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Compartilhe fotos, vídeos curtos (Reels) e stories com amigos e família.
              </p>
            </div>

            {/* Facebook */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">f</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Facebook</h3>
                  <p className="text-sm text-gray-600">Rede social</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Conecte-se com amigos, compartilhe momentos e participe de grupos de interesse.
              </p>
            </div>

            {/* Threads */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white text-xl">@</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Threads</h3>
                  <p className="text-sm text-gray-600">Conversas e textos</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Compartilhe pensamentos, ideias e participe de conversas sobre assuntos que você gosta.
              </p>
            </div>
          </div>

          {/* Informação importante */}
          <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4">
            <h3 className="font-semibold text-green-900 mb-2">💡 Você sabia?</h3>
            <p className="text-sm text-green-800">
              Todos esses aplicativos são gratuitos. Você pode baixá-los pela Play Store (Android) ou App Store (iPhone).
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}