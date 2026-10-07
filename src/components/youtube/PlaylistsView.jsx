import React, { useState } from "react";
import { Play, ListVideo, Plus } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import NovaPlaylistSheet from "@/components/youtube/NovaPlaylistSheet";

const PLAYLISTS = [
  {
    id: "receitas",
    nome: "Receitas da Vovó",
    qtd: "8 vídeos",
    thumb: "from-orange-400 to-orange-600",
  },
  {
    id: "musicas",
    nome: "Músicas antigas",
    qtd: "12 vídeos",
    thumb: "from-purple-500 to-pink-600",
  },
  {
    id: "familia",
    nome: "Para ver com a família",
    qtd: "4 vídeos",
    thumb: "from-sky-400 to-blue-600",
  },
];

// Lista de playlists: listinhas de vídeos por assunto, e a criação de uma nova
export default function PlaylistsView({ target, onTap, onAcao }) {
  const [minhas, setMinhas] = useState([]);
  const [criando, setCriando] = useState(false);

  const abrirCriacao = () => {
    setCriando(true);
    onAcao("criar_playlist");
  };

  const criar = (nome) => {
    setMinhas((lista) => [
      ...lista,
      {
        id: `minha_${lista.length}`,
        nome: nome || "Minha playlist",
        qtd: "0 vídeos",
        thumb: "from-red-500 to-rose-700",
      },
    ]);
    setCriando(false);
    onAcao("playlist_criar");
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <div className="flex items-center gap-2 pt-3">
        <ListVideo className="w-5 h-5 text-gray-900" />
        <h2 className="text-lg font-bold text-gray-900">Playlists</h2>
      </div>
      <p className="text-xs text-gray-600 mt-1 mb-4 leading-snug">
        Playlist é uma listinha de vídeos que você junta para assistir em sequência, sem precisar
        procurar.
      </p>

      <Pulse active={target === "criar_playlist"} className="w-full mb-4" ring="rounded-2xl">
        <button
          type="button"
          onClick={abrirCriacao}
          className="w-full flex items-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 px-3 py-3 text-left"
        >
          <Plus className="w-5 h-5 text-gray-700 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Criar nova playlist</p>
            <p className="text-xs text-gray-600">Junte os vídeos por assunto</p>
          </div>
        </button>
      </Pulse>

      <div className="space-y-3">
        {minhas.map((p) => (
          <div
            key={p.id}
            className="w-full flex items-center gap-3 rounded-2xl border border-gray-200 px-3 py-3"
          >
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${p.thumb} flex items-center justify-center shrink-0`}
            >
              <Play className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{p.nome}</p>
              <p className="text-xs text-gray-600 mt-0.5">{p.qtd}</p>
            </div>
          </div>
        ))}

        {PLAYLISTS.map((p) => (
          <Pulse
            key={p.id}
            className="w-full"
            ring="rounded-2xl"
            active={target === `playlist_${p.id}`}
          >
            <button
              type="button"
              onClick={() => onTap(`playlist_${p.id}`)}
              className="w-full flex items-center gap-3 rounded-2xl border border-gray-200 px-3 py-3 text-left"
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${p.thumb} flex items-center justify-center shrink-0`}
              >
                <Play className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{p.nome}</p>
                <p className="text-xs text-gray-600 mt-0.5">{p.qtd}</p>
              </div>
            </button>
          </Pulse>
        ))}
      </div>

      {criando && (
        <NovaPlaylistSheet target={target} onCriar={criar} onClose={() => setCriando(false)} />
      )}
    </div>
  );
}