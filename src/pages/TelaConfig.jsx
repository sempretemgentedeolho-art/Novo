import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Sun, Clock, RotateCw, ChevronRight } from "lucide-react";

export default function TelaConfig() {
  const navigate = useNavigate();
  const [brilho, setBrilho] = useState(50);
  const [tempoDesligar, setTempoDesligar] = useState("1 minuto");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Configurações de tela. Aqui você ajusta o brilho, o tempo para a tela desligar e a rotação automática."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-[#1976D2] text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("Configuracoes"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Tela</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {/* Brilho */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <Sun className="w-6 h-6 text-yellow-600" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Brilho da tela</h3>
                <p className="text-sm text-gray-600">{brilho}%</p>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={brilho}
              onChange={(e) => setBrilho(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Escuro</span>
              <span>Claro</span>
            </div>
          </div>

          {/* Explicação brilho */}
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Brilho da tela</h3>
            <p className="text-sm text-blue-800">
              • <strong>Mais claro:</strong> Melhor em lugares com sol<br/>
              • <strong>Mais escuro:</strong> Economiza bateria e não cansa a vista à noite
            </p>
          </div>

          {/* Tempo para desligar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Tempo limite da tela</h3>
                <p className="text-sm text-gray-600">{tempoDesligar}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Explicação tempo */}
          <div className="p-4 bg-green-50 border-b border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">Tempo limite da tela</h3>
            <p className="text-sm text-green-800 mb-2">
              É quanto tempo a tela fica ligada sem você tocar nela. Depois desse tempo, a tela apaga sozinha.
            </p>
            <p className="text-sm text-green-800">
              <strong>Opções:</strong> 15 segundos, 30 segundos, 1 minuto, 2 minutos, 5 minutos, 10 minutos
            </p>
          </div>

          {/* Rotação automática */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RotateCw className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Girar tela automaticamente</h3>
                  <p className="text-sm text-gray-600">Desativado</p>
                </div>
              </div>
              <button className="w-12 h-6 rounded-full bg-gray-300">
                <div className="w-5 h-5 bg-white rounded-full shadow-md transform translate-x-1" />
              </button>
            </div>
          </div>

          {/* Explicação rotação */}
          <div className="p-4 bg-purple-50 border-b border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">Girar tela automaticamente</h3>
            <p className="text-sm text-purple-800">
              Quando ativado, a tela gira automaticamente quando você vira o celular de lado (útil para ver vídeos ou fotos).
            </p>
          </div>

          {/* Dicas */}
          <div className="p-4 space-y-3">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="font-semibold text-green-900 mb-2">💡 Dicas</h3>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Diminua o brilho para economizar bateria</li>
                <li>• Tempo curto (30s-1min) economiza mais bateria</li>
                <li>• Aumente o tempo se a tela apaga muito rápido</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Lembre-se</h3>
              <p className="text-sm text-yellow-800">
                Você pode ajustar o brilho rapidamente deslizando do topo da tela para baixo e usando o controle que aparece.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}