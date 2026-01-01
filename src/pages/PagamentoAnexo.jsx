import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, DollarSign } from "lucide-react";

export default function PagamentoAnexo() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o botão de Pagamento. Use quando você quer enviar dinheiro direto pelo WhatsApp. Por exemplo: pagar uma conta para um amigo, enviar mesada para um filho, ou transferir valor combinado."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Você digita o valor, confirma e o dinheiro vai direto para a pessoa. É como fazer um PIX, mas sem sair do WhatsApp. Atenção: só envie dinheiro para quem você conhece."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.80;
        synth.speak(utter2);
      }, 11000);
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
          <h2 className="text-lg font-medium">Enviar Pagamento</h2>
        </div>

        {/* Ícone */}
        <div className="p-6 flex justify-center">
          <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center">
            <DollarSign className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para que serve?</h3>
            <p className="text-gray-700 leading-relaxed">
              O botão de Pagamento permite transferir dinheiro diretamente pelo WhatsApp, sem precisar abrir o banco.
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Como usar</h3>
            <ol className="space-y-2 text-sm text-green-800">
              <li>1. Abra a conversa</li>
              <li>2. Toque no clipe (📎)</li>
              <li>3. Escolha "Pagamento" (ícone verde com cifrão)</li>
              <li>4. Digite o valor a enviar</li>
              <li>5. Confira os dados</li>
              <li>6. Confirme o pagamento</li>
            </ol>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Primeira vez</h3>
            <p className="text-sm text-blue-800">
              Na primeira vez que usar, o WhatsApp pedirá para cadastrar seu cartão ou conta bancária. Siga as instruções com calma.
            </p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">💡 Quando usar</h3>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>• Pagar conta dividida no restaurante</li>
              <li>• Enviar mesada ou ajuda financeira</li>
              <li>• Devolver dinheiro emprestado</li>
              <li>• Pagar compras ou serviços</li>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <h3 className="font-semibold text-red-900 mb-2">🚨 SEGURANÇA - MUITO IMPORTANTE</h3>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• Só envie dinheiro para pessoas que você CONHECE</li>
              <li>• Confira SEMPRE o valor antes de confirmar</li>
              <li>• Desconfie de pedidos estranhos, mesmo de conhecidos</li>
              <li>• Se tiver dúvida, confirme por telefone primeiro</li>
              <li>• Pagamentos NÃO podem ser cancelados depois</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}