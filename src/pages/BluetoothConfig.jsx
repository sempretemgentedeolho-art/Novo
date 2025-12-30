
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Bluetooth, Headphones, Watch, Smartphone, Speaker, ChevronRight, RefreshCw, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";

const pairedDevices = [
  { name: "Galaxy Buds2 Pro", icon: Headphones, connected: true, battery: 85, type: "Fones de ouvido" },
  { name: "Galaxy Watch5", icon: Watch, connected: true, battery: 62, type: "Relógio inteligente" },
];

const availableDevices = [
  { name: "JBL Flip 5", icon: Speaker, type: "Alto-falante" },
  { name: "Notebook Dell", icon: Smartphone, type: "Computador" },
  { name: "Fone Bluetooth XYZ", icon: Headphones, type: "Fones de ouvido" },
  { name: "Caixa de Som LG", icon: Speaker, type: "Alto-falante" },
];

export default function BluetoothConfig() {
  const navigate = useNavigate();
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Configurações de Bluetooth. Aqui você pode parear dispositivos sem fio como fones de ouvido, relógios inteligentes, caixas de som e outros aparelhos. O Bluetooth permite conexões sem fio em curta distância."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleBluetoothToggle = (enabled) => {
    setBluetoothEnabled(enabled);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        enabled 
          ? "Bluetooth ativado. Procurando dispositivos disponíveis." 
          : "Bluetooth desativado. Seus dispositivos pareados não se conectarão automaticamente."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
  };

  const handleDeviceClick = (device, isPaired = false) => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const message = isPaired && device.connected
        ? `${device.name} conectado. Bateria em ${device.battery} por cento.`
        : `Pareando com ${device.name}. Aguarde um momento.`;
      const utter = new SpeechSynthesisUtterance(message);
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }

    if (!isPaired) {
      setTimeout(() => {
        alert(`Dispositivo ${device.name} pareado com sucesso!`);
      }, 1500);
    }
  };

  const handleScan = () => {
    setScanning(true);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance("Procurando dispositivos Bluetooth próximos.");
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-blue-500 text-white p-6 pb-4">
          <button onClick={() => navigate(createPageUrl("Configuracoes"))} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">Bluetooth</h1>
              <p className="text-sm text-blue-100 mt-1">
                {bluetoothEnabled ? "Ativado" : "Desativado"}
              </p>
            </div>
            <Switch 
              checked={bluetoothEnabled} 
              onCheckedChange={handleBluetoothToggle}
              className="data-[state=checked]:bg-white"
            />
          </div>
          
          {bluetoothEnabled && (
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Este dispositivo é visível como:</span>
                <Switch 
                  checked={visible} 
                  onCheckedChange={setVisible}
                  className="data-[state=checked]:bg-white scale-75"
                />
              </div>
              <p className="text-sm text-blue-100">"Forja da Consciência"</p>
            </div>
          )}
        </div>

        {/* Explicação */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 m-4">
          <p className="text-sm text-blue-900">
            💡 <strong>Dica:</strong> O Bluetooth consome pouca bateria quando ativado. Use-o para conectar fones de ouvido sem fio, relógios inteligentes e compartilhar arquivos com outros dispositivos.
          </p>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {bluetoothEnabled ? (
            <>
              {/* Dispositivos Pareados */}
              {pairedDevices.length > 0 && (
                <>
                  <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-600">Dispositivos pareados</p>
                  </div>
                  <div className="py-2">
                    {pairedDevices.map((device, index) => {
                      const Icon = device.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleDeviceClick(device, true)}
                          className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                        >
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="font-medium text-gray-900">{device.name}</h3>
                            <p className="text-sm text-gray-500">{device.type}</p>
                            {device.connected && (
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-green-600 font-medium">Conectado</span>
                                <span className="text-xs text-gray-500">• Bateria: {device.battery}%</span>
                              </div>
                            )}
                          </div>
                          <Settings className="w-5 h-5 text-gray-400" />
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Dispositivos Disponíveis */}
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center mt-4">
                <p className="text-sm font-medium text-gray-600">Dispositivos disponíveis</p>
                <button 
                  onClick={handleScan}
                  className="flex items-center gap-1 text-blue-600 text-sm font-medium"
                >
                  <RefreshCw className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
                  Procurar
                </button>
              </div>
              
              <div className="py-2">
                {availableDevices.map((device, index) => {
                  const Icon = device.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleDeviceClick(device, false)}
                      className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-medium text-gray-900">{device.name}</h3>
                        <p className="text-sm text-gray-500">{device.type}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  );
                })}
              </div>

              {/* Configurações Avançadas */}
              <div className="px-6 py-4 bg-gray-50 mt-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">CONFIGURAÇÕES AVANÇADAS</h3>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 py-2">
                    • Renomear este dispositivo
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 py-2">
                    • Tempo limite de visibilidade
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 py-2">
                    • Dispositivos recebidos via Bluetooth
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 py-2">
                    • Endereço Bluetooth: XX:XX:XX:XX:XX:XX
                  </button>
                </div>
              </div>

              {/* Dica de Uso */}
              <div className="p-6 bg-yellow-50 m-4 rounded-xl border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">⚡ Como parear um dispositivo</h3>
                <ol className="text-sm text-yellow-800 space-y-1">
                  <li>1. Ative o Bluetooth no outro dispositivo</li>
                  <li>2. Coloque-o em modo de pareamento</li>
                  <li>3. Toque no nome do dispositivo nesta lista</li>
                  <li>4. Confirme o código se solicitado</li>
                </ol>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 px-6">
              <Bluetooth className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg font-medium mb-2">Bluetooth desligado</p>
              <p className="text-sm text-center">
                Ative o Bluetooth para conectar dispositivos sem fio como fones de ouvido, relógios inteligentes e caixas de som.
              </p>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
