import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Bluetooth, Headphones, Speaker, Watch, Car } from "lucide-react";

export default function BluetoothConfig() {
  const navigate = useNavigate();
  const [bluetoothOn, setBluetoothOn] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Bluetooth. Aqui você liga e desliga o Bluetooth e conecta com outros aparelhos, como fone de ouvido, caixa de som ou relógio."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const toggleBluetooth = () => {
    setBluetoothOn(!bluetoothOn);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        !bluetoothOn ? "Bluetooth ligado. Procurando dispositivos..." : "Bluetooth desligado"
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-[#1976D2] text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("Configuracoes"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Bluetooth</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {/* Switch */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bluetooth className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Usar Bluetooth</h3>
                <p className="text-sm text-gray-600">{bluetoothOn ? "Ligado" : "Desligado"}</p>
              </div>
            </div>
            <button
              onClick={toggleBluetooth}
              className={`w-12 h-6 rounded-full transition-colors ${
                bluetoothOn ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                bluetoothOn ? "translate-x-6" : "translate-x-1"
              }`} />
            </button>
          </div>

          {/* Explicação */}
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">O que é Bluetooth?</h3>
            <p className="text-sm text-blue-800">
              Bluetooth serve para conectar o celular com outros aparelhos sem fio, como fones de ouvido, caixas de som, relógios inteligentes e mais.
            </p>
          </div>

          {/* Como usar */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Como conectar um dispositivo</h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li>1. Ligue o Bluetooth tocando no botão acima</li>
              <li>2. Ligue o outro aparelho (fone, caixa de som, etc.)</li>
              <li>3. Coloque o outro aparelho em "modo de pareamento"</li>
              <li>4. Ele aparece na lista "Dispositivos disponíveis" abaixo</li>
              <li>5. Toque no nome do dispositivo para conectar</li>
              <li>6. Pronto! Agora está conectado</li>
            </ol>
          </div>

          {bluetoothOn && (
            <div className="p-4">
              <h3 className="text-sm text-gray-500 font-medium mb-3">Dispositivos disponíveis</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <Headphones className="w-10 h-10 text-gray-400" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Fone Bluetooth</p>
                    <p className="text-xs text-gray-500">Disponível para conectar</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <Speaker className="w-10 h-10 text-gray-400" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Caixa de Som JBL</p>
                    <p className="text-xs text-gray-500">Disponível para conectar</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dicas */}
          <div className="p-4 space-y-3">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="font-semibold text-green-900 mb-2">💡 Dicas</h3>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Desligue o Bluetooth quando não usar para economizar bateria</li>
                <li>• Mantenha os dispositivos perto (até 10 metros)</li>
                <li>• Você pode conectar fones, relógios, caixas de som</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Importante</h3>
              <p className="text-sm text-yellow-800">
                Para conectar um dispositivo pela primeira vez, ele precisa estar em "modo de pareamento". Consulte o manual do aparelho para saber como ativar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}