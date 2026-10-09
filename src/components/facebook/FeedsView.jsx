import React, { useState } from "react";
import PostList from "@/components/facebook/PostList";
import Pulse from "@/components/youtube/Pulse";
import { postsDoFiltro } from "@/components/facebook/facebookData";

// Os filtros do alto da aba Feeds: Todos, Favoritos, Amigos, Grupos e Páginas
const FILTROS = [
  { id: "todos", rotulo: "Todos", alvo: "filtro_todos" },
  { id: "favoritos", rotulo: "Favoritos", alvo: "filtro_favoritos" },
  { id: "amigos", rotulo: "Amigos", alvo: "filtro_amigos" },
  { id: "grupos", rotulo: "Grupos", alvo: "filtro_grupos" },
  { id: "paginas", rotulo: "Páginas", alvo: "filtro_paginas" },
];

export default function FeedsView({
  target,
  posts,
  filtro,
  onMudarFiltro,
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
  const [dicaFechada, setDicaFechada] = useState(false);
  const lista = postsDoFiltro(posts, filtro);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <div className="flex flex-wrap gap-2 bg-white border-b border-gray-200 px-3 py-2">
        {FILTROS.map(({ id, rotulo, alvo }) => (
          <Pulse key={id} active={target === alvo} className="shrink-0" ring="rounded-full">
            <button
              onClick={() => onMudarFiltro(id)}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${
                filtro === id ? "bg-[#1877F2] text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              {rotulo}
            </button>
          </Pulse>
        ))}
      </div>

      {filtro === "todos" && !dicaFechada && (
        <div className="mx-3 mt-2 rounded-2xl bg-[#0064D1] p-3">
          <p className="text-sm text-white leading-snug">
            Aqui aparecem as publicações <strong>mais recentes</strong> dos seus amigos, grupos e
            páginas, sem sugestões. Toque em um filtro para escolher o que você quer ver.
          </p>
          <button
            onClick={() => setDicaFechada(true)}
            className="mt-2 text-sm font-bold text-white underline"
          >
            Entendi
          </button>
        </div>
      )}

      <PostList
        target={target}
        posts={lista}
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