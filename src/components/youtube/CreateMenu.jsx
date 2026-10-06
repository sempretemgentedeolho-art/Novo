import React from "react";
import { Zap, Video, Radio, PenLine } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const OPCOES = [
  {
    id: "short_option",
    Icone: Zap,
    titulo: "Criar um Short",
    desc: "Grave um vídeo curto de até 60 segundos",
  },
  {
    id: "video_option",
    Icone: Video,
    titulo: "Enviar um vídeo",
    desc: "Escolha um vídeo que já está na galeria",
  },
  {
    id: "live_option",
    Icone: Radio,
    titulo: "Iniciar transmissão ao vivo",
    desc: "Mostre tudo na hora para outras pessoas",
  },
  {
    id: "post_option",
    Icone: PenLine,
    titulo: "Criar um post",
    desc: "Publique uma foto ou um texto",
  },
];

export default function CreateMenu({ target, onTap }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 bg-white rounded-t-3xl px-5 pt-5 pb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Criar</h2>

        <div className="space-y-3">
          {OPCOES.map(({ id, Icone, titulo, desc }) => (
            <Pulse key={id} active={target === id} className="w-full" ring="rounded-2xl">
              <button
                type="button"
                onClick={() => id === "short_option" && onTap(id)}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 bg-gray-50 text-left"
              >
                <Icone className="w-6 h-6 text-gray-900 shrink-0" />
                <div>
                  <p className="text-gray-900 font-medium">{titulo}</p>
                  <p className="text-xs text-gray-600">{desc}</p>
                </div>
              </button>
            </Pulse>
          ))}
        </div>
      </div>
    </div>
  );
}