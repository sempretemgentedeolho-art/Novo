import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, HardDrive, Wifi, Download, Image, Video, FileAudio, File, ChevronRight } from "lucide-react";

export default function ArmazenamentoDados() {
  const navigate = useNavigate();
  const [lowDataMode, setLowDataMode] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Armazenamento e dados. Aqui você controla quanto espaço o WhatsApp usa no seu celular e quanto internet ele gasta. Vamos ver com calma: Gerenciar armazenamento mostra quanto espaço suas conversas ocupam, e você pode apagar fotos e vídeos antigos para liberar espaço. Uso de rede mostra quanto de internet você já usou. Download automático de mídia é importante: você escolhe se quer baixar fotos, vídeos e áudios automaticamente quando estiver usando Wi-Fi, dados móveis, ou em roaming. Modo de economia de dados ajuda a gastar menos internet. Role a tela para ver tudo. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.72;
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Armazenamento e dados</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Armazenamento */}
          <div className="px-4 py-4 border-b-8 border-gray-100">
            <button className="w-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <HardDrive className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left">Gerenciar armazenamento</h4>
                  <p className="text-sm text-gray-500 text-left">2,4 GB</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Uso de rede */}
          <div className="px-4 py-4 border-b-8 border-gray-100">
            <button className="w-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Wifi className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left">Uso de rede</h4>
                  <p className="text-sm text-gray-500 text-left">524 MB enviados · 1,2 GB recebidos</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Download automático de mídia */}
          <div className="px-4 py-4 border-b-8 border-gray-100">
            <h3 className="text-sm text-gray-500 mb-3">Download automático de mídia</h3>
            <p className="text-sm text-gray-600 mb-4">
              Escolha quando baixar mídias automaticamente. Desativar o download pode ajudar a economizar dados
            </p>

            <button className="w-full flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <Wifi className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left">Quando conectado em Wi-Fi</h4>
                  <p className="text-sm text-gray-500 text-left">Fotos, áudios, vídeos, documentos</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-gray-600 rounded"></div>
                </div>
                <div>
                  <h4 className="text-gray-900 text-left">Quando conectado usando dados móveis</h4>
                  <p className="text-sm text-gray-500 text-left">Fotos</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Download className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left">Quando em roaming</h4>
                  <p className="text-sm text-gray-500 text-left">Sem mídia</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Qualidade de upload de mídia */}
          <div className="px-4 py-4 border-b-8 border-gray-100">
            <h3 className="text-sm text-gray-500 mb-3">Qualidade de upload de mídia</h3>

            <button className="w-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left">Qualidade do upload de fotos</h4>
                  <p className="text-sm text-gray-500 text-left">Qualidade padrão</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Modo de economia de dados */}
          <div className="px-4 py-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Modo de economia de dados</h4>
                <p className="text-sm text-gray-600">
                  Reduza o uso de dados durante ligações do WhatsApp
                </p>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0 ml-2">
                <input
                  type="checkbox"
                  checked={lowDataMode}
                  onChange={(e) => setLowDataMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 rounded-full ${lowDataMode ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${lowDataMode ? 'after:translate-x-5' : ''}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}