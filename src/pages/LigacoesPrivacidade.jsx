import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function LigacoesPrivacidade() {
  const navigate = useNavigate();
  const [silenceUnknown, setSilenceUnknown] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const fromCheckup = urlParams.get('from') === 'checkup';

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Ligações. Aqui você pode silenciar números desconhecidos. Quando essa opção está ativada, ligações de números que não estão na sua lista de contatos ficarão silenciosas. Elas ainda vão aparecer na aba Ligações e nas notificações, mas não vão tocar. É útil para evitar ligações de números que você não conhece. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(fromCheckup ? createPageUrl("CheckupDefinaQuem") : createPageUrl("Privacidade"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Ligações</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h4 className="text-gray-900 mb-2 font-medium">Silenciar números desconhecidos</h4>
              <p className="text-sm text-gray-600 mb-1">
                As ligações de números de telefone desconhecidos serão silenciadas. Elas ainda aparecerão na aba Ligações e nas notificações.{" "}
                <span className="text-[#00a884]">Saiba mais</span>
              </p>
            </div>
            <div className="relative inline-block w-12 h-7 flex-shrink-0">
              <input
                type="checkbox"
                checked={silenceUnknown}
                onChange={(e) => setSilenceUnknown(e.target.checked)}
                className="sr-only peer"
              />
              <div className={`w-12 h-7 rounded-full ${silenceUnknown ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${silenceUnknown ? 'after:translate-x-5' : ''}`}></div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}