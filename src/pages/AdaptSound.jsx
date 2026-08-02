import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Settings } from "lucide-react";

const ageGroups = [
  { id: "off", name: "Off (sem reforço)", description: "" },
  { id: "under30", name: "Menos de 30 anos", description: "Reforçar frequências altas" },
  { id: "30to60", name: "30 a 60 anos", description: "Reforçar frequências médias-altas" },
  { id: "over60", name: "Mais de 60 anos", description: "Reforçar todas as frequências" },
];

export default function AdaptSound() {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState("under30");

  return (
    <div className="h-[100dvh] bg-white overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-teal-600 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("QualidadeSom"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Adapt Sound</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Descrição */}
              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-xl mb-6">
                <p className="text-sm text-teal-900">
                  Encontre o melhor som para você e use-o para chamadas, música e vídeo
                </p>
              </div>

              {/* Seção de Som Adaptado */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">ADAPTAR SOM PARA</h3>
                <p className="text-sm text-blue-600 mb-4">Som de mídia e chamada</p>
              </div>

              {/* Grupos de Idade */}
              <div className="space-y-3 mb-6">
                {ageGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedAge(group.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedAge === group.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        selectedAge === group.id
                          ? 'border-white'
                          : 'border-gray-300'
                      }`}>
                        {selectedAge === group.id && (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 ${
                          selectedAge === group.id ? 'text-white' : 'text-gray-900'
                        }`}>
                          {group.name}
                        </h3>
                        {group.description && (
                          <p className={`text-sm ${
                            selectedAge === group.id ? 'text-white/90' : 'text-gray-600'
                          }`}>
                            {group.description}
                          </p>
                        )}
                      </div>
                      {group.id !== "off" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert("Configurações avançadas");
                          }}
                          className={`p-2 rounded-full ${
                            selectedAge === group.id
                              ? 'bg-white/20 hover:bg-white/30'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          <Settings className={`w-4 h-4 ${
                            selectedAge === group.id ? 'text-white' : 'text-gray-600'
                          }`} />
                        </button>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Botão Personalizar */}
              <button
                onClick={() => alert("Iniciando teste de audição...")}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg transition-colors mb-6"
              >
                Personalizar seu som
              </button>

              {/* Info */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-xl">
                <h3 className="font-semibold text-purple-900 mb-2">🎧 Como funciona</h3>
                <div className="text-sm text-purple-800 space-y-2">
                  <p><strong>1.</strong> Vá para um lugar silencioso</p>
                  <p><strong>2.</strong> Coloque seus fones de ouvido e feche todos os aplicativos multimídia</p>
                  <p><strong>3.</strong> Teste sua audição para encontrar o melhor som para você. Seus dados de som personalizados atuais serão substituídos</p>
                  <p><strong>4.</strong> Toque em INICIAR e siga as instruções na tela</p>
                </div>
              </div>
            </div>
    </div>
  );
}