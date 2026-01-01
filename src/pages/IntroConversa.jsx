import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, MoreVertical, Phone, Video, Smile, Paperclip, Camera, Mic } from "lucide-react";

export default function IntroConversa() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Aqui você manda mensagem para o grupo ou para uma pessoa, seu filho, seu neto ou amigos. Vou explicar tudo que você tem na tela. Primeiro, lá em cima, do lado direito: Os três pontinhos: toque aqui para ver opções como Ver contato, Pesquisar, Adicionar aos favoritos, Silenciar, e muito mais. Clique nos três pontinhos à sua direita acima para conhecer melhor. O telefone: toque para fazer ligação de voz pelo WhatsApp. A câmera filmadora: toque para fazer videochamada e ver a pessoa. Agora, lá embaixo, onde você escreve: O emoji: a carinha sorrindo serve para adicionar carinhas e desenhos fofos nas mensagens. O clipe: serve para enviar fotos da galeria, documentos, localização e outros arquivos. A câmera fotográfica: tira uma foto na hora e envia. O microfone: tem duas funções. Segurar para gravar áudio, ou tocar no microfone do teclado para escrever falando. Agora, toque em cada ícone colorido na tela para aprender como usar cada função!"
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
          <h1 className="text-xl font-semibold ml-4">Como usar a Conversa</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💬 O que é esta tela?</h2>
            <p className="text-gray-700 leading-relaxed">
              Aqui você <strong>manda mensagem</strong> para o grupo ou para uma pessoa: seu filho, seu neto ou amigos.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⬆️ Botões Lá em Cima (Topo):</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate(createPageUrl("VerContatoGuia"))}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg p-4 text-left shadow-md active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MoreVertical className="w-8 h-8" />
                  <h4 className="text-lg font-semibold">Três Pontinhos ⋮</h4>
                </div>
                <p className="text-sm text-white/90">
                  Ver contato, Pesquisar, Favoritos, Silenciar e mais opções
                </p>
              </button>

              <button
                onClick={() => navigate(createPageUrl("TelefoneConversaGuia"))}
                className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg p-4 text-left shadow-md active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-8 h-8" />
                  <h4 className="text-lg font-semibold">Telefone 📞</h4>
                </div>
                <p className="text-sm text-white/90">
                  Fazer ligação de voz pelo WhatsApp (usa internet)
                </p>
              </button>

              <button
                onClick={() => navigate(createPageUrl("VideoConversaGuia"))}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4 text-left shadow-md active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Video className="w-8 h-8" />
                  <h4 className="text-lg font-semibold">Câmera Filmadora 📹</h4>
                </div>
                <p className="text-sm text-white/90">
                  Fazer videochamada e ver a pessoa pelo vídeo
                </p>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⬇️ Botões Lá Embaixo (Onde Escreve):</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate(createPageUrl("EmojiGuia"))}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg p-4 text-left shadow-md active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Smile className="w-8 h-8" />
                  <h4 className="text-lg font-semibold">Emoji 😊</h4>
                </div>
                <p className="text-sm text-white/90">
                  Adicionar carinhas e desenhos fofos nas mensagens
                </p>
              </button>

              <button
                onClick={() => navigate(createPageUrl("ClipeAnexoGuia"))}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg p-4 text-left shadow-md active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Paperclip className="w-8 h-8" />
                  <h4 className="text-lg font-semibold">Clipe 📎</h4>
                </div>
                <p className="text-sm text-white/90">
                  Enviar fotos da galeria, documentos, localização e arquivos
                </p>
              </button>

              <button
                onClick={() => navigate(createPageUrl("CameraConversaGuia"))}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg p-4 text-left shadow-md active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Camera className="w-8 h-8" />
                  <h4 className="text-lg font-semibold">Câmera Fotográfica 📷</h4>
                </div>
                <p className="text-sm text-white/90">
                  Tirar foto na hora e enviar rapidamente
                </p>
              </button>

              <button
                onClick={() => navigate(createPageUrl("MicrofoneAudioGuia"))}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg p-4 text-left shadow-md active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Mic className="w-8 h-8" />
                  <h4 className="text-lg font-semibold">Microfone 🎤</h4>
                </div>
                <p className="text-sm text-white/90">
                  Gravar áudio OU escrever falando (digitação por voz)
                </p>
              </button>
            </div>
          </div>

          <div className="bg-green-100 border-l-4 border-green-500 p-5 rounded">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">💚 Importante:</h3>
            <p className="text-gray-700">
              Não tenha pressa! Toque em cada botão colorido acima para aprender com calma como usar cada função. Está tudo explicado!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}