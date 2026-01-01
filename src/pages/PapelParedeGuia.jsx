import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Wallpaper, Image, Palette } from "lucide-react";

export default function PapelParedeGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Papel de Parede. Vou explicar o que é e como mudar o papel de parede das conversas! O que é papel de parede? É o fundo que aparece atrás das mensagens quando você está conversando. Sabe aquele desenho ou cor que fica de fundo? Isso é o papel de parede! Para que serve? Você pode mudar o papel de parede para deixar a conversa mais bonita ou mais fácil de ler. Algumas pessoas gostam de colocar uma foto da família, outras preferem cores claras para facilitar a leitura. Importante: Você pode mudar o papel de parede de DUAS formas. Primeira forma: Mudar só de UMA conversa. A conversa com Maria fica com um fundo, a conversa com João fica com outro. Segunda forma: Mudar de TODAS as conversas de uma vez. Todas as conversas ficam com o mesmo fundo. Como mudar só de uma conversa. Passo um: Abra a conversa que você quer mudar. Passo dois: Toque nos 3 pontinhos no topo. Passo três: Escolha Papel de parede. Passo quatro: Escolha entre usar uma foto da galeria, uma cor sólida, ou um dos papéis que o WhatsApp oferece. Passo cinco: Toque em Definir. Como mudar de todas as conversas. Vá em Configurações do WhatsApp. Toque em Conversas. Toque em Papel de parede. Escolha o papel que você quer. Marque a opção Usar em todas as conversas. Dicas de papel de parede. Para facilitar a leitura, escolha cores claras e lisas. Evite papéis muito coloridos ou cheios de desenhos, pois podem dificultar a leitura das mensagens. Se você tem dificuldade para enxergar, prefira fundo branco ou bege claro. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold ml-4">Papel de Parede</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
              <Wallpaper className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* O que é */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">🖼️ O que é?</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              É o <strong>fundo que aparece atrás das mensagens</strong> quando você está conversando.
            </p>
            <p className="text-gray-700">
              Sabe aquele desenho ou cor que fica de fundo? Isso é o papel de parede!
            </p>
          </div>

          {/* Para que serve */}
          <div className="bg-purple-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">✨ Para que serve?</h2>
            <p className="text-gray-700 mb-4">
              Você pode mudar o papel de parede para:
            </p>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded-lg flex items-center gap-2">
                <span className="text-xl">🎨</span>
                <p className="text-gray-800">Deixar a conversa mais bonita</p>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center gap-2">
                <span className="text-xl">👁️</span>
                <p className="text-gray-800">Facilitar a leitura das mensagens</p>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center gap-2">
                <span className="text-xl">❤️</span>
                <p className="text-gray-800">Colocar uma foto especial da família</p>
              </div>
            </div>
          </div>

          {/* Duas formas */}
          <div className="bg-orange-50 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Duas Formas de Mudar:</h3>
            
            <div className="space-y-3">
              <div className="bg-white border-2 border-blue-400 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">1️⃣</span>
                  <h4 className="font-semibold text-gray-900">Só UMA conversa</h4>
                </div>
                <p className="text-sm text-gray-700">
                  A conversa com Maria fica com um fundo, a conversa com João fica com outro
                </p>
              </div>

              <div className="bg-white border-2 border-green-400 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">2️⃣</span>
                  <h4 className="font-semibold text-gray-900">TODAS as conversas</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Todas as conversas ficam com o mesmo fundo
                </p>
              </div>
            </div>
          </div>

          {/* Como mudar só uma */}
          <div className="bg-green-50 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📝 Mudar Só Uma Conversa:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Abra a conversa que você quer mudar</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <p className="text-gray-700 pt-1">Toque nos 3 pontinhos no topo</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <p className="text-gray-700 pt-1">Escolha "Papel de parede"</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <div className="pt-1">
                  <p className="text-gray-700 mb-2">Escolha entre:</p>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm text-gray-700">📸 Usar uma foto da galeria</p>
                    <p className="text-sm text-gray-700">🎨 Uma cor sólida</p>
                    <p className="text-sm text-gray-700">🖼️ Um dos papéis que o WhatsApp oferece</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  5
                </div>
                <p className="text-gray-700 pt-1">Toque em "Definir"</p>
              </div>
            </div>
          </div>

          {/* Como mudar todas */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📝 Mudar TODAS as Conversas:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xl">1️⃣</span>
                <p className="text-gray-700 pt-0.5">Vá em <strong>Configurações</strong> do WhatsApp</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">2️⃣</span>
                <p className="text-gray-700 pt-0.5">Toque em <strong>Conversas</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">3️⃣</span>
                <p className="text-gray-700 pt-0.5">Toque em <strong>Papel de parede</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">4️⃣</span>
                <p className="text-gray-700 pt-0.5">Escolha o papel que você quer</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">5️⃣</span>
                <p className="text-gray-700 pt-0.5">Marque a opção <strong>"Usar em todas as conversas"</strong></p>
              </div>
            </div>
          </div>

          {/* Dicas */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Dicas de Papel de Parede:</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">
                  👁️ <strong>Para facilitar a leitura:</strong> Escolha cores claras e lisas
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">
                  ❌ <strong>Evite:</strong> Papéis muito coloridos ou cheios de desenhos (dificulta ler as mensagens)
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-800">
                  ✅ <strong>Recomendado:</strong> Fundo branco ou bege claro se você tem dificuldade para enxergar
                </p>
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-green-100 border-l-4 border-green-500 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">💚 Resumo:</h3>
            <p className="text-gray-700">
              Papel de parede deixa suas conversas mais <strong>personalizadas e bonitas</strong>. Mas lembre-se: escolha algo que facilite a leitura!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}