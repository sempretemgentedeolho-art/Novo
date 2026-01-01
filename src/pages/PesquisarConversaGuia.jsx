import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Search, MessageCircle } from "lucide-react";

export default function PesquisarConversaGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Pesquisar na Conversa. Esta função é muito útil! Ela serve para você procurar uma palavra ou frase dentro da conversa com alguém. Deixa eu dar um exemplo bem prático. Imagine que há duas semanas atrás, seu filho te mandou o endereço de uma farmácia. Mas agora você não lembra onde está essa mensagem. Seria muito cansativo ficar rolando a conversa toda para trás, procurando. Com a pesquisa, é muito mais fácil! Você digita a palavra farmácia, e o WhatsApp mostra todas as vezes que a palavra farmácia apareceu na conversa. Aí é só tocar no resultado certo e pronto! Como usar. Passo um: Abra a conversa com a pessoa. Passo dois: Toque nos 3 pontinhos no topo da tela. Passo três: Escolha Pesquisar. Passo quatro: Digite a palavra que você quer encontrar. Passo cinco: O WhatsApp mostra todas as mensagens que têm aquela palavra. Passo seis: Toque na mensagem que você quer para ir direto até ela. Exemplos de quando usar. Procurar um endereço que te mandaram. Encontrar aquele nome de remédio que alguém te indicou. Achar uma receita que compartilharam com você. Localizar um número de telefone que te passaram. A pesquisa economiza muito tempo! Em vez de ficar rolando a conversa, você acha na hora. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.73;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-[#008069] text-white px-4 py-3 flex items-center">
          <button onClick={() => navigate(createPageUrl("WhatsApp"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold ml-4">Pesquisar na Conversa</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Search className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* O que é */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">🔍 Para que serve?</h2>
            <p className="text-gray-700 leading-relaxed">
              Serve para você <strong>procurar uma palavra ou frase</strong> dentro da conversa com alguém, sem precisar rolar tudo!
            </p>
          </div>

          {/* Exemplo prático */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Exemplo Prático:</h3>
            <div className="bg-white p-4 rounded-lg mb-3">
              <p className="text-gray-800 mb-3">
                <strong>Situação:</strong> Há duas semanas, seu filho te mandou o endereço de uma farmácia. Agora você não lembra onde está essa mensagem.
              </p>
              <div className="bg-red-50 p-3 rounded mb-3">
                <p className="text-sm text-gray-800">
                  ❌ <strong>Jeito difícil:</strong> Ficar rolando a conversa toda para trás procurando (muito cansativo!)
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-gray-800">
                  ✅ <strong>Jeito fácil:</strong> Digite "farmácia" na pesquisa e encontre na hora!
                </p>
              </div>
            </div>
          </div>

          {/* Como usar */}
          <div className="bg-white border-2 border-[#25D366] rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Como usar:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Abra a conversa com a pessoa</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <p className="text-gray-700 pt-1">Toque nos 3 pontinhos no topo da tela</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <p className="text-gray-700 pt-1">Escolha "Pesquisar"</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <p className="text-gray-700 pt-1">Digite a palavra que você quer encontrar</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  5
                </div>
                <p className="text-gray-700 pt-1">O WhatsApp mostra todas as mensagens com aquela palavra</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  6
                </div>
                <p className="text-gray-700 pt-1">Toque na mensagem que você quer para ir direto até ela</p>
              </div>
            </div>
          </div>

          {/* Quando usar */}
          <div className="bg-purple-50 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📝 Exemplos de quando usar:</h3>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">🏠 Procurar um <strong>endereço</strong> que te mandaram</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">💊 Encontrar aquele nome de <strong>remédio</strong> que alguém te indicou</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">🍳 Achar uma <strong>receita</strong> que compartilharam com você</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">📞 Localizar um <strong>número de telefone</strong> que te passaram</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">📅 Encontrar a <strong>data</strong> de um evento combinado</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">💰 Procurar informações sobre um <strong>pagamento</strong></p>
              </div>
            </div>
          </div>

          {/* Dicas */}
          <div className="bg-green-50 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💚 Dicas importantes:</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-gray-800">
                  ✓ <strong>Digite palavras simples:</strong> Não precisa escrever a frase toda, só a palavra principal
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-gray-800">
                  ✓ <strong>Use a pesquisa sempre:</strong> É muito mais rápido que ficar rolando a conversa
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-gray-800">
                  ✓ <strong>Funciona em qualquer conversa:</strong> Individual ou grupo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}