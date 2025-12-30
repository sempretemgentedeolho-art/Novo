import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Search, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";

const conversations = [
  { id: 1, name: "Maria Silva", message: "Oi! Tudo bem?", time: "10:30", unread: 2 },
  { id: 2, name: "João Santos", message: "Vamos nos encontrar hoje?", time: "09:15", unread: 0 },
  { id: 3, name: "Ana Costa", message: "Obrigada pela ajuda!", time: "Ontem", unread: 0 },
  { id: 4, name: "Pedro Oliveira", message: "Você viu o arquivo?", time: "Ontem", unread: 1 },
];

export default function Mensagens() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Aplicativo Mensagens. Suas conversas."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <button onClick={() => navigate(createPageUrl("Home"))} className="mb-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Mensagens</h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar conversas"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
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
            </div>
          ))}
        </div>

        {/* New Message Button */}
        <Button className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>
    </PhoneFrame>
  );
}