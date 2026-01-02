import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Wifi, Bluetooth, Flashlight, Volume2, Moon } from "lucide-react";

export default function ConfiguracoesRapidas() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Configurações rápidas. Aqui você aprende a ligar e desligar WiFi, Bluetooth, lanterna e outras funções rapidamente, sem entrar em Configurações."
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
          <h2 className="text-lg font-medium">Configurações Rápidas</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">O que são?</h3>
            <p className="text-gray-700 leading-relaxed">
              Configurações rápidas são botões que aparecem quando você arrasta o dedo do topo para baixo. Eles deixam ligar e desligar funções sem entrar em Configurações.
            </p>
          </div>

          {/* Como abrir */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Como abrir</h3>
            <ol className="space-y-1 text-sm text-blue-800">
              <li>1. Coloque o dedo no TOPO da tela</li>
              <li>2. ARRASTE para BAIXO</li>
              <li>3. Os botões aparecem</li>
              <li>4. Arraste mais para ver todos</li>
            </ol>
          </div>

          {/* Funções principais */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-900">Principais funções</h3>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900">WiFi</h4>
              </div>
              <p className="text-sm text-gray-700">
                Liga ou desliga a internet sem fio. Use para economizar bateria ou conectar em redes.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Bluetooth className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Bluetooth</h4>
              </div>
              <p className="text-sm text-gray-700">
                Liga ou desliga o Bluetooth. Use para conectar fones, caixas de som ou outros aparelhos.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Flashlight className="w-5 h-5 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Lanterna</h4>
              </div>
              <p className="text-sm text-gray-700">
                Liga ou desliga a luz do celular. Útil no escuro. Toque uma vez para ligar, toque de novo para desligar.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Moon className="w-5 h-5 text-gray-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Modo avião</h4>
              </div>
              <p className="text-sm text-gray-700">
                Desliga todas as conexões (ligações, internet). Use em aviões ou para economizar muita bateria.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Som / Vibração / Silencioso</h4>
              </div>
              <p className="text-sm text-gray-700">
                Alterna entre tocar som, só vibrar ou ficar silencioso. Útil em reuniões ou lugares quietos.
              </p>
            </div>
          </div>

          {/* Dicas */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <h3 className="font-semibold text-green-900 mb-2">💡 Dicas</h3>
            <ul className="space-y-1 text-sm text-green-800">
              <li>• Você pode personalizar quais botões aparecem</li>
              <li>• Desligue WiFi e Bluetooth quando não usar para economizar bateria</li>
              <li>• A lanterna gasta bateria, lembre de desligar</li>
              <li>• Alguns celulares mostram o brilho da tela também</li>
            </ul>
          </div>

          {/* Atenção */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Importante</h3>
            <p className="text-sm text-yellow-800">
              Com o WiFi desligado, o celular usa seus dados móveis (da operadora) para acessar a internet, o que pode gerar custos extras.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}