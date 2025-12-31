import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, UserCircle, Eye, CheckCheck, ChevronRight } from "lucide-react";

export default function CheckupControleDados() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Controle seus dados pessoais. Selecione quem pode ver suas informações pessoais, como sua atividade ou se você está online. Três opções: Foto do perfil - escolha quem pode ver sua foto do perfil. Visto por último e online - controle quem pode ver que você está online. Confirmações de leitura - se ativadas, as pessoas saberão quando você ler as mensagens que elas enviaram para você. Para continuar, clique na seta ao seu lado esquerdo acima."
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
                <rect x="30" y="15" width="50" height="70" rx="5" fill="#f0f0f0" stroke="#666" strokeWidth="2"/>
                <circle cx="55" cy="45" r="12" fill="#25D366"/>
                <circle cx="110" cy="40" r="25" fill="#25D366" opacity="0.7"/>
                <circle cx="110" cy="40" r="15" fill="white"/>
                <circle cx="110" cy="40" r="8" fill="#25D366"/>
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Controle seus dados pessoais
            </h2>

            <p className="text-sm text-gray-600 text-center mb-8">
              Selecione quem pode ver suas informações pessoais, como sua atividade ou se você está online.
            </p>
          </div>

          <div className="px-4 pb-6 space-y-3">
            <button
              onClick={() => navigate(createPageUrl("FotoPerfil") + "?from=checkup")}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <UserCircle className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 mb-1">Foto do perfil</h3>
                <p className="text-sm text-gray-600">
                  Escolha quem pode ver sua foto do perfil.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
            </button>

            <button
              onClick={() => navigate(createPageUrl("VistoUltimo") + "?from=checkup")}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Eye className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 mb-1">Visto por último e online</h3>
                <p className="text-sm text-gray-600">
                  Controle quem pode ver que você está online.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
            </button>

            <button
              onClick={() => navigate(createPageUrl("CheckupPrivacidade"))}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCheck className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 mb-1">Confirmações de leitura</h3>
                <p className="text-sm text-gray-600">
                  Se ativadas, as pessoas saberão quando você ler as mensagens que elas enviaram para você.
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