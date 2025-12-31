import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { X, ArrowLeft } from "lucide-react";

export default function UsarChaveAcesso() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Gerenciador de Senhas do Google. Criar chave de acesso para fazer login no app WhatsApp. A chave de acesso será salva no Gerenciador de senhas do Google da conta. Você pode usá-la em outros dispositivos. O bloqueio de tela será usado para criptografar seus dados. Sua chave de acesso está pronta. Clique em Continuar para finalizar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleContinuar = () => {
    setShowSuccess(true);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Chave de acesso criada com sucesso! Agora seu backup está protegido. Clique na seta à esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  if (showSuccess) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
            <button onClick={() => navigate(createPageUrl("CheckupAdicionePrivacidade"))}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-24 h-24 bg-[#25D366] rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
              Chave de acesso criada!
            </h3>

            <p className="text-sm text-gray-600 text-center">
              Seu backup agora está protegido com chave de acesso. Somente você poderá acessá-lo usando sua biometria ou código do dispositivo.
            </p>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="absolute inset-0 bg-white z-50">
          <div className="flex flex-col h-full">
            <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-medium text-gray-700 text-sm">Gerenciador de Senhas do Google</span>
              </div>
              <button onClick={() => navigate(createPageUrl("AdicionarCamadaSeguranca"))}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Criar chave de acesso para fazer login no app WhatsApp?
              </h3>

              <p className="text-sm text-gray-600 text-center mb-8">
                A chave de acesso será salva no Gerenciador de senhas do Google. Você pode usá-la em outros dispositivos. O bloqueio de tela será usado para criptografar seus dados.
              </p>

              <div className="bg-blue-50 rounded-lg p-4 w-full mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">*********1955</p>
                  <p className="text-xs text-gray-600">Chave de acesso</p>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => navigate(createPageUrl("AdicionarCamadaSeguranca"))}
                className="flex-1 py-3 text-[#1a73e8] font-medium"
              >
                Salvar de outra forma
              </button>
              <button
                onClick={handleContinuar}
                className="flex-1 py-3 bg-[#1a73e8] text-white rounded-lg font-medium"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}