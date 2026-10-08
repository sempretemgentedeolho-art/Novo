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
  History as HistoryIcon,
  Download,
  ListVideo,
  Radio,
  Settings,
  HelpCircle,
  Users,
  Mic,
  TrendingUp,
  Scissors,
} from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import AvisoAcessibilidade from "@/components/AvisoAcessibilidade";
import { useAcessibilidade } from "@/lib/acessibilidade";
import VideoRow from "@/components/youtube/VideoRow";
import VideoPlayer from "@/components/youtube/VideoPlayer";
import ShareSheet from "@/components/youtube/ShareSheet";
import NotificationsView from "@/components/youtube/NotificationsView";
import HistoryView from "@/components/youtube/HistoryView";
import ListaVideosView from "@/components/youtube/ListaVideosView";
import PlaylistsView from "@/components/youtube/PlaylistsView";
import AoVivoView from "@/components/youtube/AoVivoView";
import CanalView from "@/components/youtube/CanalView";
import ConfigYouTubeView from "@/components/youtube/ConfigYouTubeView";
import LegendasConfigView from "@/components/youtube/LegendasConfigView";
import AjudaYouTubeView from "@/components/youtube/AjudaYouTubeView";
import ComentariosView from "@/components/youtube/ComentariosView";
import TelaCheiaView from "@/components/youtube/TelaCheiaView";
import VozBuscaView from "@/components/youtube/VozBuscaView";
import VideoConfigView from "@/components/youtube/VideoConfigView";
import AparenciaView from "@/components/youtube/AparenciaView";
import LetraGrandeView from "@/components/youtube/LetraGrandeView";
import StudioView from "@/components/youtube/StudioView";
import ClipesView from "@/components/youtube/ClipesView";
import ChatAoVivoView from "@/components/youtube/ChatAoVivoView";
import DublagemView from "@/components/youtube/DublagemView";
import { CHAPTERS, STEPS } from "@/components/youtube/youtubeTutorial";
import ChapterPicker from "@/components/youtube/ChapterPicker";
import CreateMenu from "@/components/youtube/CreateMenu";
import ShortsCamera from "@/components/youtube/ShortsCamera";
import ShortsEdit from "@/components/youtube/ShortsEdit";
import ShortsPublish from "@/components/youtube/ShortsPublish";

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



