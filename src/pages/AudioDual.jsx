import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Bluetooth } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function AudioDual() {
  const navigate = useNavigate();
  const [device1Volume, setDevice1Volume] = useState([75]);
  const [device2Volume, setDevice2Volume] = useState([60]);

  const connectedDevices = [
    { id: 1, name: "Galaxy Buds Pro", battery: 81, connected: true },
    { id: 2, name: "Galaxy Buds Pro", battery: 81, connected: true },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("VolumeControl"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Áudio Dual</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Ilustração */}
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 mb-6">
                <div className="flex items-center justify-center gap-8 mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">🎧</span>
                    </div>
                    <p className="text-xs text-gray-600">Dispositivo 1</p>
                  </div>
                  <div className="text-4xl">+</div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">🎧</span>
                    </div>
                    <p className="text-xs text-gray-600">Dispositivo 2</p>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-700">
                  Reproduza a mesma mídia em dois dispositivos Bluetooth simultaneamente
                </p>
              </div>

              {/* Descrição */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">🎵 Como Funciona</h3>
                <p className="text-sm text-blue-800">
                  Conecte vários dispositivos Bluetooth e ouça em dois fones de ouvido 
                  diferentes simultaneamente. Perfeito para compartilhar música com amigos!
                </p>
              </div>

              {/* Dispositivos Conectados */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">DISPOSITIVOS CONECTADOS</h3>
                <div className="space-y-4">
                  {connectedDevices.map((device, index) => (
                    <div key={device.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Bluetooth className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{device.name}</h4>
                          <p className="text-xs text-gray-500">Bateria: {device.battery}%</p>
                        </div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Volume</span>
                          <span className="font-medium text-gray-900">
                            {index === 0 ? device1Volume[0] : device2Volume[0]}%
                          </span>
                        </div>
                        <Slider
                          value={index === 0 ? device1Volume : device2Volume}
                          onValueChange={index === 0 ? setDevice1Volume : setDevice2Volume}
                          max={100}
                          step={1}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão Adicionar */}
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg transition-colors mb-6 flex items-center justify-center gap-2">
                <span className="text-xl">+</span>
                Conectar outro dispositivo
              </button>

              {/* Dicas */}
              <div className="space-y-3 mb-6">
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-xl">
                  <h3 className="font-semibold text-purple-900 mb-2">💡 Dica</h3>
                  <p className="text-sm text-purple-800">
                    Ajuste o volume de cada dispositivo independentemente para equilibrar o som
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                  <h3 className="font-semibold text-green-900 mb-2">✅ Compatibilidade</h3>
                  <p className="text-sm text-green-800">
                    Funciona com Galaxy Buds, Galaxy Watch e outros dispositivos Bluetooth
                  </p>
                </div>
              </div>

              {/* Nota */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Nota</h3>
                <p className="text-sm text-yellow-800">
                  A qualidade do áudio pode variar dependendo dos dispositivos conectados. 
                  Para melhor experiência, use dispositivos da mesma linha.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}