import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Grid3x3, Timer, Sparkles, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export default function CameraConfig() {
  const navigate = useNavigate();
  const [gridLines, setGridLines] = useState(true);
  const [autoHDR, setAutoHDR] = useState(true);
  const [timer, setTimer] = useState("off");
  const [brightness, setBrightness] = useState([50]);

  return (
    <div className="h-[100dvh] bg-white overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gray-700 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("Camera"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Configurações da Câmera</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Qualidade de Foto */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-4">QUALIDADE</h3>
                <div className="space-y-3">
                  <button className="w-full p-4 bg-blue-50 border-2 border-blue-500 rounded-xl text-left">
                    <div className="font-medium text-gray-900">Alta (12 MP)</div>
                    <div className="text-sm text-gray-500">Recomendado para melhor qualidade</div>
                  </button>
                  <button className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-left">
                    <div className="font-medium text-gray-900">Média (8 MP)</div>
                    <div className="text-sm text-gray-500">Balanceado</div>
                  </button>
                  <button className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-left">
                    <div className="font-medium text-gray-900">Baixa (4 MP)</div>
                    <div className="text-sm text-gray-500">Economiza espaço</div>
                  </button>
                </div>
              </div>

              {/* Configurações de Foto */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-4">CONFIGURAÇÕES</h3>
                
                <div className="bg-gray-50 rounded-2xl p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Grid3x3 className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Linhas de grade</span>
                    </div>
                    <Switch checked={gridLines} onCheckedChange={setGridLines} />
                  </div>
                  <p className="text-sm text-gray-500 ml-8">Ajuda no enquadramento</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">HDR Automático</span>
                    </div>
                    <Switch checked={autoHDR} onCheckedChange={setAutoHDR} />
                  </div>
                  <p className="text-sm text-gray-500 ml-8">Melhora fotos em contraluz</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Timer className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Temporizador</span>
                  </div>
                  <div className="flex gap-2 ml-8">
                    {["off", "3s", "5s", "10s"].map((time) => (
                      <button
                        key={time}
                        onClick={() => setTimer(time)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm ${
                          timer === time 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white text-gray-700'
                        }`}
                      >
                        {time === "off" ? "Off" : time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Brilho */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-4">AJUSTES</h3>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Sun className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Exposição</span>
                  </div>
                  <div className="ml-8">
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      max={100}
                      step={1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Mais escuro</span>
                      <span>Mais claro</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configurações de Vídeo */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-4">VÍDEO</h3>
                <div className="space-y-2">
                  <button className="w-full p-3 bg-blue-50 border-2 border-blue-500 rounded-xl text-left">
                    <div className="font-medium text-gray-900">4K (60fps)</div>
                  </button>
                  <button className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-left">
                    <div className="font-medium text-gray-900">Full HD (30fps)</div>
                  </button>
                  <button className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-left">
                    <div className="font-medium text-gray-900">HD (30fps)</div>
                  </button>
                </div>
              </div>
            </div>
    </div>
  );
}