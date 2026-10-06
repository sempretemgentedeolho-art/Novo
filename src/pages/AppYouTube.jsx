import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Bell,
  Youtube,
  ThumbsUp,
  Share2,
  Bookmark,
  Home as HomeIcon,
  SquarePlay,
  Zap,
  Plus,
  MessageSquare,
  Play,
  Video,
  Image as ImageIcon,
  X,
} from "lucide-react";

const VIDEOS = [
  {
    id: 1,
    title: "Receita de bolo de cenoura fácil e fofinho",
    channel: "Cozinha da Vovó",
    meta: "1,2 mi de visualizações há 2 anos",
    time: "12:40",
    initials: "CV",
    thumb: "from-orange-400 to-orange-600",
    tag: "Receitas",
  },
  {
    id: 2,
    title: "Sopa de legumes bem quentinha, passo a passo",
    channel: "Cozinha da Vovó",
    meta: "856 mil visualizações há 1 ano",
    time: "08:15",
    initials: "CV",
    thumb: "from-emerald-500 to-green-700",
    tag: "Receitas",
  },
  {
    id: 3,
    title: "Músicas antigas para relaxar e lembrar",
    channel: "Saudade Musical",
    meta: "3,4 mi de visualizações há 3 anos",
    time: "45:12",
    initials: "SM",
    thumb: "from-purple-500 to-pink-600",
    tag: "Músicas",
  },
  {
    id: 4,
    title: "Notícias de hoje explicadas com calma",
    channel: "Jornal da Manhã",
    meta: "421 mil visualizações há 5 horas",
    time: "22:30",
    initials: "JM",
    thumb: "from-sky-400 to-blue-600",
    tag: "Notícias",
  },
];

const CHIPS = ["Todos", "Receitas", "Músicas", "Notícias"];

// Cada etapa: texto falado em voz alta + elemento que pisca em amarelo
const STEPS = [
  {
    id: "intro",
    target: "search",
    text: "Bem-vindo ao YouTube! Aqui você assiste a vídeos sobre tudo: receitas, músicas e notícias. Lá em cima, do lado direito, tem um desenho de uma lupa. Toque na lupa, onde está piscando, para procurar um vídeo.",
  },
  {
    id: "search_open",
    target: "suggestion",
    text: "Agora você pode escolher o que quer assistir. Eu já escolhi para você. Toque na palavra RECEITAS, que está piscando, para ver os vídeos de receita.",
  },
  {
    id: "results",
    target: "first_video",
    text: "Olhe os vídeos que apareceram. Toque onde está piscando: o primeiro vídeo, que é uma receita de bolo de cenoura.",
  },
  {
    id: "watching",
    target: "like",
    text: "Você está assistindo ao vídeo! Embaixo dele tem vários botões. Toque no joinha, onde está piscando, para dizer que você gostou do vídeo.",
  },
  {
    id: "liked",
    target: "leave_player",
    text: "Muito bem, você curtiu o vídeo! Agora toque na seta de voltar, lá em cima do lado esquerdo, para ver os outros vídeos.",
  },
  {
    id: "back_results",
    target: "you_nav",
    text: "De volta à lista de vídeos. Agora toque em VOCÊ, no canto de baixo do lado direito, onde está piscando, para ver os vídeos que você já assistiu.",
  },
  {
    id: "you_open",
    target: "create_nav",
    text: "Aqui em VOCÊ ficam a sua conta e os vídeos que você assistiu. Agora toque no sinal de MAIS, no meio da barra de baixo, onde está piscando, para ver como gravar um vídeo seu.",
  },
  {
    id: "create_open",
    target: "close_create",
    text: "Nesta tela você pode gravar um vídeo com a câmera do celular, ou escolher um vídeo que já está na sua galeria, para publicar no YouTube. Hoje não vamos gravar. Toque no X, onde está piscando, para fechar.",
  },
  {
    id: "done",
    target: "back",
    text: "Parabéns! Você aprendeu a usar o YouTube: procurar um vídeo, assistir, curtir e ver os vídeos que você já assistiu. Toque na seta, onde está piscando, para voltar à tela inicial.",
  },
];

