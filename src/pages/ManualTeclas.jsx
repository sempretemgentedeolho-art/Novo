import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Power, Volume2, Camera } from "lucide-react";

export default function ManualTeclas() {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState(null);

  return (
    <div className="h-[100dvh] bg-white overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-blue-600 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("ManualUsuario"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Funções das Teclas</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Tecla Lateral */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Power className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Tecla Lateral</h2>
                    <p className="text-sm text-gray-500">Lateral direita</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setActiveDemo('power-short')}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      activeDemo === 'power-short' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                        1×
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">Pressionar uma vez</h3>
                        <p className="text-sm text-gray-600">Liga/desliga a tela</p>
                        <p className="text-sm text-gray-600">Bloqueia/desbloqueia o aparelho</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveDemo('power-long')}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      activeDemo === 'power-long' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                        ⏱️
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">Pressionar e segurar</h3>
                        <p className="text-sm text-gray-600">Liga/desliga o aparelho</p>
                        <p className="text-sm text-gray-600">Acessa o menu de energia</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveDemo('power-double')}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      activeDemo === 'power-double' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                        2×
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">Pressionar duas vezes</h3>
                        <p className="text-sm text-gray-600">Abre o aplicativo Câmera rapidamente</p>
                        <p className="text-xs text-gray-500 mt-1">(Configure em Configurações → Recursos avançados)</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Teclas de Volume */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Volume2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Teclas de Volume</h2>
                    <p className="text-sm text-gray-500">Lateral direita (acima da Tecla Lateral)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600 font-bold">
                        +
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Aumentar Volume</h3>
                        <p className="text-sm text-gray-600">Aumenta o volume de mídia, chamadas e toques</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600 font-bold">
                        −
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Diminuir Volume</h3>
                        <p className="text-sm text-gray-600">Diminui o volume. Pressione até o fim para silenciar</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Combinações de Teclas */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Combinações de Teclas</h2>
                
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Camera className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Captura de Tela</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Tecla Lateral + Volume (−)</strong>
                        </p>
                        <p className="text-sm text-gray-600">
                          Pressione simultaneamente e segure por 1 segundo para capturar a tela
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600 font-bold">
                        🔄
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Forçar Reinicialização</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Tecla Lateral + Volume (−)</strong>
                        </p>
                        <p className="text-sm text-gray-600">
                          Pressione e segure por 7 segundos se o aparelho travar
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-red-600 font-bold">
                        SOS
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Chamada de Emergência</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Tecla Lateral (pressionar 5 vezes)</strong>
                        </p>
                        <p className="text-sm text-gray-600">
                          Envia sua localização aos contatos de emergência
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          (Configure em Configurações → Segurança → Mensagens de SOS)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dica */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <h3 className="font-semibold text-blue-900 mb-2">💡 Dica</h3>
                <p className="text-sm text-blue-800">
                  Você pode personalizar a função de pressionar duas vezes a Tecla Lateral em 
                  <strong> Configurações → Recursos avançados → Tecla Lateral</strong>.
                </p>
              </div>
            </div>
    </div>
  );
}