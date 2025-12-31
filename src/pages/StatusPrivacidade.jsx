import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function StatusPrivacidade() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("contatos");
  const [allowSharing, setAllowSharing] = useState(false);
  const [facebookStories, setFacebookStories] = useState(false);
  const [instagramStories, setInstagramStories] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Privacidade do Status. Aqui você controla quem pode ver suas atualizações de status. Status são fotos ou vídeos que você publica e que ficam disponíveis por 24 horas. Você pode escolher Meus contatos, Meus contatos exceto alguns, ou Compartilhar somente com alguns contatos. Você também pode permitir que as pessoas recompartilhem suas atualizações, e pode compartilhar automaticamente no Facebook ou Instagram. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Privacidade do Status</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm text-gray-600 mb-4">Quem pode ver minhas atualizações de status</h3>
          
          <div className="space-y-3 mb-6">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selected === "contatos" ? "border-[#25D366]" : "border-gray-400"
                }`}>
                  {selected === "contatos" && (
                    <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                  )}
                </div>
                <span className="text-gray-900 text-lg">Meus contatos</span>
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selected === "contatos-exceto" ? "border-[#25D366]" : "border-gray-400"
                }`}>
                  {selected === "contatos-exceto" && (
                    <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                  )}
                </div>
                <span className="text-gray-900 text-lg">Meus contatos, exceto...</span>
              </div>
              {selected === "contatos-exceto" && (
                <span className="text-sm text-[#00a884]">0 contato excluído</span>
              )}
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selected === "somente" ? "border-[#25D366]" : "border-gray-400"
                }`}>
                  {selected === "somente" && (
                    <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                  )}
                </div>
                <span className="text-gray-900 text-lg">Compartilhar somente com...</span>
              </div>
              {selected === "somente" && (
                <span className="text-sm text-[#00a884]">0 contato incluído</span>
              )}
            </label>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-start gap-3 mb-4">
              <RefreshCw className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-gray-900 font-medium">Permitir compartilhamento</h4>
                  <div className="relative inline-block w-12 h-7">
                    <input
                      type="checkbox"
                      checked={allowSharing}
                      onChange={(e) => setAllowSharing(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-12 h-7 rounded-full ${allowSharing ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${allowSharing ? 'after:translate-x-5' : ''}`}></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Permita que as pessoas recompartilhem e encaminhem suas atualizações de status.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-sm text-gray-600 mb-3">Compartilhar em outros apps</h3>
            <p className="text-sm text-gray-700 mb-4">
              Compartilhe suas atualizações de status automaticamente no Facebook ou Instagram Stories.{" "}
              <span className="text-[#00a884]">Gerenciar na Central de Contas</span>
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-gray-900">Facebook Stories</span>
                </div>
                <div className="relative inline-block w-12 h-7">
                  <input
                    type="checkbox"
                    checked={facebookStories}
                    onChange={(e) => setFacebookStories(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-12 h-7 rounded-full ${facebookStories ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${facebookStories ? 'after:translate-x-5' : ''}`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1.5"/>
                    </svg>
                  </div>
                  <span className="text-gray-900">Instagram Stories</span>
                </div>
                <div className="relative inline-block w-12 h-7">
                  <input
                    type="checkbox"
                    checked={instagramStories}
                    onChange={(e) => setInstagramStories(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-12 h-7 rounded-full ${instagramStories ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${instagramStories ? 'after:translate-x-5' : ''}`}></div>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-4">
              As mudanças feitas nas suas configurações de privacidade não afetarão as atualizações de status que você já enviou.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}