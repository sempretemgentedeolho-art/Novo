import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Shield, Key, Mail, ChevronRight } from "lucide-react";

export default function CheckupProtecaoConta() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Adicione mais proteção à sua conta. Adicione uma camada extra de segurança para ajudar a proteger sua conta. Três opções: Confirmação em duas etapas - crie um PIN que será solicitado para confirmar seu número de telefone no WhatsApp. Chaves de acesso - use o reconhecimento facial, a impressão digital ou a senha do dispositivo para acessar o WhatsApp. Email de recuperação - adicione um email confiável para ajudar a acessar sua conta do WhatsApp. Para continuar, clique na seta ao seu lado esquerdo acima."
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
              <svg className="w-32 h-32" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="35" fill="#25D366"/>
                <circle cx="60" cy="60" r="30" fill="white"/>
                <path d="M 60 40 L 50 60 L 70 60 Z" fill="#25D366"/>
                <rect x="55" y="60" width="10" height="15" fill="#25D366"/>
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Adicione mais proteção à sua conta
            </h2>

            <p className="text-sm text-gray-600 text-center mb-8">
              Adicione uma camada extra de segurança para ajudar a proteger sua conta.
            </p>
          </div>

          <div className="px-4 pb-6 space-y-3">
            <button
              onClick={() => navigate(createPageUrl("ConfirmacaoDuasEtapas") + "?from=checkup")}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 mb-1">Confirmação em duas etapas</h3>
                <p className="text-sm text-gray-600">
                  Crie um PIN que será solicitado para confirmar seu número de telefone no WhatsApp.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
            </button>

            <button
              onClick={() => navigate(createPageUrl("ChavesAcesso") + "?from=checkup")}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Key className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 mb-1">Chaves de acesso</h3>
                <p className="text-sm text-gray-600">
                  Use o reconhecimento facial, a impressão digital ou a senha do dispositivo para acessar o WhatsApp.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
            </button>

            <button
              onClick={() => navigate(createPageUrl("EnderecoEmail") + "?from=checkup")}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Mail className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 mb-1">Email de recuperação</h3>
                <p className="text-sm text-gray-600">
                  Adicione um email confiável para ajudar a acessar sua conta do WhatsApp.
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