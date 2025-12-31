import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Lock, Key, EyeOff } from "lucide-react";

export default function AdicionarCamadaSeguranca() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Adicionar uma camada extra de segurança. Seu backup ficará sempre protegido, mesmo se você perder seu dispositivo. Use uma chave de acesso, senha ou chave de criptografia para proteger seu backup. Ninguém mais poderá acessar seu backup, nem mesmo o WhatsApp ou o Google. Seu backup atual tem 1,1 gigabytes, incluindo 1,0 gigabytes de mídias. Para usar chave de acesso, clique no botão verde. Clique na seta acima à esquerda para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleUsarChave = () => {
    setShowDialog(true);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Salvar backup com chave de acesso. Use sua impressão digital, o reconhecimento facial ou o código de bloqueio do app para confirmar sua identidade e acessar seu backup. As chaves de acesso são armazenadas no seu gerenciador de senhas e podem estar sujeitas a outras medidas de segurança. Clique em Criar chave de acesso."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleCriarChave = () => {
    navigate(createPageUrl("UsarChaveAcesso"));
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("CheckupAdicionePrivacidade"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col items-center py-8 px-6">
            <div className="mb-6">
              <svg className="w-32 h-32" viewBox="0 0 150 100">
                <rect x="50" y="20" width="60" height="50" rx="8" fill="#25D366"/>
                <circle cx="40" cy="45" r="20" fill="#f0f0f0" stroke="#888" strokeWidth="2"/>
                <circle cx="40" cy="45" r="10" fill="#888"/>
                <circle cx="120" cy="70" r="15" fill="white" stroke="#888" strokeWidth="2"/>
                <path d="M 115 70 L 118 73 L 125 66" stroke="#888" strokeWidth="2" fill="none"/>
              </svg>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
              Adicionar uma camada extra de segurança
            </h2>

            <div className="space-y-4 w-full mb-8">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-gray-700 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-700">
                  Seu backup ficará sempre protegido, mesmo se você perder seu dispositivo.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Key className="w-5 h-5 text-gray-700 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-700">
                  Use uma chave de acesso, senha ou chave de criptografia para proteger seu backup.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <EyeOff className="w-5 h-5 text-gray-700 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-700">
                  Ninguém mais poderá acessar seu backup, nem mesmo o WhatsApp ou o Google.
                </p>
              </div>
            </div>

            <p className="text-center text-sm text-gray-700 mb-6">
              Seu backup atual tem <span className="font-semibold">1,1 GB</span>, incluindo{" "}
              <span className="font-semibold">1,0 GB de mídias</span>.
            </p>
          </div>

          <div className="px-6 pb-6 space-y-3">
            <button
              onClick={handleUsarChave}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium text-lg"
            >
              Usar chave de acesso
            </button>

            <button className="w-full bg-white text-[#25D366] border border-[#25D366] py-3 rounded-lg font-medium text-lg">
              Mais opções
            </button>
          </div>
        </div>

        {showDialog && (
          <div className="absolute inset-0 bg-white flex flex-col">
            <StatusBar variant="light" />
            
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <div className="w-24 h-24 bg-[#25D366] rounded-full flex items-center justify-center mb-6">
                  <Key className="w-12 h-12 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Salvar backup com chave de acesso
                </h3>

                <p className="text-sm text-gray-600 text-center mb-8">
                  Use sua impressão digital, o reconhecimento facial ou o código de bloqueio do app para confirmar sua identidade e acessar seu backup. As chaves de acesso são armazenadas no seu gerenciador de senhas e podem estar sujeitas a outras medidas de segurança.
                </p>
              </div>

              <div className="px-6 pb-6 space-y-3">
                <button
                  onClick={handleCriarChave}
                  className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium text-lg"
                >
                  Criar chave de acesso
                </button>

                <button
                  onClick={() => setShowDialog(false)}
                  className="w-full text-[#25D366] py-3 rounded-lg font-medium text-lg"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}