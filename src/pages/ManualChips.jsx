import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Smartphone, AlertCircle } from "lucide-react";

export default function ManualChips() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-indigo-600 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("ManualUsuario"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Inserir Chips SIM</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Tipo de Chip */}
              <div className="mb-8">
                <div className="bg-blue-50 rounded-2xl p-4 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Tipo de Chip</h3>
                  </div>
                  <p className="text-sm text-blue-800">
                    Este aparelho usa chips <strong>nano SIM</strong> (4FF). 
                    Suporta até <strong>2 chips</strong> simultaneamente (Dual SIM).
                  </p>
                </div>

                <div className="bg-gray-100 rounded-2xl p-6 mb-4">
                  <div className="flex justify-center gap-8 mb-3">
                    <div className="text-center">
                      <div className="w-16 h-20 bg-white rounded border-2 border-gray-300 flex items-center justify-center mb-2">
                        <div className="w-6 h-8 bg-gray-300 rounded"></div>
                      </div>
                      <p className="text-xs text-gray-600">Micro SIM</p>
                      <p className="text-xs text-red-600">❌ Não</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-16 bg-white rounded border-2 border-green-500 flex items-center justify-center mb-2">
                        <div className="w-5 h-6 bg-green-500 rounded"></div>
                      </div>
                      <p className="text-xs text-gray-600">Nano SIM</p>
                      <p className="text-xs text-green-600">✅ Sim</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passo a Passo */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Como Inserir</h2>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Localize a bandeja</h3>
                        <p className="text-sm text-gray-600">A bandeja fica na lateral esquerda do aparelho</p>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-xl p-4">
                      <div className="flex items-center justify-center">
                        <div className="w-48 h-32 bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl relative">
                          <div className="absolute left-0 top-16 w-2 h-12 bg-black/30 rounded-r"></div>
                          <div className="absolute left-2 top-16 text-white text-xs">📍</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-600 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Insira a ferramenta</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Insira a ferramenta de ejeção (ou clipe) no orifício da bandeja e pressione suavemente
                        </p>
                        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                          <p className="text-xs text-yellow-800">
                            💡 <strong>Dica:</strong> Se não tiver a ferramenta, use um clipe de papel esticado
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-600 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Remova a bandeja</h3>
                        <p className="text-sm text-gray-600">Puxe a bandeja delicadamente para fora do aparelho</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-600 font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Posicione os chips</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Coloque os chips nano SIM com os contatos dourados voltados para baixo
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-xl p-4">
                      <div className="flex items-center justify-center gap-4">
                        <div className="text-center">
                          <div className="w-20 h-28 bg-white rounded-lg border-2 border-gray-300 p-2 mb-2">
                            <div className="text-xs text-gray-500 mb-1">SIM 1</div>
                            <div className="w-full h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded"></div>
                          </div>
                          <p className="text-xs text-gray-600">Chip Principal</p>
                        </div>
                        <div className="text-center">
                          <div className="w-20 h-28 bg-white rounded-lg border-2 border-gray-300 p-2 mb-2">
                            <div className="text-xs text-gray-500 mb-1">SIM 2</div>
                            <div className="w-full h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded"></div>
                          </div>
                          <p className="text-xs text-gray-600">Chip Secundário</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-600 font-bold">5</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Reinsira a bandeja</h3>
                        <p className="text-sm text-gray-600">
                          Empurre a bandeja de volta para dentro do aparelho até encaixar completamente
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* eSIM */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">eSIM (Chip Digital)</h2>
                
                <div className="bg-purple-50 rounded-xl p-4 mb-4">
                  <h3 className="font-semibold text-purple-900 mb-2">📱 O que é eSIM?</h3>
                  <p className="text-sm text-purple-800 mb-3">
                    O eSIM é um chip digital integrado ao aparelho. Você não precisa inserir um chip físico - 
                    basta baixar o perfil da operadora.
                  </p>
                  <p className="text-sm text-purple-700">
                    <strong>Vantagem:</strong> Use eSIM + chip físico = 2 linhas diferentes
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">1️⃣</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Entre em contato com sua operadora</h4>
                      <p className="text-sm text-gray-600">Solicite a ativação do eSIM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">2️⃣</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Escaneie o QR Code</h4>
                      <p className="text-sm text-gray-600">Use a câmera para ler o código fornecido pela operadora</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">3️⃣</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Confirme a instalação</h4>
                      <p className="text-sm text-gray-600">Siga as instruções na tela para ativar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Avisos */}
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2">⚠️ Atenção</h3>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Desligue o aparelho antes de inserir/remover os chips</li>
                      <li>• Tenha cuidado para não perder a bandeja</li>
                      <li>• Não force a bandeja em direção errada</li>
                      <li>• Os chips devem estar no tamanho nano SIM correto</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}