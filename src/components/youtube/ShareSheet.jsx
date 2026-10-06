import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, MessageSquare, Mail, Link as LinkIcon, X } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const OPCOES = [
  {
    id: "share_whats",
    label: "WhatsApp",
    descricao: "Mandar para um contato",
    icon: MessageCircle,
    cor: "bg-green-500",
  },
  {
    id: "share_msg",
    label: "Mensagens",
    descricao: "Enviar por mensagem de texto",
    icon: MessageSquare,
    cor: "bg-blue-500",
  },
  {
    id: "share_email",
    label: "E-mail",
    descricao: "Enviar por e-mail",
    icon: Mail,
    cor: "bg-gray-600",
  },
  {
    id: "share_link",
    label: "Copiar link",
    descricao: "Guardar o endereço do vídeo",
    icon: LinkIcon,
    cor: "bg-gray-500",
  },
];

// Janela que abre por baixo com as opções de compartilhar o vídeo
export default function ShareSheet({ target, onOption, onClose }) {
  return (
    <div className="absolute inset-0 z-[75] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <motion.div
        initial={{ y: 280 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="relative bg-white rounded-t-3xl px-4 pt-4 pb-6"
      >
        <div className="flex items-start justify-between gap-3 mb-1">
          <p className="text-base font-bold text-gray-900">Compartilhar este vídeo</p>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        <p className="text-xs text-gray-600 mb-4">Escolha por onde quer mandar o vídeo para alguém.</p>

        <div className="space-y-2">
          {OPCOES.map((opcao) => {
            const Icone = opcao.icon;
            return (
              <Pulse
                key={opcao.id}
                active={target === opcao.id}
                className="w-full"
                ring="rounded-2xl"
              >
                <button
                  type="button"
                  onClick={onOption}
                  className="w-full flex items-center gap-3 rounded-2xl border border-gray-200 px-3 py-3 text-left"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${opcao.cor} flex items-center justify-center shrink-0`}
                  >
                    <Icone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{opcao.label}</p>
                    <p className="text-xs text-gray-600">{opcao.descricao}</p>
                  </div>
                </button>
              </Pulse>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}