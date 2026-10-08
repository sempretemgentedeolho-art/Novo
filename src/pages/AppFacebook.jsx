import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Facebook } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import AvisoAcessibilidade from "@/components/AvisoAcessibilidade";
import ChapterPicker from "@/components/youtube/ChapterPicker";
import FacebookHeader from "@/components/facebook/FacebookHeader";
import FacebookNav from "@/components/facebook/FacebookNav";
import FeedView from "@/components/facebook/FeedView";
import CreatePostView from "@/components/facebook/CreatePostView";
import FriendsView from "@/components/facebook/FriendsView";
import MessagesView from "@/components/facebook/MessagesView";
import ProfileView from "@/components/facebook/ProfileView";
import AvisosFacebookView from "@/components/facebook/AvisosFacebookView";
import ShareSheetFacebook from "@/components/facebook/ShareSheetFacebook";
import StoryView from "@/components/facebook/StoryView";
import { CHAPTERS, STEPS } from "@/components/facebook/facebookTutorial";
import {
  PUBLICACOES,
  GALERIA,
  AMIGOS,
  CONVERSAS,
  MINHA_FOTO,
} from "@/components/facebook/facebookData";
import { useAcessibilidade } from "@/lib/acessibilidade";

export default function AppFacebook() {
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [runKey, setRunKey] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [view, setView] = useState("feed");
  const [posts, setPosts] = useState(PUBLICACOES);
  const [comentarioAberto, setComentarioAberto] = useState(null);
  const [meuComentario, setMeuComentario] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [compartilhado, setCompartilhado] = useState(false);
  const [storyAberta, setStoryAberta] = useState(null);
  const [fotoEscolhida, setFotoEscolhida] = useState(null);
  const [legenda, setLegenda] = useState("");
  const [publicado, setPublicado] = useState(false);
  const [amigos, setAmigos] = useState(AMIGOS);
  const [conversas, setConversas] = useState(CONVERSAS);
  const [chatAberto, setChatAberto] = useState(null);
  const [recado, setRecado] = useState("");

  const { talkback, gestos } = useAcessibilidade();
  // Enquanto o menu de capítulos está aberto, nenhuma pista pisca por trás dele
  const target = chapter ? STEPS[stepIndex].target : null;

  // Cada passo do tutorial é falado em voz alta
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

  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));

  // Começa o tutorial na parte escolhida no menu
  const startChapter = (cap) => {
    setChapter(cap);
    setStepIndex(cap.stepIndex);
    setView(cap.view || "feed");
    setPosts(PUBLICACOES);
    setComentarioAberto(null);
    setMeuComentario("");
    setShareOpen(false);
    setCompartilhado(false);
    setStoryAberta(null);
    setFotoEscolhida(null);
    setLegenda("");
    setPublicado(false);
    setAmigos(AMIGOS);
    setConversas(CONVERSAS);
    setChatAberto(null);
    setRecado("");
    setRunKey((k) => k + 1);
  };

  // Curtir, comentar e apagar comentário
  const handleCurtir = (id) => {
    setPosts((anteriores) =>
      anteriores.map((p) =>
        p.id === id
          ? { ...p, curtido: !p.curtido, curtidas: p.curtido ? p.curtidas - 1 : p.curtidas + 1 }
          : p
      )
    );
    if (target === "curtir") goNext();
  };

  const handleComentar = (id) => {
    setComentarioAberto(id);
    if (target === "comentar_btn") goNext();
  };

  const handleFocarComentario = () => {
    if (target === "campo_comentario") goNext();
  };

  const handleEnviarComentario = (id) => {
    // Se a pessoa tocar em Publicar sem escrever, o app escreve um recado simples por ela
    const texto = meuComentario.trim() || "Que lindo, Maria! 😊";
    setPosts((anteriores) =>
      anteriores.map((p) =>
        p.id === id
          ? { ...p, comentarios: [...p.comentarios, { autor: "Você", texto, meu: true }] }
          : p
      )
    );
    setMeuComentario("");
    setComentarioAberto(null);
    if (target === "enviar_comentario") goNext();
  };

  const handleApagarComentario = (id, indice) => {
    setPosts((anteriores) =>
      anteriores.map((p) =>
        p.id === id ? { ...p, comentarios: p.comentarios.filter((_, i) => i !== indice) } : p
      )
    );
  };

  // Compartilhar a publicação
  const handleCompartilhar = () => {
    setShareOpen(true);
    if (target === "compartilhar_btn") goNext();
  };

  const handleEscolherOndeCompartilhar = () => {
    setCompartilhado(true);
    setShareOpen(false);
    if (target === "share_whats") goNext();
  };

  const fecharCompartilhar = () => {
    setShareOpen(false);
    setCompartilhado(false);
  };

  // Publicar uma foto com legenda
  const handleAbrirPublicar = () => {
    setView("publicar");
    if (target === "publicar_nav") goNext();
  };

  const handleEscolherFoto = (foto) => {
    setFotoEscolhida(foto);
    if (target === "escolher_foto") goNext();
  };

  const handleFocarLegenda = () => {
    if (target === "campo_legenda") goNext();
  };

  const handlePublicar = () => {
    // Se a pessoa tocar em Publicar sem escolher a foto, vai a primeira da galeria
    const foto = fotoEscolhida || GALERIA[0].foto;
    setPosts((anteriores) => [
      {
        id: `minha-${Date.now()}`,
        autor: "Você",
        foto: MINHA_FOTO,
        quando: "agora mesmo",
        texto: legenda.trim() || "Bom dia a todos!",
        imagem: foto,
        curtidas: 0,
        curtido: false,
        comentarios: [],
      },
      ...anteriores,
    ]);
    setPublicado(true);
    if (target === "publicar_botao") goNext();
  };

  const handleVerNoFeed = () => {
    setView("feed");
    if (target === "ver_publicacao") goNext();
  };

  // Histórias de 24 horas
  const handleAbrirStory = (story) => {
    setStoryAberta(story);
    if (target === "story_abrir") goNext();
  };

  const handleCriarStory = () => {
    setStoryAberta({
      id: "meu",
      nome: "Você",
      foto: MINHA_FOTO,
      imagem: GALERIA[0].foto,
      legenda: "Bom dia! Hoje vai ser um dia lindo. ☀️",
      proprio: true,
    });
    if (target === "story_criar") goNext();
  };

  const handleFecharStory = () => {
    setStoryAberta(null);
    if (target === "story_fechar") goNext();
  };

  // Amigos e mensagens
  const handleAbrirAmigos = () => {
    setView("amigos");
    if (target === "amigos_nav") goNext();
  };

  const handleAdicionarAmigo = (id) => {
    setAmigos((anteriores) =>
      anteriores.map((a) => (a.id === id ? { ...a, convite: true } : a))
    );
    if (target === "adicionar_amigo") goNext();
  };

  const handleAbrirMensagens = () => {
    setView("mensagens");
    if (target === "mensagens_nav") goNext();
  };

  const handleAbrirConversa = (id) => {
    setChatAberto(id);
    if (target === "conversa_maria") goNext();
  };

  const handleFocarRecado = () => {
    if (target === "campo_recado") goNext();
  };

  const handleEnviarRecado = () => {
    if (!chatAberto) return;
    // Se a pessoa tocar na seta sem escrever, o app manda um recado simples por ela
    const texto = recado.trim() || "Oi, Maria! Está tudo bem por aqui. 😊";
    setConversas((anteriores) =>
      anteriores.map((c) =>
        c.id === chatAberto ? { ...c, recados: [...c.recados, { de: "eu", texto }] } : c
      )
    );
    setRecado("");
    if (target === "enviar_recado") goNext();
  };

  const handleAbrirPerfil = () => {
    setView("perfil");
    if (target === "perfil_nav") goNext();
  };

  const handleAbrirAvisos = () => {
    setView("avisos");
    if (target === "avisos") goNext();
  };

  // Seta de voltar: fecha o que estiver aberto e, no fim, volta para a tela inicial
  const handleBack = () => {
    if (target === "terminar") {
      navigate(createPageUrl("Home"));
      return;
    }
    if (storyAberta) {
      handleFecharStory();
      return;
    }
    if (chatAberto) {
      setChatAberto(null);
      return;
    }
    if (view !== "feed") {
      setView("feed");
      return;
    }
    navigate(createPageUrl("Home"));
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-gray-100 flex flex-col relative overflow-hidden">
        <StatusBar variant="light" />
        <AvisoAcessibilidade />

        <FacebookHeader
          target={target}
          onBack={handleBack}
          onAvisos={handleAbrirAvisos}
          onMensagens={handleAbrirMensagens}
        />

        {view === "feed" && (
          <FeedView
            target={target}
            posts={posts}
            compartilhado={compartilhado}
            comentarioAberto={comentarioAberto}
            meuComentario={meuComentario}
            onMudarComentario={setMeuComentario}
            onFocarComentario={handleFocarComentario}
            onCurtir={handleCurtir}
            onComentar={handleComentar}
            onCompartilhar={handleCompartilhar}
            onEnviarComentario={handleEnviarComentario}
            onApagarComentario={handleApagarComentario}
            onAbrirStory={handleAbrirStory}
            onCriarStory={handleCriarStory}
          />
        )}

        {view === "publicar" && (
          <CreatePostView
            target={target}
            fotoEscolhida={fotoEscolhida}
            legenda={legenda}
            publicado={publicado}
            onEscolherFoto={handleEscolherFoto}
            onMudarLegenda={setLegenda}
            onFocarLegenda={handleFocarLegenda}
            onPublicar={handlePublicar}
            onVerNoFeed={handleVerNoFeed}
          />
        )}

        {view === "amigos" && (
          <FriendsView target={target} amigos={amigos} onAdicionar={handleAdicionarAmigo} />
        )}

        {view === "mensagens" && (
          <MessagesView
            target={target}
            conversas={conversas}
            aberta={chatAberto}
            onAbrir={handleAbrirConversa}
            onFechar={() => setChatAberto(null)}
            recado={recado}
            onMudarRecado={setRecado}
            onFocarRecado={handleFocarRecado}
            onEnviar={handleEnviarRecado}
          />
        )}

        {view === "perfil" && <ProfileView posts={posts} amigos={amigos} />}
        {view === "avisos" && <AvisosFacebookView />}

        <FacebookNav
          target={target}
          view={view}
          onFeed={() => setView("feed")}
          onPublicar={handleAbrirPublicar}
          onAmigos={handleAbrirAmigos}
          onMensagens={handleAbrirMensagens}
          onPerfil={handleAbrirPerfil}
        />

        {shareOpen && (
          <ShareSheetFacebook
            target={target}
            onEscolher={handleEscolherOndeCompartilhar}
            onFechar={fecharCompartilhar}
          />
        )}

        {storyAberta && (
          <StoryView story={storyAberta} target={target} onFechar={handleFecharStory} />
        )}

        {/* Menu de capítulos: escolher por onde começar */}
        {!chapter && (
          <ChapterPicker
            chapters={CHAPTERS}
            onSelect={startChapter}
            marca="Facebook"
            Icone={Facebook}
            corBarra="bg-[#1877F2]"
            corIcone="text-[#1877F2]"
            corIconeFundo="bg-blue-50"
            fala="Por onde você quer começar? Toque na parte do Facebook que você quer aprender hoje. A primeira opção é o tutorial completo, do começo."
          />
        )}
      </div>
    </PhoneFrame>
  );
}