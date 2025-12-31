import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function DuracaoPadrao() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("desativada");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Duração padrão. Aqui você define quanto tempo as mensagens temporárias ficam disponíveis antes de desaparecer automaticamente. Mensagens temporárias são mensagens que se apagam sozinhas depois de um tempo. Você pode escolher 24 horas, 7 dias, 90 dias, ou Desativada para que as mensagens não desapareçam. Atenção: essa configuração não afeta conversas que já existem, somente conversas novas. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Duração padrão</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-sm text-gray-700 mb-6">
            Inicie novas conversas com a duração das mensagens temporárias definida para
          </p>
          
          <div className="space-y-3 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === "24h" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {selected === "24h" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">24 horas</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === "7dias" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {selected === "7dias" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">7 dias</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === "90dias" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {selected === "90dias" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">90 dias</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === "desativada" ? "border-[#25D366]" : "border-gray-400"
              }`}>
                {selected === "desativada" && (
                  <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                )}
              </div>
              <span className="text-gray-900 text-lg">Desativada</span>
            </label>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            Enquanto essa opção estiver ativada, todas as mensagens em novas conversas individuais desaparecerão após o período selecionado. Essa configuração não afetará conversas já existentes.{" "}
            <span className="text-[#00a884]">Saiba mais</span>
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}