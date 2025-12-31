import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, MessageSquare, Lock, MoreVertical } from "lucide-react";

export default function ConversasTrancadas() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Conversas trancadas. Esse recurso permite trancar conversas importantes para manter privacidade. Conversas trancadas ficam em uma pasta separada e precisam de senha ou biometria para abrir. Se você tem conversas trancadas, pode deslizar a lista para baixo ou inserir seu código secreto na barra de pesquisa para ver elas. Para destrancar e limpar, você pode excluir o código secreto, mas isso vai apagar as mensagens, fotos e vídeos dessas conversas. Clique na seta à sua esquerda acima para voltar."
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

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(createPageUrl("Privacidade"))}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 ml-4">Conversas trancadas</h1>
          </div>
          <button>
            <MoreVertical className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="relative mb-8">
              <div className="w-20 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              O recurso de trancar conversas mantém suas conversas trancadas e ocultas
            </h3>

            <p className="text-sm text-gray-600 text-center mb-2">
              Se você tem conversas trancadas, deslize a lista de conversas para baixo ou insira seu código secreto na barra de pesquisa para exibi-las.{" "}
              <span className="text-[#00a884]">Saiba mais</span>
            </p>
          </div>

          <div className="px-4 py-4 border-t-8 border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">Destrancar e limpar conversas trancadas</h4>
            <p className="text-sm text-gray-600 mb-4">
              Se você esqueceu seu código secreto, é possível excluí-lo. Essa ação destrancará as conversas trancadas e apagará as mensagens, as fotos e os vídeos dessas conversas.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}