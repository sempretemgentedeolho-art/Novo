import React from "react";
import { motion } from "framer-motion";
import { X, MessageCircle, Facebook, Link2, Users } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const OPCOES = [
  { id: "whatsapp", label: "WhatsApp", Icon: MessageCircle, cor: "bg-green-500" },
  { id: "facebook", label: "Facebook", Icon: Facebook, cor: "bg-[#1877F2]" },
  { id: "link", label: "Copiar link", Icon: Link2, cor: "bg-gray-500" },
  { id: "amigos", label: "Amigos", Icon: Users, cor: "bg-pink-500" },
];

// Escolher para onde mandar o vídeo
export default function ShareTikTokSheet({ target, onEscolher, onFechar }) {
  return (
    <>
      <div className="absolute inset-0 bg-black/60 z-40" onClick={onFechar} />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="absolute left-0 right-0 bottom-0 z-50 bg-white rounded-t-3xl p-4 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-base font-bold text-gray-900">Compartilhar com</p>
          <button
            onClick={onFechar}
            aria-label="Fechar"
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {OPCOES.map(({ id, label, Icon, cor }) => (
            <Pulse key={id} active={target === "share_whats" && id === "whatsapp"} ring="rounded-2xl">
              <button onClick={() => onEscolher(id)} className="flex flex-col items-center gap-2 w-full py-2">
                <div className={`w-12 h-12 rounded-2xl ${cor} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-[11px] text-gray-700 text-center leading-tight">{label}</span>
              </button>
            </Pulse>
          ))}
        </div>
      </motion.div>
    </>
  );
}