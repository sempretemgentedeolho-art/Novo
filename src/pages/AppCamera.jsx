import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Zap, Timer, Settings, RotateCw } from "lucide-react";

export default function AppCamera() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("photo");
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(
      "Esta é a câmera do seu celular. Toque no círculo branco grande para tirar uma foto."
    );
    utter.lang = "pt-BR";
    utter.rate = 0.95;
    synth.speak(utter);
    return () => synth.cancel();
  }, []);

  const tirarFoto = () => {
    window.speechSynthesis.cancel();
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance("Foto tirada! A foto foi salva na galeria.");
    utter.lang = "pt-BR";
    synth.speak(utter);

    // Flash effect
    const flashDiv = document.createElement('div');
    flashDiv.className = 'fixed inset-0 bg-white z-50 pointer-events-none';
    document.body.appendChild(flashDiv);
    setTimeout(() => flashDiv.remove(), 100);
  };

  return (
    <div className="min-h-[100dvh] bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[50px] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-3xl z-10"></div>
          
          <div
            className="relative rounded-[46px] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black"
            style={{ aspectRatio: "9/19.5" }}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20 pointer-events-none">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-white/30" />
              ))}
            </div>

            {/* Controles Superiores */}
            <div className="absolute top-0 left-0 right-0 p-6 pt-8 flex justify-between items-center z-20">
              <button 
                onClick={() => navigate(createPageUrl("TelaInicial"))}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setFlash(!flash)}
                  className={`w-10 h-10 rounded-full backdrop-blur flex items-center justify-center ${
                    flash ? 'bg-yellow-500' : 'bg-black/50'
                  }`}
                >
                  <Zap className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
                  <Timer className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Center indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white/50 rounded-full" />

            {/* Modos */}
            <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-8 text-white text-sm font-medium">
              <button
                onClick={() => setMode("video")}
                className={mode === "video" ? "opacity-100" : "opacity-50"}
              >
                VÍDEO
              </button>
              <button
                onClick={() => setMode("photo")}
                className={mode === "photo" ? "opacity-100" : "opacity-50"}
              >
                FOTO
              </button>
              <button
                onClick={() => setMode("portrait")}
                className={mode === "portrait" ? "opacity-100" : "opacity-50"}
              >
                RETRATO
              </button>
            </div>

            {/* Controles Inferiores */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 flex items-center justify-center gap-8">
              <div className="w-12 h-12" />

              <button
                onClick={tirarFoto}
                className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-95 transition-transform"
              >
                <div className="w-16 h-16 rounded-full bg-white" />
              </button>

              <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <RotateCw className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}