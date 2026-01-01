import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, MessageCircle, Search, User, Users, Clock } from "lucide-react";

export default function ConversasGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Conversas. Aba Conversas do WhatsApp. Esta é a tela principal do WhatsApp! Aqui ficam todas as suas conversas com amigos, familiares e grupos. Vou explicar tudo com calma. Lista de Conversas: Você vê uma lista com o nome das pessoas e dos grupos. Embaixo de cada nome, aparece a última mensagem que foi enviada. Mensagens não lidas: Quando alguém te manda uma mensagem e você ainda não leu, aparece um número verde do lado direito. Esse número mostra quantas mensagens novas você tem daquela pessoa. Hora da última mensagem: Do lado direito também aparece a hora da última mensagem. Assim você sabe quando foi a última vez que conversou. Como abrir uma conversa: É só tocar em cima do nome da pessoa ou do grupo. A conversa vai abrir e você pode ler as mensagens e responder. Barra de pesquisa: Lá em cima tem uma barrinha para pesquisar. Se você tem muitas conversas e quer encontrar alguém rápido, é só digitar o nome ali. A aba de Conversas é onde você passa a maior parte do tempo no WhatsApp. É aqui que você lê e responde as mensagens! Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Aba Conversas</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center">
              <MessageCircle className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* O que é */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💬 O que é?</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Esta é a <strong>tela principal</strong> do WhatsApp!
            </p>
            <p className="text-gray-700">
              Aqui ficam <strong>todas as suas conversas</strong> com amigos, familiares e grupos.
            </p>
          </div>

          {/* Lista de conversas */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Lista de Conversas</h2>
            <p className="text-gray-700 mb-4">
              Você vê uma lista com o <strong>nome das pessoas e dos grupos</strong>. Embaixo de cada nome, aparece a última mensagem que foi enviada.
            </p>

            {/* Exemplo visual */}
            <div className="bg-gray-50 rounded-lg p-3 space-y-3">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                  👩
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <p className="font-medium text-gray-900">Maria Silva</p>
                    <span className="text-xs text-gray-500">14:30</span>
                  </div>
                  <p className="text-sm text-gray-600">Oi! Como você está?</p>
                </div>
                <span className="bg-[#25D366] text-white text-xs font-bold px-2 py-1 rounded-full">3</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                  👨
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <p className="font-medium text-gray-900">João Pedro</p>
                    <span className="text-xs text-gray-500">Ontem</span>
                  </div>
                  <p className="text-sm text-gray-600">Obrigado pela ajuda!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mensagens não lidas */}
          <div className="bg-green-50 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold">
                3
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Mensagens Não Lidas</h2>
            </div>
            <p className="text-gray-700 mb-3">
              Quando alguém te manda uma mensagem e você ainda não leu, aparece um <strong>número verde</strong> do lado direito.
            </p>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                💡 Esse número mostra <strong>quantas mensagens novas</strong> você tem daquela pessoa ou grupo
              </p>
            </div>
          </div>

          {/* Hora da mensagem */}
          <div className="bg-purple-50 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-8 h-8 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Hora da Última Mensagem</h2>
            </div>
            <p className="text-gray-700 mb-3">
              Do lado direito também aparece a <strong>hora da última mensagem</strong>.
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Se foi hoje, mostra a hora: <strong>14:30</strong></p>
              <p>• Se foi ontem, mostra: <strong>Ontem</strong></p>
              <p>• Se foi antes, mostra a data: <strong>23/12</strong></p>
            </div>
          </div>

          {/* Como abrir conversa */}
          <div className="bg-orange-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">👆 Como Abrir uma Conversa</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Toque em cima do nome da pessoa ou do grupo</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <p className="text-gray-700 pt-1">A conversa vai abrir</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <p className="text-gray-700 pt-1">Você pode ler as mensagens e responder</p>
              </div>
            </div>
          </div>

          {/* Barra de pesquisa */}
          <div className="bg-teal-50 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Search className="w-8 h-8 text-teal-600" />
              <h2 className="text-xl font-semibold text-gray-900">Barra de Pesquisa</h2>
            </div>
            <p className="text-gray-700 mb-3">
              Lá em cima tem uma barrinha com uma <strong>lupa</strong> para pesquisar.
            </p>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                💡 Se você tem muitas conversas e quer encontrar alguém rápido, é só digitar o nome ali!
              </p>
            </div>
          </div>

          {/* Tipos de conversas */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📱 Tipos de Conversas:</h2>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg flex items-center gap-3">
                <User className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Individual</p>
                  <p className="text-sm text-gray-600">Conversa com uma pessoa só</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center gap-3">
                <Users className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Grupo</p>
                  <p className="text-sm text-gray-600">Conversa com várias pessoas juntas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-green-100 border-l-4 border-green-500 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">💚 Resumo:</h2>
            <p className="text-gray-700">
              A aba de Conversas é onde você passa a maior parte do tempo no WhatsApp. É aqui que você <strong>lê e responde as mensagens</strong>!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}