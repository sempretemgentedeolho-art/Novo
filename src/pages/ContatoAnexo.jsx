import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, User } from "lucide-react";

export default function ContatoAnexo() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o botão de Contato. Use quando você quer enviar o telefone de alguém para outra pessoa. Por exemplo: seu filho pediu o número do médico, você envia pelo WhatsApp."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Ao clicar em Contato, você escolhe da sua agenda qual telefone quer compartilhar. A pessoa recebe e pode salvar direto na agenda dela com um toque."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.80;
        synth.speak(utter2);
      }, 10000);
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
          <h2 className="text-lg font-medium">Compartilhar Contato</h2>
        </div>

        {/* Ícone */}
        <div className="p-6 flex justify-center">
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para que serve?</h3>
            <p className="text-gray-700 leading-relaxed">
              Compartilhar contato permite enviar o telefone de alguém da sua agenda para outra pessoa, facilitando que ela salve o número.
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Como usar</h3>
            <ol className="space-y-2 text-sm text-green-800">
              <li>1. Abra a conversa</li>
              <li>2. Toque no clipe (📎)</li>
              <li>3. Escolha "Contato" (ícone azul com pessoa)</li>
              <li>4. Selecione o contato da sua agenda</li>
              <li>5. Confirme o envio</li>
            </ol>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">O que a pessoa recebe</h3>
            <p className="text-sm text-blue-800 mb-2">
              A pessoa recebe um cartão com:
            </p>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Nome do contato</li>
              <li>• Número de telefone</li>
              <li>• Botão para salvar na agenda</li>
              <li>• Botão para conversar no WhatsApp</li>
            </ul>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">💡 Quando usar</h3>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>• Passar número do médico para familiar</li>
              <li>• Compartilhar contato de um amigo</li>
              <li>• Enviar telefone de serviço (encanador, eletricista)</li>
              <li>• Facilitar que alguém salve um número</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Atenção</h3>
            <p className="text-sm text-yellow-800">
              Só compartilhe telefones de outras pessoas se tiver permissão delas. Respeite a privacidade dos seus contatos.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}