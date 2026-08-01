import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, FlipHorizontal, Zap, Settings, Video, Camera, Image as ImageIcon, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneFrame } from "@/components/PhoneFrame";

const STEPS = [
  {
    id: "intro",
    text: "Bem-vindo à câmera! Vou te ensinar tudo com calma. Esta câmera serve para tirar fotos e fazer vídeos. Vamos começar tirando uma foto. Olhe embaixo da tela, tem um botão branco redondo grande. Toque nele para tirar a foto.",
    target: "capture",
  },
  {
    id: "photo_taken",
    text: "Muito bem! Você tirou uma foto. A foto foi salva na galeria. Agora vou te ensinar a fazer um vídeo. Olhe no meio da tela, embaixo, tem as palavras VÍDEO, FOTO e RETRATO. Toque na palavra VÍDEO, que está do lado esquerdo.",
    target: "video_mode",
  },
  {
    id: "video_mode",
    text: "Perfeito! Agora estamos no modo vídeo. Para começar a gravar, toque no botão vermelho redondo embaixo da tela. O mesmo botão de antes, mas agora ele fica vermelho.",
    target: "capture",
  },
  {
    id: "recording",
    text: "Você está gravando um vídeo! Veja o pontinho vermelho piscando lá em cima com a palavra REC. Para parar de gravar, toque novamente no botão vermelho.",
    target: "capture",
  },
  {
    id: "video_done",
    text: "Muito bem! O vídeo foi salvo. Agora vou te ensinar a ligar o flash, que ajuda a tirar fotos no escuro. Olhe lá em cima, do lado direito, tem um desenho de um raio. Toque nele.",
    target: "flash",
  },
  {
    id: "flash_on",
    text: "O flash está ligado! Ele ficou amarelinho. Agora vou te ensinar a trocar de câmera, para usar a câmera da frente e tirar uma selfie. Olhe embaixo, do lado direito, tem um desenho de duas setinhas. Toque nele.",
    target: "flip",
  },
  {
    id: "flipped",
    text: "Você trocou de câmera! Agora a câmera está apontando para você. Agora vou te ensinar a ver as fotos que você tirou. Olhe embaixo, do lado esquerdo, tem um quadradinho com uma foto. Toque nele.",
    target: "gallery",
  },
  {
    id: "done",
    text: "Parabéns! Você aprendeu a usar a câmera! Você sabe tirar fotos, fazer vídeos, ligar o flash, trocar de câmera e ver suas fotos. Toque na seta no canto esquerdo em cima para voltar.",
    target: "back",
  },
];

