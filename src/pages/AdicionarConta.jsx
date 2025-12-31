import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, MoreVertical } from "lucide-react";

export default function AdicionarConta() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Adicionar conta. Você pode usar mais de uma conta do WhatsApp no mesmo aparelho. Leia as políticas de privacidade e os termos de serviço. Clique no botão verde abaixo Concordar e continuar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleContinue = () => {
    navigate(createPageUrl("AdicionarContaNumero"));
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <button onClick={() => navigate(createPageUrl("ContaWhatsApp"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button>
            <MoreVertical className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
          {/* Ilustração */}
          <div className="mb-8">
            <svg className="w-48 h-48" viewBox="0 0 200 200" fill="none">
              {/* Telefone */}
              <path d="M60 40 Q50 45 50 60 L50 100 Q50 115 60 120 L80 135 Q90 140 100 135 L120 120 Q130 115 130 100 L130 60 Q130 45 120 40 Z" 
                fill="#25D366" opacity="0.2" stroke="#25D366" strokeWidth="2"/>
              <circle cx="90" cy="70" r="15" fill="#25D366"/>
              
              {/* Globo */}
              <circle cx="140" cy="80" r="35" fill="#E8F5E9" stroke="#25D366" strokeWidth="2"/>
              <path d="M140 45 Q165 80 140 115 M140 45 Q115 80 140 115 M105 80 L175 80 M120 60 L160 60 M120 100 L160 100" 
                stroke="#25D366" strokeWidth="1.5" fill="none"/>
              
              {/* Envelope */}
              <rect x="90" y="130" width="60" height="40" rx="4" fill="#C8E6C9" stroke="#25D366" strokeWidth="2"/>
              <path d="M90 130 L120 155 L150 130" stroke="#25D366" strokeWidth="2" fill="none"/>
              
              {/* Coração */}
              <path d="M50 150 Q50 140 55 140 Q60 140 60 145 Q60 140 65 140 Q70 140 70 150 Q70 160 60 170 Q50 160 50 150 Z" 
                fill="#25D366"/>
              
              {/* Cadeado */}
              <rect x="155" y="145" width="25" height="30" rx="3" fill="#25D366"/>
              <circle cx="167.5" cy="140" r="8" fill="none" stroke="#25D366" strokeWidth="3"/>
              <circle cx="167.5" cy="160" r="3" fill="white"/>
            </svg>
          </div>

          {/* Título */}
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
            Adicionar conta
          </h2>

          {/* Texto */}
          <p className="text-gray-600 text-center mb-2 leading-relaxed px-4">
            Leia nossas <button className="text-[#00a884] font-medium">Políticas de Privacidade</button>. Toque em "Concordar e continuar" para aceitar os{" "}
            <button className="text-[#00a884] font-medium">Termos de Serviço</button>.
          </p>

          <div className="flex-1" />

          {/* Botão */}
          <button
            onClick={handleContinue}
            className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium text-lg"
          >
            Concordar e continuar
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}