export default function AppYouTube() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [view, setView] = useState("home");
  const [chip, setChip] = useState("Todos");
  const [liked, setLiked] = useState(false);

  const target = STEPS[stepIndex].target;
  const shownVideos = chip === "Todos" ? VIDEOS : VIDEOS.filter((v) => v.tag === chip);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(STEPS[stepIndex].text);
      utter.lang = "pt-BR";
      utter.rate = 0.82;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, [stepIndex]);

  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));

  // Seta de cima: sai do vídeo durante o tutorial ou volta para a tela inicial
  const handleBack = () => {
    if (target === "leave_player") {
      setView("results");
      goNext();
      return;
    }
    navigate(createPageUrl("Home"));
  };

  const handleSearch = () => {
    if (target !== "search") return;
    setView("search");
    goNext();
  };

  const handleSuggestion = () => {
    if (target !== "suggestion") return;
    setChip("Receitas");
    setView("results");
    goNext();
  };

  const handleFirstVideo = () => {
    if (target !== "first_video") return;
    setView("player");
    goNext();
  };

  const handleLike = () => {
    if (target !== "like") return;
    setLiked(true);
    goNext();
  };

  const handleNavCreate = () => {
    setView("create");
    if (target === "create_nav") goNext();
  };

  const handleNavHome = () => setView("home");
  const handleNavShorts = () => setView("shorts");
  const handleNavSubs = () => setView("subscriptions");
  const handleNavYou = () => {
    setView("you");
    if (target === "you_nav") goNext();
  };

  const handleCloseCreate = () => {
    setView("you");
    if (target === "close_create") goNext();
  };

  // Destaque amarelo pulsante no elemento da etapa atual
  const Pulse = ({ active, children, className = "inline-flex", ring = "rounded-full", onClick }) => (
    <div className={`relative ${className}`} onClick={onClick}>
      {active && (
        <motion.div
          animate={{ scale: [1, 1.35, 1.35], opacity: [0.7, 0.25, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
          className={`absolute -inset-2 ${ring} bg-yellow-400 z-0 pointer-events-none`}
        />
      )}
      <motion.div
        animate={active ? { scale: [1, 1.07, 1] } : {}}
        transition={active ? { repeat: Infinity, duration: 1, ease: "easeInOut" } : {}}
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
    </div>
  );

  const VideoCard = ({ video, active, onClick }) => (
    <Pulse active={active} className="w-full" ring="rounded-2xl">
      <button onClick={onClick} className="w-full text-left">
        <div
          className={`relative w-full aspect-video rounded-xl bg-gradient-to-br ${video.thumb} flex items-center justify-center`}
        >
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-gray-900 ml-0.5" fill="currentColor" />
          </div>
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {video.time}
          </span>
        </div>
        <div className="flex gap-3 mt-2">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700 shrink-0">
            {video.initials}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 leading-snug">{video.title}</p>
            <p className="text-xs text-gray-600 mt-0.5">
              {video.channel} · {video.meta}
            </p>
          </div>
        </div>
      </button>
    </Pulse>
  );

  const VideoRow = ({ video, subtitle }) => (
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

  const renderContent = () => {
    if (view === "search") {
      return (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-gray-500" />
              <span className="text-gray-900">receitas</span>
            </div>
          </div>
          <div className="px-4">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Sugestões</p>
            <Pulse active={target === "suggestion"} className="w-full" ring="rounded-xl">
              <button
                onClick={handleSuggestion}
                className="w-full flex items-center gap-3 py-3 border-b border-gray-100 text-left"
              >
                <Search className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900 font-medium">Receitas</span>
              </button>
            </Pulse>
            {["Receitas fáceis", "Receita de bolo", "Receitas para idosos"].map((s) => (
              <div key={s} className="w-full flex items-center gap-3 py-3 border-b border-gray-100">
                <Search className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{s}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (view === "results") {
      return (
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <p className="text-xs text-gray-600 py-3">Resultados para: receitas</p>
          <div className="space-y-5">
            {shownVideos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                active={target === "first_video" && index === 0}
                onClick={index === 0 ? handleFirstVideo : undefined}
              />
            ))}
          </div>
        </div>
      );
    }

    if (view === "player") {
      return (
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="relative w-full aspect-video bg-black flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
            </div>
            <span className="absolute bottom-2 left-3 text-white text-xs">12:40 / 12:40</span>
          </div>
          <div className="p-4">
            <p className="font-bold text-gray-900 text-base leading-snug">
              Receita de bolo de cenoura fácil e fofinho
            </p>
            <p className="text-xs text-gray-600 mt-1">Cozinha da Vovó · 1,2 mi de visualizações</p>

            <div className="mt-5 flex items-center gap-5 overflow-x-auto pb-2">
              <Pulse active={target === "like"} ring="rounded-xl">
                <button onClick={handleLike} className="flex flex-col items-center gap-1 px-2">
                  <ThumbsUp className={`w-6 h-6 ${liked ? "text-blue-600" : "text-gray-900"}`} />
                  <span className="text-xs text-gray-700">{liked ? "Curtido" : "Curtir"}</span>
                </button>
              </Pulse>
              <div className="flex flex-col items-center gap-1 px-2">
                <Share2 className="w-6 h-6 text-gray-900" />
                <span className="text-xs text-gray-700">Compartilhar</span>
              </div>
              <div className="flex flex-col items-center gap-1 px-2">
                <Bookmark className="w-6 h-6 text-gray-900" />
                <span className="text-xs text-gray-700">Salvar</span>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Comentários</p>
              <p className="text-xs text-gray-600">
                Maria: Fiz ontem e ficou uma delícia! Muito fácil de entender.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (view === "shorts") {
      return (
        <div className="flex-1 relative overflow-hidden bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-600 via-rose-500 to-orange-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-5 left-4 right-20">
            <p className="text-white font-semibold text-sm leading-snug">
              Dica rápida de como usar o celular
            </p>
            <p className="text-white/85 text-xs mt-1">@ForjaDaConsciencia</p>
          </div>
          <div className="absolute bottom-5 right-3 flex flex-col items-center gap-5">
            <div className="flex flex-col items-center">
              <ThumbsUp className="w-7 h-7 text-white" />
              <span className="text-white text-[11px] mt-0.5">128 mil</span>
            </div>
            <div className="flex flex-col items-center">
              <Share2 className="w-7 h-7 text-white" />
              <span className="text-white text-[11px] mt-0.5">Enviar</span>
            </div>
          </div>
        </div>
      );
    }

    if (view === "subscriptions") {
      return (
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <h2 className="text-lg font-bold text-gray-900 py-3">Inscrições</h2>
          <p className="text-xs font-bold text-gray-500 uppercase mb-3">
            Canais que você acompanha
          </p>
          <div className="space-y-4">
            {[VIDEOS[0], VIDEOS[2]].map((video) => (
              <VideoRow key={video.id} video={video} />
            ))}
          </div>
        </div>
      );
    }

    if (view === "you") {
      return (
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              EU
            </div>
            <div>
              <p className="font-bold text-gray-900">Você</p>
              <p className="text-xs text-gray-600">Sua conta do YouTube</p>
            </div>
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase mt-6 mb-3">
            Vídeos que você assistiu
          </p>
          <div className="space-y-4">
            {[VIDEOS[0], VIDEOS[3]].map((video) => (
              <VideoRow key={video.id} video={video} subtitle="Assistido hoje" />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto py-3">
          {CHIPS.map((c) => (
            <button
              key={c}
              onClick={() => setChip(c)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap border ${
                chip === c
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-gray-100 text-gray-800 border-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="space-y-5">
          {shownVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col relative overflow-hidden">
        <StatusBar variant="light" />

        {/* Cabeçalho */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-gray-200">
          <Pulse active={target === "back" || target === "leave_player"} ring="rounded-full">
            <button
              onClick={handleBack}
              className="w-9 h-9 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </button>
          </Pulse>
          <Youtube className="w-7 h-7 text-red-600" />
          <span className="text-xl font-bold text-gray-900">YouTube</span>
          <div className="flex-1" />
          <MessageSquare className="w-6 h-6 text-gray-900" />
          <Bell className="w-6 h-6 text-gray-900" />
          <Pulse active={target === "search"} ring="rounded-full">
            <button
              onClick={handleSearch}
              className="w-9 h-9 rounded-full flex items-center justify-center"
            >
              <Search className="w-6 h-6 text-gray-900" />
            </button>
          </Pulse>
        </div>

        {renderContent()}

        {/* Barra de baixo */}
        {view !== "create" && (
          <div className="bg-white border-t border-gray-200 flex justify-around items-center py-2 shrink-0">
            <Pulse ring="rounded-xl">
              <button onClick={handleNavHome} className="flex flex-col items-center gap-0.5">
                <HomeIcon
                  className={`w-6 h-6 ${
                    view === "home" || view === "results" ? "text-gray-900" : "text-gray-500"
                  }`}
                />
                <span className="text-[10px] text-gray-700">Início</span>
              </button>
            </Pulse>

            <Pulse ring="rounded-xl">
              <button onClick={handleNavShorts} className="flex flex-col items-center gap-0.5">
                <Zap
                  className={`w-6 h-6 ${view === "shorts" ? "text-gray-900" : "text-gray-500"}`}
                />
                <span className="text-[10px] text-gray-700">Shorts</span>
              </button>
            </Pulse>

            <Pulse active={target === "create_nav"} ring="rounded-full">
              <button
                onClick={handleNavCreate}
                className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center"
              >
                <Plus className="w-7 h-7 text-gray-900" />
              </button>
            </Pulse>

            <Pulse ring="rounded-xl">
              <button onClick={handleNavSubs} className="flex flex-col items-center gap-0.5">
                <SquarePlay
                  className={`w-6 h-6 ${
                    view === "subscriptions" ? "text-gray-900" : "text-gray-500"
                  }`}
                />
                <span className="text-[10px] text-gray-700 whitespace-nowrap">Inscrições</span>
              </button>
            </Pulse>

            <Pulse active={target === "you_nav"} ring="rounded-full">
              <button onClick={handleNavYou} className="flex flex-col items-center gap-0.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${
                    view === "you" ? "bg-gray-900 text-white" : "bg-gray-400 text-white"
                  }`}
                >
                  EU
                </div>
                <span className="text-[10px] text-gray-700">Você</span>
              </button>
            </Pulse>
          </div>
        )}

        {/* Tela de criar vídeo */}
        <AnimatePresence>
          {view === "create" && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="absolute inset-0 bg-white z-[70] flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Criar</h2>
                <Pulse
                  active={target === "close_create"}
                  ring="rounded-full"
                  className="inline-flex p-1.5"
                  onClick={handleCloseCreate}
                >
                  <button
                    type="button"
                    className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X className="w-6 h-6 text-gray-900" />
                  </button>
                </Pulse>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 bg-gray-50">
                  <Video className="w-6 h-6 text-gray-900" />
                  <div>
                    <p className="text-gray-900 font-medium">Gravar um vídeo</p>
                    <p className="text-xs text-gray-600">Filme com a câmera do celular</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 bg-gray-50">
                  <ImageIcon className="w-6 h-6 text-gray-900" />
                  <div>
                    <p className="text-gray-900 font-medium">Escolher da galeria</p>
                    <p className="text-xs text-gray-600">Use um vídeo que já está no celular</p>
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