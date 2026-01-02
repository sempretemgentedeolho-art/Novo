import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Camera, Image } from "lucide-react";

export default function CapturarTela() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Captura de tela. Aqui você aprende a tirar foto da tela do celular. Útil para guardar informações, mensagens ou compartilhar o que está vendo."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-[#1976D2] text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("Home"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Captura de Tela</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">O que é captura de tela?</h3>
            <p className="text-gray-700 leading-relaxed">
              Captura de tela (ou "print" ou "screenshot") é tirar uma foto de tudo que está aparecendo na tela do celular naquele momento.
            </p>
          </div>

          {/* Para que serve */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">Para que serve?</h3>
            <ul className="space-y-2 text-sm text-purple-800">
              <li>• Guardar uma conversa importante do WhatsApp</li>
              <li>• Salvar um endereço ou informação</li>
              <li>• Mostrar um erro para alguém te ajudar</li>
              <li>• Compartilhar algo que está vendo</li>
              <li>• Guardar um boleto ou código</li>
            </ul>
          </div>

          {/* Como fazer - Método 1 */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-3">Método 1: Botões físicos</h3>
            <p className="text-sm text-green-800 mb-3">
              Este é o método mais comum e funciona na maioria dos celulares:
            </p>
            <ol className="space-y-2 text-sm text-green-800">
              <li>1. Vá até a tela que quer fotografar</li>
              <li>2. Aperte JUNTOS:</li>
              <li className="pl-4">• Botão de LIGAR/DESLIGAR</li>
              <li className="pl-4">• + Botão de DIMINUIR VOLUME</li>
              <li>3. Segure os dois por 1 segundo</li>
              <li>4. A tela pisca - captura feita!</li>
              <li>5. A foto vai para a Galeria</li>
            </ol>
          </div>

          {/* Como fazer - Método 2 */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">Método 2: Menu rápido</h3>
            <p className="text-sm text-blue-800 mb-3">
              Alguns celulares têm um botão de captura nas configurações rápidas:
            </p>
            <ol className="space-y-1 text-sm text-blue-800">
              <li>1. Arraste o dedo do topo para baixo</li>
              <li>2. Procure o botão "Captura de tela" ou "Screenshot"</li>
              <li>3. Toque nele</li>
              <li>4. A foto é tirada automaticamente</li>
            </ol>
          </div>

          {/* Onde encontrar */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Image className="w-5 h-5 text-yellow-700" />
              <h3 className="font-semibold text-yellow-900">Onde encontrar as fotos</h3>
            </div>
            <ol className="space-y-1 text-sm text-yellow-800">
              <li>1. Abra o app "Galeria" ou "Fotos"</li>
              <li>2. Procure a pasta "Capturas de tela" ou "Screenshots"</li>
              <li>3. Suas fotos de tela estão lá</li>
            </ol>
          </div>

          {/* Dicas */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <h3 className="font-semibold text-green-900 mb-2">💡 Dicas importantes</h3>
            <ul className="space-y-1 text-sm text-green-800">
              <li>• Tire captura ANTES de fechar a tela</li>
              <li>• Você pode editar a foto depois na Galeria</li>
              <li>• Pode enviar por WhatsApp como qualquer foto</li>
              <li>• Delete capturas antigas para liberar espaço</li>
              <li>• Não precisa ser rápido - o celular aguarda</li>
            </ul>
          </div>

          {/* Atenção */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <h3 className="font-semibold text-red-900 mb-2">⚠️ Cuidado</h3>
            <p className="text-sm text-red-800">
              Não tire captura de senhas, números de cartão ou informações muito pessoais. Se o celular for perdido ou hackeado, essas fotos podem ser vistas.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}