import React, { useState } from "react";
import { Radio, Send } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const MENSAGENS = [
  { id: 1, nome: "Dona Marlene", texto: "Bom dia a todos! Estou assistindo do Rio.", cor: "bg-rose-500" },
  { id: 2, nome: "Seu Antônio", texto: "Que missa bonita hoje.", cor: "bg-sky-600" },
  { id: 3, nome: "Clara", texto: "Alguém sabe que música é essa?", cor: "bg-emerald-600" },
  { id: 4, nome: "Padre João", texto: "Bom dia! Logo vamos rezar juntos.", cor: "bg-purple-600" },
];

// Chat da transmissão ao vivo: conversa por escrito com quem está assistindo naquele momento
export default function ChatAoVivoView({ target, onTap }) {
  const [mensagens, setMensagens] = useState(MENSAGENS);
  const [texto, setTexto] = useState("Bom dia! Estou assistindo.");

  const enviar = () => {
    if (!texto.trim()) return;
    setMensagens((m) => [...m, { id: m.length + 1, nome: "Você", texto, cor: "bg-gray-700" }]);
    setTexto("");
    onTap("chat_enviar");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-4 pt-3 shrink-0">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-bold text-gray-900">Chat ao vivo</h2>
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            AO VIVO
          </span>
        </div>
        <p className="text-sm text-gray-800 mt-1">Missa ao vivo da Paróquia Central</p>
        <p className="text-sm text-gray-600 leading-snug">
          O chat é a conversa por escrito com quem está assistindo junto. Todo mundo vê o que você
          escrever, então escreva com educação.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 mt-3 space-y-3">
        {mensagens.map((m) => (
          <div key={m.id} className="flex gap-2">
            <div
              className={`w-8 h-8 rounded-full ${m.cor} text-white text-xs font-bold flex items-center justify-center shrink-0`}
            >
              {m.nome.slice(0, 1)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-700">{m.nome}</p>
              <p className="text-base text-gray-900 leading-snug">{m.texto}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-gray-200 shrink-0">
        <div className="flex items-center gap-2">
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escreva aqui a sua mensagem"
            className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-base text-gray-900"
          />
          <Pulse active={target === "chat_enviar"} ring="rounded-full">
            <button
              type="button"
              onClick={enviar}
              className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0"
            >
              <Send className="w-6 h-6" />
            </button>
          </Pulse>
        </div>
        <p className="text-sm text-gray-600 mt-2 leading-snug">
          Já deixei uma sugestão escrita para você. Se quiser, apague e escreva do seu jeito. Depois
          toque no botão vermelho para mandar a sua mensagem.
        </p>
      </div>
    </div>
  );
}