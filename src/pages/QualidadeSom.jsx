import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function QualidadeSom() {
  const navigate = useNavigate();
  const [dolbyAtmos, setDolbyAtmos] = useState(false);
  const [dolbyGaming, setDolbyGaming] = useState(true);
  const [uhqUpscaler, setUhqUpscaler] = useState(false);

  const features = [
    {
      id: "dolby",
      title: "Dolby Atmos",
      description: "Experimente áudio surround envolvente para mídia, reprodução que flui acima e ao seu redor.",
      enabled: dolbyAtmos,
      setEnabled: setDolbyAtmos,
      page: "DolbyAtmos"
    },
    {
      id: "gaming",
      title: "Dolby Atmos para jogos",
      description: "Obtenha som Dolby Atmos realista automaticamente quando você joga.",
      enabled: dolbyGaming,
      setEnabled: setDolbyGaming
    },
    {
      id: "equalizer",
      title: "Equalizador",
      subtitle: "Normal",
      description: "Selecione uma opção para um gênero musical específico",
      page: "Equalizador"
    },
    {
      id: "uhq",
      title: "UHQ upscaler",
      description: "Aprimore a resolução de som de músicas e vídeos para uma experiência de audição mais clara.",
      enabled: uhqUpscaler,
      setEnabled: setUhqUpscaler
    },
    {
      id: "adapt",
      title: "Adapt sound",
      description: "Encontre o melhor som para você.",
      page: "AdaptSound"
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-purple-600 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("VolumeControl"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Qualidade de som e efeitos</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Intro */}
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-xl mb-6">
                <p className="text-sm text-indigo-900">
                  Personalize o som definindo a qualidade de som e os efeitos do dispositivo
                </p>
              </div>

              {/* Lista de recursos */}
              <div className="space-y-3">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => feature.page && navigate(createPageUrl(feature.page))}
                    disabled={!feature.page && feature.setEnabled === undefined}
                    className="w-full bg-gray-50 rounded-xl p-4 text-left hover:bg-gray-100 transition-colors disabled:hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                          {feature.subtitle && (
                            <span className="text-sm text-blue-600">{feature.subtitle}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                      </div>
                      {feature.setEnabled !== undefined ? (
                        <Switch
                          checked={feature.enabled}
                          onCheckedChange={feature.setEnabled}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : feature.page && (
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Info adicional */}
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <h3 className="font-semibold text-blue-900 mb-2">💡 Dica</h3>
                <p className="text-sm text-blue-800">
                  Use fones de ouvido para experimentar melhor os efeitos de som Dolby Atmos e UHQ upscaler
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}