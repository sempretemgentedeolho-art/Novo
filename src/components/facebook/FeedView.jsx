import React from "react";
import ComposerBox from "@/components/facebook/ComposerBox";
import StoriesBar from "@/components/facebook/StoriesBar";
import PostList from "@/components/facebook/PostList";

// A aba Início: a caixinha de publicar, as histórias e as publicações que o Facebook escolheu
export default function FeedView({
  target,
  posts,
  compartilhado,
  comentarioAberto,
  meuComentario,
  onMudarComentario,
  onFocarComentario,
  onCurtir,
  onComentar,
  onCompartilhar,
  onEnviarComentario,
  onApagarComentario,
  onAbrirStory,
  onCriarStory,
  onAbrirPublicar,
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <ComposerBox target={target} onAbrir={onAbrirPublicar} />
      <StoriesBar target={target} onAbrir={onAbrirStory} onCriar={onCriarStory} />

      <PostList
        target={target}
        posts={posts}
        compartilhado={compartilhado}
        comentarioAberto={comentarioAberto}
        meuComentario={meuComentario}
        onMudarComentario={onMudarComentario}
        onFocarComentario={onFocarComentario}
        onCurtir={onCurtir}
        onComentar={onComentar}
        onCompartilhar={onCompartilhar}
        onEnviarComentario={onEnviarComentario}
        onApagarComentario={onApagarComentario}
      />
    </div>
  );
}