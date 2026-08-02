import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function DolbyAtmosJogos() {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="min-h-[100dvh] bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("VolumeControl"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Dolby Atmos para Jogos</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Ilustração de Jogo */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 mb-6 text-center">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Som 3D Imersivo</h3>
                <p className="text-sm text-gray-600">
                  Experimente áudio surround realista em seus jogos
                </p>
              </div>

              {/* Toggle Principal */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Ativar Dolby Atmos para Jogos</h3>
                  </div>
                  <Switch checked={enabled} onCheckedChange={setEnabled} />
                </div>
                <p className="text-sm text-gray-600">
                  Obtenha som Dolby Atmos otimizado automaticamente quando você joga
                </p>
              </div>

              {/* Benefícios */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">BENEFÍCIOS</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Localização Precisa</h4>
                        <p className="text-sm text-gray-600">
                          Identifique a direção dos sons no jogo com precisão espacial
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🔊</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Som Envolvente</h4>
                        <p className="text-sm text-gray-600">
                          Áudio que flui ao seu redor, criando imersão total
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⚡</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Ativação Automática</h4>
                        <p className="text-sm text-gray-600">
                          Liga automaticamente quando você inicia um jogo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jogos Compatíveis */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">🎮 Jogos Compatíveis</h3>
                <p className="text-sm text-blue-800 mb-2">
                  Funciona com a maioria dos jogos 3D modernos
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Jogos FPS (First Person Shooter)</li>
                  <li>• Jogos de Ação e Aventura</li>
                  <li>• Jogos de Corrida</li>
                  <li>• Jogos de Terror</li>
                </ul>
              </div>

              {/* Dica */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-xl">
                <h3 className="font-semibold text-purple-900 mb-2">💡 Dica</h3>
                <p className="text-sm text-purple-800">
                  Para melhor experiência, use fones de ouvido com suporte a áudio espacial. 
                  Ajuste o volume do jogo nas configurações para aproveitar ao máximo o Dolby Atmos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}