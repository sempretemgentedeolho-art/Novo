import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Plus, MessageCircle, Users, Send, Camera } from "lucide-react";

export default function BotaoMaisGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Botão de Mais. O Botão verde com mais que fica no canto inferior direito. Este botão verde redondo com um sinal de mais é muito importante! Ele serve para você começar coisas novas no WhatsApp. O que ele faz muda dependendo de onde você está. Deixa eu explicar cada situação. Se você estiver na aba Conversas, e tocar no botão de mais, você pode iniciar uma nova conversa com alguém. Basta escolher o contato da lista. Se você estiver na aba Atualizações, e tocar no botão de mais, você pode postar um novo status. Escolha uma foto ou vídeo para compartilhar com seus amigos por 24 horas. Se você estiver na aba Comunidades, e tocar no botão de mais, você pode criar uma nova comunidade ou adicionar grupos a uma comunidade existente. Se você estiver na aba Ligações, e tocar no botão de mais, você pode fazer uma nova ligação. Escolha o contato e se quer ligar com voz ou com vídeo. O botão de mais é sempre verde, redondo, e fica flutuando no canto. É muito fácil de ver! Use o botão de mais sempre que quiser fazer algo novo: conversar, postar, criar ou ligar. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Botão de Mais (+)</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-[#25D366] shadow-2xl flex items-center justify-center">
              <Plus className="w-20 h-20 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* O que é */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">🔘 O que é?</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Este <strong>botão verde redondo</strong> com um sinal de <strong>mais (+)</strong> é muito importante!
            </p>
            <p className="text-gray-700">
              Ele serve para você <strong>começar coisas novas</strong> no WhatsApp.
            </p>
          </div>

          {/* Como identificar */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">👁️ Como identificar:</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                <p className="text-gray-700">Sempre <strong>verde</strong></p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                <p className="text-gray-700">Sempre <strong>redondo</strong></p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                <p className="text-gray-700">Fica <strong>flutuando</strong> no canto inferior direito</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                <p className="text-gray-700">Tem um <strong>sinal de mais (+)</strong> branco dentro</p>
              </div>
            </div>
          </div>

          {/* O que ele faz */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 O que ele faz:</h2>
            <p className="text-gray-700 mb-4">
              O botão de mais <strong>muda de função</strong> dependendo de onde você está!
            </p>
          </div>

          {/* Na aba Conversas */}
          <div className="bg-blue-50 rounded-lg p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Na aba Conversas</h3>
            </div>
            <p className="text-gray-700 mb-3">
              <strong>Inicia uma nova conversa</strong> com alguém
            </p>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                💡 Toque no botão → Escolha o contato da lista → Comece a conversar
              </p>
            </div>
          </div>

          {/* Na aba Atualizações */}
          <div className="bg-purple-50 rounded-lg p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Camera className="w-8 h-8 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Na aba Atualizações</h3>
            </div>
            <p className="text-gray-700 mb-3">
              <strong>Posta um novo status</strong> (foto ou vídeo)
            </p>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                💡 Toque no botão → Escolha foto/vídeo → Compartilhe por 24 horas
              </p>
            </div>
          </div>

          {/* Na aba Comunidades */}
          <div className="bg-orange-50 rounded-lg p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-8 h-8 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Na aba Comunidades</h3>
            </div>
            <p className="text-gray-700 mb-3">
              <strong>Cria uma nova comunidade</strong> ou adiciona grupos
            </p>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                💡 Toque no botão → Escolha criar nova comunidade ou adicionar grupos
              </p>
            </div>
          </div>

          {/* Na aba Ligações */}
          <div className="bg-green-50 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Send className="w-8 h-8 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Na aba Ligações</h3>
            </div>
            <p className="text-gray-700 mb-3">
              <strong>Faz uma nova ligação</strong> de voz ou vídeo
            </p>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                💡 Toque no botão → Escolha o contato → Escolha voz 📞 ou vídeo 🎥
              </p>
            </div>
          </div>

          {/* Resumo visual */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📝 Resumo:</h2>
            <div className="space-y-2 text-gray-700">
              <p>✓ <strong>Conversas:</strong> Nova conversa</p>
              <p>✓ <strong>Atualizações:</strong> Novo status</p>
              <p>✓ <strong>Comunidades:</strong> Nova comunidade</p>
              <p>✓ <strong>Ligações:</strong> Nova ligação</p>
            </div>
          </div>

          {/* Dica final */}
          <div className="bg-green-100 border-l-4 border-green-500 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">💚 Dica importante:</h2>
            <p className="text-gray-700">
              Use o botão de mais sempre que quiser fazer algo <strong>novo</strong>: conversar, postar, criar ou ligar. Ele está sempre ali, pronto para te ajudar!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}