import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, MapPin } from "lucide-react";

export default function LocalizacaoAnexo() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o botão de Localização. Use quando você quer mostrar para alguém onde você está ou onde quer que a pessoa vá. O WhatsApp mostra sua localização no mapa."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Ao clicar em Localização, você pode enviar onde está agora ou escolher um lugar no mapa. A pessoa abre e vê o endereço completo, podendo usar para chegar até lá."
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
          <h2 className="text-lg font-medium">Enviar Localização</h2>
        </div>

        {/* Ícone */}
        <div className="p-6 flex justify-center">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
            <MapPin className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para que serve?</h3>
            <p className="text-gray-700 leading-relaxed">
              O botão de Localização permite compartilhar onde você está ou indicar um lugar específico no mapa.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Duas formas de usar</h3>
            <div className="space-y-3 text-sm text-blue-800">
              <div>
                <p className="font-medium mb-1">1. Localização atual</p>
                <p>Mostra onde você está agora. Útil para dizer "estou aqui".</p>
              </div>
              <div>
                <p className="font-medium mb-1">2. Escolher lugar</p>
                <p>Você procura um endereço ou local no mapa e envia. Útil para marcar encontros.</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Como usar</h3>
            <ol className="space-y-2 text-sm text-green-800">
              <li>1. Abra a conversa</li>
              <li>2. Toque no clipe (📎)</li>
              <li>3. Escolha "Localização" (ícone verde com pin)</li>
              <li>4. Escolha "Localização atual" ou procure um lugar</li>
              <li>5. Confirme o envio</li>
            </ol>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">💡 Quando usar</h3>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>• Para mostrar onde você está</li>
              <li>• Para combinar onde se encontrar</li>
              <li>• Para indicar uma loja ou restaurante</li>
              <li>• Para ajudar alguém a chegar até você</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Privacidade</h3>
            <p className="text-sm text-yellow-800">
              Só compartilhe sua localização com pessoas que você conhece e confia. A pessoa verá exatamente onde você está.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}