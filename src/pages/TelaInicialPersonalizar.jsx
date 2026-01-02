import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Image, Palette, Grid3x3, Settings } from "lucide-react";

export default function TelaInicialPersonalizar() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Personalizar tela inicial. Aqui você aprende a mudar o papel de parede, organizar ícones e deixar a tela do celular com a sua cara."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-[#1976D2] text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("Home"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Personalizar Tela Inicial</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Palette className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Por que personalizar?</h3>
            <p className="text-gray-700 leading-relaxed">
              Personalizar a tela deixa o celular mais bonito e mais fácil de usar. Você deixa tudo do jeito que gosta.
            </p>
          </div>

          {/* Mudar papel de parede */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Image className="w-5 h-5 text-blue-700" />
              <h3 className="font-semibold text-blue-900">Mudar papel de parede</h3>
            </div>
            <ol className="space-y-2 text-sm text-blue-800">
              <li>1. Toque e SEGURE em espaço vazio da tela</li>
              <li>2. Aparece um menu</li>
              <li>3. Toque em "Papel de parede" ou "Planos de fundo"</li>
              <li>4. Escolha uma foto da galeria ou dos papéis prontos</li>
              <li>5. Toque em "Definir como papel de parede"</li>
              <li>6. Escolha: "Tela inicial", "Tela de bloqueio" ou "Ambas"</li>
            </ol>
          </div>

          {/* Organizar ícones */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Grid3x3 className="w-5 h-5 text-green-700" />
              <h3 className="font-semibold text-green-900">Organizar ícones</h3>
            </div>
            <p className="text-sm text-green-800 mb-2">
              Você pode mudar o tamanho dos ícones e a grade:
            </p>
            <ol className="space-y-1 text-sm text-green-800">
              <li>1. Toque e segure em espaço vazio</li>
              <li>2. Toque em "Configurações da tela inicial"</li>
              <li>3. Escolha "Grade de apps"</li>
              <li>4. Selecione o tamanho (4x5, 5x5, etc.)</li>
            </ol>
            <p className="text-xs text-green-700 mt-2">
              Grade maior = ícones menores mas cabem mais apps
            </p>
          </div>

          {/* Mudar tema */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-5 h-5 text-purple-700" />
              <h3 className="font-semibold text-purple-900">Mudar tema ou cores</h3>
            </div>
            <p className="text-sm text-purple-800 mb-2">
              Alguns celulares permitem mudar as cores de todo o sistema:
            </p>
            <ol className="space-y-1 text-sm text-purple-800">
              <li>1. Vá em "Configurações"</li>
              <li>2. Procure "Tela" ou "Display"</li>
              <li>3. Toque em "Tema" ou "Estilo"</li>
              <li>4. Escolha "Claro", "Escuro" ou cores personalizadas</li>
            </ol>
          </div>

          {/* Atalhos */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">Adicionar atalhos</h3>
            <p className="text-sm text-yellow-800 mb-2">
              Você pode colocar atalhos para funções específicas:
            </p>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li>• Contato favorito (ligar com um toque)</li>
              <li>• Conversa do WhatsApp</li>
              <li>• Configuração específica</li>
              <li>• Local no Google Maps</li>
            </ul>
            <p className="text-xs text-yellow-700 mt-2">
              Toque e segure no app, depois escolha a opção de atalho
            </p>
          </div>

          {/* Dicas */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <h3 className="font-semibold text-green-900 mb-2">💡 Dicas de personalização</h3>
            <ul className="space-y-1 text-sm text-green-800">
              <li>• Use foto de família como papel de parede</li>
              <li>• Deixe apps importantes bem visíveis</li>
              <li>• Não encha a tela - deixe espaços vazios</li>
              <li>• Você pode ter várias telas, deslize para o lado</li>
              <li>• Teste e mude até ficar do seu gosto</li>
            </ul>
          </div>

          {/* Importante */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h3 className="font-semibold text-blue-900 mb-2">✓ Lembre-se</h3>
            <p className="text-sm text-blue-800">
              Não existe jeito certo ou errado. Organize do jeito que for melhor para você. Se não gostar, pode mudar a hora que quiser!
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}