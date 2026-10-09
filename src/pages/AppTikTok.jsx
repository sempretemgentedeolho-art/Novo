import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { TikTokIcon } from "@/components/TikTokIcon";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import AvisoAcessibilidade from "@/components/AvisoAcessibilidade";
import ChapterPicker from "@/components/youtube/ChapterPicker";
import TikTokHeader from "@/components/tiktok/TikTokHeader";
import TikTokTabs from "@/components/tiktok/TikTokTabs";
import FeedTikTokView from "@/components/tiktok/FeedTikTokView";
import PerfilTikTokView from "@/components/tiktok/PerfilTikTokView";
import CadastroTikTokView from "@/components/tiktok/CadastroTikTokView";
import PublicarTikTokView from "@/components/tiktok/PublicarTikTokView";
import MonetizarTikTokView from "@/components/tiktok/MonetizarTikTokView";
import { CHAPTERS, STEPS } from "@/components/tiktok/tiktokTutorial";
import { VIDEOS, COMENTARIOS } from "@/components/tiktok/tiktokData";
import { useAcessibilidade } from "@/lib/acessibilidade";

// O caminho ?tela=monetizar abre o treino já na configuração de monetizar
const parametros = new URLSearchParams(window.location.search);
const capituloInicial = CHAPTERS.find((c) => c.id === parametros.get("tela")) || null;

