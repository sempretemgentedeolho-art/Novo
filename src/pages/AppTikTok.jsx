import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Heart, MessageCircle, Share2, Music } from "lucide-react";

export default function AppTikTok() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const utter = new SpeechSynthesisUtterance(
      "Este é o TikTok. Aqui você assiste vídeos curtos e divertidos. Toque na seta para voltar."
    );
    utter.lang = "pt-BR";
    utter.rate = 0.95;
    synth.speak(utter);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[50px] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-3xl z-10"></div>
          
          <div
            className="relative rounded-[46px] overflow-hidden bg-black"
            style={{ aspectRatio: "9/19.5" }}
          >
            {/* Vídeo Simulado */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-pink-800 to-blue-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <Music className="w-32 h-32 text-white/20" />
              </div>
            </div>

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
              <button onClick={() => navigate(createPageUrl("TelaInicial"))}>
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="flex gap-6 text-sm text-white">
                <span className="font-semibold border-b-2 border-white pb-1">Para você</span>
                <span className="opacity-70">Seguindo</span>
              </div>
              <div className="w-6"></div>
            </div>

            {/* Informações do Vídeo */}
            <div className="absolute bottom-20 left-0 right-0 p-6 z-10">
              <div className="flex gap-4">
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">@usuario_exemplo</h3>
                  <p className="text-white text-sm mb-3">Vídeo exemplo no TikTok 🎵</p>
                  <div className="flex items-center gap-2 text-white text-xs">
                    <Music className="w-4 h-4" />
                    <span>Som original - @usuario_exemplo</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}