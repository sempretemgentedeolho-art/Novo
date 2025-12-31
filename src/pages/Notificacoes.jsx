import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Bell, Volume2, Vibrate, ChevronRight } from "lucide-react";

export default function Notificacoes() {
  const navigate = useNavigate();
  const [conversationTones, setConversationTones] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [inAppSounds, setInAppSounds] = useState(true);
  const [inAppVibrate, setInAppVibrate] = useState(true);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Notificações. Aqui você controla todos os avisos do WhatsApp. Vamos explicar com calma cada parte. Primeiro tem Tons de conversa, para ouvir um som quando você manda e recebe mensagem. Depois tem Notificações no app, para ver avisos quando você está usando o WhatsApp. Som no app, para ouvir os sons das notificações. Vibração no app, para o celular vibrar. Mais abaixo tem Mensagens, para escolher o som e vibração das mensagens normais. Grupos, para escolher como quer ser avisado de mensagens em grupo. E Ligações, para o toque das ligações. Role a tela para ver tudo com calma. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("ConfiguracoesWhatsApp"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Notificações</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Tons de conversa */}
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Tons de conversa</h4>
                <p className="text-sm text-gray-600">
                  Toque sons quando enviar e receber mensagens
                </p>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0 ml-2">
                <input
                  type="checkbox"
                  checked={conversationTones}
                  onChange={(e) => setConversationTones(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 rounded-full ${conversationTones ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${conversationTones ? 'after:translate-x-5' : ''}`}></div>
              </div>
            </div>
          </div>

          {/* Notificações no app */}
          <div className="px-4 py-4 border-b-8 border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Notificações no app</h4>
                <p className="text-sm text-gray-600">
                  Exiba notificações quando o app estiver aberto
                </p>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0 ml-2">
                <input
                  type="checkbox"
                  checked={inAppNotifications}
                  onChange={(e) => setInAppNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 rounded-full ${inAppNotifications ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${inAppNotifications ? 'after:translate-x-5' : ''}`}></div>
              </div>
            </div>

            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Som no app</h4>
                <p className="text-sm text-gray-600">
                  Toque sons de notificação quando o app estiver aberto
                </p>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0 ml-2">
                <input
                  type="checkbox"
                  checked={inAppSounds}
                  onChange={(e) => setInAppSounds(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 rounded-full ${inAppSounds ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${inAppSounds ? 'after:translate-x-5' : ''}`}></div>
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Vibração no app</h4>
                <p className="text-sm text-gray-600">
                  Vibre ao receber notificações quando o app estiver aberto
                </p>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0 ml-2">
                <input
                  type="checkbox"
                  checked={inAppVibrate}
                  onChange={(e) => setInAppVibrate(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 rounded-full ${inAppVibrate ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${inAppVibrate ? 'after:translate-x-5' : ''}`}></div>
              </div>
            </div>
          </div>

          {/* Mensagens */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm text-gray-500 mb-3">Mensagens</h3>
            
            <button className="w-full flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <Volume2 className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left">Tom de notificação</h4>
                  <p className="text-sm text-gray-500 text-left">Padrão (Whatsapp)</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Vibrate className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left">Vibração</h4>
                  <p className="text-sm text-gray-500 text-left">Padrão</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Grupos */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm text-gray-500 mb-3">Grupos</h3>
            
            <button className="w-full flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <Volume2 className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left">Tom de notificação</h4>
                  <p className="text-sm text-gray-500 text-left">Padrão (Whatsapp)</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Vibrate className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left">Vibração</h4>
                  <p className="text-sm text-gray-500 text-left">Padrão</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Ligações */}
          <div className="px-4 py-3">
            <h3 className="text-sm text-gray-500 mb-3">Ligações</h3>
            
            <button className="w-full flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <Volume2 className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left">Toque</h4>
                  <p className="text-sm text-gray-500 text-left">Padrão (Whatsapp)</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Vibrate className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left">Vibração</h4>
                  <p className="text-sm text-gray-500 text-left">Padrão</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}