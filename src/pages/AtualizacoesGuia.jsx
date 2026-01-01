import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Bell, Plus, Eye, Rss } from "lucide-react";

export default function AtualizacoesGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Atualizações. Aba Atualizações do WhatsApp. Nesta aba, você acompanha as novidades rápidas dos seus amigos e segue canais de notícias ou temas que você gosta. Vou explicar tudo com calma. Primeiro, o Meu Status. Toque aqui para postar uma foto ou vídeo que vai sumir sozinho em 24 horas. É como mostrar para seus amigos o que você está fazendo agora, mas a foto não fica guardada para sempre. Segundo, Círculos de Amigos. Você vai ver círculos coloridos com fotos dos seus contatos. Toque em um círculo para ver as fotos ou vídeos que seus amigos postaram. Se o círculo estiver verde, significa que tem coisa nova para ver. Terceiro, Canais. Abaixo dos status dos amigos, você encontra os canais. Canais são como páginas de notícias, esportes, receitas ou fofocas que você pode seguir para se manter informado. É como escolher quais jornais você quer ler. A aba de Atualizações é perfeita para ver o que está acontecendo com seus amigos e para ficar por dentro de assuntos que você gosta. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Aba Atualizações</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center">
              <Bell className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* O que é */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">📢 O que é?</h2>
            <p className="text-gray-700 leading-relaxed">
              Nesta aba, você acompanha as <strong>novidades rápidas (Status)</strong> de seus amigos e segue <strong>canais</strong> de notícias ou temas que você gosta.
            </p>
          </div>

          {/* Meu Status */}
          <div className="bg-white border-2 border-[#25D366] rounded-lg p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Plus className="w-8 h-8 text-[#25D366]" />
              <h2 className="text-xl font-semibold text-gray-900">Meu Status</h2>
            </div>
            <p className="text-gray-700 mb-3">
              Toque aqui para <strong>postar uma foto ou vídeo</strong> que sumirá em 24 horas.
            </p>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                💡 É como mostrar para seus amigos o que você está fazendo agora, mas a foto não fica guardada para sempre. Depois de 24 horas, ela desaparece sozinha!
              </p>
            </div>
          </div>

          {/* Círculos de Amigos */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-8 h-8 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Círculos de Amigos</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Você vai ver <strong>círculos coloridos</strong> com fotos dos seus contatos.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex-shrink-0 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Círculo Verde</p>
                  <p className="text-sm text-gray-700">Tem coisa nova para ver! Seu amigo postou algo</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Círculo Cinza</p>
                  <p className="text-sm text-gray-700">Você já viu todos os status desse amigo</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg mt-4">
              <p className="text-sm text-gray-800">
                <strong>Como usar:</strong> Toque no círculo para ver as fotos ou vídeos que seus amigos postaram. Passe o dedo para o lado para ver o próximo.
              </p>
            </div>
          </div>

          {/* Canais */}
          <div className="bg-orange-50 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Rss className="w-8 h-8 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">Canais</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Abaixo dos status dos amigos, você encontra os <strong>canais</strong>. Canais são como páginas de notícias que você pode seguir.
            </p>

            <div className="bg-white p-4 rounded-lg mb-3">
              <h3 className="font-semibold text-gray-900 mb-2">Tipos de canais:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>📰 Notícias do Brasil e do mundo</li>
                <li>⚽ Esportes e times de futebol</li>
                <li>🍳 Receitas de cozinha</li>
                <li>🎬 Fofocas de famosos</li>
                <li>🙏 Mensagens religiosas</li>
                <li>💰 Dicas de economia</li>
              </ul>
            </div>

            <div className="bg-yellow-100 p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                💡 <strong>Como seguir um canal:</strong> Procure por temas que você gosta, toque no canal e depois em "Seguir". As atualizações do canal vão aparecer para você!
              </p>
            </div>
          </div>

          {/* Diferença importante */}
          <div className="bg-red-50 border-l-4 border-red-400 p-5 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">⚠️ Importante saber:</h2>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900">Status dos amigos:</p>
                <p className="text-sm text-gray-700">Seus amigos postam e some em 24 horas</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Canais:</p>
                <p className="text-sm text-gray-700">Páginas de notícias que você escolhe seguir. As mensagens não somem.</p>
              </div>
            </div>
          </div>

          {/* Quando usar */}
          <div className="bg-green-50 rounded-lg p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💚 Quando usar:</h2>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Ver o que seus amigos e familiares estão fazendo</li>
              <li>✓ Compartilhar momentos do seu dia (sem ficar salvo para sempre)</li>
              <li>✓ Acompanhar notícias de assuntos que você gosta</li>
              <li>✓ Seguir seu time de futebol ou artista favorito</li>
              <li>✓ Receber dicas e informações úteis</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}