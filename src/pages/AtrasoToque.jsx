import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Timer } from "lucide-react";

export default function AtrasoToque() {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);
  const [delay, setDelay] = useState(1); // 0=0,5s, 1=1s, 2=1,5s

  const delays = ["0,5 segundos", "1 segundo", "1,5 segundos"];

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Atraso do toque. Esta opção é muito útil para quem toca na tela sem querer! Sabe quando você encosta o dedo na tela de leve, sem querer mesmo, e o celular já faz alguma coisa? Com o atraso do toque, o celular espera um pouquinho para ter certeza que você realmente quer tocar ali. Primeiro, ative a opção tocando no botão. Depois escolha quanto tempo quer que o celular espere: meio segundo, um segundo, ou um segundo e meio. Quanto mais tempo, mais proteção contra toques acidentais. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.72;
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Atraso do toque</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Info card */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">⏱️ O que é atraso do toque?</h3>
            <p className="text-sm text-gray-700 mb-3">
              Faz o celular esperar um pouquinho antes de responder ao seu toque. Isso ajuda muito quem toca na tela sem querer!
            </p>
            <p className="text-sm text-gray-700">
              <strong>Quando usar:</strong> Se você vive abrindo coisas que não quer ou se suas mãos tremem um pouquinho.
            </p>
          </div>

          {/* Toggle principal */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {enabled ? "✅ Ativado" : "Desativado"}
                </h3>
                <p className="text-sm text-gray-600">
                  {enabled 
                    ? "O atraso está funcionando. O celular espera antes de responder!"
                    : "Toque no botão para ativar a proteção contra toques acidentais"}
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

          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className={`w-32 h-32 rounded-full ${enabled ? 'bg-gradient-to-br from-[#25D366] to-[#128C7E]' : 'bg-gray-200'} flex items-center justify-center transition-all`}>
              <Timer className={`w-16 h-16 ${enabled ? 'text-white' : 'text-gray-400'}`} />
            </div>
          </div>

          {/* Tempo de atraso (só aparece se ativado) */}
          {enabled && (
            <>
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-1">Tempo de atraso:</p>
                <p className="text-3xl font-bold text-gray-900">{delays[delay]}</p>
              </div>

              <div className="space-y-3 mb-8">
                {delays.map((name, index) => (
                  <button
                    key={index}
                    onClick={() => setDelay(index)}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      delay === index
                        ? 'border-[#25D366] bg-green-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className={`font-semibold ${
                          delay === index ? 'text-[#25D366]' : 'text-gray-900'
                        }`}>
                          {name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {index === 0 && "Atraso curto"}
                          {index === 1 && "Atraso médio (recomendado)"}
                          {index === 2 && "Atraso maior - máxima proteção"}
                        </p>
                      </div>
                      {delay === index && (
                        <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Como funciona */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Como funciona na prática:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <p className="font-medium text-gray-900">Você toca na tela</p>
                  <p className="text-sm text-gray-700">Encosta o dedo em algum lugar</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏱️</span>
                <div>
                  <p className="font-medium text-gray-900">O celular espera</p>
                  <p className="text-sm text-gray-700">Aguarda o tempo que você escolheu</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-medium text-gray-900">Aí sim ele responde</p>
                  <p className="text-sm text-gray-700">Se foi de propósito, funciona normal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dica */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">💚 Dica importante</h3>
            <p className="text-sm text-gray-700 mb-3">
              Se você toca muito sem querer, comece com 1 segundo. Se ainda acontecer muito, aumente para 1,5 segundos.
            </p>
            <p className="text-sm text-gray-700">
              <strong>Atenção:</strong> Com o atraso ativado, o celular fica um pouquinho mais "lento" para responder. Mas isso é normal e é para sua proteção!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}