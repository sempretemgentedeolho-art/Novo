import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, List } from "lucide-react";

export default function ListaAnexo() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o botão de Lista. Use quando você quer criar uma lista de compras, tarefas ou qualquer coisa que precisa organizar junto com outras pessoas do grupo."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Você cria os itens da lista e envia. As pessoas do grupo podem marcar os itens como feitos. Todos veem o que já foi feito e o que ainda falta."
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
          <h2 className="text-lg font-medium">Criar Lista</h2>
        </div>

        {/* Ícone */}
        <div className="p-6 flex justify-center">
          <div className="w-24 h-24 bg-yellow-600 rounded-full flex items-center justify-center">
            <List className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para que serve?</h3>
            <p className="text-gray-700 leading-relaxed">
              O botão de Lista cria listas compartilhadas que todos do grupo podem ver e marcar itens como concluídos.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Exemplos de listas</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• <strong>Compras do mercado:</strong> Arroz, feijão, café, leite</li>
              <li>• <strong>Tarefas da casa:</strong> Limpar quintal, lavar roupa</li>
              <li>• <strong>Itens da festa:</strong> Bolo, salgados, refrigerante</li>
              <li>• <strong>Coisas para levar:</strong> Toalha, protetor solar, cadeira</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Como criar uma lista</h3>
            <ol className="space-y-2 text-sm text-green-800">
              <li>1. Abra o grupo</li>
              <li>2. Toque no clipe (📎)</li>
              <li>3. Escolha "Lista" (ícone amarelo)</li>
              <li>4. Digite o título da lista</li>
              <li>5. Adicione os itens, um por linha</li>
              <li>6. Toque em "Enviar lista"</li>
            </ol>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">💡 Vantagem</h3>
            <p className="text-sm text-purple-800">
              Todos veem a mesma lista. Quando alguém marca um item como feito, aparece para todo mundo. Assim ninguém compra duas vezes a mesma coisa.
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Onde funciona</h3>
            <p className="text-sm text-yellow-800">
              Listas funcionam melhor em grupos. Em conversas individuais você pode usar, mas perde a vantagem de várias pessoas marcarem junto.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}