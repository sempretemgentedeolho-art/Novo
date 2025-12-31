import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";

export default function VolumeNotificacoes() {
  const navigate = useNavigate();
  const [volume, setVolume] = useState(70);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Volume das notificações. Aqui você ajusta o volume dos avisos do WhatsApp. É muito fácil! Você vê uma barra com uma bolinha. Arraste a bolinha para a direita para aumentar o som, ou para a esquerda para diminuir. Tem um botão de teste: toque nele para ouvir como está o volume. Assim você já sabe se está bom ou se precisa ajustar mais. Se não quiser ouvir nenhum som, arraste a bolinha até o começo. Quando estiver do jeito que você gosta, clique na seta à sua esquerda acima para voltar e salvar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleTest = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance("Este é o som das suas notificações");
    utter.lang = "pt-BR";
    utter.volume = volume / 100;
    synth.speak(utter);
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("Acessibilidade"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Volume das notificações</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Info card */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">🔊 Como ajustar o volume</h3>
            <p className="text-sm text-gray-700">
              Arraste a bolinha na barra para aumentar ou diminuir. Use o botão "Testar som" para ouvir como está ficando!
            </p>
          </div>

          {/* Volume icon display */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center">
              {volume === 0 ? (
                <VolumeX className="w-16 h-16 text-white" />
              ) : (
                <Volume2 className="w-16 h-16 text-white" />
              )}
            </div>
          </div>

          {/* Volume level display */}
          <div className="text-center mb-8">
            <p className="text-4xl font-bold text-gray-900 mb-2">{volume}%</p>
            <p className="text-sm text-gray-600">
              {volume === 0 && "Silencioso"}
              {volume > 0 && volume <= 30 && "Baixo"}
              {volume > 30 && volume <= 60 && "Médio"}
              {volume > 60 && volume <= 90 && "Alto"}
              {volume > 90 && "Muito Alto"}
            </p>
          </div>

          {/* Volume slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <VolumeX className="w-6 h-6 text-gray-400" />
              <Volume2 className="w-6 h-6 text-gray-600" />
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#25D366]"
            />
          </div>

          {/* Test button */}
          <button
            onClick={handleTest}
            className="w-full bg-[#25D366] text-white py-4 rounded-lg font-semibold text-lg mb-6 active:bg-[#128C7E]"
          >
            🔊 Testar som
          </button>

          {/* Dicas */}
          <div className="space-y-4">
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⚠️ Volume muito baixo?</h3>
              <p className="text-sm text-gray-700">
                Se você não consegue ouvir as notificações, arraste a bolinha mais para a direita e teste novamente.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">💚 Dica importante</h3>
              <p className="text-sm text-gray-700">
                Ajuste o volume para um nível que você consiga ouvir bem, mas que não te assuste quando chegar mensagem!
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}