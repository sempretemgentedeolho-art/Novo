import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Type, Eye, Sparkles, Volume2, Hand, Ear, ChevronRight } from "lucide-react";

export default function Acessibilidade() {
  const navigate = useNavigate();
  const [textSize, setTextSize] = useState("Médio");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Acessibilidade. Esta é uma tela muito importante! Aqui você ajusta o WhatsApp para ficar mais confortável de usar. Vou explicar tudo com muito carinho. Tamanho do texto: você pode aumentar as letras para enxergar melhor. Se estiver pequeno, é só aumentar! Contraste elevado: deixa as cores mais fortes, ajuda muito a enxergar melhor. Reduzir animações: se as coisas mexem rápido demais na tela e te incomodam, aqui você pode deixar tudo mais calmo. Volume e vibração: para ajustar o som e a vibração do jeito que você gosta. Interação por toque: se você tem dificuldade para tocar na tela, aqui tem ajudas especiais. Leitura de tela: ativa o leitor de tela do celular, que fala tudo que está na tela para você. Role com calma para ver todas as opções. Clique na seta à sua esquerda acima para voltar."
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

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("ConfiguracoesWhatsApp"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Acessibilidade</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Info card */}
          <div className="bg-blue-50 mx-4 mt-4 mb-4 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">💙 Feito para você!</h3>
            <p className="text-sm text-gray-700">
              Estas configurações ajudam a deixar o WhatsApp mais fácil e confortável de usar. Não tenha pressa, explore cada opção com calma.
            </p>
          </div>

          {/* Visual */}
          <div className="px-4 py-3 border-b-8 border-gray-100">
            <h3 className="text-sm text-gray-500 mb-3">👁️ Ajustes visuais</h3>

            <button onClick={() => navigate(createPageUrl("TamanhoTexto"))} className="w-full flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Type className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left font-medium">Tamanho do texto</h4>
                  <p className="text-sm text-gray-500 text-left">
                    Aumentar ou diminuir o tamanho das letras
                  </p>
                  <p className="text-sm text-[#25D366] text-left mt-1">{textSize}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button onClick={() => navigate(createPageUrl("ContrasteElevado"))} className="w-full flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left font-medium">Contraste elevado</h4>
                  <p className="text-sm text-gray-500 text-left">
                    Cores mais fortes e vibrantes para enxergar melhor
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button onClick={() => navigate(createPageUrl("ReduzirAnimacoes"))} className="w-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left font-medium">Reduzir animações</h4>
                  <p className="text-sm text-gray-500 text-left">
                    Deixa tudo mais calmo, sem movimentos rápidos
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Som e feedback */}
          <div className="px-4 py-3 border-b-8 border-gray-100">
            <h3 className="text-sm text-gray-500 mb-3">🔊 Som e feedback</h3>

            <button onClick={() => navigate(createPageUrl("VolumeNotificacoes"))} className="w-full flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Volume2 className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left font-medium">Volume das notificações</h4>
                  <p className="text-sm text-gray-500 text-left">
                    Ajuste o volume dos avisos do WhatsApp
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button onClick={() => navigate(createPageUrl("ForcaVibracao"))} className="w-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-600"></div>
                </div>
                <div>
                  <h4 className="text-gray-900 text-left font-medium">Força da vibração</h4>
                  <p className="text-sm text-gray-500 text-left">
                    Ajuste a intensidade da vibração
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Interação */}
          <div className="px-4 py-3 border-b-8 border-gray-100">
            <h3 className="text-sm text-gray-500 mb-3">👆 Interação e toque</h3>

            <button onClick={() => navigate(createPageUrl("TempoToque"))} className="w-full flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Hand className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 text-left font-medium">Tempo de toque</h4>
                  <p className="text-sm text-gray-500 text-left">
                    Quanto tempo precisa segurar a tela para funcionar
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button onClick={() => navigate(createPageUrl("AtrasoToque"))} className="w-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center text-xl">
                  ⌚
                </div>
                <div>
                  <h4 className="text-gray-900 text-left font-medium">Atraso do toque</h4>
                  <p className="text-sm text-gray-500 text-left">
                    Ajuda se você toca sem querer na tela
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Leitores de tela */}
          <div className="px-4 py-3 border-b-8 border-gray-100">
            <h3 className="text-sm text-gray-500 mb-3">🎙️ Leitura de tela</h3>

            <button onClick={() => navigate(createPageUrl("TalkBack"))} className="w-full flex justify-between items-start">
              <div className="flex items-start gap-3">
                <Ear className="w-6 h-6 text-gray-600 mt-1" />
                <div>
                  <h4 className="text-gray-900 text-left font-medium mb-1">TalkBack</h4>
                  <p className="text-sm text-gray-500 text-left">
                    O celular lê tudo que está na tela em voz alta. Muito útil para quem não enxerga bem. Desativado no momento.
                  </p>
                  <p className="text-sm text-[#25D366] text-left mt-2">Ativar nas configurações do celular</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
            </button>
          </div>

          {/* Legendas */}
          <div className="px-4 py-4">
            <h3 className="text-sm text-gray-500 mb-3">📝 Legendas</h3>

            <button onClick={() => navigate(createPageUrl("LegendasVideos"))} className="w-full flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center text-xl mt-1">
                  CC
                </div>
                <div>
                  <h4 className="text-gray-900 text-left font-medium mb-1">Legendas em vídeos</h4>
                  <p className="text-sm text-gray-500 text-left">
                    Mostra legendas escritas quando você assiste vídeos
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Dica final */}
          <div className="bg-green-50 mx-4 mb-6 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">💚 Dica importante</h3>
            <p className="text-sm text-gray-700">
              Não tenha medo de mexer! Você pode testar cada opção e ver qual fica melhor para você. Se não gostar, é só voltar aqui e mudar de novo. Está tudo nas suas mãos!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}