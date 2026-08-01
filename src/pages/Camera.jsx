import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, FlipHorizontal, Zap, Settings, Camera, Image as ImageIcon, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneFrame } from "@/components/PhoneFrame";

// Sequência do tutorial: cada etapa tem um alvo que pisca.
// Ao clicar no botão que pisca, ele para de piscar e a próxima etapa começa.
const STEPS = [
  {
    id: "intro",
    text: "Bem-vindo à câmera! Vou te ensinar tudo com calma. Embaixo da tela tem um botão branco redondo grande. Toque nele para tirar uma foto.",
    target: "capture",
  },
  {
    id: "photo_done",
    text: "Muito bem! Você tirou uma foto. Vamos aprender a fazer um vídeo. Clique onde está piscando: a palavra VÍDEO, no meio da tela embaixo, do lado esquerdo.",
    target: "video_mode",
  },
  {
    id: "video_selected",
    text: "Muito bem! Agora vamos aprender a configurar o vídeo. Lá em cima, do lado direito, tem um desenho de uma engrenagem. Clique onde está piscando para abrir as configurações.",
    target: "settings",
  },
  {
    id: "settings_open",
    text: "Estas são as configurações do vídeo. Aqui você escolhe a qualidade: 1080 é a melhor qualidade, 720 é qualidade média, e 240 é para vídeos em câmera lenta. Você também pode escolher gravar na vertical, que é o formato reto, ou na horizontal, que é o formato deitado. No momento em que você entendeu, toque no X que está piscando, lá em cima no canto direito, para fechar e voltar para a tela da câmera e continuar as explicações.",
    target: "close_settings",
  },
  {
    id: "settings_closed",
    text: "Muito bem! Agora que você configurou o vídeo, vamos gravar. Toque no botão branco redondo embaixo da tela que está piscando para começar a gravar.",
    target: "capture",
  },
  {
    id: "recording",
    text: "Você está gravando um vídeo! Veja o pontinho vermelho piscando em cima com a palavra REC. Para parar de gravar, toque novamente no botão vermelho.",
    target: "capture",
  },
  {
    id: "video_done",
    text: "Muito bem! O vídeo foi salvo. Agora vou te ensinar a ligar o flash, que ajuda a tirar fotos no escuro. Lá em cima, do lado direito, tem um desenho de um raio. Toque nele.",
    target: "flash",
  },
  {
    id: "flash_on",
    text: "O flash está ligado! Ele ficou amarelinho. Agora vou te ensinar a trocar de câmera para tirar uma selfie, que é uma foto de você mesmo. Embaixo, do lado direito, tem um desenho de duas setinhas. Toque nele.",
    target: "flip",
  },
  {
    id: "flipped",
    text: "Você trocou de câmera! Agora a câmera está apontando para você. Agora vou te ensinar a ver as fotos e vídeos que você tirou. Embaixo, do lado esquerdo, tem um quadradinho. Toque nele.",
    target: "gallery",
  },
  {
    id: "done",
    text: "Parabéns! Você aprendeu a usar a câmera! Você sabe tirar fotos, fazer vídeos, mudar as configurações, ligar o flash, trocar de câmera e ver suas fotos. Toque na seta no canto esquerdo em cima para voltar.",
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
  const [showSettings, setShowSettings] = useState(false);
  const [videoQuality, setVideoQuality] = useState("1080");
  const [videoOrientation, setVideoOrientation] = useState("vertical");

  const currentStep = STEPS[stepIndex];

  // Narração da etapa atual — dispara automaticamente ao mudar de etapa
  useEffect(() => {
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

  const goNext = () => {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

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

  // Botão de capturar
  const handleCapture = () => {
    if (currentStep.target !== "capture") return;
    if (currentStep.id === "intro") {
      setPhotoTaken(true);
      goNext();
    } else if (currentStep.id === "settings_closed") {
      setIsRecording(true);
      goNext();
    } else if (currentStep.id === "recording") {
      setIsRecording(false);
      goNext();
    }
  };

  // Trocar para modo vídeo
  const handleVideoMode = () => {
    if (currentStep.target !== "video_mode") return;
    setMode("video");
    goNext();
  };

  // Abrir configurações
  const handleSettings = () => {
    if (currentStep.target !== "settings") return;
    setShowSettings(true);
    goNext();
  };

  // Fechar configurações
  const handleCloseSettings = () => {
    if (currentStep.target !== "close_settings") return;
    setShowSettings(false);
    goNext();
  };

  // Flash
  const handleFlash = () => {
    if (currentStep.target !== "flash") return;
    setFlash(true);
    goNext();
  };

  // Trocar câmera
  const handleFlip = () => {
    if (currentStep.target !== "flip") return;
    setFrontCamera(true);
    goNext();
  };

  // Galeria
  const handleGallery = () => {
    if (currentStep.target !== "gallery") return;
    navigate(createPageUrl("Galeria"));
  };

  // Voltar
  const handleBack = () => {
    navigate(createPageUrl("Home"));
  };

  // Destaque pulsante para o botão ativo
  const Pulse = ({ active, children, className = "" }) => (
    <div className={`relative ${className}`}>
      {active && (
        <motion.div
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0.2, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
          className="absolute -inset-2 rounded-full bg-yellow-400 z-0"
        />
      )}
      <motion.div
        animate={active ? { scale: [1, 1.12, 1] } : {}}
        transition={active ? { repeat: Infinity, duration: 1, ease: "easeInOut" } : {}}
        className="relative z-10"
      >
        {children}
      </motion.div>
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
            <Pulse active={currentStep.target === "back"}>
              <button
                onClick={handleBack}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            </Pulse>

            <div className="flex gap-3">
              <Pulse active={currentStep.target === "flash"}>
                <button
                  onClick={handleFlash}
                  className={`w-10 h-10 rounded-full backdrop-blur flex items-center justify-center ${flash ? "bg-yellow-500" : "bg-black/50"}`}
                >
                  <Zap className="w-5 h-5 text-white" />
                </button>
              </Pulse>
              <Pulse active={currentStep.target === "settings"}>
                <button
                  onClick={handleSettings}
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
                >
                  <Settings className="w-5 h-5 text-white" />
                </button>
              </Pulse>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="absolute bottom-36 left-0 right-0 px-6 z-20">
            <div className="flex justify-center gap-8 text-white text-sm">
              <button
                onClick={handleVideoMode}
                className={`relative px-2 py-1 ${mode === "video" ? "font-bold" : "opacity-60"}`}
              >
                VÍDEO
                {currentStep.target === "video_mode" && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute -inset-1 rounded-lg bg-yellow-400/50 -z-10"
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
            <Pulse active={currentStep.target === "gallery"}>
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
            </Pulse>

            {/* Capture button */}
            <Pulse active={currentStep.target === "capture"}>
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
            </Pulse>

            {/* Flip camera */}
            <Pulse active={currentStep.target === "flip"}>
              <button
                onClick={handleFlip}
                className="w-14 h-14 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 flex items-center justify-center"
              >
                <FlipHorizontal className="w-6 h-6 text-white" />
              </button>
            </Pulse>
          </div>
        </div>

        {/* Painel de Configurações */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="absolute inset-0 bg-gray-900/95 backdrop-blur-md z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <h2 className="text-white text-lg font-bold">Configurações da Câmera</h2>
                <Pulse active={currentStep.target === "close_settings"}>
                  <button
                    onClick={handleCloseSettings}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </Pulse>
              </div>

              {/* Conteúdo */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Qualidade do vídeo */}
                <div>
                  <h3 className="text-white/80 text-sm font-semibold mb-3">Qualidade do Vídeo</h3>
                  <div className="space-y-2">
                    {[
                      { val: "1080", label: "1080p (Full HD)", desc: "Melhor qualidade" },
                      { val: "720", label: "720p (HD)", desc: "Qualidade média" },
                      { val: "240", label: "240p (Câmera lenta)", desc: "Para vídeos em câmera lenta" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => {
                          setVideoQuality(opt.val);
                          speak(`${opt.label} selecionado!`);
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                          videoQuality === opt.val
                            ? "border-yellow-400 bg-yellow-400/10"
                            : "border-white/10 bg-white/5"
                        }`}
                      >
                        <div className="text-left">
                          <p className="text-white font-medium">{opt.label}</p>
                          <p className="text-white/50 text-xs">{opt.desc}</p>
                        </div>
                        {videoQuality === opt.val && (
                          <Check className="w-5 h-5 text-yellow-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orientação do vídeo */}
                <div>
                  <h3 className="text-white/80 text-sm font-semibold mb-3">Orientação do Vídeo</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setVideoOrientation("vertical");
                        speak("Vertical selecionado!");
                      }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        videoOrientation === "vertical"
                          ? "border-yellow-400 bg-yellow-400/10"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <div className="w-8 h-14 rounded border-2 border-white/60"></div>
                      <span className="text-white text-sm">Vertical</span>
                    </button>
                    <button
                      onClick={() => {
                        setVideoOrientation("horizontal");
                        speak("Horizontal selecionado!");
                      }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        videoOrientation === "horizontal"
                          ? "border-yellow-400 bg-yellow-400/10"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <div className="w-14 h-8 rounded border-2 border-white/60"></div>
                      <span className="text-white text-sm">Horizontal</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PhoneFrame>
  );
}