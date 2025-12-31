import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Phone, User, MessageSquare, ShieldCheck, ChevronRight } from "lucide-react";

export default function CheckupPrivacidade() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Checkup de Privacidade. Sua privacidade é importante. Controle suas configurações de privacidade e configure o WhatsApp do seu jeito. Aqui você tem quatro opções principais. Primeira: Defina quem pode entrar em contato com você. Segunda: Controle seus dados pessoais. Terceira: Adicione mais privacidade às suas conversas. Quarta: Adicione mais proteção à sua conta. Clique em cada opção para configurar. Para voltar, clique na seta à sua esquerda acima."
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
          <button onClick={() => navigate(createPageUrl("Privacidade"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Checkup de Privacidade</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col items-center py-8 px-6">
            <div className="mb-6">
              <svg className="w-32 h-32" viewBox="0 0 200 120">
                <circle cx="40" cy="60" r="35" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
                <line x1="40" y1="60" x2="70" y2="60" stroke="#333" strokeWidth="3"/>
                <rect x="80" y="30" width="50" height="60" rx="10" fill="#d4f4dd" stroke="#25D366" strokeWidth="2"/>
                <circle cx="105" cy="55" r="8" fill="#25D366"/>
                <rect x="92" y="70" width="26" height="4" fill="#888"/>
                <circle cx="150" cy="50" r="25" fill="#25D366"/>
                <path d="M 150 40 L 145 50 L 155 50 Z" fill="white"/>
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Sua privacidade é importante
            </h2>

            <p className="text-sm text-gray-600 text-center mb-8">
              Controle suas configurações de privacidade e configure o WhatsApp do seu jeito.
            </p>
          </div>

          <div className="px-4 pb-6 space-y-3">
            <button
              onClick={() => navigate(createPageUrl("CheckupDefinaQuem"))}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900">Defina quem pode entrar em contato com você</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </button>

            <button
              onClick={() => navigate(createPageUrl("CheckupControleDados"))}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900">Controle seus dados pessoais</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </button>

            <button
              onClick={() => navigate(createPageUrl("CheckupAdicionePrivacidade"))}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900">Adicione mais privacidade às suas conversas</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </button>

            <button
              onClick={() => navigate(createPageUrl("CheckupProtecaoConta"))}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900">Adicione mais proteção à sua conta</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </button>
          </div>

          <div className="px-6 pb-6 text-center">
            <p className="text-xs text-gray-500">
              Acesse <span className="font-medium">Configurações {'>'} Privacidade</span> para mais configurações de privacidade.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}