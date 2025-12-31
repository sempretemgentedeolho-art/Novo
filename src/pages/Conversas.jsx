import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, ChevronRight, Palette, Image, Download, Archive, Lock } from "lucide-react";

export default function Conversas() {
  const navigate = useNavigate();
  const [backupConfirm, setBackupConfirm] = useState(false);
  const [enterSend, setEnterSend] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Conversas. Aqui você personaliza como suas conversas aparecem no WhatsApp. Você pode mudar o tema, escolher um papel de parede bonito para as conversas, e gerenciar o histórico de conversas. Vamos ver as opções: Tema - para deixar o WhatsApp claro ou escuro. Papel de parede - para escolher uma imagem de fundo nas conversas. Arquivar todas as conversas - guarda todas as conversas em um lugar separado. Manter conversas arquivadas - para as conversas ficarem arquivadas mesmo quando você recebe mensagem nova. Histórico de conversas - para fazer backup e apagar conversas antigas. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Conversas</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Exibição */}
          <div className="px-4 py-3 border-b-8 border-gray-100">
            <h3 className="text-sm text-gray-500 mb-3">Exibição</h3>

            <button className="w-full flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Palette className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left">Tema</h4>
                  <p className="text-sm text-gray-500 text-left">Automático (tema padrão)</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image className="w-6 h-6 text-gray-600" />
                <h4 className="text-gray-900 text-left">Papel de parede</h4>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Configurações de conversa */}
          <div className="px-4 py-4 border-b-8 border-gray-100">
            <button className="w-full flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Archive className="w-6 h-6 text-gray-600" />
                <h4 className="text-gray-900 text-left">Arquivar todas as conversas</h4>
              </div>
            </button>

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-gray-600 mt-1" />
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">Manter conversas arquivadas</h4>
                  <p className="text-sm text-gray-600">
                    As conversas arquivadas permanecerão arquivadas quando você receber uma nova mensagem
                  </p>
                </div>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0 ml-2">
                <input
                  type="checkbox"
                  checked={backupConfirm}
                  onChange={(e) => setBackupConfirm(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 rounded-full ${backupConfirm ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${backupConfirm ? 'after:translate-x-5' : ''}`}></div>
              </div>
            </div>
          </div>

          {/* Histórico de conversas */}
          <div className="px-4 py-4 border-b-8 border-gray-100">
            <h3 className="text-sm text-gray-500 mb-3">Histórico de conversas</h3>

            <button className="w-full flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Download className="w-6 h-6 text-gray-600" />
                <h4 className="text-gray-900 text-left">Fazer backup das conversas</h4>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex justify-between items-center mb-4">
              <h4 className="text-gray-900 text-left">Transferir conversas</h4>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex justify-between items-center">
              <h4 className="text-red-600 text-left">Apagar todas as conversas</h4>
            </button>
          </div>

          {/* Enter para enviar */}
          <div className="px-4 py-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Enter para enviar</h4>
                <p className="text-sm text-gray-600">
                  Pressione Enter para enviar a mensagem
                </p>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0 ml-2">
                <input
                  type="checkbox"
                  checked={enterSend}
                  onChange={(e) => setEnterSend(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 rounded-full ${enterSend ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${enterSend ? 'after:translate-x-5' : ''}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}