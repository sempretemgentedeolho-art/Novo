import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, BarChart3 } from "lucide-react";

export default function EnqueteAnexo() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o botão de Enquete. Use quando você quer fazer uma votação no grupo. Por exemplo: perguntar qual dia é melhor para um churrasco, e as pessoas votam nas opções."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Você cria uma pergunta e oferece opções de resposta. Cada pessoa do grupo vota na opção que prefere. O WhatsApp conta os votos automaticamente."
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
          <h2 className="text-lg font-medium">Criar Enquete</h2>
        </div>

        {/* Ícone */}
        <div className="p-6 flex justify-center">
          <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center">
            <BarChart3 className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">O que é Enquete?</h3>
            <p className="text-gray-700 leading-relaxed">
              Enquete é uma votação que você faz no grupo. Você pergunta algo e dá opções para as pessoas escolherem.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Exemplos de uso</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• "Qual dia para o churrasco? Sábado ou Domingo?"</li>
              <li>• "Onde fazer a festa? Casa do João ou Salão?"</li>
              <li>• "Que hora sair? 14h, 15h ou 16h?"</li>
              <li>• "Qual filme assistir? Ação, Comédia ou Romance?"</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Como criar uma enquete</h3>
            <ol className="space-y-2 text-sm text-green-800">
              <li>1. Abra o grupo</li>
              <li>2. Toque no clipe (📎)</li>
              <li>3. Escolha "Enquete" (ícone roxo com gráfico)</li>
              <li>4. Digite a pergunta</li>
              <li>5. Adicione as opções de resposta</li>
              <li>6. Toque em "Enviar"</li>
            </ol>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">💡 Vantagens</h3>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>• Facilita tomar decisões em grupo</li>
              <li>• Todos votam de forma organizada</li>
              <li>• O WhatsApp conta os votos sozinho</li>
              <li>• Você vê quem votou em cada opção</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Importante</h3>
            <p className="text-sm text-yellow-800">
              Enquetes só funcionam em grupos. Em conversas individuais, este botão não aparece.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}