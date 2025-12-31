import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Lock } from "lucide-react";

export default function BloqueioApp() {
  const navigate = useNavigate();
  const [appLockEnabled, setAppLockEnabled] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const fromCheckup = urlParams.get('from') === 'checkup';

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Bloqueio do app. Aqui você pode ativar o bloqueio do WhatsApp com sua impressão digital ou reconhecimento facial. Quando ativado, sempre que você abrir o WhatsApp, será preciso usar sua biometria para desbloquear. Isso protege suas conversas caso alguém pegue seu celular desbloqueado. No momento, o bloqueio está desativado. Clique na seta à sua esquerda acima para voltar."
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
          <button onClick={() => navigate(fromCheckup ? createPageUrl("CheckupAdicionePrivacidade") : createPageUrl("Privacidade"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Bloqueio do app</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Lock className="w-12 h-12 text-gray-400" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
              Bloqueio do app desativado
            </h3>

            <p className="text-sm text-gray-600 text-center mb-8">
              Use sua impressão digital ou reconhecimento facial para desbloquear o WhatsApp e proteger suas conversas.
            </p>

            <button
              onClick={() => setAppLockEnabled(!appLockEnabled)}
              className="bg-[#25D366] text-white px-8 py-3 rounded-lg font-medium"
            >
              Ativar bloqueio
            </button>
          </div>

          <div className="px-4 py-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Como funciona</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#25D366] mt-1">•</span>
                <span>Quando ativado, você precisará usar sua biometria sempre que abrir o WhatsApp</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#25D366] mt-1">•</span>
                <span>Você ainda poderá responder mensagens pelas notificações</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#25D366] mt-1">•</span>
                <span>O bloqueio é apenas no app, não afeta chamadas recebidas</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}