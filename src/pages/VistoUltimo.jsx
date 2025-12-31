import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function VistoUltimo() {
  const navigate = useNavigate();
  const [whoCanSee, setWhoCanSee] = useState("ninguem");
  const [whoCanSeeOnline, setWhoCanSeeOnline] = useState("todos");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Visto por último e online. Aqui você controla quem pode ver quando você usou o WhatsApp pela última vez e se você está online agora. Você pode escolher Todos, Meus contatos, Meus contatos exceto alguns, ou Ninguém. Atenção: se você escolher Ninguém, você também não poderá ver quando outras pessoas estão online. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Visto por último e online</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm text-gray-600 mb-4">Quem pode ver meu "visto por último"</h3>
          
          <div className="space-y-3 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                whoCanSee === "todos" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {whoCanSee === "todos" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">Todos</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                whoCanSee === "contatos" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {whoCanSee === "contatos" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">Meus contatos</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                whoCanSee === "contatos-exceto" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {whoCanSee === "contatos-exceto" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">Meus contatos, exceto...</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                whoCanSee === "ninguem" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {whoCanSee === "ninguem" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">Ninguém</span>
            </label>
          </div>

          <h3 className="text-sm text-gray-600 mb-4 mt-8">Quem pode ver quando estou online</h3>
          
          <div className="space-y-3 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                whoCanSeeOnline === "todos" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {whoCanSeeOnline === "todos" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">Todos</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                whoCanSeeOnline === "mesmo" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {whoCanSeeOnline === "mesmo" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">Mesmo que "visto por último"</span>
            </label>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            Se você não compartilhar suas informações "visto por último" e "online", as informações das outras pessoas não serão exibidas para você.
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}