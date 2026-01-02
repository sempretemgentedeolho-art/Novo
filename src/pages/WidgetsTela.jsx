import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Square, Clock, Calendar, Cloud } from "lucide-react";

export default function WidgetsTela() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Widgets. Aqui você aprende o que são widgets e como colocá-los na tela inicial. Widgets mostram informações sem precisar abrir o aplicativo."
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
          <h2 className="text-lg font-medium">Widgets na Tela</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Square className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">O que são widgets?</h3>
            <p className="text-gray-700 leading-relaxed">
              Widgets são "janelas" de aplicativos que ficam na tela inicial. Eles mostram informações rápidas sem precisar abrir o app.
            </p>
          </div>

          {/* Exemplos */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-900">Exemplos de widgets</h3>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Relógio e Hora</h4>
              </div>
              <p className="text-sm text-gray-700">
                Mostra hora, data e próximos alarmes direto na tela. Você vê a hora sem desbloquear o celular.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Cloud className="w-5 h-5 text-blue-400" />
                <h4 className="font-semibold text-gray-900">Clima / Tempo</h4>
              </div>
              <p className="text-sm text-gray-700">
                Mostra temperatura, se vai chover, previsão do tempo. Útil para saber se precisa levar guarda-chuva.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-gray-900">Calendário</h4>
              </div>
              <p className="text-sm text-gray-700">
                Mostra o mês, dia e próximos compromissos. Você lembra das coisas importantes olhando a tela.
              </p>
            </div>
          </div>

          {/* Como adicionar */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Como adicionar um widget</h3>
            <ol className="space-y-2 text-sm text-green-800">
              <li>1. Toque e SEGURE em um espaço vazio da tela</li>
              <li>2. Aparece um menu - toque em "Widgets"</li>
              <li>3. Você vê uma lista de widgets disponíveis</li>
              <li>4. Arraste o widget que quer para a tela</li>
              <li>5. Solte onde quiser colocar</li>
              <li>6. Pronto! O widget está na tela</li>
            </ol>
          </div>

          {/* Como remover */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <h3 className="font-semibold text-red-900 mb-2">Como remover um widget</h3>
            <ol className="space-y-1 text-sm text-red-800">
              <li>1. Toque e SEGURE no widget</li>
              <li>2. Arraste para "Remover" no topo</li>
              <li>3. Ou toque no X que aparece</li>
              <li>4. O widget some da tela</li>
            </ol>
            <p className="text-xs text-red-700 mt-2">
              <strong>Importante:</strong> Remover o widget não desinstala o app!
            </p>
          </div>

          {/* Dicas */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
            <h3 className="font-semibold text-purple-900 mb-2">💡 Dicas</h3>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>• Coloque apenas widgets que você usa</li>
              <li>• Muitos widgets deixam o celular lento</li>
              <li>• Você pode mudar o tamanho de alguns widgets</li>
              <li>• Widgets grandes ocupam o espaço de vários apps</li>
            </ul>
          </div>

          {/* Widgets úteis */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Widgets mais úteis para idosos</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• <strong>Relógio:</strong> Ver hora rapidamente</li>
              <li>• <strong>Tempo:</strong> Saber se vai chover</li>
              <li>• <strong>Calendário:</strong> Lembrar compromissos</li>
              <li>• <strong>Contatos:</strong> Ligar com um toque</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}