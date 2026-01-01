import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Camera } from "lucide-react";

export default function CameraConversaGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Botão da Câmera Fotográfica. Esse botão é muito prático! Serve para você tirar uma foto na hora e mandar direto para alguém. Vou explicar tudinho. O que é? É o ícone de uma câmera fotográfica que fica lá embaixo, do lado direito da caixinha onde você escreve mensagens. Para que serve? Serve para você tirar uma foto na hora e enviar rapidinho para a pessoa. É diferente da galeria! Na galeria você escolhe foto antiga. Aqui você tira foto nova, na hora! Como usar. Passo um: Abra a conversa com a pessoa. Passo dois: Olhe lá embaixo, do lado direito. Toque no ícone da câmera fotográfica. Passo três: A câmera do seu celular vai abrir. Aponte para o que você quer fotografar. Passo quatro: Toque no botão redondo grande no meio para tirar a foto. Passo cinco: A foto vai aparecer na tela. Se gostou, toque no botão verde de enviar. Se não gostou, toque no X para tirar outra. Quando usar a câmera da conversa. Para fotografar algo e mandar na hora. Exemplo: você está na feira e quer perguntar se pode comprar aquela fruta. Tire foto e mande! Para mostrar algo que está vendo. Exemplo: um pôr do sol bonito, uma planta que floriu. Para compartilhar momentos. Exemplo: você está num lugar legal e quer mostrar para a família. Dicas importantes. Limpe a lente da câmera antes, para a foto sair boa. Segure firme o celular na hora da foto, sem tremer. Se a foto sair escura, acenda a luz do ambiente ou use o flash. Para usar o flash, procure o ícone de raio na tela da câmera. Diferença entre câmera e galeria. Câmera: tira foto nova agora. Galeria: escolhe foto antiga que já está salva. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Botão da Câmera</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <Camera className="w-16 h-16 text-white" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">📷 O que é?</h2>
            <p className="text-gray-700">
              É o ícone de uma <strong>câmera fotográfica 📷</strong> que fica lá embaixo, do <strong>lado direito</strong> da caixinha onde você escreve mensagens.
            </p>
          </div>

          <div className="bg-cyan-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💙 Para que serve?</h2>
            <p className="text-gray-700 mb-3">
              Serve para você <strong>tirar uma foto na hora</strong> e enviar rapidinho para a pessoa.
            </p>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                ⚠️ <strong>É diferente da galeria!</strong> Na galeria você escolhe foto antiga. Aqui você tira foto nova, na hora!
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-cyan-500 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Como Usar:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Abra a conversa com a pessoa</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <p className="text-gray-700 pt-1">Olhe lá embaixo, do <strong>lado direito</strong>. Toque no ícone da câmera fotográfica 📷</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <p className="text-gray-700 pt-1">A câmera do seu celular vai abrir. Aponte para o que você quer fotografar</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <p className="text-gray-700 pt-1">Toque no <strong>botão redondo grande</strong> no meio para tirar a foto</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  5
                </div>
                <p className="text-gray-700 pt-1">A foto vai aparecer na tela. Se gostou, toque no <strong>botão verde ✅</strong> de enviar. Se não gostou, toque no <strong>X</strong> para tirar outra</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Quando Usar:</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">🛒 Perguntar antes de comprar</p>
                <p className="text-sm text-gray-700">Você está na feira e quer perguntar se pode comprar aquela fruta. Tire foto e mande!</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">🌅 Mostrar algo bonito</p>
                <p className="text-sm text-gray-700">Um pôr do sol, uma planta que floriu, um bichinho fofo</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">📍 Compartilhar momentos</p>
                <p className="text-sm text-gray-700">Você está num lugar legal e quer mostrar para a família</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">📋 Fotografar documentos</p>
                <p className="text-sm text-gray-700">Receita médica, conta, papel importante</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Dicas Importantes:</h3>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded">
                <p className="text-sm text-gray-800">🧹 Limpe a lente da câmera antes, para a foto sair boa</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="text-sm text-gray-800">🤚 Segure firme o celular, sem tremer</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="text-sm text-gray-800">💡 Se a foto sair escura, acenda a luz do ambiente</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="text-sm text-gray-800">⚡ Para usar o flash, procure o ícone de raio na tela da câmera</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🔄 Diferença:</h3>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded-lg border-2 border-cyan-400">
                <p className="font-semibold text-gray-900 mb-1">📷 Câmera</p>
                <p className="text-sm text-gray-700">Tira foto nova AGORA</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">🖼️ Galeria</p>
                <p className="text-sm text-gray-700">Escolhe foto antiga que já está salva</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}