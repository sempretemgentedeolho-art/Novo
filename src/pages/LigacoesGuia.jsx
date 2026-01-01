import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Phone, Video, PhoneCall, PhoneMissed, PhoneIncoming, PhoneOutgoing, Plus } from "lucide-react";

export default function LigacoesGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Ligações. Aba Ligações do WhatsApp. Aqui fica o histórico de todas as vezes que você ligou para alguém ou recebeu uma chamada pelo WhatsApp. Vou explicar tudo direitinho. Histórico de Ligações: Você verá uma lista com os nomes das pessoas e o horário das ligações. É como uma lista de chamadas do celular, mas só do WhatsApp. Seta Vermelha: Significa que você perdeu uma ligação. Alguém te ligou, mas você não atendeu. Seta Verde para Cima: Significa que você FEZ a ligação. Você que ligou para a pessoa. Seta Verde para Baixo: Significa que você RECEBEU e atendeu a ligação. A pessoa te ligou e você atendeu. Ícone de Telefone com Mais: Toque neste botão para escolher um contato e fazer uma nova ligação de voz ou de vídeo. Agora, a diferença importante dos ícones. Telefone: Liga apenas para ouvir a voz, como um telefone comum. Você não vê a imagem da pessoa. Câmera: Liga para ver a imagem da pessoa enquanto fala. É a chamada de vídeo. As ligações pelo WhatsApp são grátis! Você só precisa estar conectado na internet, seja pelo Wi-Fi ou pelos dados móveis. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Aba Ligações</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center">
              <Phone className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* O que é */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">📞 O que é?</h2>
            <p className="text-gray-700 leading-relaxed">
              Aqui fica o <strong>histórico de todas as vezes</strong> que você ligou para alguém ou recebeu uma chamada pelo WhatsApp.
            </p>
          </div>

          {/* Histórico */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Histórico de Ligações</h2>
            <p className="text-gray-700 mb-4">
              Você verá uma <strong>lista com os nomes</strong> das pessoas e o <strong>horário</strong> das ligações.
            </p>
            
            {/* Exemplo de lista */}
            <div className="bg-gray-50 rounded-lg p-3 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  👩
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Maria Silva</p>
                  <p className="text-xs text-gray-600">Hoje, 14:30</p>
                </div>
                <PhoneOutgoing className="w-5 h-5 text-green-600" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  👨
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">João Pedro</p>
                  <p className="text-xs text-gray-600">Ontem, 10:15</p>
                </div>
                <PhoneMissed className="w-5 h-5 text-red-600" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  👩
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Ana Costa</p>
                  <p className="text-xs text-gray-600">23/12, 16:45</p>
                </div>
                <PhoneIncoming className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Significado das setas */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">⬆️⬇️ O que significam as setas:</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg flex items-start gap-3">
                <PhoneMissed className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Seta Vermelha</p>
                  <p className="text-sm text-gray-700">Significa que você <strong>perdeu uma ligação</strong>. Alguém te ligou, mas você não atendeu.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-start gap-3">
                <PhoneOutgoing className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Seta Verde ↗️ (para cima)</p>
                  <p className="text-sm text-gray-700">Significa que <strong>você FEZ a ligação</strong>. Você que ligou para a pessoa.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-start gap-3">
                <PhoneIncoming className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Seta Verde ↙️ (para baixo)</p>
                  <p className="text-sm text-gray-700">Significa que você <strong>RECEBEU e atendeu</strong> a ligação. A pessoa te ligou e você atendeu.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nova ligação */}
          <div className="bg-purple-50 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Plus className="w-8 h-8 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Fazer Nova Ligação</h2>
            </div>
            <p className="text-gray-700 mb-3">
              Toque no <strong>ícone de telefone com mais (+)</strong> para escolher um contato e fazer uma nova ligação de voz ou de vídeo.
            </p>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                💡 O botão geralmente fica no canto inferior direito da tela de ligações
              </p>
            </div>
          </div>

          {/* Diferença dos tipos */}
          <div className="bg-white border-2 border-[#25D366] rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📱 Diferença dos Ícones:</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-2">📞 Telefone (Voz)</p>
                  <p className="text-gray-700 mb-2">Liga apenas para <strong>ouvir a voz</strong>, como um telefone comum.</p>
                  <p className="text-sm text-gray-600">Você <strong>não vê</strong> a imagem da pessoa. É mais leve e gasta menos internet.</p>
                </div>
              </div>

              <div className="h-px bg-gray-200" />

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Video className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-2">🎥 Câmera (Vídeo)</p>
                  <p className="text-gray-700 mb-2">Liga para <strong>ver a imagem</strong> da pessoa enquanto fala.</p>
                  <p className="text-sm text-gray-600">É a <strong>chamada de vídeo</strong>. Vocês se veem pela câmera. Gasta mais internet.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Importante saber */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">⚠️ Importante saber:</h2>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900">💰 Ligações são grátis!</p>
                <p className="text-sm text-gray-700">Você só precisa estar conectado na internet (Wi-Fi ou dados móveis)</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">📶 Precisa de internet</p>
                <p className="text-sm text-gray-700">Se a internet estiver ruim, a ligação pode travar ou ter eco</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">🎥 Vídeo gasta mais</p>
                <p className="text-sm text-gray-700">Chamadas de vídeo consomem mais internet que as de voz</p>
              </div>
            </div>
          </div>

          {/* Quando usar */}
          <div className="bg-green-50 rounded-lg p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💚 Quando usar:</h2>
            <ul className="space-y-2 text-gray-700">
              <li>✓ <strong>Voz:</strong> Para conversas rápidas e economizar internet</li>
              <li>✓ <strong>Vídeo:</strong> Para ver a pessoa (netos, filhos distantes)</li>
              <li>✓ <strong>Vídeo:</strong> Para mostrar algo pela câmera</li>
              <li>✓ <strong>Vídeo:</strong> Para se sentir mais perto de quem está longe</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}