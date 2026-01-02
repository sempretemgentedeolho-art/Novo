import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, HardDrive, Image, Music, FileText, Video, Trash2 } from "lucide-react";

export default function ArmazenamentoConfig() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Armazenamento. Aqui você vê quanto espaço tem livre no celular e o que está ocupando memória: fotos, vídeos, aplicativos."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-[#1976D2] text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("Configuracoes"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Armazenamento</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {/* Resumo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <HardDrive className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Armazenamento interno</h3>
                <p className="text-2xl font-bold text-blue-600">45 GB usados de 128 GB</p>
              </div>
            </div>
            
            {/* Barra de progresso */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{width: '35%'}} />
            </div>
            <p className="text-sm text-gray-600 mt-2">83 GB disponíveis</p>
          </div>

          {/* Explicação */}
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">O que é armazenamento?</h3>
            <p className="text-sm text-blue-800">
              É o espaço do celular onde ficam guardadas suas fotos, vídeos, músicas, aplicativos e arquivos.
            </p>
          </div>

          {/* O que ocupa espaço */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">O que está ocupando espaço</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Image className="w-10 h-10 text-green-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Fotos e Vídeos</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">15 GB</p>
                    <p className="text-xs text-gray-500">1.234 itens</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-10 h-10 text-blue-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Aplicativos</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">12 GB</p>
                    <p className="text-xs text-gray-500">45 apps</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Music className="w-10 h-10 text-purple-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Músicas e Áudios</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">8 GB</p>
                    <p className="text-xs text-gray-500">523 músicas</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Video className="w-10 h-10 text-red-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Vídeos do WhatsApp</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">7 GB</p>
                    <p className="text-xs text-gray-500">Recebidos</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-10 h-10 text-gray-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Outros arquivos</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">3 GB</p>
                    <p className="text-xs text-gray-500">Documentos, downloads</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Como liberar espaço */}
          <div className="p-4 bg-yellow-50 border-y border-yellow-200">
            <div className="flex items-center gap-2 mb-3">
              <Trash2 className="w-5 h-5 text-yellow-700" />
              <h3 className="font-semibold text-yellow-900">Como liberar espaço</h3>
            </div>
            <ol className="space-y-2 text-sm text-yellow-800">
              <li>1. <strong>Apagar fotos e vídeos antigos</strong> da Galeria</li>
              <li>2. <strong>Desinstalar apps</strong> que não usa</li>
              <li>3. <strong>Limpar WhatsApp:</strong> vá em Configurações → Armazenamento</li>
              <li>4. <strong>Esvaziar lixeira</strong> da Galeria e Arquivos</li>
              <li>5. <strong>Transferir para nuvem:</strong> Google Fotos guarda suas fotos online</li>
            </ol>
          </div>

          {/* Dicas */}
          <div className="p-4 space-y-3">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="font-semibold text-green-900 mb-2">💡 Dicas</h3>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Vídeos ocupam muito espaço - delete os que não precisa</li>
                <li>• WhatsApp acumula muitos vídeos recebidos</li>
                <li>• Faça limpeza regularmente</li>
                <li>• Deixe sempre pelo menos 10 GB livres</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-red-900 mb-2">⚠️ Atenção</h3>
              <p className="text-sm text-red-800">
                Quando o armazenamento fica cheio, o celular fica lento e você não consegue tirar fotos ou baixar apps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}