import React from "react";
import { Check } from "lucide-react";
import PostCard from "@/components/facebook/PostCard";

// A lista de publicações, usada tanto na aba Início quanto na aba Feeds
export default function PostList({
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
}) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-gray-600 text-center px-6 py-10 leading-snug">
        Não tem nada aqui ainda. Toque em outro filtro, ou peça para alguém publicar uma foto.
      </p>
    );
  }

  return (
    <div className="pt-3">
      {compartilhado && (
        <div className="mx-3 mb-1 flex items-center gap-2 rounded-2xl bg-green-50 border border-green-200 px-3 py-2">
          <Check className="w-5 h-5 text-green-700 shrink-0" />
          <p className="text-sm text-green-900 font-semibold">
            Publicação compartilhada no WhatsApp
          </p>
        </div>
      )}

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
  );
}