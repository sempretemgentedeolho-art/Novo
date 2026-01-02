import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Search, Grid3x3, Users, MessageCircle } from "lucide-react";

export default function PesquisaCelular() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Pesquisa no celular. Aqui você aprende a procurar aplicativos, contatos e outras coisas no seu celular sem ter que procurar tela por tela."
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
          <h2 className="text-lg font-medium">Pesquisa no Celular</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para que serve?</h3>
            <p className="text-gray-700 leading-relaxed">
              A pesquisa serve para encontrar rapidamente qualquer coisa no seu celular: aplicativos, contatos, configurações e muito mais.
            </p>
          </div>

          {/* Como usar */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Como usar a pesquisa</h3>
            <ol className="space-y-2 text-sm text-blue-800">
              <li>1. Arraste o dedo do MEIO da tela para BAIXO</li>
              <li>2. Ou toque na lupa 🔍 (se tiver na tela)</li>
              <li>3. A barra de pesquisa aparece</li>
              <li>4. Digite o que procura</li>
              <li>5. Toque no resultado para abrir</li>
            </ol>
          </div>

          {/* O que procurar */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-900">O que você pode procurar</h3>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Grid3x3 className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Aplicativos</h4>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Digite o nome do app que procura. Exemplo: "WhatsApp", "Galeria", "Câmera"
              </p>
              <p className="text-xs text-gray-500">
                Útil quando você não lembra onde colocou o app na tela
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Contatos</h4>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Digite o nome da pessoa. O celular mostra o contato dela.
              </p>
              <p className="text-xs text-gray-500">
                Você pode ligar ou mandar mensagem direto daqui
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">Configurações</h4>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Digite o que quer mudar. Exemplo: "WiFi", "Volume", "Brilho"
              </p>
              <p className="text-xs text-gray-500">
                Abre direto a configuração que você precisa
              </p>
            </div>
          </div>

          {/* Exemplos práticos */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Exemplos práticos</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Procure "Calculadora" para fazer contas</li>
              <li>• Procure "Relógio" para ver alarmes</li>
              <li>• Procure "Galeria" para ver fotos</li>
              <li>• Procure nome de pessoa para ligar</li>
              <li>• Procure "Bluetooth" para conectar aparelhos</li>
            </ul>
          </div>

          {/* Dicas */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
            <h3 className="font-semibold text-purple-900 mb-2">💡 Dicas</h3>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>• Não precisa escrever o nome completo</li>
              <li>• O celular mostra resultados enquanto você digita</li>
              <li>• Se não encontrar, tente escrever diferente</li>
              <li>• Alguns celulares buscam na internet também</li>
            </ul>
          </div>

          {/* Vantagem */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h3 className="font-semibold text-blue-900 mb-2">✓ Por que usar?</h3>
            <p className="text-sm text-blue-800">
              A pesquisa é MUITO mais rápida que procurar na tela ou em pastas. Economiza tempo e evita confusão.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}