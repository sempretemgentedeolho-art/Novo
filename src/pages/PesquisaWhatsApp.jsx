import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Search, Sparkles } from "lucide-react";

export default function PesquisaWhatsApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Esta é a barra de pesquisa do WhatsApp. Aqui você pode fazer duas coisas importantes. Primeira: pesquisar conversas, contatos ou mensagens antigas. Segunda: perguntar para a Meta AI, que é uma inteligência artificial que responde perguntas."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Para pesquisar conversas: toque na barra e digite o nome da pessoa ou grupo. O WhatsApp mostra todas as conversas com esse nome."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.80;
        synth.speak(utter2);
      }, 10000);

      setTimeout(() => {
        const utter3 = new SpeechSynthesisUtterance(
          "Para usar a Meta AI: toque na barra e faça uma pergunta. Exemplo: Como faço bolo de cenoura? A inteligência artificial responde para você."
        );
        utter3.lang = "pt-BR";
        utter3.rate = 0.80;
        synth.speak(utter3);
      }, 18000);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("WhatsApp"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Barra de Pesquisa</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* O que é */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-[#25D366]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">O que é?</h3>
            <p className="text-gray-700 leading-relaxed">
              A barra de pesquisa fica no topo da tela principal do WhatsApp e serve para encontrar conversas rapidamente ou fazer perguntas à inteligência artificial.
            </p>
          </div>

          {/* Duas funções */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">Duas formas de usar</h3>
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-5 h-5 text-blue-700" />
                <h4 className="font-semibold text-blue-900">1. Pesquisar conversas</h4>
              </div>
              <p className="text-sm text-blue-800 pl-7">
                Digite o nome de uma pessoa ou grupo para encontrar conversas antigas. Útil quando você precisa achar uma conversa específica.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-blue-700" />
                <h4 className="font-semibold text-blue-900">2. Perguntar à Meta AI</h4>
              </div>
              <p className="text-sm text-blue-800 pl-7">
                Faça perguntas como: "Como fazer arroz?", "Que horas são?", "O que é WhatsApp?". A inteligência artificial responde suas dúvidas.
              </p>
            </div>
          </div>

          {/* Como usar */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Como usar</h3>
            <ol className="space-y-2 text-sm text-green-800">
              <li>1. Toque na barra de pesquisa (onde está escrito "Pergunte à Meta AI ou pesquise")</li>
              <li>2. Digite o que você procura ou a pergunta</li>
              <li>3. Toque em uma conversa para abri-la, ou veja a resposta da Meta AI</li>
            </ol>
          </div>

          {/* Dica especial */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
            <h3 className="font-semibold text-purple-900 mb-2">💡 Dica especial</h3>
            <p className="text-sm text-purple-800">
              Se você não encontrar o que procura, tente escrever de forma diferente. Exemplo: ao invés de "João", tente "João Silva" ou apenas "Silva".
            </p>
          </div>
        </div>

        {/* Botão voltar */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => navigate(createPageUrl("WhatsApp"))}
            className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium"
          >
            Voltar ao WhatsApp
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}