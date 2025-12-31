import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Send, Info } from "lucide-react";

export default function ListasTransmissao() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Listas de transmissão. Aqui você pode criar listas para enviar a mesma mensagem para várias pessoas ao mesmo tempo, sem precisar criar um grupo. É muito útil! Por exemplo, você pode criar uma lista com seus filhos, outra com seus amigos. Quando você mandar uma mensagem na lista, cada pessoa recebe como se fosse uma conversa individual. As pessoas não veem quem mais recebeu a mensagem. Importante: só as pessoas que têm seu número salvo vão receber. No rodapé tem uma explicação: Apenas contatos com o seu número salvo receberão mensagens de transmissão. Clique em Nova lista para criar sua primeira lista de transmissão. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("ConfiguracoesWhatsApp"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Listas de transmissão</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Info card */}
          <div className="bg-blue-50 mx-4 mt-4 rounded-lg p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">O que são listas de transmissão?</h3>
              <p className="text-sm text-gray-700">
                Envie a mesma mensagem para vários contatos de uma vez. Cada pessoa recebe a mensagem individualmente como uma conversa particular.
              </p>
            </div>
          </div>

          {/* Empty state */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 mt-12">
            <div className="w-24 h-24 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-6">
              <Send className="w-12 h-12 text-[#25D366]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Nenhuma lista ainda
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-sm">
              Crie uma lista de transmissão para enviar mensagens para várias pessoas ao mesmo tempo
            </p>
            <button className="bg-[#25D366] text-white px-8 py-3 rounded-full font-medium">
              Nova lista
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            Apenas contatos com o seu número salvo receberão mensagens de transmissão
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}