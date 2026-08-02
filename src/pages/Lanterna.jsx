import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Zap } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function Lanterna() {
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState([70]);

  return (
    <div className={`h-[100dvh] overflow-hidden flex flex-col transition-all duration-300 ${
      isOn ? 'bg-yellow-100' : 'bg-gray-900'
    }`}>
            {/* Header */}
            <div className={`p-6 pb-4 ${isOn ? 'text-gray-900' : 'text-white'}`}>
              <button onClick={() => navigate(createPageUrl("Home"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Lanterna</h1>
            </div>

            {/* Conteúdo */}
            <div className="flex flex-col items-center justify-center h-[calc(100%-120px)] px-8">
              {/* Ícone da Lanterna */}
              <div className={`w-40 h-40 rounded-full flex items-center justify-center mb-12 transition-all duration-300 ${
                isOn 
                  ? 'bg-yellow-400 shadow-2xl shadow-yellow-400/50' 
                  : 'bg-gray-800 border-4 border-gray-700'
              }`}>
                <Zap className={`w-20 h-20 ${isOn ? 'text-white' : 'text-gray-600'}`} />
              </div>

              {/* Controle On/Off */}
              <div className="flex items-center gap-4 mb-8">
                <span className={`text-lg font-medium ${isOn ? 'text-gray-900' : 'text-white'}`}>
                  {isOn ? 'Ligada' : 'Desligada'}
                </span>
                <Switch 
                  checked={isOn} 
                  onCheckedChange={setIsOn}
                  className="scale-125"
                />
              </div>

              {/* Controle de Intensidade */}
              {isOn && (
                <div className="w-full">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Intensidade: {brightness[0]}%
                  </label>
                  <Slider
                    value={brightness}
                    onValueChange={setBrightness}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>Mínima</span>
                    <span>Máxima</span>
                  </div>
                </div>
              )}

              {/* Modos */}
              {isOn && (
                <div className="grid grid-cols-3 gap-3 mt-8 w-full">
                  <button className="bg-yellow-300 hover:bg-yellow-400 p-4 rounded-xl text-sm font-medium text-gray-900">
                    Normal
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-sm font-medium text-gray-900">
                    Piscante
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-sm font-medium text-gray-900">
                    SOS
                  </button>
                </div>
              )}
            </div>
    </div>
  );
}