import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, BellOff, Clock, Check } from "lucide-react";

export default function SilenciarNotificacoesGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Silenciar Notificações. Esta função é muito útil para você ter paz e tranquilidade! Vou explicar tudo direitinho. O que é silenciar? Silenciar significa que você não vai mais ouvir o barulhinho nem ver o aviso na tela quando essa pessoa ou grupo te mandar mensagem. Mas atenção: as mensagens continuam chegando normalmente! Você só não vai ser avisado. Para que serve? Às vezes, tem grupos muito animados que ficam mandando mensagem o dia todo. Ou aquela pessoa que manda bom dia todo dia. Se você não quer ficar ouvindo o barulhinho toda hora, pode silenciar! Você escolhe por quanto tempo. 8 horas: Silencia até o final do dia. Útil se você vai dormir ou descansar. 1 semana: Silencia por 7 dias. Bom para grupos muito agitados. Sempre: Silencia para sempre. Só desliga quando você quiser. Como silenciar. Passo um: Abra a conversa com a pessoa ou grupo. Passo dois: Toque nos 3 pontinhos no topo. Passo três: Escolha Silenciar notificações. Passo quatro: Escolha por quanto tempo. Passo cinco: Toque em OK. Como saber se está silenciado? A conversa vai aparecer com um ícone de sino cortado do lado do nome. Assim você lembra que está silenciado. Importante saber: Silenciar não apaga mensagens, não bloqueia a pessoa, você continua recebendo as mensagens normalmente. Só não vai ter barulho nem aviso. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Silenciar Notificações</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
              <BellOff className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* O que é */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">🔕 O que é Silenciar?</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Silenciar significa que você <strong>não vai mais ouvir o barulhinho</strong> nem ver o aviso na tela quando essa pessoa ou grupo te mandar mensagem.
            </p>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                ⚠️ <strong>Atenção:</strong> As mensagens continuam chegando normalmente! Você só não vai ser avisado.
              </p>
            </div>
          </div>

          {/* Para que serve */}
          <div className="bg-yellow-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💡 Para que serve?</h2>
            <p className="text-gray-700 mb-4">
              Às vezes, tem <strong>grupos muito animados</strong> que ficam mandando mensagem o dia todo. Ou aquela pessoa que manda "bom dia" todo dia.
            </p>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-gray-800">
                Se você não quer ficar ouvindo o barulhinho toda hora, pode silenciar! Você ainda recebe as mensagens, mas sem barulho.
              </p>
            </div>
          </div>

          {/* Opções de tempo */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">⏰ Você Escolhe por Quanto Tempo:</h3>
            
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">8 horas</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Silencia até o final do dia. Útil se você vai dormir ou descansar.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <h4 className="font-semibold text-gray-900">1 semana</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Silencia por 7 dias. Bom para grupos muito agitados.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <BellOff className="w-6 h-6 text-gray-600" />
                  <h4 className="font-semibold text-gray-900">Sempre</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Silencia para sempre. Só desliga quando você quiser.
                </p>
              </div>
            </div>
          </div>

          {/* Como silenciar */}
          <div className="bg-green-50 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📝 Passo a Passo:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Abra a conversa com a pessoa ou grupo</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <p className="text-gray-700 pt-1">Toque nos 3 pontinhos no topo</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <p className="text-gray-700 pt-1">Escolha "Silenciar notificações"</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <p className="text-gray-700 pt-1">Escolha por quanto tempo (8 horas, 1 semana ou sempre)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  5
                </div>
                <p className="text-gray-700 pt-1">Toque em "OK"</p>
              </div>
            </div>
          </div>

          {/* Como saber se está silenciado */}
          <div className="bg-purple-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">👁️ Como saber se está silenciado?</h3>
            <div className="bg-white p-4 rounded-lg flex items-center gap-3">
              <BellOff className="w-8 h-8 text-gray-600" />
              <p className="text-gray-700">
                A conversa vai aparecer com um <strong>ícone de sino cortado 🔕</strong> do lado do nome. Assim você lembra que está silenciado.
              </p>
            </div>
          </div>

          {/* Importante */}
          <div className="bg-red-50 border-l-4 border-red-400 p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">⚠️ Importante Saber:</h3>
            <div className="space-y-2">
              <p className="text-gray-800">✓ Silenciar <strong>NÃO apaga</strong> mensagens</p>
              <p className="text-gray-800">✓ Silenciar <strong>NÃO bloqueia</strong> a pessoa</p>
              <p className="text-gray-800">✓ Você <strong>continua recebendo</strong> as mensagens normalmente</p>
              <p className="text-gray-800">✓ Só não vai ter <strong>barulho nem aviso</strong></p>
            </div>
          </div>

          {/* Quando usar */}
          <div className="bg-green-100 border-l-4 border-green-500 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💚 Quando usar:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Grupos que mandam muita mensagem</li>
              <li>✓ Grupos de trabalho fora do horário</li>
              <li>✓ Quando você quer descansar sem ser incomodado</li>
              <li>✓ Conversas que você quer acompanhar, mas não quer avisos</li>
              <li>✓ À noite, para dormir tranquilo</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}