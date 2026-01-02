import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, FolderPlus, Trash2, Move, Grid3x3 } from "lucide-react";

export default function OrganizarApps() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Organizar aplicativos. Aqui você aprende a organizar os aplicativos na tela do celular. Mover, criar pastas e deixar tudo do seu jeito."
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
          <h2 className="text-lg font-medium">Organizar Aplicativos</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Grid3x3 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para que serve?</h3>
            <p className="text-gray-700 leading-relaxed">
              Organizar os aplicativos deixa seu celular mais fácil de usar. Você coloca os apps mais usados perto e cria pastas para agrupar apps parecidos.
            </p>
          </div>

          {/* Mover aplicativos */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Move className="w-5 h-5 text-blue-700" />
              <h3 className="font-semibold text-blue-900">Como mover um aplicativo</h3>
            </div>
            <ol className="space-y-2 text-sm text-blue-800">
              <li>1. Toque e SEGURE no ícone do app que quer mover</li>
              <li>2. O app começa a "flutuar" ou "tremer"</li>
              <li>3. ARRASTE o app para onde você quer</li>
              <li>4. SOLTE o dedo quando estiver no lugar certo</li>
              <li>5. Pronto! O app ficou no novo lugar</li>
            </ol>
          </div>

          {/* Criar pasta */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FolderPlus className="w-5 h-5 text-green-700" />
              <h3 className="font-semibold text-green-900">Como criar uma pasta</h3>
            </div>
            <ol className="space-y-2 text-sm text-green-800">
              <li>1. Toque e SEGURE em um app</li>
              <li>2. ARRASTE ele em cima de outro app</li>
              <li>3. Solte - uma pasta é criada!</li>
              <li>4. Toque na pasta para abrir</li>
              <li>5. Toque no nome para renomear (ex: "Jogos", "Banco")</li>
            </ol>
          </div>

          {/* Deletar apps */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Trash2 className="w-5 h-5 text-red-700" />
              <h3 className="font-semibold text-red-900">Como remover um aplicativo</h3>
            </div>
            <p className="text-sm text-red-800 mb-2">
              <strong>Importante:</strong> Existem duas formas:
            </p>
            <div className="space-y-3 text-sm text-red-800">
              <div>
                <p className="font-medium mb-1">1. Remover da tela inicial (o app continua instalado):</p>
                <ul className="space-y-1 pl-4">
                  <li>• Toque e segure no app</li>
                  <li>• Arraste para "Remover" no topo</li>
                  <li>• O app some da tela, mas continua no celular</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">2. Desinstalar (remove do celular):</p>
                <ul className="space-y-1 pl-4">
                  <li>• Toque e segure no app</li>
                  <li>• Toque em "Desinstalar" ou "🗑️"</li>
                  <li>• Confirme - o app é apagado</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Dicas */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">💡 Dicas de organização</h3>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>• Coloque apps mais usados na primeira tela</li>
              <li>• Crie pastas por categoria: "Banco", "Família", "Jogos"</li>
              <li>• Deixe o WhatsApp e Telefone bem visíveis</li>
              <li>• Delete apps que não usa para liberar espaço</li>
            </ul>
          </div>

          {/* Atenção */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Cuidado</h3>
            <p className="text-sm text-yellow-800">
              Não delete aplicativos importantes do sistema como Configurações, Play Store ou Telefone. Só delete apps que você mesmo instalou.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}