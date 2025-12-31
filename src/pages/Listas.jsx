import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Plus, Users, Search } from "lucide-react";

export default function Listas() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Listas. Aqui você organiza suas conversas em listas personalizadas. Por exemplo, você pode criar uma lista chamada Família, outra chamada Amigos, outra chamada Trabalho. Assim fica mais fácil encontrar as conversas importantes. No topo da tela, à direita, tem um botão de mais para criar uma nova lista. Abaixo você vê suas listas criadas. Se não tiver nenhuma lista ainda, a tela estará vazia. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(createPageUrl("ConfiguracoesWhatsApp"))}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Listas</h1>
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center">
            <Plus className="w-6 h-6 text-[#25D366]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Search bar */}
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg px-4 py-3 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar listas"
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Empty state */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <Users className="w-24 h-24 text-gray-300 mb-6" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Organize suas conversas
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Crie listas para agrupar conversas por família, amigos, trabalho e muito mais.
            </p>
            <button className="bg-[#25D366] text-white px-8 py-3 rounded-full font-medium">
              Criar lista
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}