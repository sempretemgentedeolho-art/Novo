import React, { useState } from "react";
import { X } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const PRIVACIDADE = [
  { id: "publica", label: "Pública", sub: "Qualquer pessoa pode encontrar e ver" },
  { id: "nao_listada", label: "Não listada", sub: "Só vê quem você mandar o link" },
  { id: "privada", label: "Privada", sub: "Só você vê" },
];

// Janela para criar uma playlist nova: nome e quem pode ver
export default function NovaPlaylistSheet({ target, onCriar, onClose }) {
  const [nome, setNome] = useState("Minhas receitas favoritas");
  const [privacidade, setPrivacidade] = useState("nao_listada");

  return (
    <div className="absolute inset-0 z-[60] flex items-end bg-black/40">
      <div className="w-full max-h-[88%] overflow-y-auto rounded-t-3xl bg-white px-4 pt-4 pb-6">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">Nova playlist</p>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        <p className="text-base text-gray-700 mt-2 leading-snug">
          Dê um nome para a sua listinha e escolha quem pode ver.
        </p>

        <p className="text-base font-semibold text-gray-900 mt-4">Nome da playlist</p>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-base text-gray-900"
        />

        <p className="text-base font-semibold text-gray-900 mt-4">Quem pode ver</p>
        <div className="mt-2 space-y-2">
          {PRIVACIDADE.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPrivacidade(p.id)}
              className={`w-full flex items-center gap-3 rounded-2xl border-2 px-3 py-3 text-left ${
                privacidade === p.id ? "border-red-600 bg-red-50" : "border-gray-200"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full border-2 shrink-0 ${
                  privacidade === p.id ? "border-red-600 bg-red-600" : "border-gray-400"
                }`}
              />
              <div>
                <p className="text-base font-medium text-gray-900">{p.label}</p>
                <p className="text-sm text-gray-600">{p.sub}</p>
              </div>
            </button>
          ))}
        </div>

        <Pulse active={target === "playlist_criar"} className="w-full mt-5" ring="rounded-full">
          <button
            type="button"
            onClick={() => onCriar(nome)}
            className="w-full py-4 rounded-full bg-blue-600 text-white text-base font-bold"
          >
            Criar playlist
          </button>
        </Pulse>
      </div>
    </div>
  );
}