export default function AppTikTok() {
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(capituloInicial);
  const [runKey, setRunKey] = useState(0);
  const [stepIndex, setStepIndex] = useState(capituloInicial ? capituloInicial.stepIndex : 0);
  const [view, setView] = useState(capituloInicial ? capituloInicial.view : "feed");
  const [videoIndex, setVideoIndex] = useState(0);
  const [curtido, setCurtido] = useState(false);
  const [seguindo, setSeguindo] = useState(false);
  const [comentarios, setComentarios] = useState(COMENTARIOS);
  const [comentarioAberto, setComentarioAberto] = useState(false);
  const [meuComentario, setMeuComentario] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [compartilhado, setCompartilhado] = useState(false);
  const [contaCriada, setContaCriada] = useState(false);
  const [monetizado, setMonetizado] = useState(false);

  const { talkback } = useAcessibilidade();
  // Enquanto o menu de capítulos está aberto, nenhuma pista pisca por trás dele
  const target = chapter ? STEPS[stepIndex].target : null;
  const video = VIDEOS[videoIndex];

  const falar = (texto) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = "pt-BR";
    utter.rate = talkback ? 0.72 : 0.82;
    synth.speak(utter);
  };

  // Cada passo do tutorial é falado em voz alta
  useEffect(() => {
    if (!chapter) return;
    falar(STEPS[stepIndex].text);
    return () => window.speechSynthesis.cancel();
  }, [stepIndex, chapter, runKey, talkback]);

  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));

  // Só avança quando a pessoa toca no lugar certo do passo atual
  const avancarSe = (alvo) => {
    if (target !== alvo) return;
    if (alvo === "cadastro_concluir") setContaCriada(true);
    if (alvo === "monetizar_ativar") setMonetizado(true);
    goNext();
  };

  // Começa o treino na parte escolhida no menu
  const startChapter = (cap) => {
    setChapter(cap);
    setStepIndex(cap.stepIndex);
    setView(cap.view || "feed");
    setVideoIndex(0);
    setCurtido(false);
    setSeguindo(false);
    setComentarios(COMENTARIOS);
    setComentarioAberto(false);
    setMeuComentario("");
    setShareOpen(false);
    setCompartilhado(false);
    setContaCriada(false);
    setMonetizado(false);
    setRunKey((k) => k + 1);
  };

  // ---------- Assistir aos vídeos ----------
  const proximoVideo = () => {
    setVideoIndex((i) => (i + 1) % VIDEOS.length);
    setCurtido(false);
    setCompartilhado(false);
    avancarSe("proximo_video");
  };

  const seguir = () => {
    setSeguindo(true);
    avancarSe("seguir");
  };

  const curtir = () => {
    setCurtido((c) => !c);
    avancarSe("curtir");
  };

  const abrirComentarios = () => {
    setComentarioAberto(true);
    avancarSe("comentar");
  };

  const enviarComentario = () => {
    // Se a pessoa tocar em publicar sem escrever, o app escreve um recado simples por ela
    const texto = meuComentario.trim() || "Que lindo, obrigado por compartilhar! 😊";
    setComentarios((anteriores) => [...anteriores, { autor: "Você", texto }]);
    setMeuComentario("");
    setComentarioAberto(false);
    avancarSe("enviar_comentario");
  };

  const abrirCompartilhar = () => {
    setShareOpen(true);
    avancarSe("compartilhar");
  };

  const escolherCompartilhar = (onde) => {
    setShareOpen(false);
    if (onde !== "whatsapp") {
      setCompartilhado(true);
      return;
    }
    setCompartilhado(true);
    avancarSe("share_whats");
  };

  // ---------- Trocar de aba ----------
  const abrirAba = (aba) => {
    if (aba === "feed") {
      setView("feed");
      return;
    }
    if (aba === "perfil") {
      setView("perfil");
      avancarSe("aba_perfil");
      return;
    }
    if (aba === "criar") {
      setView("publicar");
      return;
    }
    if (aba === "descobrir") {
      falar("Descobrir: aqui você procura vídeos e assuntos de que gosta.");
      return;
    }
    falar("Caixa: aqui chegam as mensagens dos seus amigos.");
  };

  const buscar = () =>
    falar("Esta é a lupa do TikTok. Aqui você procura vídeos, pessoas e assuntos.");

  // ---------- Perfil, cadastro, publicar e monetizar ----------
  const criarConta = () => {
    setView("cadastro");
    avancarSe("criar_conta");
  };

  const irPublicar = () => {
    setView("publicar");
    avancarSe("ir_publicar");
  };

  const verNoPerfil = () => {
    setView("perfil");
    avancarSe("ver_no_perfil");
  };

  const abrirMonetizar = () => {
    setView("monetizar");
    avancarSe("monetizar_abrir");
  };

  // Seta de voltar: fecha o que estiver aberto e, no fim, volta para a tela inicial
  const handleBack = () => {
    if (target === "terminar") {
      navigate(createPageUrl("Home"));
      return;
    }
    if (comentarioAberto) {
      setComentarioAberto(false);
      return;
    }
    if (shareOpen) {
      setShareOpen(false);
      return;
    }
    if (view !== "feed") {
      setView("feed");
      return;
    }
    navigate(createPageUrl("Home"));
  };

  const abaAtiva =
    view === "cadastro" || view === "monetizar" ? "perfil" : view === "publicar" ? "criar" : view;

  return (
    <PhoneFrame>
      <div className="h-full bg-black flex flex-col relative overflow-hidden">
        <StatusBar variant="dark" />
        <AvisoAcessibilidade />

        <TikTokHeader target={target} onBack={handleBack} onBuscar={buscar} />

        {view === "feed" && (
          <FeedTikTokView
            target={target}
            video={video}
            curtido={curtido}
            seguindo={seguindo}
            compartilhado={compartilhado}
            comentarios={comentarios}
            comentarioAberto={comentarioAberto}
            meuComentario={meuComentario}
            shareOpen={shareOpen}
            onProximo={proximoVideo}
            onSeguir={seguir}
            onCurtir={curtir}
            onComentar={abrirComentarios}
            onFecharComentarios={() => setComentarioAberto(false)}
            onMudarComentario={setMeuComentario}
            onFocarComentario={() => avancarSe("campo_comentario")}
            onEnviarComentario={enviarComentario}
            onCompartilhar={abrirCompartilhar}
            onEscolherCompartilhar={escolherCompartilhar}
            onFecharCompartilhar={() => setShareOpen(false)}
          />
        )}

        {view === "perfil" && (
          <PerfilTikTokView
            target={target}
            contaCriada={contaCriada}
            monetizado={monetizado}
            onCriarConta={criarConta}
            onAbrirMonetizar={abrirMonetizar}
          />
        )}

        {view === "cadastro" && (
          <CadastroTikTokView target={target} onAvancar={avancarSe} onIrPublicar={irPublicar} />
        )}

        {view === "publicar" && (
          <PublicarTikTokView target={target} onAvancar={avancarSe} onVerPerfil={verNoPerfil} />
        )}

        {view === "monetizar" && (
          <MonetizarTikTokView
            target={target}
            onAvancar={avancarSe}
            onFechar={() => navigate(createPageUrl("Home"))}
          />
        )}

        <TikTokTabs target={target} aba={abaAtiva} onAbrir={abrirAba} />

        {/* Menu de capítulos: escolher por onde começar */}
        {!chapter && (
          <ChapterPicker
            chapters={CHAPTERS}
            onSelect={startChapter}
            marca="TikTok"
            Icone={TikTokIcon}
            corBarra="bg-black"
            corIcone="text-black"
            corIconeFundo="bg-gray-100"
            fala="Por onde você quer começar? Toque na parte do TikTok que você quer aprender hoje. A primeira opção é o tutorial completo, do começo. A opção Configuração de Monetizar ensina como receber dinheiro pelos seus vídeos."
          />
        )}
      </div>
    </PhoneFrame>
  );
}