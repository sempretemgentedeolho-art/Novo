import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Heart, MessageCircle, Share2, Music, Search } from "lucide-react";

export default function TikTok() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-black rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Vídeo Simulado */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-pink-800 to-blue-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <Music className="w-32 h-32 text-white/20" />
              </div>
            </div>

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
              <button onClick={() => navigate(createPageUrl("Home"))}>
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="flex gap-6 text-sm text-white">
                <span className="font-semibold border-b-2 border-white pb-1">Para você</span>
                <span className="opacity-70">Seguindo</span>
              </div>
              <button className="text-white">
                <Search className="w-6 h-6" />
              </button>
            </div>

            {/* Informações do Vídeo */}
            <div className="absolute bottom-20 left-0 right-0 p-6 z-10">
              <div className="flex gap-4">
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">@usuario_exemplo</h3>
                  <p className="text-white text-sm mb-3">
                    Descrição do vídeo vai aqui 🎵 #fyp #viral
                  </p>
                  <div className="flex items-center gap-2 text-white text-xs">
                    <Music className="w-4 h-4" />
                    <span>Som original - @usuario_exemplo</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 mb-1"></div>
                    <span className="text-white text-xs">+</span>
                  </div>

                  <button className="flex flex-col items-center">
                    <Heart className="w-8 h-8 text-white mb-1" />
                    <span className="text-white text-xs">125k</span>
                  </button>

                  <button className="flex flex-col items-center">
                    <MessageCircle className="w-8 h-8 text-white mb-1" />
                    <span className="text-white text-xs">1.2k</span>
                  </button>

                  <button className="flex flex-col items-center">
                    <Share2 className="w-8 h-8 text-white mb-1" />
                    <span className="text-white text-xs">890</span>
                  </button>

                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 animate-spin" style={{ animationDuration: '3s' }}></div>
                </div>
              </div>
            </div>

            {/* Barra Inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-black flex justify-around items-center text-white">
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🏠</span>
                <span className="text-xs">Início</span>
              </div>
              <div className="flex flex-col items-center opacity-60">
                <span className="text-2xl mb-1">🔍</span>
                <span className="text-xs">Descobrir</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-8 bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 rounded-lg flex items-center justify-center mb-1">
                  <span className="text-black font-bold text-lg">+</span>
                </div>
              </div>
              <div className="flex flex-col items-center opacity-60">
                <span className="text-2xl mb-1">💬</span>
                <span className="text-xs">Caixa</span>
              </div>
              <div className="flex flex-col items-center opacity-60">
                <span className="text-2xl mb-1">👤</span>
                <span className="text-xs">Perfil</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}