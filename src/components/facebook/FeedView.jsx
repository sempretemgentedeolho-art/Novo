import React from "react";
import { Check } from "lucide-react";
import StoriesBar from "@/components/facebook/StoriesBar";
import PostCard from "@/components/facebook/PostCard";

// O feed: histórias em cima e as publicações dos amigos embaixo
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
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <StoriesBar target={target} onAbrir={onAbrirStory} onCriar={onCriarStory} />

      {compartilhado && (
        <div className="mx-3 mt-3 mb-1 flex items-center gap-2 rounded-2xl bg-green-50 border border-green-200 px-3 py-2">
          <Check className="w-5 h-5 text-green-700 shrink-0" />
          <p className="text-sm text-green-900 font-semibold">
            Publicação compartilhada no WhatsApp
          </p>
        </div>
      )}

      <div className="pt-3">
        {posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            primeiro={index === 0}
            target={target}
            comentarioAberto={comentarioAberto === post.id}
            meuComentario={meuComentario}
            onMudarComentario={onMudarComentario}
            onFocarComentario={onFocarComentario}
            onCurtir={() => onCurtir(post.id)}
            onComentar={() => onComentar(post.id)}
            onCompartilhar={onCompartilhar}
            onEnviarComentario={() => onEnviarComentario(post.id)}
            onApagarComentario={(i) => onApagarComentario(post.id, i)}
          />
        ))}
      </div>
    </div>
  );
}