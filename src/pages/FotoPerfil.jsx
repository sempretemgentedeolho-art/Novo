import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function FotoPerfil() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("todos");
  const urlParams = new URLSearchParams(window.location.search);
  const fromCheckup = urlParams.get('from') === 'checkup';

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Foto do perfil. Aqui você escolhe quem pode ver sua foto de perfil do WhatsApp. Você pode escolher Todos para que qualquer pessoa veja sua foto, Meus contatos para que só seus contatos vejam, Meus contatos exceto alguns para escolher quem não deve ver, ou Ninguém para que ninguém veja sua foto. Clique na seta à sua esquerda acima para voltar."
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
          <button onClick={() => navigate(fromCheckup ? createPageUrl("CheckupControleDados") : createPageUrl("Privacidade"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Foto do perfil</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm text-gray-600 mb-4">Quem pode ver minha foto do perfil</h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === "todos" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {selected === "todos" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">Todos</span>
            </label>

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
                selected === "contatos-exceto" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {selected === "contatos-exceto" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">Meus contatos, exceto...</span>
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
        </div>
      </div>
    </PhoneFrame>
  );
}