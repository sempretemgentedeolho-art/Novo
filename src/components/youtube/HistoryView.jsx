import React from "react";
import { History as HistoryIcon } from "lucide-react";
import VideoRow from "@/components/youtube/VideoRow";

// Lista de tudo que a pessoa já assistiu
export default function HistoryView({ videos }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <div className="flex items-center gap-2 pt-3">
        <HistoryIcon className="w-5 h-5 text-gray-900" />
        <h2 className="text-lg font-bold text-gray-900">Histórico</h2>
      </div>
      <p className="text-xs text-gray-600 mt-1 mb-4">
        Todos os vídeos que você assistiu, do mais novo para o mais antigo.
      </p>

      <div className="space-y-4">
        {videos.map((video) => (
          <VideoRow key={video.id} video={video} subtitle="Assistido hoje" />
        ))}
      </div>
    </div>
  );
}