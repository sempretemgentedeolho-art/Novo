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
} from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
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
    stepIndex: 15,
    view: "results",
    chip: "Receitas",
  },
  {
    id: "area",
    label: "Sua área do YouTube",
    description: "Assistir mais tarde, playlists, downloads, canal, configurações e ajuda",
    icon: ListVideo,
    stepIndex: 20,
    view: "you",
    chip: "Todos",
  },
  {
    id: "shorts",
    label: "Gravar e publicar um Short",
    description: "Gravar um vídeo curto, enfeitar e publicar",
    icon: Zap,
    stepIndex: 42,
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
    id: "comentarios_open",
    target: "ver_comentarios",
    text: "Seu comentário foi publicado e já aparece aqui embaixo, escrito Você. Agora toque em VER TODOS OS COMENTÁRIOS, onde está piscando, para ler o que as outras pessoas escreveram sobre este vídeo.",
  },
  {
    id: "comentarios_done",
    target: "voltar_comentarios",
    text: "Esta é a tela dos comentários: os recados que as pessoas deixam para quem fez o vídeo. Você pode ler à vontade e escrever o seu, sempre com educação, porque todo mundo pode ler. Toque na seta de voltar, lá em cima do lado esquerdo, onde está piscando, para voltar ao vídeo.",
  },
  {
    id: "tela_cheia_open",
    target: "telacheia_btn",
    text: "Agora toque no quadradinho do canto de baixo do lado direito do vídeo, onde está piscando. Ele coloca o vídeo em TELA CHEIA, bem grande, sem os outros botões atrapalhando.",
  },
  {
    id: "tela_cheia_done",
    target: "sair_tela_cheia",
    text: "Este é o vídeo em tela cheia: só o vídeo e você. Vire o celular de lado para ele ficar ainda maior. Quando quiser voltar ao normal, toque no X, no canto de cima do lado esquerdo, onde está piscando.",
  },
  {
    id: "comentado",
    target: "leave_player",
    text: "Muito bem! Agora você já sabe comentar e assistir em tela cheia. Toque na seta de voltar, lá em cima do lado esquerdo, onde está piscando, para ver os outros vídeos.",
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
    id: "area_salvos",
    target: "assistir_mais_tarde",
    text: "Agora vamos conhecer a sua área, onde fica tudo que é seu no YouTube. Toque em ASSISTIR MAIS TARDE, onde está piscando. É a lista dos vídeos que você guardou tocando em SALVAR, como aquele da receita.",
  },
  {
    id: "area_salvos_done",
    target: "voltar_mais_tarde",
    text: "Aqui ficam os vídeos guardados para ver depois. É só tocar em um deles quando quiser assistir. Toque na seta de voltar, onde está piscando, para ver o próximo item da sua área.",
  },
  {
    id: "area_playlists",
    target: "playlists",
    text: "Agora toque em PLAYLISTS, onde está piscando. Playlist é uma listinha de vídeos que você junta para assistir um atrás do outro, sem precisar procurar.",
  },
  {
    id: "area_playlist_receitas",
    target: "playlist_receitas",
    text: "Toque na playlist RECEITAS DA VOVÓ, onde está piscando, para abrir essa listinha de vídeos.",
  },
  {
    id: "area_playlist_done",
    target: "voltar_playlist_receitas",
    text: "Dentro da playlist estão todos os vídeos dela, na ordem, um embaixo do outro. Toque na seta de voltar, onde está piscando, para voltar às suas playlists.",
  },
  {
    id: "area_playlists_done",
    target: "voltar_playlists",
    text: "Você pode criar quantas playlists quiser, separadas por assunto: receitas, músicas, orações. Toque na seta de voltar, onde está piscando, para continuar.",
  },
  {
    id: "area_gostei",
    target: "gostei",
    text: "Agora toque em VÍDEOS COM GOSTEI, onde está piscando. Aqui ficam todos os vídeos em que você tocou no joinha. É uma lista só sua, para achar fácil aqueles de que você mais gostou.",
  },
  {
    id: "area_gostei_done",
    target: "voltar_gostei",
    text: "Prontinho, estes são os vídeos que você curtiu. Toque na seta de voltar, onde está piscando, para continuar vendo a sua área.",
  },
  {
    id: "area_seus_videos",
    target: "seus_videos",
    text: "Agora toque em SEUS VÍDEOS, onde está piscando. É aqui que aparece o Short que você publicou, junto com todos os vídeos que você criar daqui para frente.",
  },
  {
    id: "area_seus_videos_done",
    target: "voltar_seus_videos",
    text: "Este é o seu cantinho de quem faz vídeos: o que você publicou e quantas pessoas viram. Toque na seta de voltar, onde está piscando.",
  },
  {
    id: "area_downloads",
    target: "downloads",
    text: "Agora toque em DOWNLOADS, onde está piscando. Vídeo baixado é aquele que fica guardado dentro do celular para você assistir sem internet, por exemplo quando viaja.",
  },
  {
    id: "area_downloads_done",
    target: "voltar_downloads",
    text: "Aqui aparecem os vídeos que já estão dentro do celular, prontos para assistir mesmo sem sinal. Toque na seta de voltar, onde está piscando, para continuar.",
  },
  {
    id: "area_aovivo",
    target: "aovivo",
    text: "Agora toque em TRANSMISSÕES AO VIVO, onde está piscando. Ao vivo quer dizer que está acontecendo naquele exato momento, com o selo vermelho AO VIVO na frente.",
  },
  {
    id: "area_aovivo_done",
    target: "voltar_aovivo",
    text: "Nestes vídeos você acompanha na hora, como uma missa ou um programa de rádio. Toque na seta de voltar, onde está piscando, para continuar.",
  },
  {
    id: "area_canal",
    target: "canal",
    text: "Agora toque em CANAIS QUE VOCÊ ACOMPANHA, onde está piscando, para ver a página do canal Cozinha da Vovó, de onde veio aquela receita.",
  },
  {
    id: "area_canal_done",
    target: "voltar_canal",
    text: "Esta é a página do canal: o nome dele, quantas pessoas acompanham, os vídeos que ele publicou e o botão INSCREVER, que avisa você quando sair vídeo novo. Toque na seta de voltar, onde está piscando.",
  },
  {
    id: "area_config",
    target: "config_youtube",
    text: "Agora toque em CONFIGURAÇÕES, onde está piscando. É aqui que você deixa o YouTube do seu jeito.",
  },
  {
    id: "area_config_legendas",
    target: "config_legendas",
    text: "Estas são as configurações: as legendas automáticas, o modo restrito, que esconde vídeos que não são para a sua idade, a economia de dados e a reprodução automática. Toque em APARÊNCIA DA LEGENDA, onde está piscando, para escolher o tamanho da letra da legenda.",
  },
  {
    id: "area_legendas_done",
    target: "voltar_legendas_config",
    text: "Escolha a letra que você enxerga melhor: Pequena, Média, Grande ou Enorme. Embaixo aparece um exemplo com a letra do tamanho que você escolheu. Toque na seta de voltar, onde está piscando.",
  },
  {
    id: "area_config_done",
    target: "voltar_config",
    text: "Muito bem! Se a letra ainda estiver pequena, aumente também o tamanho do texto nas configurações do celular. Toque na seta de voltar, onde está piscando, para continuar.",
  },
  {
    id: "area_ajuda",
    target: "ajuda_youtube",
    text: "Última parte da sua área. Toque em AJUDA, onde está piscando, para ver as dúvidas mais comuns com as respostas.",
  },
  {
    id: "area_ajuda_done",
    target: "voltar_ajuda",
    text: "Aqui estão as respostas para as dúvidas de sempre, como voltar a ver um vídeo ou assistir sem internet. Toque na seta de voltar, onde está piscando, para terminar a sua área.",
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
    text: "Agora o YouTube abriu a tela de enfeites, onde você melhora o seu vídeo. O seu vídeo fica passando na tela, repetindo, como se estivesse tocando. Do lado direito tem uma barrinha com os enfeites: o Aa é o texto, a estrelinha são os efeitos, as duas bolinhas são os filtros, a carinha são os adesivos e a última são as legendas. Em cima, no meio, fica o botão Adicionar som. Embaixo tem dois botões: Linha do tempo, para cortar o começo e o fim do vídeo, e Narração, para gravar a sua voz por cima. Mais abaixo fica o botão Avançar, que leva para a próxima tela. Toque no Aa, onde está piscando, para escrever uma mensagem na tela do vídeo.",
  },
  {
    id: "text_open",
    target: "concluido",
    text: "O teclado subiu e apareceu o painel do texto. Digite a sua frase, por exemplo: Meu primeiro Short. Em cima, à esquerda, você escolhe o TIPO da letra: Clássico ou Moderno. O botão A muda o formato da letra e o último botão muda o texto de lugar, para a esquerda, para o meio ou para a direita. Depois toque numa das bolinhas coloridas para mudar a COR da letra. Assim você vê como a frase vai ficar. Quando terminar, toque em Concluir, lá em cima do lado direito, onde está piscando.",
  },
  {
    id: "text_done",
    target: "musica_pill",
    text: "Ficou ótimo! O seu texto apareceu no vídeo. Com o dedo, você pode arrastar o texto para cima, para baixo ou para os lados, para ele ficar no lugar que você quiser. Agora toque em ADICIONAR SOM, lá em cima no meio da tela, onde está piscando, para colocar uma música de fundo.",
  },
  {
    id: "audio_open",
    target: "musica",
    text: "Aqui você escolhe a música do seu vídeo. Você pode digitar o nome da música ou do cantor que você gosta. Toque na música, onde está piscando, para ela tocar junto com o seu vídeo.",
  },
  {
    id: "efeitos_open",
    target: "efeitos",
    text: "Muito bem, a música foi adicionada! Agora vamos usar os outros enfeites, na barrinha da direita. Toque na varinha mágica, a ferramenta EFEITOS, onde está piscando.",
  },
  {
    id: "efeitos_estrela",
    target: "efeito_estrela",
    text: "Estes são os efeitos: eles dão um clima diferente para o seu vídeo. Aqui já estão separados em Para você, Rosto e Cenário. Toque no efeito ESTRELA, onde está piscando, para ele aparecer no seu vídeo. A barrinha embaixo, chamada Intensidade, deixa o efeito mais forte ou mais fraco.",
  },
  {
    id: "efeitos_done",
    target: "efeitos_concluir",
    text: "Ficou bonito! Você pode experimentar os outros efeitos quando quiser, é só tocar em outro e pronto. Quando terminar, toque em CONCLUIR, lá em cima do lado direito, onde está piscando, para voltar ao vídeo.",
  },
  {
    id: "filtros_open",
    target: "filtros",
    text: "Agora toque em FILTROS, na barrinha da direita, onde está piscando. O filtro muda as cores do seu vídeo, como se fosse um óculos de sol.",
  },
  {
    id: "filtros_dourado",
    target: "filtro_dourado",
    text: "Toque no filtro DOURADO, onde está piscando, para deixar a sua imagem com um tom mais quentinho. Se quiser, arraste a barrinha de Intensidade para escolher o quanto. Você também pode experimentar os outros: Vívido, Frio e Preto e Branco.",
  },
  {
    id: "filtros_done",
    target: "filtros_concluir",
    text: "Muito bem! Toque em CONCLUIR, onde está piscando, para guardar essa cor no seu vídeo.",
  },
  {
    id: "adesivos_open",
    target: "adesivos",
    text: "Agora toque em ADESIVOS, a carinha da barrinha da direita, onde está piscando. Adesivo é uma figurinha que você coloca em cima do vídeo.",
  },
  {
    id: "adesivos_coracao",
    target: "adesivo_coracao",
    text: "Toque no adesivo CORAÇÃO, onde está piscando. Depois, com o dedo, você pode arrastar essa figurinha para o lugar que quiser no vídeo.",
  },
  {
    id: "adesivos_done",
    target: "adesivos_concluir",
    text: "Pronto, o adesivo ficou no seu vídeo! Toque em CONCLUIR, onde está piscando, para voltar.",
  },
  {
    id: "legendas_open",
    target: "legendas",
    text: "Falta a última ferramenta. Toque em LEGENDAS, onde está piscando. Legenda é o texto que aparece embaixo do vídeo com o que você falou, para quem assiste sem som conseguir entender.",
  },
  {
    id: "legendas_done",
    target: "legendas_concluir",
    text: "O YouTube já deixou as LEGENDAS AUTOMÁTICAS ligadas em português, e eu escrevi uma sugestão para você. Se quiser mudar, toque na caixinha e apague para escrever do seu jeito. Toque em CONCLUIR, lá em cima, onde está piscando, para ver a legenda aparecendo no vídeo.",
  },
  {
    id: "enfeites_done",
    target: "next",
    text: "Parabéns! Agora o seu vídeo tem texto, música, efeitos, filtro, adesivo e legenda. Toque em AVANÇAR, no canto de baixo do lado direito, onde está piscando, para publicar o seu Short.",
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
  const [meuComentario, setMeuComentario] = useState("");
  const [playlistAberta, setPlaylistAberta] = useState("receitas");

  const target = STEPS[stepIndex].target;
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
    { id: "downloads", view: "downloads", label: "Downloads", sub: "Assistir sem internet", icon: Download },
    { id: "aovivo", view: "aovivo", label: "Transmissões ao vivo", sub: "O que está passando agora", icon: Radio },
    { id: "canal", view: "canal", label: "Canais que você acompanha", sub: "Cozinha da Vovó", icon: Users },
    { id: "config_youtube", view: "configyoutube", label: "Configurações", sub: "Deixe o YouTube do seu jeito", icon: Settings },
    { id: "ajuda_youtube", view: "ajuda", label: "Ajuda", sub: "Dúvidas comuns e respostas", icon: HelpCircle },
  ];

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

    if (view === "aovivo") {
      return <AoVivoView />;
    }

    if (view === "canal") {
      return <CanalView videos={[VIDEOS[0], VIDEOS[1]]} />;
    }

    if (view === "configyoutube") {
      return (
        <ConfigYouTubeView target={target} onTap={(id) => abrirTela(id, "legendas_config")} />
      );
    }

    if (view === "legendas_config") {
      return <LegendasConfigView />;
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