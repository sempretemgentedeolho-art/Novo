import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Mic } from "lucide-react";

export default function MicrofoneAudioGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Botão do Microfone. Este é um dos botões mais úteis do WhatsApp! Vou explicar tudo com muito carinho, porque ele tem DUAS funções importantes. Onde fica? É o ícone de um microfone que fica lá embaixo, do lado direito da tela, quando você está numa conversa. Ele tem DUAS funções principais. PRIMEIRA FUNÇÃO: Mandar Áudio. Você pode gravar sua voz e mandar para a pessoa. É como deixar um recado! Como gravar e mandar áudio. Passo um: Abra a conversa. Passo dois: Toque e SEGURE o microfone. Não solte! Passo três: Fale o que você quer dizer, bem pertinho do celular. Passo quatro: Quando terminar de falar, SOLTE o dedo do microfone. Pronto! O áudio vai ser enviado automaticamente. IMPORTANTE sobre áudio: Se você soltar o microfone, o áudio é enviado na hora. Se você arrasta o dedo para o lado (para a esquerda) antes de soltar, o áudio é cancelado. Você pode gravar áudios longos, sem pressa. Fale devagar e com calma. SEGUNDA FUNÇÃO: Escrever Falando. Digitação por voz! Você fala e o WhatsApp escreve para você! É perfeito para quem tem dificuldade para digitar. Como usar a digitação por voz. Passo um: Toque na caixinha onde você escreve mensagens. Passo dois: Olhe o teclado que aparece. No canto inferior direito do teclado, tem um ícone de microfone. Passo três: Toque nesse microfone do teclado. Passo quatro: Quando aparecer Fale agora, comece a falar. Passo cinco: O WhatsApp vai escrever tudo que você falar! Passo seis: Quando terminar, toque em OK ou no botão de enviar. Diferença importante. Segurar o microfone da conversa: manda áudio com sua voz. Tocar no microfone do teclado: escreve o que você fala. Dicas para digitação por voz. Fale devagar e com clareza. Fale a pontuação. Diga vírgula, ponto, interrogação. Por exemplo: Oi filho vírgula tudo bem interrogação. Escolha um lugar silencioso, sem barulho de fundo. Se errar, não tem problema! É só apagar e falar de novo. Quando usar cada função. Use áudio gravado: quando quiser que a pessoa ouça sua voz, para dar um recado carinhoso. Use digitação por voz: quando você quer enviar mensagem escrita mas não consegue ou não gosta de digitar. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.70;
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
          <h1 className="text-xl font-semibold ml-4">Botão do Microfone</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
              <Mic className="w-16 h-16 text-white" />
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">🎤 Onde fica?</h2>
            <p className="text-gray-700 mb-3">
              É o ícone de um <strong>microfone 🎤</strong> que fica lá embaixo, do <strong>lado direito</strong> da tela, quando você está numa conversa.
            </p>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <p className="text-sm text-gray-800 font-semibold">
                ⚡ Ele tem DUAS funções importantes!
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-5 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 PRIMEIRA FUNÇÃO: Mandar Áudio</h2>
            <p className="text-gray-700 mb-4">
              Você pode <strong>gravar sua voz</strong> e mandar para a pessoa. É como deixar um recado!
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">📝 Como Gravar e Mandar Áudio:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Abra a conversa</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <p className="text-gray-700 pt-1">Toque e <strong>SEGURE</strong> o microfone. Não solte!</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <p className="text-gray-700 pt-1">Fale o que você quer dizer, bem <strong>pertinho do celular</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <p className="text-gray-700 pt-1">Quando terminar de falar, <strong>SOLTE</strong> o dedo do microfone</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <p className="text-sm text-gray-800">
                  ✅ Pronto! O áudio vai ser enviado automaticamente!
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
              <h4 className="font-semibold text-gray-900 mb-2">⚠️ IMPORTANTE sobre áudio:</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-800">✓ Se você <strong>soltar</strong> o microfone, o áudio é enviado na hora</p>
                <p className="text-gray-800">✓ Se você <strong>arrasta o dedo para a esquerda</strong> antes de soltar, o áudio é cancelado</p>
                <p className="text-gray-800">✓ Você pode gravar áudios longos, sem pressa</p>
                <p className="text-gray-800">✓ Fale devagar e com calma</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">✍️ SEGUNDA FUNÇÃO: Escrever Falando</h2>
            <p className="text-gray-700 mb-4">
              <strong>Digitação por voz!</strong> Você fala e o WhatsApp escreve para você! É perfeito para quem tem dificuldade para digitar.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">📝 Como Usar:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Toque na <strong>caixinha onde você escreve mensagens</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <p className="text-gray-700 pt-1">Olhe o teclado que aparece. No <strong>canto inferior direito do teclado</strong>, tem um ícone de microfone</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <p className="text-gray-700 pt-1">Toque nesse <strong>microfone do teclado</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <p className="text-gray-700 pt-1">Quando aparecer "Fale agora", comece a falar</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  5
                </div>
                <p className="text-gray-700 pt-1">O WhatsApp vai <strong>escrever tudo</strong> que você falar!</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  6
                </div>
                <p className="text-gray-700 pt-1">Quando terminar, toque em <strong>OK</strong> ou no botão de enviar</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🔄 Diferença Importante:</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border-2 border-blue-400">
                <p className="font-semibold text-gray-900 mb-2">🎤 Segurar microfone da conversa:</p>
                <p className="text-sm text-gray-700">Manda <strong>áudio com sua voz</strong></p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-purple-400">
                <p className="font-semibold text-gray-900 mb-2">⌨️ Tocar microfone do teclado:</p>
                <p className="text-sm text-gray-700"><strong>Escreve</strong> o que você fala</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Dicas para Digitação por Voz:</h3>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded">
                <p className="text-sm text-gray-800">🗣️ Fale devagar e com clareza</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-sm text-gray-800">📝 Fale a pontuação: diga "vírgula", "ponto", "interrogação"</p>
                <p className="text-xs text-gray-600 mt-1">Ex: "Oi filho vírgula tudo bem interrogação"</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-sm text-gray-800">🔇 Escolha um lugar silencioso</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-sm text-gray-800">✏️ Se errar, é só apagar e falar de novo</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-100 border-l-4 border-blue-500 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💙 Quando Usar Cada Função:</h3>
            <div className="space-y-2">
              <p className="text-gray-800">
                <strong>🎤 Use áudio gravado:</strong> quando quiser que a pessoa ouça sua voz, para dar um recado carinhoso
              </p>
              <p className="text-gray-800">
                <strong>✍️ Use digitação por voz:</strong> quando você quer enviar mensagem escrita mas não consegue ou não gosta de digitar
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}