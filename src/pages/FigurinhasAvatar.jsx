import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function FigurinhasAvatar() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("contatos");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Figurinhas de avatar. Aqui você controla quem pode usar figurinhas com seu avatar nas conversas. Avatar é um bonequinho personalizado que representa você. Você pode escolher Meus contatos para que seus contatos possam usar figurinhas do seu avatar, Contatos selecionados para escolher quem pode usar, ou Ninguém para que ninguém possa usar. Atenção: se você e outra pessoa ativarem essa opção, vocês poderão usar figurinhas dos avatares de vocês juntos na conversa. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Figurinhas de avatar</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm text-gray-600 mb-4">Quem pode usar figurinhas com meu avatar</h3>
          
          <div className="space-y-3 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === "contatos" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {selected === "contatos" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">Meus contatos</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === "selecionados" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {selected === "selecionados" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">Contatos selecionados...</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === "ninguem" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {selected === "ninguem" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">Ninguém</span>
            </label>
          </div>

          <p className="text-sm text-gray-600">
            Se você e a outra pessoa ativarem essa opção, vocês poderão usar figurinhas dos seus avatares juntos na conversa.
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}