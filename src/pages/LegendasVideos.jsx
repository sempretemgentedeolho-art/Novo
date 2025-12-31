import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Video, Type } from "lucide-react";

export default function LegendasVideos() {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);
  const [size, setSize] = useState(1); // 0=Pequeno, 1=Médio, 2=Grande

  const sizes = ["Pequeno", "Médio", "Grande"];

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Legendas em vídeos. Sabe quando você assiste um vídeo e aparecem letras embaixo, falando o que a pessoa está dizendo? Isso são as legendas! Elas são muito úteis para quem não escuta bem, ou para quando você está em um lugar barulhento e não consegue ouvir o vídeo. Com as legendas ativadas, você lê tudo que está sendo falado. Aqui você pode ativar as legendas e escolher o tamanho das letras - pequeno, médio ou grande. Escolha um tamanho que você consiga ler bem. Para ativar, toque no botão. Depois escolha o tamanho que prefere. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.73;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("Acessibilidade"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Legendas em vídeos</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Info card */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">📝 O que são legendas?</h3>
            <p className="text-sm text-gray-700 mb-3">
              São textos que aparecem na parte de baixo dos vídeos, mostrando o que está sendo falado. Assim você pode ler ao invés de (ou junto com) ouvir!
            </p>
            <p className="text-sm text-gray-700">
              <strong>Quando usar:</strong> Se você não escuta bem, está em lugar barulhento, ou simplesmente prefere ler.
            </p>
          </div>

          {/* Toggle */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {enabled ? "✅ Legendas ativadas" : "Legendas desativadas"}
                </h3>
                <p className="text-sm text-gray-600">
                  {enabled 
                    ? "Os vídeos vão mostrar legendas quando disponíveis"
                    : "Toque no botão para ativar as legendas"}
                </p>
              </div>
              <div className="relative inline-block w-16 h-9 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-16 h-9 rounded-full ${enabled ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all ${enabled ? 'after:translate-x-7' : ''}`}></div>
              </div>
            </div>
          </div>

          {/* Preview de vídeo */}
          <div className="bg-black rounded-lg overflow-hidden mb-6">
            <div className="aspect-video flex items-center justify-center relative">
              <Video className="w-20 h-20 text-gray-600" />
              {enabled && (
                <div className="absolute bottom-4 left-0 right-0 px-4">
                  <div className="bg-black/80 rounded px-3 py-2">
                    <p className={`text-white text-center font-semibold ${
                      size === 0 ? 'text-sm' : size === 1 ? 'text-base' : 'text-lg'
                    }`}>
                      Esta é uma legenda de exemplo
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tamanho das legendas (só aparece se ativado) */}
          {enabled && (
            <>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📏 Tamanho das legendas:</h3>
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-[#25D366]">{sizes[size]}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {sizes.map((name, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(index)}
                      className={`w-full p-4 rounded-lg border-2 transition-all ${
                        size === index
                          ? 'border-[#25D366] bg-green-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <p className={`font-semibold ${
                            size === index ? 'text-[#25D366]' : 'text-gray-900'
                          }`}>
                            {name}
                          </p>
                          <p className={`text-gray-600 ${
                            index === 0 ? 'text-xs' : index === 1 ? 'text-sm' : 'text-base'
                          }`}>
                            Exemplo de legenda neste tamanho
                          </p>
                        </div>
                        {size === index && (
                          <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Vantagens */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">✨ Por que usar legendas:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">👂</span>
                <div>
                  <p className="font-medium text-gray-900">Para quem não escuta bem</p>
                  <p className="text-sm text-gray-700">Você não perde nada do que é falado</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔇</span>
                <div>
                  <p className="font-medium text-gray-900">Em lugares barulhentos</p>
                  <p className="text-sm text-gray-700">Ônibus, sala de espera, etc.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤫</span>
                <div>
                  <p className="font-medium text-gray-900">Quando não pode fazer barulho</p>
                  <p className="text-sm text-gray-700">Assista sem som, sem problemas!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <p className="font-medium text-gray-900">Para entender melhor</p>
                  <p className="text-sm text-gray-700">Ler e ouvir ao mesmo tempo ajuda</p>
                </div>
              </div>
            </div>
          </div>

          {/* Atenção */}
          <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">⚠️ Importante saber:</h3>
            <p className="text-sm text-gray-700">
              Nem todos os vídeos têm legendas. Depende de quem fez o vídeo ter colocado legendas nele. Mas quando o vídeo tiver legendas disponíveis, elas vão aparecer automaticamente!
            </p>
          </div>

          {/* Dica */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">💚 Dica</h3>
            <p className="text-sm text-gray-700">
              Se você tem dificuldade para ler letras pequenas, escolha o tamanho "Grande". As legendas vão ficar bem mais fáceis de ler!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}