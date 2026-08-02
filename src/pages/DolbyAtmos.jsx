import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const modes = [
  { id: "auto", name: "Auto", description: "Otimize o som automaticamente para o que você está ouvindo" },
  { id: "movie", name: "Movie", description: "Forneça o melhor áudio possível para filmes, programas e vídeos" },
  { id: "music", name: "Music", description: "Deixe todo o seu som musical mais rico, completo e mais equilibrado" },
  { id: "voice", name: "Voice", description: "Faça as vozes altas e claras" },
];

export default function DolbyAtmos() {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(true);
  const [selectedMode, setSelectedMode] = useState("auto");

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-red-600 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("QualidadeSom"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Dolby Atmos</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Toggle Principal */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Ativado</h3>
                    <p className="text-sm text-gray-600">
                      Experimente áudio inovador para reprodução de mídia que flui acima e ao seu redor
                    </p>
                  </div>
                  <Switch checked={enabled} onCheckedChange={setEnabled} />
                </div>
              </div>

              {enabled && (
                <>
                  {/* Modos */}
                  <div className="space-y-3 mb-6">
                    {modes.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setSelectedMode(mode.id)}
                        className={`w-full p-4 rounded-xl text-left transition-all ${
                          selectedMode === mode.id
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-gray-50 text-gray-900'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            selectedMode === mode.id
                              ? 'border-white'
                              : 'border-gray-300'
                          }`}>
                            {selectedMode === mode.id && (
                              <div className="w-3 h-3 rounded-full bg-white"></div>
                            )}
                          </div>
                          <div>
                            <h3 className={`font-semibold mb-1 ${
                              selectedMode === mode.id ? 'text-white' : 'text-gray-900'
                            }`}>
                              {mode.name}
                            </h3>
                            <p className={`text-sm ${
                              selectedMode === mode.id ? 'text-white/90' : 'text-gray-600'
                            }`}>
                              {mode.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Info */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-xl">
                <h3 className="font-semibold text-purple-900 mb-2">🎧 Sobre Dolby Atmos</h3>
                <p className="text-sm text-purple-800 mb-2">
                  Dolby Atmos é uma tecnologia de áudio surround revolucionária que cria uma experiência de som multidimensional.
                </p>
                <p className="text-sm text-purple-800">
                  Para melhor experiência, use fones de ouvido ou alto-falantes compatíveis com Dolby Atmos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}