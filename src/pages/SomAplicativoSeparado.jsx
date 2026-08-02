import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Volume2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const apps = [
  { id: "chrome", name: "Chrome", icon: "🌐" },
  { id: "youtube", name: "YouTube", icon: "▶️" },
  { id: "spotify", name: "Spotify", icon: "🎵" },
  { id: "netflix", name: "Netflix", icon: "🎬" },
];

export default function SomAplicativoSeparado() {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState("phone");

  return (
    <div className="min-h-[100dvh] bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-indigo-500 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("VolumeControl"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Som de aplicativo separado</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Ilustração */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-center gap-8 mb-4">
                  <div className="text-center">
                    <div className="w-20 h-24 bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg mb-2 flex items-center justify-center relative">
                      <Volume2 className="w-8 h-8 text-gray-300" />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-gray-700 rounded-full"></div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-600">Alto-falante</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-24 bg-blue-50 border-2 border-blue-300 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-3xl">🎵</span>
                    </div>
                    <p className="text-xs text-gray-600">Bluetooth</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {apps.map(app => (
                    <div key={app.id} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
                      <span className="text-xl">{app.icon}</span>
                    </div>
                  ))}
                  <span className="text-gray-400">...</span>
                </div>

                <p className="text-xs text-center text-gray-600">
                  Reproduza som de mídia de um aplicativo específico no alto-falante ou fone de ouvido Bluetooth conectado
                </p>
              </div>

              {/* Descrição */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl mb-6">
                <p className="text-sm text-blue-900">
                  Por exemplo, você pode ouvir o aplicativo de navegação pelo alto-falante do dispositivo enquanto ouve a reprodução do aplicativo de música pelo alto-falante Bluetooth do veículo
                </p>
              </div>

              {/* Toggle */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Ativar</span>
                  <Switch checked={enabled} onCheckedChange={setEnabled} />
                </div>
              </div>

              {enabled && (
                <>
                  {/* Selecionar App */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-3">APLICATIVO</h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Selecione o aplicativo multimídia do qual gostaria de ouvir som em um dispositivo diferente
                    </p>
                    <div className="space-y-2">
                      {apps.map(app => (
                        <button
                          key={app.id}
                          onClick={() => setSelectedApp(app.id)}
                          className={`w-full p-3 rounded-xl flex items-center gap-3 ${
                            selectedApp === app.id
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-50 text-gray-900'
                          }`}
                        >
                          <span className="text-2xl">{app.icon}</span>
                          <span className="font-medium">{app.name}</span>
                          {selectedApp === app.id && (
                            <span className="ml-auto">✓</span>
                          )}
                        </button>
                      ))}
                      <button className="w-full p-3 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center gap-2">
                        <span className="text-xl">+</span>
                        <span>Adicionar apps</span>
                      </button>
                    </div>
                  </div>

                  {/* Selecionar Dispositivo de Áudio */}
                  {selectedApp && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-600 mb-3">DISPOSITIVO DE ÁUDIO</h3>
                      <p className="text-xs text-gray-500 mb-3">
                        Selecione o dispositivo de áudio que deseja usar para este aplicativo
                      </p>
                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedDevice("phone")}
                          className={`w-full p-4 rounded-xl flex items-center gap-3 ${
                            selectedDevice === "phone"
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-50 text-gray-900'
                          }`}
                        >
                          <span className="text-xl">📱</span>
                          <span className="font-medium">Telefone</span>
                          {selectedDevice === "phone" && (
                            <span className="ml-auto">✓</span>
                          )}
                        </button>
                        <button
                          onClick={() => setSelectedDevice("bluetooth")}
                          className={`w-full p-4 rounded-xl flex items-center gap-3 ${
                            selectedDevice === "bluetooth"
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-50 text-gray-900'
                          }`}
                        >
                          <span className="text-xl">🎧</span>
                          <div className="flex-1 text-left">
                            <p className="font-medium">Dispositivo Bluetooth</p>
                            <p className={`text-xs ${selectedDevice === "bluetooth" ? 'text-white/70' : 'text-gray-500'}`}>
                              Nenhum dispositivo conectado
                            </p>
                          </div>
                          {selectedDevice === "bluetooth" && (
                            <span className="ml-auto">✓</span>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Nota */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                    <p className="text-sm text-yellow-900">
                      <strong>Nota:</strong> O som do aplicativo separado só funciona quando o dispositivo de áudio selecionado é diferente do dispositivo de saída de áudio principal do seu dispositivo.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}