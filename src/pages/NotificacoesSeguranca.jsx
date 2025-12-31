import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, MessageSquare, Phone, Paperclip, MapPin, RefreshCw } from "lucide-react";

export default function NotificacoesSeguranca() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Notificações de segurança. Suas conversas e ligações são privadas. A criptografia de ponta a ponta mantém suas mensagens e ligações pessoais somente entre você e as pessoas que você escolher. Nem mesmo o WhatsApp pode ler, ouvir ou compartilhar esse conteúdo. A criptografia protege mensagens de texto e de voz, ligações de voz e de vídeo, fotos, vídeos e documentos, compartilhamento de localização e atualizações de status. Aperte na seta à sua esquerda para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("ContaWhatsApp"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Notificações de segurança</h1>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Ícone de cadeado */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </div>
          </div>

          {/* Título */}
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-4">
            Suas conversas e ligações são privadas
          </h2>

          {/* Descrição */}
          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            A criptografia de ponta a ponta mantém suas mensagens e ligações pessoais somente entre você e as pessoas que você escolher. Nem mesmo o WhatsApp pode ler, ouvir ou compartilhar esse conteúdo. A criptografia protege:
          </p>

          {/* Lista de proteções */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Mensagens de texto e de voz</span>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Ligações de voz e de vídeo</span>
            </div>
            <div className="flex items-start gap-3">
              <Paperclip className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Fotos, vídeos e documentos</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Compartilhamento de localização</span>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Atualizações de status</span>
            </div>
          </div>

          {/* Link saiba mais */}
          <div className="text-center">
            <button className="text-[#00a884] font-medium">Saiba mais</button>
          </div>

          {/* Toggle */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">
                  Mostrar notificações de segurança neste dispositivo
                </h3>
                <p className="text-sm text-gray-600">
                  Receba uma notificação quando seu código de segurança com o celular de um contato mudar em uma conversa protegida com a criptografia de ponta a ponta. Se você usa mais de um dispositivo, ative essa configuração nos dispositivos nos quais você deseja receber a notificação.
                </p>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-12 h-7 bg-[#25D366] rounded-full peer-focus:ring-2 peer-focus:ring-green-300 after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
              </div>
            </div>
            <button className="text-[#00a884] font-medium text-sm mt-3">Saiba mais</button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}