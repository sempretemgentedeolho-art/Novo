import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, FileText, RefreshCw } from "lucide-react";

export default function PedirDadosConta() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Pedir dados da conta. Aqui você pode solicitar um relatório com as informações e dados da sua conta do WhatsApp. Você tem duas opções: Pedir relatório da conta e Pedir relatório dos canais. O relatório da conta inclui suas configurações e dados, mas não inclui suas mensagens. O relatório dos canais inclui atualizações e dados dos seus canais. Você pode criar relatórios automaticamente, um relatório será gerado todos os meses. Clique na seta à sua esquerda acima para voltar."
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

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("ContaWhatsApp"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Pedir dados da conta</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 border-b-8 border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Dados da conta</h3>
            
            <div className="flex items-start gap-3 mb-4">
              <FileText className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">Pedir relatório da conta</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Crie um relatório com as configurações e os dados da sua conta do WhatsApp que você poderá acessar ou exportar para outro app. Esse relatório não inclui suas mensagens.
                </p>
                <button className="text-[#00a884] font-medium text-sm">Saiba mais</button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Criar relatórios automaticamente</span>
              </div>
              <div className="relative inline-block w-12 h-7">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-[#25D366] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-5"></div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Um relatório será gerado todos os meses. <span className="text-[#00a884]">Saiba mais</span>
            </p>
          </div>

          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Atividade nos canais</h3>
            
            <div className="flex items-start gap-3 mb-4">
              <FileText className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">Pedir relatório dos canais</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Crie um relatório com as atualizações e os dados dos seus canais. Você pode acessar ou exportar esse relatório para outro app.
                </p>
                <button className="text-[#00a884] font-medium text-sm">Saiba mais</button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Criar relatórios automaticamente</span>
              </div>
              <div className="relative inline-block w-12 h-7">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-[#25D366] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-5"></div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Um relatório será gerado todos os meses. <span className="text-[#00a884]">Saiba mais</span>
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}