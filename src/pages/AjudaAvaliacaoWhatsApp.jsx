import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, HelpCircle, MessageCircle, FileText, Star, ChevronRight } from "lucide-react";

export default function AjudaAvaliacaoWhatsApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Esta é a tela de Ajuda e avaliação do WhatsApp. Aqui você encontra várias formas de obter ajuda quando tiver dúvidas ou problemas."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Você pode acessar a Central de Ajuda com perguntas frequentes, conversar com o suporte do WhatsApp, ler a Política de Privacidade ou avaliar o aplicativo."
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
          <h2 className="text-lg font-medium">Ajuda e avaliação</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {/* Introdução */}
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <div className="flex gap-3">
              <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Precisa de ajuda?</h3>
                <p className="text-sm text-blue-800">
                  Encontre respostas para suas dúvidas ou entre em contato com o suporte do WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* Opções */}
          <div className="py-2">
            <button
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth) {
                  synth.cancel();
                  const utter = new SpeechSynthesisUtterance(
                    "Central de Ajuda. Aqui você encontra respostas para as perguntas mais comuns sobre o WhatsApp. Como criar grupos, enviar fotos, fazer chamadas e muito mais."
                  );
                  utter.lang = "pt-BR";
                  utter.rate = 0.80;
                  synth.speak(utter);
                }
              }}
              className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-100"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 text-[16px]">Central de Ajuda</h3>
                <p className="text-sm text-gray-600 mt-0.5">Perguntas frequentes e tutoriais</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth) {
                  synth.cancel();
                  const utter = new SpeechSynthesisUtterance(
                    "Fale conosco. Use esta opção para conversar diretamente com o suporte do WhatsApp quando você tiver um problema que não conseguiu resolver sozinho."
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
                <h3 className="font-medium text-gray-900 text-[16px]">Fale conosco</h3>
                <p className="text-sm text-gray-600 mt-0.5">Entre em contato com o suporte</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth) {
                  synth.cancel();
                  const utter = new SpeechSynthesisUtterance(
                    "Termos e Política de Privacidade. Aqui você lê como o WhatsApp protege suas informações, como usa seus dados e quais são seus direitos."
                  );
                  utter.lang = "pt-BR";
                  utter.rate = 0.80;
                  synth.speak(utter);
                }
              }}
              className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-100"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 text-[16px]">Termos e Política de Privacidade</h3>
                <p className="text-sm text-gray-600 mt-0.5">Como seus dados são protegidos</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth) {
                  synth.cancel();
                  const utter = new SpeechSynthesisUtterance(
                    "Avaliar o WhatsApp. Aqui você pode dar uma nota de 1 a 5 estrelas para o aplicativo e deixar comentários sobre sua experiência."
                  );
                  utter.lang = "pt-BR";
                  utter.rate = 0.80;
                  synth.speak(utter);
                }
              }}
              className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-100"
            >
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 text-[16px]">Avaliar o WhatsApp</h3>
                <p className="text-sm text-gray-600 mt-0.5">Dê sua opinião sobre o app</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Informações */}
          <div className="p-4 space-y-3">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="font-semibold text-green-900 mb-2">💡 Quando usar</h3>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Quando tiver dúvida sobre alguma função</li>
                <li>• Quando algo não estiver funcionando</li>
                <li>• Para entender a privacidade do app</li>
                <li>• Para reportar um problema</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Importante</h3>
              <p className="text-sm text-yellow-800">
                O suporte do WhatsApp nunca pede sua senha ou código de verificação. Desconfie de mensagens assim.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}