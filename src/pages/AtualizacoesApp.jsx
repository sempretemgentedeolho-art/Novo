import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Download, Check, AlertCircle } from "lucide-react";

export default function AtualizacoesApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Esta é a tela de Atualizações do app. Aqui o WhatsApp verifica se existe uma versão nova do aplicativo disponível para baixar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Manter o WhatsApp atualizado é importante. As atualizações trazem novos recursos, melhorias e correções de segurança. O aplicativo pode atualizar automaticamente ou você pode fazer manualmente."
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
          <h2 className="text-lg font-medium">Atualizações do app</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {/* Status atual */}
          <div className="p-6 flex flex-col items-center border-b border-gray-200">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-12 h-12 text-green-600" strokeWidth={3} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              WhatsApp está atualizado
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Versão 2.26.1.70
            </p>
          </div>

          {/* Informações */}
          <div className="p-4 space-y-3">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Por que atualizar?</h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• <strong>Novos recursos:</strong> Novas funções e melhorias</li>
                <li>• <strong>Segurança:</strong> Proteção contra problemas</li>
                <li>• <strong>Correções:</strong> Consertos de erros</li>
                <li>• <strong>Desempenho:</strong> App mais rápido</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="font-semibold text-green-900 mb-2">Como atualizar</h3>
              <ol className="space-y-2 text-sm text-green-800">
                <li>1. Abra a Play Store (ou App Store)</li>
                <li>2. Toque no menu (☰) ou na sua foto</li>
                <li>3. Vá em "Meus apps e jogos"</li>
                <li>4. Procure o WhatsApp na lista</li>
                <li>5. Se tiver "Atualizar", toque nele</li>
                <li>6. Aguarde o download terminar</li>
              </ol>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <h3 className="font-semibold text-purple-900 mb-2">💡 Atualização automática</h3>
              <p className="text-sm text-purple-800">
                Você pode configurar o celular para atualizar aplicativos automaticamente quando conectado ao WiFi. Assim não precisa fazer manualmente.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Atenção</h3>
              <p className="text-sm text-yellow-800">
                Atualizações usam internet. Se possível, conecte ao WiFi antes de atualizar para não gastar seus dados móveis.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="font-semibold text-green-900 mb-2">✓ Recomendação</h3>
              <p className="text-sm text-green-800">
                Mantenha sempre o WhatsApp atualizado. Isso garante que você tenha acesso aos recursos mais novos e à melhor proteção.
              </p>
            </div>
          </div>
        </div>

        {/* Botão */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              const synth = window.speechSynthesis;
              if (synth) {
                synth.cancel();
                const utter = new SpeechSynthesisUtterance(
                  "Para verificar atualizações agora, vá até a Play Store ou App Store e procure pelo WhatsApp."
                );
                utter.lang = "pt-BR";
                utter.rate = 0.80;
                synth.speak(utter);
              }
            }}
            className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Ir para a loja
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}