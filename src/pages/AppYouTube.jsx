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
} from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import VideoRow from "@/components/youtube/VideoRow";
import VideoPlayer from "@/components/youtube/VideoPlayer";
import ShareSheet from "@/components/youtube/ShareSheet";
import NotificationsView from "@/components/youtube/NotificationsView";
import HistoryView from "@/components/youtube/HistoryView";
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

// Partes do tutorial: a pessoa pode começar direto na que tem dúvida
const CHAPTERS = [
  {
    id: "inicio",
    label: "Começar do início",
    description: "Procurar um vídeo, escolher e assistir",
    icon: Search,
    stepIndex: 0,
    view: "home",
    chip: "Todos",
  },
  {
    id: "curtir",
    label: "Curtir, se inscrever e salvar",
    description: "O joinha, acompanhar o canal e guardar o vídeo",
    icon: ThumbsUp,
    stepIndex: 3,
    view: "player",
    chip: "Receitas",
  },
  {
    id: "compartilhar",
    label: "Compartilhar e comentar",
    description: "Mandar o vídeo para alguém e escrever um comentário",
    icon: Share2,
    stepIndex: 6,
    view: "player",
    chip: "Receitas",
  },
  {
    id: "avisos",
    label: "Avisos e histórico",
    description: "A campainha, o que você já assistiu e sua área",
    icon: Bell,
    stepIndex: 11,
    view: "results",
    chip: "Receitas",
  },
  {
    id: "shorts",
    label: "Gravar e publicar um Short",
    description: "Gravar um vídeo curto, enfeitar e publicar",
    icon: Zap,
    stepIndex: 16,
    view: "you",
    chip: "Todos",
  },
];

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
    target: "inscrever",
    text: "Muito bem, você curtiu o vídeo! Quem fez esta receita é o canal Cozinha da Vovó. Toque em INSCREVER, onde está piscando, para acompanhar esse canal. Assim ele avisa quando colocar vídeo novo, e não custa nada.",
  },
  {
    id: "inscrito",
    target: "salvar",
    text: "Pronto, você está inscrito! Agora, se quiser guardar este vídeo para ver depois, toque em SALVAR, onde está piscando. Ele fica guardado na sua listinha de Assistir mais tarde.",
  },
  {
    id: "salvo",
    target: "compartilhar",
    text: "Agora toque em COMPARTILHAR, onde está piscando, para mandar este vídeo para alguém da sua família.",
  },
  {
    id: "compartilhar_open",
    target: "share_whats",
    text: "Estas são as opções para mandar o vídeo: WhatsApp, Mensagens, e-mail ou copiar o link. Toque em WhatsApp, onde está piscando, para enviar para um contato.",
  },
  {
    id: "compartilhado",
    target: "comentar",
    text: "Muito bem, o link do vídeo foi enviado! Agora toque em ADICIONAR UM COMENTÁRIO, onde está piscando, para escrever o que você achou do vídeo. Seu comentário fica embaixo do vídeo, para o canal e outras pessoas lerem.",
  },
  {
    id: "comentario_open",
    target: "enviar_comentario",
    text: "Já escrevi uma sugestão para você: Que receita fácil, gostei muito! Se quiser, apague e escreva do seu jeito. Quando terminar, toque no botão azul COMENTAR, onde está piscando.",
  },
  {
    id: "comentado",
    target: "leave_player",
    text: "Parabéns! Seu comentário foi publicado embaixo do vídeo. Agora toque na seta de voltar, lá em cima do lado esquerdo, para ver os outros vídeos.",
  },
  {
    id: "back_results",
    target: "notifications",
    text: "Esta é a lista de vídeos. Agora toque na campainha, lá em cima do lado direito, onde está piscando, para ver os avisos dos canais que você acompanha.",
  },
  {
    id: "notificacoes_open",
    target: "close_notifications",
    text: "Aqui ficam as notificações: os avisos de vídeo novo, de quem respondeu o seu comentário e de quem respondeu você. Quando aparece uma bolinha vermelha na campainha, é porque tem novidade para ver. Toque na seta de voltar, onde está piscando, para continuar.",
  },
  {
    id: "back_home",
    target: "you_nav",
    text: "Agora toque em VOCÊ, no canto de baixo do lado direito, onde está piscando, para ver a sua área e o histórico do que você já assistiu.",
  },
  {
    id: "you_open",
    target: "history_row",
    text: "Esta é a sua área no YouTube: o seu nome, a sua conta do Google e as listas que você guardou. Toque em HISTÓRICO, onde está piscando, para ver todos os vídeos que você já assistiu.",
  },
  {
    id: "history_open",
    target: "back_from_history",
    text: "Aqui fica o histórico: a lista de tudo que você assistiu, do mais novo para o mais antigo. É aqui que você acha aquele vídeo que viu e não lembra o nome. Toque na seta de voltar, onde está piscando.",
  },
  {
    id: "back_from_history",
    target: "create_nav",
    text: "Agora toque no sinal de MAIS, no meio da barra de baixo, onde está piscando, para aprender a gravar um Short, que é um vídeo curto.",
  },
  {
    id: "create_menu",
    target: "short_option",
    text: "Um menu subiu na tela com as opções para criar conteúdo no YouTube. A primeira opção é Criar um Short, que é um vídeo curto. Toque nela, onde está piscando, para abrir a câmera.",
  },
  {
    id: "camera_open",
    target: "record",
    text: "A câmera do seu celular abriu. Vamos conhecer cada botão antes de gravar. No canto de cima do lado esquerdo tem o X, para fechar a câmera. No meio, o botão Adicionar música, para colocar uma música no seu vídeo. No canto de cima do lado direito, o número 15, que é o tempo máximo do vídeo em segundos: se você tocar nele, ele passa para 60 e te dá um minuto inteiro. Do lado direito ficam as ferramentas: as duas setas em círculo viram a câmera, entre a sua frente e o que está na frente do celular; o 1x muda a velocidade da gravação, mais lenta ou mais rápida; o relógio é o temporizador, para começar a gravar sozinho depois de alguns segundos; a estrela são os efeitos; a carinha é o retoque do rosto; e a varinha muda as cores e os filtros. A setinha para baixo mostra ainda mais opções. Embaixo, no canto esquerdo, a miniatura Adicionar pega um vídeo que já está na sua galeria. E no meio fica o botão vermelho, o botão principal. Agora mantenha o dedo apertado e segurado no botão vermelho, que está piscando. Enquanto você segura, a câmera grava a sua voz e a sua imagem. Se soltar o dedo, a gravação pausa.",
  },
  {
    id: "recorded",
    target: "check",
    text: "Muito bem, você gravou o seu vídeo! O aviso em cima mostra quanto tempo você gravou, e quando você solta o dedo a gravação para. Agora toque no visto, o sinal de certo no canto de baixo do lado direito, onde está piscando, para enfeitar o seu vídeo.",
  },
  {
    id: "edit_open",
    target: "aa",
    text: "Agora o YouTube abriu a tela de enfeites, onde você melhora o seu vídeo. O seu vídeo fica passando na tela, repetindo, como se estivesse tocando. Do lado direito tem uma barrinha com os enfeites: o Aa é o texto, a estrelinha são os efeitos, as duas bolinhas são os filtros, a carinha são os adesivos e a última são as legendas. Em cima, no meio, fica o botão Adicionar música. Embaixo, o botão Editar serve para cortar o vídeo, e o botão Avançar leva para a próxima tela. Toque no Aa, onde está piscando, para escrever uma mensagem na tela do vídeo.",
  },
  {
    id: "text_open",
    target: "concluido",
    text: "O teclado subiu e apareceu o painel do texto. Digite a sua frase, por exemplo: Minha primeira receita. Aqui embaixo você escolhe o TIPO da letra: Clássico, Moderno ou Destaque. Depois toque numa das bolinhas coloridas para mudar a COR da letra. Assim você vê como a frase vai ficar. Quando terminar, toque em Concluir, lá em cima do lado direito, onde está piscando.",
  },
  {
    id: "text_done",
    target: "musica_pill",
    text: "Ficou ótimo! O seu texto apareceu no vídeo. Com o dedo, você pode arrastar o texto para cima, para baixo ou para os lados, para ele ficar no lugar que você quiser. Agora toque em ADICIONAR MÚSICA, lá em cima no meio da tela, onde está piscando, para colocar uma música de fundo.",
  },
  {
    id: "audio_open",
    target: "musica",
    text: "Aqui você escolhe a música do seu vídeo. Você pode digitar o nome da música ou do cantor que você gosta. Toque na música, onde está piscando, para ela tocar junto com o seu vídeo.",
  },
  {
    id: "audio_done",
    target: "next",
    text: "Muito bem, a música foi adicionada! Se quiser, ainda dá para mudar as cores com os Filtros, colocar um Adesivo ou escrever a Legenda do vídeo, na barrinha da direita. Quando o seu vídeo estiver do jeito que você gostou, toque em AVANÇAR, no canto de baixo do lado direito, onde está piscando.",
  },
  {
    id: "publish",
    target: "titulo",
    text: "Última tela! Aqui você escreve o título do seu vídeo. Toque no lugar onde está escrito Legende seu Short, onde está piscando, e digite o nome do seu vídeo. Por exemplo: Minha primeira receita.",
  },
  {
    id: "publish_send",
    target: "enviar",
    text: "O título está pronto. Agora, para mandar o seu vídeo para a internet de verdade, toque no grande botão azul Enviar Short, lá embaixo, onde está piscando.",
  },
  {
    id: "published",
    target: "concluir",
    text: "Parabéns! O seu Short foi publicado e agora está no YouTube, no seu canal, para quem você quiser ver. Toque em Concluir, onde está piscando, para voltar.",
  },
  {
    id: "done",
    target: "back",
    text: "Parabéns! Você aprendeu a usar o YouTube: procurar um vídeo, assistir, curtir, se inscrever no canal, salvar, compartilhar, comentar, ver as notificações, o histórico e até gravar e publicar um Short. Toque na seta, onde está piscando, para voltar à tela inicial.",
  },
];

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

  const target = STEPS[stepIndex].target;
  const shownVideos = chip === "Todos" ? VIDEOS : VIDEOS.filter((v) => v.tag === chip);

  useEffect(() => {
    if (!chapter) return;
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(STEPS[stepIndex].text);
      utter.lang = "pt-BR";
      utter.rate = 0.82;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, [stepIndex, chapter, runKey]);

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

  // Seta de cima: sai do vídeo durante o tutorial ou volta para a tela inicial
  const handleBack = () => {
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

  // Tela do vídeo: curtir, inscrever, salvar, compartilhar e comentar
  const handlePlayerTap = (id) => {
    if (id === "compartilhar") setShareOpen(true);
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

  const handleShortsAction = (id, nextScreen) => {
    if (nextScreen) setShortsScreen(nextScreen);
    if (target === id) goNext();
  };

  const handleRecorded = (segundos) => setDuracao(segundos);

  const handleCloseShorts = () => {
    setShortsScreen(null);
    setView("you");
  };

  const handleFinishShorts = () => {
    setShortsScreen(null);
    setView("you");
    if (target === "concluir") goNext();
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
        <VideoPlayer target={target} compartilhado={compartilhado} onTap={handlePlayerTap} />
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

          <div className="mt-5 space-y-2">
            <Pulse active={target === "history_row"} className="w-full" ring="rounded-2xl">
              <button
                onClick={handleHistory}
                className="w-full flex items-center gap-3 rounded-2xl border border-gray-200 px-3 py-3 text-left"
              >
                <HistoryIcon className="w-5 h-5 text-gray-700" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Histórico</p>
                  <p className="text-xs text-gray-600">Tudo que você já assistiu</p>
                </div>
              </button>
            </Pulse>
            <div className="w-full flex items-center gap-3 rounded-2xl border border-gray-200 px-3 py-3">
              <Bookmark className="w-5 h-5 text-gray-700" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Assistir mais tarde</p>
                <p className="text-xs text-gray-600">Os vídeos que você salvou</p>
              </div>
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
          <Pulse
            active={
              target === "back" ||
              target === "leave_player" ||
              target === "close_notifications" ||
              target === "back_from_history"
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