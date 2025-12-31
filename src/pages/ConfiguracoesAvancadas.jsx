import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function ConfiguracoesAvancadas() {
  const navigate = useNavigate();
  const [blockUnknown, setBlockUnknown] = useState(false);
  const [protectIP, setProtectIP] = useState(false);
  const [disablePreview, setDisablePreview] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Configurações avançadas. Aqui estão opções extras de privacidade. Primeira opção: Bloquear mensagens de contas desconhecidas. Quando ativado, o WhatsApp bloqueia mensagens de contas que você não conhece quando elas enviam muitas mensagens. Segunda opção: Proteger endereço IP nas ligações. Isso dificulta outras pessoas descobrirem sua localização, mas as ligações podem ter menos qualidade. Terceira opção: Desativar prévia de links. Para evitar que sites de terceiros descubram seu endereço IP, o WhatsApp não vai mostrar prévia dos links compartilhados nas conversas. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Configurações avançadas</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-4">
                <h4 className="text-gray-900 mb-2 font-medium">Bloquear mensagens de contas desconhecidas</h4>
                <p className="text-sm text-gray-600">
                  Para proteger sua conta e melhorar o desempenho do dispositivo, o WhatsApp bloqueará mensagens de contas desconhecidas quando elas ultrapassarem um volume determinado.{" "}
                  <span className="text-[#00a884]">Saiba mais</span>
                </p>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={blockUnknown}
                  onChange={(e) => setBlockUnknown(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 rounded-full ${blockUnknown ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${blockUnknown ? 'after:translate-x-5' : ''}`}></div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-4">
                <h4 className="text-gray-900 mb-2 font-medium">Proteger endereço IP nas ligações</h4>
                <p className="text-sm text-gray-600">
                  Para que seja mais difícil descobrir sua localização, as ligações realizadas com este dispositivo serão retransmitidas usando diferentes servidores do WhatsApp. Esse recurso reduz a qualidade da ligação.{" "}
                  <span className="text-[#00a884]">Saiba mais</span>
                </p>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={protectIP}
                  onChange={(e) => setProtectIP(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 rounded-full ${protectIP ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${protectIP ? 'after:translate-x-5' : ''}`}></div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-4">
                <h4 className="text-gray-900 mb-2 font-medium">Desativar prévia de links</h4>
                <p className="text-sm text-gray-600">
                  Para evitar que sites de terceiros descubram seu endereço IP, o WhatsApp não exibirá a prévia dos links compartilhados na conversa.{" "}
                  <span className="text-[#00a884]">Saiba mais</span>
                </p>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={disablePreview}
                  onChange={(e) => setDisablePreview(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 rounded-full ${disablePreview ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${disablePreview ? 'after:translate-x-5' : ''}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}