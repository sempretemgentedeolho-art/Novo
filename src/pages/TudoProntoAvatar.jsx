import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { X } from "lucide-react";

export default function TudoProntoAvatar() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Olá! Agora você está vendo uma tela muito especial! No topo, à esquerda, tem um X para fechar. No centro da tela, você vê um celular com um avatar, que é um bonequinho digital. Abaixo do celular está escrito: Tudo pronto para usar seu avatar? E explica: Publique seu avatar para adicioná-lo ao seu perfil e começar a usá-lo nas figurinhas. Lá embaixo tem dois botões importantes. O botão azul grande diz: Publicar avatar. Se você clicar nele, seu avatar será criado! Abaixo tem o botão: Editar avatar, caso você queira mudar algo. No cantinho superior esquerdo tem um X se você quiser sair. Vou repetir: Clique em Publicar avatar se quiser criar, ou em Editar avatar para fazer mudanças primeiro. Ou clique no X para sair."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handlePublicar = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Maravilha! Você acabou de criar seu avatar! Agora ele está salvo e você pode usar nas suas conversas. Vamos voltar para a tela anterior."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
      
      setTimeout(() => {
        navigate(createPageUrl("Privacidade"));
      }, 5000);
    }
  };

  const handleEditar = () => {
    navigate(createPageUrl("AvatarInicial"));
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-b from-purple-200 to-purple-100 flex flex-col">
        <StatusBar variant="light" />

        <div className="p-4">
          <button onClick={() => navigate(createPageUrl("Privacidade"))}>
            <X className="w-8 h-8 text-gray-800" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
          {/* Mini phone mockup */}
          <div className="bg-white rounded-3xl p-4 shadow-2xl mb-8 w-56">
            <div className="bg-purple-100 rounded-2xl aspect-[9/16] flex items-center justify-center overflow-hidden">
              <div className="text-7xl">👤</div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-3">
            Tudo pronto para usar seu avatar?
          </h2>

          <p className="text-gray-700 text-center text-sm">
            Publique seu avatar para adicioná-lo ao seu perfil e começar a usá-lo nas figurinhas.
          </p>
        </div>

        <div className="px-6 pb-6 space-y-3">
          <button
            onClick={handlePublicar}
            className="w-full bg-[#1877F2] text-white py-4 rounded-full font-medium text-lg"
          >
            Publicar avatar
          </button>

          <button
            onClick={handleEditar}
            className="w-full bg-white text-gray-900 py-4 rounded-full font-medium text-lg border border-gray-300"
          >
            Editar avatar
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}