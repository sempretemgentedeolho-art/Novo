import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { X, User, Sticker, UserCircle2 } from "lucide-react";

export default function MostreVibeAvatares() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Olá! Esta é uma tela de informações da Meta sobre avatares. No topo tem um X para fechar. Você vê vários bonequinhos juntos e o símbolo da Meta. Está escrito: Mostre sua vibe com os avatares no WhatsApp. Abaixo tem três informações com símbolos: Personalize a aparência do seu avatar. Use as figurinhas do avatar para mostrar como você se sente. Mostre seu avatar no perfil. Mais abaixo explica que se você criar um avatar, ele será exibido para outras pessoas que usam o WhatsApp. Você pode mudar quem pode ver seu avatar em Configurações. Tem informações sobre segurança e criptografia. Lá embaixo tem um botão azul grande escrito: Começar. Clique nele para continuar criando seu avatar!"
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleComecar = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Muito bem! Agora vamos começar a criar seu avatar. Primeiro, você vai escolher a cor da pele do bonequinho."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.75;
      synth.speak(utter);
      
      setTimeout(() => {
        navigate(createPageUrl("EscolherTomPele"));
      }, 4000);
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="p-4">
          <button onClick={() => navigate(createPageUrl("CriarAvatarOpcoes"))}>
            <X className="w-8 h-8 text-gray-800" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24">
          {/* Avatares illustration */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {["👨", "👩", "🧑", "👨‍🦱", "👩‍🦰", "🧑‍🦳"].map((emoji, i) => (
                <div key={i} className="text-3xl">{emoji}</div>
              ))}
            </div>
          </div>

          {/* Meta logo */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            <span className="font-semibold text-gray-800">Meta</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Mostre sua vibe com os avatares no WhatsApp
          </h2>

          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <User className="w-6 h-6 text-gray-700 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">
                Personalize a aparência do seu avatar
              </p>
            </div>

            <div className="flex gap-4">
              <Sticker className="w-6 h-6 text-gray-700 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">
                Use as figurinhas do avatar para mostrar como você se sente
              </p>
            </div>

            <div className="flex gap-4">
              <UserCircle2 className="w-6 h-6 text-gray-700 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">
                Mostre seu avatar no perfil
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 mb-4">
              Se você criar um avatar, ele será exibido para outras pessoas que usam o WhatsApp, que poderão interagir com ele. Você pode mudar quem pode ver e interagir com seu avatar quando quiser em Configurações.{" "}
              <span className="text-[#1877F2]">Saiba mais</span>
            </p>

            <p className="text-sm text-gray-700">
              O WhatsApp usa a tecnologia de segurança da Meta para criar seu avatar. Suas mensagens e ligações pessoais são protegidas com a criptografia de ponta a ponta. Ninguém, nem mesmo o WhatsApp e a Meta, pode lê-las ou ouvi-las.
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 bg-white">
          <button
            onClick={handleComecar}
            className="w-full bg-[#1877F2] text-white py-4 rounded-full font-medium text-lg"
          >
            Começar
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}