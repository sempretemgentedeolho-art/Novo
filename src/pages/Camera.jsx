import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Camera, FlipHorizontal, Zap, Settings, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneFrame } from "@/components/PhoneFrame";

export default function CameraPage() {
  const navigate = useNavigate();
  const [flash, setFlash] = useState(false);
  const [mode, setMode] = useState("photo");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Aplicativo Câmera. Modo foto selecionado."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleCapture = () => {
    if (mode === "photo") {
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const utter = new SpeechSynthesisUtterance("Foto capturada");
        utter.lang = "pt-BR";
        utter.rate = 0.9;
        synth.speak(utter);
      }
      alert("Foto capturada!");
    } else {
      if (isRecording) {
        alert("Gravação finalizada!");
        setIsRecording(false);
      } else {
        alert("Iniciando gravação...");
        setIsRecording(true);
      }
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-black flex flex-col">
        {/* Camera Preview */}
        <div className="flex-1 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center relative">
          <Camera className="w-32 h-32 text-white/30" />
          {isRecording && (
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">REC</span>
            </div>
          )}

          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
            <button 
              onClick={() => navigate(createPageUrl("Home"))}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setFlash(!flash)}
                className={`w-10 h-10 rounded-full backdrop-blur flex items-center justify-center ${flash ? 'bg-yellow-500' : 'bg-black/50'}`}
              >
                <Zap className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={() => navigate(createPageUrl("CameraConfig"))}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="absolute bottom-32 left-0 right-0 px-6">
            <div className="flex justify-center gap-8 text-white text-sm">
              <button 
                onClick={() => setMode("video")}
                className={mode === "video" ? 'font-bold' : 'opacity-60'}
              >
                VÍDEO
              </button>
              <button 
                onClick={() => setMode("photo")}
                className={mode === "photo" ? 'font-bold' : 'opacity-60'}
              >
                FOTO
              </button>
              <button 
                onClick={() => setMode("portrait")}
                className={mode === "portrait" ? 'font-bold' : 'opacity-60'}
              >
                RETRATO
              </button>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur hover:bg-white/30"
              onClick={() => navigate(createPageUrl("Galeria"))}
            >
              <div className="w-12 h-12 rounded-lg bg-gray-400"></div>
            </Button>

            <button
              onClick={handleCapture}
              className={`w-20 h-20 rounded-full border-4 border-white backdrop-blur transition-all ${
                isRecording ? 'bg-red-500' : 'bg-white/30 hover:bg-white/40'
              }`}
            >
              {mode === "video" && isRecording ? (
                <div className="w-8 h-8 bg-white rounded-sm mx-auto"></div>
              ) : (
                <div className="w-full h-full rounded-full bg-white"></div>
              )}
            </button>

            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur hover:bg-white/30"
            >
              <FlipHorizontal className="w-6 h-6 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}