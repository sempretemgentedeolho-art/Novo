import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Paperclip } from "lucide-react";

export default function ClipeAnexoGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Botão do Clipe ou Anexo. Esse botão é muito útil! Serve para você enviar arquivos pelo WhatsApp. Vou explicar tudinho. O que é? É o ícone de um clipe de papel que fica lá embaixo, do lado esquerdo, perto de onde você escreve as mensagens. Para que serve? Serve para você anexar e enviar vários tipos de coisas. Documentos: como PDF, boletos, receitas médicas. Fotos da galeria: fotos que já estão salvas no seu celular. Vídeos: vídeos que você gravou ou recebeu. Áudios: músicas ou gravações. Localização: onde você está no mapa. Contato: o número de telefone de alguém. Como usar. Passo um: Abra a conversa com a pessoa. Passo dois: Olhe lá embaixo, do lado esquerdo da caixinha de mensagem. Toque no ícone do clipe. Passo três: Vai abrir um menu com várias opções. Documento: para enviar PDF, boleto, arquivo. Câmera: para tirar uma foto na hora. Galeria: para escolher foto ou vídeo que já está no celular. Áudio: para enviar uma música. Localização: para mostrar onde você está. Contato: para enviar o telefone de alguém. Passo quatro: Escolha a opção que você quer. Passo cinco: Selecione o arquivo e confirme o envio. Quando usar cada opção. Documento: para enviar exames, boletos, receitas. Galeria: para enviar fotos antigas que estão no celular. Localização: para mostrar onde você está, ou passar um endereço. Contato: para passar o telefone do médico, por exemplo. Importante. Os arquivos muito grandes podem demorar para enviar. Prefira usar WiFi para enviar vídeos e arquivos grandes. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Botão do Clipe</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
              <Paperclip className="w-16 h-16 text-white" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">📎 O que é?</h2>
            <p className="text-gray-700">
              É o ícone de um <strong>clipe de papel 📎</strong> que fica lá embaixo, do lado esquerdo, perto de onde você escreve as mensagens.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💜 Para que serve?</h2>
            <p className="text-gray-700 mb-3">
              Serve para você <strong>anexar e enviar</strong> vários tipos de coisas:
            </p>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded flex items-center gap-2">
                <span className="text-xl">📄</span>
                <p className="text-gray-800"><strong>Documentos:</strong> PDF, boletos, receitas médicas</p>
              </div>
              <div className="bg-white p-2 rounded flex items-center gap-2">
                <span className="text-xl">📸</span>
                <p className="text-gray-800"><strong>Fotos da galeria:</strong> fotos já salvas no celular</p>
              </div>
              <div className="bg-white p-2 rounded flex items-center gap-2">
                <span className="text-xl">🎥</span>
                <p className="text-gray-800"><strong>Vídeos:</strong> vídeos que você gravou</p>
              </div>
              <div className="bg-white p-2 rounded flex items-center gap-2">
                <span className="text-xl">📍</span>
                <p className="text-gray-800"><strong>Localização:</strong> onde você está no mapa</p>
              </div>
              <div className="bg-white p-2 rounded flex items-center gap-2">
                <span className="text-xl">👤</span>
                <p className="text-gray-800"><strong>Contato:</strong> número de telefone de alguém</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-600 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Como Usar:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Abra a conversa com a pessoa</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <p className="text-gray-700 pt-1">Olhe lá embaixo, do lado esquerdo da caixinha de mensagem. Toque no <strong>ícone do clipe 📎</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <div className="pt-1">
                  <p className="text-gray-700 mb-2">Vai abrir um menu com várias opções:</p>
                  <div className="ml-3 space-y-1 text-sm">
                    <p className="text-gray-700">• <strong>Documento:</strong> PDF, boleto, arquivo</p>
                    <p className="text-gray-700">• <strong>Câmera:</strong> tirar foto na hora</p>
                    <p className="text-gray-700">• <strong>Galeria:</strong> foto/vídeo do celular</p>
                    <p className="text-gray-700">• <strong>Áudio:</strong> enviar música</p>
                    <p className="text-gray-700">• <strong>Localização:</strong> mostrar onde você está</p>
                    <p className="text-gray-700">• <strong>Contato:</strong> enviar telefone</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <p className="text-gray-700 pt-1">Escolha a opção que você quer</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  5
                </div>
                <p className="text-gray-700 pt-1">Selecione o arquivo e confirme o envio</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Quando Usar Cada Opção:</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">📄 Documento</p>
                <p className="text-sm text-gray-700">Para enviar exames, boletos, receitas médicas em PDF</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">🖼️ Galeria</p>
                <p className="text-sm text-gray-700">Para enviar fotos antigas que já estão salvas no celular</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">📍 Localização</p>
                <p className="text-sm text-gray-700">Para mostrar onde você está, ou passar um endereço</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">👤 Contato</p>
                <p className="text-sm text-gray-700">Para passar o telefone do médico, dentista, etc.</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Importante:</h3>
            <div className="space-y-2">
              <p className="text-gray-800">
                📦 Os arquivos muito grandes podem demorar para enviar
              </p>
              <p className="text-gray-800">
                📶 Prefira usar <strong>WiFi</strong> para enviar vídeos e arquivos grandes
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}