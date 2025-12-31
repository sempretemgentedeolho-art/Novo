import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Fingerprint, Clock, HardDrive, ChevronRight } from "lucide-react";

export default function CheckupAdicionePrivacidade() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Adicione mais privacidade às suas conversas. Use esses recursos de privacidade para limitar o acesso às suas mensagens e mídias e aumente ainda mais sua privacidade. Três opções: Bloqueio do app - configure o reconhecimento facial ou uma impressão digital para abrir o WhatsApp no seu dispositivo. Duração padrão - inicie conversas com mensagens temporárias que desaparecerão após a duração que você definir. Backups criptografados de ponta a ponta - use o backup criptografado para que ninguém, nem mesmo o Google ou o WhatsApp, consiga acessar suas conversas. Para continuar, clique na seta ao seu lado esquerdo acima."
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
          <button onClick={() => navigate(createPageUrl("CheckupPrivacidade"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Checkup de Privacidade</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col items-center py-8 px-6">
            <div className="mb-6">
              <svg className="w-32 h-32" viewBox="0 0 150 100">
                <rect x="40" y="25" width="35" height="50" rx="5" fill="#e0ffe0" stroke="#25D366" strokeWidth="2"/>
                <circle cx="57.5" cy="50" r="8" fill="#25D366"/>
                <rect x="90" y="35" width="40" height="30" rx="5" fill="#25D366"/>
                <circle cx="110" cy="50" r="8" fill="white"/>
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Adicione mais privacidade às suas conversas
            </h2>

            <p className="text-sm text-gray-600 text-center mb-8">
              Use esses recursos de privacidade para limitar o acesso às suas mensagens e mídias e aumente ainda mais sua privacidade.
            </p>
          </div>

          <div className="px-4 pb-6 space-y-3">
            <button
              onClick={() => navigate(createPageUrl("BloqueioApp"))}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Fingerprint className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 mb-1">Bloqueio do app</h3>
                <p className="text-sm text-gray-600">
                  Configure o reconhecimento facial ou uma impressão digital para abrir o WhatsApp no seu dispositivo.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
            </button>

            <button
              onClick={() => navigate(createPageUrl("DuracaoPadrao"))}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Clock className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 mb-1">Duração padrão</h3>
                <p className="text-sm text-gray-600">
                  Inicie conversas com mensagens temporárias que desaparecerão após a duração que você definir.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
            </button>

            <button
              onClick={() => navigate(createPageUrl("AdicionarCamadaSeguranca"))}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <HardDrive className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 mb-1">Backups criptografados de ponta a ponta</h3>
                <p className="text-sm text-gray-600">
                  Use o backup criptografado de ponta a ponta para que ninguém, nem mesmo o Google ou o WhatsApp, consiga acessar suas conversas.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}