import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Users, PhoneOff, UserX, ChevronRight } from "lucide-react";

export default function CheckupDefinaQuem() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Defina quem pode entrar em contato com você. Você controla sua privacidade. Escolha quem pode entrar em contato com você e pare de receber mensagens e ligações indesejadas. Três opções: Grupos - defina se qualquer pessoa pode adicionar você a grupos ou apenas seus contatos. Silenciar números desconhecidos - não receba ligações de números desconhecidos. Contatos bloqueados - selecione contatos de quem você não deseja receber ligações, mensagens e atualizações de status. Para continuar, clique na seta ao seu lado esquerdo acima."
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
                <rect x="20" y="20" width="35" height="50" rx="5" fill="#e0e0e0" stroke="#666" strokeWidth="2"/>
                <circle cx="37.5" cy="50" r="8" fill="#888"/>
                <circle cx="75" cy="35" r="20" fill="#25D366"/>
                <path d="M 75 28 L 70 38 L 80 38 Z" fill="white"/>
                <circle cx="110" cy="55" r="18" fill="#25D366"/>
                <path d="M 110 48 L 105 58 L 115 58 Z" fill="white"/>
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Defina quem pode entrar em contato com você
            </h2>

            <p className="text-sm text-gray-600 text-center mb-8">
              Você controla sua privacidade. Escolha quem pode entrar em contato com você e pare de receber mensagens e ligações indesejadas.
            </p>
          </div>

          <div className="px-4 pb-6 space-y-3">
            <button
              onClick={() => navigate(createPageUrl("GruposPrivacidade"))}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 mb-1">Grupos</h3>
                <p className="text-sm text-gray-600">
                  Defina se qualquer pessoa pode adicionar você a grupos ou apenas seus contatos.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
            </button>

            <button
              onClick={() => navigate(createPageUrl("LigacoesPrivacidade"))}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <PhoneOff className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 mb-1">Silenciar números desconhecidos</h3>
                <p className="text-sm text-gray-600">
                  Não receba ligações de números desconhecidos.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
            </button>

            <button
              onClick={() => navigate(createPageUrl("ContatosPrivacidade"))}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <UserX className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 mb-1">Contatos bloqueados</h3>
                <p className="text-sm text-gray-600">
                  Selecione contatos de quem você não deseja receber ligações, mensagens e atualizações de status.
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