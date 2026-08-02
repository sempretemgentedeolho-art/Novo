import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Headphones } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function UHQUpscaler() {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);
  const [headphonesConnected, setHeadphonesConnected] = useState(false);

  return (
    <div className="h-[100dvh] bg-white overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("VolumeControl"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">UHQ Upscaler</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Ilustração */}
              <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl p-8 mb-6 text-center">
                <Headphones className="w-16 h-16 mx-auto text-cyan-600 mb-4" />
                <h3 className="font-bold text-gray-900 text-lg mb-2">Ultra Alta Qualidade</h3>
                <p className="text-sm text-gray-600">
                  Melhora a resolução de áudio para uma experiência mais clara
                </p>
              </div>

              {/* Status de Conexão */}
              <div className={`rounded-2xl p-4 mb-6 ${
                headphonesConnected ? 'bg-green-50 border-2 border-green-200' : 'bg-orange-50 border-2 border-orange-200'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{headphonesConnected ? '🎧' : '⚠️'}</span>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${headphonesConnected ? 'text-green-900' : 'text-orange-900'}`}>
                      {headphonesConnected ? 'Fones Conectados' : 'Fones Desconectados'}
                    </h4>
                    <p className={`text-sm ${headphonesConnected ? 'text-green-700' : 'text-orange-700'}`}>
                      {headphonesConnected 
                        ? 'UHQ upscaler disponível' 
                        : 'Conecte fones de ouvido com fio para usar'}
                    </p>
                  </div>
                </div>
                {!headphonesConnected && (
                  <button 
                    onClick={() => setHeadphonesConnected(true)}
                    className="w-full mt-2 bg-orange-500 text-white py-2 rounded-lg text-sm font-medium"
                  >
                    Simular Conexão de Fones
                  </button>
                )}
              </div>

              {/* Toggle Principal */}
              <div className={`bg-gray-50 rounded-2xl p-4 mb-6 ${!headphonesConnected ? 'opacity-50' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Ativar UHQ Upscaler</h3>
                  </div>
                  <Switch 
                    checked={enabled} 
                    onCheckedChange={setEnabled}
                    disabled={!headphonesConnected}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Aprimore a resolução de som de músicas e vídeos ao usar fones de ouvido com fio
                </p>
              </div>

              {/* O que faz */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">O QUE FAZ</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📈</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Melhora a Qualidade</h4>
                        <p className="text-sm text-gray-600">
                          Aumenta a resolução de áudio de músicas e vídeos
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎵</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Sons Mais Claros</h4>
                        <p className="text-sm text-gray-600">
                          Detalhes de áudio mais nítidos e definidos
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎧</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Apenas Fones com Fio</h4>
                        <p className="text-sm text-gray-600">
                          Funciona somente com fones de ouvido conectados por cabo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Técnica */}
              <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-xl mb-4">
                <h3 className="font-semibold text-cyan-900 mb-2">ℹ️ Informação Técnica</h3>
                <p className="text-sm text-cyan-800">
                  O UHQ upscaler converte áudio de 16 bits para 32 bits, melhorando 
                  significativamente a qualidade do som em músicas e vídeos.
                </p>
              </div>

              {/* Nota */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Importante</h3>
                <p className="text-sm text-yellow-800">
                  Este recurso não funciona com fones de ouvido Bluetooth. 
                  Use apenas fones de ouvido com conexão P2 (cabo) para aproveitar o UHQ upscaler.
                </p>
              </div>
            </div>
    </div>
  );
}