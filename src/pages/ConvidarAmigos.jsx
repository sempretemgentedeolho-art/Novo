import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Users, MessageCircle, Mail, Share2 } from "lucide-react";

export default function ConvidarAmigos() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Esta é a tela de Convidar amigos. Use quando você quer chamar alguém que ainda não usa WhatsApp para baixar e começar a usar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Você pode enviar o convite por SMS, e-mail ou outras formas. A pessoa recebe um link para baixar o WhatsApp na loja de aplicativos."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.80;
        synth.speak(utter2);
      }, 8000);
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
          <h2 className="text-lg font-medium">Convidar amigos</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {/* Ilustração */}
          <div className="p-6 flex flex-col items-center border-b border-gray-200">
            <div className="w-24 h-24 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-4">
              <Users className="w-12 h-12 text-[#25D366]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Convide seus amigos
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Compartilhe o WhatsApp com pessoas que você conhece
            </p>
          </div>

          {/* Formas de convidar */}
          <div className="p-4">
            <h3 className="text-sm text-gray-500 font-medium mb-3">Como convidar</h3>

            <button
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth) {
                  synth.cancel();
                  const utter = new SpeechSynthesisUtterance(
                    "Enviar por SMS. O WhatsApp envia uma mensagem de texto com o link para baixar o aplicativo. A pessoa recebe no celular dela."
                  );
                  utter.lang = "pt-BR";
                  utter.rate = 0.80;
                  synth.speak(utter);
                }
              }}
              className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-100"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900">Enviar por SMS</h3>
                <p className="text-sm text-gray-600 mt-0.5">Mensagem de texto</p>
              </div>
            </button>

            <button
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth) {
                  synth.cancel();
                  const utter = new SpeechSynthesisUtterance(
                    "Enviar por e-mail. Você envia um e-mail com o convite. A pessoa abre o e-mail e clica no link para baixar o WhatsApp."
                  );
                  utter.lang = "pt-BR";
                  utter.rate = 0.80;
                  synth.speak(utter);
                }
              }}
              className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-100"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900">Enviar por e-mail</h3>
                <p className="text-sm text-gray-600 mt-0.5">Convite por correio eletrônico</p>
              </div>
            </button>

            <button
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth) {
                  synth.cancel();
                  const utter = new SpeechSynthesisUtterance(
                    "Compartilhar. Você pode enviar o convite por outras redes sociais ou aplicativos que você usa. O link funciona em todos."
                  );
                  utter.lang = "pt-BR";
                  utter.rate = 0.80;
                  synth.speak(utter);
                }
              }}
              className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-100"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Share2 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900">Compartilhar</h3>
                <p className="text-sm text-gray-600 mt-0.5">Enviar por outros apps</p>
              </div>
            </button>
          </div>

          {/* Informações */}
          <div className="p-4 space-y-3 mt-2">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="font-semibold text-blue-900 mb-2">O que a pessoa recebe</h3>
              <p className="text-sm text-blue-800">
                A pessoa recebe uma mensagem com um link. Ao clicar, ela vai direto para a loja de aplicativos (Play Store ou App Store) para baixar o WhatsApp gratuitamente.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="font-semibold text-green-900 mb-2">💡 Quando usar</h3>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Quando um familiar não tem WhatsApp</li>
                <li>• Para ajudar amigos a instalarem</li>
                <li>• Para facilitar o contato com alguém</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Lembre-se</h3>
              <p className="text-sm text-yellow-800">
                O WhatsApp é gratuito. Nunca peça dinheiro para ninguém baixar ou usar o aplicativo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}