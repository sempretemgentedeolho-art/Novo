import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function ConfirmacaoDuasEtapas() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const fromCheckup = urlParams.get('from') === 'checkup';

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Confirmação em duas etapas. Para mais segurança, ative a confirmação em duas etapas, que solicitará um PIN quando você confirmar seu número de telefone no WhatsApp novamente. Clique no botão Ativar abaixo para configurar seu PIN. Clique na seta à sua esquerda acima para voltar."
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
          <button onClick={() => navigate(fromCheckup ? createPageUrl("CheckupProtecaoConta") : createPageUrl("ContaWhatsApp"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Confirmação em duas etapas</h1>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
            <div className="mb-8">
              <div className="bg-[#25D366] rounded-lg px-6 py-3 flex items-center justify-center gap-1">
                <span className="text-white text-3xl">★ ★ ★</span>
              </div>
            </div>

            <p className="text-center text-gray-700 mb-2 px-4">
              Para mais segurança, ative a confirmação em duas etapas, que solicitará um PIN quando você confirmar seu número de telefone no WhatsApp novamente.
            </p>
            
            <button className="text-[#00a884] font-medium">
              Saiba mais
            </button>
          </div>

          <div className="px-6 pb-6">
            <button className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium text-lg">
              Ativar
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}