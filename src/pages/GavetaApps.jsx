import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Grid3x3, Layers } from "lucide-react";

export default function GavetaApps() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Gaveta de aplicativos. Aqui você aprende a ver TODOS os aplicativos instalados no celular. Mesmo os que não aparecem na tela inicial."
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
          <button onClick={() => navigate(createPageUrl("Home"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Gaveta de Apps</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">O que é a gaveta de apps?</h3>
            <p className="text-gray-700 leading-relaxed">
              A gaveta de apps é onde ficam TODOS os aplicativos do celular. É como um armário onde estão guardados todos os apps, mesmo os que não aparecem na tela inicial.
            </p>
          </div>

          {/* Como abrir */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Grid3x3 className="w-5 h-5 text-blue-700" />
              <h3 className="font-semibold text-blue-900">Como abrir a gaveta</h3>
            </div>
            <p className="text-sm text-blue-800 mb-3">
              Existem duas formas:
            </p>
            <div className="space-y-3 text-sm text-blue-800">
              <div>
                <p className="font-medium mb-1">Forma 1 - Pelo botão:</p>
                <ul className="space-y-1 pl-4">
                  <li>• Procure um ícone com vários pontinhos (geralmente 9 quadradinhos)</li>
                  <li>• Ou procure por um círculo com pontinhos</li>
                  <li>• Toque nele</li>
                  <li>• A gaveta abre mostrando todos os apps</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">Forma 2 - Deslizando:</p>
                <ul className="space-y-1 pl-4">
                  <li>• Deslize o dedo de BAIXO para CIMA no meio da tela</li>
                  <li>• A gaveta de apps abre</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Diferença tela inicial */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">Diferença importante</h3>
            <div className="space-y-2 text-sm text-purple-800">
              <p>
                <strong>Tela inicial:</strong> Mostra apenas os apps que você colocou lá. É sua "área de trabalho".
              </p>
              <p>
                <strong>Gaveta de apps:</strong> Mostra TODOS os apps instalados, organizados em ordem alfabética.
              </p>
            </div>
          </div>

          {/* Como usar */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Como usar</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• <strong>Procurar app:</strong> Use a barra de pesquisa no topo da gaveta</li>
              <li>• <strong>Abrir app:</strong> Toque no ícone do app</li>
              <li>• <strong>Adicionar na tela:</strong> Toque e segure, depois arraste para fora</li>
              <li>• <strong>Fechar gaveta:</strong> Deslize para baixo ou toque fora</li>
            </ul>
          </div>

          {/* Dicas */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">💡 Dica importante</h3>
            <p className="text-sm text-yellow-800">
              Se não achar um app na tela inicial, não se preocupe. Abra a gaveta de apps e procure lá. Todos os apps instalados estão na gaveta.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}