export default function AppYouTube() {
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [runKey, setRunKey] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [view, setView] = useState("home");
  const [chip, setChip] = useState("Todos");
  const [shareOpen, setShareOpen] = useState(false);
  const [compartilhado, setCompartilhado] = useState(false);
  const [shortsScreen, setShortsScreen] = useState(null);
  const [duracao, setDuracao] = useState(0);
  const [meuComentario, setMeuComentario] = useState("");
  const [playlistAberta, setPlaylistAberta] = useState("receitas");

  const { talkback, gestos } = useAcessibilidade();
  // Enquanto o menu de capítulos está aberto, nenhuma pista pisca por trás dele
  const target = chapter ? STEPS[stepIndex].target : null;
  const shownVideos = chip === "Todos" ? VIDEOS : VIDEOS.filter((v) => v.tag === chip);

  // Cada playlist tem o seu nome e os seus vídeos
  const PLAYLISTS = {
    receitas: { nome: "Receitas da Vovó", videos: [VIDEOS[0], VIDEOS[1]] },
    musicas: { nome: "Músicas antigas", videos: [VIDEOS[2]] },
    familia: { nome: "Para ver com a família", videos: [VIDEOS[0], VIDEOS[3]] },
  };

  // Itens da área "Você": cada um abre uma tela nova do YouTube
  const ROWS_AREA = [
    { id: "assistir_mais_tarde", view: "assistirmaiatarde", label: "Assistir mais tarde", sub: "Os vídeos que você salvou", icon: Bookmark },
    { id: "playlists", view: "playlists", label: "Playlists", sub: "Listinhas de vídeos por assunto", icon: ListVideo },
    { id: "gostei", view: "gostei", label: "Vídeos com Gostei", sub: "Onde você tocou no joinha", icon: ThumbsUp },
    { id: "seus_videos", view: "seusvideos", label: "Seus vídeos", sub: "O que você publicou", icon: SquarePlay },
    { id: "clipes", view: "clipes", label: "Clipes", sub: "Os pedacinhos curtos dos vídeos", icon: Scissors },
    { id: "downloads", view: "downloads", label: "Downloads", sub: "Assistir sem internet", icon: Download },
    { id: "aovivo", view: "aovivo", label: "Transmissões ao vivo", sub: "O que está passando agora", icon: Radio },
    { id: "studio", view: "studio", label: "YouTube Studio", sub: "Para quem publica vídeos", icon: TrendingUp },
    { id: "canal", view: "canal", label: "Canais que você acompanha", sub: "Cozinha da Vovó", icon: Users },
    { id: "config_youtube", view: "configyoutube", label: "Configurações", sub: "Deixe o YouTube do seu jeito", icon: Settings },
    { id: "ajuda_youtube", view: "ajuda", label: "Ajuda", sub: "Dúvidas comuns e respostas", icon: HelpCircle },
  ];

  useEffect(() => {
    if (!chapter) return;
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const lembreteGestos = gestos
        ? " Lembre-se: para voltar, deslize o dedo da borda esquerda para a direita."
        : "";
      const utter = new SpeechSynthesisUtterance(`${STEPS[stepIndex].text}${lembreteGestos}`);
      utter.lang = "pt-BR";
      // Com o TalkBack ligado a fala fica mais devagar, mais fácil de acompanhar
      utter.rate = talkback ? 0.72 : 0.82;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, [stepIndex, chapter, runKey, talkback, gestos]);

  // Começa o tutorial na parte escolhida no menu
  const startChapter = (cap) => {
    setChapter(cap);
    setStepIndex(cap.stepIndex);
    setView(cap.view);
    setChip(cap.chip);
    setCompartilhado(false);
    setShareOpen(false);
    setShortsScreen(null);
    setRunKey((k) => k + 1);
  };

  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));

  // Para onde a seta de voltar leva em cada tela nova
  const VOLTAR_VIEW = {
    voltar_comentarios: "player",
    sair_tela_cheia: "player",
    voltar_mais_tarde: "you",
    voltar_playlists: "you",
    voltar_playlist_receitas: "playlists",
    voltar_gostei: "you",
    voltar_seus_videos: "you",
    voltar_downloads: "you",
    voltar_aovivo: "you",
    voltar_canal: "you",
    voltar_config: "you",
    voltar_legendas_config: "configyoutube",
    voltar_ajuda: "you",
    voltar_letra: "aparencia",
    voltar_clipes: "you",
    voltar_chat: "you",
    voltar_dublagem: "configyoutube",
    voltar_studio: "you",
  };

  // Seta de cima: sai do vídeo durante o tutorial ou volta para a tela inicial
  const handleBack = () => {
    if (VOLTAR_VIEW[target]) {
      setView(VOLTAR_VIEW[target]);
      goNext();
      return;
    }
    if (target === "leave_player" || target === "close_notifications") {
      setView("results");
      goNext();
      return;
    }
    if (target === "back_from_history") {
      setView("you");
      goNext();
      return;
    }
    navigate(createPageUrl("Home"));
  };

  // Abre uma tela da área do YouTube e avança o tutorial quando é a vez dela
  const abrirTela = (id, destino) => {
    setView(destino);
    if (target === id) goNext();
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

  // Tela do vídeo: curtir, inscrever, salvar, compartilhar, comentar e tela cheia
  const handlePlayerTap = (id) => {
    if (id === "compartilhar") setShareOpen(true);
    if (id === "ver_comentarios") setView("comentarios");
    if (id === "telacheia_btn") setView("telacheia");
    if (id === "sair_tela_cheia") setView("player");
    if (id === "engrenagem") setView("video_config");
    if (target === id) goNext();
  };

  const handleShareOption = () => {
    setShareOpen(false);
    if (target !== "share_whats") return;
    setCompartilhado(true);
    goNext();
  };

  const handleNotifications = () => {
    if (target !== "notifications") return;
    setView("notifications");
    goNext();
  };

  const handleHistory = () => {
    if (target !== "history_row") return;
    setView("history");
    goNext();
  };

  // Funções extras: buscar falando, configurações do vídeo e YouTube Studio
  const handleVoz = () => {
    setView("voz");
    if (target === "voz") goNext();
  };

  const handleVozFalar = () => {
    if (target === "voz_falar") goNext();
  };

  const handleVozResultado = () => {
    setView("results");
    if (target === "voz_resultado") goNext();
  };

  const handleVideoConfigTap = (id) => {
    if (id === "video_config_concluir") setView("player");
    if (target === id) goNext();
  };

  const handleStudioTab = (id) => {
    if (target === id) goNext();
  };

  // Botões das telas novas: Clipes, chat ao vivo, publicações do canal, dublagem e monetização
  const handleTelaTap = (id) => {
    if (id === "chat_abrir") setView("chat_aovivo");
    if (target === id) goNext();
  };

  const handleNavCreate = () => {
    setShortsScreen("menu");
    if (target === "create_nav") goNext();
  };

  const handleNavHome = () => setView("home");
  const handleNavShorts = () => setView("shorts");
  const handleNavSubs = () => setView("subscriptions");
  const handleNavYou = () => {
    setView("you");
    if (target === "you_nav") goNext();
  };

  // Cada ação das telas de Short conclui um ou mais passos do tutorial.
  // A conferência é feita pelo ID do passo (e não pelo alvo que pisca), assim
  // o tutorial avança mesmo quando o painel foi aberto antes de o passo chegar.
  const PASSOS_DA_ACAO = {
    short_option: ["create_menu"],
    record: ["camera_open"],
    check: ["camera_open", "recorded"],
    aa: ["edit_open"],
    concluido: ["edit_open", "text_open"],
    musica_pill: ["text_done"],
    musica: ["audio_open"],
    efeitos: ["efeitos_open"],
    efeito_estrela: ["efeitos_estrela"],
    efeitos_concluir: ["efeitos_open", "efeitos_estrela", "efeitos_done"],
    filtros: ["filtros_open"],
    filtro_dourado: ["filtros_dourado"],
    filtros_concluir: ["filtros_open", "filtros_dourado", "filtros_done"],
    adesivos: ["adesivos_open"],
    adesivo_coracao: ["adesivos_coracao"],
    adesivos_concluir: ["adesivos_open", "adesivos_coracao", "adesivos_done"],
    legendas: ["legendas_open"],
    legendas_concluir: ["legendas_open", "legendas_done"],
    narracao: ["narracao_open"],
    narracao_concluir: ["narracao_open", "narracao_done"],
    next: ["enfeites_done"],
    titulo: ["publish"],
    enviar: ["publish_send"],
    published: ["published"],
  };

  // Vai para o passo que vem depois do último passo que esta ação conclui
  const avancarAposPassos = (passos) => {
    const atual = STEPS[stepIndex] && STEPS[stepIndex].id;
    if (!atual || !passos.includes(atual)) return;
    const indices = passos
      .map((p) => STEPS.findIndex((s) => s.id === p))
      .filter((i) => i >= 0);
    if (!indices.length) return;
    setStepIndex(Math.min(Math.max(...indices) + 1, STEPS.length - 1));
  };

  const handleShortsAction = (id, nextScreen) => {
    if (nextScreen) setShortsScreen(nextScreen);
    avancarAposPassos(PASSOS_DA_ACAO[id] || []);
  };

  const handleRecorded = (segundos) => setDuracao(segundos);

  const handleCloseShorts = () => {
    setShortsScreen(null);
    setView("you");
  };

  const handleFinishShorts = () => {
    setShortsScreen(null);
    setView("you");
    avancarAposPassos(PASSOS_DA_ACAO.published);
  };

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

  // A linha de vídeo agora vem do componente VideoRow

  const renderContent = () => {
    if (view === "search") {
      return (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-gray-500" />
              <span className="text-gray-900 flex-1">receitas</span>
              <Pulse active={target === "voz"} ring="rounded-full">
                <button
                  type="button"
                  onClick={handleVoz}
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0"
                >
                  <Mic className="w-5 h-5 text-red-600" />
                </button>
              </Pulse>
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

    if (view === "player" || view === "telacheia") {
      return (
        <VideoPlayer
          target={target}
          compartilhado={compartilhado}
          onTap={handlePlayerTap}
          onComentario={setMeuComentario}
        />
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

    if (view === "notifications") {
      return <NotificationsView />;
    }

    if (view === "history") {
      return <HistoryView videos={[VIDEOS[0], VIDEOS[3], VIDEOS[2]]} />;
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

          <p className="text-xs font-bold text-gray-500 uppercase mt-6 mb-3">Sua área</p>
          <div className="space-y-2">
            <Pulse active={target === "history_row"} className="w-full" ring="rounded-2xl">
              <button
                onClick={handleHistory}
                className="w-full flex items-center gap-3 rounded-2xl border border-gray-200 px-3 py-3 text-left"
              >
                <HistoryIcon className="w-5 h-5 text-gray-700 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Histórico</p>
                  <p className="text-xs text-gray-600">Tudo que você já assistiu</p>
                </div>
              </button>
            </Pulse>

            {ROWS_AREA.map((row) => (
              <Pulse key={row.id} className="w-full" ring="rounded-2xl" active={target === row.id}>
                <button
                  onClick={() => abrirTela(row.id, row.view)}
                  className="w-full flex items-center gap-3 rounded-2xl border border-gray-200 px-3 py-3 text-left"
                >
                  <row.icon className="w-5 h-5 text-gray-700 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{row.label}</p>
                    <p className="text-xs text-gray-600">{row.sub}</p>
                  </div>
                </button>
              </Pulse>
            ))}
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

    if (view === "comentarios") {
      return <ComentariosView meuComentario={meuComentario} />;
    }

    if (view === "assistirmaiatarde") {
      return (
        <ListaVideosView
          titulo="Assistir mais tarde"
          subtitulo="Os vídeos que você guardou tocando em SALVAR, para assistir quando quiser."
          videos={[VIDEOS[0], VIDEOS[3], VIDEOS[2]]}
        />
      );
    }

    if (view === "playlists") {
      return (
        <PlaylistsView
          target={target}
          onTap={(id) => {
            setPlaylistAberta(id.replace("playlist_", ""));
            abrirTela(id, "playlist_receitas");
          }}
          onAcao={(id) => {
            if (target === id) goNext();
          }}
        />
      );
    }

    if (view === "playlist_receitas") {
      const lista = PLAYLISTS[playlistAberta];
      return (
        <ListaVideosView
          titulo={lista.nome}
          subtitulo="Playlist com os vídeos em ordem, para assistir um atrás do outro."
          videos={lista.videos}
        />
      );
    }

    if (view === "gostei") {
      return (
        <ListaVideosView
          titulo="Vídeos com Gostei"
          subtitulo="Todos os vídeos em que você tocou no joinha."
          videos={[VIDEOS[0], VIDEOS[2]]}
        />
      );
    }

    if (view === "seusvideos") {
      return (
        <ListaVideosView
          titulo="Seus vídeos"
          subtitulo="Os vídeos que você publicou no seu canal."
          aviso="Seu Short foi publicado e já está aqui, para quem você quiser ver."
          videos={[VIDEOS[2]]}
        />
      );
    }

    if (view === "downloads") {
      return (
        <ListaVideosView
          titulo="Downloads"
          subtitulo="Vídeos guardados dentro do celular para assistir sem internet."
          aviso="Estes vídeos ficam no seu aparelho e funcionam mesmo sem sinal."
          videos={[VIDEOS[0], VIDEOS[3]]}
        />
      );
    }

    if (view === "clipes") {
      return <ClipesView target={target} onTap={handleTelaTap} />;
    }

    if (view === "chat_aovivo") {
      return <ChatAoVivoView target={target} onTap={handleTelaTap} />;
    }

    if (view === "aovivo") {
      return <AoVivoView target={target} onTap={handleTelaTap} />;
    }

    if (view === "canal") {
      return <CanalView videos={[VIDEOS[0], VIDEOS[1]]} target={target} onTap={handleTelaTap} />;
    }

    if (view === "voz") {
      return <VozBuscaView target={target} onFalar={handleVozFalar} onResultado={handleVozResultado} />;
    }

    if (view === "video_config") {
      return <VideoConfigView target={target} onTap={handleVideoConfigTap} />;
    }

    if (view === "aparencia") {
      return (
        <AparenciaView
          target={target}
          onTap={(id) => abrirTela(id, id === "letra_grande" ? "letra_grande" : "aparencia")}
        />
      );
    }

    if (view === "letra_grande") {
      return <LetraGrandeView />;
    }

    if (view === "studio") {
      return <StudioView target={target} onTab={handleStudioTab} />;
    }

    if (view === "configyoutube") {
      return (
        <ConfigYouTubeView
          target={target}
          onTap={(id) =>
            abrirTela(
              id,
              id === "aparencia" ? "aparencia" : id === "audio_dublagem" ? "dublagem" : "legendas_config"
            )
          }
        />
      );
    }

    if (view === "legendas_config") {
      return <LegendasConfigView />;
    }

    if (view === "dublagem") {
      return <DublagemView target={target} onTap={handleTelaTap} />;
    }

    if (view === "ajuda") {
      return <AjudaYouTubeView />;
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
        <AvisoAcessibilidade />

        {/* Cabeçalho */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-gray-200">
          <Pulse
            active={
              target === "back" ||
              target === "leave_player" ||
              target === "close_notifications" ||
              target === "back_from_history" ||
              Boolean(VOLTAR_VIEW[target])
            }
            ring="rounded-full"
          >
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
          <Pulse active={target === "notifications"} ring="rounded-full">
            <button
              onClick={handleNotifications}
              className="w-9 h-9 rounded-full flex items-center justify-center relative"
            >
              <Bell className="w-6 h-6 text-gray-900" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-600" />
            </button>
          </Pulse>
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

        {view === "telacheia" && <TelaCheiaView target={target} onTap={handlePlayerTap} />}

        {shareOpen && (
          <ShareSheet
            target={target}
            onOption={handleShareOption}
            onClose={() => setShareOpen(false)}
          />
        )}

        {/* Barra de baixo */}
        {!shortsScreen && (
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

        {/* Criação de Short: menu, câmera, enfeites e publicação */}
        <AnimatePresence>
          {shortsScreen && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="absolute inset-0 z-[70]"
            >
              {shortsScreen === "menu" && (
                <CreateMenu
                  target={target}
                  onTap={(id) => handleShortsAction(id, "camera")}
                />
              )}

              {shortsScreen === "camera" && (
                <ShortsCamera
                  target={target}
                  onTap={(id) => handleShortsAction(id)}
                  onRecorded={handleRecorded}
                  onCheck={() => handleShortsAction("check", "edit")}
                  onClose={handleCloseShorts}
                />
              )}

              {shortsScreen === "edit" && (
                <ShortsEdit
                  target={target}
                  duracao={duracao}
                  onTap={(id) => handleShortsAction(id)}
                  onNext={() => handleShortsAction("next", "publish")}
                  onClose={handleCloseShorts}
                />
              )}

              {shortsScreen === "publish" && (
                <ShortsPublish
                  target={target}
                  duracao={duracao}
                  onTap={(id) => handleShortsAction(id)}
                  onFinish={handleFinishShorts}
                  onClose={handleCloseShorts}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu de capítulos: escolher por onde começar */}
        {!chapter && <ChapterPicker chapters={CHAPTERS} onSelect={startChapter} />}
      </div>
    </PhoneFrame>
  );
}