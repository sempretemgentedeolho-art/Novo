import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Battery, Zap, AlertTriangle } from "lucide-react";

export default function ManualBateria() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-green-600 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("ManualUsuario"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Carregar a Bateria</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Carregamento Básico */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Battery className="w-8 h-8 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Carregamento com Fio</h2>
                </div>

                <div className="bg-gray-100 rounded-2xl p-6 mb-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <div className="w-32 h-48 bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl flex items-center justify-center">
                        <Battery className="w-16 h-16 text-white" />
                      </div>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                        <div className="w-8 h-8 bg-white rounded border-2 border-gray-300"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    Conecte o cabo USB-C na parte inferior do aparelho
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Conecte o carregador</h3>
                      <p className="text-sm text-gray-600">Conecte o cabo USB-C na porta de carregamento do aparelho</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Conecte na tomada</h3>
                      <p className="text-sm text-gray-600">Conecte o adaptador em uma tomada elétrica</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Aguarde o carregamento</h3>
                      <p className="text-sm text-gray-600">O ícone de bateria mostrará o progresso do carregamento</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carregamento Rápido */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-8 h-8 text-yellow-600" />
                  <h2 className="text-xl font-bold text-gray-900">Carregamento Rápido</h2>
                </div>

                <div className="bg-yellow-50 rounded-2xl p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-3">
                    O aparelho suporta carregamento rápido de até <strong>25W</strong>. 
                    Com o carregador adequado, você pode carregar até 50% em cerca de 30 minutos.
                  </p>
                  <p className="text-xs text-gray-600">
                    *Carregador de 25W vendido separadamente
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    ⚡ <strong>Carregador 25W:</strong> Carga completa em ~70 minutos
                  </p>
                  <p className="text-gray-700">
                    🔌 <strong>Carregador 15W:</strong> Carga completa em ~100 minutos
                  </p>
                </div>
              </div>

              {/* Dicas de Economia */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Dicas para Economizar Bateria</h2>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">💡 Modo de Economia de Energia</h3>
                    <p className="text-sm text-blue-800 mb-2">
                      Ative em: <strong>Configurações → Bateria → Economia de energia</strong>
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1 ml-4">
                      <li>• Reduz o brilho da tela</li>
                      <li>• Limita desempenho do processador</li>
                      <li>• Restringe apps em segundo plano</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4">
                    <h3 className="font-semibold text-purple-900 mb-2">🌙 Modo Escuro</h3>
                    <p className="text-sm text-purple-800">
                      Economiza bateria em telas AMOLED ao usar cores escuras
                    </p>
                  </div>

                  <div className="bg-gray-100 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">📱 Reduza o Brilho</h3>
                    <p className="text-sm text-gray-700">
                      Ajuste o brilho automático ou reduza manualmente quando possível
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4">
                    <h3 className="font-semibold text-green-900 mb-2">📡 Desative Conexões</h3>
                    <p className="text-sm text-green-800">
                      Desligue Wi-Fi, Bluetooth e GPS quando não estiver usando
                    </p>
                  </div>
                </div>
              </div>

              {/* Precauções */}
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">⚠️ Precauções Importantes</h3>
                    <ul className="text-sm text-red-800 space-y-2">
                      <li>• Use apenas carregadores e cabos originais Samsung ou certificados</li>
                      <li>• Não use o aparelho enquanto carrega com mãos molhadas</li>
                      <li>• Não cubra o aparelho durante o carregamento</li>
                      <li>• Desconecte se o aparelho aquecer excessivamente</li>
                      <li>• Não carregue com a porta USB molhada</li>
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