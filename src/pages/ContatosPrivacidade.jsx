import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function ContatosPrivacidade() {
  const navigate = useNavigate();
  const [whatsappContacts, setWhatsappContacts] = useState(true);
  const urlParams = new URLSearchParams(window.location.search);
  const fromCheckup = urlParams.get('from') === 'checkup';

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Contatos. Aqui você gerencia contatos bloqueados e configurações de contatos do WhatsApp. Na seção Bloqueados, você pode ver a lista de 25 contatos bloqueados. Em Contatos do WhatsApp, quando ativado, seus contatos ficam salvos na sua conta do WhatsApp e podem ser gerenciados em vários dispositivos. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Contatos</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <button className="w-full px-4 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="text-left">
              <h4 className="text-gray-900 font-medium mb-1">Bloqueados</h4>
              <p className="text-sm text-gray-600">25</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <div className="px-4 py-4 border-b-8 border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h4 className="text-gray-900 mb-2 font-medium">Contatos do WhatsApp</h4>
                <p className="text-sm text-gray-600">
                  Os contatos estão salvos na sua conta do WhatsApp e podem ser gerenciados em vários dispositivos.{" "}
                  <span className="text-[#00a884]">Saiba mais</span>
                </p>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={whatsappContacts}
                  onChange={(e) => setWhatsappContacts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 rounded-full ${whatsappContacts ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${whatsappContacts ? 'after:translate-x-5' : ''}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}