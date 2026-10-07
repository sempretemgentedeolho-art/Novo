import React from "react";
import VideoRow from "@/components/youtube/VideoRow";

// Tela de lista de vídeos: usada por Assistir mais tarde, Gostei, Seus vídeos, Downloads e playlists
export default function ListaVideosView({ titulo, subtitulo, videos, aviso }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <h2 className="text-lg font-bold text-gray-900 pt-3">{titulo}</h2>
      <p className="text-xs text-gray-600 mt-1 leading-snug">{subtitulo}</p>

      {aviso && (
        <p className="mt-3 text-xs text-emerald-800 bg-emerald-50 rounded-xl px-3 py-2 leading-snug">
          {aviso}
        </p>
      )}

      <div className="space-y-4 mt-4">
        {videos.map((video) => (
          <VideoRow key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}