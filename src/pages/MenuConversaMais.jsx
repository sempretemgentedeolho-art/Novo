import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, MoreHorizontal, Pin, Archive, Trash2, Lock, Flag, UserX } from "lucide-react";

export default function MenuConversaMais() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Mais Opções da Conversa. Quando você clica em Mais, aparecem outras funções importantes! Vou explicar cada uma. Primeira opção: Fixar conversa. Fixa a conversa no topo da lista. Parecido com favoritos, mas você pode fixar até 3 conversas. Elas ficam grudadas lá em cima. Segunda opção: Arquivar conversa. Esconde a conversa da lista principal. A conversa vai para uma pastinha chamada Arquivadas. Útil para conversas que você não usa mais, mas não quer apagar. Terceira opção: Trancar conversa. Coloca uma senha ou sua digital para abrir a conversa. Ninguém consegue ler sem desbloquear. Perfeito para conversas muito privadas. Quarta opção: Apagar conversa. Apaga TODAS as mensagens daquela conversa do seu celular. Cuidado! Não tem como voltar atrás. Quinta opção: Denunciar. Use se alguém está te mandando mensagens de golpe, spam ou coisas inadequadas. O WhatsApp vai investigar. Sexta opção: Bloquear contato. A pessoa não consegue mais te mandar mensagens nem te ligar. Use se alguém estiver te incomodando. Cada função tem um propósito! Use fixar e arquivar para organizar. Use trancar para privacidade. Use bloquear e denunciar para segurança. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Mais Opções</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
              <MoreHorizontal className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Intro */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">⚙️ O que tem aqui?</h2>
            <p className="text-gray-700">
              Quando você clica em <strong>"Mais"</strong>, aparecem outras funções importantes para gerenciar a conversa!
            </p>
          </div>

          {/* Fixar conversa */}
          <div className="bg-green-50 rounded-lg p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Pin className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">📌 Fixar Conversa</h3>
            </div>
            <p className="text-gray-700 mb-3">
              <strong>Fixa a conversa no topo</strong> da lista. Parecido com favoritos.
            </p>
            <div className="bg-white p-3 rounded-lg space-y-2">
              <p className="text-sm text-gray-800">💡 Você pode fixar até <strong>3 conversas</strong></p>
              <p className="text-sm text-gray-800">💡 Elas ficam "grudadas" lá em cima, sempre visíveis</p>
              <p className="text-sm text-gray-800">💡 Para desfixar, faça o mesmo processo</p>
            </div>
          </div>

          {/* Arquivar */}
          <div className="bg-blue-50 rounded-lg p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Archive className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">📦 Arquivar Conversa</h3>
            </div>
            <p className="text-gray-700 mb-3">
              <strong>Esconde a conversa</strong> da lista principal.
            </p>
            <div className="bg-white p-3 rounded-lg space-y-2">
              <p className="text-sm text-gray-800">
                💡 A conversa vai para uma pastinha chamada <strong>"Arquivadas"</strong>
              </p>
              <p className="text-sm text-gray-800">
                💡 Útil para conversas que você não usa mais, mas não quer apagar
              </p>
              <p className="text-sm text-gray-800">
                💡 Para ver conversas arquivadas, role a lista até o final
              </p>
            </div>
          </div>

          {/* Trancar */}
          <div className="bg-purple-50 rounded-lg p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900">🔒 Trancar Conversa</h3>
            </div>
            <p className="text-gray-700 mb-3">
              Coloca uma <strong>senha ou sua digital</strong> para abrir a conversa.
            </p>
            <div className="bg-white p-3 rounded-lg space-y-2">
              <p className="text-sm text-gray-800">
                💡 Ninguém consegue ler sem desbloquear
              </p>
              <p className="text-sm text-gray-800">
                💡 Perfeito para conversas muito privadas
              </p>
              <p className="text-sm text-gray-800">
                💡 A conversa fica numa pasta separada chamada "Trancadas"
              </p>
            </div>
          </div>

          {/* Apagar */}
          <div className="bg-red-50 rounded-lg p-5 mb-4 border-2 border-red-300">
            <div className="flex items-center gap-3 mb-3">
              <Trash2 className="w-8 h-8 text-red-600" />
              <h3 className="text-xl font-semibold text-red-700">🗑️ Apagar Conversa</h3>
            </div>
            <p className="text-gray-700 mb-3">
              Apaga <strong>TODAS as mensagens</strong> daquela conversa do seu celular.
            </p>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-red-700 font-semibold mb-2">
                ⚠️ CUIDADO! Não tem como voltar atrás!
              </p>
              <p className="text-sm text-gray-700">
                Use só se tiver certeza. As mensagens somem para sempre do seu celular.
              </p>
            </div>
          </div>

          {/* Denunciar */}
          <div className="bg-orange-50 rounded-lg p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Flag className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-semibold text-gray-900">🚩 Denunciar</h3>
            </div>
            <p className="text-gray-700 mb-3">
              Use se alguém está te mandando mensagens de <strong>golpe, spam ou coisas inadequadas</strong>.
            </p>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                💡 O WhatsApp vai investigar e pode bloquear a pessoa se for golpe
              </p>
            </div>
          </div>

          {/* Bloquear */}
          <div className="bg-red-50 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <UserX className="w-8 h-8 text-red-600" />
              <h3 className="text-xl font-semibold text-red-700">🚫 Bloquear Contato</h3>
            </div>
            <p className="text-gray-700 mb-3">
              A pessoa <strong>não consegue mais</strong> te mandar mensagens nem te ligar.
            </p>
            <div className="bg-white p-3 rounded-lg space-y-2">
              <p className="text-sm text-gray-800">
                💡 Use se alguém estiver te incomodando
              </p>
              <p className="text-sm text-gray-800">
                💡 Você pode desbloquear depois se quiser
              </p>
              <p className="text-sm text-gray-800">
                💡 A pessoa não recebe aviso que foi bloqueada
              </p>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-green-100 border-l-4 border-green-500 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💚 Resumo:</h3>
            <div className="space-y-2 text-gray-700">
              <p>📌 <strong>Fixar/Arquivar:</strong> Para organizar</p>
              <p>🔒 <strong>Trancar:</strong> Para privacidade</p>
              <p>🗑️ <strong>Apagar:</strong> Para limpar (cuidado!)</p>
              <p>🚩 <strong>Denunciar/Bloquear:</strong> Para segurança</p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}