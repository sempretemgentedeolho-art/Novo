import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Power, RotateCw } from "lucide-react";

export default function ManualLigarDesligar() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-blue-600 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("ManualUsuario"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Ligar e Desligar</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Ligar */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Power className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Ligar o Aparelho</h2>
                </div>

                <div className="bg-gray-100 rounded-2xl p-6 mb-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <div className="w-48 h-64 bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl"></div>
                      <div className="absolute right-2 top-24 flex flex-col gap-2">
                        <div className="w-1 h-16 bg-gray-300 rounded-l animate-pulse"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
                        <Power className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-sm">Pressione e segure</p>
                        <p className="text-xs opacity-75">3 segundos</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Pressione a Tecla Lateral</h3>
                      <p className="text-sm text-gray-600">
                        Localize a Tecla Lateral (botão de energia) na lateral direita do aparelho
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Segure por alguns segundos</h3>
                      <p className="text-sm text-gray-600">
                        Mantenha pressionado por cerca de 3 segundos até o logo Samsung aparecer
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Aguarde a inicialização</h3>
                      <p className="text-sm text-gray-600">
                        O aparelho levará alguns segundos para ligar completamente
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desligar */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <Power className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Desligar o Aparelho</h2>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Método 1: Menu de Energia</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-red-600">1️⃣</span>
                        <p className="text-sm text-gray-700">Pressione e segure a <strong>Tecla Lateral</strong></p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600">2️⃣</span>
                        <p className="text-sm text-gray-700">Toque em <strong>Desligar</strong> no menu que aparecer</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600">3️⃣</span>
                        <p className="text-sm text-gray-700">Toque em <strong>Desligar</strong> novamente para confirmar</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Método 2: Painel Rápido</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-red-600">1️⃣</span>
                        <p className="text-sm text-gray-700">Deslize de cima para baixo na tela</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600">2️⃣</span>
                        <p className="text-sm text-gray-700">Toque no ícone de <strong>Energia</strong> ⚡</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600">3️⃣</span>
                        <p className="text-sm text-gray-700">Selecione <strong>Desligar</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-2xl p-6">
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="bg-white rounded-xl p-3 text-center">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Power className="w-6 h-6 text-red-600" />
                      </div>
                      <p className="text-xs text-gray-700 font-medium">Desligar</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <RotateCw className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-xs text-gray-700 font-medium">Reiniciar</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl">🚨</span>
                      </div>
                      <p className="text-xs text-gray-700 font-medium">Emergência</p>
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-600">
                    Opções disponíveis no menu de energia
                  </p>
                </div>
              </div>

              {/* Reinicialização Forçada */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <RotateCw className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Forçar Reinicialização</h2>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 mb-4 border-2 border-orange-200">
                  <h3 className="font-semibold text-orange-900 mb-2">⚠️ Quando usar?</h3>
                  <p className="text-sm text-orange-800 mb-3">
                    Use este método <strong>somente</strong> quando o aparelho travar completamente e não responder a nenhum comando.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-600 font-bold">!</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Método</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Pressione e segure simultaneamente:
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-center text-lg font-bold text-gray-900 mb-2">
                        <strong>Tecla Lateral</strong> + <strong>Volume (−)</strong>
                      </p>
                      <p className="text-center text-sm text-gray-600">
                        Segure por 7 segundos até o aparelho reiniciar
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dica */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <h3 className="font-semibold text-blue-900 mb-2">💡 Dica</h3>
                <p className="text-sm text-blue-800">
                  Se o aparelho estiver muito lento, experimente reiniciá-lo (não precisa desligar). 
                  Isso fecha aplicativos em segundo plano e libera memória.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}