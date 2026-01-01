import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, User, Phone, Video, Bell, Shield, Heart, Ban } from "lucide-react";

export default function VerContatoGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Ver Contato. Aqui você vê todas as informações de uma pessoa no WhatsApp. É como uma fichinha com os dados dela. Vou explicar tudo que tem nesta tela. Foto e Nome: Lá em cima você vê a foto de perfil e o nome completo da pessoa. Número de Telefone: Logo abaixo aparece o número de telefone dela. Se você tocar no número, pode ligar para ela pelo telefone normal, não pelo WhatsApp. Recado ou Status: Embaixo do número tem o recado da pessoa. É uma frasinha que ela escolheu para aparecer no perfil dela. Botões de Ação: Você vai ver alguns botões grandes. Mensagem: para enviar uma mensagem. Chamada de voz: para ligar só com voz. Chamada de vídeo: para ligar com imagem. Mídia, links e documentos: toque aqui para ver todas as fotos, vídeos e arquivos que vocês já trocaram. Fica tudo organizado ali. Silenciar notificações: se você não quer ouvir o barulhinho quando essa pessoa mandar mensagem, toque aqui. Papel de parede: muda o fundo da conversa só com essa pessoa. Mais Opções: tem ainda outras opções como bloquear contato, denunciar, adicionar aos favoritos. Use ver contato sempre que quiser saber mais informações sobre alguém ou para acessar configurações especiais daquela conversa. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Ver Contato</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Header do perfil */}
          <div className="bg-[#008069] text-white px-4 pb-6 pt-2">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-6xl mb-3">
                👩
              </div>
              <h2 className="text-2xl font-semibold mb-1">Maria Silva</h2>
              <p className="text-white/80">+55 51 9999-8888</p>
            </div>
          </div>

          {/* Info card */}
          <div className="p-4">
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">💡 O que é esta tela?</h3>
              <p className="text-sm text-gray-700">
                Aqui você vê todas as informações de uma pessoa no WhatsApp. É como uma <strong>fichinha com os dados dela</strong>.
              </p>
            </div>
          </div>

          {/* O que você vê */}
          <div className="px-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">👁️ O que você vê nesta tela:</h3>
            
            <div className="space-y-4">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Foto e Nome</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Lá em cima você vê a <strong>foto de perfil</strong> e o <strong>nome completo</strong> da pessoa.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-6 h-6 text-green-600" />
                  <h4 className="font-semibold text-gray-900">Número de Telefone</h4>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Logo abaixo aparece o <strong>número de telefone</strong> dela.
                </p>
                <div className="bg-yellow-50 p-2 rounded">
                  <p className="text-xs text-gray-800">
                    💡 Se você tocar no número, pode ligar pelo telefone normal (não pelo WhatsApp)
                  </p>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-6 h-6 text-pink-600" />
                  <h4 className="font-semibold text-gray-900">Recado ou Status</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Embaixo do número tem o <strong>recado</strong> da pessoa. É uma frasinha que ela escolheu para aparecer no perfil dela.
                </p>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="px-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Botões de Ação:</h3>
            
            <div className="space-y-3">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                    <span className="text-white text-xl">💬</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Mensagem</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Toque aqui para enviar uma mensagem para essa pessoa
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Chamada de Voz</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Liga só com voz (como telefone normal)
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Chamada de Vídeo</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Liga com imagem (você vê a pessoa)
                </p>
              </div>
            </div>
          </div>

          {/* Outras opções */}
          <div className="px-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚙️ Outras Opções Importantes:</h3>
            
            <div className="space-y-3">
              <div className="bg-white border border-gray-300 rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">📁 Mídia, links e documentos</p>
                <p className="text-sm text-gray-700">Ver todas as fotos, vídeos e arquivos trocados</p>
              </div>

              <div className="bg-white border border-gray-300 rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">🔕 Silenciar notificações</p>
                <p className="text-sm text-gray-700">Parar de receber avisos sonoros dessa pessoa</p>
              </div>

              <div className="bg-white border border-gray-300 rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">🖼️ Papel de parede</p>
                <p className="text-sm text-gray-700">Mudar o fundo só desta conversa</p>
              </div>

              <div className="bg-white border border-gray-300 rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">⭐ Adicionar aos favoritos</p>
                <p className="text-sm text-gray-700">Deixar essa conversa sempre no topo</p>
              </div>

              <div className="bg-white border border-gray-300 rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">🚫 Bloquear contato</p>
                <p className="text-sm text-gray-700">Impedir que essa pessoa te mande mensagens</p>
              </div>
            </div>
          </div>

          {/* Quando usar */}
          <div className="px-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">💚 Quando usar:</h3>
              <p className="text-sm text-gray-700">
                Use <strong>Ver Contato</strong> sempre que quiser saber mais informações sobre alguém ou para acessar configurações especiais daquela conversa!
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}