export default function CameraPage() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [flash, setFlash] = useState(false);
  const [mode, setMode] = useState("photo");
  const [isRecording, setIsRecording] = useState(false);
  const [frontCamera, setFrontCamera] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const spokenRef = useRef(false);

  const currentStep = STEPS[stepIndex];

  // Narração da etapa atual
  useEffect(() => {
    if (spokenRef.current) {
      spokenRef.current = false;
      return;
    }
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(currentStep.text);
      utter.lang = "pt-BR";
      utter.rate = 0.82;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, [stepIndex]);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "pt-BR";
      utter.rate = 0.82;
      synth.speak(utter);
    }
  };

  const nextStep = () => {
    spokenRef.current = true;
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  // Botão de capturar foto/vídeo
  const handleCapture = () => {
    if (currentStep.id === "intro") {
      setPhotoTaken(true);
      speak("Foto capturada! Muito bem!");
      setTimeout(nextStep, 1200);
    } else if (currentStep.id === "video_mode") {
      setIsRecording(true);
      speak("Gravando vídeo! Para parar, toque novamente.");
      setTimeout(nextStep, 1500);
    } else if (currentStep.id === "recording") {
      setIsRecording(false);
      speak("Vídeo salvo! Muito bem!");
      setTimeout(nextStep, 1200);
    }
  };

  // Trocar modo para vídeo
  const handleVideoMode = () => {
    if (currentStep.id === "photo_taken") {
      setMode("video");
      speak("Modo vídeo selecionado!");
      setTimeout(nextStep, 1000);
    }
  };

  // Flash
  const handleFlash = () => {
    if (currentStep.id === "flash_on" || currentStep.id === "intro" || currentStep.id === "photo_taken" || currentStep.id === "video_mode" || currentStep.id === "recording") {
      setFlash(!flash);
      if (currentStep.id === "flash_on") {
        speak("Flash desligado!");
      } else {
        speak("Flash ligado!");
      }
    } else if (currentStep.id === "flash") {
      setFlash(true);
      speak("Flash ligado! Muito bem!");
      setTimeout(nextStep, 1000);
    }
  };

  // Trocar câmera
  const handleFlip = () => {
    if (currentStep.id === "flipped" || currentStep.id === "flash_on") {
      setFrontCamera(!frontCamera);
      speak(frontCamera ? "Câmera de trás!" : "Câmera da frente!");
    } else if (currentStep.id === "flip") {
      setFrontCamera(true);
      speak("Câmera da frente selecionada! Muito bem!");
      setTimeout(nextStep, 1000);
    }
  };

  // Galeria
  const handleGallery = () => {
    if (currentStep.id === "gallery") {
      speak("Abrindo a galeria!");
      setTimeout(() => navigate(createPageUrl("Galeria")), 800);
    } else {
      speak("Abrindo a galeria!");
      setTimeout(() => navigate(createPageUrl("Galeria")), 800);
    }
  };

  // Voltar
  const handleBack = () => {
    if (currentStep.id === "done") {
      navigate(createPageUrl("Home"));
    } else {
      navigate(createPageUrl("Home"));
    }
  };

  // Componente de destaque pulsante para o botão ativo
  const Highlight = ({ active, children, className = "" }) => (
    <div className={`relative ${className}`}>
      {active && (
        <>
          <motion.div
            animate={{ scale: [1, 1.4, 1.4], opacity: [0.8, 0.3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-yellow-400 z-0"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            className="relative z-10"
          >
            {children}
          </motion.div>
        </>
      )}
      {!active && <div className="relative z-10">{children}</div>}
    </div>
  );

  return (
    <PhoneFrame>
      <div className="h-full bg-black flex flex-col relative">
        {/* Camera Preview */}
        <div className="flex-1 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
          {frontCamera ? (
            <div className="text-white/40 text-center">
              <Camera className="w-24 h-24 mx-auto mb-2" />
              <p className="text-sm">Câmera frontal</p>
            </div>
          ) : (
            <Camera className="w-32 h-32 text-white/30" />
          )}

          {isRecording && (
            <div className="absolute top-20 left-6 flex items-center gap-2 z-30">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">REC</span>
            </div>
          )}

          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            <div className="flex gap-3">
              <Highlight active={currentStep.target === "flash"}>
                <button
                  onClick={handleFlash}
                  className={`w-10 h-10 rounded-full backdrop-blur flex items-center justify-center ${flash ? "bg-yellow-500" : "bg-black/50"}`}
                >
                  <Zap className="w-5 h-5 text-white" />
                </button>
              </Highlight>
              <button
                onClick={() => navigate(createPageUrl("CameraConfig"))}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="absolute bottom-36 left-0 right-0 px-6 z-20">
            <div className="flex justify-center gap-8 text-white text-sm">
              <button
                onClick={handleVideoMode}
                className={`relative ${mode === "video" ? "font-bold" : "opacity-60"}`}
              >
                VÍDEO
                {currentStep.target === "video_mode" && (
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute -inset-2 rounded-lg bg-yellow-400/40 -z-10"
                  />
                )}
              </button>
              <button
                onClick={() => setMode("photo")}
                className={mode === "photo" ? "font-bold" : "opacity-60"}
              >
                FOTO
              </button>
              <button
                onClick={() => setMode("portrait")}
                className={mode === "portrait" ? "font-bold" : "opacity-60"}
              >
                RETRATO
              </button>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center z-20">
            {/* Gallery thumbnail */}
            <div className="relative">
              <Highlight active={currentStep.target === "gallery"}>
                <button
                  onClick={handleGallery}
                  className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur hover:bg-white/30 flex items-center justify-center"
                >
                  {photoTaken ? (
                    <ImageIcon className="w-8 h-8 text-white" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-400" />
                  )}
                </button>
              </Highlight>
            </div>

            {/* Capture button */}
            <Highlight active={currentStep.target === "capture"}>
              <button
                onClick={handleCapture}
                className={`w-20 h-20 rounded-full border-4 border-white backdrop-blur transition-all ${
                  isRecording ? "bg-red-500" : "bg-white/30 hover:bg-white/40"
                }`}
              >
                {mode === "video" && isRecording ? (
                  <div className="w-8 h-8 bg-white rounded-sm mx-auto"></div>
                ) : (
                  <div className="w-full h-full rounded-full bg-white"></div>
                )}
              </button>
            </Highlight>

            {/* Flip camera */}
            <div className="relative">
              <Highlight active={currentStep.target === "flip"}>
                <button
                  onClick={handleFlip}
                  className="w-14 h-14 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 flex items-center justify-center"
                >
                  <FlipHorizontal className="w-6 h-6 text-white" />
                </button>
              </Highlight>
            </div>
          </div>
        </div>

        {/* Tutorial overlay - barra de instrução embaixo */}
        <AnimatePresence>
          <motion.div
            key={currentStep.id}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="absolute bottom-0 left-0 right-0 bg-blue-900/95 backdrop-blur-md text-white p-5 z-40"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-blue-900 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                {stepIndex + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed">{currentStep.text}</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex gap-1">
                    {STEPS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i === stepIndex ? "w-6 bg-yellow-400" : "w-1.5 bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-white/60 ml-auto">
                    Passo {stepIndex + 1} de {STEPS.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </PhoneFrame>
  );
}