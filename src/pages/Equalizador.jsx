import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const presets = [
  { id: "normal", name: "Normal" },
  { id: "pop", name: "Pop" },
  { id: "classic", name: "Classic" },
  { id: "jazz", name: "Jazz" },
  { id: "rock", name: "Rock" },
  { id: "custom", name: "Custom" },
];

const frequencies = [
  { freq: "60", value: [0] },
  { freq: "125", value: [0] },
  { freq: "250", value: [0] },
  { freq: "500", value: [0] },
  { freq: "1k", value: [0] },
  { freq: "2k", value: [0] },
  { freq: "4k", value: [0] },
  { freq: "8k", value: [0] },
  { freq: "16k", value: [0] },
];

export default function Equalizador() {
  const navigate = useNavigate();
  const [selectedPreset, setSelectedPreset] = useState("normal");
  const [eqValues, setEqValues] = useState(frequencies);

  const handleSliderChange = (index, newValue) => {
    const newEqValues = [...eqValues];
    newEqValues[index].value = newValue;
    setEqValues(newEqValues);
    setSelectedPreset("custom");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-green-600 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("QualidadeSom"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Equalizador</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Presets */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPreset(preset.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedPreset === preset.id
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {selectedPreset === preset.id && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                        {preset.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Equalizador Visual */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
                <div className="flex items-end justify-between gap-1 h-48">
                  {eqValues.map((eq, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="flex-1 w-full relative">
                        <Slider
                          value={eq.value}
                          onValueChange={(val) => handleSliderChange(index, val)}
                          min={-10}
                          max={10}
                          step={1}
                          orientation="vertical"
                          className="h-full"
                        />
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-semibold text-gray-700">{eq.freq}</div>
                        <div className="text-xs text-gray-500">Hz</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Escala */}
                <div className="flex justify-between text-xs text-gray-500 mt-4 px-2">
                  <span>+10dB</span>
                  <span>0dB</span>
                  <span>-10dB</span>
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <h3 className="font-semibold text-blue-900 mb-2">🎵 Sobre o Equalizador</h3>
                <p className="text-sm text-blue-800 mb-2">
                  Ajuste as frequências para personalizar o som de acordo com seu gosto musical.
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>Graves:</strong> 60-250 Hz</li>
                  <li>• <strong>Médios:</strong> 500-2k Hz</li>
                  <li>• <strong>Agudos:</strong> 4k-16k Hz</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}