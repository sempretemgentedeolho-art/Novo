import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Columns2, Square } from "lucide-react";

export default function MultiJanelas() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Múltiplas janelas. Aqui você aprende a usar dois aplicativos ao mesmo tempo na tela. Por exemplo: assistir vídeo e conversar no WhatsApp."
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
          <h2 className="text-lg font-medium">Tela Dividida</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Columns2 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">O que é tela dividida?</h3>
            <p className="text-gray-700 leading-relaxed">
              Tela dividida permite usar dois aplicativos ao mesmo tempo, cada um ocupando metade da tela.
            </p>
          </div>

          {/* Como ativar */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">Como ativar tela dividida</h3>
            <ol className="space-y-2 text-sm text-blue-800">
              <li>1. Abra o primeiro app que quer usar</li>
              <li>2. Deslize de baixo para cima e SEGURE (apps recentes)</li>
              <li>3. Você vê os apps abertos em cartões</li>
              <li>4. Toque no ÍCONE do app no topo do cartão</li>
              <li>5. Escolha "Tela dividida" ou "Dividir tela"</li>
              <li>6. O app vai para metade da tela</li>
              <li>7. Escolha o segundo app da lista</li>
              <li>8. Pronto! Dois apps na tela</li>
            </ol>
          </div>

          {/* Exemplos de uso */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Exemplos de uso</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• <strong>YouTube + WhatsApp:</strong> Assistir vídeo e responder mensagens</li>
              <li>• <strong>Mapas + Mensagens:</strong> Ver direções e avisar que está chegando</li>
              <li>• <strong>Galeria + Fotos:</strong> Ver duas fotos ao mesmo tempo</li>
              <li>• <strong>Navegador + Notas:</strong> Copiar informações da internet</li>
            </ul>
          </div>

          {/* Como fechar */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">Como voltar ao normal</h3>
            <p className="text-sm text-purple-800 mb-2">
              Para sair da tela dividida:
            </p>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>• Arraste a barrinha do meio para CIMA ou BAIXO</li>
              <li>• Ou aperte o botão Voltar (←)</li>
              <li>• Um app vai ocupar a tela inteira</li>
            </ul>
          </div>

          {/* Importante */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Importante saber</h3>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li>• Nem todos os apps suportam tela dividida</li>
              <li>• A tela fica menor, pode ser difícil de ler</li>
              <li>• Usa mais bateria (dois apps ao mesmo tempo)</li>
              <li>• Alguns celulares mais antigos não têm essa função</li>
            </ul>
          </div>

          {/* Dica */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <h3 className="font-semibold text-green-900 mb-2">💡 Dica</h3>
            <p className="text-sm text-green-800">
              Se achar a tela muito pequena ou confusa, não precisa usar. É mais para quem quer fazer duas coisas ao mesmo tempo e tem facilidade com tecnologia.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}