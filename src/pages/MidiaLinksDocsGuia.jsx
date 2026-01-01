import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Image, Video, FileText, Link, Music, Download } from "lucide-react";

export default function MidiaLinksDocsGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Mídia, links e documentos. Aqui fica tudo que você e a pessoa já trocaram na conversa! É como um arquivo guardado. Vou explicar cada parte. Primeiro, Mídia. São as fotos e vídeos que vocês enviaram um para o outro. Toque em Mídia para ver todas as fotos juntas. É muito útil quando você quer encontrar aquela foto que alguém te mandou há um tempo atrás. Segundo, Links. São os endereços de internet que foram compartilhados na conversa. Por exemplo: se alguém te mandou um link de uma notícia ou de um vídeo do YouTube, fica tudo guardado aqui. Terceiro, Documentos. São arquivos como PDF, Word, planilhas que foram enviados. Por exemplo: se alguém te mandou um boleto, uma receita médica em PDF, ou um documento, você encontra aqui. Quarto, Áudios. As mensagens de voz que foram enviadas ficam organizadas aqui também. Como usar: Toque em cada aba para ver o que tem guardado. Se quiser salvar algo no seu celular, toque e segure em cima e escolha salvar. Esta tela é perfeita para encontrar coisas antigas sem precisar rolar a conversa inteira! Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Mídia, links e docs</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Image className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* O que é */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">📁 O que é?</h2>
            <p className="text-gray-700 leading-relaxed">
              Aqui fica <strong>tudo que você e a pessoa já trocaram</strong> na conversa! É como um arquivo guardado de fotos, vídeos, links e documentos.
            </p>
          </div>

          {/* Mídia */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Image className="w-8 h-8 text-pink-600" />
              <h3 className="text-xl font-semibold text-gray-900">📸 Mídia (Fotos e Vídeos)</h3>
            </div>
            <p className="text-gray-700 mb-3">
              São as <strong>fotos e vídeos</strong> que vocês enviaram um para o outro.
            </p>
            <div className="bg-white p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-800">
                <strong>Como ver:</strong> Toque em "Mídia" para ver todas as fotos juntas, como uma galeria
              </p>
              <p className="text-sm text-gray-800">
                <strong>Quando usar:</strong> Quer encontrar aquela foto que alguém te mandou há um tempo atrás
              </p>
              <p className="text-sm text-gray-800">
                <strong>Como salvar:</strong> Toque na foto → Toque nos 3 pontinhos → Salvar
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="bg-blue-50 rounded-lg p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Link className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">🔗 Links</h3>
            </div>
            <p className="text-gray-700 mb-3">
              São os <strong>endereços de internet</strong> que foram compartilhados na conversa.
            </p>
            <div className="bg-white p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-800">
                <strong>Exemplos:</strong> Link de uma notícia, vídeo do YouTube, site de loja
              </p>
              <p className="text-sm text-gray-800">
                <strong>Como usar:</strong> Toque no link para abrir no navegador
              </p>
              <p className="text-sm text-gray-800">
                <strong>Útil para:</strong> Encontrar aquele site que alguém te mandou
              </p>
            </div>
          </div>

          {/* Documentos */}
          <div className="bg-orange-50 rounded-lg p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-semibold text-gray-900">📄 Documentos</h3>
            </div>
            <p className="text-gray-700 mb-3">
              São <strong>arquivos</strong> como PDF, Word, planilhas que foram enviados.
            </p>
            <div className="bg-white p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-800">
                <strong>Exemplos:</strong> Boleto, receita médica em PDF, planilha, documento
              </p>
              <p className="text-sm text-gray-800">
                <strong>Como abrir:</strong> Toque no arquivo para abrir e ler
              </p>
              <p className="text-sm text-gray-800">
                <strong>Como baixar:</strong> Toque e segure → Escolha "Salvar"
              </p>
            </div>
          </div>

          {/* Áudios */}
          <div className="bg-green-50 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Music className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">🎵 Áudios</h3>
            </div>
            <p className="text-gray-700 mb-3">
              As <strong>mensagens de voz</strong> que foram enviadas ficam organizadas aqui.
            </p>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-800">
                💡 Toque em um áudio para ouvir novamente
              </p>
            </div>
          </div>

          {/* Como usar */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Como usar:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Abra a conversa com a pessoa</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <p className="text-gray-700 pt-1">Toque nos 3 pontinhos no topo</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <p className="text-gray-700 pt-1">Escolha "Mídia, links e docs"</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <p className="text-gray-700 pt-1">Navegue pelas abas: Mídia, Links, Documentos</p>
              </div>
            </div>
          </div>

          {/* Vantagens */}
          <div className="bg-green-100 border-l-4 border-green-500 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💚 Por que é útil:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Encontrar fotos antigas sem rolar a conversa toda</li>
              <li>✓ Achar aquele link importante que alguém te mandou</li>
              <li>✓ Ver os documentos que você recebeu</li>
              <li>✓ Salvar fotos e vídeos no celular</li>
              <li>✓ Tudo organizado e fácil de encontrar!</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}