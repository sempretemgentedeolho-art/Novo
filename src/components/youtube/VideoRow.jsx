import React from "react";
import { Play } from "lucide-react";

// Uma linha de vídeo: miniatura à esquerda e título à direita
export default function VideoRow({ video, subtitle }) {
  return (
    <div className="flex gap-3">
      <div
        className={`relative w-28 h-16 rounded-lg bg-gradient-to-br ${video.thumb} flex items-center justify-center shrink-0`}
      >
        <Play className="w-5 h-5 text-white" fill="currentColor" />
        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">
          {video.time}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 leading-snug">{video.title}</p>
        <p className="text-xs text-gray-600 mt-0.5">{subtitle || video.channel}</p>
      </div>
    </div>
  );
}