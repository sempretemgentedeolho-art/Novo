import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Moon, Sun, Clock } from "lucide-react";

export default function ModoNoturno() {
  const navigate = useNavigate();
  const [modoNoturno, setModoNoturno] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Modo noturno. Aqui você deixa a tela escura para não cansar a vista à noite ou em lugares escuros."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const toggleModoNoturno = () => {
    setModoNoturno(!modoNoturno);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        !modoNoturno ? "Modo noturno ativado. A tela ficou escura" : "Modo noturno desativado. A tela voltou ao normal"
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);
    }
  };

  return (
    <PhoneFrame>
      <div className={`h-full flex flex-col ${modoNoturno ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <StatusBar variant={modoNoturno ? "dark" : "light"} />

        {/* Header */}
        <div className={`px-4 py-3 flex items-center gap-4 ${modoNoturno ? 'bg-gray-800' : 'bg-[#1976D2] text-white'}`}>
          <button onClick={() => navigate(createPageUrl("Configuracoes"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Modo noturno</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {/* Switch */}
          <div className={`p-4 border-b flex items-center justify-between ${modoNoturno ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              {modoNoturno ? (
                <Moon className="w-6 h-6 text-blue-400" />
              ) : (
                <Sun className="w-6 h-6 text-yellow-600" />
              )}
              <div>
                <h3 className="font-medium">Modo noturno</h3>
                <p className="text-sm opacity-70">{modoNoturno ? "Ativado" : "Desativado"}</p>
              </div>
            </div>
            <button
              onClick={toggleModoNoturno}
              className={`w-12 h-6 rounded-full transition-colors ${
                modoNoturno ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                modoNoturno ? "translate-x-6" : "translate-x-1"
              }`} />
            </button>
          </div>

          {/* Explicação */}
          <div className={`p-4 border-b ${modoNoturno ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'}`}>
            <h3 className={`font-semibold mb-2 ${modoNoturno ? 'text-blue-400' : 'text-blue-900'}`}>Para que serve?</h3>
            <p className={`text-sm ${modoNoturno ? 'text-gray-300' : 'text-blue-800'}`}>
              O modo noturno deixa a tela escura (preta ou cinza). Isso ajuda a:
            </p>
            <ul className={`mt-2 space-y-1 text-sm ${modoNoturno ? 'text-gray-300' : 'text-blue-800'}`}>
              <li>• Não cansar a vista à noite</li>
              <li>• Não atrapalhar outras pessoas no escuro</li>
              <li>• Economizar bateria</li>
            </ul>
          </div>

          {/* Como usar */}
          <div className="p-4">
            <h3 className="font-semibold mb-3">Como ativar rapidamente</h3>
            <ol className={`space-y-2 text-sm ${modoNoturno ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>1. Deslize o dedo do topo da tela para baixo</li>
              <li>2. Procure o botão com ícone de lua 🌙</li>
              <li>3. Toque nele para ligar ou desligar</li>
            </ol>
          </div>

          {/* Programar */}
          <div className={`p-4 border-t ${modoNoturno ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5" />
              <h3 className="font-semibold">Programar horário</h3>
            </div>
            <p className={`text-sm mb-3 ${modoNoturno ? 'text-gray-300' : 'text-gray-700'}`}>
              Você pode programar o modo noturno para ligar e desligar automaticamente:
            </p>
            <div className={`p-3 rounded-lg ${modoNoturno ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <p className="text-sm">
                <strong>Ligar às:</strong> 22:00 (10 da noite)
              </p>
              <p className="text-sm mt-1">
                <strong>Desligar às:</strong> 07:00 (7 da manhã)
              </p>
            </div>
          </div>

          {/* Dica */}
          <div className="p-4">
            <div className={`border-l-4 p-4 ${modoNoturno ? 'bg-gray-800 border-blue-400' : 'bg-green-50 border-green-500'}`}>
              <h3 className={`font-semibold mb-2 ${modoNoturno ? 'text-green-400' : 'text-green-900'}`}>💡 Dica</h3>
              <p className={`text-sm ${modoNoturno ? 'text-gray-300' : 'text-green-800'}`}>
                Use o modo noturno sempre que usar o celular à noite ou no escuro. Seus olhos vão agradecer!
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}