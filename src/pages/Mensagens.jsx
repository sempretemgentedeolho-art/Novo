import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Search, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";

const conversations = [
  { id: 1, name: "Maria Silva", message: "Oi! Tudo bem?", time: "10:30", unread: 2 },
  { id: 2, name: "João Santos", message: "Vamos nos encontrar hoje?", time: "09:15", unread: 0 },
  { id: 3, name: "Ana Costa", message: "Obrigada pela ajuda!", time: "Ontem", unread: 0 },
  { id: 4, name: "Pedro Oliveira", message: "Você viu o arquivo?", time: "Ontem", unread: 1 },
];

// Sequência do tutorial: cada etapa tem um alvo que pisca.
const STEPS = [
  {
    id: "intro",
    text: "Bem-vindo ao aplicativo Mensagens! Aqui ficam todas as suas conversas de texto, as mensagens que você troca com outras pessoas. Cada linha é uma conversa. Toque na primeira conversa que está piscando para abrir.",
    target: "conversation",
  },
  {
    id: "unread",
    text: "Muito bem! Esta conversa tem um círculo azul com um número. Isso significa que você tem mensagens novas que ainda não leu. Agora vou te ensinar a buscar uma conversa. Lá em cima tem uma barra de busca que está piscando. Toque nela.",
    target: "search",
  },
  {
    id: "searched",
    text: "Muito bem! A barra de busca serve para encontrar uma conversa pelo nome da pessoa. Agora vou te ensinar a começar uma nova conversa. Lá embaixo, do lado direito, tem um botão redondo azul que está piscando. Toque nele.",
    target: "new_message",
  },
  {
    id: "new_message_done",
    text: "Muito bem! Este botão serve para começar uma nova conversa com alguém. Agora clique na seta para voltar que está piscando para retornar aos aplicativos.",
    target: "back",
  },
];

export default function Mensagens() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = STEPS[stepIndex];

  // Única fonte de narração: dispara ao mudar de etapa. Cancela qualquer fala anterior.
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(currentStep.text);
      utter.lang = "pt-BR";
      utter.rate = 0.82;
      const timer = setTimeout(() => synth.speak(utter), 150);
      return () => {
        clearTimeout(timer);
        window.speechSynthesis.cancel();
      };
    }
  }, [stepIndex]);

  const goNext = () => {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const handleConversationClick = () => {
    if (currentStep.target !== "conversation") return;
    goNext();
  };

  const handleSearchClick = () => {
    if (currentStep.target !== "search") return;
    goNext();
  };

  const handleNewMessage = () => {
    if (currentStep.target !== "new_message") return;
    goNext();
  };

  const handleBack = () => {
    if (currentStep.target !== "back") return;
    navigate(createPageUrl("Home"));
  };

  // Halo pulsante (overlay) — não interfere em refs/clicks do botão
  const Halo = ({ active, children, className = "" }) => (
    <div className={`relative ${className}`}>
      {active && (
        <motion.div
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0.2, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
          className="absolute -inset-2 rounded-full bg-yellow-400 z-0 pointer-events-none"
        />
      )}
      <motion.div
        animate={active ? { scale: [1, 1.12, 1] } : {}}
        transition={active ? { repeat: Infinity, duration: 1, ease: "easeInOut" } : {}}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <Halo active={currentStep.target === "back"}>
              <button onClick={handleBack}>
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
            </Halo>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Mensagens</h1>

          <Halo active={currentStep.target === "search"} className="block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar conversas"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchClick}
                className="pl-10"
              />
            </div>
          </Halo>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv, index) => (
            <div key={conv.id} className="relative">
              {index === 0 && currentStep.target === "conversation" && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1.05], opacity: [0.7, 0.2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  className="absolute -inset-1 bg-yellow-400 z-0 pointer-events-none"
                />
              )}
              <motion.div
                animate={index === 0 && currentStep.target === "conversation" ? { scale: [1, 1.03, 1] } : {}}
                transition={index === 0 && currentStep.target === "conversation" ? { repeat: Infinity, duration: 1, ease: "easeInOut" } : {}}
                onClick={index === 0 ? handleConversationClick : undefined}
                className={`relative z-10 flex items-center gap-4 p-4 border-b border-gray-100 ${index === 0 ? "cursor-pointer" : ""}`}
              >
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-xl">
                  {conv.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{conv.name}</h3>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.message}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {conv.unread}
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* New Message Button */}
        <div className="absolute bottom-8 right-6 z-30">
          <Halo active={currentStep.target === "new_message"}>
            <Button
              onClick={handleNewMessage}
              className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
            >
              <MessageSquare className="w-6 h-6" />
            </Button>
          </Halo>
        </div>
      </div>
    </PhoneFrame>
  );
}