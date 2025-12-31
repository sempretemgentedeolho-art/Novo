import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Shield, Fingerprint, Smartphone } from "lucide-react";

export default function ChavesAcesso() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Chaves de acesso. Acesso seguro e proteção da conta. Crie uma chave de acesso para ter um jeito fácil e seguro de entrar na sua conta novamente. Acesse sua conta do WhatsApp usando sua impressão digital, o reconhecimento facial ou o código de bloqueio da tela. A chave de acesso é armazenada com segurança no gerenciador de senhas do dispositivo. Clique abaixo em criar chave de acesso."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleCreateKey = () => {
    setShowDialog(true);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Gerenciador de senhas do Google. Criar chave de acesso para fazer login no aplicativo WhatsApp. A chave de acesso será salva no gerenciador de senhas do Google. Você pode usá-la em outros dispositivos. O bloqueio de tela será usado para criptografar seus dados. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("ContaWhatsApp"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Chaves de acesso</h1>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          {/* Ícone */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <div className="relative">
                <Shield className="w-12 h-12 text-green-600" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Título */}
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-4">
            Acesso seguro e proteção da conta
          </h2>

          {/* Itens informativos */}
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed">
                  Crie uma chave de acesso para ter um jeito fácil e seguro de entrar na sua conta novamente.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Fingerprint className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed">
                  Acesse sua conta do WhatsApp usando sua impressão digital, o reconhecimento facial ou o código de bloqueio da tela.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed">
                  A chave de acesso é armazenada com segurança no gerenciador de senhas do dispositivo.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1" />

          {/* Botão criar */}
          <button
            onClick={handleCreateKey}
            className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium text-lg"
          >
            Criar chave de acesso
          </button>
        </div>

        {/* Dialog do Google */}
        {showDialog && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium text-gray-700">Gerenciador de Senhas do Google</span>
                </div>
                <button onClick={() => setShowDialog(false)} className="text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Criar chave de acesso para fazer login no app WhatsApp?
              </h3>

              <p className="text-gray-600 text-center mb-6 text-sm">
                A chave de acesso será salva no Gerenciador de senhas do Google da conta belvanforrati@gmail.com. Você pode usá-la em outros dispositivos. O bloqueio de tela será usado para criptografar seus dados.
              </p>

              <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center gap-3">
                <Fingerprint className="w-6 h-6 text-gray-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">*********1955</p>
                  <p className="text-xs text-gray-600">Chave de acesso</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDialog(false)}
                  className="flex-1 py-3 text-[#1a73e8] font-medium"
                >
                  Salvar de outra forma
                </button>
                <button
                  onClick={() => setShowDialog(false)}
                  className="flex-1 py-3 bg-[#1a73e8] text-white rounded-lg font-medium"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}