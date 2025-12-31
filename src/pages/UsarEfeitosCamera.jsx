import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { Shield, Lock } from "lucide-react";

export default function UsarEfeitosCamera() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Olá! Agora vamos aprender sobre os efeitos da câmera. Esses efeitos deixam suas conversas mais divertidas! Vou explicar com carinho o que você vai ver nesta tela. Tem um desenho verde de um cachorrinho fofo no centro. Abaixo dele está escrito: Usar efeitos da câmera. Há duas informações importantes com símbolos de escudo e cadeado. A primeira diz: Para ter um resultado mais expressivo, alguns efeitos imitarão os movimentos do seu rosto e das suas mãos. A segunda garante: Suas mensagens e ligações pessoais são protegidas com a criptografia de ponta a ponta. Isso significa que suas conversas são seguras! No rodapé, tem uma frase sobre o Aviso de Privacidade. Você pode desativar os efeitos a qualquer momento. Agora, veja os botões: Lá embaixo tem um botão verde grande escrito Continuar. Se você quiser permitir os efeitos, clique nele. Se não quiser agora, clique em Agora não, que fica logo abaixo. Vou repetir: Continuar para aceitar, ou Agora não para recusar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleContinuar = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Muito bem! Você permitiu usar os efeitos da câmera. Agora você vai ver uma tela perguntando se quer criar um avatar. Avatar é um bonequinho que se parece com você! Vamos lá!"
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
      
      setTimeout(() => {
        navigate(createPageUrl("TudoProntoAvatar"));
      }, 6000);
    }
  };

  const handleAgoraNao = () => {
    navigate(createPageUrl("Privacidade"));
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header transparente */}
        <div className="absolute top-0 left-0 right-0 z-10 px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-900">Privacidade</h1>
        </div>

        {/* Overlay escurecido */}
        <div className="absolute inset-0 bg-black/30 z-20"></div>

        {/* Dialog */}
        <div className="absolute inset-x-0 bottom-0 z-30 bg-white rounded-t-3xl">
          <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mt-3"></div>
          
          <div className="px-6 py-6">
            {/* Ilustração */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center">
                <div className="text-6xl">🐶</div>
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">+</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
              Usar efeitos da câmera
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <Shield className="w-6 h-6 text-gray-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm">
                  Para ter um resultado mais expressivo, alguns efeitos imitarão os movimentos do seu rosto e das suas mãos.
                </p>
              </div>

              <div className="flex gap-3">
                <Lock className="w-6 h-6 text-gray-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm">
                  Suas mensagens e ligações pessoais são protegidas com a criptografia de ponta a ponta.
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mb-6">
              Nosso <span className="text-[#00a884]">Aviso de Privacidade</span> contém informações sobre como usamos seus dados. Você pode desativar os efeitos em Configurações a qualquer momento.
            </p>

            <button
              onClick={handleContinuar}
              className="w-full bg-[#25D366] text-white py-3.5 rounded-full font-medium text-lg mb-3"
            >
              Continuar
            </button>

            <button
              onClick={handleAgoraNao}
              className="w-full text-[#00a884] py-3 font-medium text-lg"
            >
              Agora não
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}